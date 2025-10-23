import { NextResponse } from 'next/server'

// 精选婚纱照数据
const mockFeaturedPhotos = [
  {
    id: 1,
    category: 'WEDDING_PHOTOS',
    url: '/images/wedding/微信图片_20251023111608_7_256.jpg',
    thumbnailUrl: '/images/wedding/微信图片_20251023111608_7_256.jpg',
    title: '浪漫婚纱照',
    description: '在美丽的花园里拍摄的婚纱照，记录我们的美好时光',
    isFeatured: true,
    sortOrder: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    category: 'WEDDING_PHOTOS',
    url: '/images/wedding/微信图片_20251023111608_9_256.jpg',
    thumbnailUrl: '/images/wedding/微信图片_20251023111608_9_256.jpg',
    title: '优雅姿态',
    description: '经典优雅的婚纱照',
    isFeatured: true,
    sortOrder: 3,
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    category: 'WEDDING_PHOTOS',
    url: '/images/wedding/微信图片_20251023111608_10_256.jpg',
    thumbnailUrl: '/images/wedding/微信图片_20251023111608_10_256.jpg',
    title: '幸福拥抱',
    description: '深情相拥的美好时光',
    isFeatured: true,
    sortOrder: 4,
    createdAt: new Date().toISOString(),
  },
  {
    id: 6,
    category: 'WEDDING_PHOTOS',
    url: '/images/wedding/微信图片_20251023111609_12_256.jpg',
    thumbnailUrl: '/images/wedding/微信图片_20251023111609_12_256.jpg',
    title: '浪漫牵手',
    description: '手牵手走向幸福的未来',
    isFeatured: true,
    sortOrder: 6,
    createdAt: new Date().toISOString(),
  },
  {
    id: 7,
    category: 'WEDDING_PHOTOS',
    url: '/images/wedding/微信图片_20251023111610_13_256.jpg',
    thumbnailUrl: '/images/wedding/微信图片_20251023111610_13_256.jpg',
    title: '幸福笑容',
    description: '发自内心的幸福笑容',
    isFeatured: true,
    sortOrder: 7,
    createdAt: new Date().toISOString(),
  },
]

export async function GET() {
  try {
    // 在实际项目中，这里会从数据库获取数据
    // const featuredPhotos = await prisma.photo.findMany({
    //   where: { isFeatured: true },
    //   orderBy: { sortOrder: 'asc' },
    // })
    
    // 暂时返回模拟数据
    return NextResponse.json(mockFeaturedPhotos)
  } catch (error) {
    console.error('Error fetching featured photos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch featured photos' },
      { status: 500 }
    )
  }
}
