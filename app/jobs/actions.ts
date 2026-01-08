'use server'

import { createServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function submitJobApplication(formData: FormData) {
  try {
    const supabase = await createServerClient()

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return { success: false, error: 'You must be logged in to apply' }
    }

    // Get form data
    const jobId = formData.get('job_id') as string
    const coverLetter = formData.get('cover_letter') as string
    const additionalInfo = formData.get('additional_info') as string
    const phone = formData.get('phone') as string
    const linkedinUrl = formData.get('linkedin_url') as string
    const noticePeriod = formData.get('notice_period') as string
    const currentSalary = formData.get('current_salary') as string
    const expectedSalary = formData.get('expected_salary') as string
    const resume = formData.get('resume') as File

    // Validate required fields
    if (!jobId || !coverLetter || !phone || !resume) {
      return { success: false, error: 'Please fill in all required fields' }
    }

    // Validate cover letter length
    if (coverLetter.length < 100) {
      return { success: false, error: 'Cover letter must be at least 100 characters' }
    }

    // Check if user has already applied
    const { data: existingApplication } = await supabase
      .from('job_applications')
      .select('id')
      .eq('job_id', jobId)
      .eq('applicant_id', user.id)
      .single()

    if (existingApplication) {
      return { success: false, error: 'You have already applied to this job' }
    }

    // Upload resume to Supabase Storage
    let resumeUrl = null
    if (resume && resume.size > 0) {
      const fileExt = resume.name.split('.').pop()
      const fileName = `${user.id}/${jobId}-${Date.now()}.${fileExt}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(fileName, resume, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        console.error('Resume upload error:', uploadError)
        return { success: false, error: 'Failed to upload resume. Please try again.' }
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('resumes')
        .getPublicUrl(fileName)

      resumeUrl = publicUrl
    }

    // Create application record
    const { data: application, error: insertError } = await supabase
      .from('job_applications')
      .insert({
        job_id: jobId,
        applicant_id: user.id,
        cover_letter: coverLetter,
        resume_url: resumeUrl,
        additional_info: additionalInfo || null,
        phone: phone,
        linkedin_url: linkedinUrl || null,
        notice_period: noticePeriod || null,
        current_salary: currentSalary ? parseInt(currentSalary) : null,
        expected_salary: expectedSalary ? parseInt(expectedSalary) : null,
        status: 'pending'
      })
      .select()
      .single()

    if (insertError) {
      console.error('Application insert error:', insertError)
      // If application creation failed, clean up uploaded resume
      if (resumeUrl) {
        const fileName = resumeUrl.split('/').pop()
        await supabase.storage.from('resumes').remove([`${user.id}/${fileName}`])
      }
      return { success: false, error: 'Failed to submit application. Please try again.' }
    }

    // Increment applications count on the job
    const { error: updateError } = await supabase.rpc('increment_job_applications', {
      job_id: jobId
    })

    if (updateError) {
      console.error('Failed to increment applications count:', updateError)
    }

    // Revalidate the job page
    revalidatePath(`/jobs/${jobId}`)
    revalidatePath('/applications')

    return { success: true, applicationId: application.id }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { success: false, error: 'An unexpected error occurred. Please try again.' }
  }
}

export async function withdrawApplication(applicationId: string) {
  try {
    const supabase = await createServerClient()

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return { success: false, error: 'You must be logged in' }
    }

    // Get application to verify ownership and get job_id
    const { data: application, error: fetchError } = await supabase
      .from('job_applications')
      .select('applicant_id, job_id, resume_url')
      .eq('id', applicationId)
      .single()

    if (fetchError || !application) {
      return { success: false, error: 'Application not found' }
    }

    if (application.applicant_id !== user.id) {
      return { success: false, error: 'You can only withdraw your own applications' }
    }

    // Delete the application
    const { error: deleteError } = await supabase
      .from('job_applications')
      .delete()
      .eq('id', applicationId)

    if (deleteError) {
      console.error('Delete error:', deleteError)
      return { success: false, error: 'Failed to withdraw application' }
    }

    // Delete resume from storage if exists
    if (application.resume_url) {
      const fileName = application.resume_url.split('/').pop()
      await supabase.storage.from('resumes').remove([`${user.id}/${fileName}`])
    }

    // Decrement applications count on the job
    await supabase.rpc('decrement_job_applications', {
      job_id: application.job_id
    })

    revalidatePath('/applications')
    revalidatePath(`/jobs/${application.job_id}`)

    return { success: true }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}
