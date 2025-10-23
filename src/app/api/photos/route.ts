import { NextRequest, NextResponse } from 'next/server'
// import { prisma } from '@/lib/db'

// 模拟照片数据
const mockPhotos = [
  {
    id: 1,
    category: 'wedding',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop&crop=center',
    title: '浪漫婚纱照',
    description: '在美丽的花园里拍摄的婚纱照，记录我们的美好时光',
    isFeatured: true,
    sortOrder: 1,
    likes: 24,
    createdAt: '2025-12-15T10:00:00.000Z',
  },
  {
    id: 2,
    category: 'proposal',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop&crop=center',
    title: '求婚时刻',
    description: '那个特别的夜晚，他单膝跪地向我求婚',
    isFeatured: true,
    sortOrder: 2,
    likes: 18,
    createdAt: '2025-11-20T15:30:00.000Z',
  },
  {
    id: 3,
    category: 'life',
    url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop&crop=center',
    title: '日常生活',
    description: '一起做饭的温馨时光',
    isFeatured: false,
    sortOrder: 3,
    likes: 12,
    createdAt: '2025-10-10T12:00:00.000Z',
  },
  {
    id: 4,
    category: 'travel',
    url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop&crop=center',
    title: '旅行回忆',
    description: '第一次一起旅行，在美丽的海边',
    isFeatured: false,
    sortOrder: 4,
    likes: 15,
    createdAt: '2025-09-05T14:20:00.000Z',
  },
  {
    id: 5,
    category: 'family',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop&crop=center',
    title: '家庭聚会',
    description: '和家人一起度过的美好时光',
    isFeatured: true,
    sortOrder: 5,
    likes: 20,
    createdAt: '2025-08-15T16:45:00.000Z',
  },
  {
    id: 6,
    category: 'engagement',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop&crop=center',
    title: '订婚仪式',
    description: '正式的订婚仪式，双方家人都很开心',
    isFeatured: false,
    sortOrder: 6,
    likes: 22,
    createdAt: '2025-07-20T11:30:00.000Z',
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const sortBy = searchParams.get('sortBy') || 'date'
    const limit = Number.parseInt(searchParams.get('limit') || '20')
    const offset = Number.parseInt(searchParams.get('offset') || '0')

    let filteredPhotos = [...mockPhotos]

    // 按分类筛选
    if (category && category !== 'all') {
      filteredPhotos = filteredPhotos.filter(photo => photo.category === category)
    }

    // 排序
    if (sortBy === 'likes') {
      filteredPhotos.sort((a, b) => b.likes - a.likes)
    } else {
      filteredPhotos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    // 分页
    const paginatedPhotos = filteredPhotos.slice(offset, offset + limit)

    return NextResponse.json({
      photos: paginatedPhotos,
      total: filteredPhotos.length,
      hasMore: offset + limit < filteredPhotos.length
    })
  } catch (error) {
    console.error('Error fetching photos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch photos' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const category = formData.get('category') as string
    const title = formData.get('title') as string
    const description = formData.get('description') as string

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // 在实际项目中，这里会上传文件到云存储服务
    // 然后保存照片信息到数据库
    
    // 模拟上传成功
    const newPhoto = {
      id: Date.now(),
      category: category || 'wedding',
      url: URL.createObjectURL(file), // 临时URL，实际应该是云存储URL
      title: title || file.name.split('.')[0],
      description: description || '',
      isFeatured: false,
      sortOrder: 999,
      likes: 0,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({
      photo: newPhoto,
      message: 'Photo uploaded successfully'
    })
  } catch (error) {
    console.error('Error uploading photo:', error)
    return NextResponse.json(
      { error: 'Failed to upload photo' },
      { status: 500 }
    )
  }
}
