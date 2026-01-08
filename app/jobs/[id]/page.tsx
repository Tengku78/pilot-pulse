import { createServerClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import {
  MapPin,
  Building2,
  Clock,
  Briefcase,
  Calendar,
  Eye,
  Share2,
  Bookmark,
  AlertCircle
} from 'lucide-react'
import JobApplicationForm from '@/components/features/JobApplicationForm'

interface JobDetailPageProps {
  params: {
    id: string
  }
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const supabase = await createServerClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch job details
  const { data: job, error } = await supabase
    .from('jobs')
    .select(`
      *,
      recruiter:posted_by(
        id,
        full_name,
        email,
        company_name
      )
    `)
    .eq('id', params.id)
    .single()

  if (error || !job) {
    notFound()
  }

  // Increment view count
  if (user) {
    await supabase
      .from('jobs')
      .update({ views_count: (job.views_count || 0) + 1 })
      .eq('id', params.id)
  }

  // Check if user has already applied
  let hasApplied = false
  if (user) {
    const { data: application } = await supabase
      .from('job_applications')
      .select('id')
      .eq('job_id', params.id)
      .eq('applicant_id', user.id)
      .single()

    hasApplied = !!application
  }

  // Get user profile for role check
  let userRole = null
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    userRole = profile?.role
  }

  const canApply = user && (userRole === 'pilot' || userRole === 'cabin_crew') && !hasApplied && job.status === 'active'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Back button */}
          <a
            href="/jobs"
            className="inline-flex items-center text-blue-300 hover:text-blue-200 transition-colors mb-6"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Jobs
          </a>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job header card */}
              <div className="glass rounded-2xl p-8 border border-white/10">
                {/* Status badge */}
                {job.status !== 'active' && (
                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                      <AlertCircle className="w-4 h-4 mr-1.5" />
                      {job.status === 'closed' ? 'Position Closed' : 'Draft'}
                    </span>
                  </div>
                )}

                {/* Airline logo placeholder */}
                {job.airline_logo_url && (
                  <div className="mb-6">
                    <img
                      src={job.airline_logo_url}
                      alt={job.airline_name}
                      className="h-16 w-auto object-contain"
                    />
                  </div>
                )}

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  {job.title}
                </h1>

                <div className="flex items-center text-xl text-blue-300 mb-6">
                  <Building2 className="w-5 h-5 mr-2" />
                  {job.airline_name}
                </div>

                {/* Key details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-gray-400">Location</div>
                      <div className="text-white font-medium">{job.country}</div>
                      {job.city && <div className="text-sm text-gray-300">{job.city}</div>}
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Briefcase className="w-5 h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-gray-400">Type</div>
                      <div className="text-white font-medium">{job.contract_type}</div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-gray-400">Region</div>
                      <div className="text-white font-medium">{job.region}</div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-gray-400">Posted</div>
                      <div className="text-white font-medium">
                        {format(new Date(job.posted_at), 'MMM d, yyyy')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                {job.tags && job.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {job.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Salary range */}
                {(job.salary_min || job.salary_max) && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6">
                    <div className="text-sm text-green-300 mb-1">Salary Range</div>
                    <div className="text-2xl font-bold text-green-400">
                      {job.salary_currency} {job.salary_min?.toLocaleString()}
                      {job.salary_max && ` - ${job.salary_max.toLocaleString()}`}
                      {job.salary_period && <span className="text-lg text-green-300">/{job.salary_period}</span>}
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3">
                  {canApply && (
                    <a
                      href="#apply"
                      className="btn-primary flex-1 sm:flex-none"
                    >
                      Apply Now
                    </a>
                  )}

                  {hasApplied && (
                    <div className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-green-500/20 text-green-300 border border-green-500/30 font-semibold text-center">
                      ✓ Application Submitted
                    </div>
                  )}

                  {!user && (
                    <a
                      href="/auth/login"
                      className="btn-primary flex-1 sm:flex-none"
                    >
                      Sign in to Apply
                    </a>
                  )}

                  <button className="btn-secondary">
                    <Bookmark className="w-5 h-5" />
                  </button>

                  <button className="btn-secondary">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Job description */}
              <div className="glass rounded-2xl p-8 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-4">Job Description</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {job.description}
                  </p>
                </div>
              </div>

              {/* Requirements */}
              {job.requirements && (
                <div className="glass rounded-2xl p-8 border border-white/10">
                  <h2 className="text-2xl font-bold text-white mb-4">Requirements</h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {job.requirements}
                    </p>
                  </div>
                </div>
              )}

              {/* Benefits */}
              {job.benefits && (
                <div className="glass rounded-2xl p-8 border border-white/10">
                  <h2 className="text-2xl font-bold text-white mb-4">Benefits</h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {job.benefits}
                    </p>
                  </div>
                </div>
              )}

              {/* Application form */}
              {canApply && (
                <div id="apply" className="glass rounded-2xl p-8 border border-white/10">
                  <h2 className="text-2xl font-bold text-white mb-6">Apply for this Position</h2>
                  <JobApplicationForm jobId={job.id} userId={user.id} />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Stats */}
              <div className="glass rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Job Statistics</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-300">
                      <Eye className="w-4 h-4 mr-2" />
                      Views
                    </div>
                    <div className="text-white font-semibold">{job.views_count || 0}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-300">
                      <Briefcase className="w-4 h-4 mr-2" />
                      Applications
                    </div>
                    <div className="text-white font-semibold">{job.applications_count || 0}</div>
                  </div>
                </div>
              </div>

              {/* Recruiter info */}
              {job.recruiter && (
                <div className="glass rounded-2xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4">Posted By</h3>
                  <div className="space-y-2">
                    <div className="text-white font-medium">{job.recruiter.full_name}</div>
                    {job.recruiter.company_name && (
                      <div className="text-gray-300 text-sm">{job.recruiter.company_name}</div>
                    )}
                  </div>
                </div>
              )}

              {/* Similar jobs */}
              <div className="glass rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Similar Positions</h3>
                <div className="text-sm text-gray-400">
                  Coming soon...
                </div>
              </div>

              {/* Report */}
              <button className="w-full text-sm text-gray-400 hover:text-gray-300 transition-colors">
                Report this job
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
