'use client'

import { Hero } from '@/components/sections/Hero'
import { Countdown } from '@/components/sections/Countdown'
import { FeaturedPhotos } from '@/components/sections/FeaturedPhotos'
import { QuickNavigation } from '@/components/sections/QuickNavigation'
import { ImagePreloader } from '@/components/ui/ImagePreloader'
import { motion } from 'framer-motion'

export default function HomePage() {
  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 }
  }

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  }

  // 预加载图片列表
  const preloadImages = [
    '/images/wedding/微信图片_20251023111608_7_256.jpg',
    '/images/wedding/微信图片_20251023111608_8_256.jpg',
    '/images/wedding/微信图片_20251023111608_9_256.jpg',
    '/images/wedding/微信图片_20251023111608_10_256.jpg',
  ]

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen"
    >
      <ImagePreloader images={preloadImages} />
      <Hero />
      <Countdown />
      <FeaturedPhotos />
      <QuickNavigation />
    </motion.div>
  )
}
