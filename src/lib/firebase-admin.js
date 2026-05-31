// Firebase Admin for API routes
let adminApp = null;
let adminDb = null;

// Mock data store (used when Firebase Admin is not configured)
export const mockStore = {
  notices: [
    { id: "1", title: "Admission Notice for B.Tech 2026 Batch", category: "Admissions", date: "2026-04-11", content: "Admissions are open for the 2026 academic session.", active: true, createdAt: new Date().toISOString() },
    { id: "2", title: "End Semester Exam Schedule - 2025-26", category: "Examination", date: "2026-04-10", content: "End semester exams scheduled from May 5 to May 20, 2026.", active: true, createdAt: new Date().toISOString() },
    { id: "3", title: "Campus Placement Drive - Infosys & TCS", category: "Placement", date: "2026-04-09", content: "Campus recruitment drive by Infosys & TCS on April 25.", active: true, createdAt: new Date().toISOString() },
    { id: "4", title: "Annual Sports Week Announcement 2026", category: "Events", date: "2026-04-08", content: "Sports week from April 28 to May 3, 2026.", active: true, createdAt: new Date().toISOString() },
    { id: "5", title: "Scholarship Form Last Date Extended", category: "Scholarship", date: "2026-04-07", content: "Apply for scholarships by April 30, 2026.", active: true, createdAt: new Date().toISOString() },
  ],
  events: [
    { id: "1", title: "Annual Convocation 2026", date: "2026-04-20", type: "Academic", description: "3rd Annual Convocation ceremony", active: true },
    { id: "2", title: "TechFest HITMX 2026", date: "2026-05-03", type: "Technical", description: "Annual Inter-college Technical Fest", active: true },
    { id: "3", title: "Inter-College Sports Meet", date: "2026-04-28", type: "Sports", description: "Annual sports competition", active: true },
    { id: "4", title: "Cultural Fest – Utsav 2026", date: "2026-05-15", type: "Cultural", description: "Grand cultural celebration", active: true },
    { id: "5", title: "National Seminar on AI & ML", date: "2026-05-10", type: "Academic", description: "One-day national seminar", active: true },
  ],
  enquiries: [
    { id: "1", name: "Rahul Kumar", email: "rahul@email.com", phone: "9876543210", program: "B.Tech CSE", status: "New", message: "Interested in CSE", createdAt: new Date().toISOString() },
    { id: "2", name: "Priya Singh", email: "priya@email.com", phone: "9988776655", program: "MBA", status: "Contacted", message: "Need fee info", createdAt: new Date().toISOString() },
    { id: "3", name: "Amit Sharma", email: "amit@email.com", phone: "9765432198", program: "BCA", status: "New", message: "12th pass query", createdAt: new Date().toISOString() },
  ],
  programs: [
    { id: "1", name: "B.Tech (Computer Science & Engineering)", school: "Engineering & IT", duration: "4 Years", level: "UG", fee: "130000", seats: 60 },
    { id: "2", name: "B.Tech (Mechanical Engineering)", school: "Engineering & IT", duration: "4 Years", level: "UG", fee: "110000", seats: 60 },
    { id: "3", name: "BCA", school: "Engineering & IT", duration: "3 Years", level: "UG", fee: "55000", seats: 60 },
    { id: "4", name: "MCA", school: "Engineering & IT", duration: "2 Years", level: "PG", fee: "65000", seats: 30 },
    { id: "5", name: "MBA", school: "Management", duration: "2 Years", level: "PG", fee: "80000", seats: 60 },
    { id: "6", name: "BBA", school: "Management", duration: "3 Years", level: "UG", fee: "50000", seats: 60 },
  ],
};

export async function getAdminDb() {
  if (adminDb) return adminDb;
  try {
    const admin = await import("firebase-admin");
    if (!admin.default.apps.length) {
      const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
      const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
      const projectId = process.env.FIREBASE_PROJECT_ID;

      if (privateKey && clientEmail && projectId && !privateKey.includes("YOUR_PRIVATE_KEY")) {
        admin.default.initializeApp({
          credential: admin.default.credential.cert({ projectId, clientEmail, privateKey }),
          projectId,
        });
        adminDb = admin.default.firestore();
        return adminDb;
      }
    } else {
      adminDb = admin.default.firestore();
      return adminDb;
    }
  } catch (e) {
    // Firebase Admin not available or not configured
  }
  return null;
}
