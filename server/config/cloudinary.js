import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Image storage (thumbnails, book covers)
const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder:         'study-platform-media/images',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 800, height: 450, crop: 'fill', quality: 'auto' }],
  },
})

// PDF storage
const pdfStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder:           'study-platform-media/pdfs',
    allowed_formats:  ['pdf'],
    resource_type:    'image',
  },
})

export const uploadImage = multer({
  storage: imageStorage,
  limits:  { fileSize: 5 * 1024 * 1024 }, // 5MB
}).single('image')

export const uploadPdf = multer({
  storage: pdfStorage,
  limits:  { fileSize: 50 * 1024 * 1024 }, // 50MB
}).single('pdf')

export { cloudinary }
