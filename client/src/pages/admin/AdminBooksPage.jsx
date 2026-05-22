import { useState } from 'react'
import { Plus, Edit2, Trash2, ExternalLink, FileDown } from 'lucide-react'
import { useAdminBooks, useCreateBook, useUpdateBook, useDeleteBook } from '../../hooks/useBooks'
import DataTable from '../../components/admin/DataTable'
import BookForm from '../../components/admin/BookForm'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'

const AdminBooksPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingBook, setEditingBook] = useState(null)

  const { data: books = [], isLoading } = useAdminBooks()
  const createMutation = useCreateBook()
  const updateMutation = useUpdateBook()
  const deleteMutation = useDeleteBook()

  const handleCreate = (data) => {
    createMutation.mutate(data, {
      onSuccess: () => setIsFormOpen(false)
    })
  }

  const handleUpdate = (data) => {
    updateMutation.mutate(
      { id: editingBook._id, data },
      { onSuccess: () => {
        setIsFormOpen(false)
        setEditingBook(null)
      }}
    )
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      deleteMutation.mutate(id)
    }
  }

  const togglePublished = (book) => {
    updateMutation.mutate({
      id: book._id,
      data: { isPublished: !book.isPublished }
    })
  }

  const columns = [
    {
      header: 'Cover',
      render: (book) => (
        <div className="w-10 h-14 rounded bg-gray-100 overflow-hidden border border-gray-100">
          {book.coverUrl ? (
            <img src={book.coverUrl} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-[8px]">NO COVER</div>
          )}
        </div>
      )
    },
    {
      header: 'Book Info',
      render: (book) => (
        <div className="max-w-[250px]">
          <p className="font-semibold truncate dark:text-white">{book.title}</p>
          <p className="text-xs text-gray-500 truncate">By {book.author}</p>
        </div>
      )
    },
    {
      header: 'Category',
      render: (book) => <Badge variant="gray">{book.category}</Badge>
    },
    {
      header: 'Status',
      render: (book) => (
        <button 
          onClick={() => togglePublished(book)}
          className={cn(
            "relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none",
            book.isPublished ? "bg-brand-600" : "bg-gray-200 dark:bg-gray-700"
          )}
        >
          <span className={cn(
            "inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform",
            book.isPublished ? "translate-x-5" : "translate-x-0.5"
          )} />
        </button>
      )
    },
    {
      header: 'Actions',
      render: (book) => (
        <div className="flex items-center gap-2">
          <button 
            onClick={() => { setEditingBook(book); setIsFormOpen(true); }}
            className="p-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded transition-colors"
          >
            <Edit2 size={16} />
          </button>
          <button 
            onClick={() => handleDelete(book._id)}
            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
          >
            <Trash2 size={16} />
          </button>
          {book.pdfUrl && (
            <a 
              href={book.pdfUrl} 
              target="_blank" 
              className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded transition-colors"
            >
              <FileDown size={16} />
            </a>
          )}
        </div>
      )
    }
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="heading-2 dark:text-white">Library Management</h1>
          <p className="body-sm">Manage your collection of study books and resources.</p>
        </div>
        <Button onClick={() => { setEditingBook(null); setIsFormOpen(true); }} className="gap-2 sm:self-auto self-start">
          <Plus size={18} />
          Add Book
        </Button>
      </div>

      <DataTable 
        columns={columns} 
        data={books} 
        isLoading={isLoading} 
      />

      <BookForm
        isOpen={isFormOpen}
        onClose={() => { setIsFormOpen(false); setEditingBook(null); }}
        onSubmit={editingBook ? handleUpdate : handleCreate}
        initialData={editingBook}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  )
}

function cn(...inputs) {
  return inputs.filter(Boolean).join(' ')
}

export default AdminBooksPage
