import React from 'react'
import { cn } from '../../lib/cn'

export const Input = React.forwardRef(({ 
  label, 
  error, 
  helperText, 
  leftIcon, 
  rightIcon, 
  className, 
  id, 
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="label">
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        
        <input
          id={id}
          ref={ref}
          className={cn(
            'input',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            error && 'input-error',
            className
          )}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>

      <div className="min-h-[20px]">
        {error ? (
          <p className="field-error">{error}</p>
        ) : helperText ? (
          <p className="body-sm mt-1">{helperText}</p>
        ) : null}
      </div>
    </div>
  )
})

Input.displayName = 'Input'
