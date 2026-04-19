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
  background: var(--bg-surface);
  border: 2px solid var(--ink-200); border-radius: var(--radius-lg);
  overflow: hidden; display: flex; flex-direction: column;
  text-decoration: none; cursor: pointer;
  transition: all var(--duration-normal); box-shadow: 3px 3px 0 var(--ink-100);
}
.article-card:hover { transform: translate(-2px,-3px); box-shadow: 6px 6px 0 var(--sage-200); border-color: var(--sage-300); }

.article-card__img {
  height: 160px;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: flex-start;
  padding: 12px;
}
.article-card__img::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(28,26,22,0.4), transparent 60%);
}
.article-card__bookmark {
  width: 32px; height: 32px; border-radius: var(--radius-sm);
  background: white; border: 1px solid var(--ink-100); cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: var(--ink-400); transition: all var(--duration-fast);
}
.article-card__bookmark:hover { background: var(--sage-100); color: var(--sage-600); }
.article-card__bookmark.active { color: var(--sage-600); background: var(--sage-50); border-color: var(--sage-200); }

.article-card__body { padding: 18px; flex: 1; display: flex; flex-direction: column; gap: 8px; }
.article-card__cat {
  display: inline-block; padding: 3px 10px;
  font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;
  background: var(--sage-100); color: var(--sage-700);
  border-radius: var(--radius-sm); border: 1px solid var(--sage-200);
  position: relative;
  z-index: 1;
}
.article-card__title {
  font-family: var(--font-display); font-size: 20px; font-weight: 400;
  color: var(--ink-900); line-height: 1.3;
}
.article-card__excerpt { font-size: 13px; color: var(--text-secondary); line-height: 1.6; flex: 1; }
.article-card__meta { display: flex; align-items: center; gap: 12px; margin-top: 8px; }
.article-card__time {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 600;
}
</style>
