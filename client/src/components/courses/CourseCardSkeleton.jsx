import { Skeleton } from '../ui/Skeleton'

const CourseCardSkeleton = () => {
  return (
    <div className="card overflow-hidden h-full">
      {/* Thumbnail */}
      <Skeleton className="aspect-card-img w-full" />
      
      {/* Content */}
      <div className="p-4 flex flex-col gap-3 h-full">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-16 rounded-badge" />
          <Skeleton className="h-4 w-12" />
        </div>
        
        <div className="space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </div>
        
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export default CourseCardSkeleton
