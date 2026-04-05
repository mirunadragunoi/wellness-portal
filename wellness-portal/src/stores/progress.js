import { defineStore } from 'pinia'
import dayjs from 'dayjs'

export const useProgressStore = defineStore('progress', {
  state: () => ({
    completedSessions: [], // [{ id, title, type, duration, completedAt }]
    streakDays: 0,
    longestStreak: 0,
    lastSessionDate: null,
    favorites: []          // session ids
  }),

  getters: {
    totalSessions: (state) => state.completedSessions.length,

    totalTimeSeconds: (state) => state.completedSessions.reduce((sum, s) => sum + (s.duration || 0), 0),

    totalTimeFormatted: (state) => {
      const total = state.completedSessions.reduce((sum, s) => sum + (s.duration || 0), 0)
      const hours   = Math.floor(total / 3600)
      const minutes = Math.floor((total % 3600) / 60)
      if (hours > 0) return `${hours}h ${minutes}m`
      return `${minutes}m`
    },

    recentSessions: (state) => {
      return [...state.completedSessions]
        .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
        .slice(0, 20)
    },

    weeklyDays: (state) => {
      const days = []
      for (let i = 6; i >= 0; i--) {
        const date = dayjs().subtract(i, 'day').format('YYYY-MM-DD')
        const completed = state.completedSessions.some(s =>
          dayjs(s.completedAt).format('YYYY-MM-DD') === date
        )
        days.push({ date, label: dayjs().subtract(i, 'day').format('dd'), completed })
      }
      return days
    },

    isFavorite: (state) => (id) => state.favorites.includes(id)
  },

  actions: {
    recordSession(session) {
      const today = dayjs().format('YYYY-MM-DD')

      this.completedSessions.push({
        id:          session.id,
        title:       session.title,
        type:        session.type,
        category:    session.category,
        duration:    session.duration,
        completedAt: new Date().toISOString()
      })

      // Streak logic
      const last = this.lastSessionDate
      if (!last) {
        this.streakDays = 1
      } else if (dayjs(last).isSame(dayjs().subtract(1, 'day'), 'day')) {
        this.streakDays++
      } else if (!dayjs(last).isSame(dayjs(), 'day')) {
        this.streakDays = 1
      }

      if (this.streakDays > this.longestStreak) {
        this.longestStreak = this.streakDays
      }

      this.lastSessionDate = today
    },

    toggleFavorite(sessionId) {
      const idx = this.favorites.indexOf(sessionId)
      if (idx >= 0) {
        this.favorites.splice(idx, 1)
      } else {
        this.favorites.push(sessionId)
      }
    },

    syncStreak() {
      if (!this.lastSessionDate) return
      const today = dayjs()
      const last  = dayjs(this.lastSessionDate)
      const diff  = today.diff(last, 'day')
      if (diff > 1) {
        this.streakDays = 0
      }
    }
  },

  persist: true
})
