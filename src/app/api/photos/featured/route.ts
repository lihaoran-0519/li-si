import { NextResponse } from 'next/server'

// 模拟精选照片数据
const mockFeaturedPhotos = [
  {
    id: 1,
    category: '婚纱照',
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
    category: '婚纱照',
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
    category: '婚纱照',
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
    category: '婚纱照',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop&crop=center',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop&crop=center',
    title: '幸福拥抱',
    description: '深情相拥的美好时光',
    isFeatured: true,
    sortOrder: 4,
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
