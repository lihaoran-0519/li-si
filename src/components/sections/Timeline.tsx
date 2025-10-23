'use client'

import { motion } from 'framer-motion'
import { TimelineEvent } from '@/types'

const timelineEvents: TimelineEvent[] = [
  {
    time: '13:30-14:30',
    title: '宾客签到',
    description: '欢迎各位宾客到来，签到并领取座位卡',
    isActive: false,
  },
  {
    time: '14:30-15:00',
    title: '迎宾时间',
    description: '新人在门口迎接宾客，合影留念',
    isActive: false,
  },
  {
    time: '15:00-15:30',
    title: '婚礼仪式',
    description: '正式婚礼仪式，交换戒指，宣读誓言',
    isActive: false,
  },
  {
    time: '15:30-16:30',
    title: '拍照时间',
    description: '与宾客合影留念，记录美好瞬间',
    isActive: false,
  },
  {
    time: '16:30-17:00',
    title: '茶歇时间',
    description: '提供茶点，宾客自由交流',
    isActive: false,
  },
  {
    time: '17:00-19:00',
    title: '晚宴开始',
    description: '共进晚餐，举杯庆祝，分享喜悦',
    isActive: false,
  },
  {
    time: '19:00-20:00',
    title: '敬酒环节',
    description: '新人向宾客敬酒，感谢大家的祝福',
    isActive: false,
  },
  {
    time: '20:00-21:00',
    title: '送客时间',
    description: '感谢宾客的祝福，期待下次相聚',
    isActive: false,
  },
]

export function Timeline() {
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
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
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
        <h3 className="text-2xl font-bold text-gradient mb-2">婚礼流程</h3>
        <p className="text-gray-600">2026年2月21日，期待与您共度美好时光</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative"
      >
        {/* 时间轴线条 */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-gold to-rose-dark"></div>
        
        <div className="space-y-8">
          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.time}
              variants={itemVariants}
              className="relative flex items-start space-x-6"
            >
              {/* 时间轴节点 */}
              <div className="relative flex-shrink-0">
                <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center ${
                  event.isActive 
                    ? 'bg-rose-gold border-rose-gold text-white' 
                    : 'bg-white border-rose-gold/30 text-rose-gold'
                }`}>
                  <span className="text-xs font-bold">{index + 1}</span>
                </div>
                {/* 装饰性光晕 */}
                <div className={`absolute inset-0 rounded-full ${
                  event.isActive ? 'bg-rose-gold/20 scale-150' : 'bg-rose-gold/10 scale-100'
                } transition-all duration-300`}></div>
              </div>

              {/* 事件内容 */}
              <div className="flex-1 pb-4">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="bg-white rounded-lg p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <span className="text-lg font-bold text-rose-gold mb-2 sm:mb-0">
                      {event.time}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-rose-gold rounded-full"></div>
                      <span className="text-sm text-gray-500">预计时长</span>
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {event.title}
                  </h4>
                  
                  {event.description && (
                    <p className="text-gray-600 leading-relaxed">
                      {event.description}
                    </p>
                  )}

                  {/* 装饰性元素 */}
                  <div className="mt-4 flex items-center space-x-4">
                    <div className="flex space-x-1">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div
                          key={`dot-${i}`}
                          className="w-1.5 h-1.5 bg-rose-gold/30 rounded-full"
                        ></div>
                      ))}
                    </div>
                    <div className="text-xs text-gray-400">
                      {event.time.split('-')[1]} 结束
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 底部装饰 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-rose-gold/10 rounded-full px-6 py-3">
            <span className="text-rose-gold text-sm font-medium">💕</span>
            <span className="text-rose-gold text-sm font-medium">
              期待与您共度这个特殊的日子
            </span>
            <span className="text-rose-gold text-sm font-medium">💕</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
