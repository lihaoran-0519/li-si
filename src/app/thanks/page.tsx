'use client'

import { useState } from 'react'
import { ThanksMessage } from '@/components/sections/ThanksMessage'
import { MessageForm } from '@/components/sections/MessageForm'
import { MessagesList } from '@/components/sections/MessagesList'

export default function ThanksPage() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleMessageSubmitted = () => {
    // 通过改变key来强制刷新MessagesList组件
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gradient mb-4">感谢致辞</h1>
          <p className="text-lg text-gray-600">感谢您的祝福与陪伴</p>
        </div>
        
        <ThanksMessage />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <MessageForm onMessageSubmitted={handleMessageSubmitted} />
          <MessagesList key={refreshKey} />
        </div>
      </div>
    </div>
  )
}
