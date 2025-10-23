import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '黎浩然 & 李思 婚礼 | 分享我们的幸福时刻',
  description: '黎浩然 & 李思 婚礼邀请 - 分享我们的幸福时刻，记录美好回忆，感谢您的祝福与陪伴',
  keywords: ['婚礼', '黎浩然', '李思', '幸福时刻', '婚纱照', '婚礼邀请', '爱情故事', '松滋凯瑞国际酒店'],
  authors: [{ name: 'Li-Si Wedding' }],
  creator: 'Li-Si Wedding',
  publisher: 'Li-Si Wedding',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: '黎浩然 & 李思 婚礼 | 分享我们的幸福时刻',
    description: '黎浩然 & 李思 婚礼邀请 - 分享我们的幸福时刻，记录美好回忆，感谢您的祝福与陪伴',
    type: 'website',
    locale: 'zh_CN',
    siteName: '黎浩然 & 李思 婚礼',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '黎浩然 & 李思 婚礼',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '黎浩然 & 李思 婚礼 | 分享我们的幸福时刻',
    description: '黎浩然 & 李思 婚礼邀请 - 分享我们的幸福时刻，记录美好回忆',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#E8B4B8" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ErrorBoundary>
          <div className="min-h-screen bg-gradient-to-br from-rose-cream to-white">
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ErrorBoundary>
      </body>
    </html>
  )
}
