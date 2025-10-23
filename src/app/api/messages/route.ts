import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { messageSchema } from '@/lib/validations'

export async function GET(request: NextRequest) {
  try {
    if (!prisma) {
      return NextResponse.json(
        { error: 'Database not available' },
        { status: 503 }
      )
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    
    const [messages, total] = await Promise.all([
      prisma.message.findMany({
        where: { isApproved: true },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.message.count({ where: { isApproved: true } }),
    ])
    
    return NextResponse.json({
      messages,
      total,
      page,
      limit,
    })
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!prisma) {
      return NextResponse.json(
        { error: 'Database not available' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const validatedData = messageSchema.parse(body)
    
    const message = await prisma.message.create({
      data: validatedData,
    })
    
    return NextResponse.json({
      success: true,
      message: 'Message submitted successfully',
      data: message,
    })
  } catch (error) {
    console.error('Error creating message:', error)
    return NextResponse.json(
      { error: 'Failed to create message' },
      { status: 500 }
    )
  }
}
