import { NextResponse } from 'next/server';
import crypto from 'crypto';

const AUTH_KEY = 'EkdlXu3rZAgYvHr-HaqdDdRZIn0vZRhZTypHEl4l8bg';
const SECRET_KEY = process.env.OTP_SECRET_KEY || 'hitm-website-otp-secret-key-2026-v1';

export async function POST(request) {
  try {
    const body = await request.json();
    const { mobile, channel = 'sms' } = body;

    if (!mobile) {
      return NextResponse.json({ success: false, message: 'Mobile number is required' }, { status: 400 });
    }

    // Clean mobile number (keep digits only)
    const cleanedMobile = mobile.replace(/\D/g, '');
    if (cleanedMobile.length !== 10 && cleanedMobile.length !== 12) {
      return NextResponse.json({ success: false, message: 'Invalid mobile number format' }, { status: 400 });
    }

    // Standardize to prepend country code if 10 digits
    const formattedMobile = cleanedMobile.length === 10 ? `91${cleanedMobile}` : cleanedMobile;

    // Generate a secure 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Call apitxt Unified OTP API
    const apiUrl = new URL('https://www.apitxt.com/api/sendOTP');
    apiUrl.searchParams.append('authkey', AUTH_KEY);
    apiUrl.searchParams.append('mobile', formattedMobile);
    apiUrl.searchParams.append('otp', otp);
    
    if (channel && channel !== 'sms') {
      apiUrl.searchParams.append('channel', channel.toLowerCase());
    }

    console.log(`Sending OTP via ${channel} to ${formattedMobile}...`);
    
    const apiResponse = await fetch(apiUrl.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    const responseText = await apiResponse.text();
    console.log('apitxt Response:', responseText);

    // Some APIs return text or JSON, let's check if the call was successful
    if (!apiResponse.ok) {
      throw new Error(`OTP Gateway returned status ${apiResponse.status}: ${responseText}`);
    }

    // Expiry in 5 minutes (300,000 milliseconds)
    const expiry = Date.now() + 5 * 60 * 1000;

    // Generate cryptographic hash: SHA256(mobile.otp.expiry.secretKey)
    const dataToHash = `${formattedMobile}.${otp}.${expiry}`;
    const hash = crypto
      .createHmac('sha256', SECRET_KEY)
      .update(dataToHash)
      .digest('hex');

    // Return hash and expiry to client (OTP is NEVER sent to client in JSON response to prevent client-side intercept)
    return NextResponse.json({
      success: true,
      message: `OTP sent successfully via ${channel.toUpperCase()}`,
      hash,
      expiry,
      // For local testing/debugging purposes, we can print the OTP in console so the developer can see it
      debugOtp: process.env.NODE_ENV === 'development' ? otp : undefined
    });

  } catch (error) {
    console.error('Error in sendOTP route:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Internal server error while sending OTP'
    }, { status: 500 });
  }
}
