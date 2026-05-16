import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as playlistApi from '../api/playlist.api'
import toast from 'react-hot-toast'

export function usePlaylists(params) {
  return useQuery({
    queryKey: ['playlists', params],
    queryFn: () => playlistApi.getPlaylists(params)
  })
}

export function useManagePlaylists() {
  const queryClient = useQueryClient()

  const createPlaylist = useMutation({
    mutationFn: playlistApi.createPlaylist,
    onSuccess: () => {
      queryClient.invalidateQueries(['playlists'])
      toast.success('Playlist added!')
    }
  })

  const updatePlaylist = useMutation({
    mutationFn: ({ id, data }) => playlistApi.updatePlaylist(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['playlists'])
      toast.success('Playlist updated')
    }
  })

  const deletePlaylist = useMutation({
    mutationFn: playlistApi.deletePlaylist,
    onSuccess: () => {
      queryClient.invalidateQueries(['playlists'])
      toast.success('Playlist removed')
    }
  })

  return { createPlaylist, updatePlaylist, deletePlaylist }
}
