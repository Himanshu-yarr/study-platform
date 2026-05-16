import { useQuery } from '@tanstack/react-query'
import * as adminApi from '../api/admin.api'

export const useAdminStats = () => {
  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: adminApi.getStats
  })
}

export const useAdminActivity = () => {
  return useQuery({
    queryKey: ['admin-activity'],
    queryFn: adminApi.getActivity
  })
}
