'use client'

import { motion } from 'framer-motion'
import { WeddingInfo } from '@/components/sections/WeddingInfo'
import { Timeline } from '@/components/sections/Timeline'
import { VenueInfo } from '@/components/sections/VenueInfo'
import { ContactInfo } from '@/components/sections/ContactInfo'
import { Transportation } from '@/components/sections/Transportation'

export default function InfoPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-cream to-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* 页面标题 */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
              婚礼信息
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              2026年2月21日，黎浩然 & 李思 的婚礼
            </p>
            <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-gray-500">
              <span>💕 期待您的到来</span>
              <span>•</span>
              <span>松滋凯瑞国际酒店</span>
            </div>
          </motion.div>

          {/* 婚礼基本信息 */}
          <motion.div variants={itemVariants}>
            <WeddingInfo />
          </motion.div>

          {/* 婚礼流程 */}
          <motion.div variants={itemVariants}>
            <Timeline />
          </motion.div>

          {/* 场地信息 */}
          <motion.div variants={itemVariants}>
            <VenueInfo />
          </motion.div>

          {/* 交通指引 */}
          <motion.div variants={itemVariants}>
            <Transportation />
          </motion.div>

          {/* 联系方式 */}
          <motion.div variants={itemVariants}>
            <ContactInfo />
          </motion.div>

          {/* 底部装饰 */}
          <motion.div
            variants={itemVariants}
            className="text-center py-12"
          >
            <div className="inline-flex items-center space-x-2 bg-rose-gold/10 rounded-full px-8 py-4">
              <span className="text-2xl">💒</span>
              <div className="text-center">
                <p className="text-rose-gold font-semibold text-lg">
                  期待与您共度这个特殊的日子
                </p>
                <p className="text-rose-gold/70 text-sm mt-1">
                  2026年2月21日，不见不散
                </p>
              </div>
              <span className="text-2xl">💒</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
