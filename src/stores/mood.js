import { defineStore } from 'pinia'
import dayjs from 'dayjs'

export const useMoodStore = defineStore('mood', {
  state: () => ({
    todayMood: null,
    moodCheckedToday: false,
    lastCheckinDate: null,
    moodHistory: [] // [{ date: 'YYYY-MM-DD', mood: 'bright', emoji: '😊' }]
  }),

  getters: {
    todayKey: () => dayjs().format('YYYY-MM-DD'),
    last7Days: (state) => {
      const days = []
      for (let i = 6; i >= 0; i--) {
        const date = dayjs().subtract(i, 'day').format('YYYY-MM-DD')
        const entry = state.moodHistory.find(m => m.date === date)
        days.push({
          date,
          label: dayjs().subtract(i, 'day').format('ddd'),
          mood: entry?.mood || null,
          emoji: entry?.emoji || null,
          value: entry ? moodValues[entry.mood] : null
        })
      }
      return days
    }
  },

  actions: {
    checkIn(mood) {
      const today = dayjs().format('YYYY-MM-DD')
      const moodData = moodOptions.find(m => m.id === mood)

      this.todayMood = mood
      this.moodCheckedToday = true
      this.lastCheckinDate = today

      // Update or add to history
      const existingIdx = this.moodHistory.findIndex(m => m.date === today)
      const entry = { date: today, mood, emoji: moodData?.emoji || '😐', value: moodValues[mood] }

      if (existingIdx >= 0) {
        this.moodHistory[existingIdx] = entry
      } else {
        this.moodHistory.push(entry)
        // Keep only last 30 days
        if (this.moodHistory.length > 30) {
          this.moodHistory = this.moodHistory.slice(-30)
        }
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
  { id: 'low',     emoji: '😔', label: 'Low',     color: '#94a3b8' },
  { id: 'foggy',   emoji: '😐', label: 'Foggy',   color: '#64748b' },
  { id: 'okay',    emoji: '🙂', label: 'Okay',    color: '#38bdf8' },
  { id: 'bright',  emoji: '😊', label: 'Bright',  color: '#0ea5e9' },
  { id: 'glowing', emoji: '🤩', label: 'Glowing', color: '#f59e0b' }
]

export const moodValues = {
  low: 1, foggy: 2, okay: 3, bright: 4, glowing: 5
}
