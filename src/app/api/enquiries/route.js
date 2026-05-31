import { NextResponse } from 'next/server';
import { mockStore, getAdminDb } from '@/lib/firebase-admin';

export async function GET() {
  try {
    const db = await getAdminDb();
    if (db) {
      const snap = await db.collection('enquiries').orderBy('createdAt', 'desc').get();
      return NextResponse.json({ success: true, data: snap.docs.map(d => ({ id: d.id, ...d.data() })) });
    }
    return NextResponse.json({ success: true, data: mockStore.enquiries });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, program, email, message } = body;
    if (!name || !phone) {
      return NextResponse.json({ success: false, message: 'Name and phone are required' }, { status: 400 });
    }
    const enquiryData = {
      name, phone,
      email: email || '',
      program: program || '',
      message: message || '',
      status: 'New',
      createdAt: new Date().toISOString(),
    };
    const db = await getAdminDb();
    if (db) {
      const ref = await db.collection('enquiries').add({ ...enquiryData, createdAt: new Date() });
      return NextResponse.json({ success: true, message: 'Enquiry submitted', data: { id: ref.id, ...enquiryData } }, { status: 201 });
    }
    const id = Date.now().toString();
    mockStore.enquiries.unshift({ id, ...enquiryData });
    return NextResponse.json({ success: true, message: 'Enquiry submitted', data: { id, ...enquiryData } }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
