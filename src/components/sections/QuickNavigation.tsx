'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

const navigationItems = [
  {
    title: '婚礼信息',
    description: '时间、地点、联系方式',
    href: '/info',
    icon: '📅',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    title: '幸福时刻',
    description: '我们的美好回忆',
    href: '/moments',
    icon: '💕',
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
  },
  {
    title: '感谢致辞',
    description: '感谢您的祝福',
    href: '/thanks',
    icon: '🙏',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
]

export function QuickNavigation() {
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

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-rose-gold/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-rose-dark/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-rose-gold/3 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
            快速导航
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            了解更多关于我们婚礼的信息，分享我们的幸福时刻
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {navigationItems.map((item, index) => (
            <motion.div key={item.href} variants={itemVariants}>
              <Link href={item.href}>
                <motion.div
                  whileHover={{ 
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative group cursor-pointer ${item.bgColor} rounded-2xl p-8 border-2 ${item.borderColor} hover:shadow-2xl transition-all duration-300 overflow-hidden`}
                >
                  {/* 背景渐变 */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  {/* 装饰性元素 */}
                  <div className="absolute top-4 right-4 w-16 h-16 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                  
                  <div className="relative z-10">
                    {/* 图标 */}
                    <motion.div
                      className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ 
                        rotate: [0, -10, 10, 0],
                        transition: { duration: 0.5 }
                      }}
                    >
                      {item.icon}
                    </motion.div>
                    
                    {/* 标题 */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-rose-gold transition-colors duration-300">
                      {item.title}
                    </h3>
                    
                    {/* 描述 */}
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {item.description}
                    </p>
                    
                    {/* 按钮 */}
                    <div className="flex items-center justify-between">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="group-hover:bg-rose-gold group-hover:text-white group-hover:border-rose-gold transition-all duration-300"
                      >
                        了解更多
                      </Button>
                      
                      {/* 箭头图标 */}
                      <motion.div
                        className="text-rose-gold group-hover:translate-x-1 transition-transform duration-300"
                        whileHover={{ x: 5 }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* 悬停时的边框效果 */}
                  <div className={`absolute inset-0 rounded-2xl border-2 ${item.borderColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* 底部装饰 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-4 text-gray-400">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-rose-gold"></div>
            <span className="text-sm font-medium">探索更多</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-rose-gold"></div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
