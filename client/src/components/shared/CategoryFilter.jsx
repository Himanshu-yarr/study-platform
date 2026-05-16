import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'

const categories = ['All', 'Development', 'Design', 'Business', 'Marketing', 'Photography']

const CategoryFilter = ({ activeCategory = 'All', onCategoryChange }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
      {categories.map((category) => {
        const isActive = activeCategory === category
        
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={cn(
              'relative h-9 px-4 rounded-full text-sm font-medium transition-colors whitespace-nowrap',
              isActive 
                ? 'text-white' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            )}
          >
            {isActive && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-brand-600 rounded-full"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </button>
        )
      })}
    </div>
  )
}

export default CategoryFilter
