import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'

export function useGreeting(firstName) {
  const { t } = useI18n()
  const hour  = dayjs().hour()

  const period = computed(() => {
    if (hour >= 5  && hour < 12) return 'morning'
    if (hour >= 12 && hour < 17) return 'afternoon'
    if (hour >= 17 && hour < 21) return 'evening'
    return 'night'
  })

  const greeting = computed(() => {
    const name = (typeof firstName === 'object' ? firstName.value : firstName) || 'Friend'
    return t(`home.greeting_${period.value}`, { name })
  })

  const subtitles = [
    t('home.subtitles[0]') || 'Take a moment for yourself today.',
    t('home.subtitles[1]') || 'Even 5 minutes can change your day.',
    t('home.subtitles[2]') || 'Your calm is closer than you think.'
  ]

  const subtitle = subtitles[dayjs().date() % subtitles.length]

  return { greeting, period, subtitle }
}

// ═══════════════════════════════════
// useMomentOfDay
// ═══════════════════════════════════
import { useProductsStore } from '@/stores/products'

export function useMomentOfDay() {
  const hour           = dayjs().hour()
  const productsStore  = useProductsStore()

  let categoryPriority
  let label

  if (hour >= 5 && hour < 12) {
    categoryPriority = ['energy', 'focus', 'mindfulness']
    label = 'Morning Session'
  } else if (hour >= 12 && hour < 17) {
    categoryPriority = ['stress', 'focus', 'mindfulness']
    label = 'Midday Break'
  } else if (hour >= 17 && hour < 21) {
    categoryPriority = ['stress', 'anxiety', 'mindfulness']
    label = 'Evening Unwind'
  } else {
    categoryPriority = ['sleep', 'mindfulness']
    label = 'Sleep Preparation'
  }

  const session = computed(() => {
    const pool = productsStore.sessions
    for (const cat of categoryPriority) {
      const match = pool.find(s => s.category === cat && s.type === 'meditation')
      if (match) return match
    }
    return pool[0] || null
  })

  return { session, label }
}

// ═══════════════════════════════════
// useRecommendations
// ═══════════════════════════════════
import { useUserStore }     from '@/stores/user'
import { useMoodStore }     from '@/stores/mood'

export function useRecommendations(limit = 6) {
  const userStore     = useUserStore()
  const moodStore     = useMoodStore()
  const productsStore = useProductsStore()

  const recommended = computed(() => {
    let pool = [...productsStore.sessions]

    if (userStore.meditationExp === 'new' || userStore.meditationExp === 'tried' || userStore.meditationExp === 'beginner') {
      pool = pool.filter(s => s.level === 'beginner' || s.level === 'all')
    }

    const mood = moodStore.todayMood
    let priorityCategories = (userStore.categories || []).map(c => c.id || c)

    if (mood === 'low' || mood === 'foggy') {
      priorityCategories = ['stress', 'anxiety', 'mindfulness', ...priorityCategories]
    } else if (mood === 'bright' || mood === 'glowing') {
      priorityCategories = ['focus', 'energy', ...priorityCategories]
    }

    pool.sort((a, b) => {
      const aIdx = priorityCategories.indexOf(a.category)
      const bIdx = priorityCategories.indexOf(b.category)
      if (aIdx !== bIdx) {
        if (aIdx === -1) return 1
        if (bIdx === -1) return -1
        return aIdx - bIdx
      }
      return (b.popular ? 1 : 0) - (a.popular ? 1 : 0)
    })

    return pool.slice(0, limit)
  })

  return { recommended }
}
