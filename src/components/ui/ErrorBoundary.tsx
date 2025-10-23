'use client'

import { Component, ReactNode } from 'react'
import { Button } from './Button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <div className="text-6xl mb-4">😅</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              哎呀，出了点小问题
            </h2>
            <p className="text-gray-600 mb-6">
              页面加载时遇到了问题，请尝试刷新页面
            </p>
            <Button
              onClick={() => window.location.reload()}
              variant="primary"
            >
              刷新页面
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
