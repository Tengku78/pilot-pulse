# 🎯 Next Steps for PilotPulse

## Immediate Actions Required

### 1. Set Up Supabase (15 minutes)

**Create your Supabase project:**
1. Go to https://supabase.com and sign in/up
2. Click "New Project"
3. Fill in details:
   - Name: `PilotPulse`
   - Database Password: Choose a strong password (save it!)
   - Region: Choose your closest region
4. Wait ~2 minutes for project creation

**Run the database schema:**
1. In your Supabase dashboard, navigate to **SQL Editor**
2. Click "New Query"
3. Open `supabase-schema.sql` from this project
4. Copy ALL the content
5. Paste into the SQL Editor
6. Click "Run" (bottom right)
7. You should see "Success. No rows returned"

**Get your API keys:**
1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")
   - **service_role** key (under "Project API keys" - keep secret!)

**Create storage buckets:**
1. Go to **Storage** in sidebar
2. Click "New bucket"
3. Name: `resumes`, Policy: Private
4. Create another bucket
5. Name: `avatars`, Policy: Public

### 2. Configure Environment Variables (2 minutes)

```bash
# In the pilot-pulse directory
cp .env.local.example .env.local
```

Then edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-from-step-1
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-from-step-1
ADMIN_EMAIL=qdelarre@gmail.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Add Required Images

**Hero Image:**
Download a high-quality airplane image (2000x1200px recommended):
- Save as: `public/images/hero-airplane.jpg`
- Or use Unsplash: https://unsplash.com/s/photos/airplane-cockpit
- Recommended keywords: "airplane cockpit", "pilot view", "aviation"

**Placeholder Option:**
Create a simple gradient background instead by removing the Image component from `app/page.tsx` (I can help with this if needed)

**Airline Logos (Optional for now):**
- `public/images/airlines/emirates.png`
- `public/images/airlines/qatar.png`
- `public/images/airlines/singapore.png`
- `public/images/airlines/lufthansa.png`
- `public/images/airlines/ba.png`
- `public/images/airlines/delta.png`

You can add these later or download from airline press kits.

### 4. Start Development Server (1 minute)

```bash
# Make sure you're in the pilot-pulse directory
npm run dev
```

Open http://localhost:3000 in your browser.

### 5. Create Your Admin Account (5 minutes)

