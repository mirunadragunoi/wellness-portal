<template>
  <div class="learn-view">
    <header class="learn-header">
      <div class="container">
        <h1 class="learn-header__title">Learn</h1>
        <p class="learn-header__subtitle">{{ t('learn.subtitle') }}</p>
        <div class="learn-header__search">
          <ExploreSearch v-model="query" :placeholder="t('learn.search_placeholder')" />
        </div>
      </div>
    </header>

    <div class="container learn-content">
      <div class="learn-view__tabs no-scrollbar">
        <button
          v-for="cat in tabs"
          :key="cat.id"
          class="tab-btn"
          :class="{ 'tab-btn--active': activeCategory === cat.id }"
          @click="activeCategory = cat.id"
        >
          {{ cat.label }}
        </button>
      </div>

      <Transition name="fade" mode="out-in">
        <div v-if="filtered.length" class="learn-grid" :key="activeCategory + query">
          <article v-for="article in filtered" :key="article.id" class="learn-card">
            <div class="learn-card__thumb" :style="{ background: article.thumbnailGradient }">
              <span>{{ article.readTime }} min read</span>
            </div>
            <div class="learn-card__body">
              <p class="learn-card__cat">{{ article.category }}</p>
              <h3>{{ article.title }}</h3>
              <p>{{ article.excerpt }}</p>
            </div>
          </article>
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
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { articles as mockArticles, getArticlesByCategory } from '@/data/articles'
import { useProductsStore } from '@/stores/products'
import ExploreSearch from '@/components/explore/ExploreSearch.vue'

const { t }          = useI18n()
const productsStore  = useProductsStore()

const query          = ref('')
const activeCategory = ref('all')

const tabs = [
  { id: 'all',         label: t('learn.all_categories') },
  { id: 'stress',      label: 'Stress'      },
  { id: 'sleep',       label: 'Sleep'       },
  { id: 'focus',       label: 'Focus'       },
  { id: 'habits',      label: 'Habits'      },
  { id: 'mindfulness', label: 'Mindfulness' }
]

onMounted(() => {
  if (!productsStore.loaded) productsStore.fetchProducts()
})

const allArticles = computed(() => {
  const api = productsStore.articles
  if (api.length) return api.map(p => ({
    id: p.id, slug: String(p.id), category: p.category,
    title: p.title, excerpt: p.descriptionShort || p.description,
    readTime: 5, thumbnail: p.thumbnail, thumbnailGradient: p.thumbnailGradient,
    content: p.description
  }))
  return mockArticles
})

const filtered = computed(() => {
  let pool = activeCategory.value === 'all'
    ? allArticles.value
    : allArticles.value.filter(a => a.category === activeCategory.value)
  if (query.value.trim()) {
    const q = query.value.toLowerCase()
    pool = pool.filter(a =>
      a.title.toLowerCase().includes(q) ||
      (a.excerpt || '').toLowerCase().includes(q)
    )
  }
  return pool
})

</script>

<style scoped>
.learn-view {
  min-height: var(--app-min-height);
  padding-bottom: var(--page-pad-bottom-auth);
}
.learn-header {
  padding: 24px 0 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  background: linear-gradient(180deg, rgba(124, 159, 255, 0.08), transparent);
}
.learn-header__title {
  font-family: var(--font-d);
  font-size: clamp(26px, 3.5vw, 38px);
  font-weight: 400;
  letter-spacing: 0.03em;
}
.learn-header__subtitle {
  margin-top: 5px;
  font-size: 14px;
  color: var(--text-secondary);
}
.learn-header__search {
  margin-top: 12px;
  max-width: 340px;
}

.learn-content {
  padding-top: 16px;
  min-height: var(--app-min-height);
}

.learn-view__tabs {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
  margin-bottom: 16px;
}
.tab-btn {
  padding: 8px 20px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  font-family: var(--font-b);
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
  cursor: pointer;
  white-space: nowrap;
  transition: all var(--duration-fast) var(--ease-smooth);
  backdrop-filter: blur(8px);
}
.tab-btn:hover { border-color: rgba(167, 139, 250, 0.45); color: var(--violet); background: rgba(167, 139, 250, 0.12); }
.tab-btn--active { border-color: rgba(167, 139, 250, 0.6); background: rgba(167, 139, 250, 0.18); color: #d9ccff; }

.learn-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  gap: 16px;
}
.learn-card {
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--r-lg);
  overflow: hidden;
  backdrop-filter: blur(16px);
}
.learn-card__thumb {
  height: 120px;
  position: relative;
}
.learn-card__thumb span {
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 10px;
  padding: 4px 8px;
  border-radius: var(--r-full);
  background: rgba(7, 13, 26, 0.5);
  color: #fff;
}
.learn-card__body { padding: 14px; }
.learn-card__cat {
  font-size: 10px;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--violet);
  font-weight: 700;
}
.learn-card h3 {
  margin-top: 6px;
  font-family: var(--font-d);
  font-size: 20px;
  font-weight: 400;
  line-height: 1.25;
}
.learn-card p {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.65;
  margin-top: 8px;
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
