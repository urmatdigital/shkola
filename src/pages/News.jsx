function News() {
      return (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Новости школы</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((news) => (
              <div key={news} className="border-b pb-4">
                <h3 className="font-bold">Новость {news}</h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <span className="text-sm text-gray-500">01.03.2024</span>
              </div>
            ))}
          </div>
        </div>
      )
    }

    export default News
