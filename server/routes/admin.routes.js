import express from 'express'
import { protect, adminOnly } from '../middleware/auth.middleware.js'
import User from '../models/User.js'
import Course from '../models/Course.js'
import Book from '../models/Book.js'

const router = express.Router()

// @route   GET /api/admin/stats
// @desc    Get platform statistics
// @access  Private/Admin
router.get('/stats', protect, adminOnly, async (req, res, next) => {
  try {
    const [totalStudents, totalCourses, totalBooks] = await Promise.all([
      User.countDocuments({ role: 'student' }),
      Course.countDocuments(),
      Book.countDocuments(),
    ])

    // Mock active learners for now (could be based on recent logins)
    const activeLearners = Math.floor(totalStudents * 0.4)

    res.json({
      totalStudents,
      totalCourses,
      totalBooks,
      activeLearners,
    })
  } catch (error) {
    next(error)
  }
})

// @route   GET /api/admin/activity
// @desc    Get recent platform activity
// @access  Private/Admin
router.get('/activity', protect, adminOnly, async (req, res, next) => {
  try {
    const recentUsers = await User.find({ role: 'student' })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name createdAt')

    const activity = recentUsers.map(user => ({
      type: 'new_student',
      message: `${user.name} joined the platform`,
      timestamp: user.createdAt
    }))

    res.json(activity)
  } catch (error) {
    next(error)
  }
})

export default router
