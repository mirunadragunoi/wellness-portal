import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import { MOOD_ICONS } from '@/constants/appIcons'

export const useMoodStore = defineStore('mood', {
  state: () => ({
    todayMood: null,
    moodCheckedToday: false,
    lastCheckinDate: null,
    moodHistory: [] // [{ date, mood, value }]
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
    checkIn(mood) {
      const today = dayjs().format('YYYY-MM-DD')
      const moodData = moodOptions.find(m => m.id === mood)

      this.todayMood = mood
      this.moodCheckedToday = true
      this.lastCheckinDate = today

      // Update or add to history
      const existingIdx = this.moodHistory.findIndex(m => m.date === today)
      const entry = { date: today, mood, value: moodValues[mood] }

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
  { id: 'low',     icon: MOOD_ICONS.low,     label: 'Low',     color: '#94a3b8' },
  { id: 'foggy',   icon: MOOD_ICONS.foggy,   label: 'Foggy',   color: '#64748b' },
  { id: 'okay',    icon: MOOD_ICONS.okay,    label: 'Okay',    color: '#38bdf8' },
  { id: 'bright',  icon: MOOD_ICONS.bright,  label: 'Bright',  color: '#0ea5e9' },
  { id: 'glowing', icon: MOOD_ICONS.glowing, label: 'Glowing', color: '#f59e0b' }
]

export const moodValues = {
  low: 1, foggy: 2, okay: 3, bright: 4, glowing: 5
}
