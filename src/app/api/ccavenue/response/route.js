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
        // Query the applications collection to find the document with this orderId
        try {
          const applicationsQuery = await adminDb.collection('applications')
            .where('payment.orderId', '==', orderId)
            .get();

          if (!applicationsQuery.empty) {
            const appDoc = applicationsQuery.docs[0];
            const phone = appDoc.id;
            const appData = appDoc.data();

            await adminDb.collection('applications').doc(phone).update({
              'payment.status': orderStatus,
              'payment.transactionId': trackingId || 'N/A',
              'payment.updatedAt': new Date(),
              status: orderStatus === 'Success' ? 'Submitted' : 'Payment Pending',
            });

            // 3. If successful, send Web3Forms notification email
            if (orderStatus === 'Success') {
              try {
                const name = appData.personalDetails?.name || appData.name || 'Applicant';
                const fatherName = appData.personalDetails?.fatherName || appData.fatherName || 'N/A';
                const email = appData.personalDetails?.email || appData.email || 'N/A';
                const program = appData.programSelection?.program || appData.program || 'N/A';
                const branch = appData.programSelection?.branch || appData.branch || 'N/A';
                const qualification = appData.academicDetails?.qualification || appData.qualification || 'N/A';
                const board = appData.academicDetails?.board || appData.board || 'N/A';
                const passingYear = appData.academicDetails?.passingYear || appData.passingYear || 'N/A';
                const percentage = appData.academicDetails?.percentage || appData.percentage || 'N/A';
                const documentUrl = appData.documentUrl || 'N/A';

                const messageText = `
=== NEW ADMISSION APPLICATION & PAYMENT ===

STUDENT DETAILS:
- Name: ${name}
- Father Name: ${fatherName}
- Mobile Number / App ID: ${phone}
- Email Address: ${email}

ACADEMIC DETAILS:
- Selected Course: ${program}
- Branch/Specialization: ${branch}
- Qualification Level: ${qualification}
- Board / University: ${board}
- Passing Year: ${passingYear}
- Percentage / CGPA: ${percentage}
- Marksheet Document Link: ${documentUrl}

PAYMENT VERIFICATION DETAILS:
- Transaction ID / Tracking ID: ${trackingId}
- Payment Status: ${orderStatus} (Successful Online Payment)
- Amount: ${currency} ${amount}
- Date: ${transDate || new Date().toLocaleString()}

Submitted from IP: ${appData.ipAddress || 'N/A'}
`;

                await fetch("https://api.web3forms.com/submit", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                  },
                  body: JSON.stringify({
                    access_key: "ea72c4d8-d56a-48f8-af05-7dd8d48268a9",
                    subject: `Admission Fee Paid: ${name} (${program})`,
                    name: name,
                    email: email,
                    message: messageText
                  })
                });
              } catch (mailErr) {
                console.error("Web3Forms payment email notification failed:", mailErr);
              }
            }
          }
        } catch (appErr) {
          console.error('Error handling application update:', appErr);
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
