'use client'

import { Hero } from '@/components/sections/Hero'
import { Countdown } from '@/components/sections/Countdown'
import { FeaturedPhotos } from '@/components/sections/FeaturedPhotos'
import { QuickNavigation } from '@/components/sections/QuickNavigation'
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

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen"
    >
      <Hero />
      <Countdown />
      <FeaturedPhotos />
      <QuickNavigation />
    </motion.div>
  )
}
