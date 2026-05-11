import { defineStore } from 'pinia'
import { api } from '@/services/api'
import { useAuthStore } from '@/stores/auth'
import { estimateReadMinutes } from '@/utils/articleContent'
import { hydrateClientMediaDurations } from '@/utils/audioDuration'
import { coalesceProductImageUrl, normalizeProductImageUrl } from '@/utils/productImageUrl'
import { normalizeLabelKey } from '@/utils/i18nLabels'

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

// Numeric store.product.type → frontend string type (must match your DB)
const TYPE_MAP = {
  1: 'meditation',
  2: 'sleep',
  3: 'article', // DB: text articles (Learn)
  4: 'breathing',
  5: 'practice', // DB: yoga / video practice
  6: 'meditation' // DB: MP3 / guided audio — same bucket as meditation in Explore + player
}

const CATEGORY_KEYWORDS = ['stress', 'sleep', 'focus', 'anxiety', 'mindfulness', 'energy', 'relax', 'calm']
const CATEGORY_ALIASES = {
  motivational_speeches: 'motivational_speeches',
  motivational_speech: 'motivational_speeches',
  motivational: 'motivational_speeches'
}

function productCategory(p, fallbackType) {
  const rawCategory = p.category_label || p.categoryLabel || p.category || ''
  const normalizedCategory = normalizeLabelKey(rawCategory)
  if (CATEGORY_ALIASES[normalizedCategory]) return CATEGORY_ALIASES[normalizedCategory]
  if (CATEGORY_KEYWORDS.includes(normalizedCategory)) return normalizedCategory

  const codeLC = (p.code || '').toLowerCase()
  const titleLC = (p.title || '').toLowerCase()
  return CATEGORY_KEYWORDS.find(c => codeLC.includes(c) || titleLC.includes(c)) || fallbackType
}

/** Parse track length from API (seconds). Backend should expose e.g. duration_seconds on product JSON. */
function productDurationSeconds(p) {
  const raw =
    p.duration_seconds ??
    p.duration ??
    p.audio_duration_seconds ??
    p.length_seconds
  if (raw == null || raw === '') return 0
  const n = Number(raw)
  if (!Number.isFinite(n) || n < 0) return 0
  return Math.round(n)
}

export function mapProduct(p) {
  const type = TYPE_MAP[p.type] || 'meditation'
  const category = productCategory(p, type)
  const descriptionLong = p.description_long || ''
  const descriptionShort = p.description_short || ''

  const durationSec = productDurationSeconds(p)

  // Prefer icon_small when present (many catalogs only fill small assets); skip junk placeholders.
  const thumbRaw = coalesceProductImageUrl(p, [
    'icon_small', 'iconSmall', 'icon_large', 'iconLarge',
    'banner_small', 'bannerSmall', 'banner_medium', 'bannerMedium',
    'banner_large', 'bannerLarge'
  ])
  const bannerRaw = coalesceProductImageUrl(p, [
    'banner_large', 'bannerLarge', 'banner_medium', 'bannerMedium',
    'banner_small', 'bannerSmall',
    'icon_large', 'iconLarge', 'icon_small', 'iconSmall'
  ])

  return {
    id: p.id,
    rawType: p.type,
    type,
    category,
    title: p.title,
    description: descriptionLong || descriptionShort || '',
    descriptionShort,
    descriptionLong,
    readTimeMinutes:
      type === 'article'
        ? estimateReadMinutes(descriptionLong || descriptionShort)
        : 0,
    instructions: p.instructions || '',
    duration: durationSec,
    level: 'all',
    thumbnail: normalizeProductImageUrl(thumbRaw),
    banner: normalizeProductImageUrl(bannerRaw),
    thumbnailGradient: getGradient(p.id),
    audioUrl: p.url || null,
    videoPresentation: p.video_presentation || null,
    downloadUrl: type === 'article' ? (p.pdf_url || p.url || null) : null,
    rating: p.rating_points,
    ratingCount: p.rating_count,
    code: p.code,
    dbCategoryLabel: p.category_label || p.categoryLabel || p.category || null,
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
    async fetchProducts() {
      if (this.loading) return
      this.loading = true
      try {
        const auth = useAuthStore()
        const data = await api.getProducts(auth.accessCode)
        this.items = (data.data || []).map(mapProduct)
        this.loaded = true
        void hydrateClientMediaDurations(this.items)
      } finally {
        this.loading = false
      }
    },

    async fetchProductById(id) {
      const auth = useAuthStore()
      const data = await api.getProduct(auth.accessCode, id)
      const mapped = mapProduct(data.data)
      const idx = this.items.findIndex(p => String(p.id) === String(mapped.id))
      if (idx >= 0) this.items[idx] = mapped
      else this.items.push(mapped)
      void hydrateClientMediaDurations([mapped])
      return mapped
    }
  }
})
