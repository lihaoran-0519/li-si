import { NextRequest, NextResponse } from 'next/server'
// import { prisma } from '@/lib/db'

// 真实照片数据
const mockPhotos = [
  {
    id: 1,
    category: 'wedding',
    url: '/images/wedding/微信图片_20251023111608_7_256.jpg',
    title: '浪漫婚纱照',
    description: '在美丽的花园里拍摄的婚纱照，记录我们的美好时光',
    isFeatured: true,
    sortOrder: 1,
    likes: 24,
    createdAt: '2025-12-15T10:00:00.000Z',
  },
  {
    id: 2,
    category: 'wedding',
    url: '/images/wedding/微信图片_20251023111608_8_256.jpg',
    title: '温馨时刻',
    description: '相视而笑的甜蜜瞬间',
    isFeatured: true,
    sortOrder: 2,
    likes: 18,
    createdAt: '2025-11-20T15:30:00.000Z',
  },
  {
    id: 3,
    category: 'wedding',
    url: '/images/wedding/微信图片_20251023111608_9_256.jpg',
    title: '优雅姿态',
    description: '经典优雅的婚纱照',
    isFeatured: true,
    sortOrder: 3,
    likes: 22,
    createdAt: '2025-10-10T12:00:00.000Z',
  },
  {
    id: 4,
    category: 'wedding',
    url: '/images/wedding/微信图片_20251023111608_10_256.jpg',
    title: '幸福拥抱',
    description: '深情相拥的美好时光',
    isFeatured: true,
    sortOrder: 4,
    likes: 20,
    createdAt: '2025-09-05T14:20:00.000Z',
  },
  {
    id: 5,
    category: 'wedding',
    url: '/images/wedding/微信图片_20251023111609_11_256.jpg',
    title: '甜蜜对视',
    description: '眼中只有彼此的美好时刻',
    isFeatured: true,
    sortOrder: 5,
    likes: 19,
    createdAt: '2025-08-15T16:45:00.000Z',
  },
  {
    id: 6,
    category: 'wedding',
    url: '/images/wedding/微信图片_20251023111609_12_256.jpg',
    title: '浪漫牵手',
    description: '手牵手走向幸福的未来',
    isFeatured: true,
    sortOrder: 6,
    likes: 21,
    createdAt: '2025-07-20T11:30:00.000Z',
  },
  {
    id: 7,
    category: 'wedding',
    url: '/images/wedding/微信图片_20251023111610_13_256.jpg',
    title: '幸福笑容',
    description: '发自内心的幸福笑容',
    isFeatured: true,
    sortOrder: 7,
    likes: 17,
    createdAt: '2025-06-15T09:15:00.000Z',
  },
  {
    id: 8,
    category: 'wedding',
    url: '/images/wedding/微信图片_20251023111613_15_256.jpg',
    title: '美好回忆',
    description: '记录我们爱情的美好回忆',
    isFeatured: true,
    sortOrder: 8,
    likes: 23,
    createdAt: '2025-05-20T14:30:00.000Z',
  },
  {
    id: 9,
    category: 'wedding',
    url: '/images/wedding/证件照.jpg',
    title: '正式证件照',
    description: '正式的结婚证件照',
    isFeatured: false,
    sortOrder: 9,
    likes: 15,
    createdAt: '2025-04-10T10:00:00.000Z',
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
