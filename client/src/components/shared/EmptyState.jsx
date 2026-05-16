import { Button } from '../ui/Button'
import { cn } from '../../lib/cn'

const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  action, 
  className 
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-4 py-16 px-6 text-center', className)}>
      {Icon && (
        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-full text-gray-400">
          <Icon size={48} strokeWidth={1.5} />
        </div>
      )}
      
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
          {description}
        </p>
      </div>

      {action && (
        <button
          onClick={action.onClick}
          className="btn-md btn-primary mt-2"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}

export default EmptyState
