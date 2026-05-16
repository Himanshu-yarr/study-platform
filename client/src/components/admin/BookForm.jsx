import { useState, useEffect, useRef } from 'react'
import { FileText, User, Tag, FileDown, CheckCircle2, X } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import ImageUploader from '../shared/ImageUploader'
import { useUploadFile } from '../../hooks/useUpload'
import { Spinner } from '../ui/Spinner'
import { cn } from '../../lib/cn'

const BookForm = ({ isOpen, onClose, onSubmit, initialData, isLoading }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    coverUrl: '',
    coverPublicId: '',
    pdfUrl: '',
    pdfPublicId: '',
    category: '',
    price: 0,
    isDigitalAvailable: true,
    isPhysicalAvailable: false,
    physicalPrice: 0,
    isPublished: false
  })

  const pdfInputRef = useRef(null)
  const { mutate: uploadPdf, isPending: isUploadingPdf } = useUploadFile()

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        author: initialData.author || '',
        description: initialData.description || '',
        coverUrl: initialData.coverUrl || '',
        coverPublicId: initialData.coverPublicId || '',
        pdfUrl: initialData.pdfUrl || '',
        pdfPublicId: initialData.pdfPublicId || '',
        category: initialData.category || '',
        price: initialData.price || 0,
        isDigitalAvailable: initialData.isDigitalAvailable !== undefined ? initialData.isDigitalAvailable : true,
        isPhysicalAvailable: initialData.isPhysicalAvailable || false,
        physicalPrice: initialData.physicalPrice || 0,
        isPublished: initialData.isPublished || false
      })
    } else {
      setFormData({
        title: '',
        author: '',
        description: '',
        coverUrl: '',
        coverPublicId: '',
        pdfUrl: '',
        pdfPublicId: '',
        category: '',
        price: 0,
        isDigitalAvailable: true,
        isPhysicalAvailable: false,
        physicalPrice: 0,
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
      coverUrl: url, 
      coverPublicId: publicId 
    }))
  }

  const handlePdfUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    uploadPdf(
      { file, type: 'pdf' },
      {
        onSuccess: (data) => {
          setFormData(prev => ({
            ...prev,
            pdfUrl: data.url,
            pdfPublicId: data.public_id
          }))
        }
      }
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Book' : 'Add New Book'}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cover Left */}
          <div className="md:col-span-1 space-y-2">
            <label className="label">Book Cover</label>
            <ImageUploader 
              value={{ url: formData.coverUrl, publicId: formData.coverPublicId }}
              onChange={handleImageChange}
              className="aspect-book h-full"
            />
          </div>

          {/* Fields Right */}
          <div className="md:col-span-2 space-y-4">
            <Input
              id="title"
              label="Book Title"
              placeholder="e.g. Clean Code"
              value={formData.title}
              onChange={handleChange}
              required
              leftIcon={<FileText size={18} />}
            />
            
            <Input
              id="author"
              label="Author Name"
              placeholder="e.g. Robert C. Martin"
              value={formData.author}
              onChange={handleChange}
              required
              leftIcon={<User size={18} />}
            />

            <Input
              id="category"
              label="Category"
              placeholder="e.g. Computer Science"
              value={formData.category}
              onChange={handleChange}
              required
              leftIcon={<Tag size={18} />}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="description" className="label">Description</label>
          <textarea
            id="description"
            rows={4}
            className="textarea"
            placeholder="What is this book about?"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Monetization */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-4 bg-brand-600 rounded-full" />
                Digital PDF (Download)
              </h4>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  id="isDigitalAvailable"
                  type="checkbox" 
                  className="sr-only peer"
                  checked={formData.isDigitalAvailable}
                  onChange={handleChange}
                />
                <div className="w-9 h-5 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-600"></div>
              </label>
            </div>
            
            {formData.isDigitalAvailable && (
              <Input
                id="price"
                label="PDF Price (₹)"
                type="number"
                placeholder="0 for FREE"
                value={formData.price}
                onChange={handleChange}
                min="0"
              />
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-4 bg-orange-600 rounded-full" />
                Physical Copy
              </h4>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  id="isPhysicalAvailable"
                  type="checkbox" 
                  className="sr-only peer"
                  checked={formData.isPhysicalAvailable}
                  onChange={handleChange}
                />
                <div className="w-9 h-5 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-600"></div>
              </label>
            </div>
            
            {formData.isPhysicalAvailable && (
              <Input
                id="physicalPrice"
                label="Physical Copy Price (₹)"
                type="number"
                placeholder="Enter price"
                value={formData.physicalPrice}
                onChange={handleChange}
                min="1"
              />
            )}
          </div>
        </div>

        {/* PDF Upload */}
        <div className="space-y-2">
          <label className="label">PDF Document</label>
          <div 
            onClick={() => !isUploadingPdf && pdfInputRef.current?.click()}
            className={cn(
              "flex items-center gap-4 p-4 rounded-lg border-2 border-dashed transition-all cursor-pointer",
              formData.pdfUrl 
                ? "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/30" 
                : "bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700 hover:border-brand-500"
            )}
          >
            <input 
              type="file" 
              ref={pdfInputRef} 
              onChange={handlePdfUpload} 
              accept=".pdf" 
              className="hidden" 
            />
            
            <div className={cn(
              "w-12 h-12 rounded-lg flex items-center justify-center",
              formData.pdfUrl ? "bg-green-100 text-green-600" : "bg-white dark:bg-gray-800 text-gray-400 shadow-sm"
            )}>
              {isUploadingPdf ? <Spinner className="w-6 h-6" /> : <FileDown size={24} />}
            </div>

            <div className="flex-1 min-w-0">
              {formData.pdfUrl ? (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-green-700 dark:text-green-400">PDF Uploaded</p>
                    <p className="text-xs text-green-600 truncate max-w-[200px]">
                      {formData.pdfPublicId || 'Document attached'}
                    </p>
                  </div>
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setFormData(prev => ({ ...prev, pdfUrl: '', pdfPublicId: '' }))
                    }}
                    className="p-1 hover:bg-green-200 dark:hover:bg-green-900/50 rounded text-green-700"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-semibold dark:text-white">
                    {isUploadingPdf ? 'Uploading...' : 'Upload PDF File'}
                  </p>
                  <p className="text-xs text-gray-500">Maximum size 50MB</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800">
          <div className="space-y-0.5">
            <p className="text-sm font-semibold dark:text-white">Publish Book</p>
            <p className="text-xs text-gray-500">Make this book available for download</p>
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
          <Button variant="secondary" type="button" onClick={onClose} disabled={isLoading || isUploadingPdf}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading} disabled={isUploadingPdf} className="px-8">
            {initialData ? 'Update Book' : 'Add Book'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default BookForm
