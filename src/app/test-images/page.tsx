'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function TestImagesPage() {
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({})

  const images = [
    {
      id: '1',
      src: '/images/wedding/微信图片_20251023111608_7_256.jpg',
      alt: '浪漫婚纱照',
      name: '微信图片_20251023111608_7_256.jpg'
    },
    {
      id: '2', 
      src: '/images/wedding/微信图片_20251023111608_9_256.jpg',
      alt: '优雅姿态',
      name: '微信图片_20251023111608_9_256.jpg'
    },
    {
      id: '3',
      src: '/images/wedding/微信图片_20251023111608_10_256.jpg', 
      alt: '幸福拥抱',
      name: '微信图片_20251023111608_10_256.jpg'
    },
    {
      id: '4',
      src: '/images/wedding/微信图片_20251023111609_12_256.jpg',
      alt: '浪漫牵手', 
      name: '微信图片_20251023111609_12_256.jpg'
    },
    {
      id: '5',
      src: '/images/wedding/微信图片_20251023111610_13_256.jpg',
      alt: '幸福笑容',
      name: '微信图片_20251023111610_13_256.jpg'
    }
  ]

  const handleImageError = (imageId: string) => {
    setImageErrors(prev => ({ ...prev, [imageId]: true }))
  }

  const handleImageLoad = (imageId: string) => {
    setImageErrors(prev => ({ ...prev, [imageId]: false }))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">图片访问测试</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <div key={image.id} className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold mb-2">{image.alt}</h3>
              <p className="text-sm text-gray-600 mb-4 break-all">{image.name}</p>
              
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                {!imageErrors[image.id] ? (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    onError={() => handleImageError(image.id)}
                    onLoad={() => handleImageLoad(image.id)}
                    unoptimized={true}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-red-500">
                    <div className="text-center">
                      <p className="text-sm">❌ 图片加载失败</p>
                      <p className="text-xs mt-1">URL: {image.src}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-500">URL: {image.src}</p>
                <button 
                  onClick={() => window.open(image.src, '_blank')}
                  className="mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                >
                  直接访问图片
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">调试信息</h2>
          <div className="space-y-2 text-sm">
            <p><strong>当前环境:</strong> {process.env.NODE_ENV}</p>
            <p><strong>图片优化:</strong> 已禁用 (unoptimized: true)</p>
            <p><strong>缓存设置:</strong> 无缓存</p>
            <p><strong>失败图片数量:</strong> {Object.values(imageErrors).filter(Boolean).length}</p>
          </div>
        </div>
      </div>
    </div>
  )
}