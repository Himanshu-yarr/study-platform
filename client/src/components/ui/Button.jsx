import React from 'react'
import { cn } from '../../lib/cn'
import { Spinner } from './Spinner'

export const Button = React.forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false, 
  leftIcon, 
  rightIcon, 
  children, 
  disabled, 
  ...props 
}, ref) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    danger: 'btn-danger'
  }

  const sizes = {
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg'
  }

  return (
    <button
      ref={ref}
      disabled={isLoading || disabled}
      className={cn(
        'btn',
        variants[variant],
        sizes[size],
        isLoading && 'relative !text-transparent transition-none hover:!text-transparent',
        className
      )}
      {...props}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner className="w-4 h-4" />
        </div>
      )}
      
      {!isLoading && leftIcon && <span className="inline-flex">{leftIcon}</span>}
      {!isLoading && children}
      {!isLoading && rightIcon && <span className="inline-flex">{rightIcon}</span>}
    </button>
  )
})

Button.displayName = 'Button'
