import { cn } from '../../lib/cn'

export const Badge = ({ children, variant = 'brand', className }) => {
  const variants = {
    brand: 'badge-brand',
    green: 'badge-green',
    gray: 'badge-gray',
  }

  return (
    <span className={cn('badge', variants[variant], className)}>
      {children}
    </span>
  )
}
