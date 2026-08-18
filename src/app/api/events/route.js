import { NextResponse } from 'next/server';
import { mockStore, getAdminDb } from '@/lib/firebase-admin';

export async function GET() {
  try {
    const headers = { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' };
    const db = await getAdminDb();
    if (db) {
      const snap = await db.collection('events').orderBy('date', 'asc').get();
      return NextResponse.json({ success: true, data: snap.docs.map(d => ({ id: d.id, ...d.data() })) }, { headers });
    }
    return NextResponse.json({ success: true, data: mockStore.events }, { headers });
  } catch (err) {
    return NextResponse.json({ success: true, data: mockStore.events }, { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const eventData = { ...body, active: true, createdAt: new Date().toISOString() };
    const db = await getAdminDb();
    if (db) {
      const ref = await db.collection('events').add({ ...eventData, createdAt: new Date() });
      return NextResponse.json({ success: true, data: { id: ref.id, ...eventData } }, { status: 201 });
    }
    const id = Date.now().toString();
    mockStore.events.push({ id, ...eventData });
    return NextResponse.json({ success: true, data: { id, ...eventData } }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
