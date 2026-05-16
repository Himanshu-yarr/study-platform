import { PlayCircle, ListVideo, ExternalLink } from 'lucide-react'
import { Badge } from '../ui/Badge'

const PlaylistCard = ({ playlist }) => {
  // Helper to extract playlist URL
  const getPlaylistUrl = (id) => {
    if (id.includes('youtube.com')) return id
    return `https://www.youtube.com/playlist?list=${id}`
  }

  return (
    <div className="group bg-white dark:bg-gray-900 rounded-card border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={playlist.thumbnail} 
          alt={playlist.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <a 
            href={getPlaylistUrl(playlist.playlistId)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-600 scale-75 group-hover:scale-100 transition-transform duration-300"
          >
            <PlayCircle size={28} fill="currentColor" className="text-brand-600 fill-white" />
          </a>
        </div>
        
        <div className="absolute top-3 left-3">
          <Badge variant="brand" className="backdrop-blur-md bg-brand-600/80 border-none">
            {playlist.category}
          </Badge>
        </div>
        
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/70 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
          <ListVideo size={12} />
          {playlist.videoCount}+ Videos
        </div>
      </div>
      
      <div className="p-5 space-y-3">
        <h3 className="font-bold text-lg dark:text-white line-clamp-1 group-hover:text-brand-600 transition-colors">
          {playlist.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
          {playlist.description}
        </p>
        
        <div className="pt-2 border-t border-gray-50 dark:border-gray-800">
          <a 
            href={getPlaylistUrl(playlist.playlistId)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between text-xs font-bold text-brand-600 uppercase tracking-widest hover:underline"
          >
            View Full Series
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default PlaylistCard
