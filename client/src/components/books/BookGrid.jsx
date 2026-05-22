import BookCard from './BookCard'
import BookCardSkeleton from './BookCardSkeleton'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/cn'

const BookGrid = ({ books, isLoading, onBookmark, bookmarks = [], variant = 'grid' }) => {
  if (isLoading) {
    return (
      <div className={cn(
        "grid gap-5",
        variant === 'horizontal' ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
      )}>
        {Array.from({ length: 4 }).map((_, i) => (
          <BookCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (variant === 'horizontal') {
    return (
      <div className="flex overflow-x-auto pb-4 gap-5 snap-x no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 lg:grid-cols-4">
        {books.map((book) => (
          <div key={book._id} className="min-w-[160px] sm:min-w-0 snap-start">
            <BookCard 
              book={book} 
              isBookmarked={bookmarks.includes(book._id)}
              onBookmark={onBookmark}
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
      <AnimatePresence mode="popLayout">
        {books.map((book) => (
          <motion.div
            key={book._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            layout
          >
            <BookCard 
              book={book} 
              isBookmarked={bookmarks.includes(book._id)}
              onBookmark={onBookmark}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default BookGrid
