import { Link } from 'react-router-dom'
import { BookMarked, Download, Bookmark } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { cn } from '../../lib/cn'
import { useAuth } from '../../context/AuthContext'
import { getDownloadUrl } from '../../lib/cloudinary'

const BookCard = ({ book, isBookmarked, onBookmark }) => {
  const { user } = useAuth()

  return (
    <div className="card-hover group flex flex-col overflow-hidden h-full">
      {/* Cover Image */}
      <Link to={`/books/${book._id}`} className="block relative aspect-book w-full overflow-hidden">
        {book.coverUrl ? (
          <img 
            src={book.coverUrl} 
            alt={book.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          />
        ) : (
          <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center text-gray-400 gap-2">
            <BookMarked size={48} strokeWidth={1.5} />
            <span className="text-xs font-medium uppercase tracking-wider">No Cover</span>
          </div>
        )}

        {/* Badges Overlay */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {book.isDigitalAvailable && (
            book.price === 0 ? (
              <Badge variant="brand" className="text-[9px] uppercase font-bold py-0.5 px-1.5 shadow-sm">FREE PDF</Badge>
            ) : (
              <Badge variant="orange" className="text-[9px] uppercase font-bold py-0.5 px-1.5 shadow-sm">₹{book.price}</Badge>
            )
          )}
          {book.isPhysicalAvailable && (
            <Badge variant="gray" className="text-[9px] uppercase font-bold py-0.5 px-1.5 bg-white/90 backdrop-blur-sm text-gray-900 border-none shadow-sm">Physical Copy</Badge>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col gap-1.5 flex-1">
        <Badge variant="gray" className="w-fit">{book.category}</Badge>
        
        <Link to={`/books/${book._id}`} className="block">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 hover:text-brand-600 transition-colors leading-tight">
            {book.title}
          </h3>
        </Link>
        
        <p className="text-xs text-gray-500 dark:text-gray-400">
          By {book.author}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-3 flex items-center gap-2">
          {user && book.pdfUrl && book.isDigitalAvailable && book.price === 0 && (
            <a 
              href={getDownloadUrl(book.pdfUrl)} 
              download={`${book.title}.pdf`}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 btn-sm btn-secondary gap-2 text-[10px] uppercase tracking-wider"
              onClick={(e) => e.stopPropagation()}
            >
              <Download size={14} />
              PDF
            </a>
          )}
          
          <button
            onClick={(e) => {
              e.preventDefault()
              onBookmark && onBookmark(book._id)
            }}
            className={cn(
              "w-8 h-8 flex items-center justify-center rounded-full transition-all border border-gray-100 dark:border-gray-800",
              isBookmarked 
                ? "bg-brand-50 text-brand-600 dark:bg-brand-900/30 border-brand-100 dark:border-brand-800" 
                : "text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
            )}
          >
            <Bookmark size={16} fill={isBookmarked ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookCard
