import { useState } from 'react'
import { BookOpen, AlertCircle } from 'lucide-react'
import { useCourses } from '../../hooks/useCourses'
import { useAuth } from '../../context/AuthContext'
import CourseGrid from '../../components/courses/CourseGrid'
import SearchInput from '../../components/shared/SearchInput'
import EmptyState from '../../components/shared/EmptyState'

const CoursesPage = () => {
  const { user, toggleBookmark } = useAuth()
  const [search, setSearch] = useState('')

  const { 
    data: courses = [], 
    isLoading, 
    isError, 
    error,
    refetch 
  } = useCourses({ search })

  const handleBookmark = (id) => {
    toggleBookmark('course', id)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Page Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 pt-12 pb-8">
        <div className="container-main">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="heading-2 dark:text-white">Legal Video Lectures</h1>
              <p className="body-lg">Master Law subjects and Judiciary prep with Zeenat's expert guidance.</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="font-semibold text-gray-900 dark:text-white">{courses.length}</span>
              <span>results found</span>
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
              placeholder="Search legal lectures..."
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
            title="Failed to load courses"
            description={error.message || 'Something went wrong while fetching courses.'}
            action={{ label: 'Try again', onClick: refetch }}
          />
        ) : courses.length === 0 && !isLoading ? (
          <EmptyState
            icon={BookOpen}
            title="No courses found"
            description={
              search 
                ? `No results for "${search}".` 
                : "We couldn't find any courses matching your criteria."
            }
            action={search ? { label: 'Clear search', onClick: () => setSearch('') } : null}
          />
        ) : (
          <CourseGrid 
            courses={courses} 
            isLoading={isLoading} 
            onBookmark={handleBookmark}
            bookmarks={(user?.bookmarks?.courses || []).map(c => typeof c === 'object' ? c._id : c)}
          />
        )}
      </main>
    </div>
  )
}

export default CoursesPage
