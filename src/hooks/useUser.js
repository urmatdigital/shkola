import { useState, useEffect } from 'react'
    import { supabase } from '../lib/supabaseClient'

    export function useUser() {
      const [user, setUser] = useState(null)
      const [loading, setLoading] = useState(true)

      useEffect(() => {
        const getCurrentUser = async () => {
          try {
            const { data: { user: authUser } } = await supabase.auth.getUser()
            
            if (authUser) {
              const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', authUser.id)
                .single()

              setUser({ ...authUser, profile })
            }
          } catch (error) {
            console.error('Error loading user:', error)
          } finally {
            setLoading(false)
          }
        }

        getCurrentUser()

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            if (session?.user) {
              const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single()

              setUser({ ...session.user, profile })
            } else {
              setUser(null)
            }
            setLoading(false)
          }
        )

        return () => subscription.unsubscribe()
      }, [])

      return { user, loading }
    }
