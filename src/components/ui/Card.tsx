import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  hover?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, title, hover = false, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          'bg-white rounded-xl shadow-lg border border-gray-100 p-6',
          hover && 'hover:shadow-xl transition-shadow duration-200',
          className
        )}
        ref={ref}
        {...props}
      >
        {title && (
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        )}
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export { Card }
