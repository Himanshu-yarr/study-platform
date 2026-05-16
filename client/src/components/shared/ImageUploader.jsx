import { useRef } from 'react'
import { Upload, X, ImageIcon } from 'lucide-react'
import { useUploadFile } from '../../hooks/useUpload'
import { Spinner } from '../ui/Spinner'
import { cn } from '../../lib/cn'

const ImageUploader = ({ value, onChange, className }) => {
  const fileInputRef = useRef(null)
  const { mutate: upload, isPending } = useUploadFile()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    upload(
      { file, type: 'image' },
      {
        onSuccess: (data) => {
          onChange({
            url: data.url,
            publicId: data.public_id
          })
        }
      }
    )
  }

  const handleRemove = (e) => {
    e.stopPropagation()
    onChange({ url: '', publicId: '' })
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div 
      onClick={() => !isPending && fileInputRef.current?.click()}
      className={cn(
        'group relative w-full aspect-card-img rounded-card border-2 border-dashed transition-all cursor-pointer overflow-hidden flex flex-col items-center justify-center gap-2',
        value?.url 
          ? 'border-transparent' 
          : 'border-gray-300 dark:border-gray-700 hover:border-brand-500 bg-gray-50 dark:bg-gray-900/50',
        className
      )}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />

      {isPending ? (
        <div className="flex flex-col items-center gap-2">
          <Spinner className="w-8 h-8 text-brand-600" />
          <span className="text-sm text-gray-500">Uploading...</span>
        </div>
      ) : value?.url ? (
        <>
          <img 
            src={value.url} 
            alt="Upload preview" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
            <button
              onClick={handleRemove}
              className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg"
            >
              <X size={20} />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-sm text-gray-400 group-hover:text-brand-500 transition-colors">
            <Upload size={24} />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Click to upload thumbnail
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG or WebP (max 5MB)
            </p>
          </div>
        </>
      )}
    </div>
  )
}

export default ImageUploader
