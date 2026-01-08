import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { format } from 'date-fns'
import {
  Briefcase,
  MapPin,
  Calendar,
  Clock,
  FileText,
  ExternalLink,
  XCircle
} from 'lucide-react'
import Link from 'next/link'
import WithdrawApplicationButton from '@/components/features/WithdrawApplicationButton'

export default async function ApplicationsPage() {
  const supabase = await createServerClient()

  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect('/auth/login')
  }

  // Fetch user's applications with job details
  const { data: applications, error } = await supabase
    .from('job_applications')
    .select(`
      *,
      job:jobs(
        id,
        title,
        airline_name,
        airline_logo_url,
        region,
        country,
        city,
        contract_type,
        status
      )
    `)
    .eq('applicant_id', user.id)
    .order('applied_at', { ascending: false })

  if (error) {
    console.error('Error fetching applications:', error)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'reviewed':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'accepted':
        return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'rejected':
        return 'bg-red-500/20 text-red-300 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return '⏳'
      case 'reviewed':
        return '👀'
      case 'accepted':
        return '✅'
      case 'rejected':
        return '❌'
      default:
        return '📄'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">My Applications</h1>
            <p className="text-gray-300">
              Track the status of your job applications
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="glass rounded-xl p-4 border border-white/10">
              <div className="text-2xl font-bold text-white mb-1">
                {applications?.length || 0}
              </div>
              <div className="text-sm text-gray-400">Total Applications</div>
            </div>
            <div className="glass rounded-xl p-4 border border-white/10">
              <div className="text-2xl font-bold text-yellow-400 mb-1">
                {applications?.filter(a => a.status === 'pending').length || 0}
              </div>
              <div className="text-sm text-gray-400">Pending</div>
            </div>
            <div className="glass rounded-xl p-4 border border-white/10">
              <div className="text-2xl font-bold text-blue-400 mb-1">
                {applications?.filter(a => a.status === 'reviewed').length || 0}
              </div>
              <div className="text-sm text-gray-400">Reviewed</div>
            </div>
            <div className="glass rounded-xl p-4 border border-white/10">
              <div className="text-2xl font-bold text-green-400 mb-1">
                {applications?.filter(a => a.status === 'accepted').length || 0}
              </div>
              <div className="text-sm text-gray-400">Accepted</div>
            </div>
          </div>

          {/* Applications list */}
          {!applications || applications.length === 0 ? (
            <div className="glass rounded-2xl p-12 border border-white/10 text-center">
              <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-10 h-10 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No applications yet
              </h3>
              <p className="text-gray-400 mb-6">
                Start applying to jobs and track your applications here
              </p>
              <Link href="/jobs" className="btn-primary inline-block">
                Browse Jobs
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((application) => (
                <div
                  key={application.id}
                  className="glass rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    {/* Job info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        {/* Airline logo */}
                        {application.job?.airline_logo_url && (
                          <div className="w-16 h-16 bg-white/5 rounded-xl p-2 flex-shrink-0">
                            <img
                              src={application.job.airline_logo_url}
                              alt={application.job.airline_name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}

                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div>
                              <Link
                                href={`/jobs/${application.job?.id}`}
                                className="text-xl font-semibold text-white hover:text-blue-400 transition-colors inline-flex items-center gap-2 group"
                              >
                                {application.job?.title}
                                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </Link>
                              <div className="text-blue-300 font-medium">
                                {application.job?.airline_name}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-4 text-sm text-gray-300 mb-3">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1.5 text-gray-400" />
                              {application.job?.city ? `${application.job.city}, ` : ''}
                              {application.job?.country}
                            </div>
                            <div className="flex items-center">
                              <Briefcase className="w-4 h-4 mr-1.5 text-gray-400" />
                              {application.job?.contract_type}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1.5 text-gray-400" />
                              {application.job?.region}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                                application.status
                              )}`}
                            >
                              <span className="mr-1.5">{getStatusIcon(application.status)}</span>
                              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                            </span>

                            {application.job?.status !== 'active' && (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-500/20 text-gray-300 border border-gray-500/30">
                                Position Closed
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Application details */}
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="text-gray-400 mb-1">Applied</div>
                            <div className="text-white flex items-center">
                              <Calendar className="w-4 h-4 mr-1.5 text-blue-400" />
                              {format(new Date(application.applied_at), 'MMM d, yyyy')}
                            </div>
                          </div>

                          {application.resume_url && (
                            <div>
                              <div className="text-gray-400 mb-1">Resume</div>
                              <a
                                href={application.resume_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 flex items-center transition-colors"
                              >
                                <FileText className="w-4 h-4 mr-1.5" />
                                View Resume
                              </a>
                            </div>
                          )}

                          {application.phone && (
                            <div>
                              <div className="text-gray-400 mb-1">Phone</div>
                              <div className="text-white">{application.phone}</div>
                            </div>
                          )}
                        </div>

                        {application.cover_letter && (
                          <div className="mt-4">
                            <div className="text-gray-400 mb-2 text-sm">Cover Letter</div>
                            <div className="text-gray-300 text-sm line-clamp-2">
                              {application.cover_letter}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex lg:flex-col gap-2">
                      <Link
                        href={`/jobs/${application.job?.id}`}
                        className="btn-secondary flex-1 lg:flex-none whitespace-nowrap"
                      >
                        View Job
                      </Link>

                      {application.status === 'pending' && (
                        <WithdrawApplicationButton applicationId={application.id} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
