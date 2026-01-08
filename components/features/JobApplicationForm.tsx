'use client'

import { useState } from 'react'
import { submitJobApplication } from '@/app/jobs/actions'
import { Upload, FileText, X, Loader2 } from 'lucide-react'

interface JobApplicationFormProps {
  jobId: string
  userId: string
}

export default function JobApplicationForm({ jobId, userId }: JobApplicationFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [resume, setResume] = useState<File | null>(null)

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (!allowedTypes.includes(file.type)) {
        setError('Please upload a PDF or Word document')
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB')
        return
      }

      setResume(file)
      setError(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const formData = new FormData(e.currentTarget)
      formData.append('job_id', jobId)
      formData.append('applicant_id', userId)

      const result = await submitJobApplication(formData)

      if (result.success) {
        setSuccess(true)
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        setError(result.error || 'Failed to submit application')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Application Submitted!</h3>
        <p className="text-green-300 mb-4">
          Your application has been successfully submitted. The recruiter will review it and contact you if you're a good fit.
        </p>
        <a href="/applications" className="btn-primary inline-block">
          View My Applications
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-300">
          {error}
        </div>
      )}

      {/* Cover Letter */}
      <div>
        <label htmlFor="cover_letter" className="block text-sm font-medium text-gray-200 mb-2">
          Cover Letter <span className="text-red-400">*</span>
        </label>
        <textarea
          id="cover_letter"
          name="cover_letter"
          required
          rows={6}
          placeholder="Tell us why you're interested in this position and why you'd be a great fit..."
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
        <p className="mt-2 text-sm text-gray-400">
          Minimum 100 characters
        </p>
      </div>

      {/* Resume Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Resume/CV <span className="text-red-400">*</span>
        </label>

        {!resume ? (
          <div className="relative">
            <input
              type="file"
              id="resume"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange}
              required
              className="hidden"
            />
            <label
              htmlFor="resume"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-blue-400/50 transition-colors bg-white/5"
            >
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-300 mb-1">Click to upload resume</span>
              <span className="text-xs text-gray-500">PDF, DOC, DOCX (Max 5MB)</span>
            </label>
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
            <div className="flex items-center">
              <FileText className="w-5 h-5 text-blue-400 mr-3" />
              <div>
                <div className="text-white font-medium">{resume.name}</div>
                <div className="text-sm text-gray-400">
                  {(resume.size / 1024 / 1024).toFixed(2)} MB
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setResume(null)}
              className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-red-400" />
            </button>
          </div>
        )}

        <p className="mt-2 text-sm text-gray-400">
          Upload your most recent resume or CV
        </p>
      </div>

      {/* Additional Information */}
      <div>
        <label htmlFor="additional_info" className="block text-sm font-medium text-gray-200 mb-2">
          Additional Information
        </label>
        <textarea
          id="additional_info"
          name="additional_info"
          rows={4}
          placeholder="Any additional information you'd like to share (licenses, ratings, languages, etc.)"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Phone Number */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-200 mb-2">
          Phone Number <span className="text-red-400">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          placeholder="+1 (555) 000-0000"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* LinkedIn */}
      <div>
        <label htmlFor="linkedin_url" className="block text-sm font-medium text-gray-200 mb-2">
          LinkedIn Profile
        </label>
        <input
          type="url"
          id="linkedin_url"
          name="linkedin_url"
          placeholder="https://linkedin.com/in/yourprofile"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Notice Period */}
      <div>
        <label htmlFor="notice_period" className="block text-sm font-medium text-gray-200 mb-2">
          Notice Period
        </label>
        <select
          id="notice_period"
          name="notice_period"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select notice period</option>
          <option value="immediate">Immediate</option>
          <option value="1_week">1 Week</option>
          <option value="2_weeks">2 Weeks</option>
          <option value="1_month">1 Month</option>
          <option value="2_months">2 Months</option>
          <option value="3_months">3 Months</option>
        </select>
      </div>

      {/* Current Salary */}
      <div>
        <label htmlFor="current_salary" className="block text-sm font-medium text-gray-200 mb-2">
          Current Salary (Optional)
        </label>
        <input
          type="number"
          id="current_salary"
          name="current_salary"
          placeholder="Enter amount in USD"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Expected Salary */}
      <div>
        <label htmlFor="expected_salary" className="block text-sm font-medium text-gray-200 mb-2">
          Expected Salary (Optional)
        </label>
        <input
          type="number"
          id="expected_salary"
          name="expected_salary"
          placeholder="Enter amount in USD"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-between pt-6 border-t border-white/10">
        <p className="text-sm text-gray-400">
          <span className="text-red-400">*</span> Required fields
        </p>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary min-w-[160px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Submitting...
            </span>
          ) : (
            'Submit Application'
          )}
        </button>
      </div>
    </form>
  )
}
