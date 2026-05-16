import express from 'express'
import Playlist from '../models/Playlist.js'
import { protect, adminOnly } from '../middleware/auth.middleware.js'

const router = express.Router()

// @route   GET /api/playlists
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const { search } = req.query
    const query = { isPublished: true }
    
    if (search) {
      query.title = { $regex: search, $options: 'i' }
    }

    const playlists = await Playlist.find(query).sort('-createdAt')
    res.json(playlists)
  } catch (error) {
    next(error)
  }
})

// @route   POST /api/playlists
// @access  Private/Admin
router.post('/', protect, adminOnly, async (req, res, next) => {
  try {
    const playlist = await Playlist.create(req.body)
    res.status(201).json(playlist)
  } catch (error) {
    next(error)
  }
})

// @route   PUT /api/playlists/:id
// @access  Private/Admin
router.put('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const playlist = await Playlist.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    if (!playlist) {
      res.status(404)
      throw new Error('Playlist not found')
    }
    res.json(playlist)
  } catch (error) {
    next(error)
  }
})

// @route   DELETE /api/playlists/:id
// @access  Private/Admin
router.delete('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const playlist = await Playlist.findById(req.params.id)
    if (!playlist) {
      res.status(404)
      throw new Error('Playlist not found')
    }
    await playlist.deleteOne()
    res.json({ message: 'Playlist removed' })
  } catch (error) {
    next(error)
  }
})

export default router
