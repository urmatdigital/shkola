import { useAuth } from '../../context/AuthContext'
    import { ROLES } from '../../lib/roles'
    import AdminDashboard from './AdminDashboard'
    import TeacherDashboard from './TeacherDashboard'
    import StudentDashboard from './StudentDashboard'
    import ParentDashboard from './ParentDashboard'

    export default function DashboardLayout() {
      const { user } = useAuth()

      const getDashboardByRole = () => {
        switch (user?.profile?.role) {
          case ROLES.SUPER_ADMIN:
          case ROLES.DIRECTOR:
          case ROLES.ANALYST:
            return <AdminDashboard />
          case ROLES.TEACHER:
          case ROLES.CURATOR:
            return <TeacherDashboard />
          case ROLES.STUDENT:
            return <StudentDashboard />
          case ROLES.PARENT:
            return <ParentDashboard />
          default:
            return <div>Доступ запрещен</div>
        }
      }

      return (
        <div className="min-h-screen bg-gray-100">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {getDashboardByRole()}
          </div>
        </div>
      )
    }
