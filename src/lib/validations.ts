import { z } from 'zod'

export const messageSchema = z.object({
  guestName: z.string().min(1, '姓名不能为空').max(100, '姓名不能超过100个字符'),
  guestPhone: z.string().optional(),
  message: z.string().min(1, '留言内容不能为空').max(1000, '留言内容不能超过1000个字符'),
})

export const photoSchema = z.object({
  category: z.enum(['WEDDING_PHOTOS', 'DATING_MOMENTS', 'PROPOSAL_MOMENT', 'DAILY_LIFE']),
  url: z.string().url('请输入有效的图片链接'),
  thumbnailUrl: z.string().url().optional(),
  title: z.string().max(200).optional(),
  description: z.string().optional(),
  sortOrder: z.number().int().min(0).default(0),
  isFeatured: z.boolean().default(false),
})

export const weddingInfoSchema = z.object({
  brideName: z.string().min(1, '新娘姓名不能为空').max(100),
  groomName: z.string().min(1, '新郎姓名不能为空').max(100),
  weddingDate: z.string().datetime(),
  weddingVenue: z.string().min(1, '婚礼场地不能为空').max(200),
  venueAddress: z.string().min(1, '场地地址不能为空'),
  venuePhone: z.string().max(20).optional(),
  parkingInfo: z.string().optional(),
  contactPerson: z.string().max(100).optional(),
  contactPhone: z.string().max(20).optional(),
})

export type MessageInput = z.infer<typeof messageSchema>
export type PhotoInput = z.infer<typeof photoSchema>
export type WeddingInfoInput = z.infer<typeof weddingInfoSchema>
