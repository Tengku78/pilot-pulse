# ✈️ PilotPulse

A modern aviation careers platform connecting pilots, cabin crew, and recruiters worldwide. Built with Next.js 14, Supabase, and a stunning glassmorphism UI.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8)

## ✨ Features

### For Job Seekers
- 🎯 **Targeted Job Search** - Find pilot and cabin crew positions from airlines worldwide
- 🔍 **Advanced Filtering** - Search by location, contract type, airline, and more
- 📱 **Real-time Notifications** - Get instant alerts about new opportunities
- 💼 **Application Tracking** - Monitor your applications in one place
- 🏫 **Flight School Directory** - Discover accredited flight training programs
- 💬 **Community Forum** - Connect with aviation professionals globally

### For Recruiters
- 📝 **Easy Job Posting** - Create and manage job listings through a dedicated dashboard
- 👥 **Applicant Management** - Review applications and communicate with candidates
- 📊 **Analytics** - Track views, applications, and engagement metrics
- ⭐ **Featured Listings** - Promote your most important positions

### For Admins
- 🛠️ **Content Moderation** - Manage users, jobs, and forum posts
- 📈 **Platform Analytics** - Monitor growth and engagement
- ✅ **Approval Workflows** - Review and approve job postings
- 🎨 **Featured Content** - Curate airlines and highlight opportunities

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism design
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth with Row Level Security
- **Storage**: Supabase Storage (for resumes and avatars)
- **Realtime**: Supabase Realtime (for forum and notifications)
- **Deployment**: Vercel
- **Automation**: Supabase Edge Functions + Vercel Cron Jobs

## 📋 Prerequisites

- Node.js 18 or higher
- npm or yarn
- A Supabase account (free tier works great)
- A Vercel account for deployment

## 🔧 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project at [https://supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase-schema.sql`
3. Get your API credentials from **Settings** → **API**

### 3. Configure Environment

```bash
# Copy the environment template
cp .env.local.example .env.local

# Edit .env.local with your Supabase credentials
```

Required environment variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_EMAIL=qdelarre@gmail.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 5. Create Admin Account

1. Register at `/auth/register` with admin email (qdelarre@gmail.com)
2. Verify your email
3. In Supabase **Table Editor** → **profiles**, change your `role` to `admin`

## 📚 Detailed Setup

See [SETUP.md](./SETUP.md) for comprehensive setup instructions including:
- Supabase configuration
- Storage bucket setup
- Authentication providers
- Deployment to Vercel
- Custom domain setup

## 🏗️ Project Structure

```
pilot-pulse/
├── app/                    # Next.js 14 App Router
│   ├── auth/              # Authentication pages
│   ├── jobs/              # Job listings and details
│   ├── flight-schools/    # Flight school directory
│   ├── forum/             # Community forum
│   ├── news/              # Aviation news
│   ├── dashboard/         # Recruiter dashboard
│   ├── admin/             # Admin panel
│   └── layout.tsx         # Root layout
├── components/
│   ├── layout/            # Header, Footer, etc.
│   ├── ui/                # Reusable UI components
│   └── features/          # Feature-specific components
├── lib/
│   ├── supabase/          # Supabase client configs
│   ├── types/             # TypeScript definitions
│   ├── utils/             # Utility functions
│   └── hooks/             # React hooks
├── public/
│   └── images/            # Static images
└── supabase-schema.sql    # Database schema
```

## 🎨 Design System

### Glassmorphism UI

The platform features a custom glassmorphism design with:
- Semi-transparent glass cards with backdrop blur
- Subtle borders and shadows
- Dark aviation-themed background
- Smooth animations and transitions
- Responsive design for all devices

### CSS Classes

- `.glass` - Basic glass effect
- `.glass-card` - Glass card with hover effects
- `.glass-button` - Glass-styled button
- `.glass-input` - Glass-styled form input
- `.tag` - Colored tag/badge component

## 🗄️ Database Schema

### Core Tables

- **profiles** - User profiles with role-based access
- **jobs** - Pilot job listings
- **cabin_crew_jobs** - Cabin crew positions
- **flight_schools** - Flight training programs
- **forum_categories** - Forum organization
- **forum_threads** - Discussion threads
- **forum_posts** - User posts
- **news_articles** - Industry news
- **job_applications** - Application tracking
- **featured_airlines** - Highlighted airlines

See `supabase-schema.sql` for complete schema with RLS policies.

## 🔐 Security

- Row Level Security (RLS) enabled on all tables
- Role-based access control (Pilot, Cabin Crew, Recruiter, Admin)
- Secure authentication via Supabase Auth
- Protected routes with middleware
- XSS and SQL injection protection
- HTTPS enforced in production

## 🚀 Deployment

### Deploy to Vercel

```bash
# Build for production
npm run build

# Start production server
npm start
```

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Post-Deployment

1. Update Supabase Auth redirect URLs
2. Add production domain to CORS
3. Configure custom domain
4. Set up monitoring
5. Enable analytics

## 📊 Current Status

See [PROJECT_STATUS.md](./PROJECT_STATUS.md) for detailed progress tracking.

### Completed ✅
- Core authentication system
- Glassmorphism UI components
- Homepage with hero section
- Jobs listing with filtering
- Database schema with RLS
- Responsive navigation

### In Progress 🚧
- Job detail pages
- Job application system

### To Do 📋
- Flight Schools section
- Community Forum
- Recruiter Dashboard
- Admin Panel
- News section
- Automated scraping

## 📝 License

Copyright © 2026 PilotPulse. All rights reserved.

## 🐛 Known Issues

- Hero airplane image needs to be added to `/public/images/`
- Airline logos need to be added for featured section
- Form validation needs enhancement
- Loading states can be improved

## 📧 Support

For questions or issues:
- Email: qdelarre@gmail.com
- Check [SETUP.md](./SETUP.md) for troubleshooting

---

**Built with ❤️ for aviation professionals worldwide**

Ready for takeoff! 🛫
