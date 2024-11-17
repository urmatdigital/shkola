import { useState } from 'react'
    import { useNavigate, Link, useLocation } from 'react-router-dom'
    import { supabase } from '../lib/supabaseClient'
    import { useAuth } from '../context/AuthContext'

    function Layout({ children }) {
      const navigate = useNavigate()
      const location = useLocation()
      const { user } = useAuth()
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

      const handleLogout = async () => {
        await supabase.auth.signOut()
        navigate('/auth')
      }

      const menuItems = [
        { path: '/', label: '🏠 Главная', roles: ['*'] },
        { path: '/analytics', label: '📊 Аналитика', roles: ['super_admin', 'analyst', 'director'] },
        { path: '/schedule', label: '📅 Расписание', roles: ['*'] },
        { path: '/grades', label: '📝 Оценки', roles: ['*'] },
        { path: '/library', label: '📚 Библиотека', roles: ['*'] },
        { path: '/news', label: '📰 Новости', roles: ['*'] }
      ]

      const filteredMenuItems = menuItems.filter(item => 
        item.roles.includes('*') || item.roles.includes(user?.profile?.role)
      )

      return (
        <div className="min-h-screen bg-gray-50">
          {/* Top Navigation Bar */}
          <nav className="bg-white shadow-lg border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                      ISIT TRUDIT
                    </span>
                  </div>
                  
                  {/* Desktop Menu */}
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    {filteredMenuItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`${
                          location.pathname === item.path
                            ? 'border-blue-500 text-gray-900'
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                        } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* User Menu */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                        {user?.profile?.full_name?.[0] || '?'}
                      </div>
                      <span className="hidden md:block">{user?.profile?.full_name}</span>
                    </Link>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                  >
                    🚪 Выйти
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Menu */}
            <div className={`sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
              <div className="pt-2 pb-3 space-y-1">
                {filteredMenuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`${
                      location.pathname === item.path
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                    } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              {children}
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <div className="text-center text-gray-500 text-sm">
                © 2024 ISIT TRUDIT. Все права защищены.
              </div>
            </div>
          </footer>
        </div>
      )
    }

    export default Layout
