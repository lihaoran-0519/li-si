'use client'

import Image from 'next/image'

export default function TestImagesPage() {
  const images = [
    '/images/wedding/微信图片_20251023111608_7_256.jpg',
    '/images/wedding/微信图片_20251023111608_8_256.jpg',
    '/images/wedding/微信图片_20251023111608_9_256.jpg',
    '/images/wedding/微信图片_20251023111608_10_256.jpg',
    '/images/wedding/微信图片_20251023111609_11_256.jpg',
    '/images/wedding/微信图片_20251023111609_12_256.jpg',
    '/images/wedding/微信图片_20251023111610_13_256.jpg',
    '/images/wedding/微信图片_20251023111613_15_256.jpg',
    '/images/wedding/证件照.jpg',
  ]

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">图片测试页面</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((src, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="text-lg font-semibold mb-2">图片 {index + 1}</h3>
            <div className="relative h-64 w-full">
              <Image
                src={src}
                alt={`测试图片 ${index + 1}`}
                fill
                className="object-contain"
                onError={(e) => {
                  console.error('图片加载失败:', src)
                  e.currentTarget.style.display = 'none'
                }}
                onLoad={() => {
                  console.log('图片加载成功:', src)
                }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">{src}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
