import { useState } from 'react'
import { Modal } from '../ui/Modal'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'

const NoticeForm = ({ isOpen, onClose, onSubmit, initialData, isLoading }) => {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    content: '',
    type: 'info',
    link: '',
    isActive: true
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Edit Notice" : "Post New Notice"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Notice Title"
          placeholder="e.g. Live Class Tonight!"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Notice Content</label>
          <textarea
            className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-brand-500 transition-all outline-none"
            rows="3"
            placeholder="Describe the notice details here..."
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Type</label>
            <select
              className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-brand-500 transition-all outline-none"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="info">Information</option>
              <option value="warning">Important</option>
              <option value="urgent">Urgent</option>
              <option value="success">Update</option>
            </select>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Status</label>
            <select
              className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-brand-500 transition-all outline-none"
              value={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
            >
              <option value="true">Active (Visible)</option>
              <option value="false">Inactive (Hidden)</option>
            </select>
          </div>
        </div>

        <Input
          label="External Link (Optional)"
          placeholder="https://zoom.us/j/..."
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
        />

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="ghost" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" variant="brand" className="flex-1" isLoading={isLoading}>
            {initialData ? "Update Notice" : "Post Notice"}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default NoticeForm
