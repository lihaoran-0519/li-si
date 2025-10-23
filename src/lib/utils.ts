import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function formatDateShort(date: string | Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

export function calculateDaysUntilWedding(weddingDate: string | Date) {
  const now = new Date()
  const wedding = new Date(weddingDate)
  const diffTime = wedding.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export function getTimeUntilWedding(weddingDate: string | Date) {
  const now = new Date()
  const wedding = new Date(weddingDate)
  const diffTime = wedding.getTime() - now.getTime()
  
  if (diffTime <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }
  
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diffTime % (1000 * 60)) / 1000)
  
  return { days, hours, minutes, seconds }
}

export function generateImageUrl(publicId: string, options: Record<string, any> = {}) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  if (!cloudName) return publicId
  
  const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`
  const params = new URLSearchParams()
  
  Object.entries(options).forEach(([key, value]) => {
    params.append(key, value.toString())
  })
  
  const paramString = params.toString()
  return paramString ? `${baseUrl}/${paramString}/${publicId}` : `${baseUrl}/${publicId}`
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
