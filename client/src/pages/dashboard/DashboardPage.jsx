import { useState } from 'react'
import { BookOpen, BookMarked, Settings } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import CourseGrid from '../../components/courses/CourseGrid'
import BookGrid from '../../components/books/BookGrid'
import { Badge } from '../../components/ui/Badge'
import EmptyState from '../../components/shared/EmptyState'
import { cn } from '../../lib/cn'
import { ProfileModal } from '../../components/ui/ProfileModal'

const DashboardPage = () => {
  const { user, toggleBookmark } = useAuth()
  const [activeTab, setActiveTab] = useState('courses')
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)

  const bookmarkedCourses = user?.bookmarks?.courses || []
  const bookmarkedBooks = user?.bookmarks?.books || []

  const tabs = [
    { id: 'courses', label: 'My Courses', icon: BookOpen, count: bookmarkedCourses.length },
    { id: 'books', label: 'My Books', icon: BookMarked, count: bookmarkedBooks.length },
  ]

  const handleBookmarkCourse = (id) => {
    toggleBookmark('course', id)
  }

  const handleBookmarkBook = (id) => {
    toggleBookmark('book', id)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 pt-12 pb-8">
        <div className="container-main">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-brand-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-brand-500/20 overflow-hidden flex-none">
  {user?.avatar ? (
    <img src={user.avatar} className="w-full h-full object-cover" />
  ) : (
    user?.name?.charAt(0)
  )}
</div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="heading-2 dark:text-white">Welcome back, {user?.name?.split(' ')[0]}!</h1>
                  <Badge variant="brand" className="uppercase text-[10px] tracking-widest">{user?.role}</Badge>
                </div>
                <p className="body-sm">Track your progress and access your saved resources.</p>
              </div>
            </div>
            <button 
              onClick={() => setIsProfileModalOpen(true)}
              className="btn-md btn-secondary gap-2 self-start md:self-center"
            >
              <Settings size={18} />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-16 z-30">
        <div className="container-main">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'relative py-4 flex items-center gap-2 text-sm font-semibold transition-colors',
                  activeTab === tab.id 
                    ? 'text-brand-600' 
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                )}
              >
                <tab.icon size={18} />
                {tab.label}
                <span className={cn(
                  'ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold',
                  activeTab === tab.id 
                    ? 'bg-brand-50 text-brand-600 dark:bg-brand-900/30' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                )}>
                  {tab.count}
                </span>
                
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-600"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="container-main py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'courses' ? (
              bookmarkedCourses.length > 0 ? (
                <CourseGrid 
                  courses={bookmarkedCourses} 
                  isLoading={false} 
                  bookmarks={bookmarkedCourses.map(c => c._id)}
                  onBookmark={handleBookmarkCourse}
                />
              ) : (
                <EmptyState
                  icon={BookOpen}
                  title="No courses saved"
                  description="You haven't bookmarked any courses yet. Explore our catalog and start learning!"
                  action={{ label: 'Explore courses', onClick: () => window.location.href = '/courses' }}
                />
              )
            ) : (
              bookmarkedBooks.length > 0 ? (
                <BookGrid 
                  books={bookmarkedBooks} 
                  isLoading={false} 
                  bookmarks={bookmarkedBooks.map(b => b._id)}
                  onBookmark={handleBookmarkBook}
                />
              ) : (
                <EmptyState
                  icon={BookMarked}
                  title="No books saved"
                  description="Save books to your library to access them quickly anytime."
                  action={{ label: 'Browse library', onClick: () => window.location.href = '/books' }}
                />
              )
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <ProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
      />
    </div>
  )
}

export default DashboardPage
