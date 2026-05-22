import CourseCard from './CourseCard'
import CourseCardSkeleton from './CourseCardSkeleton'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/cn'

const CourseGrid = ({ courses, isLoading, onBookmark, bookmarks = [], variant = 'grid' }) => {
  if (isLoading) {
    return (
      <div className={cn(
        "grid gap-6",
        variant === 'horizontal' ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      )}>
        {Array.from({ length: 3 }).map((_, i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (variant === 'horizontal') {
    return (
      <div className="flex overflow-x-auto pb-4 gap-6 snap-x no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div key={course._id} className="min-w-[280px] sm:min-w-0 snap-start">
            <CourseCard 
              course={course} 
              isBookmarked={bookmarks.includes(course._id)}
              onBookmark={onBookmark}
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence mode="popLayout">
        {courses.map((course) => (
          <motion.div
            key={course._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            layout
          >
            <CourseCard 
              course={course} 
              isBookmarked={bookmarks.includes(course._id)}
              onBookmark={onBookmark}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default CourseGrid
