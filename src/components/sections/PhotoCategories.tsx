'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface Category {
  id: string
  name: string
  icon: string
  count: number
  color: string
  bgColor: string
  description: string
}

export function PhotoCategories() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categories: Category[] = [
    {
      id: 'all',
      name: '全部',
      icon: '📸',
      count: 105,
      color: 'from-gray-500 to-gray-600',
      bgColor: 'from-gray-50 to-gray-100',
      description: '所有美好回忆'
    },
    {
      id: 'wedding',
      name: '婚纱照',
      icon: '💕',
      count: 24,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'from-pink-50 to-rose-50',
      description: '浪漫婚纱摄影，记录美好瞬间'
    },
    {
      id: 'life',
      name: '生活照',
      icon: '📸',
      count: 18,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      description: '日常生活点滴，温馨回忆'
    },
    {
      id: 'proposal',
      name: '求婚',
      icon: '🎉',
      count: 12,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
      description: '浪漫求婚时刻，感动瞬间'
    },
    {
      id: 'engagement',
      name: '订婚',
      icon: '💍',
      count: 15,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50',
      description: '订婚仪式，幸福启程'
    },
    {
      id: 'travel',
      name: '旅行',
      icon: '✈️',
      count: 20,
      color: 'from-green-500 to-teal-500',
      bgColor: 'from-green-50 to-teal-50',
      description: '甜蜜旅行，探索世界'
    },
    {
      id: 'family',
      name: '家庭',
      icon: '👨‍👩‍👧‍👦',
      count: 16,
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'from-indigo-50 to-purple-50',
      description: '家庭聚会，温馨时光'
    }
  ]

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
        <h3 className="text-2xl font-bold text-gradient mb-2">照片分类</h3>
        <p className="text-gray-600">浏览我们的美好回忆，每一张照片都有特别的故事</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4"
      >
        {categories.map((category) => (
          <motion.div
            key={category.id}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
            className={`relative cursor-pointer group ${
              activeCategory === category.id ? 'ring-2 ring-rose-gold' : ''
            }`}
          >
            <div className={`bg-gradient-to-br ${category.bgColor} rounded-xl p-4 text-center border border-gray-200 hover:shadow-lg transition-all duration-300 ${
              activeCategory === category.id ? 'shadow-lg' : ''
            }`}>
              <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300`}>
                {category.icon}
              </div>
              
              <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-rose-gold transition-colors">
                {category.name}
              </h4>
              
              <p className="text-sm text-gray-600 mb-2">
                {category.count} 张照片
              </p>

              {/* 装饰性元素 */}
              <div className="flex justify-center space-x-1 mb-2">
                {Array.from({ length: 3 }, (_, i) => (
                  <div
                    key={`dot-${i}`}
                    className={`w-1.5 h-1.5 rounded-full ${
                      activeCategory === category.id ? 'bg-rose-gold' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* 悬停时显示描述 */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white text-xs p-2 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {category.description}
              </div>
            </div>

            {/* 选中状态指示器 */}
            {activeCategory === category.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-rose-gold rounded-full flex items-center justify-center"
              >
                <span className="text-white text-sm">✓</span>
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* 分类统计 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-8 p-4 bg-gradient-to-r from-rose-gold/5 to-rose-dark/5 rounded-lg border border-rose-gold/20"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">📷</span>
            <div>
              <p className="font-semibold text-gray-900">总照片数</p>
              <p className="text-sm text-gray-600">共 {categories.reduce((sum, cat) => sum + cat.count, 0)} 张珍贵回忆</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-rose-gold">
              {categories.length}
            </p>
            <p className="text-sm text-gray-600">个分类</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
