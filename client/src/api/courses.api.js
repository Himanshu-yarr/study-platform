import api from './axios'

export const getCourses = (params) => api.get('/courses', { params })
export const getCourseById = (id) => api.get(`/courses/${id}`)
export const getAdminCourses = () => api.get('/courses/admin')
export const createCourse = (data) => api.post('/courses', data)
export const updateCourse = (id, data) => api.put(`/courses/${id}`, data)
export const deleteCourse = (id) => api.delete(`/courses/${id}`)
