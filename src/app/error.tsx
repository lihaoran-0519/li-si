'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-cream to-white">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          出现了一些问题
        </h2>
        <p className="text-gray-600 mb-8">
          很抱歉，页面加载时出现了错误。请稍后重试。
        </p>
        <Button
          onClick={reset}
          className="bg-rose-gold hover:bg-rose-gold/90 text-white px-8 py-3 rounded-lg"
        >
          重新加载
        </Button>
      </div>
    </div>
  )
}
