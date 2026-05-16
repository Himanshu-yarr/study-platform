import { useState } from 'react'
import { X, Camera, Loader2 } from 'lucide-react'
import { Modal } from './Modal'
import { Input } from './Input'
import { Button } from './Button'
import { useAuth } from '../../context/AuthContext'
import { useUploadFile } from '../../hooks/useUpload'

export const ProfileModal = ({ isOpen, onClose }) => {
  const { user, updateProfile } = useAuth()
  const { mutateAsync: upload, isPending: isUploading } = useUploadFile()
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
    password: ''
  })
  const [isSaving, setIsSaving] = useState(false)

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    try {
      const data = await upload({ file, type: 'image' })
      setFormData(prev => ({ ...prev, avatar: data.url }))
    } catch (err) {
      console.error('Avatar upload failed:', err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      await updateProfile(formData)
      onClose()
    } catch (err) {
      console.error('Update failed:', err)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar Upload */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 border-2 border-brand-600/20">
              {formData.avatar ? (
                <img src={formData.avatar} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-gray-400">
                  {formData.name.charAt(0)}
                </div>
              )}
            </div>
            <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full">
              {isUploading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Camera size={24} />
              )}
              <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} disabled={isUploading} />
            </label>
          </div>
          <p className="text-xs text-gray-500">Click to change avatar</p>
        </div>

        <div className="space-y-4">
          <Input
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />
          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            required
          />
          <Input
            label="New Password (Leave blank to keep current)"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            placeholder="••••••••"
          />
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
          <Button 
            type="button" 
            variant="ghost" 
            className="flex-1" 
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="brand" 
            className="flex-1" 
            isLoading={isSaving}
            disabled={isUploading}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  )
}
