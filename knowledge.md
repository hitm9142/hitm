# Vercel Deployment & Optimization Knowledge Base
For AHCT (Al Haider College of Technology) Website

### 1. Cost Warning & Vercel Free Tier Limitations
Vercel's free Tier (Hobby) limits Serverless Function Execution (which includes Dynamic Rendering / SSR) closely. Every time a user visits a dynamic route without cache, Vercel executes a Lambda function, consuming your 100GB-hours/month limit fast.
By optimizing for Static Generation (SSG), your files are hosted globally on Vercel's Edge CDN at no computation cost!

### 2. What We Optimized For Free Tier:
- **SSG (Static Site Generation)**: Almost 100% of the website's public pages (About, Campus, Placement, Notice, Contact) are pre-rendered at build time.
- **Client-Side Firebase Operations (CSR)**: Instead of using expensive Next.js Server Components API routes to talk to Firebase, we implemented Firebase fetching (`onSnapshot`, `getDocs`, `setDoc`) strictly on the front-end Client Components. This completely bypasses Vercel's limits because the database fetch happens on the visitor's browser computationally. 
- **Upload Optimization**: Added `browser-image-compression` on the Enquiries form. This shifts the heavy image compression work to the Student's smartphone/PC *before* the upload to Firebase Storage, saving enormous bandwidth and avoiding Server-side timeout limitations (Vercel free tier times out after 10 seconds).
- **ESLint Fixes**: All syntax-level hydration issues like unescaped quotes (`'`, `"`) were resolved so Next.js static engine completes builds flawlessly on the Vercel infrastructure.

### 3. Vercel Hosting Instructions:

**Steps to deploy your code to Vercel right now:**
1. Commit all these changes to a GitHub Repository (e.g. `hitm-react-nextjs`).
2. Login to [Vercel.com](https://vercel.com).
3. Click "Add New" -> "Project" -> Select your GitHub repository.
4. Framework Preset: **Next.js**.
5. **Environment Variables**: Add your `.env.local` contents there exactly as they are locally:
   - `NEXT_PUBLIC_FIREBASE_API_KEY=...`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID=...`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...`
   - `NEXT_PUBLIC_FIREBASE_APP_ID=...`
   *(It is critical you copy all Firebase vars over otherwise Auth & Queries will crash on Production).*
6. Click **Deploy**. Since we just successfully executed and verified `npm run build` locally, it will successfully compile on Vercel's server without errors.

Whenever you want to upgrade plans or move resources around to scale, you won't need to rebuild logic, just scale your Firebase Firestore read-writes!
