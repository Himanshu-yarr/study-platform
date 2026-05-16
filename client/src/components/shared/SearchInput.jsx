import { useState, useCallback, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '../../lib/cn'

const SearchInput = ({ value, onChange, placeholder = 'Search...', className }) => {
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const debouncedChange = useCallback(
    (val) => {
      const handler = setTimeout(() => {
        onChange(val)
      }, 300)
      return () => clearTimeout(handler)
    },
    [onChange]
  )

  const handleInputChange = (e) => {
    const val = e.target.value
    setLocalValue(val)
    debouncedChange(val)
  }

  const handleClear = () => {
    setLocalValue('')
    onChange('')
  }

  return (
    <div className={cn('relative group', className)}>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-500 transition-colors">
        <Search size={18} />
      </div>
      
      <input
        type="text"
        value={localValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full h-10 pl-10 pr-10 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-input text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
      />
      
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-0.5 rounded-full"
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}

export default SearchInput
