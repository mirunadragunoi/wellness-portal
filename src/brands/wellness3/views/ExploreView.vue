<template>
  <div class="explore-view">
    <div class="container">
      <div class="explore-view__header">
        <h1 class="explore-view__title"><span>Explore</span> {{ t('explore.title').toLowerCase() }}</h1>
        <ExploreSearch v-model="query" />
      </div>

      <ExploreCategoryChips v-model="activeCategory" />

      <div class="explore-view__filters">
        <ExploreFilterPanel v-model:filters="filters" />
      </div>

      <Transition name="fade" mode="out-in">
        <div v-if="filtered.length" class="sessions-grid" :key="filtered.length">
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
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { usePlayerStore } from '@/stores/player'
import { useProgressStore } from '@/stores/progress'
import { sessions } from '@/data/sessions'
import ExploreSearch       from '@/components/explore/ExploreSearch.vue'
import ExploreCategoryChips from '@/components/explore/ExploreCategoryChips.vue'
import ExploreFilterPanel  from '@/components/explore/ExploreFilterPanel.vue'
import ExploreSessionCard  from '@/components/explore/ExploreSessionCard.vue'

const { t }         = useI18n()
const route         = useRoute()
const router        = useRouter()
const playerStore   = usePlayerStore()
const progressStore = useProgressStore()

const query          = ref('')
const activeCategory = ref(route.query.category || 'all')
const filters        = ref({ type: 'all', duration: 'all', sort: 'popular' })

const filtered = computed(() => {
  let pool = [...sessions]

  // Search
  if (query.value.trim()) {
    const q = query.value.toLowerCase()
    pool = pool.filter(s =>
      s.title.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.tags?.some(t => t.includes(q))
    )
  }
  // Category
  if (activeCategory.value !== 'all') {
    pool = pool.filter(s => s.category === activeCategory.value)
  }
  // Type
  if (filters.value.type !== 'all') {
    pool = pool.filter(s => s.type === filters.value.type)
  }
  // Duration
  const durMap = { '1-5': [0, 300], '5-10': [300, 600], '10-20': [600, 1200], '20+': [1200, Infinity] }
  if (filters.value.duration !== 'all' && durMap[filters.value.duration]) {
    const [min, max] = durMap[filters.value.duration]
    pool = pool.filter(s => s.duration >= min && s.duration < max)
  }
  // Sort
  if (filters.value.sort === 'popular') {
    pool.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0))
  } else if (filters.value.sort === 'newest') {
    pool.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
  }

  return pool
})

function playSession(session) {
  playerStore.loadSession(session)
  router.push({ name: 'session', params: { id: session.id } })
}
</script>

<style scoped>
.explore-view {
  padding: 0 0 var(--page-pad-bottom-auth);
  min-height: var(--app-min-height);
}
.explore-view__header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 0 calc(var(--container-pad) * -1) 18px;
  padding: 24px var(--container-pad);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  background: linear-gradient(180deg, rgba(45, 212, 191, 0.05) 0%, transparent 100%);
  flex-wrap: wrap;
}
.explore-view__title {
  font-family: var(--font-d);
  font-size: clamp(24px, 3.5vw, 38px);
  font-weight: 400;
  color: var(--text-primary);
  letter-spacing: 0.02em;
  flex-shrink: 0;
}
.explore-view__title span {
  background: linear-gradient(135deg, var(--teal), var(--blue));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.explore-view__header > :last-child { flex: 1; min-width: 240px; }

.explore-view__filters {
  margin-bottom: 16px;
  padding-top: 6px;
}
.sessions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 220px), 1fr));
  gap: 16px;
}
.explore-view__empty {
  text-align: center;
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.explore-view__empty span { font-size: 40px; }
.explore-view__empty p    { color: var(--text-secondary); font-size: 16px; }

@media (max-width: 900px) {
  .explore-view__header {
    margin-bottom: 14px;
    padding-top: 20px;
    padding-bottom: 18px;
  }
}

:deep(.explore-view__filters .filter-panel) {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
}
</style>
