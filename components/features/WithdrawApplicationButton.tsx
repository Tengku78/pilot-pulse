'use client'

import { useState } from 'react'
import { withdrawApplication } from '@/app/jobs/actions'
import { XCircle, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface WithdrawApplicationButtonProps {
  applicationId: string
}

export default function WithdrawApplicationButton({
  applicationId
}: WithdrawApplicationButtonProps) {
  const [loading, setLoading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const router = useRouter()

  const handleWithdraw = async () => {
    setLoading(true)

    const result = await withdrawApplication(applicationId)

    if (result.success) {
      router.refresh()
    } else {
      alert(result.error || 'Failed to withdraw application')
      setLoading(false)
      setShowConfirm(false)
    }
  }

  if (showConfirm) {
    return (
      <div className="flex flex-col gap-2">
        <div className="text-sm text-gray-300 mb-1">Are you sure?</div>
        <div className="flex gap-2">
          <button
            onClick={handleWithdraw}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              'Yes, Withdraw'
            )}
          </button>
          <button
            onClick={() => setShowConfirm(false)}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="btn-secondary text-red-400 hover:text-red-300 hover:border-red-500/30 flex items-center justify-center gap-2 whitespace-nowrap"
    >
      <XCircle className="w-4 h-4" />
      Withdraw
    </button>
  )
}
