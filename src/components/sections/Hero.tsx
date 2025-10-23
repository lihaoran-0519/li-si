'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { WeddingInfo } from '@/types'

export function Hero() {
  const [weddingInfo, setWeddingInfo] = useState<WeddingInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 从API获取婚礼信息
    const fetchWeddingInfo = async () => {
      try {
        const response = await fetch('/api/wedding-info')
        if (response.ok) {
          const data = await response.json()
          setWeddingInfo(data)
        }
      } catch (error) {
        console.error('Error fetching wedding info:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchWeddingInfo()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  if (loading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-cream to-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-20 bg-gray-300 rounded w-64 mx-auto mb-6"></div>
            <div className="h-8 bg-gray-300 rounded w-96 mx-auto mb-8"></div>
            <div className="h-6 bg-gray-300 rounded w-2/3 mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-cream to-white overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-rose-gold/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-rose-dark/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-rose-gold/20 rounded-full blur-lg"></div>
      </div>

      <motion.div 
        className="container mx-auto px-4 text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <div className="mb-4">
            <span className="text-lg md:text-xl text-gray-600 font-medium">
              {weddingInfo ? `${weddingInfo.brideName} & ${weddingInfo.groomName}` : 'Li & Si'}
            </span>
          </div>
        </motion.div>

        <motion.h1 
          className="text-6xl md:text-8xl font-bold text-gradient mb-6 leading-tight"
          variants={itemVariants}
        >
          我们结婚啦
        </motion.h1>

        <motion.p 
          className="text-xl md:text-2xl text-gray-600 mb-8 font-light"
          variants={itemVariants}
        >
          我们即将步入婚姻的殿堂
        </motion.p>

        <motion.p 
          className="text-lg text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed"
          variants={itemVariants}
        >
          感谢您见证我们的幸福时刻，愿我们的爱情故事与您分享
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={itemVariants}
        >
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-2xl md:text-3xl font-bold text-rose-gold mb-2">
              {weddingInfo ? new Date(weddingInfo.weddingDate).toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : '2024年12月31日'}
            </div>
            <div className="text-sm text-gray-500">婚礼日期</div>
          </motion.div>

          <div className="hidden sm:block w-px h-16 bg-gray-300"></div>

          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-2xl md:text-3xl font-bold text-rose-gold mb-2">
              {weddingInfo?.venue || '某某酒店'}
            </div>
            <div className="text-sm text-gray-500">婚礼场地</div>
          </motion.div>
        </motion.div>

        {/* 装饰性元素 */}
        <motion.div 
          className="mt-16 flex justify-center space-x-8 text-4xl"
          variants={itemVariants}
        >
          <motion.span
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            💕
          </motion.span>
          <motion.span
            animate={{ 
              y: [0, -10, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1
            }}
          >
            💍
          </motion.span>
          <motion.span
            animate={{ 
              rotate: [0, -10, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 2
            }}
          >
            🌹
          </motion.span>
        </motion.div>
      </motion.div>

      {/* 滚动指示器 */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-rose-gold rounded-full flex justify-center">
          <motion.div 
            className="w-1 h-3 bg-rose-gold rounded-full mt-2"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}
