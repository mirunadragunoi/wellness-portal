<template>
  <div class="explore-view">
    <div class="container">
      <div class="explore-view__header">
        <h1 class="explore-view__title">{{ t('explore.title') }}</h1>
        <ExploreSearch v-model="query" />
      </div>

      <div class="explore-view__body">
        <aside class="explore-view__filters">
          <ExploreFilterPanel v-model:filters="filters" />
        </aside>

        <div class="explore-view__results">
          <div v-if="productsStore.loading && !productsStore.loaded" class="explore-view__empty">
            <Icon icon="lucide:loader-2" class="app-icon app-icon--2xl app-icon--muted" style="animation:spin 1s linear infinite" />
          </div>
          <Transition v-else name="fade" mode="out-in">
        <div v-if="filtered.length" class="sessions-grid" :key="filtered.length + query + filters.type + filters.duration">
              <ExploreSessionCard
                v-for="s in filtered" :key="s.id"
                :session="s"
                @play="playSession"
                @favorite="progressStore.toggleFavorite($event)"
              />
            </div>
            <div v-else class="explore-view__empty">
              <Icon icon="lucide:search" class="app-icon app-icon--2xl app-icon--muted" />
              <p>{{ t('explore.no_results') }}</p>
            </div>
          </Transition>
        </div>
      </div>
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
import ExploreSearch        from '@/components/explore/ExploreSearch.vue'
import ExploreFilterPanel   from '@/components/explore/ExploreFilterPanel.vue'
import ExploreSessionCard   from '@/components/explore/ExploreSessionCard.vue'
import { inferExploreAudioType } from '@/utils/productKinds'

const { t }          = useI18n()
const router         = useRouter()
const playerStore    = usePlayerStore()
const progressStore  = useProgressStore()
const productsStore  = useProductsStore()

const query          = ref('')
const filters        = ref({ type: 'all', duration: 'all' })

onMounted(() => {
  if (!productsStore.loaded) productsStore.fetchProducts()
})

const filtered = computed(() => {
  let pool = productsStore.sessions.filter(s => Number(s.rawType) === 6)

  if (query.value.trim()) {
    const q = query.value.toLowerCase()
    pool = pool.filter(s =>
      s.title.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.tags?.some(t => t.includes(q))
    )
  }
  if (filters.value.type !== 'all') {
    pool = pool.filter(s => inferExploreAudioType(s) === filters.value.type)
  }
  const durMap = { '1-5': [0, 300], '5-10': [300, 600], '10-20': [600, 1200], '20+': [1200, Infinity] }
  if (filters.value.duration !== 'all' && durMap[filters.value.duration]) {
    const [min, max] = durMap[filters.value.duration]
    pool = pool.filter(s => s.duration >= min && s.duration < max)
  }
  return pool.map(s => {
    const exploreType = inferExploreAudioType(s)
    return {
      ...s,
      category: exploreType === 'motivational_speeches' ? 'Motivational Speeches' : exploreType,
      exploreType
    }
  })
})

function playSession(session) {
  if (session.exploreType === 'motivational_speeches') {
    router.push({ name: 'article', params: { slug: String(session.id) } })
    return
  }
  router.push({ name: 'session', params: { id: session.id } })
}
</script>

<style scoped>
.explore-view { padding: 40px 0 var(--page-pad-bottom-auth); min-height: var(--app-min-height); }
.explore-view__header {
  display: flex; align-items: center; gap: 20px;
  margin-bottom: 24px; flex-wrap: wrap;
}
.explore-view__title {
  font-family: var(--font-display); font-size: 36px; font-weight: 300;
  color: var(--text-primary); flex-shrink: 0;
}
.explore-view__header > :last-child { flex: 1; min-width: 240px; }

.explore-view__body {
  display: grid; grid-template-columns: minmax(0, 260px) minmax(0, 1fr);
  gap: 28px; margin-top: 28px; align-items: start;
}
.sessions-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 200px), 1fr));
  gap: 20px;
}
.explore-view__empty {
  text-align: center; padding: 80px 20px;
  display: flex; flex-direction: column; align-items: center; gap: 16px;
}
.explore-view__empty p { color: var(--text-secondary); font-size: 16px; }

@keyframes spin { to { transform: rotate(360deg); } }

@media (max-width: 900px) {
  .explore-view__body { grid-template-columns: 1fr; }
  .explore-view__filters { order: -1; }
}
</style>
