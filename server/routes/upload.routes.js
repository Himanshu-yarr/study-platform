import express from 'express'
import { protect, adminOnly } from '../middleware/auth.middleware.js'
import { uploadImage, uploadPdf } from '../config/cloudinary.js'

const router = express.Router()

// @route   POST /api/upload/image
// @desc    Upload an image (thumbnail/cover) to Cloudinary
// @access  Private/Admin
router.post('/image', protect, adminOnly, uploadImage, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image uploaded' })
  }
  res.json({
    url: req.file.path,
    public_id: req.file.filename
  })
})

// @route   POST /api/upload/pdf
// @desc    Upload a PDF to Cloudinary
// @access  Private/Admin
router.post('/pdf', protect, adminOnly, uploadPdf, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No PDF uploaded' })
  }
  res.json({
    url: req.file.path,
    public_id: req.file.filename
  })
})

export default router
