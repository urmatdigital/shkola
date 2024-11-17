import { useAuth } from '../context/AuthContext'
    import { ROLES } from '../lib/roles'

    function Home() {
      const { user } = useAuth()

      return (
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    👋 Добро пожаловать, {user?.profile?.full_name}!
                  </h1>
                  <p className="mt-2 text-gray-600">
                    Роль: {user?.profile?.role}
                  </p>
                </div>
                <div className="hidden sm:block">
                  <img
                    src="/school-logo.png"
                    alt="School Logo"
                    className="h-16 w-16"
                  />
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
              <p className="text-white">
                Сегодня: {new Date().toLocaleDateString('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Schedule Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">📅 Расписание на сегодня</h2>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                    <span>Математика</span>
                    <span className="text-sm text-gray-600">8:30 - 9:15</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
                    <span>Физика</span>
                    <span className="text-sm text-gray-600">9:25 - 10:10</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                    <span>История</span>
                    <span className="text-sm text-gray-600">10:20 - 11:05</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Grades Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">📊 Последние оценки</h2>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                    <span>Математика</span>
                    <span className="font-bold text-green-600">5</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                    <span>Физика</span>
                    <span className="font-bold text-blue-600">4</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
                    <span>История</span>
                    <span className="font-bold text-purple-600">5</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Announcements Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">📢 Объявления</h2>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 rounded">
                    <p className="text-sm font-medium">Родительское собрание</p>
                    <p className="text-xs text-gray-600">Четверг, 18:00</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded">
                    <p className="text-sm font-medium">Школьная олимпиада</p>
                    <p className="text-xs text-gray-600">Суббота, 10:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Sections based on Role */}
          {user?.profile?.role === ROLES.SUPER_ADMIN && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">🔍 Административная панель</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="p-3 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
                  Управление пользователями
                </button>
                <button className="p-3 bg-green-100 rounded-lg hover:bg-green-200 transition-colors">
                  Статистика системы
                </button>
                <button className="p-3 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors">
                  Настройки школы
                </button>
              </div>
            </div>
          )}
        </div>
      )
    }

    export default Home
