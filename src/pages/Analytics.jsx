function Analytics() {
      return (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Аналитика</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-100 p-4 rounded">
              <h3 className="font-bold">Успеваемость</h3>
              <p>Средний балл: 4.5</p>
            </div>
            <div className="bg-green-100 p-4 rounded">
              <h3 className="font-bold">Посещаемость</h3>
              <p>98% посещаемость</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded">
              <h3 className="font-bold">Активность</h3>
              <p>Высокая активность</p>
            </div>
          </div>
        </div>
      )
    }

    export default Analytics
