<template>
  <div class="explore-view">

    <!-- Header -->
    <div class="explore-view__head">
      <h1 class="explore-view__title">{{ t('explore.title') }}</h1>
      <p class="explore-view__sub">Discover meditations, sleep stories, soundscapes, and more.</p>

      <div class="explore-view__top">
        <ExploreSearch v-model="query" />
      </div>

      <div class="explore-view__filters">
        <ExploreCategoryChips v-model="activeCategory" />
      </div>
    </div>

    <!-- Results -->
    <div class="explore-view__body">
      <div class="explore-view__results-head">
        <span class="explore-view__count">{{ filtered.length }} sessions found</span>
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
        <div v-else class="explore-view__empty" key="empty">
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
import { useRouter } from 'vue-router'
import { usePlayerStore }   from '@/stores/player'
import { useProgressStore } from '@/stores/progress'
import { sessions }          from '@/data/sessions'
import ExploreSearch         from '@/components/explore/ExploreSearch.vue'
import ExploreCategoryChips  from '@/components/explore/ExploreCategoryChips.vue'
import ExploreFilterPanel    from '@/components/explore/ExploreFilterPanel.vue'
import ExploreSessionCard    from '@/components/explore/ExploreSessionCard.vue'

const { t }         = useI18n()
const router        = useRouter()
const playerStore   = usePlayerStore()
const progressStore = useProgressStore()

const query          = ref('')
const activeCategory = ref('all')
const filters        = ref({ type: 'all', duration: 'all', sort: 'popular' })

const filtered = computed(() => {
  let pool = [...sessions]
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
  if (filters.value.type !== 'all') {
    pool = pool.filter(s => s.type === filters.value.type)
  }
  const durMap = { '1-5': [0,300], '5-10': [300,600], '10-20': [600,1200], '20+': [1200,Infinity] }
  if (filters.value.duration !== 'all' && durMap[filters.value.duration]) {
    const [min, max] = durMap[filters.value.duration]
    pool = pool.filter(s => s.duration >= min && s.duration < max)
  }
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
  min-height: var(--app-min-height);
  background: var(--forest-900);
  padding-bottom: var(--page-pad-bottom-auth);
}

.explore-view__head {
  max-width: var(--container-max); margin: 0 auto;
  padding: 40px var(--container-pad) 28px;
}
.explore-view__title {
  font-family: var(--font-display);
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 800; letter-spacing: -2px; color: var(--text-primary); margin-bottom: 6px;
}
.explore-view__sub { font-size: 15px; color: var(--text-secondary); margin-bottom: 20px; }
.explore-view__top { margin-bottom: 20px; }
.explore-view__filters {
  display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; margin-bottom: 28px;
}
.explore-view__filters::-webkit-scrollbar { display: none; }

.explore-view__body {
  max-width: var(--container-max); margin: 0 auto;
  padding: 0 var(--container-pad) 100px;
}
.explore-view__results-head {
  display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;
}
.explore-view__count { font-family: var(--font-mono); font-size: 13px; color: var(--text-muted); }
.explore-view__sidebar { display: none; }

.sessions-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}
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
