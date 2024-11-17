import { useAuth } from '../../context/AuthContext'
    import { ROLES, hasPermission } from '../../lib/roles'

    export default function AdminDashboard() {
      const { user } = useAuth()

      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hasPermission(user?.role, 'canManageUsers') && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">👥 Управление пользователями</h2>
              <div className="space-y-2">
                <button className="w-full bg-blue-500 text-white p-2 rounded">
                  Добавить пользователя
                </button>
                <button className="w-full bg-green-500 text-white p-2 rounded">
                  Управление ролями
                </button>
              </div>
            </div>
          )}

          {hasPermission(user?.role, 'canViewAnalytics') && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">📊 Аналитика</h2>
              <div className="space-y-2">
                <button className="w-full bg-purple-500 text-white p-2 rounded">
                  Отчеты
                </button>
                <button className="w-full bg-indigo-500 text-white p-2 rounded">
                  Статистика
                </button>
              </div>
            </div>
          )}

          {hasPermission(user?.role, 'canManageSchedule') && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">📅 Расписание</h2>
              <div className="space-y-2">
                <button className="w-full bg-yellow-500 text-white p-2 rounded">
                  Редактировать расписание
                </button>
                <button className="w-full bg-orange-500 text-white p-2 rounded">
                  Замены
                </button>
              </div>
            </div>
          )}
        </div>
      )
    }
