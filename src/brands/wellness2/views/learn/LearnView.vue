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
  background: var(--parchment);
  padding-bottom: var(--page-pad-bottom-auth);
}

/* Header */
.learn-view__head {
  background: var(--bg-surface);
  border-bottom: 2px solid var(--ink-200);
  padding: 30px 0 24px;
}
.learn-view__head-row {
  display: flex; align-items: flex-end;
  justify-content: space-between; gap: 24px; flex-wrap: wrap;
}
.learn-view__title {
  font-family: var(--font-display);
  font-size: clamp(26px, 3.5vw, 40px); font-weight: 300;
  color: var(--text-primary); letter-spacing: -0.5px; margin-bottom: 6px;
}
.learn-view__subtitle { font-size: 15px; color: var(--text-secondary); }
.learn-view__search   { width: 100%; max-width: 280px; }

/* Tabs — full width strip */
.learn-view__tabs {
  background: var(--bg-surface);
  border-bottom: 2px solid var(--ink-200);
  overflow-x: auto;
}
.learn-view__tabs-inner {
  display: flex; gap: 0;
}
.tab-btn {
  padding: 14px 20px;
  border: none; border-bottom: 3px solid transparent;
  background: transparent; font-family: var(--font-body);
  font-size: 14px; font-weight: 500; color: var(--text-secondary);
  cursor: pointer; white-space: nowrap;
  transition: all var(--duration-fast); margin-bottom: -2px;
}
.tab-btn:hover { color: var(--ink-900); }
.tab-btn--active {
  color: var(--ink-900); font-weight: 700;
  border-bottom-color: var(--sage-500);
}

/* Content */
.learn-view__content { padding: 28px 0; }
.learn-view__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  gap: 22px;
}
.learn-view__empty {
  text-align: center; padding: 80px 20px;
  display: flex; flex-direction: column; align-items: center; gap: 16px;
  color: var(--text-secondary);
}
.learn-view__empty p { font-size: 15px; }

@media (max-width: 900px) {
  .learn-view__head-row {
    align-items: stretch;
    gap: 16px;
  }
  .learn-view__search {
    max-width: 100%;
  }
}

@media (max-width: 640px) {
  .learn-view__head {
    padding: 22px 0 18px;
  }
  .learn-view__subtitle {
    font-size: 14px;
  }
  .learn-view__tabs-inner {
    padding: 0 16px;
  }
  .tab-btn {
    padding: 12px 14px;
    font-size: 13px;
  }
  .learn-view__content {
    padding: 16px 0 24px;
  }
  .learn-view__grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }
}
</style>
