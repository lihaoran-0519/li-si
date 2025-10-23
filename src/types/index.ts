export interface Photo {
  id: number
  category: 'WEDDING_PHOTOS' | 'DATING_MOMENTS' | 'PROPOSAL_MOMENT' | 'DAILY_LIFE'
  url: string
  thumbnailUrl?: string
  title?: string
  description?: string
  sortOrder: number
  isFeatured: boolean
  createdAt: string
}

export interface Message {
  id: number
  guestName: string
  guestPhone?: string
  message: string
  isApproved: boolean
  createdAt: string
}

export interface WeddingInfo {
  brideName: string
  groomName: string
  weddingDate: string
  venue: string
  address: string
  phone?: string
  parkingInfo?: string
  contactPerson?: string
  contactPhone?: string
}

export interface HomePageData {
  brideName: string
  groomName: string
  weddingDate: string
  weddingTheme: string
  featuredPhotos: Photo[]
  welcomeMessage: string
}

export interface ApiResponse<T> {
  data?: T
  error?: string
  success?: boolean
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

export interface TimelineEvent {
  time: string
  title: string
  description?: string
  isActive?: boolean
}

export interface VenueInfo {
  name: string
  address: string
  phone?: string
  parkingInfo?: string
  transportation?: {
    subway?: string[]
    bus?: string[]
    driving?: string
  }
}

export interface ContactPerson {
  name: string
  phone: string
  role: string
  wechat?: string
}
