<template>
  <RouterLink :to="{ name: 'article', params: { slug: article.slug } }" class="article-card">
    <div class="article-card__img" :style="imgStyle">
      <span class="article-card__cat">{{ article.category }}</span>
    </div>
    <div class="article-card__body">
      <h3 class="article-card__title">{{ article.title }}</h3>
      <p class="article-card__excerpt">{{ article.excerpt }}</p>
      <div class="article-card__meta">
        <span class="article-card__time">{{ t('learn.read_time', { n: article.readTime }) }}</span>
        <div class="article-card__actions">
          <a
            v-if="article.downloadUrl"
            class="article-card__download"
            :href="article.downloadUrl"
            target="_blank"
            rel="noopener noreferrer"
            download
            @click.stop
          >
            Download PDF
          </a>
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
    </div>
  </RouterLink>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const props = defineProps({
  article:    { type: Object, required: true },
  bookmarked: { type: Boolean, default: false }
})
const emit = defineEmits(['bookmark'])

const imgStyle = computed(() => {
  const src = props.article.thumbnail || props.article.banner
  return src
    ? {
        backgroundImage: `url("${src}")`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    : { background: props.article.thumbnailGradient }
})
</script>

<style scoped>
.article-card {
  display: flex; flex-direction: column;
  background: var(--bg-surface); border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg); overflow: hidden; text-decoration: none;
  transition: all var(--duration-normal) var(--ease-smooth);
}
.article-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); border-color: var(--sky-200); }

.article-card__img {
  height: 240px; position: relative;
  display: flex; align-items: flex-end; padding: 14px;
  background-color: var(--bg-muted);
}
.article-card__cat {
  background: rgba(255,255,255,0.9); color: var(--text-primary);
  padding: 4px 12px; border-radius: 100px;
  font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;
}
.article-card__body  { padding: 22px; display: flex; flex-direction: column; gap: 12px; flex: 1; }
.article-card__title {
  font-family: var(--font-display); font-size: 22px; font-weight: 500;
  color: var(--text-primary); line-height: 1.25;
}
.article-card__excerpt { font-size: 14px; color: var(--text-secondary); line-height: 1.6; flex: 1; }
.article-card__meta { display: flex; align-items: center; justify-content: space-between; }
.article-card__actions { display: flex; align-items: center; gap: 10px; }
.article-card__time { font-size: 13px; color: var(--text-muted); }
.article-card__download {
  font-size: 12px;
  font-weight: 600;
  color: var(--sky-700);
  text-decoration: none;
}
.article-card__download:hover { text-decoration: underline; }
.article-card__bookmark {
  background: none; border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: var(--text-muted);
  transition: transform var(--duration-fast) var(--ease-bounce); padding: 4px;
}
.article-card__bookmark.active { color: var(--sky-600); }
.article-card__bookmark:hover { transform: scale(1.3); }
</style>
