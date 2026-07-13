/**
 * ONE-TIME seed endpoint to create the first admin user.
 * IMPORTANT: Delete or disable this file after creating the first admin.
 * Protected by SEED_SECRET environment variable.
 */
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { hashPassword } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/apiResponse';

export async function POST(request) {
  try {
    // Protect this endpoint with a secret
    const { secret, name, email, password } = await request.json();

    if (!process.env.SEED_SECRET || secret !== process.env.SEED_SECRET) {
      return errorResponse('Forbidden', 403);
    }

    if (!name || !email || !password) {
      return errorResponse('name, email, and password are required', 400);
    }

    await connectDB();

    // Check if any admin already exists
    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
      return errorResponse('An admin with this email already exists', 409);
    }

    const hashedPassword = await hashPassword(password);

    const admin = await Admin.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'super_admin',
    });

    return successResponse(
      {
        id: admin._id.toString(),
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
      'Admin created successfully',
      201
    );
  } catch (error) {
    console.error('[SEED ERROR]', error);
    return errorResponse('Internal server error', 500);
  }
}
