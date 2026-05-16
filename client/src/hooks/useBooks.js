import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as booksApi from '../api/books.api.js'
import toast from 'react-hot-toast'

export const BOOKS_KEY = 'books'

export function useBooks({ category, search } = {}) {
  return useQuery({
    queryKey:  [BOOKS_KEY, { category, search }],
    queryFn:   () => booksApi.getBooks({ category, search }),
    staleTime: 60_000,
  })
}

export function useBook(id) {
  return useQuery({
    queryKey: [BOOKS_KEY, id],
    queryFn:  () => booksApi.getBookById(id),
    enabled:  !!id,
  })
}

export function useAdminBooks() {
  return useQuery({
    queryKey: [BOOKS_KEY, 'admin'],
    queryFn:  booksApi.getAdminBooks,
  })
}

export function useCreateBook() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: booksApi.createBook,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [BOOKS_KEY] })
      toast.success('Book created successfully')
    },
    onError: (err) => toast.error(err.message)
  })
}

export function useUpdateBook() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => booksApi.updateBook(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [BOOKS_KEY] })
      toast.success('Book updated successfully')
    },
    onError: (err) => toast.error(err.message)
  })
}

export function useDeleteBook() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: booksApi.deleteBook,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [BOOKS_KEY] })
      toast.success('Book deleted')
    },
    onError: (err) => toast.error(err.message)
  })
}
