import { Link } from 'react-router-dom'
import { Play, Bookmark, Clock } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { cn } from '../../lib/cn'

const CourseCard = ({ course, isBookmarked, onBookmark }) => {
  return (
    <div className="card-hover group flex flex-col overflow-hidden h-full">
      {/* Thumbnail */}
      <Link to={`/courses/${course._id}`} className="block relative aspect-card-img w-full overflow-hidden">
        {course.thumbnailUrl ? (
          <img 
            src={course.thumbnailUrl} 
            alt={course.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-400">
            <Play size={40} fill="currentColor" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-center justify-between">
          <Badge variant="brand">{course.category}</Badge>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock size={12} />
            <span>2h 30m</span>
          </div>
        </div>
        
        <Link to={`/courses/${course._id}`} className="block">
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 hover:text-brand-600 transition-colors">
            {course.title}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
          {course.description}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <Link 
            to={`/courses/${course._id}`}
            className="text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
          >
            Watch now
          </Link>
          
          <button
            onClick={(e) => {
              e.preventDefault()
              onBookmark && onBookmark(course._id)
            }}
            className={cn(
              "w-8 h-8 flex items-center justify-center rounded-full transition-all",
              isBookmarked 
                ? "bg-brand-50 text-brand-600 dark:bg-brand-900/30" 
                : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
          >
            <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
