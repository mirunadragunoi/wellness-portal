// ═══════════════════════════════════════════════
// PHRASES OF THE DAY
// ═══════════════════════════════════════════════

export const phrases = [
  { id: 1, text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { id: 2, text: "The present moment is the only moment available to us, and it is the door to all moments.", author: "Thich Nhat Hanh" },
  { id: 3, text: "You can't stop the waves, but you can learn to surf.", author: "Jon Kabat-Zinn" },
  { id: 4, text: "Peace comes from within. Do not seek it without.", author: "Buddha" },
  { id: 5, text: "The mind is like water. When it is turbulent, it is difficult to see. When it is calm, everything becomes clear.", author: "Prasad Mahes" },
  { id: 6, text: "Breathe. Let go. And remind yourself that this very moment is the only one you know you have for sure.", author: "Oprah Winfrey" },
  { id: 7, text: "Almost everything will work again if you unplug it for a few minutes — including you.", author: "Anne Lamott" },
  { id: 8, text: "You are the sky. Everything else is just the weather.", author: "Pema Chödrön" },
  { id: 9, text: "The secret of health for both mind and body is not to mourn for the past, not to worry about the future, but to live the present moment wisely and earnestly.", author: "Buddha" },
  { id: 10, text: "Nothing can dim the light that shines from within.", author: "Maya Angelou" },
  { id: 11, text: "Rest and self-care are so important. When you take time to replenish your spirit, it allows you to serve others from the overflow.", author: "Eleanor Brownn" },
  { id: 12, text: "The greatest weapon against stress is our ability to choose one thought over another.", author: "William James" },
  { id: 13, text: "Tension is who you think you should be. Relaxation is who you are.", author: "Chinese Proverb" },
  { id: 14, text: "You must be the change you wish to see in the world.", author: "Mahatma Gandhi" },
  { id: 15, text: "In today's rush, we all think too much, seek too much, want too much, and forget about the joy of just being.", author: "Eckhart Tolle" },
  { id: 16, text: "Wherever you are, be all there.", author: "Jim Elliot" },
  { id: 17, text: "A calm mind brings inner strength and self-confidence.", author: "Dalai Lama" },
  { id: 18, text: "When you realize there is nothing lacking, the whole world belongs to you.", author: "Lao Tzu" },
  { id: 19, text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.", author: "Buddha" },
  { id: 20, text: "The quieter you become, the more you can hear.", author: "Ram Dass" }
]

export function getPhraseOfDay() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000)
  return phrases[dayOfYear % phrases.length]
}

// ═══════════════════════════════════════════════
// BREATHING EXERCISES CONFIG
// ═══════════════════════════════════════════════

export const breathingTypes = {
  box: {
    id: 'box',
    title: 'Box Breathing',
    description: '4-4-4-4 pattern for focus and calm',
    pattern: [
      { phase: 'inhale', duration: 4, label: 'Inhale' },
      { phase: 'hold',   duration: 4, label: 'Hold' },
      { phase: 'exhale', duration: 4, label: 'Exhale' },
      { phase: 'pause',  duration: 4, label: 'Pause' }
    ],
    availableDurations: [60, 120, 180, 300],
    color: '#0ea5e9',
    gradient: 'linear-gradient(135deg, #bae6fd, #0284c7)'
  },
  '4-7-8': {
    id: '4-7-8',
    title: '4-7-8 Breathing',
    description: 'Powerful technique for sleep and anxiety',
    pattern: [
      { phase: 'inhale', duration: 4, label: 'Inhale' },
      { phase: 'hold',   duration: 7, label: 'Hold' },
      { phase: 'exhale', duration: 8, label: 'Exhale' }
    ],
    availableDurations: [60, 120, 180, 300],
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg, #ede9fe, #7c3aed)'
  },
  belly: {
    id: 'belly',
    title: 'Deep Belly Breathing',
    description: 'Activate your natural relaxation response',
    pattern: [
      { phase: 'inhale', duration: 5, label: 'Inhale slowly' },
      { phase: 'hold',   duration: 2, label: 'Feel your belly expand' },
      { phase: 'exhale', duration: 6, label: 'Exhale fully' }
    ],
    availableDurations: [60, 120, 180, 300],
    color: '#16a34a',
    gradient: 'linear-gradient(135deg, #d4e6d0, #16a34a)'
  },
  sos: {
    id: 'sos',
    title: 'SOS Breathing',
    description: 'Quick 1-minute relief for acute stress',
    pattern: [
      { phase: 'inhale', duration: 4, label: 'Inhale' },
      { phase: 'hold',   duration: 1, label: 'Hold' },
      { phase: 'exhale', duration: 6, label: 'Exhale slowly' }
    ],
    availableDurations: [60],
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #fee2e2, #ef4444)'
  }
}

// ═══════════════════════════════════════════════
// CATEGORIES
// ═══════════════════════════════════════════════

export const categories = [
  { id: 'stress',      label: 'Stress',      emoji: '🌊', color: '#0ea5e9', bg: '#e0f2fe' },
  { id: 'anxiety',     label: 'Anxiety',     emoji: '🌸', color: '#8b5cf6', bg: '#ede9fe' },
  { id: 'sleep',       label: 'Sleep',       emoji: '🌙', color: '#3730a3', bg: '#e0e7ff' },
  { id: 'focus',       label: 'Focus',       emoji: '🎯', color: '#b45309', bg: '#fef3c7' },
  { id: 'mindfulness', label: 'Mindfulness', emoji: '🧘', color: '#16a34a', bg: '#d4e6d0' },
  { id: 'energy',      label: 'Energy',      emoji: '⚡', color: '#f59e0b', bg: '#fef9c3' }
]

// Map onboarding objectives → categories
export const objectivesToCategories = {
  stress:  ['stress', 'anxiety'],
  sleep:   ['sleep'],
  focus:   ['focus', 'energy'],
  mood:    ['mindfulness', 'stress'],
  meditate: ['mindfulness'],
  growth:  ['mindfulness', 'focus']
}

export function getCategoryById(id) {
  return categories.find(c => c.id === id)
}

export function getCategoriesFromObjectives(objectives = []) {
  const ids = new Set()
  objectives.forEach(obj => {
    const cats = objectivesToCategories[obj] || []
    cats.forEach(c => ids.add(c))
  })
  return categories.filter(c => ids.has(c.id))
}
