<template>
  <div class="learn-view">
    <div class="container">
      <!-- Header -->
      <div class="learn-view__header">
        <div>
          <h1 class="learn-view__title">{{ t('learn.title') }}</h1>
          <p class="learn-view__subtitle">{{ t('learn.subtitle') }}</p>
        </div>
        <div class="learn-view__search">
          <ExploreSearch v-model="query" :placeholder="t('learn.search_placeholder')" />
        </div>
      </div>

      <!-- Category tabs -->
      <div class="learn-view__tabs no-scrollbar">
        <button
          v-for="cat in tabs" :key="cat.id"
          class="tab-btn"
          :class="{ 'tab-btn--active': activeCategory === cat.id }"
          @click="activeCategory = cat.id"
        >
          {{ cat.label }}
        </button>
      </div>

      <!-- Articles grid -->
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
        <div v-else class="learn-view__empty">
          <Icon icon="lucide:book-open" class="app-icon app-icon--2xl app-icon--muted" />
          <p>{{ t('learn.no_results') }}</p>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { articles, getArticlesByCategory } from '@/data/articles'
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
  { id: 'mindfulness', label: 'Mindfulness' }
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
  padding: 40px 0 var(--page-pad-bottom-auth);
  min-height: var(--app-min-height);
}
.learn-view__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}
.learn-view__title {
  font-family: var(--font-display);
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 300;
  color: var(--text-primary);
  letter-spacing: -0.5px;
  margin-bottom: 8px;
}
.learn-view__subtitle {
  font-size: 16px;
  color: var(--text-secondary);
  max-width: 480px;
}
.learn-view__search { width: 100%; max-width: 320px; }

.learn-view__tabs {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
  margin-bottom: 32px;
}
.tab-btn {
  padding: 8px 20px;
  border-radius: 100px;
  background: var(--bg-surface);
  border: 1.5px solid var(--border-subtle);
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  white-space: nowrap;
  transition: all var(--duration-fast) var(--ease-smooth);
}
.tab-btn:hover { border-color: var(--sky-300); color: var(--sky-600); background: var(--sky-50); }
.tab-btn--active { border-color: var(--sky-500); background: var(--sky-50); color: var(--sky-700); }

.learn-view__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));
  gap: 24px;
}
.learn-view__empty {
  text-align: center;
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.learn-view__empty span { font-size: 40px; }
.learn-view__empty p    { color: var(--text-secondary); font-size: 16px; }
</style>
