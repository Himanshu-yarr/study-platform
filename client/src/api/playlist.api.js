import api from './axios'

export const getPlaylists = (params) => api.get('/playlists', { params })
export const createPlaylist = (data) => api.post('/playlists', data)
export const updatePlaylist = (id, data) => api.put(`/playlists/${id}`, data)
export const deletePlaylist = (id) => api.delete(`/playlists/${id}`)
