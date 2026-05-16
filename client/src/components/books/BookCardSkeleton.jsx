import { Skeleton } from '../ui/Skeleton'

const BookCardSkeleton = () => {
  return (
    <div className="card overflow-hidden h-full">
      {/* Cover */}
      <Skeleton className="aspect-book w-full" />
      
      {/* Content */}
      <div className="p-4 flex flex-col gap-2 h-full">
        <Skeleton className="h-5 w-16 rounded-badge" />
        
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
        
        <Skeleton className="h-3 w-1/2" />

        {/* Footer */}
        <div className="mt-auto pt-3 flex items-center gap-2">
          <Skeleton className="flex-1 h-8 rounded-btn" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export default BookCardSkeleton
