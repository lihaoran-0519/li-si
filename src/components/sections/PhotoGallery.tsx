'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'

interface Photo {
  id: string
  src: string
  alt: string
  category: string
  title: string
  description: string
  date: string
  likes: number
  isLiked: boolean
}

export function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid')
  const [sortBy, setSortBy] = useState<'date' | 'likes'>('date')

  // 真实照片数据
  const photos: Photo[] = [
    {
      id: '1',
      src: '/images/wedding/微信图片_20251023111608_7_256.jpg',
      alt: '浪漫婚纱照',
      category: 'wedding',
      title: '浪漫婚纱照',
      description: '在美丽的花园里拍摄的婚纱照，记录我们的美好时光',
      date: '2025-12-15',
      likes: 24,
      isLiked: false
    },
    {
      id: '3',
      src: '/images/wedding/微信图片_20251023111608_9_256.jpg',
      alt: '优雅姿态',
      category: 'wedding',
      title: '优雅姿态',
      description: '经典优雅的婚纱照',
      date: '2025-10-10',
      likes: 22,
      isLiked: false
    },
    {
      id: '4',
      src: '/images/wedding/微信图片_20251023111608_10_256.jpg',
      alt: '幸福拥抱',
      category: 'wedding',
      title: '幸福拥抱',
      description: '深情相拥的美好时光',
      date: '2025-09-05',
      likes: 20,
      isLiked: false
    },
    {
      id: '6',
      src: '/images/wedding/微信图片_20251023111609_12_256.jpg',
      alt: '浪漫牵手',
      category: 'wedding',
      title: '浪漫牵手',
      description: '手牵手走向幸福的未来',
      date: '2025-07-20',
      likes: 21,
      isLiked: false
    },
    {
      id: '7',
      src: '/images/wedding/微信图片_20251023111610_13_256.jpg',
      alt: '幸福笑容',
      category: 'wedding',
      title: '幸福笑容',
      description: '发自内心的幸福笑容',
      date: '2025-06-15',
      likes: 17,
      isLiked: false
    },
  ]

  const handleLike = (photoId: string) => {
    // 这里应该调用API更新点赞状态
    console.log('Like photo:', photoId)
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gradient mb-2">照片画廊</h3>
            <p className="text-gray-600">点击照片查看大图，分享我们的美好回忆</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            {/* 视图模式切换 */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-rose-gold text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <span className="text-lg">⊞</span>
              </button>
              <button
                onClick={() => setViewMode('masonry')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'masonry' ? 'bg-rose-gold text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <span className="text-lg">⊡</span>
              </button>
            </div>

            {/* 排序方式 */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'likes')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-gold focus:border-transparent"
            >
              <option value="date">按时间排序</option>
              <option value="likes">按点赞排序</option>
            </select>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={`grid gap-4 ${
          viewMode === 'grid' 
            ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="group relative cursor-pointer"
            onClick={() => setSelectedPhoto(photo)}
          >
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-200">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
              
              {/* 悬停遮罩 */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center space-x-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleLike(photo.id)
                    }}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                  >
                    <span className={`text-xl ${photo.isLiked ? 'text-red-500' : 'text-white'}`}>
                      {photo.isLiked ? '❤️' : '🤍'}
                    </span>
                  </button>
                  <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                    <span className="text-xl text-white">🔍</span>
                  </button>
                </div>
              </div>

              {/* 照片信息 */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <h4 className="text-white font-semibold mb-1">{photo.title}</h4>
                <div className="flex items-center justify-between text-sm text-white/80">
                  <span>{photo.date}</span>
                  <div className="flex items-center space-x-1">
                    <span>{photo.likes}</span>
                    <span>❤️</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* 照片详情模态框 */}
      {selectedPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-xl max-w-4xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col lg:flex-row">
              {/* 图片区域 */}
              <div className="lg:w-2/3">
                <div className="relative aspect-video lg:aspect-square">
                  <Image
                    src={selectedPhoto.src}
                    alt={selectedPhoto.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                </div>
              </div>

              {/* 详情区域 */}
              <div className="lg:w-1/3 p-6 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{selectedPhoto.title}</h3>
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <span className="text-xl">✕</span>
                  </button>
                </div>

                <p className="text-gray-600 mb-4">{selectedPhoto.description}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">📅</span>
                    <span className="text-sm text-gray-700">{selectedPhoto.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">🏷️</span>
                    <span className="text-sm text-gray-700">{selectedPhoto.category}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <button
                    onClick={() => handleLike(selectedPhoto.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      selectedPhoto.isLiked 
                        ? 'bg-red-50 text-red-600' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <span className="text-lg">
                      {selectedPhoto.isLiked ? '❤️' : '🤍'}
                    </span>
                    <span>{selectedPhoto.likes}</span>
                  </button>

                  <button className="flex items-center space-x-2 px-4 py-2 bg-rose-gold text-white rounded-lg hover:bg-rose-dark transition-colors">
                    <span>📤</span>
                    <span>分享</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* 加载更多按钮 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-8 text-center"
      >
        <button className="px-8 py-3 bg-gradient-to-r from-rose-gold to-rose-dark text-white rounded-lg hover:shadow-lg transition-all duration-300">
          加载更多照片
        </button>
      </motion.div>
    </div>
  )
}
