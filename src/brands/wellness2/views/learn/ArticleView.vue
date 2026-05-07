<template>
  <div class="article-view">
    <div class="container">
      <RouterLink to="/learn" class="article-view__back">
        <Icon icon="lucide:arrow-left" class="app-icon app-icon--xs" aria-hidden="true" />
        {{ t('learn.title') }}
      </RouterLink>

      <div v-if="loading" class="article-view__loading" aria-busy="true">
        <span class="article-view__loading-dot" />
      </div>

      <div v-else-if="article" class="article-view__layout">
        <!-- Article -->
        <article class="article-content">
          <!-- Cover -->
          <div class="article-content__cover" :style="coverStyle(article)">
            <span class="article-content__cat">{{ article.category }}</span>
          </div>

          <!-- Meta -->
          <div class="article-content__meta">
            <span class="article-content__time">{{ t('learn.read_time', { n: article.readTime }) }}</span>
            <span class="article-content__dot">·</span>
            <span class="article-content__date">{{ formatDate(article.datePublished) }}</span>
            <a
              v-if="article.downloadUrl"
              class="article-content__download"
              :href="article.downloadUrl"
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              Download PDF
            </a>
            <button
              v-if="article.isAudioArticle && article.audioUrl"
              type="button"
              class="article-content__listen"
              @click="listenAudio(article)"
            >
              <Icon icon="lucide:headphones" class="app-icon app-icon--sm" aria-hidden="true" />
              Listen audio
            </button>
            <button
              type="button"
              class="article-content__bookmark"
              :class="{ active: isBookmarked }"
              @click="isBookmarked = !isBookmarked"
            >
              <Icon
                :icon="isBookmarked ? 'lucide:bookmark-check' : 'lucide:bookmark-plus'"
                class="article-content__bookmark-icon app-icon app-icon--sm"
                aria-hidden="true"
              />
              {{ isBookmarked ? t('learn.bookmarked') : t('learn.bookmark') }}
            </button>
          </div>

          <!-- Title -->
          <h1 class="article-content__title">{{ article.title }}</h1>
          <p class="article-content__excerpt">{{ article.excerpt }}</p>

          <!-- Content -->
          <div class="article-content__body prose" v-html="article.content" />

          <!-- Footer -->
          <div class="article-content__footer">
            <RouterLink to="/learn" class="article-footer-btn">
              <Icon icon="lucide:arrow-left" class="app-icon app-icon--xs" aria-hidden="true" />
              {{ t('learn.more_articles') }}
            </RouterLink>
          </div>
        </article>

        <!-- Sidebar -->
        <aside class="article-sidebar">
          <div class="article-sidebar__card">
            <h3 class="article-sidebar__title">Ready to practice?</h3>
            <p class="article-sidebar__body">Put what you've learned into action with a guided session.</p>
            <RouterLink to="/explore" class="article-sidebar__btn">
              {{ t('learn.browse_sessions') }}
              <Icon icon="lucide:chevron-right" class="app-icon app-icon--sm" aria-hidden="true" />
            </RouterLink>
          </div>

          <!-- Related articles -->
          <div class="article-sidebar__related">
            <h4 class="article-sidebar__related-title">Related Articles</h4>
            <RouterLink
              v-for="rel in related"
              :key="rel.id"
              :to="{ name: 'article', params: { slug: rel.slug } }"
              class="related-item"
            >
              <div class="related-item__img" :style="relStyle(rel)" />
              <div class="related-item__info">
                <p class="related-item__title">{{ rel.title }}</p>
                <p class="related-item__time">{{ t('learn.read_time', { n: rel.readTime }) }}</p>
              </div>
            </RouterLink>
          </div>
        </aside>
      </div>

      <!-- 404 -->
      <div v-else-if="!loading" class="article-view__not-found">
        <p>Article not found.</p>
        <RouterLink to="/learn" class="article-view__back article-view__back--center">
          <Icon icon="lucide:arrow-left" class="app-icon app-icon--xs" aria-hidden="true" />
          {{ t('learn.back_to_learn') }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useArticlePage } from '@/composables/useArticlePage'
import { cssBackgroundFromImageUrl } from '@/utils/productImageUrl'
import dayjs from 'dayjs'

const { t } = useI18n()
const router = useRouter()
const { article, related, loading } = useArticlePage()
const isBookmarked = ref(false)

const formatDate = (d) => dayjs(d).format('MMMM D, YYYY')

function coverStyle(a) {
  const img = cssBackgroundFromImageUrl(a.thumbnail || a.banner, {
    size: 'contain',
    backgroundColor: 'var(--parchment)'
  })
  return Object.keys(img).length ? img : { background: a.thumbnailGradient }
}

function relStyle(r) {
  const img = cssBackgroundFromImageUrl(r.thumbnail || r.banner, {
    size: 'contain',
    backgroundColor: 'var(--parchment)'
  })
  return Object.keys(img).length ? img : { background: r.thumbnailGradient }
}

function listenAudio(a) {
  router.push({ name: 'session', params: { id: a.id }, query: { autoplay: '1' } })
}
</script>

<style scoped>
.article-view { min-height: var(--app-min-height); background: var(--parchment); }

