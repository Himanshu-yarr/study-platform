import { useParams, Link } from 'react-router-dom'
import { Play, Bookmark, Clock, User, Calendar, ArrowLeft, Share2 } from 'lucide-react'
import { useCourse, useCourses } from '../../hooks/useCourses'
import { useAuth } from '../../context/AuthContext'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Skeleton } from '../../components/ui/Skeleton'
import EmptyState from '../../components/shared/EmptyState'
import { cn } from '../../lib/cn'

const CourseDetailPage = () => {
  const { id } = useParams()
  const { user, toggleBookmark } = useAuth()
  const { data: course, isLoading, isError, error } = useCourse(id)
  const { data: relatedCourses = [] } = useCourses({ category: course?.category })

  const isBookmarked = user?.bookmarks?.courses?.some(c => 
    (typeof c === 'object' ? c._id : c) === id
  )

  const handleBookmark = () => {
    toggleBookmark('course', id)
  }

  const getYoutubeId = (url) => {
    if (!url) return null
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  if (isLoading) {
    return (
      <div className="container-main py-12">
        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="aspect-video w-full rounded-card" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-20 w-full" />
          </div>
          <div className="lg:col-span-1">
            <Skeleton className="h-64 w-full rounded-card" />
          </div>
        </div>
      </div>
    )
  }

  if (isError || !course) {
    return (
      <div className="container-main py-20">
        <EmptyState
          icon={Play}
          title="Course not found"
          description={error?.message || "The course you're looking for doesn't exist or has been removed."}
          action={{ label: 'Go to courses', onClick: () => window.location.href = '/courses' }}
        />
      </div>
    )
  }

  const youtubeId = getYoutubeId(course.youtubeUrl)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pb-20">
      {/* Top Meta Bar */}
      <div className="border-b border-gray-100 dark:border-gray-800 py-3 sm:py-4 sticky top-16 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm z-20">
        <div className="container-main flex items-center justify-between px-4 sm:px-6">
          <Link to="/courses" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-brand-600 transition-colors">
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to courses</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Share2 size={18} />
            </button>
            <button 
              onClick={handleBookmark}
              className={cn(
                "p-2 rounded-full transition-all", 
                isBookmarked 
                  ? "bg-brand-50 text-brand-600 dark:bg-brand-900/20" 
                  : "text-gray-400 hover:text-brand-600"
              )}
            >
              <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </div>

      <div className="container-main py-4 sm:py-8 lg:py-12 px-0 sm:px-6">
        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Left: Main Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Video Player */}
            <div className="aspect-video w-full bg-black sm:rounded-card overflow-hidden shadow-2xl border-y sm:border border-gray-200 dark:border-gray-800">
              {youtubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
                  className="w-full h-full"
                  allowFullScreen
                  title={course.title}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white flex-col gap-4">
                  <Play size={64} className="text-brand-500" />
                  <p className="text-gray-400">Invalid YouTube URL provided</p>
                </div>
              )}
            </div>

            {/* Course Info */}
            <div className="space-y-6 px-4 sm:px-0">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <Badge variant="brand">{course.category}</Badge>
                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 font-medium">
                  <Clock size={14} />
                  <span>2.5 Hours</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 font-medium">
                  <Calendar size={14} />
                  <span>{new Date(course.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight">
                {course.title}
              </h1>

              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold">
                  {course.createdBy?.name?.charAt(0) || 'I'}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Instructor</p>
                  <p className="font-semibold dark:text-white">{course.createdBy?.name || 'Industry Expert'}</p>
                </div>
              </div>

              <div className="prose prose-sm sm:prose-lg dark:prose-invert max-w-none">
                <h3 className="text-lg sm:text-xl font-bold mb-3">About this course</h3>
                <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-400 whitespace-pre-wrap leading-relaxed">
                  {course.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="mt-8 lg:mt-0 lg:col-span-1 px-4 sm:px-0">
            <div className="sticky top-24 space-y-8 pb-10 sm:pb-0">
              {/* Action Card */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden">
                <div className="h-2 bg-brand-600 w-full" />
                <div className="p-8 space-y-8">
                  <div className="space-y-3 text-center">
                    <p className="text-4xl font-black text-gray-900 dark:text-white">Free</p>
                    <p className="text-sm text-gray-500 font-medium">Access full course lectures for free</p>
                  </div>
                  
                  <div className="space-y-4">
                    <Button 
                      onClick={handleBookmark}
                      variant={isBookmarked ? "secondary" : "brand"}
                      className="w-full h-14 text-base font-bold shadow-lg shadow-brand-500/20 rounded-xl gap-2"
                    >
                      <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
                      {isBookmarked ? "Bookmarked" : "Bookmark Course"}
                    </Button>
                    <p className="text-[11px] text-center text-gray-400 leading-relaxed px-4">
                      {isBookmarked 
                        ? "This course is saved to your bookmarks. You can access it anytime from your dashboard."
                        : "Enroll now to track your progress and access these lectures anytime from your dashboard."
                      }
                    </p>
                  </div>

                  <div className="pt-8 border-t border-gray-50 dark:border-gray-800 space-y-5">
                    <p className="font-bold text-[11px] uppercase tracking-[0.2em] text-gray-400">Course Features</p>
                    <ul className="space-y-4">
                      {[
                        { icon: Play, text: 'High-quality video content', color: 'text-brand-600' },
                        { icon: Clock, text: 'Lifetime access', color: 'text-brand-600' },
                        { icon: User, text: 'Expert Judiciary guidance', color: 'text-brand-600' },
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                          <div className={`p-1.5 rounded-lg bg-brand-50 dark:bg-brand-900/20 ${item.color}`}>
                            <item.icon size={16} />
                          </div>
                          {item.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Related Courses */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-wider text-gray-400">Related Courses</h4>
                <div className="space-y-4">
                  {relatedCourses.filter(c => c._id !== id).slice(0, 3).map(related => (
                    <Link 
                      key={related._id} 
                      to={`/courses/${related._id}`}
                      className="flex gap-4 group"
                    >
                      <div className="w-24 h-14 rounded bg-gray-100 dark:bg-gray-800 flex-shrink-0 overflow-hidden">
                        {related.thumbnailUrl ? (
                          <img src={related.thumbnailUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400"><Play size={16} /></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold line-clamp-2 leading-tight dark:text-white group-hover:text-brand-600 transition-colors">
                          {related.title}
                        </h5>
                        <p className="text-[10px] text-gray-500 mt-1">{related.category}</p>
                      </div>
                    </Link>
                  ))}
                  {relatedCourses.length <= 1 && (
                    <p className="text-xs text-gray-500 italic">No related courses found.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetailPage
