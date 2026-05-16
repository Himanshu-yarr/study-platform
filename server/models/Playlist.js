import mongoose from 'mongoose'

const playlistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  playlistId: {
    type: String,
    required: [true, 'Please add the YouTube Playlist ID or URL'],
    trim: true
  },
  thumbnail: {
    type: String,
    default: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Judiciary', 'LLB', 'General Law', 'Mock Tests', 'Exam Tips'],
    default: 'General Law'
  },
  videoCount: {
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

export default mongoose.model('Playlist', playlistSchema)
