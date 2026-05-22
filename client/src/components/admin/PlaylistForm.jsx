import { useState } from 'react'
import { Modal } from '../ui/Modal'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import ImageUploader from '../shared/ImageUploader'

const PlaylistForm = ({ isOpen, onClose, onSubmit, initialData, isLoading }) => {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    description: '',
    playlistId: '',
    thumbnail: '',
    category: 'Judiciary',
    videoCount: 0,
    isPublished: true
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Edit Playlist" : "Add YouTube Playlist"}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Input
              label="Playlist Title"
              placeholder="e.g. Complete IPC Series"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Description</label>
              <textarea
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-brand-500 transition-all outline-none"
                rows="4"
                placeholder="What is this series about?"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-semibold">Thumbnail Image</label>
              <ImageUploader 
                value={{ url: formData.thumbnail }}
                onChange={(data) => setFormData({ ...formData, thumbnail: data.url })}
              />
            </div>
            
            <Input
              label="YouTube Playlist ID or URL"
              placeholder="PLxxxxxxxxxxxxxx"
              value={formData.playlistId}
              onChange={(e) => setFormData({ ...formData, playlistId: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold">Category</label>
            <select
              className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="Judiciary">Judiciary</option>
              <option value="LLB">LLB</option>
              <option value="General Law">General Law</option>
              <option value="Mock Tests">Mock Tests</option>
              <option value="Exam Tips">Exam Tips</option>
            </select>
          </div>
          <Input
            label="Approx. Video Count"
            type="number"
            value={formData.videoCount}
            onChange={(e) => setFormData({ ...formData, videoCount: parseInt(e.target.value) })}
          />
        </div>

        <div className="flex flex-wrap gap-3 pt-4 justify-center">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isLoading} className="flex-1 sm:flex-none w-full sm:w-auto">
            Cancel
          </Button>
          <Button type="submit" variant="brand" isLoading={isLoading} className="flex-1 sm:flex-none w-full sm:w-auto px-8">
            {initialData ? "Update Series" : "Add Series"}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default PlaylistForm
