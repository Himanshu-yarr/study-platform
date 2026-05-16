import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'
import { Button } from '../components/ui/Button'

const NotFoundPage = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-8">
        <h1 className="text-[12rem] font-black text-gray-100 dark:text-gray-900 leading-none select-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold dark:text-white">Page not found</h2>
            <p className="text-gray-500 max-w-xs mx-auto">
              The page you're looking for doesn't exist or has been moved to another URL.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link to="/">
          <Button size="lg" className="gap-2">
            <Home size={18} />
            Go back home
          </Button>
        </Link>
        <button 
          onClick={() => window.history.back()}
          className="btn-lg btn-secondary gap-2"
        >
          <ArrowLeft size={18} />
          Previous page
        </button>
      </div>
    </div>
  )
}

export default NotFoundPage
