import { useAuth } from '../../context/AuthContext'

    export default function TeacherDashboard() {
      const { user } = useAuth()

      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">📚 Мои классы</h2>
            <div className="space-y-2">
              <button className="w-full bg-blue-500 text-white p-2 rounded">
                Журнал
              </button>
              <button className="w-full bg-green-500 text-white p-2 rounded">
                Домашние задания
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">📝 Оценки</h2>
            <div className="space-y-2">
              <button className="w-full bg-purple-500 text-white p-2 rounded">
                Выставить оценки
              </button>
              <button className="w-full bg-indigo-500 text-white p-2 rounded">
                Отчет успеваемости
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">💬 Коммуникации</h2>
            <div className="space-y-2">
              <button className="w-full bg-yellow-500 text-white p-2 rounded">
                Сообщения
              </button>
              <button className="w-full bg-orange-500 text-white p-2 rounded">
                Объявления
              </button>
            </div>
          </div>
        </div>
      )
    }
