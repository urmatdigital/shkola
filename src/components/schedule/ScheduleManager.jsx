import { useState, useEffect } from 'react'
    import { scheduleService } from '../../services/supabase'

    export default function ScheduleManager() {
      const [schedule, setSchedule] = useState([])
      const [loading, setLoading] = useState(true)

      useEffect(() => {
        const loadSchedule = async () => {
          try {
            const data = await scheduleService.getSchedule()
            setSchedule(data)
          } catch (error) {
            console.error('Error loading schedule:', error)
          } finally {
            setLoading(false)
          }
        }

        loadSchedule()
      }, [])

      const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница']

      if (loading) return <div>Загрузка...</div>

      return (
        <div className="bg-white rounded-lg shadow">
          <div className="grid grid-cols-5 gap-4 p-4">
            {daysOfWeek.map((day, index) => (
              <div key={day} className="border rounded p-4">
                <h3 className="font-bold text-lg mb-2">{day}</h3>
                <div className="space-y-2">
                  {schedule
                    .filter(item => item.day_of_week === index + 1)
                    .map(item => (
                      <div key={item.id} className="bg-gray-50 p-2 rounded">
                        <div className="font-medium">{item.subjects.name}</div>
                        <div className="text-sm text-gray-600">
                          {item.start_time} - {item.end_time}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.profiles.full_name}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
