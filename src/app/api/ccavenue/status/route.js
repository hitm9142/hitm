import { NextResponse } from 'next/server';
import { queryStatus } from '@/lib/ccavenue';
import { getAdminDb } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const accessCode = process.env.CCAVENUE_ACCESS_CODE?.trim();
    const workingKey = process.env.CCAVENUE_WORKING_KEY?.trim();
    const isProduction = process.env.CCAVENUE_ENV === 'production';

    if (!accessCode || !workingKey) {
      console.error('CCAvenue keys missing');
      return NextResponse.json({ error: 'Payment configuration error' }, { status: 500 });
    }

    // Call server-to-server status API
    const responseObj = await queryStatus(orderId, workingKey, accessCode, isProduction);
    console.log('CCAvenue Server-to-Server Status Query Response:', responseObj);

    // Reconcile status in Firebase if status is returned
    // CCAvenue Status API response parameters:
    // order_status: "Success", "Failure", "Aborted", etc.
    // reference_no (this is tracking_id)
    // order_no (this is orderId)
    // amount, currency, order_date_time, status_message, etc.

    const orderStatus = responseObj.order_status || responseObj.status || 'Pending';
    const trackingId = responseObj.reference_no || responseObj.tracking_id || '';
    const amount = responseObj.amount || '';
    const currency = responseObj.currency || 'INR';
    const paymentMode = responseObj.payment_mode || 'N/A';
    const cardName = responseObj.card_name || 'N/A';
    const statusMessage = responseObj.status_message || responseObj.error_desc || orderStatus;

    const adminDb = await getAdminDb();
    if (adminDb && orderId) {
      // 1. Update transactions
      try {
        await adminDb.collection('transactions').doc(orderId).update({
          status: orderStatus,
          trackingId: trackingId || 'N/A',
          paymentMode: paymentMode,
          cardName: cardName,
          statusMessage: statusMessage,
          updatedAt: new Date(),
        });
      } catch (dbErr) {
        console.error('Error updating transactions in status check:', dbErr);
      }

      // 2. Update type-specific collection
      if (orderId.startsWith('APP_')) {
        try {
          const enquiriesQuery = await adminDb.collection('enquiries')
            .where('payment.orderId', '==', orderId)
            .get();

          if (!enquiriesQuery.empty) {
            const enquiryDoc = enquiriesQuery.docs[0];
            const phone = enquiryDoc.id;
            const enquiryData = enquiryDoc.data();

            await adminDb.collection('enquiries').doc(phone).update({
              'payment.status': orderStatus,
              'payment.transactionId': trackingId || 'N/A',
              'payment.updatedAt': new Date(),
              status: orderStatus === 'Success' ? 'New' : 'Payment Failed',
            });

            // If success, check if we should send email notification
            // Usually, this status call is triggered if response webhook failed, so sending email is a good fallback
            if (orderStatus === 'Success' && enquiryData.payment?.status !== 'Success') {
              try {
                const messageText = `
=== NEW ADMISSION & PAYMENT ENQUIRY ===
(RECONCILED VIA S2S STATUS QUERY)

STUDENT DETAILS:
- Name: ${enquiryData.name}
- Father Name: ${enquiryData.fatherName}
- Mobile Number / App ID: ${enquiryData.phone}
- Email Address: ${enquiryData.email}

ACADEMIC DETAILS:
- Selected Course: ${enquiryData.program}
- Branch/Specialization: ${enquiryData.branch || 'N/A'}
- 10th Score: ${enquiryData.tenthPercentage}%
- 12th Score: ${enquiryData.twelfthPercentage}%
- Marksheet Document Link: ${enquiryData.documentUrl}

PAYMENT VERIFICATION DETAILS:
- Transaction ID / Tracking ID: ${trackingId}
- Payment Status: ${orderStatus} (Successful Online Payment)
- Amount: ${currency} ${amount}

Submitted from IP: ${enquiryData.ipAddress || 'N/A'}
`;

                await fetch("https://api.web3forms.com/submit", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                  },
                  body: JSON.stringify({
                    access_key: "ea72c4d8-d56a-48f8-af05-7dd8d48268a9",
                    subject: `Admission Fee Paid (Reconciled): ${enquiryData.name}`,
                    name: enquiryData.name,
                    email: enquiryData.email,
                    message: messageText
                  })
                });
              } catch (mailErr) {
                console.error("Web3Forms reconciled payment email failed:", mailErr);
              }
            }
          }
        } catch (enqErr) {
          console.error('Error handling enquiry status reconciliation:', enqErr);
        }
      } else {
        try {
          await adminDb.collection('online_payments').doc(orderId).update({
            status: orderStatus,
            trackingId: trackingId || 'N/A',
            updatedAt: new Date(),
          });
        } catch (payErr) {
          console.error('Error updating online_payments in status check:', payErr);
        }
      }
    }

    return NextResponse.json({ success: true, status: orderStatus, response: responseObj });
  } catch (error) {
    console.error('Error in CCAvenue Status API:', error);
    return NextResponse.json({ error: 'Internal Server Error', message: error.message }, { status: 500 });
  }
}
