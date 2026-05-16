import { Link } from 'react-router-dom'
import { GraduationCap, Globe, Users, MessageSquare } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 pt-16 pb-8">
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1 space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white">
                <GraduationCap size={20} />
              </div>
              <span className="font-bold text-lg tracking-tight dark:text-white">STUDY GO with ZEENAT</span>
            </Link>
            <p className="body-sm leading-relaxed">
              Leading preparation platform for Judiciary, LLB, and Legal competitive exams. Quality education for aspiring legal professionals.
            </p>
            <div className="flex items-center gap-4 text-gray-400">
              <Globe size={20} className="hover:text-brand-600 cursor-pointer" />
              <MessageSquare size={20} className="hover:text-brand-600 cursor-pointer" />
              <Users size={20} className="hover:text-brand-600 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-semibold text-sm uppercase tracking-wider">Resources</h4>
            <ul className="space-y-4">
              <li><Link to="/courses" className="body-sm hover:text-brand-600 transition-colors">Video Lectures</Link></li>
              <li><Link to="/books" className="body-sm hover:text-brand-600 transition-colors">Law Books & Notes</Link></li>
              <li><Link to="/dashboard" className="body-sm hover:text-brand-600 transition-colors">Student Dashboard</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <h4 className="font-semibold text-sm uppercase tracking-wider">Specialization</h4>
            <ul className="space-y-4">
              <li><Link to="/courses?category=Judiciary" className="body-sm hover:text-brand-600 transition-colors">Judiciary Prep</Link></li>
              <li><Link to="/courses?category=LLB" className="body-sm hover:text-brand-600 transition-colors">LLB Subjects</Link></li>
              <li><Link to="/courses?category=General%20Law" className="body-sm hover:text-brand-600 transition-colors">General Law</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="font-semibold text-sm uppercase tracking-wider">Exam Notifications</h4>
            <div className="space-y-4">
              <p className="body-sm">Get the latest Judiciary exam dates and legal news.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="input h-10 min-w-0"
                />
                <button className="btn-md btn-primary px-4">Join</button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2026 STUDY GO with ZEENAT. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-800">Privacy Policy</a>
            <a href="#" className="hover:text-gray-800">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
