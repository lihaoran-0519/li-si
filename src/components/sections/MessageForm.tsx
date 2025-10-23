'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface MessageFormData {
  guestName: string
  guestPhone?: string
  message: string
  isAnonymous: boolean
}

interface MessageFormProps {
  readonly onMessageSubmitted?: () => void
}

export function MessageForm({ onMessageSubmitted }: MessageFormProps) {
  const [formData, setFormData] = useState<MessageFormData>({
    guestName: '',
    guestPhone: '',
    message: '',
    isAnonymous: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const submitData = {
        guestName: formData.isAnonymous ? '匿名用户' : formData.guestName,
        guestPhone: formData.guestPhone || undefined,
        message: formData.message.trim()
      }

      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      })

      const result = await response.json()

      if (response.ok) {
        // 显示成功消息
        setIsSubmitted(true)
        
        // 重置表单
        setFormData({
          guestName: '',
          guestPhone: '',
          message: '',
          isAnonymous: false
        })
        
        // 通知父组件刷新留言列表
        if (onMessageSubmitted) {
          onMessageSubmitted()
        }
        
        // 3秒后隐藏成功消息
        setTimeout(() => setIsSubmitted(false), 3000)
      } else {
        setError(result.error || '提交失败，请重试')
      }
    } catch (error) {
      console.error('Submit failed:', error)
      setError('网络错误，请检查网络连接后重试')
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="card">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <h3 className="text-2xl font-bold text-gradient mb-2">留下祝福</h3>
        <p className="text-gray-600">分享您对新人的祝福，让爱传递下去</p>
      </motion.div>

      {isSubmitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
        >
          <div className="flex items-center space-x-2">
            <span className="text-green-500 text-xl">✅</span>
            <p className="text-green-800 font-medium">祝福提交成功！感谢您的祝福</p>
          </div>
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
        >
          <div className="flex items-center space-x-2">
            <span className="text-red-500 text-xl">❌</span>
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        </motion.div>
      )}

      <motion.form
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* 匿名选项 */}
        <motion.div variants={itemVariants} className="flex items-center space-x-3">
          <input
            id="isAnonymous"
            name="isAnonymous"
            type="checkbox"
            checked={formData.isAnonymous}
            onChange={handleInputChange}
            className="w-4 h-4 text-rose-gold border-gray-300 rounded focus:ring-rose-gold"
          />
          <label htmlFor="isAnonymous" className="text-sm text-gray-700">
            匿名留言（不显示姓名）
          </label>
        </motion.div>

        {/* 姓名输入 */}
        {!formData.isAnonymous && (
          <motion.div variants={itemVariants}>
            <label htmlFor="guestName" className="block text-sm font-medium text-gray-700 mb-2">
              姓名 <span className="text-red-500">*</span>
            </label>
            <input
              id="guestName"
              name="guestName"
              type="text"
              value={formData.guestName}
              onChange={handleInputChange}
              required={!formData.isAnonymous}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-gold focus:border-transparent transition-colors"
              placeholder="请输入您的姓名"
            />
          </motion.div>
        )}

        {/* 电话输入 */}
        <motion.div variants={itemVariants}>
          <label htmlFor="guestPhone" className="block text-sm font-medium text-gray-700 mb-2">
            联系电话
          </label>
          <input
            id="guestPhone"
            name="guestPhone"
            type="tel"
            value={formData.guestPhone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-gold focus:border-transparent transition-colors"
            placeholder="请输入您的联系电话（可选）"
          />
        </motion.div>

        {/* 留言内容 */}
        <motion.div variants={itemVariants}>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            祝福留言 <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-gold focus:border-transparent transition-colors resize-none"
            placeholder="请写下您对新人的祝福..."
          />
          <div className="mt-2 text-sm text-gray-500">
            {formData.message.length}/500 字符
          </div>
        </motion.div>

        {/* 提交按钮 */}
        <motion.div variants={itemVariants} className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting || !formData.message.trim()}
            className="w-full bg-gradient-to-r from-rose-gold to-rose-dark text-white py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>提交中...</span>
              </div>
            ) : (
              '提交祝福'
            )}
          </button>
        </motion.div>

        {/* 提示信息 */}
        <motion.div
          variants={itemVariants}
          className="p-4 bg-blue-50 rounded-lg border border-blue-200"
        >
          <div className="flex items-start space-x-3">
            <span className="text-blue-500 text-xl">💡</span>
            <div>
              <h5 className="font-semibold text-blue-900 mb-1">留言提示</h5>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 留言将在审核后显示在祝福墙上</li>
                <li>• 请保持文明用语，传递正能量</li>
                <li>• 您的祝福将成为新人珍贵的回忆</li>
                <li>• 支持匿名留言，保护个人隐私</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.form>
    </div>
  )
}
