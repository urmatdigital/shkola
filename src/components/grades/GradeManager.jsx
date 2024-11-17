import { useState, useEffect } from 'react'
    import { gradesService } from '../../services/supabase'

    export default function GradeManager() {
      const [grades, setGrades] = useState([])
      const [loading, setLoading] = useState(true)

      useEffect(() => {
        const loadGrades = async () => {
          try {
            const data = await gradesService.getStudentGrades()
            setGrades(data)
          } catch (error) {
            console.error('Error loading grades:', error)
          } finally {
            setLoading(false)
          }
        }

        loadGrades()
      }, [])

      if (loading) return <div>Загрузка...</div>

      return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Предмет
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Оценка
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Тип
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дата
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Статус
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {grades.map((grade) => (
                <tr key={grade.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {grade.subjects.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {grade.grade}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {grade.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(grade.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${grade.status === 'approved' ? 'bg-green-100 text-green-800' : 
                        grade.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {grade.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
