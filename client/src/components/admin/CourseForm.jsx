import { useState, useEffect } from 'react'
import { Play, Link as LinkIcon, FileText, Tag, CheckCircle2 } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import ImageUploader from '../shared/ImageUploader'
import { cn } from '../../lib/cn'

const CourseForm = ({ isOpen, onClose, onSubmit, initialData, isLoading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    youtubeUrl: '',
    thumbnailUrl: '',
    thumbnailPublicId: '',
    category: '',
    isPublished: false
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        youtubeUrl: initialData.youtubeUrl || '',
        thumbnailUrl: initialData.thumbnailUrl || '',
        thumbnailPublicId: initialData.thumbnailPublicId || '',
        category: initialData.category || '',
        isPublished: initialData.isPublished || false
      })
    } else {
      setFormData({
        title: '',
        description: '',
        youtubeUrl: '',
        thumbnailUrl: '',
        thumbnailPublicId: '',
        category: '',
        isPublished: false
      })
    }
  }, [initialData, isOpen])

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target
    setFormData(prev => ({ 
      ...prev, 
      [id]: type === 'checkbox' ? checked : value 
    }))
  }

  const handleImageChange = ({ url, publicId }) => {
    setFormData(prev => ({ 
      ...prev, 
      thumbnailUrl: url, 
      thumbnailPublicId: publicId 
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const getYoutubeId = (url) => {
    if (!url) return null
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  const youtubeId = getYoutubeId(formData.youtubeUrl)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Course' : 'Create New Course'}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="label">Course Thumbnail</label>
          <ImageUploader 
            value={{ url: formData.thumbnailUrl, publicId: formData.thumbnailPublicId }}
            onChange={handleImageChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="title"
            label="Course Title"
            placeholder="e.g. Master React in 30 Days"
            value={formData.title}
            onChange={handleChange}
            required
            leftIcon={<FileText size={18} />}
          />
          
          <Input
            id="category"
            label="Category"
            placeholder="e.g. Development"
            value={formData.category}
            onChange={handleChange}
            required
            leftIcon={<Tag size={18} />}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="description" className="label">Description</label>
          <textarea
            id="description"
            rows={4}
            className="textarea"
            placeholder="Tell students what they will learn..."
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-4">
          <Input
            id="youtubeUrl"
            label="YouTube Video URL"
            placeholder="https://www.youtube.com/watch?v=..."
            value={formData.youtubeUrl}
            onChange={handleChange}
            required
            leftIcon={<Play size={18} />}
          />

          {youtubeId && (
            <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
                className="w-full h-full"
                title="Preview"
              />
              <div className="absolute top-2 left-2 px-2 py-1 bg-green-600 text-white text-[10px] font-bold rounded uppercase flex items-center gap-1 shadow-lg">
                <CheckCircle2 size={10} />
                Preview detected
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800">
          <div className="space-y-0.5">
            <p className="text-sm font-semibold dark:text-white">Publish Course</p>
            <p className="text-xs text-gray-500">Make this course visible to all students</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              id="isPublished"
              type="checkbox" 
              className="sr-only peer"
              checked={formData.isPublished}
              onChange={handleChange}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 dark:peer-focus:ring-brand-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand-600"></div>
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
          <Button variant="secondary" type="button" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading} className="px-8">
            {initialData ? 'Update Course' : 'Create Course'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default CourseForm
