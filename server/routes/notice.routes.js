import express from 'express'
import Notice from '../models/Notice.js'
import { protect, adminOnly } from '../middleware/auth.middleware.js'

const router = express.Router()

// @route   GET /api/notices
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const notices = await Notice.find({ isActive: true }).sort('-createdAt')
    res.json(notices)
  } catch (error) {
    next(error)
  }
})

// @route   POST /api/notices
// @access  Private/Admin
router.post('/', protect, adminOnly, async (req, res, next) => {
  try {
    const notice = await Notice.create({
      ...req.body,
      createdBy: req.user._id
    })
    res.status(201).json(notice)
  } catch (error) {
    next(error)
  }
})

// @route   PUT /api/notices/:id
// @access  Private/Admin
router.put('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const notice = await Notice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    if (!notice) {
      res.status(404)
      throw new Error('Notice not found')
    }
    res.json(notice)
  } catch (error) {
    next(error)
  }
})

// @route   DELETE /api/notices/:id
// @access  Private/Admin
router.delete('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const notice = await Notice.findById(req.params.id)
    if (!notice) {
      res.status(404)
      throw new Error('Notice not found')
    }
    await notice.deleteOne()
    res.json({ message: 'Notice removed' })
  } catch (error) {
    next(error)
  }
})

export default router
