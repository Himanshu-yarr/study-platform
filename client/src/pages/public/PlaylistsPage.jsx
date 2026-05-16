import { useState } from 'react'
import { Play, ListVideo } from 'lucide-react'
import { usePlaylists } from '../../hooks/usePlaylists'
import PlaylistGrid from '../../components/playlists/PlaylistGrid'
import SearchInput from '../../components/shared/SearchInput'
import EmptyState from '../../components/shared/EmptyState'

const PlaylistsPage = () => {
  const [search, setSearch] = useState('')
  const { data: playlists = [], isLoading } = usePlaylists({ search })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 pt-12 pb-8">
        <div className="container-main">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-brand-600">
                <Play size={24} />
                <span className="text-sm font-bold uppercase tracking-widest">Play Series</span>
              </div>
              <h1 className="heading-2 dark:text-white">Curated Law Series</h1>
              <p className="body-lg">Complete subject series and playlists for structured learning.</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="font-semibold text-gray-900 dark:text-white">{playlists.length}</span>
              <span>series found</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="sticky top-16 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 py-4">
        <div className="container-main">
          <div className="flex flex-col md:flex-row md:items-center justify-center gap-4">
            <SearchInput 
              value={search} 
              onChange={setSearch} 
              placeholder="Search legal series and playlists..."
              className="w-full max-w-2xl"
            />
          </div>
        </div>
      </div>

      <main className="container-main py-12">
        {playlists.length === 0 && !isLoading ? (
          <EmptyState
            icon={ListVideo}
            title="No series found"
            description={search ? `No results for "${search}".` : "We haven't added any curated series yet."}
            action={search ? { label: 'Clear search', onClick: () => setSearch('') } : null}
          />
        ) : (
          <PlaylistGrid playlists={playlists} isLoading={isLoading} />
        )}
      </main>
    </div>
  )
}

export default PlaylistsPage
