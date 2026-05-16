import { useState } from 'react'
import { Plus, Edit2, Trash2, ExternalLink } from 'lucide-react'
import { useAdminCourses, useCreateCourse, useUpdateCourse, useDeleteCourse } from '../../hooks/useCourses'
import DataTable from '../../components/admin/DataTable'
import CourseForm from '../../components/admin/CourseForm'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import toast from 'react-hot-toast'

const AdminCoursesPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null)

  const { data: courses = [], isLoading } = useAdminCourses()
  const createMutation = useCreateCourse()
  const updateMutation = useUpdateCourse()
  const deleteMutation = useDeleteCourse()

  const handleCreate = (data) => {
    createMutation.mutate(data, {
      onSuccess: () => setIsFormOpen(false)
    })
  }

  const handleUpdate = (data) => {
    updateMutation.mutate(
      { id: editingCourse._id, data },
      { onSuccess: () => {
        setIsFormOpen(false)
        setEditingCourse(null)
      }}
    )
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      deleteMutation.mutate(id)
    }
  }

  const togglePublished = (course) => {
    updateMutation.mutate({
      id: course._id,
      data: { isPublished: !course.isPublished }
    })
  }

  const columns = [
    {
      header: 'Thumbnail',
      render: (course) => (
        <div className="w-16 h-9 rounded bg-gray-100 overflow-hidden border border-gray-100">
          {course.thumbnailUrl ? (
            <img src={course.thumbnailUrl} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-[10px]">NO IMG</div>
          )}
        </div>
      )
    },
    {
      header: 'Title',
      render: (course) => (
        <div className="max-w-[300px]">
          <p className="font-semibold truncate dark:text-white">{course.title}</p>
          <p className="text-xs text-gray-500 truncate">{course.category}</p>
        </div>
      )
    },
    {
      header: 'Status',
      render: (course) => (
        <button 
          onClick={() => togglePublished(course)}
          className={cn(
            "relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none",
            course.isPublished ? "bg-brand-600" : "bg-gray-200 dark:bg-gray-700"
          )}
        >
          <span className={cn(
            "inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform",
            course.isPublished ? "translate-x-5" : "translate-x-0.5"
          )} />
        </button>
      )
    },
    {
      header: 'Actions',
      render: (course) => (
        <div className="flex items-center gap-2">
          <button 
            onClick={() => { setEditingCourse(course); setIsFormOpen(true); }}
            className="p-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded transition-colors"
          >
            <Edit2 size={16} />
          </button>
          <button 
            onClick={() => handleDelete(course._id)}
            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
          >
            <Trash2 size={16} />
          </button>
          <a 
            href={`/courses/${course._id}`} 
            target="_blank" 
            className="p-1.5 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
          >
            <ExternalLink size={16} />
          </a>
        </div>
      )
    }
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-2 dark:text-white">Manage Courses</h1>
          <p className="body-sm">Create, edit and publish your video courses.</p>
        </div>
        <Button onClick={() => { setEditingCourse(null); setIsFormOpen(true); }} className="gap-2">
          <Plus size={18} />
          Create Course
        </Button>
      </div>

      <DataTable 
        columns={columns} 
        data={courses} 
        isLoading={isLoading} 
      />

      <CourseForm
        isOpen={isFormOpen}
        onClose={() => { setIsFormOpen(false); setEditingCourse(null); }}
        onSubmit={editingCourse ? handleUpdate : handleCreate}
        initialData={editingCourse}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  )
}

// Internal helper to avoid import loop
function cn(...inputs) {
  return inputs.filter(Boolean).join(' ')
}

export default AdminCoursesPage
