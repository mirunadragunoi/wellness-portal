import { defineStore } from 'pinia'
import { api } from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    accessCode: null,
    portal: null
  }),

  actions: {
    async login(accessCode) {
      const code = accessCode.toUpperCase().trim()
      const data = await api.login(code)
      this.accessCode = code
      this.portal = data.portal
      this.isLoggedIn = true
      return data // { portal, country, profile }
    },

    logout() {
      this.$reset()
    }
  },

  persist: true
})
