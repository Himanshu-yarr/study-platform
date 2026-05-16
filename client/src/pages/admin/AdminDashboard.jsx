import { BookOpen, BookMarked, Users, TrendingUp } from 'lucide-react'
import { useAdminStats, useAdminActivity } from '../../hooks/useAdmin'
import { Card } from '../../components/ui/Card'
import { Skeleton } from '../../components/ui/Skeleton'
import { formatDistanceToNow } from 'date-fns'

const AdminDashboard = () => {
  const { data: stats, isLoading: statsLoading } = useAdminStats()
  const { data: activities = [], isLoading: activityLoading } = useAdminActivity()

  const statConfig = [
    { label: 'Total Courses', value: stats?.totalCourses ?? 0, icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Books', value: stats?.totalBooks ?? 0, icon: BookMarked, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Total Students', value: stats?.totalStudents ?? 0, icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Active Learners', value: stats?.activeLearners ?? 0, icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="heading-2 dark:text-white">Admin Dashboard</h1>
        <p className="body-sm">Overview of your platform's performance and content.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statConfig.map((stat, i) => (
          <Card key={i} className="flex items-center gap-4 border-none shadow-sm">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{stat.label}</p>
              {statsLoading ? (
                <Skeleton className="h-8 w-16 mt-1" />
              ) : (
                <p className="text-2xl font-bold dark:text-white">{stat.value.toLocaleString()}</p>
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold dark:text-white">Recent Activity</h3>
            </div>
            
            <div className="space-y-6">
              {activityLoading ? (
                [1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-3 w-1/4" />
                    </div>
                  </div>
                ))
              ) : activities.length > 0 ? (
                activities.map((activity, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-brand-600">
                      <Users size={18} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm dark:text-white">
                        <span className="font-bold">{activity.message.split(' ')[0]}</span> {activity.message.split(' ').slice(1).join(' ')}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-center py-8 text-gray-500 italic">No recent activity found.</p>
              )}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-brand-600 text-white border-none shadow-lg shadow-brand-500/20">
            <h3 className="font-bold mb-2">Platform Tip</h3>
            <p className="text-sm text-brand-100 leading-relaxed mb-4">
              Regularly auditing your course categories helps students find relevant content faster.
            </p>
            <button className="text-xs font-bold bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg transition-colors">
              Read guide
            </button>
          </Card>
          
          <Card>
            <h3 className="font-bold dark:text-white mb-4">Content Mix</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="dark:text-gray-400">Total Courses</span>
                  <span className="font-bold dark:text-white">{stats?.totalCourses ?? 0}</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${(stats?.totalCourses / ((stats?.totalCourses + stats?.totalBooks) || 1)) * 100}%` }} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="dark:text-gray-400">Total Books</span>
                  <span className="font-bold dark:text-white">{stats?.totalBooks ?? 0}</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500" style={{ width: `${(stats?.totalBooks / ((stats?.totalCourses + stats?.totalBooks) || 1)) * 100}%` }} />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
