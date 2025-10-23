'use client'

import { useEffect } from 'react'

interface ImagePreloaderProps {
  images: string[]
}

export function ImagePreloader({ images }: ImagePreloaderProps) {
  useEffect(() => {
    // 预加载图片
    images.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [images])

  return null
}
