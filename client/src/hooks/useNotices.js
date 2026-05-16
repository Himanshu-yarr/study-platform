import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as noticeApi from '../api/notice.api'
import toast from 'react-hot-toast'

export function useNotices() {
  return useQuery({
    queryKey: ['notices'],
    queryFn: noticeApi.getNotices
  })
}

export function useManageNotices() {
  const queryClient = useQueryClient()

  const createNotice = useMutation({
    mutationFn: noticeApi.createNotice,
    onSuccess: () => {
      queryClient.invalidateQueries(['notices'])
      toast.success('Notice posted!')
    }
  })

  const updateNotice = useMutation({
    mutationFn: ({ id, data }) => noticeApi.updateNotice(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['notices'])
      toast.success('Notice updated')
    }
  })

  const deleteNotice = useMutation({
    mutationFn: noticeApi.deleteNotice,
    onSuccess: () => {
      queryClient.invalidateQueries(['notices'])
      toast.success('Notice deleted')
    }
  })

  return { createNotice, updateNotice, deleteNotice }
}
