'use client'

import { Message } from '@/types'

interface MessageCardProps {
  readonly message: Message
}

export function MessageCard({ message }: MessageCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      return '刚刚'
    } else if (diffInHours < 24) {
      return `${diffInHours}小时前`
    } else if (diffInHours < 48) {
      return '昨天'
    } else {
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }
  }

  return (
    <div className="border-l-4 border-rose-gold pl-4 py-3 bg-gray-50 rounded-r-lg hover:bg-gray-100 transition-colors duration-200">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-gray-900 flex items-center">
          <span className="w-8 h-8 bg-rose-gold text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
            {message.guestName.charAt(0)}
          </span>
          {message.guestName}
        </h4>
        <span className="text-sm text-gray-500">
          {formatDate(message.createdAt)}
        </span>
      </div>
      <p className="text-gray-700 leading-relaxed ml-11">{message.message}</p>
    </div>
  )
}
