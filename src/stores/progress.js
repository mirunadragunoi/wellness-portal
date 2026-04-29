import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import { api } from '@/services/api'
import { useAuthStore } from '@/stores/auth'

export const useProgressStore = defineStore('progress', {
  state: () => ({
    completedSessions: [],
    streakDays: 0,
    longestStreak: 0,
    lastSessionDate: null,
    favorites: [],
    apiStats: null
  }),

  getters: {
    totalSessions: (state) => state.apiStats?.total_sessions ?? state.completedSessions.length,

    totalTimeSeconds: (state) =>
      state.apiStats?.total_time_seconds
        ?? state.completedSessions.reduce((sum, s) => sum + (s.duration || 0), 0),

    totalTimeFormatted: (state) => {
      const total = state.apiStats?.total_time_seconds
        ?? state.completedSessions.reduce((sum, s) => sum + (s.duration || 0), 0)
      const hours   = Math.floor(total / 3600)
      const minutes = Math.floor((total % 3600) / 60)
      if (hours > 0) return `${hours}h ${minutes}m`
      return `${minutes}m`
    },

    // These getters are used by ProgressStatsGrid — read from apiStats when available
    currentStreak:    (state) => state.apiStats?.current_streak  ?? state.streakDays,
    longestStreakVal:  (state) => state.apiStats?.longest_streak  ?? state.longestStreak,

    recentSessions: (state) =>
      [...state.completedSessions]
        .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
        .slice(0, 20),

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

    isFavorite: (state) => (id) =>
      state.favorites.some(f => String(f) === String(id))
  },

  actions: {
    async recordSession(session) {
      const today = dayjs().format('YYYY-MM-DD')

      this.completedSessions.push({
        id:          session.id,
        title:       session.title,
        type:        session.type,
        category:    session.category,
        duration:    session.duration,
        completedAt: new Date().toISOString()
      })

      const last = this.lastSessionDate
      if (!last) {
        this.streakDays = 1
      } else if (dayjs(last).isSame(dayjs().subtract(1, 'day'), 'day')) {
        this.streakDays++
      } else if (!dayjs(last).isSame(dayjs(), 'day')) {
        this.streakDays = 1
      }
      if (this.streakDays > this.longestStreak) this.longestStreak = this.streakDays
      this.lastSessionDate = today

      try {
        const auth = useAuthStore()
        await api.completeSession(auth.accessCode, {
          product_id:           session.id,
          duration_seconds:     session.duration || 0,
          completed:            true,
          completed_local_date: today
        })
        // Refresh stats after recording
        await this.fetchStats()
      } catch (e) {
        console.warn('Failed to record session:', e.message)
      }
    },

    async fetchStats() {
      try {
        const auth = useAuthStore()
        const data = await api.getProgressStats(auth.accessCode)
        if (data.stats) {
          this.apiStats     = data.stats
          this.streakDays   = data.stats.current_streak
          this.longestStreak = data.stats.longest_streak
        }
      } catch (e) {
        console.warn('Failed to fetch progress stats:', e.message)
      }
    },

    async fetchHistory() {
      try {
        const auth = useAuthStore()
        const data = await api.getProgressHistory(auth.accessCode)
        if (data.data) {
          this.completedSessions = data.data.map(s => ({
            id:          s.product_id,
            title:       s.product_title,
            type:        s.product_type,
            category:    null,
            duration:    s.duration_seconds,
            completedAt: s.completed_at
          }))
        }
      } catch (e) {
        console.warn('Failed to fetch progress history:', e.message)
      }
    },

    async toggleFavorite(productId) {
      const id = productId
      const idx = this.favorites.findIndex(f => String(f) === String(id))
      // Optimistic toggle
      if (idx >= 0) this.favorites.splice(idx, 1)
      else this.favorites.push(id)

      try {
        const auth = useAuthStore()
        const data = await api.toggleFavorite(auth.accessCode, productId)
        // Reconcile with server truth
        const isNowFav = data.is_favorite
        const localIdx = this.favorites.findIndex(f => String(f) === String(id))
        if (isNowFav && localIdx === -1) this.favorites.push(id)
        else if (!isNowFav && localIdx !== -1) this.favorites.splice(localIdx, 1)
      } catch (e) {
        console.warn('Failed to toggle favorite:', e.message)
        // Revert optimistic update
        const revertIdx = this.favorites.findIndex(f => String(f) === String(id))
        if (idx >= 0 && revertIdx === -1) this.favorites.push(id)
        else if (idx === -1 && revertIdx !== -1) this.favorites.splice(revertIdx, 1)
      }
    },

    async fetchFavorites() {
      try {
        const auth = useAuthStore()
        const data = await api.getFavorites(auth.accessCode)
        if (data.data) this.favorites = data.data.map(f => f.product_id)
      } catch (e) {
        console.warn('Failed to fetch favorites:', e.message)
      }
    },

    syncStreak() {
      if (!this.lastSessionDate) return
      const diff = dayjs().diff(dayjs(this.lastSessionDate), 'day')
      if (diff > 1) this.streakDays = 0
    }
  },

  persist: true
})
