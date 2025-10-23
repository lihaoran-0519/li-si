'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { PhotoGallery } from '@/components/sections/PhotoGallery'
import { PhotoCategories } from '@/components/sections/PhotoCategories'
import { PhotoUpload } from '@/components/sections/PhotoUpload'

export default function MomentsPage() {
  const [activeTab, setActiveTab] = useState<'gallery' | 'upload'>('gallery')

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
              幸福时刻
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              记录我们的美好回忆，分享每一个珍贵的瞬间
            </p>
            <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-gray-500">
              <span>📸 照片画廊</span>
              <span>•</span>
              <span>💕 美好回忆</span>
            </div>
          </motion.div>

          {/* 标签页导航 */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-lg p-1 inline-flex">
              <button
                onClick={() => setActiveTab('gallery')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === 'gallery'
                    ? 'bg-white text-rose-gold shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="text-lg">📸</span>
                <span className="font-medium">照片画廊</span>
              </button>
              <button
                onClick={() => setActiveTab('upload')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === 'upload'
                    ? 'bg-white text-rose-gold shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="text-lg">📤</span>
                <span className="font-medium">上传照片</span>
              </button>
            </div>
          </motion.div>

          {/* 内容区域 */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {activeTab === 'gallery' && (
              <>
                {/* 照片分类 */}
                <PhotoCategories />
                
                {/* 照片画廊 */}
                <PhotoGallery />
              </>
            )}

            {activeTab === 'upload' && (
              <PhotoUpload />
            )}
          </motion.div>

          {/* 底部装饰 */}
          <motion.div
            variants={itemVariants}
            className="text-center py-12"
          >
            <div className="inline-flex items-center space-x-2 bg-rose-gold/10 rounded-full px-8 py-4">
              <span className="text-2xl">💕</span>
              <div className="text-center">
                <p className="text-rose-gold font-semibold text-lg">
                  每一张照片都是我们爱情的见证
                </p>
                <p className="text-rose-gold/70 text-sm mt-1">
                  感谢您与我们分享这些美好时刻
                </p>
              </div>
              <span className="text-2xl">💕</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
