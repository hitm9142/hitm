import { NextResponse } from 'next/server';
import { encrypt } from '@/lib/ccavenue';
import { getAdminDb } from '@/lib/firebase-admin';

export async function POST(req) {
  try {
    const body = await req.json();

    const merchantId = process.env.CCAVENUE_MERCHANT_ID?.trim();
    const accessCode = process.env.CCAVENUE_ACCESS_CODE?.trim();
    const workingKey = process.env.CCAVENUE_WORKING_KEY?.trim();

    if (!merchantId || !accessCode || !workingKey) {
      console.error('CCAvenue env vars missing');
      return NextResponse.json({ error: 'Payment configuration error' }, { status: 500 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || req.headers.get('origin') || 'http://localhost:3000';
    const redirectUrl = `${baseUrl}/api/ccavenue/response`;
    const cancelUrl = `${baseUrl}/api/ccavenue/response`;

    const orderId = body.order_id || `TXN_${Date.now()}`;
    const payloadData = {
      merchant_id: merchantId,
      order_id: orderId,
      currency: 'INR',
      amount: body.amount || '1.00',
      redirect_url: redirectUrl,
      cancel_url: cancelUrl,
      language: 'EN',
      billing_name: body.billing_name || 'Test User',
      billing_address: body.billing_address || 'Test Address',
      billing_city: body.billing_city || 'Ranchi',
      billing_state: body.billing_state || 'JH',
      billing_zip: body.billing_zip || '834001',
      billing_country: 'India',
      billing_tel: body.billing_tel || '9999999999',
      billing_email: body.billing_email || 'test@example.com',
    };

    const queryString = Object.keys(payloadData)
      .map(key => `${key}=${encodeURIComponent(payloadData[key])}`)
      .join('&');

    const encRequest = encrypt(queryString, workingKey);

    const gatewayUrl = process.env.CCAVENUE_ENV === 'production'
      ? 'https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction'
      : 'https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction';

    // Log the transaction in Firestore as Pending
    try {
      const adminDb = await getAdminDb();
      if (adminDb) {
        const orderType = body.order_type || (orderId.startsWith('APP_') ? 'admission' : 'general');
        await adminDb.collection('transactions').doc(orderId).set({
          orderId,
          type: orderType,
          amount: parseFloat(payloadData.amount),
          currency: 'INR',
          billing_name: payloadData.billing_name,
          billing_email: payloadData.billing_email,
          billing_tel: payloadData.billing_tel,
          status: 'Pending',
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      } else {
        console.warn('Firebase Admin not initialized, skipping transaction logging.');
      }
    } catch (dbErr) {
      console.error('Error logging transaction to Firestore:', dbErr);
    }

    const formHtml = `
      <form id="nonseamless" method="post" name="redirect" action="${gatewayUrl}">
        <input type="hidden" id="encRequest" name="encRequest" value="${encRequest}">
        <input type="hidden" name="access_code" id="access_code" value="${accessCode}">
        <script language="javascript">document.redirect.submit();</script>
      </form>
    `;

    return NextResponse.json({ formHtml });
  } catch (error) {
    console.error('Error in CCAvenue Request API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
