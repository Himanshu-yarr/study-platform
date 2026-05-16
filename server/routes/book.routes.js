import express from 'express'
import Book from '../models/Book.js'
import { protect, adminOnly } from '../middleware/auth.middleware.js'

const router = express.Router()

// @route   GET /api/books
// @desc    Get published books (with optional category and search filters)
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const { search } = req.query
    const query = { isPublished: true }

    if (search) {
      query.title = { $regex: search, $options: 'i' }
    }

    const books = await Book.find(query)
      .populate('createdBy', 'name avatar')
      .sort({ createdAt: -1 })

    res.json(books)
  } catch (error) {
    next(error)
  }
})

// @route   GET /api/books/admin
// @desc    Get all books (including unpublished)
// @access  Private/Admin
router.get('/admin', protect, adminOnly, async (req, res, next) => {
  try {
    const books = await Book.find({})
      .populate('createdBy', 'name avatar')
      .sort({ createdAt: -1 })
    res.json(books)
  } catch (error) {
    next(error)
  }
})

// @route   GET /api/books/:id
// @desc    Get book by ID
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id).populate('createdBy', 'name avatar')
    if (book) {
      // If not published, only admin or creator can view it
      if (!book.isPublished && (!req.user || req.user.role !== 'admin')) {
        res.status(403)
        throw new Error('Book is not published')
      }
      res.json(book)
    } else {
      res.status(404)
      throw new Error('Book not found')
    }
  } catch (error) {
    next(error)
  }
})

// @route   POST /api/books
// @desc    Create a book
// @access  Private/Admin
router.post('/', protect, adminOnly, async (req, res, next) => {
  try {
    const { 
      title, author, description, coverUrl, coverPublicId, 
      pdfUrl, pdfPublicId, category, price, 
      isDigitalAvailable, isPhysicalAvailable, physicalPrice, isPublished 
    } = req.body

    const book = new Book({
      title,
      author,
      description,
      coverUrl,
      coverPublicId,
      pdfUrl,
      pdfPublicId,
      category,
      price: price || 0,
      isDigitalAvailable: isDigitalAvailable !== undefined ? isDigitalAvailable : true,
      isPhysicalAvailable: isPhysicalAvailable || false,
      physicalPrice: physicalPrice || 0,
      isPublished: isPublished || false,
      createdBy: req.user._id
    })

    const createdBook = await book.save()
    res.status(201).json(createdBook)
  } catch (error) {
    next(error)
  }
})

// @route   PUT /api/books/:id
// @desc    Update a book
// @access  Private/Admin
router.put('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id)

    if (book) {
      book.title = req.body.title || book.title
      book.author = req.body.author || book.author
      book.description = req.body.description || book.description
      book.coverUrl = req.body.coverUrl !== undefined ? req.body.coverUrl : book.coverUrl
      book.coverPublicId = req.body.coverPublicId !== undefined ? req.body.coverPublicId : book.coverPublicId
      book.pdfUrl = req.body.pdfUrl !== undefined ? req.body.pdfUrl : book.pdfUrl
      book.pdfPublicId = req.body.pdfPublicId !== undefined ? req.body.pdfPublicId : book.pdfPublicId
      book.category = req.body.category || book.category
      book.price = req.body.price !== undefined ? req.body.price : book.price
      book.isDigitalAvailable = req.body.isDigitalAvailable !== undefined ? req.body.isDigitalAvailable : book.isDigitalAvailable
      book.isPhysicalAvailable = req.body.isPhysicalAvailable !== undefined ? req.body.isPhysicalAvailable : book.isPhysicalAvailable
      book.physicalPrice = req.body.physicalPrice !== undefined ? req.body.physicalPrice : book.physicalPrice
      book.isPublished = req.body.isPublished !== undefined ? req.body.isPublished : book.isPublished

      const updatedBook = await book.save()
      res.json(updatedBook)
    } else {
      res.status(404)
      throw new Error('Book not found')
    }
  } catch (error) {
    next(error)
  }
})

// @route   DELETE /api/books/:id
// @desc    Delete a book
// @access  Private/Admin
router.delete('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id)
    if (book) {
      res.json({ message: 'Book removed' })
    } else {
      res.status(404)
      throw new Error('Book not found')
    }
  } catch (error) {
    next(error)
  }
})

export default router
