import api from './axios'

export const uploadImage = (formData) => {
  return api.post('/upload/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export const uploadPdf = (formData) => {
  return api.post('/upload/pdf', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}
