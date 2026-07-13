import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { getAuthFromCookies } from '@/lib/auth';
import { successResponse, unauthorizedResponse, errorResponse } from '@/lib/apiResponse';

export async function GET() {
  try {
    const payload = await getAuthFromCookies();

    if (!payload) {
      return unauthorizedResponse('Not authenticated');
    }

    await connectDB();

    const admin = await Admin.findById(payload.id).select('-password');

    if (!admin || !admin.isActive) {
      return unauthorizedResponse('Account not found or deactivated');
    }

    return successResponse({
      id: admin._id.toString(),
      name: admin.name,
      email: admin.email,
      role: admin.role,
      lastLogin: admin.lastLogin,
    });
  } catch (error) {
    console.error('[ME ERROR]', error);
    return errorResponse('Internal server error', 500);
  }
}
