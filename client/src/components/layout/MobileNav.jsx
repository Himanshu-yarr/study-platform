import { Link, useLocation } from 'react-router-dom'
import { Home, BookOpen, Book, Play, LayoutDashboard } from 'lucide-react'
import { cn } from '../../lib/cn'

const MobileNav = () => {
  const location = useLocation()
  
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Courses', path: '/courses', icon: BookOpen },
    { name: 'Books', path: '/books', icon: Book },
    { name: 'Series', path: '/series', icon: Play },
    { name: 'Profile', path: '/dashboard', icon: LayoutDashboard },
  ]

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 pb-safe shadow-[0_-1px_10px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const ActiveIcon = item.icon
          const active = isActive(item.path)
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "relative flex flex-col items-center justify-center w-full h-full gap-1 transition-all duration-300",
                active ? "text-brand-600 scale-110" : "text-gray-400 dark:text-gray-500 hover:text-gray-600"
              )}
            >
              <div className={cn(
                "p-1.5 rounded-xl transition-all duration-300",
                active ? "bg-brand-50 dark:bg-brand-900/20 shadow-sm" : "bg-transparent"
              )}>
                <ActiveIcon size={20} className={cn(active && "stroke-[2.5px]")} />
              </div>
              <span className={cn(
                "text-[9px] font-bold tracking-tight uppercase",
                active ? "opacity-100" : "opacity-60"
              )}>
                {item.name}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default MobileNav
