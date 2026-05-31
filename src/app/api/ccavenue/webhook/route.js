import { NextResponse } from 'next/server';
import { decrypt } from '@/lib/ccavenue';
import { getAdminDb } from '@/lib/firebase-admin';
import querystring from 'querystring';

export async function POST(req) {
  try {
    let encResp = '';

    // Handle both content types
    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await req.formData();
      encResp = formData.get('encResp');
    } else {
      const body = await req.json().catch(() => ({}));
      encResp = body.encResp;
    }

    const workingKey = process.env.CCAVENUE_WORKING_KEY?.trim();

    if (!workingKey) {
      console.error('CCAVENUE_WORKING_KEY missing in webhook');
      return new NextResponse('Configuration Error', { status: 500 });
    }

    if (!encResp) {
      return new NextResponse('No encrypted payload received', { status: 400 });
    }

    // Decrypt the response
    const ccavResponse = decrypt(encResp, workingKey);
    const responseObj = querystring.parse(ccavResponse);

    console.log('CCAvenue Webhook/Echo Response received:', responseObj);

    const orderId = responseObj.order_id;
    const trackingId = responseObj.tracking_id;
    const orderStatus = responseObj.order_status;
    const amount = responseObj.amount;
    const currency = responseObj.currency || 'INR';
    const paymentMode = responseObj.payment_mode;
    const cardName = responseObj.card_name;
    const statusMessage = responseObj.status_message || orderStatus;
    const transDate = responseObj.trans_date;

    const adminDb = await getAdminDb();

    if (adminDb && orderId) {
      // 1. Update the transactions collection
      try {
        await adminDb.collection('transactions').doc(orderId).update({
          status: orderStatus,
          trackingId: trackingId || 'N/A',
          paymentMode: paymentMode || 'N/A',
          cardName: cardName || 'N/A',
          statusMessage: statusMessage,
          updatedAt: new Date(),
        });
      } catch (txnErr) {
        console.error('Error updating transactions in webhook:', txnErr);
      }

      // 2. Type specific update
      if (orderId.startsWith('APP_')) {
        try {
          const enquiriesQuery = await adminDb.collection('enquiries')
            .where('payment.orderId', '==', orderId)
            .get();

          if (!enquiriesQuery.empty) {
            const enquiryDoc = enquiriesQuery.docs[0];
            const phone = enquiryDoc.id;
            const enquiryData = enquiryDoc.data();

            // Only update if it wasn't already updated to Success
            if (enquiryData.payment?.status !== 'Success') {
              await adminDb.collection('enquiries').doc(phone).update({
                'payment.status': orderStatus,
                'payment.transactionId': trackingId || 'N/A',
                'payment.updatedAt': new Date(),
                status: orderStatus === 'Success' ? 'New' : 'Payment Failed',
              });

              // Send email if successful
              if (orderStatus === 'Success') {
                try {
                  const messageText = `
=== NEW ADMISSION & PAYMENT ENQUIRY ===
(RECEIVED VIA WEBHOOK BACKGROUND ECHO)

STUDENT DETAILS:
- Name: ${enquiryData.name}
- Father Name: ${enquiryData.fatherName}
- Mobile Number / App ID: ${enquiryData.phone}
- Email Address: ${enquiryData.email}

ACADEMIC DETAILS:
- Selected Course: ${enquiryData.program}
- Branch/Specialization: ${enquiryData.branch || 'N/A'}
- Marksheet Document Link: ${enquiryData.documentUrl}

PAYMENT VERIFICATION DETAILS:
- Transaction ID / Tracking ID: ${trackingId}
- Payment Status: ${orderStatus} (Successful Online Payment)
- Amount: ${currency} ${amount}
- Date: ${transDate || new Date().toLocaleString()}
`;

                  await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "Accept": "application/json"
                    },
                    body: JSON.stringify({
                      access_key: "ea72c4d8-d56a-48f8-af05-7dd8d48268a9",
                      subject: `Admission Fee Paid (Webhook): ${enquiryData.name}`,
                      name: enquiryData.name,
                      email: enquiryData.email,
                      message: messageText
                    })
                  });
                } catch (mailErr) {
                  console.error("Webhook email notification failed:", mailErr);
                }
              }
            }
          }
        } catch (enqErr) {
          console.error('Error in webhook enquiry sync:', enqErr);
        }
      } else {
        try {
          await adminDb.collection('online_payments').doc(orderId).update({
            status: orderStatus,
            trackingId: trackingId || 'N/A',
            updatedAt: new Date(),
          });
        } catch (payErr) {
          console.error('Error in webhook online_payments sync:', payErr);
        }
      }
    }

    // CCAvenue Echo expects "OK" or a 200 response
    return new NextResponse('OK', { status: 200 });

  } catch (error) {
    console.error('Error in CCAvenue Webhook API:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
