'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface ThanksMessage {
  id: string
  title: string
  content: string
  author: string
  date: string
  isMain: boolean
}

export function ThanksMessage() {
  const [currentMessage, setCurrentMessage] = useState<ThanksMessage | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // 模拟感谢致辞数据
  const thanksMessages: ThanksMessage[] = [
    {
      id: '1',
      title: '致所有亲朋好友',
      content: `亲爱的朋友们，

感谢您们在这个特殊的日子里与我们共同见证我们的幸福时刻。您们的到来让我们的婚礼更加完美，您们的祝福是我们最珍贵的礼物。

从相识到相知，从相知到相爱，我们走过了许多美好的时光。今天，我们终于步入了婚姻的殿堂，开始了人生新的篇章。

感谢您们一直以来的陪伴和支持，愿我们的友谊长存，愿您们都能找到属于自己的幸福。

此致
敬礼！

黎浩然 & 李思
2026年2月21日`,
      author: '黎浩然 & 李思',
      date: '2026-02-21',
      isMain: true
    },
    {
      id: '2',
      title: '致双方父母',
      content: `亲爱的爸爸妈妈，

感谢您们给予我们生命，抚养我们长大，教会我们做人的道理。您们的爱是我们前进的动力，您们的支持是我们坚强的后盾。

今天，我们成家了，但您们永远是我们最亲最爱的人。我们会好好经营自己的小家庭，也会好好孝顺您们。

愿您们身体健康，笑口常开！

永远爱您们的孩子`,
      author: '黎浩然 & 李思',
      date: '2026-02-21',
      isMain: false
    },
    {
      id: '3',
      title: '致伴郎伴娘',
      content: `亲爱的伴郎伴娘们，

感谢您们在我们的婚礼上担任如此重要的角色。您们是我们最好的朋友，也是我们最信任的人。

从筹备到执行，您们一直陪伴在我们身边，帮我们解决各种问题，让我们的婚礼能够顺利进行。

愿我们的友谊永远不变，愿您们都能找到属于自己的幸福！

谢谢您们！`,
      author: '黎浩然 & 李思',
      date: '2026-02-21',
      isMain: false
    }
  ]

  useEffect(() => {
    // 模拟加载数据
    setTimeout(() => {
      setCurrentMessage(thanksMessages[0])
      setIsLoading(false)
    }, 1000)
  }, [])

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

  if (isLoading) {
    return (
      <div className="card">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    )
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
        <h3 className="text-2xl font-bold text-gradient mb-2">感谢致辞</h3>
        <p className="text-gray-600">感谢所有亲朋好友的祝福与陪伴</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-6"
      >
        {/* 主要感谢致辞 */}
        {currentMessage && (
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-rose-gold/5 to-rose-dark/5 rounded-xl p-8 border border-rose-gold/20"
          >
            <div className="text-center mb-6">
              <h4 className="text-2xl font-bold text-gray-900 mb-2">
                {currentMessage.title}
              </h4>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                <span>👤 {currentMessage.author}</span>
                <span>•</span>
                <span>📅 {currentMessage.date}</span>
              </div>
            </div>

            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed text-lg font-medium">
                {currentMessage.content}
              </pre>
            </div>
          </motion.div>
        )}

        {/* 其他感谢致辞 */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h5 className="text-lg font-semibold text-gray-900 mb-4">其他致辞</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {thanksMessages.slice(1).map((message) => (
              <motion.div
                key={message.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => setCurrentMessage(message)}
              >
                <h6 className="font-semibold text-gray-900 mb-2">
                  {message.title}
                </h6>
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                  {message.content.split('\n')[0]}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{message.author}</span>
                  <span>{message.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 装饰性元素 */}
        <motion.div
          variants={itemVariants}
          className="text-center py-8"
        >
          <div className="inline-flex items-center space-x-2 bg-rose-gold/10 rounded-full px-6 py-3">
            <span className="text-2xl">💕</span>
            <div className="text-center">
              <p className="text-rose-gold font-semibold">
                感谢您们的祝福
              </p>
              <p className="text-rose-gold/70 text-sm">
                愿友谊长存，幸福永远
              </p>
            </div>
            <span className="text-2xl">💕</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
