'use client'

import { useState, useEffect } from 'react'
import { Message } from '@/types'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { MessageCard } from './MessageCard'

export function MessagesList() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch('/api/messages')
        const data = await response.json()
        
        if (response.ok) {
          setMessages(data.messages || [])
        } else {
          setError(data.error || '获取留言失败')
        }
      } catch (err) {
        setError('网络错误，请稍后重试')
        console.error('Error fetching messages:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [])

  if (loading) {
    return (
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">祝福留言</h3>
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">祝福留言</h3>
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => globalThis.location.reload()} 
            className="btn-primary"
          >
            重新加载
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">祝福留言</h3>
      {messages.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <p className="text-gray-500">还没有留言，快来留下您的祝福吧！</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {messages.map((message) => (
            <MessageCard key={message.id} message={message} />
          ))}
        </div>
      )}
    </div>
  )
}
