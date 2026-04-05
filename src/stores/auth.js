import { defineStore } from 'pinia'

// Mock valid access codes (replace with real API validation)
const VALID_CODES = ['WELLNESS2026', 'SERENITY01', 'CALM2026', 'PEACE001', 'DEMO123']

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    phone: null,
    token: null
  }),

  actions: {
    async signup(phone, accessCode) {
      // Simulate API call
      await new Promise(r => setTimeout(r, 800))

      const codeValid = VALID_CODES.includes(accessCode.toUpperCase().trim())
      if (!codeValid) {
        throw new Error('INVALID_CODE')
      }

      this.phone = phone
      this.token = 'mock-token-' + Date.now()
      this.isLoggedIn = true
      return true
    },

    async login(phone, accessCode) {
      await new Promise(r => setTimeout(r, 800))

      const codeValid = VALID_CODES.includes(accessCode.toUpperCase().trim())
      if (!codeValid) {
        throw new Error('INVALID_CODE')
      }

      this.phone = phone
      this.token = 'mock-token-' + Date.now()
      this.isLoggedIn = true
      return true
    },

    logout() {
      this.$reset()
    }
  },

  persist: true
})
