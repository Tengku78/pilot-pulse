# PilotPulse Setup Guide

## Prerequisites

- Node.js 18+ installed
- A Supabase account (https://supabase.com)
- Git

## Step 1: Supabase Setup

### Create a New Supabase Project

1. Go to https://app.supabase.com
2. Click "New Project"
3. Fill in project details:
   - Name: `PilotPulse`
   - Database Password: (choose a strong password)
   - Region: (choose closest to you)
4. Wait for the project to be created (~2 minutes)

### Configure Database Schema

1. In your Supabase project dashboard, go to the **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `supabase-schema.sql` from this project
4. Paste it into the SQL editor
5. Click "Run" to execute the schema
6. Verify that all tables were created (check the Table Editor sidebar)

### Get API Credentials

1. In your Supabase project, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (under "Project URL")
   - **anon public** key (under "Project API keys")
   - **service_role** key (under "Project API keys" - keep this secret!)

### Configure Authentication

1. Go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Configure email templates (optional but recommended):
   - Go to **Authentication** → **Email Templates**
   - Customize the email templates with your branding

### Set Up Storage (for resume uploads)

1. Go to **Storage**
2. Create a new bucket called `resumes`
3. Set it to **Private** (requires authentication)
4. Create another bucket called `avatars`
5. Set it to **Public**

## Step 2: Local Environment Setup

1. Copy the environment template:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   ADMIN_EMAIL=qdelarre@gmail.com
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open http://localhost:3000 in your browser

## Step 3: Create Your Admin Account

1. Go to http://localhost:3000/auth/register
2. Register with your admin email: `qdelarre@gmail.com`
3. Choose any role (we'll update it to admin manually)
4. Check your email for verification link
5. After verifying, go back to Supabase:
   - **Table Editor** → **profiles**
   - Find your profile row
   - Change `role` from `pilot` to `admin`
   - Click "Save"

## Step 4: Add Sample Data (Optional)

You can add sample featured airlines, flight schools, and jobs through the admin panel once it's built, or manually through the Supabase Table Editor.

### Sample Airline Logos

Place airline logos in `public/images/airlines/`:
- emirates.png
- qatar.png
- singapore.png
- lufthansa.png
- ba.png
- delta.png

You can download these from the airlines' press kits or use placeholder images initially.

## Step 5: Deployment to Vercel

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git remote add origin your-github-repo-url
   git push -u origin main
   ```

2. Go to https://vercel.com and sign in
3. Click "New Project"
4. Import your GitHub repository
5. Configure environment variables:
   - Add all variables from `.env.local`
   - Update `NEXT_PUBLIC_APP_URL` to your Vercel domain
6. Click "Deploy"

## Step 6: Configure Supabase for Production

1. In Supabase, go to **Authentication** → **URL Configuration**
2. Add your Vercel domain to:
   - **Site URL**: `https://your-app.vercel.app`
   - **Redirect URLs**:
     - `https://your-app.vercel.app/auth/callback`
     - `http://localhost:3000/auth/callback`

## Step 7: Set Up Automated Job Scraping (Advanced)

This will be configured in the Edge Functions section. You'll need to:

1. Create a Supabase Edge Function for job scraping
2. Set up a cron job (using Vercel Cron or Supabase scheduled functions)
3. Configure API keys for job board APIs

Detailed instructions for this will be provided in the Edge Functions setup guide.

## Troubleshooting

### "Invalid API key" errors
- Double-check your `.env.local` file has the correct keys
- Make sure you copied the full keys (they're quite long)
- Restart your development server after updating `.env.local`

### Database connection errors
- Verify the Supabase project is running (not paused)
- Check the Project URL is correct
- Ensure the database schema was executed successfully

### Authentication not working
- Make sure email confirmation is enabled in Supabase
- Check the redirect URLs are correctly configured
- Look for errors in the browser console

### Styling issues
- Clear your browser cache
- Restart the development server
- Check that Tailwind CSS is properly installed

## Next Steps

1. Build out the remaining components (in progress)
2. Add sample data for testing
3. Configure job scraping automation
4. Set up news feed automation
5. Test all features thoroughly
6. Deploy to production

## Support

For issues, please check:
- Supabase documentation: https://supabase.com/docs
- Next.js documentation: https://nextjs.org/docs
- This project's GitHub issues

---

Created with ❤️ for aviation professionals worldwide
