import { Megaphone, AlertTriangle, Info, Bell, ExternalLink } from 'lucide-react'
import { useNotices } from '../../hooks/useNotices'
import { cn } from '../../lib/cn'

const NoticeBoard = () => {
  const { data: notices = [], isLoading } = useNotices()

  if (isLoading || notices.length === 0) return null

  const getNoticeStyle = (type) => {
    switch (type) {
      case 'urgent':
        return 'bg-red-50 border-red-100 text-red-800 dark:bg-red-900/10 dark:border-red-900/30 dark:text-red-400'
      case 'warning':
        return 'bg-amber-50 border-amber-100 text-amber-800 dark:bg-amber-900/10 dark:border-amber-900/30 dark:text-amber-400'
      case 'success':
        return 'bg-green-50 border-green-100 text-green-800 dark:bg-green-900/10 dark:border-green-900/30 dark:text-green-400'
      default:
        return 'bg-brand-50 border-brand-100 text-brand-800 dark:bg-brand-900/10 dark:border-brand-900/30 dark:text-brand-400'
    }
  }

  const getNoticeIcon = (type) => {
    switch (type) {
      case 'urgent': return <AlertTriangle size={20} />
      case 'warning': return <Bell size={20} />
      case 'info': return <Info size={20} />
      default: return <Megaphone size={20} />
    }
  }

  return (
    <div className="container-main pt-6">
      <div className="space-y-4">
        {notices.map((notice) => (
          <div 
            key={notice._id}
            className={cn(
              "flex flex-col sm:flex-row items-start gap-4 p-4 rounded-2xl border transition-all animate-in fade-in slide-in-from-top-4 duration-500",
              getNoticeStyle(notice.type)
            )}
          >
            <div className="p-2 rounded-xl bg-white/50 dark:bg-black/20 flex-shrink-0">
              {getNoticeIcon(notice.type)}
            </div>
            
            <div className="flex-1 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-bold">{notice.title}</h4>
                <span className="text-[10px] uppercase tracking-widest opacity-60 font-bold">
                  {new Date(notice.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm leading-relaxed opacity-90">{notice.content}</p>
            </div>

            {notice.link && (
              <a 
                href={notice.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-sm bg-white/50 dark:bg-black/20 hover:bg-white/80 dark:hover:bg-black/40 border-none flex-shrink-0"
              >
                View Details
                <ExternalLink size={14} className="ml-2" />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default NoticeBoard
