import { Link } from 'react-router-dom'
import { Play, BookOpen, ArrowRight, Shield, Zap, Globe } from 'lucide-react'
import { useCourses } from '../../hooks/useCourses'
import { useBooks } from '../../hooks/useBooks'
import CourseGrid from '../../components/courses/CourseGrid'
import BookGrid from '../../components/books/BookGrid'
import { Button } from '../../components/ui/Button'
import NoticeBoard from '../../components/shared/NoticeBoard'

const HomePage = () => {
  const { data: courses = [], isLoading: coursesLoading } = useCourses()
  const { data: books = [], isLoading: booksLoading } = useBooks()

  const featuredCourses = courses.slice(0, 3)
  const featuredBooks = books.slice(0, 4)

  return (
    <div className="flex flex-col w-full">
      <NoticeBoard />
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-64px)] flex items-center overflow-hidden bg-white dark:bg-gray-950">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div 
            className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] rounded-full opacity-20 blur-[120px]"
            style={{ background: 'radial-gradient(circle, var(--color-brand) 0%, transparent 70%)' }}
          />
          <div 
            className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] rounded-full opacity-10 blur-[100px]"
            style={{ background: 'radial-gradient(circle, #818cf8 0%, transparent 70%)' }}
          />
        </div>

        <div className="container-main relative z-10 py-12 md:py-20 lg:py-0">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left Col */}
            <div className="flex-1 text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider">
                <Zap size={14} />
                <span>Crack Judiciary & LLB Exams</span>
              </div>
              
              <h1 className="heading-1 max-w-2xl mx-auto lg:mx-0">
                Master your Law Exams with <span className="text-brand-600">STUDY GO with ZEENAT</span>
              </h1>
              
              <p className="body-lg max-w-xl mx-auto lg:mx-0 text-gray-600 dark:text-gray-400">
                Access expert-led video courses and comprehensive study materials designed specifically for Judiciary and LLB students. Learn at your own pace and achieve your legal career goals.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link to="/courses">
                  <Button size="lg" className="px-8 shadow-lg shadow-brand-500/20">
                    Explore Courses
                  </Button>
                </Link>
                <Link to="/books">
                  <Button variant="secondary" size="lg" className="px-8">
                    Law Resources
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-8 pt-4 text-gray-400">
                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">Expert</span>
                  <span className="text-xs uppercase tracking-widest font-medium">Guidance</span>
                </div>
                <div className="w-px h-8 bg-gray-200 dark:bg-gray-800" />
                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">Full</span>
                  <span className="text-xs uppercase tracking-widest font-medium">LLB Support</span>
                </div>
                <div className="w-px h-8 bg-gray-200 dark:bg-gray-800" />
                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">Judiciary</span>
                  <span className="text-xs uppercase tracking-widest font-medium">Exams</span>
                </div>
              </div>
            </div>

            {/* Right Col */}
            <div className="flex-1 w-full max-w-2xl lg:max-w-none">
              <div className="relative">
                <div className="aspect-video bg-gray-900 rounded-card shadow-2xl overflow-hidden border border-gray-800 transform rotate-1 lg:rotate-2 hover:rotate-0 transition-transform duration-500 group">
                  <img 
                    src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                    alt="Judiciary Preparation" 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-brand-600 shadow-xl cursor-pointer hover:scale-110 transition-transform">
                      <Play fill="currentColor" size={24} className="ml-1" />
                    </div>
                  </div>
                </div>
                
                {/* Floating cards */}
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-900 p-4 rounded-card shadow-xl border border-gray-100 dark:border-gray-800 hidden sm:flex items-center gap-3 animate-bounce-slow">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <Shield size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Trusted</p>
                    <p className="text-sm font-semibold dark:text-white">Judiciary Content</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="page-section bg-gray-50 dark:bg-gray-900/50">
        <div className="container-main">
          <div className="section-heading">
            <span className="section-tag">Target Judiciary</span>
            <h2 className="heading-2">In-Depth Video Lectures</h2>
            <p className="body-lg max-w-2xl">
              Comprehensive courses covering IPC, CRPC, Evidence Act, and all major subjects for Law exams.
            </p>
          </div>
          
          <CourseGrid 
            courses={featuredCourses} 
            isLoading={coursesLoading} 
          />

          <div className="mt-12 text-center">
            <Link to="/courses">
              <Button variant="ghost" className="gap-2 group">
                Browse all courses
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats / Features */}
      <section className="page-section bg-brand-600 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[40%] h-full opacity-10 pointer-events-none">
          <Globe size={400} className="absolute -right-20 -top-20" />
        </div>
        
        <div className="container-main relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-sm">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-bold">Concept Clarity</h3>
              <p className="text-brand-100">Complex legal provisions explained in simple, easy-to-understand language.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-sm">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-bold">Judiciary Focused</h3>
              <p className="text-brand-100">Exam-oriented approach for State Judiciary and LLB university exams.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-sm">
                <BookOpen size={32} />
              </div>
              <h3 className="text-xl font-bold">Law Resources</h3>
              <p className="text-brand-100">Quality notes and books curated by Zeenat for your thorough preparation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="page-section">
        <div className="container-main">
          <div className="section-heading">
            <span className="section-tag">Best Law Books</span>
            <h2 className="heading-2">Study Materials & Notes</h2>
            <p className="body-lg max-w-2xl">
              Enhance your legal knowledge with our specifically designed study guides and law books.
            </p>
          </div>
          
          <BookGrid 
            books={featuredBooks} 
            isLoading={booksLoading} 
          />

          <div className="mt-12 text-center">
            <Link to="/books">
              <Button variant="ghost" className="gap-2 group">
                Browse all books
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
