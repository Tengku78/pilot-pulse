# 🎯 START HERE - Quick Setup Guide

Follow these steps **in order** to get PilotPulse running!

---

## ⚡ Quick Summary

You need to:
1. Push code to GitHub (5 min)
2. Create Supabase project (15 min)
3. Set up local environment (2 min)
4. Test locally (5 min)
5. Deploy to Vercel (10 min)

**Total time: ~40 minutes**

---

## Step 1: Push to GitHub (5 minutes)

Your code is ready and committed! Now let's push it to GitHub.

### Option A: Use GitHub Website (Easiest)

1. **Go to**: https://github.com/new
2. **Repository name**: `pilot-pulse`
3. **Visibility**: Choose Public or Private
4. **Important**: DO NOT check any boxes (no README, no .gitignore, no license)
5. Click "**Create repository**"

6. **Copy the commands** shown on GitHub under "push an existing repository", they'll look like:
```bash
git remote add origin https://github.com/YOUR_USERNAME/pilot-pulse.git
git branch -M main
git push -u origin main
```

7. **Run those commands** in your terminal (in the pilot-pulse folder)

8. **Refresh GitHub** - you should see all your code! ✅

### Option B: Use GitHub CLI (If you have it)

```bash
# Install (Mac only)
brew install gh

# Login
gh auth login

# Create repo and push
gh repo create pilot-pulse --public --source=. --remote=origin --push
```

**✅ Checkpoint**: Your code is now on GitHub!

---

## Step 2: Create Supabase Project (15 minutes)

### 2.1 Create Project

1. **Go to**: https://supabase.com/dashboard
2. Click "**New Project**"
3. Fill in:
   - **Name**: PilotPulse
   - **Database Password**: Make a strong password and **SAVE IT**
   - **Region**: Pick closest to you
4. Click "**Create new project**"
5. **Wait 2 minutes** for it to set up

### 2.2 Run Database Schema

1. Click "**SQL Editor**" in the left sidebar
2. Click "**New Query**"
3. **Open** the file `supabase-schema.sql` from your project folder
4. **Copy everything** (Cmd+A, Cmd+C)
5. **Paste** into the SQL Editor in Supabase
6. Click "**Run**" button (bottom right)
7. Should see: "Success. No rows returned" ✅

### 2.3 Get Your Keys (IMPORTANT!)

1. Click "**Settings**" (gear icon) in left sidebar
2. Click "**API**"
3. **Copy these 2 things** (keep this tab open!):

```
Project URL: https://xxxxxxxx.supabase.co
anon public: eyJhbG... (long string)
```

**Keep these safe - you'll need them in the next step!**

### 2.4 Create Storage Buckets

1. Click "**Storage**" in left sidebar
2. Click "**New bucket**"
3. Bucket 1:
   - Name: `resumes`
   - Public: **OFF** (keep unchecked)
   - Click "Create bucket"

4. Click "**New bucket**" again
5. Bucket 2:
   - Name: `avatars`
   - Public: **ON** (check this box)
   - Click "Create bucket"

**✅ Checkpoint**: Database is ready with 2 storage buckets!

---

## Step 3: Set Up Local Environment (2 minutes)

```bash
# In your terminal, in the pilot-pulse folder:
cp .env.example .env.local
```

Now **edit** the `.env.local` file and paste your Supabase values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...your-long-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...your-long-service-key
ADMIN_EMAIL=qdelarre@gmail.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Where to find service_role key?**
- Back in Supabase → Settings → API
- Scroll down to "service_role" key
- Click to reveal and copy

**✅ Checkpoint**: Environment variables are configured!

---

## Step 4: Test Locally (5 minutes)

```bash
# Make sure you're in the pilot-pulse folder
npm install    # Install dependencies (if not done)
npm run dev    # Start the dev server
```

**Open**: http://localhost:3000

### Test These Things:

1. **Homepage loads** - Should see glassmorphism design ✅
2. Click "**Sign Up**" in top right
3. Fill in the form:
   - Full Name: Your name
   - Email: **qdelarre@gmail.com** (use this!)
   - Password: Make a password
   - Role: Pick any
