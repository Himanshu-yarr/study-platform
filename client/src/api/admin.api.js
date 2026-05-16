import api from './axios'

export const getStats = () => api.get('/admin/stats')
export const getActivity = () => api.get('/admin/activity')
