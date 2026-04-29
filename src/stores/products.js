import { defineStore } from 'pinia'
import { api } from '@/services/api'
import { useAuthStore } from '@/stores/auth'

const GRADIENTS = [
  'linear-gradient(135deg, #bae6fd, #93c5fd)',
  'linear-gradient(135deg, #fef3c7, #fde68a)',
  'linear-gradient(135deg, #d4e6d0, #a7c4a0)',
  'linear-gradient(135deg, #e9d5ff, #c4b5fd)',
  'linear-gradient(135deg, #fce7f3, #f9a8d4)',
  'linear-gradient(135deg, #d1fae5, #6ee7b7)',
  'linear-gradient(135deg, #fee2e2, #fca5a5)',
  'linear-gradient(135deg, #e0e7ff, #a5b4fc)'
]

function getGradient(id) {
  const n = typeof id === 'number' ? id : String(id).split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return GRADIENTS[n % GRADIENTS.length]
}

// Numeric backend product type → frontend string type
// Adjust these values to match your backend's product type definitions
const TYPE_MAP = {
  1: 'meditation',
  2: 'sleep',
  3: 'breathing',
  4: 'article',
  5: 'focus',
  6: 'energy'
}

const CATEGORY_KEYWORDS = ['stress', 'sleep', 'focus', 'anxiety', 'mindfulness', 'energy', 'relax', 'calm']

export function mapProduct(p) {
  const type = TYPE_MAP[p.type] || 'meditation'
  const codeLC = (p.code || '').toLowerCase()
  const titleLC = (p.title || '').toLowerCase()
  const category = CATEGORY_KEYWORDS.find(c => codeLC.includes(c) || titleLC.includes(c)) || type

  return {
    id: p.id,
    type,
    category,
    title: p.title,
    description: p.description_long || p.description_short || '',
    descriptionShort: p.description_short || '',
    instructions: p.instructions || '',
    duration: 0,
    level: 'all',
    thumbnail: p.icon_large || p.icon_small || null,
    thumbnailGradient: getGradient(p.id),
    audioUrl: p.url || null,
    rating: p.rating_points,
    ratingCount: p.rating_count,
    code: p.code,
    popular: (p.rating_points || 0) >= 4,
    featured: (p.rating_points || 0) >= 4.5,
    tags: []
  }
}

export const useProductsStore = defineStore('products', {
  state: () => ({
    items: [],
    loading: false,
    loaded: false
  }),

  getters: {
    sessions: (state) => state.items.filter(p => p.type !== 'article'),
    articles: (state) => state.items.filter(p => p.type === 'article'),
    getById: (state) => (id) => state.items.find(p => String(p.id) === String(id))
  },

  actions: {
    async fetchProducts(language = 'en') {
      if (this.loading) return
      this.loading = true
      try {
        const auth = useAuthStore()
        const data = await api.getProducts(auth.accessCode, language)
        this.items = (data.data || []).map(mapProduct)
        this.loaded = true
      } finally {
        this.loading = false
      }
    },

    async fetchProductById(id, language = 'en') {
      const auth = useAuthStore()
      const data = await api.getProduct(auth.accessCode, id, language)
      const mapped = mapProduct(data.data)
      const idx = this.items.findIndex(p => String(p.id) === String(mapped.id))
      if (idx >= 0) this.items[idx] = mapped
      else this.items.push(mapped)
      return mapped
    }
  }
})
