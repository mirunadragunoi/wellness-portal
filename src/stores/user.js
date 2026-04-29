import { defineStore } from 'pinia'
import { api } from '@/services/api'
import { useAuthStore } from '@/stores/auth'
import { getCategoriesFromObjectives } from '@/data/phrases'

const OBJ_TO_API = {
  stress:   'anxiety',
  sleep:    'sleep',
  focus:    'focus',
  mood:     'self_esteem',
  meditate: 'relax',
  growth:   'self_esteem'
}

const STRESS_TO_INT = { always: 5, often: 4, sometimes: 2, rarely: 1 }

const EXP_TO_API = {
  new: 'beginner', tried: 'beginner', occasional: 'intermediate', regular: 'advanced'
}

const PACE_TO_API = { fast: 'fast', balanced: 'medium', slow: 'slow' }

const DURATION_TO_MIN = { '2-5': 5, '5-10': 10, '10-20': 15, '20+': 25 }

export const useUserStore = defineStore('user', {
  state: () => ({
    firstName: '',
    avatar: 'avatar-1',
    memberSince: null,
    onboardingCompleted: false,
    objectives: [],
    stressFrequency: '',
    meditationExp: '',
    learningPace: '',
    dailyDuration: '',
    categories: [],
    language: 'en',
    darkMode: false
  }),

  getters: {
    displayName: (state) => state.firstName || 'Friend',
    isNewUser: (state) => !state.onboardingCompleted,
    preferredDurationSeconds: (state) => {
      const map = { '2-5': 300, '5-10': 600, '10-20': 1200, '20+': 1500 }
      return map[state.dailyDuration] || 600
    }
  },

  actions: {
    async fetchProfile() {
      try {
        const auth = useAuthStore()
        const data = await api.getProfile(auth.accessCode)
        if (data.profile) this._applyApiProfile(data.profile)
        return data.profile
      } catch (e) {
        console.warn('Failed to fetch profile:', e.message)
        return null
      }
    },

    _applyApiProfile(profile) {
      if (!profile) return
      if (profile.first_name)               this.firstName    = profile.first_name
      if (profile.avatar_code)              this.avatar       = profile.avatar_code
      if (profile.meditation_experience)    this.meditationExp  = profile.meditation_experience
      if (profile.pace)                     this.learningPace   = profile.pace
      if (profile.preferred_session_minutes) {
        const min = profile.preferred_session_minutes
        this.dailyDuration = min <= 5 ? '2-5' : min <= 10 ? '5-10' : min <= 20 ? '10-20' : '20+'
      }
      this.onboardingCompleted = true
      if (!this.memberSince) this.memberSince = new Date().toISOString()
    },

    async completeOnboarding(responses) {
      const auth = useAuthStore()

      // Update local state
      this.objectives      = responses.objectives
      this.stressFrequency = responses.stressFrequency
      this.meditationExp   = responses.meditationExp
      this.learningPace    = responses.learningPace
      this.dailyDuration   = responses.dailyDuration
      this.categories      = getCategoriesFromObjectives(responses.objectives)
      this.onboardingCompleted = true
      if (!this.memberSince) this.memberSince = new Date().toISOString()

      // Persist to backend
      const profilePayload = {
        objective:                 OBJ_TO_API[responses.objectives?.[0]] || 'relax',
        stress_level:              STRESS_TO_INT[responses.stressFrequency] || 3,
        meditation_experience:     EXP_TO_API[responses.meditationExp] || 'beginner',
        pace:                      PACE_TO_API[responses.learningPace] || 'medium',
        preferred_session_minutes: DURATION_TO_MIN[responses.dailyDuration] || 15,
        user_timezone:             Intl.DateTimeFormat().resolvedOptions().timeZone
      }
      if (this.firstName)       profilePayload.first_name  = this.firstName
      if (this.avatar !== 'avatar-1') profilePayload.avatar_code = this.avatar

      try {
        await api.updateProfile(auth.accessCode, profilePayload)
      } catch (e) {
        console.warn('Failed to save profile after onboarding:', e.message)
      }
    },

    setProfile(data) {
      Object.assign(this, data)
    },

    toggleDarkMode() {
      this.darkMode = !this.darkMode
      document.documentElement.setAttribute('data-theme', this.darkMode ? 'dark' : 'light')
    },

    setLanguage(lang) {
      this.language = lang
    }
  },

  persist: true
})
