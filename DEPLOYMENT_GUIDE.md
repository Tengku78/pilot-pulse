# 🚀 PilotPulse Deployment Guide

Complete step-by-step guide to deploy PilotPulse to production.

---

## 📋 Prerequisites

- GitHub account
- Vercel account (sign up at https://vercel.com with GitHub)
- Supabase account (sign up at https://supabase.com)

---

## Step 1: Push to GitHub (5 minutes)

### Option A: Using GitHub CLI (Recommended)

```bash
# Install GitHub CLI if not already installed (Mac)
brew install gh

# Login to GitHub
gh auth login

# Create repository and push
gh repo create pilot-pulse --public --source=. --remote=origin --push
```

### Option B: Using GitHub Website

1. Go to https://github.com/new
2. Repository name: `pilot-pulse`
3. Make it **Public** (or Private if you prefer)
4. **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

6. Then run these commands:
```bash
git remote add origin https://github.com/YOUR_USERNAME/pilot-pulse.git
git branch -M main
git push -u origin main
```

✅ **Verify**: Refresh GitHub page - you should see all your code!

---

## Step 2: Set Up Supabase (15 minutes)

### 2.1 Create Project

1. Go to https://supabase.com/dashboard
2. Click "**New Project**"
3. Fill in:
   - **Name**: PilotPulse
   - **Database Password**: (create a strong password - save it!)
   - **Region**: Choose closest to you (e.g., US West, Europe)
   - **Pricing Plan**: Free tier is perfect for now
4. Click "**Create new project**"
5. Wait ~2 minutes for setup

### 2.2 Run Database Schema

1. In Supabase dashboard, click "**SQL Editor**" in left sidebar
2. Click "**New Query**"
3. Open `supabase-schema.sql` from your project
4. Copy **ALL** the content (Cmd+A, Cmd+C)
5. Paste into SQL Editor
6. Click "**Run**" (bottom right)
7. You should see: "Success. No rows returned" ✅

### 2.3 Get API Keys

1. Click "**Settings**" (gear icon) in left sidebar
2. Click "**API**" in the settings menu
3. Copy these values (keep this tab open):

```
Project URL: https://xxxxxxxxxxxxx.supabase.co
anon public key: eyJhbG... (very long string)
service_role key: eyJhbG... (very long string - keep SECRET!)
```

### 2.4 Create Storage Buckets

1. Click "**Storage**" in left sidebar
2. Click "**New bucket**"
3. Create first bucket:
   - Name: `resumes`
   - Public: **OFF** (keep private)
   - Click "Create bucket"

4. Click "**New bucket**" again
5. Create second bucket:
   - Name: `avatars`
   - Public: **ON**
   - Click "Create bucket"

✅ **Verify**: You should see 2 buckets in Storage

---

## Step 3: Create Local Environment File (2 minutes)

```bash
# In your terminal, in the pilot-pulse directory
cp .env.example .env.local
```

Now edit `.env.local` and add your Supabase values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...your-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...your-service-role-key
ADMIN_EMAIL=qdelarre@gmail.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important**: Replace the placeholder values with your actual Supabase values from Step 2.3!

---

## Step 4: Test Locally (5 minutes)

```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

Open http://localhost:3000 in your browser.

### Quick Test Checklist:

- [ ] Homepage loads with glassmorphism design
- [ ] Click "Sign Up" - registration page loads
- [ ] Fill form and create account with `qdelarre@gmail.com`
- [ ] Check your email for verification link
- [ ] Click verification link
- [ ] You should be redirected back and logged in!

### Make Yourself Admin:

1. Go to Supabase dashboard → **Table Editor** → **profiles**
2. Find your row (should be the only one)
3. Click edit button (pencil icon)
4. Change `role` from `pilot` to `admin`
5. Click "Save"
6. Refresh your app - you should see "Admin" in header!

✅ **If everything works locally, proceed to deployment!**

---

## Step 5: Deploy to Vercel (10 minutes)

### 5.1 Connect GitHub to Vercel

1. Go to https://vercel.com
2. Click "**Add New...**" → "**Project**"
3. Click "**Import Git Repository**"
4. Find `pilot-pulse` repo and click "**Import**"

### 5.2 Configure Project

1. **Project Name**: `pilot-pulse` (or customize)
2. **Framework Preset**: Next.js (should auto-detect)
3. **Root Directory**: `./` (leave as is)
4. **Build Command**: `npm run build` (default)
5. **Output Directory**: `.next` (default)

### 5.3 Add Environment Variables

Click "**Environment Variables**" section and add these **one by one**:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key |
| `ADMIN_EMAIL` | `qdelarre@gmail.com` |
| `NEXT_PUBLIC_APP_URL` | Leave empty for now |

**Make sure to add all 5 variables!**

### 5.4 Deploy!

1. Click "**Deploy**"
2. Wait 2-3 minutes for build and deployment
3. You'll see "**Congratulations!**" when done 🎉

### 5.5 Update App URL

1. Copy your deployment URL (e.g., `https://pilot-pulse-xxx.vercel.app`)
2. Go to Vercel → Your Project → "**Settings**" → "**Environment Variables**"
3. Find `NEXT_PUBLIC_APP_URL`
4. Click "**Edit**"
5. Set value to your deployment URL (e.g., `https://pilot-pulse-xxx.vercel.app`)
6. Click "**Save**"
7. Go to "**Deployments**" tab
8. Click "**...** (three dots)" on latest deployment → "**Redeploy**"

### 5.6 Configure Supabase Auth URLs

1. Go to Supabase dashboard
2. Click "**Authentication**" → "**URL Configuration**"
3. Update these values:

```
Site URL: https://pilot-pulse-xxx.vercel.app
Redirect URLs:
  https://pilot-pulse-xxx.vercel.app/auth/callback
  http://localhost:3000/auth/callback
```

4. Click "**Save**"

✅ **Your app is now live!**

---

## Step 6: Test Production Deployment (5 minutes)

Visit your Vercel URL: `https://pilot-pulse-xxx.vercel.app`

### Test Checklist:

- [ ] Homepage loads correctly
- [ ] Glassmorphism effects work
- [ ] Navigation works
- [ ] Click "Sign Up" and create test account
- [ ] Check email for verification
- [ ] Login works
- [ ] Browse to /jobs page
- [ ] User menu dropdown works

---

## 🎨 Optional: Add Images

### Hero Background Image

1. Download a high-quality airplane image:
   - Unsplash: https://unsplash.com/s/photos/airplane-cockpit
   - Recommended: Cockpit view, pilot perspective, aviation theme

2. Save as `public/images/hero-airplane.jpg`

3. Commit and push:
```bash
git add public/images/hero-airplane.jpg
git commit -m "Add hero background image"
git push
```

Vercel will auto-deploy the update!

### Airline Logos

Download logos from airline press kits or use placeholder images:

```
public/images/airlines/
├── emirates.png
├── qatar.png
├── singapore.png
├── lufthansa.png
├── ba.png
└── delta.png
```

---

## 🔧 Continuous Deployment Setup

Vercel automatically deploys when you push to GitHub!

```bash
# Make changes to your code
git add .
git commit -m "Your change description"
git push

# Vercel automatically builds and deploys!
# Check deployment status at vercel.com/dashboard
```

---

## 📊 Monitor Your App

### Vercel Dashboard
- **Deployments**: See all deployments and build logs
- **Analytics**: Track page views (free on Pro plan)
- **Logs**: View runtime logs and errors

### Supabase Dashboard
- **Table Editor**: View/edit database records
- **Authentication**: Manage users
- **Storage**: View uploaded files (resumes)
- **Database**: Monitor queries and performance
- **Logs**: View database and API logs

---

## 🐛 Troubleshooting

### Build Fails on Vercel

**Check build logs:**
1. Go to Vercel deployment
2. Click "View Build Logs"
3. Look for errors

**Common issues:**
- Missing environment variables → Add them in Vercel settings
- TypeScript errors → Run `npm run build` locally first
- Missing dependencies → Check `package.json`

### Auth Not Working

**Verify environment variables:**
```bash
# Check they're all set in Vercel
NEXT_PUBLIC_SUPABASE_URL ✓
NEXT_PUBLIC_SUPABASE_ANON_KEY ✓
SUPABASE_SERVICE_ROLE_KEY ✓
```

**Check Supabase redirect URLs:**
- Should include your Vercel domain + `/auth/callback`

### Can't See Database Tables

**Run schema again:**
1. Supabase → SQL Editor
2. Paste `supabase-schema.sql` content
3. Run query

### Images Not Loading

**Check file paths:**
- Files in `public/` are accessed as `/images/filename.jpg`
- Not `public/images/filename.jpg`

---

## 🎯 Quick Commands Reference

```bash
# Local development
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Run production build locally
npm run lint         # Check for errors

# Git & Deployment
git add .                              # Stage changes
git commit -m "Your message"          # Commit changes
git push                               # Push to GitHub (triggers Vercel deploy)
git status                            # Check current status
git log --oneline -5                  # See recent commits

# GitHub CLI
gh repo view --web                    # Open repo in browser
gh browse                             # Open deployed site
```

---

## 🔗 Important Links

Save these for easy access:

- **Live Site**: https://pilot-pulse-xxx.vercel.app
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Supabase Dashboard**: https://supabase.com/dashboard
- **GitHub Repo**: https://github.com/YOUR_USERNAME/pilot-pulse

---

## ✅ Post-Deployment Checklist

- [ ] App deployed to Vercel
- [ ] Custom domain connected (optional)
- [ ] Environment variables set
- [ ] Supabase auth URLs configured
- [ ] Admin account created
- [ ] Test registration works
- [ ] Test login works
- [ ] Test job browsing works
- [ ] Storage buckets created
- [ ] Database schema running
- [ ] All links work
- [ ] Mobile responsive

---

## 🚀 What's Next?

Now that everything is deployed:

1. **Add Sample Data**: Create a few test job listings in Supabase
2. **Customize**: Update branding, colors, copy
3. **Add Images**: Hero image and airline logos
4. **Build More Features**:
   - Recruiter Dashboard
   - Flight Schools Directory
   - Community Forum
   - News Feed
   - Admin Panel

---

## 📞 Need Help?

- Check [SETUP.md](./SETUP.md) for detailed setup instructions
- Check [PROJECT_STATUS.md](./PROJECT_STATUS.md) for feature status
- Review [NEXT_STEPS.md](./NEXT_STEPS.md) for development roadmap

---

**🎉 Congratulations! Your PilotPulse platform is now live!**
