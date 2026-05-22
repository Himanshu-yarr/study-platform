import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  BookOpen, 
  BookMarked, 
  ExternalLink, 
  LogOut,
  GraduationCap,
  Megaphone,
  ListVideo
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Badge } from '../ui/Badge'
import { cn } from '../../lib/cn'

const AdminSidebar = ({ isOpen, onClose }) => {
  const location = useLocation()
  const { logout } = useAuth()

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Courses', path: '/admin/courses', icon: BookOpen },
    { name: 'Books', path: '/admin/books', icon: BookMarked },
    { name: 'Notice Board', path: '/admin/notices', icon: Megaphone },
    { name: 'Playlists', path: '/admin/playlists', icon: ListVideo },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <aside className={cn(
      "fixed top-0 h-screen w-sidebar-w bg-gray-900 text-white pt-6 flex flex-col z-[60] transition-all duration-300 lg:left-0",
      isOpen ? "left-0" : "-left-full"
    )}>
      {/* Logo */}
      <div className="px-6 mb-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white">
            <GraduationCap size={20} />
          </div>
          <span className="font-bold text-sm tracking-tight">STUDY GO</span>
        </Link>
        <Badge variant="brand" className="bg-brand-500/20 text-brand-400 border-none px-1.5">
          Admin
        </Badge>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={onClose}
            className={cn(
              'flex items-center gap-3 h-10 px-4 rounded-lg text-sm font-medium transition-all',
              isActive(item.path) 
                ? 'bg-white/10 text-white' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            )}
          >
            <item.icon size={20} />
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 space-y-1 border-t border-white/5">
        <Link
          to="/"
          className="flex items-center gap-3 h-10 px-4 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-all"
        >
          <ExternalLink size={20} />
          Back to site
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 h-10 px-4 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-red-400 transition-all"
        >
          <LogOut size={20} />
          Sign out
        </button>
      </div>
    </aside>
  )
}

export default AdminSidebar
