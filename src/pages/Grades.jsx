function Grades() {
      return (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Оценки</h2>
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">Предмет</th>
                <th className="px-4 py-2">Текущие оценки</th>
                <th className="px-4 py-2">Средний балл</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Математика</td>
                <td className="border px-4 py-2">5, 4, 5, 5</td>
                <td className="border px-4 py-2">4.75</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Физика</td>
                <td className="border px-4 py-2">4, 4, 5</td>
                <td className="border px-4 py-2">4.33</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">История</td>
                <td className="border px-4 py-2">5, 5, 5</td>
                <td className="border px-4 py-2">5.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    }

    export default Grades
