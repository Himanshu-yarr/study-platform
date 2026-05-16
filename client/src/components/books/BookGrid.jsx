import BookCard from './BookCard'
import BookCardSkeleton from './BookCardSkeleton'
import { motion, AnimatePresence } from 'framer-motion'

const BookGrid = ({ books, isLoading, onBookmark, bookmarks = [] }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <BookCardSkeleton key={i} />
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
