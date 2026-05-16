import { cn } from '../../lib/cn'

export const Card = ({ children, className, padding = 'p-6', ...props }) => {
  return (
    <div 
      className={cn('card', padding, className)} 
      {...props}
    >
      {children}
    </div>
  )
}

export const CardHeader = ({ children, className }) => (
  <div className={cn('mb-4', className)}>{children}</div>
)

export const CardBody = ({ children, className }) => (
  <div className={cn('flex-1', className)}>{children}</div>
)

export const CardFooter = ({ children, className }) => (
  <div className={cn('mt-4 pt-4 border-t border-gray-100 dark:border-gray-800', className)}>
    {children}
  </div>
)
