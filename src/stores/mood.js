import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import { MOOD_ICONS } from '@/constants/appIcons'
import { api } from '@/services/api'
import { useAuthStore } from '@/stores/auth'

function scoreToMood(score) {
  const map = { 1: 'low', 2: 'foggy', 3: 'okay', 4: 'bright', 5: 'glowing' }
  return map[score] || 'okay'
}

export const useMoodStore = defineStore('mood', {
  state: () => ({
    todayMood: null,
    moodCheckedToday: false,
    lastCheckinDate: null,
    moodHistory: []
  }),

  getters: {
    todayKey: () => dayjs().format('YYYY-MM-DD'),
    last7Days: (state) => {
      const days = []
      for (let i = 6; i >= 0; i--) {
        const date = dayjs().subtract(i, 'day').format('YYYY-MM-DD')
        const entry = state.moodHistory.find(m => m.date === date)
        const opt = entry?.mood ? moodOptions.find(m => m.id === entry.mood) : null
        days.push({
          date,
          label: dayjs().subtract(i, 'day').format('ddd'),
          mood: entry?.mood || null,
          icon: opt?.icon || null,
          value: entry ? moodValues[entry.mood] : null
        })
      }
      return days
    }
  },

  actions: {
    async checkIn(mood) {
      const today = dayjs().format('YYYY-MM-DD')
      const score = moodValues[mood] || 3

      this.todayMood = mood
      this.moodCheckedToday = true
      this.lastCheckinDate = today

      const existingIdx = this.moodHistory.findIndex(m => m.date === today)
      const entry = { date: today, mood, value: score }
      if (existingIdx >= 0) {
        this.moodHistory[existingIdx] = entry
      } else {
        this.moodHistory.push(entry)
        if (this.moodHistory.length > 30) this.moodHistory = this.moodHistory.slice(-30)
      }

      try {
        const auth = useAuthStore()
        await api.saveMood(auth.accessCode, score, mood)
      } catch (e) {
        console.warn('Failed to save mood:', e.message)
      }
    },

    async fetchHistory() {
      try {
        const auth = useAuthStore()
        const data = await api.getMoodHistory(auth.accessCode, 30)
        if (data.data) {
          for (const item of data.data) {
            const date = dayjs(item.recorded_at).format('YYYY-MM-DD')
            const mood = item.mood_tag || scoreToMood(item.mood_score)
            const entry = { date, mood, value: item.mood_score }
            const idx = this.moodHistory.findIndex(m => m.date === date)
            if (idx >= 0) this.moodHistory[idx] = entry
            else this.moodHistory.push(entry)
          }
          this.moodHistory = this.moodHistory.slice(-30)
        }
      } catch (e) {
        console.warn('Failed to fetch mood history:', e.message)
      }
    },

    syncDay() {
      const today = dayjs().format('YYYY-MM-DD')
      if (this.lastCheckinDate !== today) {
        this.todayMood = null
        this.moodCheckedToday = false
      }
    }
  },

  persist: true
})

export const moodOptions = [
  { id: 'low',     icon: MOOD_ICONS.low,     label: 'Low',     color: '#94a3b8' },
  { id: 'foggy',   icon: MOOD_ICONS.foggy,   label: 'Foggy',   color: '#64748b' },
  { id: 'okay',    icon: MOOD_ICONS.okay,    label: 'Okay',    color: '#38bdf8' },
  { id: 'bright',  icon: MOOD_ICONS.bright,  label: 'Bright',  color: '#0ea5e9' },
  { id: 'glowing', icon: MOOD_ICONS.glowing, label: 'Glowing', color: '#f59e0b' }
]

export const moodValues = {
  low: 1, foggy: 2, okay: 3, bright: 4, glowing: 5
}
