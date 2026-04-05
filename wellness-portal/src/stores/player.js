import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', {
  state: () => ({
    currentSession: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.8,
    isVisible: false,
    isExpanded: false,
    showPostSession: false
  }),

  getters: {
    progress: (state) => {
      if (!state.duration) return 0
      return (state.currentTime / state.duration) * 100
    },
    formattedCurrent: (state) => formatTime(state.currentTime),
    formattedDuration: (state) => formatTime(state.duration),
    formattedRemaining: (state) => formatTime(state.duration - state.currentTime)
  },

  actions: {
    loadSession(session) {
      this.currentSession = session
      this.currentTime = 0
      this.duration = session.duration || 0
      this.isPlaying = false
      this.isVisible = true
      this.isExpanded = false
      this.showPostSession = false
    },

    play()  { this.isPlaying = true },
    pause() { this.isPlaying = false },

    toggle() {
      this.isPlaying = !this.isPlaying
    },

    seek(seconds) {
      this.currentTime = Math.max(0, Math.min(seconds, this.duration))
    },

    seekByPercent(pct) {
      this.seek((pct / 100) * this.duration)
    },

    skipBack()    { this.seek(this.currentTime - 15) },
    skipForward() { this.seek(this.currentTime + 15) },

    setVolume(v) {
      this.volume = Math.max(0, Math.min(1, v))
    },

    tick(seconds) {
      this.currentTime = seconds
    },

    complete() {
      this.isPlaying = false
      this.showPostSession = true
    },

    close() {
      this.isPlaying = false
      this.isVisible = false
      this.currentSession = null
      this.currentTime = 0
    }
  }
})

function formatTime(s) {
  const seconds = Math.floor(s || 0)
  const m = Math.floor(seconds / 60)
  const sec = seconds % 60
  return `${m}:${sec.toString().padStart(2, '0')}`
}
