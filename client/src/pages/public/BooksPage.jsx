import { useState } from 'react'
import { BookMarked, AlertCircle } from 'lucide-react'
import { useBooks } from '../../hooks/useBooks'
import { useAuth } from '../../context/AuthContext'
import BookGrid from '../../components/books/BookGrid'
import SearchInput from '../../components/shared/SearchInput'
import EmptyState from '../../components/shared/EmptyState'

const BooksPage = () => {
  const { user, toggleBookmark } = useAuth()
  const [search, setSearch] = useState('')

  const { 
    data: books = [], 
    isLoading, 
    isError, 
    error,
    refetch 
  } = useBooks({ search })

  const handleBookmark = (id) => {
    toggleBookmark('book', id)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Page Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 pt-12 pb-8">
        <div className="container-main">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="heading-2 dark:text-white">Law Books & Notes</h1>
              <p className="body-lg">Comprehensive study guides, hand-written notes, and reference materials for Judiciary exams.</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="font-semibold text-gray-900 dark:text-white">{books.length}</span>
              <span>titles available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="sticky top-16 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 py-4">
        <div className="container-main">
          <div className="flex flex-col md:flex-row md:items-center justify-center gap-4">
            <SearchInput 
              value={search} 
              onChange={setSearch} 
              placeholder="Search law books and notes..."
              className="w-full max-w-2xl"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container-main py-8">
        {isError ? (
          <EmptyState
            icon={AlertCircle}
            title="Failed to load books"
            description={error.message || 'Something went wrong while fetching books.'}
            action={{ label: 'Try again', onClick: refetch }}
          />
        ) : books.length === 0 && !isLoading ? (
          <EmptyState
            icon={BookMarked}
            title="No books found"
            description={
              search 
                ? `No titles matching "${search}" found.` 
                : "Our library is currently empty."
            }
            action={search ? { label: 'Clear search', onClick: () => setSearch('') } : null}
          />
        ) : (
          <BookGrid 
            books={books} 
            isLoading={isLoading} 
            onBookmark={handleBookmark}
            bookmarks={(user?.bookmarks?.books || []).map(b => typeof b === 'object' ? b._id : b)}
          />
        )}
      </main>
    </div>
  )
}

export default BooksPage
