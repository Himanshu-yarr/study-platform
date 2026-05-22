import { useState } from 'react'
import { Play, Plus, Edit, Trash2, ExternalLink } from 'lucide-react'
import { usePlaylists, useManagePlaylists } from '../../hooks/usePlaylists'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Spinner } from '../../components/ui/Spinner'
import PlaylistForm from '../../components/admin/PlaylistForm'

const AdminPlaylistsPage = () => {
  const { data: playlists = [], isLoading } = usePlaylists()
  const { createPlaylist, updatePlaylist, deletePlaylist } = useManagePlaylists()
  
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingPlaylist, setEditingPlaylist] = useState(null)

  const handleCreate = async (data) => {
    await createPlaylist.mutateAsync(data)
    setIsFormOpen(false)
  }

  const handleUpdate = async (data) => {
    await updatePlaylist.mutateAsync({ id: editingPlaylist._id, data })
    setEditingPlaylist(null)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this series?')) {
      deletePlaylist.mutate(id)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="heading-2 dark:text-white">Manage Curated Series</h1>
          <p className="body-sm">Curate YouTube playlists into structured series for students.</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="gap-2 sm:self-auto self-start">
          <Plus size={18} />
          Add Series
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20"><Spinner /></div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {playlists.map((playlist) => (
            <div 
              key={playlist._id}
              className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
                <div className="w-24 aspect-video rounded-lg overflow-hidden flex-shrink-0">
                  <img src={playlist.thumbnail} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h4 className="font-bold dark:text-white truncate">{playlist.title}</h4>
                    <Badge variant="brand" className="text-[10px]">{playlist.category}</Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Play size={12} />
                      {playlist.videoCount}+ Videos
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <a 
                      href={playlist.playlistId.includes('youtube') ? playlist.playlistId : `https://youtube.com/playlist?list=${playlist.playlistId}`} 
                      target="_blank" 
                      className="hover:text-brand-600 underline flex items-center gap-1"
                    >
                      Source <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:self-center self-end lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => setEditingPlaylist(playlist)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500 transition-colors"
                >
                  <Edit size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(playlist._id)}
                  className="p-2 hover:bg-red-50 text-gray-500 hover:text-red-600 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modals */}
      <PlaylistForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSubmit={handleCreate}
        isLoading={createPlaylist.isPending}
      />

      {editingPlaylist && (
        <PlaylistForm 
          isOpen={!!editingPlaylist} 
          onClose={() => setEditingPlaylist(null)} 
          onSubmit={handleUpdate}
          initialData={editingPlaylist}
          isLoading={updatePlaylist.isPending}
        />
      )}
    </div>
  )
}

export default AdminPlaylistsPage
