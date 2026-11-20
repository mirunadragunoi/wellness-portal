import { defineStore } from 'pinia'
import { api } from '@/services/api'
import { IS_APP, native } from '@/config/platform'

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
      // App: copia de încredere a sesiunii stă în Keystore/Keychain, nu doar în localStorage.
      if (IS_APP) {
        native()?.session.save({ accessCode: code, country: data.country || '', savedAt: new Date().toISOString() })
          .catch(e => console.error('[app] session.save', e))
      }
      return data // { portal, country, profile }
    },

    logout() {
      this.$reset()
      if (IS_APP) native()?.session.clear().catch(() => {})
    }
  },

  persist: true
})
