export const ROLES = {
      SUPER_ADMIN: 'super_admin',
      ANALYST: 'analyst',
      DIRECTOR: 'director',
      HEAD_TEACHER: 'head_teacher',
      SECRETARY: 'secretary',
      TEACHER: 'teacher',
      CURATOR: 'curator',
      MEDICAL_WORKER: 'medical_worker',
      PSYCHOLOGIST: 'psychologist',
      SPEECH_THERAPIST: 'speech_therapist',
      PARENT: 'parent',
      STUDENT: 'student'
    }

    export const ROLE_PERMISSIONS = {
      [ROLES.SUPER_ADMIN]: {
        canManageUsers: true,
        canManageRoles: true,
        canManagePermissions: true,
        canViewAnalytics: true,
        canManageSchedule: true,
        canManageGrades: true,
        canModerateContent: true,
        canManageLibrary: true,
        canManageNews: true
      },
      [ROLES.ANALYST]: {
        canViewAnalytics: true,
        canViewChats: true,
        canEditInfo: true,
        canModerateGrades: true
      },
      // Добавьте permissions для остальных ролей
    }

    export const hasPermission = (userRole, permission) => {
      return ROLE_PERMISSIONS[userRole]?.[permission] || false
    }
