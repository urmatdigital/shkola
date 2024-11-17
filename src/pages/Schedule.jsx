function Schedule() {
      return (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Расписание занятий</h2>
          <div className="grid grid-cols-5 gap-4">
            {['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'].map((day) => (
              <div key={day} className="border rounded p-4">
                <h3 className="font-bold mb-2">{day}</h3>
                <ul className="space-y-2">
                  <li className="text-sm">1. Математика</li>
                  <li className="text-sm">2. Физика</li>
                  <li className="text-sm">3. История</li>
                  <li className="text-sm">4. Литература</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      )
    }

    export default Schedule
