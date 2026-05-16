import { createContext, useContext, useState, useEffect } from 'react'
import * as authApi from '../api/auth.api'
import toast from 'react-hot-toast'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const userData = await authApi.getMe()
          setUser(userData)
        } catch (err) {
          localStorage.removeItem('token')
          setUser(null)
        }
      }
      setLoading(false)
    }
    initAuth()
  }, [])

  const login = async (credentials) => {
    const data = await authApi.login(credentials)
    localStorage.setItem('token', data.token)
    setUser(data)
    toast.success('Welcome back!')
    return data
  }

  const register = async (userData) => {
    const data = await authApi.register(userData)
    localStorage.setItem('token', data.token)
    setUser(data)
    toast.success('Account created successfully!')
    return data
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    toast.success('Logged out')
  }

  const updateProfile = async (userData) => {
    const data = await authApi.updateProfile(userData)
    setUser(prev => ({ ...prev, ...data }))
    toast.success('Profile updated!')
    return data
  }

  const toggleBookmark = async (type, id) => {
    if (!user) {
      toast.error('Please login to bookmark')
      return
    }
    const bookmarks = await authApi.toggleBookmark(type, id)
    setUser(prev => ({ ...prev, bookmarks }))
    
    const bookmarkList = bookmarks[type === 'course' ? 'courses' : 'books'] || []
    const isBookmarked = bookmarkList.some(item => 
      (typeof item === 'object' ? item._id : item) === id
    )
    
    toast.success(isBookmarked ? 'Added to bookmarks' : 'Removed from bookmarks')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile, toggleBookmark }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
