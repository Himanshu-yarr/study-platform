import { cn } from '../../lib/cn'

export const Skeleton = ({ className }) => (
  <div className={cn('skeleton', className)} />
)

export const SkeletonText = ({ lines = 3, className }) => (
  <div className={cn('flex flex-col gap-2', className)}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton 
        key={i} 
        className={cn(
          'h-4',
          i === lines - 1 ? 'w-2/3' : 'w-full'
        )} 
      />
    ))}
  </div>
)

export const SkeletonCard = ({ className }) => (
  <div className={cn('card overflow-hidden h-full', className)}>
    <Skeleton className="aspect-card-img w-full" />
    <div className="p-4 flex flex-col gap-3">
      <Skeleton className="h-5 w-16 rounded-badge" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  </div>
)

export const SkeletonImage = ({ ratio = 'aspect-video', className }) => (
  <Skeleton className={cn(ratio, 'w-full', className)} />
)
