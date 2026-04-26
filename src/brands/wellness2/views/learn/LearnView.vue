<template>
  <div class="learn-view">
    <div class="learn-wrap">
      <header class="page-header">
        <h1 class="page-title">{{ t('learn.title') }}</h1>
        <p class="page-sub">{{ t('learn.subtitle') }}</p>
      </header>

      <article v-if="featured" class="featured-article" @click="$router.push({ name: 'article', params: { slug: featured.slug } })">
        <div class="feat-img-wrap" :style="{ background: featured.thumbnailGradient }"></div>
        <div class="feat-body">
          <div class="feat-tag-row">
            <span class="feat-cat-badge">{{ featured.category }}</span>
            <span class="feat-read-time">{{ featured.readTime }} min read</span>
          </div>
          <h2 class="feat-article-title">{{ featured.title }}</h2>
          <p class="feat-excerpt">{{ featured.excerpt }}</p>
          <span class="feat-read-btn">Read article</span>
        </div>
      </article>

      <div class="learn-controls">
        <div class="search-bar">
          <Icon icon="lucide:search" class="app-icon app-icon--sm search-icon" />
          <input v-model="query" class="search-input" :placeholder="t('learn.search_placeholder')" />
        </div>
        <div class="cat-filters">
          <button
            v-for="cat in tabs"
            :key="cat.id"
            class="chip"
            :class="activeCategory === cat.id ? 'chip-active' : 'chip-default'"
            @click="activeCategory = cat.id"
          >
            {{ cat.label }}
          </button>
        </div>
      </div>

      <Transition name="fade" mode="out-in">
        <div v-if="filtered.length" class="articles-grid" :key="activeCategory + query">
          <article
            v-for="article in filtered"
            :key="article.id"
            class="article-card"
            @click="$router.push({ name: 'article', params: { slug: article.slug } })"
          >
            <div class="article-img" :style="{ background: article.thumbnailGradient }" />
            <div class="article-body">
              <div class="article-meta-row">
                <span class="article-cat">{{ article.category }}</span>
                <span class="article-read-time">{{ article.readTime }} min read</span>
              </div>
              <h3 class="article-title">{{ article.title }}</h3>
              <p class="article-excerpt">{{ article.excerpt }}</p>
              <div class="article-footer">
                <span class="article-read-link">Read</span>
                <button class="article-bookmark" @click.stop="toggleBookmark(article.id)">
                  <Icon :icon="bookmarks.has(article.id) ? 'lucide:bookmark-check' : 'lucide:bookmark'" class="app-icon app-icon--sm" />
                </button>
              </div>
            </div>
          </article>
        </div>
        <div v-else class="learn-view__empty" key="empty">
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
const featured = computed(() => articles[0] || null)

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

.learn-wrap {
  max-width: 1280px;
  margin: 0 auto;
  padding: calc(var(--navbar-height) + 28px) var(--container-pad) 100px;
}
.page-title {
  font-family: var(--font-display);
  font-size: clamp(22px, 2.5vw, 32px); font-weight: 800;
  letter-spacing: -2px; color: var(--text-primary); margin-bottom: 6px;
}
.page-sub { font-size: 15px; color: var(--text-secondary); margin-bottom: 32px; }
.featured-article { display: grid; grid-template-columns: 1fr 1fr; background: var(--bg-glass); backdrop-filter: blur(20px); border: var(--border-glass); border-radius: 24px; overflow: hidden; margin-bottom: 36px; min-height: 320px; cursor: pointer; transition: all 300ms var(--ease-out); }
.featured-article:hover { border-color: rgba(184,245,102,0.25); box-shadow: var(--glow-card-hover); }
.feat-img-wrap { background-size: cover; background-position: center; }
.feat-body { padding: 40px; display: flex; flex-direction: column; justify-content: center; }
.feat-tag-row { display: flex; align-items: center; gap: 8px; margin-bottom: 16px; }
.feat-cat-badge { padding: 4px 12px; border-radius: 999px; background: rgba(184,245,102,0.1); border: 1px solid rgba(184,245,102,0.2); font-size: 11px; font-weight: 700; color: var(--lime-400); text-transform: uppercase; }
.feat-read-time { font-family: var(--font-mono); font-size: 11px; color: var(--text-muted); }
.feat-article-title { font-family: var(--font-display); font-size: clamp(22px, 3vw, 32px); font-weight: 800; letter-spacing: -1px; color: var(--text-primary); line-height: 1.15; margin-bottom: 14px; }
.feat-excerpt { font-size: 15px; color: var(--text-secondary); line-height: 1.7; margin-bottom: 24px; }
.feat-read-btn { color: var(--lime-500); font-weight: 700; }

.learn-controls { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; flex-wrap: wrap; }
.search-bar { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 200px; padding: 12px 18px; border-radius: 12px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); }
.search-input { flex: 1; background: none; border: none; outline: none; font-family: var(--font-body); font-size: 14px; color: var(--text-primary); }
.cat-filters { display: flex; gap: 6px; overflow-x: auto; }

.articles-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.article-card { background: var(--bg-glass); backdrop-filter: blur(16px); border: var(--border-glass); border-radius: 20px; overflow: hidden; cursor: pointer; transition: all 280ms var(--ease-out); }
.article-card:hover { border-color: rgba(184,245,102,0.22); box-shadow: var(--glow-card-hover); transform: translateY(-3px); }
.article-img { height: 180px; }
.article-body { padding: 20px; }
.article-meta-row { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
.article-cat { padding: 3px 10px; border-radius: 999px; font-size: 10px; font-weight: 700; text-transform: uppercase; background: rgba(184,245,102,0.1); color: var(--lime-400); border: 1px solid rgba(184,245,102,0.2); }
.article-read-time { font-family: var(--font-mono); font-size: 10px; color: var(--text-muted); }
.article-title { font-family: var(--font-display); font-size: 16px; font-weight: 700; color: var(--text-primary); line-height: 1.25; margin-bottom: 8px; }
.article-excerpt { font-size: 13px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 14px; }
.article-footer { display: flex; align-items: center; justify-content: space-between; }
.article-read-link { font-size: 12px; font-weight: 700; color: var(--lime-500); }
.article-bookmark { border: none; background: transparent; color: var(--text-muted); cursor: pointer; }

.learn-view__empty {
  text-align: center; padding: 80px 20px;
  display: flex; flex-direction: column; align-items: center; gap: 16px;
  color: var(--text-muted);
}
.learn-view__empty p { font-size: 15px; }

@media (max-width: 900px) {
  .featured-article { grid-template-columns: 1fr; }
  .feat-img-wrap { height: 200px; }
  .articles-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .articles-grid { grid-template-columns: 1fr; }
}
</style>
