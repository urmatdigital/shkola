function Library() {
      return (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Электронная библиотека</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((book) => (
              <div key={book} className="border p-4 rounded">
                <h3 className="font-bold">Учебник {book}</h3>
                <p className="text-gray-600">Автор книги</p>
                <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Читать
                </button>
              </div>
            ))}
          </div>
        </div>
      )
    }

    export default Library
