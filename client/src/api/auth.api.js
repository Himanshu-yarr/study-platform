import api from './axios'

export const login = (credentials) => api.post('/auth/login', credentials)
export const register = (data) => api.post('/auth/register', data)
export const getMe = () => api.get('/auth/me')
export const updateProfile = (data) => api.put('/auth/profile', data)
export const toggleBookmark = (type, id) => api.post(`/auth/bookmarks/${type}/${id}`)