4. Click "Create Account"
5. **Check your email** for verification link
6. Click the link
7. You should be logged in! ✅

### Make Yourself Admin:

1. Go back to **Supabase dashboard**
2. Click "**Table Editor**" → "**profiles**"
3. You should see your profile row
4. Click the **edit icon** (pencil)
5. Change `role` from `pilot` (or whatever) to `admin`
6. Click "**Save**"
7. **Refresh** your app
8. You should now see "Admin" in the header! ✅

**✅ Checkpoint**: App works locally!

---

## Step 5: Deploy to Vercel (10 minutes)

### 5.1 Import Project

1. **Go to**: https://vercel.com
2. Sign in with GitHub
3. Click "**Add New...**" → "**Project**"
4. Find your `pilot-pulse` repo
5. Click "**Import**"

### 5.2 Add Environment Variables

Before clicking deploy, add these **5 environment variables**:

Click "**Environment Variables**" and add:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your service role key |
| `ADMIN_EMAIL` | `qdelarre@gmail.com` |
| `NEXT_PUBLIC_APP_URL` | Leave empty for now |

### 5.3 Deploy!

1. Click "**Deploy**"
2. Wait 2-3 minutes
3. You'll see "**Congratulations!**" 🎉
4. **Copy your deployment URL** (e.g., `https://pilot-pulse-xxx.vercel.app`)

### 5.4 Update App URL

1. In Vercel, go to "**Settings**" → "**Environment Variables**"
2. Find `NEXT_PUBLIC_APP_URL`
3. Click "**Edit**"
4. Paste your deployment URL
5. Click "**Save**"
6. Go to "**Deployments**" tab
7. Click "**...**" on latest → "**Redeploy**"

### 5.5 Configure Supabase Auth URLs

1. **Go back to Supabase**
2. Click "**Authentication**" → "**URL Configuration**"
3. Set these values:

```
Site URL: https://pilot-pulse-xxx.vercel.app

Redirect URLs (add both):
  https://pilot-pulse-xxx.vercel.app/auth/callback
  http://localhost:3000/auth/callback
```

4. Click "**Save**"

**✅ Checkpoint**: Your app is LIVE! 🚀

---

## Step 6: Test Production (5 minutes)

**Visit**: Your Vercel URL (e.g., `https://pilot-pulse-xxx.vercel.app`)

### Quick Test:

- [ ] Homepage loads
- [ ] Navigation works
- [ ] Can sign up
- [ ] Email verification works
- [ ] Can login
- [ ] /jobs page works

---

## 🎉 YOU'RE DONE!

Your PilotPulse platform is now:
- ✅ Live on the internet
- ✅ Connected to database
- ✅ Auth working
- ✅ Ready for users!

---

## 📍 Important Links (Save These!)

- **Your Live Site**: `https://pilot-pulse-xxx.vercel.app`
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Supabase Dashboard**: https://supabase.com/dashboard
- **GitHub Repo**: `https://github.com/YOUR_USERNAME/pilot-pulse`

---

## 🔄 Making Updates

After this setup, any time you make changes:

```bash
git add .
git commit -m "Your change description"
git push
```

**Vercel automatically deploys the update!** Check the Vercel dashboard to see progress.

---

## 🆘 Need Help?

If something doesn't work:

1. **Check** [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Detailed troubleshooting
2. **Verify** all environment variables are set correctly
3. **Check** Vercel deployment logs for errors
4. **Check** Supabase dashboard for database issues
5. **Email**: qdelarre@gmail.com

---

## 📚 What's Next?

Now that your app is deployed:

1. **Add sample job data** in Supabase Table Editor
2. **Add images**:
   - Hero airplane image: `public/images/hero-airplane.jpg`
   - Airline logos in `public/images/airlines/`
3. **Build more features**:
   - Recruiter Dashboard
   - Flight Schools
   - Forum
   - Admin Panel

See [PROJECT_STATUS.md](./PROJECT_STATUS.md) for the full roadmap!

---

**Ready to add more features? Let me know which section you want to build next!**
