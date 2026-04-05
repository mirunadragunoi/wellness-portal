import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
  state: () => ({
    sosOpen: false,
    toasts: [],
    _toastId: 0
  }),

  actions: {
    openSOS()  { this.sosOpen = true },
    closeSOS() { this.sosOpen = false },

    showToast(message, type = 'success', duration = 3000) {
      const id = ++this._toastId
      this.toasts.push({ id, message, type })
      setTimeout(() => this.removeToast(id), duration)
      return id
    },

    removeToast(id) {
      const idx = this.toasts.findIndex(t => t.id === id)
      if (idx >= 0) this.toasts.splice(idx, 1)
    }
  }
})
