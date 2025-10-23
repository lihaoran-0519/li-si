'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export function ContactInfo() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  const contacts = [
    {
      id: 'planner',
      title: '婚礼策划师',
      name: '张策划师',
      role: '专业婚礼策划',
      phone: '138-0000-0000',
      wechat: 'wedding_planner_zhang',
      email: 'planner@example.com',
      icon: '🎨',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100'
    },
    {
      id: 'venue',
      title: '场地经理',
      name: '李经理',
      role: '松滋凯瑞国际酒店',
      phone: '0716-6228888',
      wechat: 'kairui_hotel_li',
      email: 'venue@kairui-hotel.com',
      icon: '🏨',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100'
    },
    {
      id: 'groom',
      title: '新郎',
      name: '黎浩然',
      role: '准新郎',
      phone: '138-0000-0001',
      wechat: 'lihaoran_wedding',
      email: 'lihaoran@example.com',
      icon: '👨',
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100'
    },
    {
      id: 'bride',
      title: '新娘',
      name: '李思',
      role: '准新娘',
      phone: '138-0000-0002',
      wechat: 'lisi_wedding',
      email: 'lisi@example.com',
      icon: '👩',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'from-pink-50 to-pink-100'
    }
  ]

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItem(itemId)
      setTimeout(() => setCopiedItem(null), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
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
        <h3 className="text-2xl font-bold text-gradient mb-2">联系方式</h3>
        <p className="text-gray-600">如有任何疑问，请随时联系我们</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contacts.map((contact, index) => (
          <motion.div
            key={contact.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`bg-gradient-to-br ${contact.bgColor} rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300`}
          >
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${contact.color} flex items-center justify-center text-white text-xl`}>
                {contact.icon}
              </div>
              
              <div className="flex-1">
                <h4 className="text-lg font-bold text-gray-900 mb-1">
                  {contact.name}
                </h4>
                <p className="text-sm text-gray-600 mb-3">{contact.role}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">📞 电话</span>
                    <button
                      onClick={() => copyToClipboard(contact.phone, `${contact.id}-phone`)}
                      className="flex items-center space-x-2 text-sm font-medium text-gray-900 hover:text-rose-gold transition-colors"
                    >
                      <span>{contact.phone}</span>
                      {copiedItem === `${contact.id}-phone` ? (
                        <span className="text-green-500">✓</span>
                      ) : (
                        <span className="text-gray-400">📋</span>
                      )}
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">💬 微信</span>
                    <button
                      onClick={() => copyToClipboard(contact.wechat, `${contact.id}-wechat`)}
                      className="flex items-center space-x-2 text-sm font-medium text-gray-900 hover:text-rose-gold transition-colors"
                    >
                      <span>{contact.wechat}</span>
                      {copiedItem === `${contact.id}-wechat` ? (
                        <span className="text-green-500">✓</span>
                      ) : (
                        <span className="text-gray-400">📋</span>
                      )}
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">📧 邮箱</span>
                    <button
                      onClick={() => copyToClipboard(contact.email, `${contact.id}-email`)}
                      className="flex items-center space-x-2 text-sm font-medium text-gray-900 hover:text-rose-gold transition-colors"
                    >
                      <span className="truncate max-w-32">{contact.email}</span>
                      {copiedItem === `${contact.id}-email` ? (
                        <span className="text-green-500">✓</span>
                      ) : (
                        <span className="text-gray-400">📋</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 紧急联系提示 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-8 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200"
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm">
            ⚠️
          </div>
          <div>
            <h5 className="font-semibold text-gray-900 mb-1">紧急联系</h5>
            <p className="text-sm text-gray-600">
              如遇紧急情况，请直接联系新人或婚礼策划师
            </p>
          </div>
        </div>
      </motion.div>

      {/* 联系时间提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
        className="mt-6 p-4 bg-rose-gold/5 rounded-lg border border-rose-gold/20"
      >
        <div className="flex items-center space-x-2 text-rose-gold">
          <span>⏰</span>
          <p className="text-sm font-medium">
            建议联系时间：上午9:00 - 晚上21:00
          </p>
        </div>
      </motion.div>
    </div>
  )
}
