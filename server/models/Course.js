import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema({
  title:        { type: String, required: true, trim: true, maxlength: 200 },
  description:  { type: String, required: true, maxlength: 2000 },
  youtubeUrl:   { type: String, required: true },
  thumbnailUrl: { type: String, default: '' },
  thumbnailPublicId: { type: String, default: '' },
  category:     { type: String, required: true, trim: true },
  isPublished:  { type: Boolean, default: false },
  createdBy:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true })

courseSchema.index({ title: 'text', description: 'text' })
courseSchema.index({ category: 1, isPublished: 1 })

export default mongoose.model('Course', courseSchema)