1. Click "Sign Up" in the top right
2. Fill in the form:
   - Full Name: Your name
   - Email: **qdelarre@gmail.com** (important!)
   - Password: Choose a strong password
   - Role: Any role (we'll change it)
3. Click "Create Account"
4. Check your email for verification link
5. Click the verification link

**Make yourself admin:**
1. Go back to Supabase dashboard
2. Click **Table Editor** → **profiles**
3. Find your row (should be the only one)
4. Click the edit button
5. Change `role` from whatever you selected to `admin`
6. Click Save

Now refresh the app - you should see "Admin" in the header!

## What Works Right Now

✅ **Authentication**
- Sign up with role selection
- Login
- Email verification
- Role-based access control

✅ **Homepage**
- Hero section with search bar
- Quick stats
- Featured airlines section (will show once you add airline data)
- Latest jobs (will show once you add jobs)
- Features showcase
- CTA section

✅ **Jobs Page**
- Tab switching between Pilot/Cabin Crew jobs
- Search functionality
- Region and contract type filters
- Responsive job cards
- Empty state when no jobs

✅ **Navigation**
- Responsive header
- User menu with dropdown
- Mobile menu
- Role-based menu items (Admin/Dashboard links)

## What to Build Next

### Priority 1: Add Sample Data

**Option A: Through Supabase UI**
1. Go to **Table Editor** in Supabase
2. Click on `jobs` table
3. Click "Insert row"
4. Fill in job details
5. Repeat for 3-5 jobs

**Option B: I can create a seed script**
Let me know if you want me to create a script that automatically adds sample data!

### Priority 2: Complete Core Features

The remaining features in order of importance:

1. **Job Detail Page** (`app/jobs/[id]/page.tsx`)
   - Show full job information
   - Application form
   - Resume upload

2. **Flight Schools Section** (`app/flight-schools/page.tsx`)
   - Directory listing
   - Search and filters
   - Detail pages

3. **Community Forum** (`app/forum/page.tsx`)
   - Categories list
   - Threads
   - Posts with realtime updates

4. **Recruiter Dashboard** (`app/dashboard/page.tsx`)
   - Post new jobs
   - Manage listings
   - View applications

5. **Admin Panel** (`app/admin/page.tsx`)
   - User management
   - Content moderation
   - Analytics

6. **News Section** (`app/news/page.tsx`)
   - News articles listing
   - Article detail pages
   - RSS feed integration

## Quick Wins

### Add Your First Job Manually

In Supabase Table Editor → `jobs`:
```
title: "First Officer - A320"
airline_name: "Example Airways"
contract_type: "Full-time"
region: "Middle East"
country: "UAE"
description: "Join our growing fleet..."
requirements: "ATPL, Type rating..."
tags: ["VIP", "Tax Free"]
status: "active"
posted_by: (your user ID)
posted_at: (use "now()" button)
is_featured: false
views_count: 0
```

### Add Featured Airlines

In Supabase Table Editor → `featured_airlines`:
```
name: "Emirates"
logo_url: "/images/airlines/emirates.png"
is_active: true
display_order: 1
```

## Testing Checklist

- [ ] Can register new account
- [ ] Can login
- [ ] Can logout
- [ ] Homepage loads without errors
- [ ] Jobs page loads
- [ ] Can switch between Pilot/Cabin Crew tabs
- [ ] Search works
- [ ] Filters work
- [ ] Mobile menu works
- [ ] User dropdown works

## Common Issues & Solutions

### "Invalid API key" error
- Double-check `.env.local` has correct keys
- Keys should be VERY long strings
- Restart dev server after changing `.env.local`

### Hero image not showing
- Check file exists at `public/images/hero-airplane.jpg`
- Check file name exactly matches (case sensitive)
- Or temporarily remove the Image component

### Database connection errors
- Verify Supabase project is not paused
- Check Project URL is correct in `.env.local`
- Ensure database schema was run successfully

### Styling looks broken
- Clear browser cache (Cmd+Shift+R on Mac)
- Restart dev server
- Check Tailwind CSS is properly installed (`npm list tailwindcss`)

## Need Help?

If you encounter any issues:

1. Check the console for error messages (F12 in browser)
2. Check terminal for server errors
3. Review [SETUP.md](./SETUP.md) for detailed instructions
4. Check [PROJECT_STATUS.md](./PROJECT_STATUS.md) for what's complete
5. Email: qdelarre@gmail.com

## Quick Commands Reference

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm start

# Check for TypeScript errors
npm run type-check

# Format code
npm run lint
```

## Deployment When Ready

### To Vercel (Recommended)

1. Push code to GitHub
2. Go to https://vercel.com
3. Click "New Project"
4. Import your GitHub repo
5. Add environment variables
6. Click "Deploy"

See [SETUP.md](./SETUP.md) for detailed deployment instructions.

---

## Summary: Your First 30 Minutes

1. ✅ Set up Supabase project (15 min)
2. ✅ Add environment variables (2 min)
3. ✅ Add hero image or remove Image component (3 min)
4. ✅ Start dev server (1 min)
5. ✅ Create admin account (5 min)
6. ✅ Add 1-2 sample jobs via Supabase UI (5 min)
7. ✅ Test the app! (5 min)

After that, you'll have a fully functional authentication system, beautiful homepage, and working jobs page!

**Ready to begin? Start with Step 1: Set Up Supabase** ☝️

Let me know if you need any help or want me to build out the next features!
