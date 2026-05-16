import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// Layouts
import MainLayout from './components/layout/MainLayout'
import AdminLayout from './components/layout/AdminLayout'

// Guards
import { ProtectedRoute, AdminRoute } from './components/auth/RouteGuards'

// Pages
import HomePage from './pages/public/HomePage'
import CoursesPage from './pages/public/CoursesPage'
import CourseDetailPage from './pages/public/CourseDetailPage'
import BooksPage from './pages/public/BooksPage'
import BookDetailPage from './pages/public/BookDetailPage'
import PlaylistsPage from './pages/public/PlaylistsPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminCoursesPage from './pages/admin/AdminCoursesPage'
import AdminBooksPage from './pages/admin/AdminBooksPage'
import AdminNoticesPage from './pages/admin/AdminNoticesPage'
import AdminPlaylistsPage from './pages/admin/AdminPlaylistsPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'dark:bg-gray-800 dark:text-white border border-gray-100 dark:border-gray-700 shadow-xl',
          duration: 3000,
        }}
      />
      
      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetailPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/books/:id" element={<BookDetailPage />} />
          <Route path="/series" element={<PlaylistsPage />} />
          
          {/* Protected Student Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/courses" element={<AdminCoursesPage />} />
            <Route path="/admin/books" element={<AdminBooksPage />} />
            <Route path="/admin/notices" element={<AdminNoticesPage />} />
            <Route path="/admin/playlists" element={<AdminPlaylistsPage />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
