import CourseCard from './CourseCard'
import CourseCardSkeleton from './CourseCardSkeleton'
import { motion, AnimatePresence } from 'framer-motion'

const CourseGrid = ({ courses, isLoading, onBookmark, bookmarks = [] }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <CourseCardSkeleton key={i} />
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
