import express from 'express'
import Course from '../models/Course.js'
import { protect, adminOnly } from '../middleware/auth.middleware.js'

const router = express.Router()

// @route   GET /api/courses
// @desc    Get published courses (with optional category and search filters)
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const { search } = req.query
    const query = { isPublished: true }

    if (search) {
      query.title = { $regex: search, $options: 'i' }
    }

    const courses = await Course.find(query)
      .populate('createdBy', 'name avatar')
      .sort({ createdAt: -1 })

    res.json(courses)
  } catch (error) {
    next(error)
  }
})

// @route   GET /api/courses/admin
// @desc    Get all courses (including unpublished)
// @access  Private/Admin
router.get('/admin', protect, adminOnly, async (req, res, next) => {
  try {
    const courses = await Course.find({})
      .populate('createdBy', 'name avatar')
      .sort({ createdAt: -1 })
    res.json(courses)
  } catch (error) {
    next(error)
  }
})

// @route   GET /api/courses/:id
// @desc    Get course by ID
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate('createdBy', 'name avatar')
    if (course) {
      // If not published, only admin or creator can view it
      if (!course.isPublished && (!req.user || req.user.role !== 'admin')) {
        res.status(403)
        throw new Error('Course is not published')
      }
      res.json(course)
    } else {
      res.status(404)
      throw new Error('Course not found')
    }
  } catch (error) {
    next(error)
  }
})

// @route   POST /api/courses
// @desc    Create a course
// @access  Private/Admin
router.post('/', protect, adminOnly, async (req, res, next) => {
  try {
    const { title, description, youtubeUrl, thumbnailUrl, thumbnailPublicId, category, isPublished } = req.body

    const course = new Course({
      title,
      description,
      youtubeUrl,
      thumbnailUrl,
      thumbnailPublicId,
      category,
      isPublished: isPublished || false,
      createdBy: req.user._id
    })

    const createdCourse = await course.save()
    res.status(201).json(createdCourse)
  } catch (error) {
    next(error)
  }
})

// @route   PUT /api/courses/:id
// @desc    Update a course
// @access  Private/Admin
router.put('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)

    if (course) {
      course.title = req.body.title || course.title
      course.description = req.body.description || course.description
      course.youtubeUrl = req.body.youtubeUrl || course.youtubeUrl
      course.thumbnailUrl = req.body.thumbnailUrl !== undefined ? req.body.thumbnailUrl : course.thumbnailUrl
      course.thumbnailPublicId = req.body.thumbnailPublicId !== undefined ? req.body.thumbnailPublicId : course.thumbnailPublicId
      course.category = req.body.category || course.category
      course.isPublished = req.body.isPublished !== undefined ? req.body.isPublished : course.isPublished

      const updatedCourse = await course.save()
      res.json(updatedCourse)
    } else {
      res.status(404)
      throw new Error('Course not found')
    }
  } catch (error) {
    next(error)
  }
})

// @route   DELETE /api/courses/:id
// @desc    Delete a course
// @access  Private/Admin
router.delete('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id)
    if (course) {
      res.json({ message: 'Course removed' })
    } else {
      res.status(404)
      throw new Error('Course not found')
    }
  } catch (error) {
    next(error)
  }
})

export default router
