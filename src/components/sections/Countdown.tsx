'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WeddingInfo } from '@/types'
import { getTimeUntilWedding } from '@/lib/utils'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [weddingInfo, setWeddingInfo] = useState<WeddingInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [isWeddingDay, setIsWeddingDay] = useState(false)

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

  useEffect(() => {
    if (!weddingInfo) return

    const weddingDate = new Date(weddingInfo.weddingDate)
    
    const timer = setInterval(() => {
      const timeUntil = getTimeUntilWedding(weddingDate)
      
      if (timeUntil.days === 0 && timeUntil.hours === 0 && timeUntil.minutes === 0 && timeUntil.seconds === 0) {
        setIsWeddingDay(true)
        clearInterval(timer)
      } else {
        setTimeLeft(timeUntil)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [weddingInfo])

  const timeUnits = [
    { key: 'days', label: '天', value: timeLeft.days },
    { key: 'hours', label: '小时', value: timeLeft.hours },
    { key: 'minutes', label: '分钟', value: timeLeft.minutes },
    { key: 'seconds', label: '秒', value: timeLeft.seconds },
  ]

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-300 rounded w-80 mx-auto mb-8"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 bg-gray-300 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (isWeddingDay) {
    return (
      <section className="py-20 bg-gradient-to-r from-rose-gold to-rose-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              🎉 今天就是我们的婚礼！🎉
            </h2>
            <p className="text-xl md:text-2xl mb-8">
              感谢您的到来，让我们一起庆祝这个特殊的日子！
            </p>
            <div className="text-6xl mb-8">💕</div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-20 h-20 bg-rose-gold/5 rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-rose-dark/5 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
            距离我们的婚礼还有
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            {weddingInfo ? 
              `期待在 ${new Date(weddingInfo.weddingDate).toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })} 与您相见` : 
              '期待与您相见'
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.key}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-rose-gold/10 to-rose-dark/10 rounded-2xl p-6 md:p-8 border border-rose-gold/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={unit.value}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-5xl font-bold text-rose-gold mb-2">
                      {unit.value.toString().padStart(2, '0')}
                    </div>
                    <div className="text-sm md:text-base text-gray-600 font-medium">
                      {unit.label}
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                {/* 装饰性边框 */}
                <div className="absolute inset-0 rounded-2xl border-2 border-rose-gold/20 group-hover:border-rose-gold/40 transition-colors duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 底部装饰 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center space-x-4 text-2xl"
        >
          <motion.span
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2
            }}
          >
            💕
          </motion.span>
          <motion.span
            animate={{ 
              y: [0, -5, 0],
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
              rotate: [0, -5, 5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            🌹
          </motion.span>
        </motion.div>
      </div>
    </section>
  )
}
