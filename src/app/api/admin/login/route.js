import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { comparePassword, signToken, setAuthCookie } from '@/lib/auth';
import { loginSchema } from '@/lib/validations';
import { checkRateLimit, recordFailedAttempt, clearAttempts } from '@/lib/rateLimit';
import { errorResponse, validationError } from '@/lib/apiResponse';

export async function POST(request) {
  try {
    // Get client IP for rate limiting
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1';

    // Check rate limit
    const rateLimit = checkRateLimit(ip);
    if (rateLimit.limited) {
      const resetMinutes = Math.ceil((rateLimit.resetAt - Date.now()) / 60000);
      return errorResponse(
        `Too many login attempts. Please try again in ${resetMinutes} minute(s).`,
        429
      );
    }

    // Parse and validate body
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return validationError(parsed.error.flatten().fieldErrors);
    }

    const { email, password, rememberMe } = parsed.data;

    // Connect to DB
    await connectDB();

    // Find admin by email
    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (!admin) {
      recordFailedAttempt(ip);
      return errorResponse('Invalid email or password', 401);
    }

    if (!admin.isActive) {
      return errorResponse('Your account has been deactivated. Please contact support.', 403);
    }

    // Verify password
    const isValid = await comparePassword(password, admin.password);

    if (!isValid) {
      recordFailedAttempt(ip);
      return errorResponse('Invalid email or password', 401);
    }

    // Clear rate limit on successful login
    clearAttempts(ip);

    // Update last login
    await Admin.findByIdAndUpdate(admin._id, { lastLogin: new Date() });

    // Sign JWT
    const token = signToken(
      {
        id: admin._id.toString(),
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
      rememberMe ? '30d' : '1d'
    );

    // Build response
    const response = NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        data: {
          admin: {
            id: admin._id.toString(),
            name: admin.name,
            email: admin.email,
            role: admin.role,
          },
        },
      },
      { status: 200 }
    );

    // Set HTTP-only cookie
    setAuthCookie(response, token, rememberMe);

    return response;
  } catch (error) {
    console.error('[LOGIN ERROR]', error);
    return errorResponse('Internal server error', 500);
  }
}
