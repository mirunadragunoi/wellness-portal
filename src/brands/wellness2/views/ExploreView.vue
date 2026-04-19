<template>
  <div class="explore-view">

    <!-- Full-width header -->
    <div class="explore-view__head">
      <div class="container">
        <h1 class="explore-view__title">{{ t('explore.title') }}</h1>
        <div class="explore-view__top">
          <ExploreSearch v-model="query" />
        </div>
      </div>
    </div>

    <!-- Full-width category tabs -->
    <ExploreCategoryChips v-model="activeCategory" />

    <!-- Body: sidebar + results -->
    <div class="container">
      <div class="explore-view__body">
        <aside class="explore-view__sidebar">
          <ExploreFilterPanel v-model:filters="filters" />
        </aside>

        <div class="explore-view__results">
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
  background: var(--parchment);
  padding-bottom: var(--page-pad-bottom-auth);
}

/* Full-width head */
.explore-view__head {
  background: var(--bg-surface);
  border-bottom: 2px solid var(--ink-200);
  padding: 30px 0 24px;
}
.explore-view__title {
  font-family: var(--font-display);
  font-size: clamp(26px, 3.5vw, 40px);
  font-weight: 300; color: var(--text-primary);
  letter-spacing: -0.5px; margin-bottom: 16px;
}
.explore-view__top { max-width: 400px; }

/* Body grid */
.explore-view__body {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  align-items: start;
  gap: 20px;
  margin-top: 18px;
}
.explore-view__sidebar {
  border: 1.5px solid var(--ink-200);
  border-radius: var(--radius-lg);
  padding: 20px 16px;
  position: sticky; top: var(--navbar-height);
  max-height: calc(100vh - var(--navbar-height));
  overflow-y: auto;
  background: var(--bg-surface);
}
.explore-view__results {
  padding: 8px 0 32px;
}
.sessions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 210px), 1fr));
  gap: 18px;
}
.explore-view__empty {
  text-align: center; padding: 80px 20px;
  display: flex; flex-direction: column; align-items: center; gap: 16px;
  color: var(--text-secondary);
}
.explore-view__empty p { font-size: 15px; }

@media (max-width: 900px) {
  .explore-view__body { grid-template-columns: 1fr; }
  .explore-view__sidebar {
    position: static;
    border-radius: var(--radius);
    max-height: none;
    padding: 14px;
  }
  .explore-view__results {
    padding: 12px 0 26px;
  }
}

@media (max-width: 640px) {
  .explore-view__head {
    padding: 22px 0 18px;
  }
  .explore-view__title {
    margin-bottom: 12px;
  }
  .explore-view__sidebar {
    padding: 12px;
  }
  .explore-view__results {
    padding: 12px 0 16px;
  }
  .sessions-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }
}
</style>