.article-view__back {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 16px; margin: 20px var(--container-pad);
  border: 2px solid var(--ink-200); border-radius: var(--radius-sm);
  font-size: 13px; font-weight: 600; color: var(--ink-700);
  text-decoration: none; transition: all var(--duration-fast);
  box-shadow: 2px 2px 0 var(--ink-100);
}
.article-view__back:hover { background: var(--ink-900); color: var(--parchment); border-color: var(--ink-900); box-shadow: 2px 2px 0 var(--ink-700); }

.article-content { max-width: 720px; margin: 0 auto; padding: 0 var(--container-pad) 80px; }
.article-content__cover {
  height: 420px; border-radius: var(--radius-lg);
  display: flex; align-items: flex-end;
  padding: 24px; margin-bottom: 36px;
  border: 2px solid var(--ink-200);
  box-shadow: 6px 6px 0 var(--ink-200);
  background-color: var(--forest-800);
}
.article-content__tag {
  display: inline-block; padding: 5px 12px;
  background: var(--ink-900); color: var(--parchment);
  font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;
  border-radius: var(--radius-sm);
}
.article-content__h1 {
  font-family: var(--font-display); font-size: clamp(28px,4vw,46px); font-weight: 300;
  line-height: 1.15; letter-spacing: -0.5px; color: var(--ink-900);
  margin: 24px 0 20px;
}
.article-content__meta { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; margin-bottom: 32px; }
.meta-item { display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--text-muted); font-weight: 500; }
.meta-divider { width: 4px; height: 4px; border-radius: 50%; background: var(--ink-200); }
.article-content__download {
  margin-left: auto;
  font-size: 13px;
  font-weight: 700;
  color: var(--sage-700);
  text-decoration: none;
}
.article-content__download:hover { text-decoration: underline; }
.article-content__listen {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 14px; border-radius: 100px; border: none; cursor: pointer;
  background: var(--ink-900); color: var(--parchment); font-size: 13px; font-weight: 600;
}
.article-content__excerpt {
  font-family: var(--font-display); font-size: 18px; font-style: italic;
  color: var(--text-secondary); line-height: 1.7; margin-bottom: 36px;
  padding: 20px 24px; border-left: 4px solid var(--sage-400);
  background: var(--bg-surface); border-radius: 0 var(--radius) var(--radius) 0;
}
.article-content__body { font-size: 16px; line-height: 1.9; color: var(--text-primary); }
.article-content__body p { margin-bottom: 20px; }
.article-content__body h2 { font-family: var(--font-display); font-size: 26px; font-weight: 400; margin: 36px 0 16px; color: var(--ink-900); }
.article-content__body h3 { font-family: var(--font-display); font-size: 20px; font-weight: 400; margin: 28px 0 12px; }
.article-content__body ul, .article-content__body ol { margin: 0 0 20px 24px; }
.article-content__body li { margin-bottom: 8px; }
.article-content__body :deep(ol.article-reflect) { margin: 8px 0 28px; padding-left: 1.35em; }
.article-content__body :deep(ol.article-reflect li) { margin-bottom: 14px; }

.article-view__loading {
  display: flex; justify-content: center; padding: 120px 20px;
}
.article-view__loading-dot {
  width: 10px; height: 10px; border-radius: 50%;
  background: var(--sage-500);
  animation: article-pulse 0.9s ease-in-out infinite alternate;
}
@keyframes article-pulse {
  to { opacity: 0.35; transform: scale(0.85); }
}
.article-content__body strong { font-weight: 700; color: var(--ink-900); }
.article-content__body em { font-style: italic; color: var(--sage-600); }

.article-sidebar { max-width: 720px; margin: 36px auto 0; padding: 0 var(--container-pad); display: flex; flex-direction: column; gap: 24px; }
.article-sidebar__card {
  background: rgba(13,31,18,0.6); backdrop-filter: blur(16px);
  border: 1px solid rgba(184,245,102,0.18); border-radius: var(--radius-lg); padding: 24px;
}
.article-sidebar__title { font-family: var(--font-display); font-size: 20px; font-weight: 800; color: var(--text-primary); margin-bottom: 8px; letter-spacing: -0.5px; }
.article-sidebar__body { font-size: 14px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 16px; }
.article-sidebar__btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 10px 22px; border-radius: 999px;
  background: var(--lime-500); color: var(--forest-900);
  font-size: 13px; font-weight: 700; text-decoration: none;
  transition: all 200ms;
}
.article-sidebar__btn:hover { background: var(--lime-400); box-shadow: 0 0 24px rgba(184,245,102,0.3); }

.article-sidebar__related-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: var(--lime-500); margin-bottom: 12px; }
.related-item {
  display: flex; flex-direction: row; align-items: center; gap: 12px;
  padding: 10px; margin-bottom: 8px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px; text-decoration: none;
  transition: all 200ms;
}
.related-item:hover { border-color: rgba(184,245,102,0.25); transform: translateX(3px); }
.related-item__img {
  width: 60px; height: 60px; border-radius: 8px; flex-shrink: 0;
  background-color: var(--forest-800);
}
.related-item__info { flex: 1; min-width: 0; }
.related-item__title { font-size: 13px; font-weight: 700; color: var(--text-primary); line-height: 1.3; margin-bottom: 4px; font-family: var(--font-display); letter-spacing: -0.2px; }
.related-item__time { font-size: 11px; color: var(--text-muted); font-family: var(--font-mono); }

.article-404 { text-align: center; padding: 80px 20px; color: var(--text-secondary); }
</style>
