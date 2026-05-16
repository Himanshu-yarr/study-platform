import { AlertCircle, RefreshCw, Home } from 'lucide-react'
import { Button } from '../components/ui/Button'

const ErrorPage = ({ error, reset }) => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center text-red-600 mb-6">
        <AlertCircle size={48} />
      </div>
      
      <div className="space-y-2 mb-10">
        <h1 className="heading-2 dark:text-white">Something went wrong</h1>
        <p className="body-lg max-w-md mx-auto text-gray-500">
          An unexpected error occurred while processing your request. Our team has been notified.
        </p>
        
        {process.env.NODE_ENV === 'development' && error && (
          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-left overflow-x-auto max-w-2xl mx-auto">
            <p className="text-xs font-mono text-red-600 dark:text-red-400 break-all whitespace-pre-wrap">
              {error.toString()}
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        {reset && (
          <Button onClick={reset} size="lg" className="gap-2">
            <RefreshCw size={18} />
            Try again
          </Button>
        )}
        <Button variant="secondary" onClick={() => window.location.href = '/'} size="lg" className="gap-2">
          <Home size={18} />
          Go home
        </Button>
      </div>
    </div>
  )
}

export default ErrorPage
