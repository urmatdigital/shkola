import { supabase } from '../lib/supabaseClient'

    export const authService = {
      async signIn({ email, password }) {
        return supabase.auth.signInWithPassword({ email, password })
      },

      async signUp({ email, password, fullName, role }) {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              role
            }
          }
        })

        if (authError) throw authError

        // Create profile after successful signup
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              full_name: fullName,
              email,
              role
            }
          ])

        if (profileError) throw profileError

        return { data: authData, error: null }
      },

      async signOut() {
        return supabase.auth.signOut()
      },

      async getCurrentUser() {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return null

        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        return { ...user, profile }
      }
    }

    export const profileService = {
      async getProfile(userId) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single()

        if (error) throw error
        return data
      },

      async updateProfile(userId, updates) {
        const { data, error } = await supabase
          .from('profiles')
          .update(updates)
          .eq('id', userId)

        if (error) throw error
        return data
      }
    }

    export const scheduleService = {
      async getSchedule(classId) {
        const { data, error } = await supabase
          .from('schedule')
          .select(`
            *,
            subjects (
              name,
              code
            ),
            profiles (
              full_name
            )
          `)
          .eq('class_id', classId)
          .order('day_of_week')
          .order('start_time')

        if (error) throw error
        return data
      },

      async createScheduleItem(scheduleData) {
        const { data, error } = await supabase
          .from('schedule')
          .insert([scheduleData])

        if (error) throw error
        return data
      }
    }

    export const gradesService = {
      async getStudentGrades(studentId) {
        const { data, error } = await supabase
          .from('grades')
          .select(`
            *,
            subjects (
              name
            ),
            profiles (
              full_name
            )
          `)
          .eq('student_id', studentId)
          .order('created_at', { ascending: false })

        if (error) throw error
        return data
      },

      async addGrade(gradeData) {
        const { data, error } = await supabase
          .from('grades')
          .insert([gradeData])

        if (error) throw error
        return data
      }
    }
