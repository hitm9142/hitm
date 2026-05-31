import { NextResponse } from 'next/server';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, increment } from 'firebase/firestore';

// Reuse the client-side Firebase config — no service account needed
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function getDb() {
  const app = getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApps()[0];
  return getFirestore(app);
}

export async function POST() {
  try {
    const db = getDb();
    const ref = doc(db, 'stats', 'visits');

    await setDoc(ref, { count: increment(1) }, { merge: true });

    const snap = await getDoc(ref);
    const count = snap.data()?.count ?? 1;

    return NextResponse.json({ count }, { status: 200 });
  } catch (err) {
    console.error('Visit counter error:', err);
    return NextResponse.json({ count: null, error: 'Failed' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = getDb();
    const snap = await getDoc(doc(db, 'stats', 'visits'));
    const count = snap.data()?.count ?? 0;
    return NextResponse.json({ count }, { status: 200 });
  } catch (err) {
    console.error('Visit counter read error:', err);
    return NextResponse.json({ count: null, error: 'Failed' }, { status: 500 });
  }
}
