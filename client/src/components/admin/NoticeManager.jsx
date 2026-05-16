import { useState } from 'react'
import { Megaphone, Plus, Edit, Trash2, Bell } from 'lucide-react'
import { useNotices, useManageNotices } from '../../hooks/useNotices'
import { Button } from '../ui/Button'
import NoticeForm from './NoticeForm'
import { Spinner } from '../ui/Spinner'
import { Badge } from '../ui/Badge'

const NoticeManager = () => {
  const { data: notices = [], isLoading } = useNotices()
  const { createNotice, updateNotice, deleteNotice } = useManageNotices()
  
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingNotice, setEditingNotice] = useState(null)

  const handleCreate = async (data) => {
    await createNotice.mutateAsync(data)
    setIsFormOpen(false)
  }

  const handleUpdate = async (data) => {
    await updateNotice.mutateAsync({ id: editingNotice._id, data })
    setEditingNotice(null)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this notice?')) {
      await deleteNotice.mutateAsync(id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-50 text-brand-600 rounded-lg">
            <Megaphone size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold">Notice Board</h2>
            <p className="text-sm text-gray-500">Post updates and links for your students</p>
          </div>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="gap-2">
          <Plus size={18} />
          New Notice
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12"><Spinner /></div>
      ) : notices.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-2xl border-gray-200">
          <Bell className="mx-auto text-gray-300 mb-2" size={40} />
          <p className="text-gray-500">No active notices. Post your first one!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {notices.map((notice) => (
            <div 
              key={notice._id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 rounded-2xl flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-xl ${
                  notice.type === 'urgent' ? 'bg-red-50 text-red-600' :
                  notice.type === 'warning' ? 'bg-amber-50 text-amber-600' : 'bg-brand-50 text-brand-600'
                }`}>
                  <Megaphone size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold">{notice.title}</h4>
                    <Badge variant={notice.isActive ? 'brand' : 'gray'} className="text-[10px]">
                      {notice.isActive ? 'Active' : 'Hidden'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-1">{notice.content}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => setEditingNotice(notice)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500 transition-colors"
                >
                  <Edit size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(notice._id)}
                  className="p-2 hover:bg-red-50 text-gray-500 hover:text-red-600 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      <NoticeForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreate}
        isLoading={createNotice.isPending}
      />

      {/* Edit Modal */}
      {editingNotice && (
        <NoticeForm
          isOpen={!!editingNotice}
          onClose={() => setEditingNotice(null)}
          onSubmit={handleUpdate}
          initialData={editingNotice}
          isLoading={updateNotice.isPending}
        />
      )}
    </div>
  )
}

export default NoticeManager
