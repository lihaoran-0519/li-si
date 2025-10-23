'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import { Photo } from '@/types'
import Image from 'next/image'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

export function FeaturedPhotos() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    // 从API获取精选照片
    const fetchFeaturedPhotos = async () => {
      try {
        const response = await fetch('/api/photos/featured')
        if (response.ok) {
          const data = await response.json()
          setPhotos(data)
        } else {
          // 如果API失败，使用模拟数据
          setPhotos(getMockPhotos())
        }
      } catch (error) {
        console.error('Error fetching featured photos:', error)
        setPhotos(getMockPhotos())
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedPhotos()
  }, [])

  const getMockPhotos = (): Photo[] => [
    {
      id: 1,
      category: 'WEDDING_PHOTOS',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop&crop=center',
      thumbnailUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop&crop=center',
      title: '浪漫婚纱照',
      description: '在夕阳下的浪漫时刻',
      isFeatured: true,
      sortOrder: 1,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      category: 'WEDDING_PHOTOS',
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop&crop=center',
      thumbnailUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop&crop=center',
      title: '温馨时刻',
      description: '相视而笑的甜蜜瞬间',
      isFeatured: true,
      sortOrder: 2,
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      category: 'WEDDING_PHOTOS',
      url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=600&fit=crop&crop=center',
      thumbnailUrl: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=300&fit=crop&crop=center',
      title: '优雅姿态',
      description: '经典的黑白婚纱照',
      isFeatured: true,
      sortOrder: 3,
      createdAt: new Date().toISOString(),
    },
    {
      id: 4,
      category: 'WEDDING_PHOTOS',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop&crop=center',
      thumbnailUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop&crop=center',
      title: '幸福拥抱',
      description: '深情相拥的美好时光',
      isFeatured: true,
      sortOrder: 4,
      createdAt: new Date().toISOString(),
    },
  ]

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-8"></div>
            <div className="h-96 bg-gray-300 rounded-lg max-w-4xl mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  if (photos.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
            精选婚纱照
          </h2>
          <p className="text-lg text-gray-600">
            照片正在准备中，敬请期待...
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-rose-gold/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-rose-dark/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
            精选婚纱照
          </h2>
          <p className="text-lg text-gray-600">
            记录我们美好的瞬间
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* 主轮播区域 */}
          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay, EffectFade]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              pagination={{
                clickable: true,
                el: '.swiper-pagination-custom',
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              effect="fade"
              fadeEffect={{
                crossFade: true,
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              className="rounded-2xl overflow-hidden shadow-2xl"
            >
              {photos.map((photo, index) => (
                <SwiperSlide key={photo.id}>
                  <div className="relative w-full h-96 md:h-[500px] group overflow-hidden">
                    <Image
                      src={photo.url}
                      alt={photo.title || `婚纱照 ${index + 1}`}
                      fill
                      className="object-contain"
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">
                          {photo.title}
                        </h3>
                        {photo.description && (
                          <p className="text-lg opacity-90">
                            {photo.description}
                          </p>
                        )}
                      </motion.div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* 自定义导航按钮 */}
            <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 group">
              <svg className="w-6 h-6 text-gray-700 group-hover:text-rose-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 group">
              <svg className="w-6 h-6 text-gray-700 group-hover:text-rose-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* 缩略图导航 */}
          <div className="mt-8">
            <div className="flex justify-center space-x-4 overflow-x-auto pb-2">
              {photos.map((photo, index) => (
                <button
                  key={photo.id}
                  onClick={() => {
                    // 这里需要获取swiper实例来切换slide
                    const swiper = document.querySelector('.swiper') as any
                    if (swiper && swiper.swiper) {
                      swiper.swiper.slideTo(index)
                    }
                  }}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                    activeIndex === index
                      ? 'ring-4 ring-rose-gold scale-110'
                      : 'hover:scale-105 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={photo.thumbnailUrl || photo.url}
                    alt={photo.title || `缩略图 ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                    sizes="80px"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  />
                </button>
              ))}
            </div>
          </div>

          {/* 自定义分页器 */}
          <div className="swiper-pagination-custom flex justify-center mt-6 space-x-2"></div>
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
            📸
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
            💕
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

      <style jsx global>{`
        .swiper-pagination-custom .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #E8B4B8;
          opacity: 0.5;
          transition: all 0.3s;
        }
        .swiper-pagination-custom .swiper-pagination-bullet-active {
          background: #E8B4B8;
          opacity: 1;
          transform: scale(1.2);
        }
      `}</style>
    </section>
  )
}
