import { Link, useLocation } from 'react-router-dom'
import { GraduationCap, LayoutDashboard, LogOut } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { ThemeToggle } from '../ui/ThemeToggle'
import { cn } from '../../lib/cn'

const Navbar = () => {
  const { user, logout } = useAuth()
  const location = useLocation()

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'Books', path: '/books' },
    { name: 'Series', path: '/series' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="sticky top-0 z-50 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 flex items-center">
      <div className="container-main w-full h-full flex flex-row flex-nowrap items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-brand-600 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-brand-500/20">
            <GraduationCap className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
          </div>
          <span className="font-bold text-sm sm:text-base md:text-lg tracking-tight dark:text-white whitespace-nowrap">STUDY GO</span>
        </Link>

        {/* Desktop Nav (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-6 flex-shrink-0">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'relative text-sm font-medium transition-colors py-1',
                isActive(link.path) ? 'text-brand-600' : 'text-gray-600 dark:text-gray-400 hover:text-brand-500'
              )}
            >
              {link.name}
              {isActive(link.path) && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-600 rounded-full"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-row flex-nowrap items-center gap-1 sm:gap-3 flex-shrink-0">
          <ThemeToggle />
          
          {user ? (
            <div className="flex flex-row flex-nowrap items-center gap-1 sm:gap-3 flex-shrink-0">
              {user.role === 'admin' && (
                <Link 
                  to="/admin" 
                  className="p-1.5 sm:p-2 text-gray-500 hover:text-brand-600 transition-colors"
                  title="Admin Panel"
                >
                  <LayoutDashboard className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
                </Link>
              )}
              
              <Link to="/dashboard" className="h-8 w-8 sm:h-9 sm:w-9 rounded-full overflow-hidden border-2 border-transparent hover:border-brand-500 transition-all p-0.5 shadow-sm flex-shrink-0">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-brand-100 text-brand-700 font-bold text-xs uppercase rounded-full">
                    {user.name.charAt(0)}
                  </div>
                )}
              </Link>

              <button 
                onClick={logout}
                className="p-1.5 sm:p-2 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                title="Sign Out"
              >
                <LogOut className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-sm btn-primary rounded-full px-3 sm:px-4 text-[10px] sm:text-xs font-bold shadow-md shadow-brand-500/10 flex-shrink-0">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
