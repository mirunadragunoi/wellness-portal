<template>
  <RouterLink :to="{ name: 'article', params: { slug: article.slug } }" class="article-card">
    <div class="article-card__img" :style="{ background: article.thumbnailGradient }">
      <span class="article-card__cat">{{ article.category }}</span>
    </div>
    <div class="article-card__body">
      <h3 class="article-card__title">{{ article.title }}</h3>
      <p class="article-card__excerpt">{{ article.excerpt }}</p>
      <div class="article-card__meta">
        <span class="article-card__time">{{ t('learn.read_time', { n: article.readTime }) }}</span>
        <button
          type="button"
          class="article-card__bookmark"
          :class="{ active: bookmarked }"
          :aria-label="bookmarked ? t('learn.bookmarked') : t('learn.bookmark')"
          @click.prevent="emit('bookmark', article.id)"
        >
          <Icon
            :icon="bookmarked ? 'lucide:bookmark-check' : 'lucide:bookmark-plus'"
            class="app-icon app-icon--md"
          />
        </button>
      </div>
    </div>
  </RouterLink>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
defineProps({
  article:    { type: Object, required: true },
  bookmarked: { type: Boolean, default: false }
})
const emit = defineEmits(['bookmark'])
</script>

<style scoped>
.article-card {
  background: var(--bg-glass); backdrop-filter: blur(16px);
  border: var(--border-glass); border-radius: 20px;
  overflow: hidden; display: flex; flex-direction: column;
  text-decoration: none; cursor: pointer;
  transition: all 280ms var(--ease-smooth);
}
.article-card:hover { border-color: rgba(184,245,102,0.22); box-shadow: var(--glow-card-hover); transform: translateY(-3px); }

.article-card__img {
  height: 180px; background: var(--forest-700);
  background-size: cover; background-position: center;
  position: relative; overflow: hidden;
  display: flex; align-items: flex-start; padding: 12px;
}
.article-card__img::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(13,31,18,0.5) 0%, transparent 60%);
}
.article-card__bookmark {
  position: relative; z-index: 1; margin-left: auto;
  width: 30px; height: 30px; border-radius: var(--radius-sm);
  background: rgba(7,15,10,0.6); backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.1); cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: var(--text-muted); transition: all 150ms;
}
.article-card__bookmark:hover { color: var(--lime-400); border-color: rgba(184,245,102,0.2); }
.article-card__bookmark.active { color: var(--lime-400); }

.article-card__body { padding: 20px; flex: 1; display: flex; flex-direction: column; gap: 8px; }
.article-card__cat {
  display: inline-block; padding: 3px 10px; border-radius: 999px;
  font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;
  background: rgba(184,245,102,0.1); color: var(--lime-400);
  border: 1px solid rgba(184,245,102,0.2);
  position: relative; z-index: 1;
}
.article-card__title {
  font-family: var(--font-display); font-size: 16px; font-weight: 700;
  color: var(--text-primary); line-height: 1.25; letter-spacing: -0.3px;
}
.article-card__excerpt { font-size: 13px; color: var(--text-secondary); line-height: 1.6; flex: 1; }
.article-card__meta { display: flex; align-items: center; justify-content: space-between; margin-top: 8px; }
.article-card__time {
  font-family: var(--font-mono); font-size: 10px; color: var(--text-muted);
}
</style>
