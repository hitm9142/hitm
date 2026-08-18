import { NextResponse } from 'next/server';
import { mockStore } from '@/lib/firebase-admin';

export async function GET() {
  return NextResponse.json(
    { success: true, data: mockStore.programs },
    { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } }
  );
}
