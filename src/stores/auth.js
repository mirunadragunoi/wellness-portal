import { defineStore } from 'pinia'
import { getBrandConfig } from '@/config/brand'

// Mock valid access codes (replace with real API validation)
const VALID_CODES = ['WELLNESS2026', 'SERENITY01', 'CALM2026', 'PEACE001', 'DEMO123']

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    phone: null,
    token: null,
    lastApiBaseUrl: null
  }),

  actions: {
    async signup(phone, accessCode) {
      const brand = getBrandConfig()
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || brand.apiBaseUrl

      // Simulate API call
      await new Promise(r => setTimeout(r, 800))
      // Example for real backend integration:
      // await fetch(`${apiBaseUrl}/portal/signup`, { ... })

      const codeValid = VALID_CODES.includes(accessCode.toUpperCase().trim())
      if (!codeValid) {
        throw new Error('INVALID_CODE')
      }

      this.phone = phone
      this.token = 'mock-token-' + Date.now()
      this.isLoggedIn = true
      this.lastApiBaseUrl = apiBaseUrl
      return true
    },

    async login(accessCode) {
      const brand = getBrandConfig()
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || brand.apiBaseUrl

      await new Promise(r => setTimeout(r, 800))
      // Example for real backend integration:
      // await fetch(`${apiBaseUrl}/portal/login`, { ... })

      const codeValid = VALID_CODES.includes(accessCode.toUpperCase().trim())
      if (!codeValid) {
        throw new Error('INVALID_CODE')
      }

      this.token = 'mock-token-' + Date.now()
      this.isLoggedIn = true
      this.lastApiBaseUrl = apiBaseUrl
      return true
    },

    logout() {
      this.$reset()
    }
  },

  persist: true
})
