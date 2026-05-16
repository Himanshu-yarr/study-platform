import { useMutation } from '@tanstack/react-query'
import * as uploadApi from '../api/upload.api'
import toast from 'react-hot-toast'

export function useUploadFile() {
  return useMutation({
    mutationFn: async ({ file, type }) => {
      const formData = new FormData()
      if (type === 'image') {
        formData.append('image', file)
        return uploadApi.uploadImage(formData)
      } else {
        formData.append('pdf', file)
        return uploadApi.uploadPdf(formData)
      }
    },
    onError: (err) => {
      toast.error(err.message || 'Upload failed')
    }
  })
}
