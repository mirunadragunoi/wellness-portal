<template>
  <div class="learn-view">

    <!-- Full-width header -->
    <div class="learn-view__head">
      <div class="container">
        <div class="learn-view__head-row">
          <div>
            <h1 class="learn-view__title">{{ t('learn.title') }}</h1>
            <p class="learn-view__subtitle">{{ t('learn.subtitle') }}</p>
          </div>
          <div class="learn-view__search">
            <ExploreSearch v-model="query" :placeholder="t('learn.search_placeholder')" />
          </div>
        </div>
      </div>
    </div>

    <!-- Full-width category tabs -->
    <div class="learn-view__tabs no-scrollbar">
      <div class="container learn-view__tabs-inner">
        <button
          v-for="cat in tabs" :key="cat.id"
          class="tab-btn"
          :class="{ 'tab-btn--active': activeCategory === cat.id }"
          @click="activeCategory = cat.id"
        >
          {{ cat.label }}
        </button>
      </div>
    </div>

    <!-- Content -->
    <div class="learn-view__content">
      <div class="container">
        <Transition name="fade" mode="out-in">
          <div v-if="filtered.length" class="learn-view__grid" :key="activeCategory + query">
            <LearnArticleCard
              v-for="article in filtered"
              :key="article.id"
              :article="article"
              :bookmarked="bookmarks.has(article.id)"
              @bookmark="toggleBookmark"
            />
          </div>
          <div v-else class="learn-view__empty" key="empty">
            <Icon icon="lucide:book-open" class="app-icon app-icon--2xl app-icon--muted" />
            <p>{{ t('learn.no_results') }}</p>
          </div>
        </Transition>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { getArticlesByCategory } from '@/data/articles'
import ExploreSearch    from '@/components/explore/ExploreSearch.vue'
import LearnArticleCard from '@/components/learn/LearnArticleCard.vue'

const { t } = useI18n()
const query          = ref('')
const activeCategory = ref('all')
const bookmarks      = ref(new Set())

const tabs = [
  { id: 'all',         label: t('learn.all_categories') },
  { id: 'stress',      label: 'Stress'      },
  { id: 'sleep',       label: 'Sleep'       },
  { id: 'focus',       label: 'Focus'       },
  { id: 'habits',      label: 'Habits'      },
  { id: 'mindfulness', label: 'Mindfulness' },
]

const filtered = computed(() => {
  let pool = getArticlesByCategory(activeCategory.value)
  if (query.value.trim()) {
    const q = query.value.toLowerCase()
    pool = pool.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q)
    )
  }
  return pool
})

function toggleBookmark(id) {
  if (bookmarks.value.has(id)) bookmarks.value.delete(id)
  else bookmarks.value.add(id)
}
</script>

<style scoped>
.learn-view {
  min-height: var(--app-min-height);
  background: var(--forest-900);
  padding-bottom: var(--page-pad-bottom-auth);
}

.learn-view__head {
  max-width: var(--container-max); margin: 0 auto;
  padding: 40px var(--container-pad) 0;
}
.learn-view__head-row {
  display: flex; align-items: flex-end;
  justify-content: space-between; gap: 24px; flex-wrap: wrap;
  margin-bottom: 24px;
}
.learn-view__title {
  font-family: var(--font-display);
  font-size: clamp(28px, 4vw, 48px); font-weight: 800;
  letter-spacing: -2px; color: var(--text-primary); margin-bottom: 6px;
}
.learn-view__subtitle { font-size: 15px; color: var(--text-secondary); }
.learn-view__search   { width: 100%; max-width: 280px; }

.learn-view__tabs { max-width: var(--container-max); margin: 0 auto; overflow-x: auto; }
.learn-view__tabs::-webkit-scrollbar { display: none; }
.learn-view__tabs-inner {
  display: flex; gap: 6px; padding: 0 var(--container-pad) 24px;
}
.tab-btn {
  padding: 7px 16px; border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.07);
  background: rgba(255,255,255,0.04); font-family: var(--font-body);
  font-size: 13px; font-weight: 500; color: var(--text-muted);
  cursor: pointer; white-space: nowrap; transition: all 150ms;
}
.tab-btn:hover { color: var(--text-secondary); background: rgba(255,255,255,0.08); }
.tab-btn--active {
  color: var(--lime-400); background: rgba(184,245,102,0.1);
  border-color: rgba(184,245,102,0.25);
}

.learn-view__content {
  max-width: var(--container-max); margin: 0 auto;
  padding: 0 var(--container-pad) 100px;
}
.learn-view__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.learn-view__empty {
  text-align: center; padding: 80px 20px;
  display: flex; flex-direction: column; align-items: center; gap: 16px;
  color: var(--text-muted);
}
.learn-view__empty p { font-size: 15px; }

@media (max-width: 900px) { .learn-view__grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) { .learn-view__grid { grid-template-columns: 1fr; gap: 14px; } }
</style>
