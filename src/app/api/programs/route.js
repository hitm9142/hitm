import { NextResponse } from 'next/server';
import { mockStore } from '@/lib/firebase-admin';

export async function GET() {
  return NextResponse.json({ success: true, data: mockStore.programs });
}
