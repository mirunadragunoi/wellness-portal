import { defineStore } from 'pinia'
import { getCategoriesFromObjectives } from '@/data/phrases'

export const useUserStore = defineStore('user', {
  state: () => ({
    firstName: '',
    avatar: 'avatar-1',
    memberSince: null,
    onboardingCompleted: false,
    // Onboarding responses
    objectives: [],
    stressFrequency: '',
    meditationExp: '',
    learningPace: '',
    dailyDuration: '',
    // Derived
    categories: [],
    language: 'en',
    darkMode: false
  }),

  getters: {
    displayName: (state) => state.firstName || 'Friend',
    isNewUser: (state) => !state.onboardingCompleted,
    preferredDurationSeconds: (state) => {
      const map = {
        '2-5':   300,
        '5-10':  600,
        '10-20': 1200,
        '20+':   1500
      }
      return map[state.dailyDuration] || 600
    }
  },

  actions: {
    setProfile(data) {
      Object.assign(this, data)
    },

    completeOnboarding(responses) {
      this.objectives     = responses.objectives
      this.stressFrequency = responses.stressFrequency
      this.meditationExp  = responses.meditationExp
      this.learningPace   = responses.learningPace
      this.dailyDuration  = responses.dailyDuration
      this.categories     = getCategoriesFromObjectives(responses.objectives)
      this.onboardingCompleted = true
      if (!this.memberSince) {
        this.memberSince = new Date().toISOString()
      }
    },

    toggleDarkMode() {
      this.darkMode = !this.darkMode
      document.documentElement.setAttribute(
        'data-theme',
        this.darkMode ? 'dark' : 'light'
      )
    },

    setLanguage(lang) {
      this.language = lang
    }
  },

  persist: true
})
