import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getAdminAuth } from '@/lib/firebase-admin';

const SECRET_KEY = process.env.OTP_SECRET_KEY || 'hitm-website-otp-secret-key-2026-v1';

export async function POST(request) {
  try {
    const body = await request.json();
    const { mobile, otp, hash, expiry } = body;

    if (!mobile || !otp || !hash || !expiry) {
      return NextResponse.json({ success: false, message: 'All parameters (mobile, otp, hash, expiry) are required' }, { status: 400 });
    }

    // Clean mobile number (keep digits only)
    const cleanedMobile = mobile.replace(/\D/g, '');
    const formattedMobile = cleanedMobile.length === 10 ? `91${cleanedMobile}` : cleanedMobile;

    // Check expiration
    if (Date.now() > Number(expiry)) {
      return NextResponse.json({ success: false, message: 'OTP has expired. Please request a new one.' }, { status: 400 });
    }

    // Recompute the HMAC signature
    const dataToHash = `${formattedMobile}.${otp}.${expiry}`;
    const calculatedHash = crypto
      .createHmac('sha256', SECRET_KEY)
      .update(dataToHash)
      .digest('hex');

    // Verify hash match
    if (calculatedHash !== hash) {
      return NextResponse.json({ success: false, message: 'Invalid OTP code. Please try again.' }, { status: 400 });
    }

    // Generate Firebase Custom Token to authenticate the user programmatically
    let customToken = null;
    try {
      const authAdmin = await getAdminAuth();
      if (authAdmin) {
        const phoneFormatted = `+${formattedMobile}`;
        const uid = phoneFormatted;

        // Ensure the Firebase Auth user is created/updated with the phone number property
        try {
          await authAdmin.getUser(uid);
        } catch (err) {
          if (err.code === 'auth/user-not-found') {
            await authAdmin.createUser({
              uid: uid,
              phoneNumber: phoneFormatted
            });
            console.log(`Created new Firebase Auth user with phone: ${phoneFormatted}`);
          } else {
            throw err;
          }
        }

        // Generate Custom Token
        customToken = await authAdmin.createCustomToken(uid);
      }
    } catch (firebaseErr) {
      console.error('Failed to generate Firebase Custom Token:', firebaseErr);
      // We don't fail the verification since the OTP is correct, but we log the error
    }

    return NextResponse.json({
      success: true,
      message: 'OTP verified successfully!',
      customToken
    });

  } catch (error) {
    console.error('Error in verifyOTP route:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Internal server error while verifying OTP'
    }, { status: 500 });
  }
}
