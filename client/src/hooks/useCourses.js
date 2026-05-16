import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as coursesApi from '../api/courses.api.js'
import toast from 'react-hot-toast'

export const COURSES_KEY = 'courses'

export function useCourses({ category, search } = {}) {
  return useQuery({
    queryKey:  [COURSES_KEY, { category, search }],
    queryFn:   () => coursesApi.getCourses({ category, search }),
    staleTime: 60_000,
  })
}

export function useCourse(id) {
  return useQuery({
    queryKey: [COURSES_KEY, id],
    queryFn:  () => coursesApi.getCourseById(id),
    enabled:  !!id,
  })
}

export function useAdminCourses() {
  return useQuery({
    queryKey: [COURSES_KEY, 'admin'],
    queryFn:  coursesApi.getAdminCourses,
  })
}

export function useCreateCourse() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: coursesApi.createCourse,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [COURSES_KEY] })
      toast.success('Course created successfully')
    },
    onError: (err) => toast.error(err.message)
  })
}

export function useUpdateCourse() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => coursesApi.updateCourse(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [COURSES_KEY] })
      toast.success('Course updated successfully')
    },
    onError: (err) => toast.error(err.message)
  })
}

export function useDeleteCourse() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: coursesApi.deleteCourse,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [COURSES_KEY] })
      toast.success('Course deleted')
    },
    onError: (err) => toast.error(err.message)
  })
}
