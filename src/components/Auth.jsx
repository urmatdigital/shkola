import { useState } from 'react'
    import { supabase } from '../lib/supabaseClient'

    export default function Auth() {
      const [loading, setLoading] = useState(false)
      const [isLogin, setIsLogin] = useState(true)
      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
      const [fullName, setFullName] = useState('')
      const [role, setRole] = useState('teacher')

      const handleAuth = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
          if (isLogin) {
            const { error } = await supabase.auth.signInWithPassword({
              email,
              password,
            })
            if (error) throw error
          } else {
            const { error: signUpError, data } = await supabase.auth.signUp({
              email,
              password,
              options: {
                data: {
                  full_name: fullName,
                  role: role,
                }
              }
            })
            if (signUpError) throw signUpError

            // Создаем запись в таблице profiles
            if (data.user) {
              const { error: profileError } = await supabase
                .from('profiles')
                .insert([
                  {
                    id: data.user.id,
                    full_name: fullName,
                    role: role,
                    email: email
                  }
                ])
              if (profileError) throw profileError
            }
          }
        } catch (error) {
          alert(error.message)
        } finally {
          setLoading(false)
        }
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
          <div className="w-full max-w-md space-y-8 bg-white rounded-2xl p-8 shadow-xl">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                {isLogin ? '👋 Добро пожаловать!' : '✨ Создать аккаунт'}
              </h2>
              <p className="text-gray-600">
                {isLogin ? 'Рады видеть вас снова!' : 'Присоединяйтесь к нам'}
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleAuth}>
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    👤 Полное имя
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Иван Иванов"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  📧 Email
                </label>
                <input
                  type="email"
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  🔒 Пароль
                </label>
                <input
                  type="password"
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    🎭 Роль
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="teacher">👩‍🏫 Учитель</option>
                    <option value="admin">👑 Администратор</option>
                    <option value="student">👨‍🎓 Ученик</option>
                    <option value="parent">👨‍👩‍👧‍👦 Родитель</option>
                  </select>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative flex w-full justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {loading ? '⏳ Загрузка...' : isLogin ? '🚀 Войти' : '✨ Создать аккаунт'}
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-500"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? '🆕 Создать новый аккаунт' : '🔙 Уже есть аккаунт? Войти'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )
    }
