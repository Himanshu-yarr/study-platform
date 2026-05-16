import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoutes    from './routes/auth.routes.js'
import courseRoutes  from './routes/course.routes.js'
import bookRoutes    from './routes/book.routes.js'
import uploadRoutes  from './routes/upload.routes.js'
import adminRoutes   from './routes/admin.routes.js'
import noticeRoutes  from './routes/notice.routes.js'
import playlistRoutes from './routes/playlist.routes.js'
import { errorHandler, notFound } from './middleware/error.middleware.js'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app  = express()
const PORT = process.env.PORT || 5000

// Security
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for easier deployment/external resources
}))
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }))

// Parsing
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))

// Logging (dev only)
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

// Routes
app.use('/api/auth',    authRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/books',   bookRoutes)
app.use('/api/upload',  uploadRoutes)
app.use('/api/admin',   adminRoutes)
app.use('/api/notices', noticeRoutes)
app.use('/api/playlists', playlistRoutes)

// Serve Frontend in Production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')))
  
  // Catch-all middleware for client-side routing
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) return next()
    res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'))
  })
} else {
  // Health check
  app.get('/api/health', (_, res) => res.json({ status: 'ok' }))
}

// Error handling
app.use(notFound)
app.use(errorHandler)

// DB + start
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅  MongoDB connected')
    app.listen(PORT, () => console.log(`🚀  Server running on :${PORT}`))
  })
  .catch((err) => { console.error('❌  DB connection failed:', err); process.exit(1) })
