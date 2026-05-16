import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, BookOpen, GraduationCap, LayoutDashboard, LogOut } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { ThemeToggle } from '../ui/ThemeToggle'
import { cn } from '../../lib/cn'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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
    <nav className="sticky top-0 z-50 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="container-main h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
            <GraduationCap size={20} />
          </div>
          <span className="font-bold text-sm sm:text-base md:text-lg tracking-tight dark:text-white whitespace-nowrap">STUDY GO with ZEENAT</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
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

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          <div className="hidden md:flex items-center gap-3 ml-2">
            {user ? (
              <div className="flex items-center gap-3">
                {user.role === 'admin' && (
                  <Link to="/admin" className="btn-sm btn-ghost gap-2">
                    <LayoutDashboard size={16} />
                    Admin
                  </Link>
                )}
                <Link to="/dashboard" className="h-8 w-8 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-brand-50 text-brand-700 font-bold text-xs uppercase">
                      {user.name.charAt(0)}
                    </div>
                  )}
                </Link>
                <button onClick={logout} className="p-2 text-gray-500 hover:text-red-500 transition-colors">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-md btn-primary">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 text-gray-600 dark:text-gray-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            <div className="container-main py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    'h-12 flex items-center px-4 rounded-lg text-base font-medium',
                    isActive(link.path) ? 'bg-brand-50 text-brand-600 dark:bg-brand-900/20' : 'text-gray-600 dark:text-gray-400'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <hr className="my-2 border-gray-100 dark:border-gray-800" />
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="h-12 flex items-center px-4 rounded-lg text-base font-medium text-gray-600 dark:text-gray-400"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => { logout(); setIsMenuOpen(false); }}
                    className="h-12 flex items-center px-4 rounded-lg text-base font-medium text-red-600"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="h-12 flex items-center px-4 rounded-lg text-base font-medium bg-brand-600 text-white justify-center"
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
