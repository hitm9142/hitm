import { NextResponse } from 'next/server';
import { mockStore, getAdminDb } from '@/lib/firebase-admin';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '10');

    const db = await getAdminDb();
    if (db) {
      let query = db.collection('notices').where('active', '==', true).orderBy('createdAt', 'desc').limit(limit);
      if (category) query = query.where('category', '==', category);
      const snapshot = await query.get();
      const notices = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return NextResponse.json({ success: true, data: notices });
    }

    // Fallback to mock data
    let data = mockStore.notices;
    if (category) data = data.filter(n => n.category === category);
    return NextResponse.json({ success: true, data: data.slice(0, limit) });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, category, content, date, active = true } = body;
    if (!title || !category) {
      return NextResponse.json({ success: false, message: 'Title and category are required' }, { status: 400 });
    }

    const noticeData = {
      title, category,
      content: content || '',
      date: date || new Date().toISOString().split('T')[0],
      active,
      createdAt: new Date().toISOString(),
    };

    const db = await getAdminDb();
    if (db) {
      const ref = await db.collection('notices').add({ ...noticeData, createdAt: new Date() });
      return NextResponse.json({ success: true, data: { id: ref.id, ...noticeData } }, { status: 201 });
    }

    const id = Date.now().toString();
    mockStore.notices.unshift({ id, ...noticeData });
    return NextResponse.json({ success: true, data: { id, ...noticeData } }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
