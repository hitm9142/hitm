import { NextResponse } from 'next/server';
import { decrypt } from '@/lib/ccavenue';
import { getAdminDb } from '@/lib/firebase-admin';
import querystring from 'querystring';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const encResp = formData.get('encResp');
    const workingKey = process.env.CCAVENUE_WORKING_KEY?.trim();

    if (!workingKey) {
      console.error('CCAVENUE_WORKING_KEY env var missing');
      return new NextResponse('Payment configuration error', { status: 500 });
    }

    if (!encResp) {
      return new NextResponse('No encrypted response received.', { status: 400 });
    }

    // Decrypt the response
    const ccavResponse = decrypt(encResp, workingKey);

    // The response is in the format of key1=value1&key2=value2...
    const responseObj = querystring.parse(ccavResponse);

    console.log('CCAvenue Decrypted Response:', responseObj);

    const orderId = responseObj.order_id;
    const trackingId = responseObj.tracking_id;
    const orderStatus = responseObj.order_status; // Success, Failure, Aborted, etc.
    const amount = responseObj.amount;
    const currency = responseObj.currency || 'INR';
    const paymentMode = responseObj.payment_mode;
    const cardName = responseObj.card_name;
    const statusMessage = responseObj.status_message || orderStatus;
    const transDate = responseObj.trans_date;

    const adminDb = await getAdminDb();

    if (adminDb && orderId) {
      // 1. Update the central transactions collection
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
        console.error('Error updating transactions doc:', txnErr);
      }

      // 2. Determine type (Admission vs General)
      if (orderId.startsWith('APP_')) {
        // Query the enquiries collection to find the document with this orderId
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

            // 3. If successful, send Web3Forms notification email
            if (orderStatus === 'Success') {
              try {
                const messageText = `
=== NEW ADMISSION & PAYMENT ENQUIRY ===

STUDENT DETAILS:
- Name: ${enquiryData.name}
- Father Name: ${enquiryData.fatherName}
- Mobile Number / App ID: ${enquiryData.phone}
- Email Address: ${enquiryData.email}

ACADEMIC DETAILS:
- Selected Course: ${enquiryData.program}
- Branch/Specialization: ${enquiryData.branch || 'N/A'}
- 10th Score: ${enquiryData.tenthPercentage}% (Board: ${enquiryData.tenthBoard}, Year: ${enquiryData.tenthYear})
- 12th Score: ${enquiryData.twelfthPercentage}% (Board: ${enquiryData.twelfthBoard}, Year: ${enquiryData.twelfthYear})
- Entrance Exam Score: ${enquiryData.examScore || 'N/A'}
- Marksheet Document Link: ${enquiryData.documentUrl}

PAYMENT VERIFICATION DETAILS:
- Transaction ID / Tracking ID: ${trackingId}
- Payment Status: ${orderStatus} (Successful Online Payment)
- Amount: ${currency} ${amount}
- Date: ${transDate || new Date().toLocaleString()}

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
                    subject: `Admission Fee Paid: ${enquiryData.name} (${enquiryData.program})`,
                    name: enquiryData.name,
                    email: enquiryData.email,
                    message: messageText
                  })
                });
              } catch (mailErr) {
                console.error("Web3Forms payment email notification failed:", mailErr);
              }
            }
          }
        } catch (enqErr) {
          console.error('Error handling enquiry update:', enqErr);
        }
      } else {
        // General Fee Payment
        try {
          await adminDb.collection('online_payments').doc(orderId).update({
            status: orderStatus,
            trackingId: trackingId || 'N/A',
            updatedAt: new Date(),
          });
        } catch (payErr) {
          console.error('Error updating online_payments doc:', payErr);
        }
      }
    }

    // Redirect the browser to the status page using HTTP 303 (See Other)
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || req.headers.get('origin') || 'http://localhost:3000';
    return NextResponse.redirect(`${baseUrl}/payment/status?orderId=${orderId}`, 303);

  } catch (error) {
    console.error('Error in CCAvenue Response API:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
