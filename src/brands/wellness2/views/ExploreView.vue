<template>
  <div class="explore-view">
    <div class="explore-wrap">
      <header class="page-header">
        <h1 class="page-title">{{ t('explore.title') }}</h1>
        <p class="page-sub">Discover meditations, sleep stories, soundscapes, and more.</p>
      </header>

      <div class="search-bar">
        <Icon icon="lucide:search" class="app-icon app-icon--sm search-icon" />
        <input v-model="query" class="search-input" type="text" placeholder="Search meditations, topics..." />
      </div>

      <div class="filters">
        <button
          v-for="chip in categoryChips"
          :key="chip.id"
          class="chip"
          :class="activeCategory === chip.id ? 'chip-active' : 'chip-default'"
          @click="activeCategory = chip.id"
        >
          {{ chip.label }}
        </button>
      </div>

      <div class="results-head">
        <span class="results-count">{{ filtered.length }} sessions found</span>
      </div>

      <Transition name="fade" mode="out-in">
        <div v-if="filtered.length" class="sessions-grid" :key="query + activeCategory">
          <article
            v-for="s in filtered"
            :key="s.id"
            class="s-card"
            @click="playSession(s)"
          >
            <div class="s-thumb" :style="{ background: s.thumbnailGradient }">
              <span class="s-badge">{{ s.type.replace('-', ' ') }}</span>
              <button
                class="s-fav"
                @click.stop="progressStore.toggleFavorite(s.id)"
              >
                <Icon :icon="progressStore.isFavorite(s.id) ? 'lucide:heart' : 'lucide:heart-off'" class="app-icon app-icon--xs" />
              </button>
              <span class="s-play"><Icon icon="lucide:play" class="app-icon app-icon--sm" /></span>
            </div>
            <div class="s-info">
              <h3 class="s-title">{{ s.title }}</h3>
              <div class="s-meta">
                <span class="s-cat">{{ s.category }}</span>
                <span class="s-dur">{{ Math.round(s.duration / 60) }} min</span>
              </div>
            </div>
          </article>
        </div>
        <div v-else class="explore-view__empty" key="empty">
          <Icon icon="lucide:search" class="app-icon app-icon--2xl app-icon--muted" />
          <p>{{ t('explore.no_results') }}</p>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { usePlayerStore }   from '@/stores/player'
import { useProgressStore } from '@/stores/progress'
import { useProductsStore } from '@/stores/products'

const { t }          = useI18n()
const router         = useRouter()
const playerStore    = usePlayerStore()
const progressStore  = useProgressStore()
const productsStore  = useProductsStore()

const query          = ref('')
const activeCategory = ref('all')
const categoryChips = [
  { id: 'all', label: 'All' },
  { id: 'stress', label: 'Stress' },
  { id: 'sleep', label: 'Sleep' },
  { id: 'focus', label: 'Focus' },
  { id: 'anxiety', label: 'Anxiety' },
  { id: 'mindfulness', label: 'Mindfulness' },
  { id: 'energy', label: 'Energy' }
]

onMounted(() => {
  if (!productsStore.loaded) productsStore.fetchProducts()
})

const filtered = computed(() => {
  let pool = [...productsStore.sessions]
  if (query.value.trim()) {
    const q = query.value.toLowerCase()
    pool = pool.filter(s =>
      s.title.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.tags?.some(t => t.includes(q))
    )
  }
  if (activeCategory.value !== 'all') {
    pool = pool.filter(s => s.category === activeCategory.value)
  }
  return pool.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0))
})

function playSession(session) {
  playerStore.loadSession(session)
  router.push({ name: 'session', params: { id: session.id } })
}
</script>

<style scoped>
.explore-view {
  min-height: var(--app-min-height);
  background: var(--forest-900);
  padding-bottom: var(--page-pad-bottom-auth);
}

.explore-wrap {
  max-width: 1280px;
  margin: 0 auto;
  padding: calc(var(--navbar-height) + 28px) var(--container-pad) 100px;
}
.page-title {
  font-family: var(--font-display);
  font-size: clamp(22px, 2.5vw, 32px);
  font-weight: 800; letter-spacing: -2px; color: var(--text-primary); margin-bottom: 6px;
}
.page-sub { font-size: 15px; color: var(--text-secondary); margin-bottom: 20px; }
.search-bar { display: flex; align-items: center; gap: 10px; padding: 14px 20px; border-radius: 16px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); margin-bottom: 20px; }
.search-bar:focus-within { border-color: rgba(184,245,102,0.35); box-shadow: 0 0 0 3px rgba(184,245,102,0.08); }
.search-icon { color: var(--text-muted); }
.search-input { flex: 1; background: none; border: none; outline: none; font-family: var(--font-body); font-size: 15px; color: var(--text-primary); }
.filters { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; margin-bottom: 28px; }
.results-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
.results-count { font-size: 14px; color: var(--text-muted); font-family: var(--font-mono); }

.sessions-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}
.s-card { background: var(--bg-glass); backdrop-filter: blur(16px); border: var(--border-glass); border-radius: 18px; overflow: hidden; cursor: pointer; transition: all 280ms var(--ease-out); }
.s-card:hover { border-color: rgba(184,245,102,0.25); box-shadow: var(--glow-card-hover); transform: translateY(-4px); }
.s-thumb { height: 150px; position: relative; overflow: hidden; }
.s-thumb::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(13,31,18,0.5)); }
.s-badge { position: absolute; top: 10px; left: 10px; z-index: 2; padding: 3px 10px; border-radius: 999px; background: rgba(7,15,10,0.75); font-size: 10px; font-weight: 700; color: var(--lime-400); letter-spacing: 1px; text-transform: uppercase; border: 1px solid rgba(184,245,102,0.2); }
.s-fav { position: absolute; top: 10px; right: 10px; z-index: 2; width: 28px; height: 28px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.09); background: rgba(7,15,10,0.6); color: var(--text-primary); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 200ms; }
.s-card:hover .s-fav { opacity: 1; }
.s-play { position: absolute; bottom: 10px; right: 10px; z-index: 2; width: 34px; height: 34px; border-radius: 50%; background: var(--lime-500); display: flex; align-items: center; justify-content: center; color: var(--forest-900); opacity: 0; transform: scale(0.6); transition: all 220ms var(--ease-out); }
.s-card:hover .s-play { opacity: 1; transform: scale(1); }
.s-info { padding: 14px 16px; }
.s-title { font-family: var(--font-display); font-size: 16px; font-weight: 700; color: var(--text-primary); margin-bottom: 6px; line-height: 1.2; }
.s-meta { display: flex; align-items: center; justify-content: space-between; }
.s-cat { font-size: 12px; color: var(--lime-500); font-weight: 600; text-transform: capitalize; }
.s-dur { font-family: var(--font-mono); font-size: 11px; color: var(--text-muted); }

.explore-view__empty {
  text-align: center; padding: 80px 20px;
  display: flex; flex-direction: column; align-items: center; gap: 16px;
  color: var(--text-muted);
}
.explore-view__empty p { font-size: 15px; }

@media (max-width: 1100px) { .sessions-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 768px)  { .sessions-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 500px)  { .sessions-grid { grid-template-columns: 1fr; } }
</style>
