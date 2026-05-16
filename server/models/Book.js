import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true, maxlength: 200 },
  author:      { type: String, required: true, trim: true, maxlength: 100 },
  description: { type: String, required: true, maxlength: 2000 },
  coverUrl:    { type: String, default: '' },
  coverPublicId: { type: String, default: '' },
  pdfUrl:      { type: String, default: '' },
  pdfPublicId: { type: String, default: '' },
  category:    { type: String, required: true, trim: true },
  price:       { type: Number, default: 0 },
  isDigitalAvailable: { type: Boolean, default: true },
  isPhysicalAvailable: { type: Boolean, default: false },
  physicalPrice: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: false },
  createdBy:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true })

bookSchema.index({ title: 'text', author: 'text' })
bookSchema.index({ category: 1, isPublished: 1 })

export default mongoose.model('Book', bookSchema)
