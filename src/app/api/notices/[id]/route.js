import { NextResponse } from 'next/server';
import { mockStore, getAdminDb } from '@/lib/firebase-admin';

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const db = await getAdminDb();
    if (db) {
      await db.collection('notices').doc(params.id).update({ ...body, updatedAt: new Date() });
      return NextResponse.json({ success: true, message: 'Notice updated' });
    }
    const idx = mockStore.notices.findIndex(n => n.id === params.id);
    if (idx !== -1) mockStore.notices[idx] = { ...mockStore.notices[idx], ...body };
    return NextResponse.json({ success: true, message: 'Notice updated' });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const db = await getAdminDb();
    if (db) {
      await db.collection('notices').doc(params.id).delete();
      return NextResponse.json({ success: true, message: 'Notice deleted' });
    }
    mockStore.notices = mockStore.notices.filter(n => n.id !== params.id);
    return NextResponse.json({ success: true, message: 'Notice deleted' });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
