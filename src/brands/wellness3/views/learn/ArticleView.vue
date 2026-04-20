<template>
  <div class="article-view">
    <div class="container">
      <RouterLink to="/learn" class="article-view__back">
        <Icon icon="lucide:arrow-left" class="app-icon app-icon--xs" aria-hidden="true" />
        {{ t('learn.title') }}
      </RouterLink>

      <div v-if="article" class="article-view__layout">
        <!-- Article -->
        <article class="article-content">
          <!-- Cover -->
          <div class="article-content__cover" :style="{ background: article.thumbnailGradient }">
            <span class="article-content__cat">{{ article.category }}</span>
          </div>

          <!-- Meta -->
          <div class="article-content__meta">
            <span class="article-content__time">{{ t('learn.read_time', { n: article.readTime }) }}</span>
            <span class="article-content__dot">·</span>
            <span class="article-content__date">{{ formatDate(article.datePublished) }}</span>
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
              <div class="related-item__img" :style="{ background: rel.thumbnailGradient }" />
              <div class="related-item__info">
                <p class="related-item__title">{{ rel.title }}</p>
                <p class="related-item__time">{{ t('learn.read_time', { n: rel.readTime }) }}</p>
              </div>
            </RouterLink>
          </div>
        </aside>
      </div>

      <!-- 404 -->
      <div v-else class="article-view__not-found">
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
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getArticleBySlug, articles } from '@/data/articles'
import dayjs from 'dayjs'

const { t }     = useI18n()
const route     = useRoute()
const article   = computed(() => getArticleBySlug(route.params.slug))
const isBookmarked = ref(false)

const related = computed(() =>
  articles
    .filter(a => a.slug !== route.params.slug)
    .slice(0, 3)
)

const formatDate = (d) => dayjs(d).format('MMMM D, YYYY')
</script>

<style scoped>
.article-view { padding: 40px 0 var(--page-pad-bottom-auth); min-height: var(--app-min-height); }
.article-view__back {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 14px; color: var(--text-muted);
  text-decoration: none; margin-bottom: 32px;
  transition: color var(--duration-fast);
}
.article-view__back--center { margin-bottom: 0; justify-content: center; }
.article-view__back:hover { color: var(--sky-600); }

.article-view__layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 48px;
  align-items: start;
}

/* Article */
.article-content__cover {
  width: 100%; height: 280px;
  border-radius: var(--radius-xl);
  margin-bottom: 28px;
  display: flex; align-items: flex-end; padding: 20px;
}
.article-content__cat {
  background: rgba(255,255,255,0.9);
  padding: 5px 14px; border-radius: 100px;
  font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;
  color: var(--text-primary);
}
.article-content__meta {
  display: flex; align-items: center; gap: 10px;
  font-size: 13px; color: var(--text-muted);
  margin-bottom: 20px; flex-wrap: wrap;
}
.article-content__dot { color: var(--border-default); }
.article-content__bookmark {
  margin-left: auto; background: var(--bg-muted); border: none; cursor: pointer;
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 14px; border-radius: 100px;
  font-size: 13px; font-weight: 500; color: var(--text-secondary);
  transition: all var(--duration-fast);
}
.article-content__bookmark-icon { flex-shrink: 0; }
.article-content__bookmark:hover { background: var(--sky-100); color: var(--sky-700); }
.article-content__bookmark.active { background: var(--sky-100); color: var(--sky-700); }

.article-content__title {
  font-family: var(--font-display);
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 400; color: var(--text-primary);
  line-height: 1.15; margin-bottom: 16px; letter-spacing: -0.5px;
}
.article-content__excerpt {
  font-size: 18px; color: var(--text-secondary);
  line-height: 1.7; margin-bottom: 36px;
  padding-bottom: 36px;
  border-bottom: 1px solid var(--border-subtle);
}

/* Prose styles */
:deep(.prose) { color: var(--text-primary); }
:deep(.prose h2) {
  font-family: var(--font-display); font-size: 28px; font-weight: 500;
  color: var(--text-primary); margin: 36px 0 16px; letter-spacing: -0.3px;
}
:deep(.prose p) {
  font-size: 17px; line-height: 1.8; color: var(--text-secondary);
  margin-bottom: 20px;
}

.article-content__footer { margin-top: 48px; padding-top: 32px; border-top: 1px solid var(--border-subtle); }
.article-footer-btn {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 15px; color: var(--sky-600); text-decoration: none; font-weight: 500;
}
.article-footer-btn:hover { text-decoration: underline; }

/* Sidebar */
.article-sidebar { display: flex; flex-direction: column; gap: 24px; position: sticky; top: 80px; }
.article-sidebar__card {
  background: linear-gradient(135deg, var(--sky-600), var(--sky-700));
  border-radius: var(--radius-lg); padding: 28px;
}
.article-sidebar__title { font-family: var(--font-display); font-size: 22px; font-weight: 500; color: white; margin-bottom: 10px; }
.article-sidebar__body  { font-size: 14px; color: rgba(255,255,255,0.8); line-height: 1.6; margin-bottom: 20px; }
.article-sidebar__btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 10px 22px; border-radius: 100px;
  background: white; color: var(--sky-700); font-size: 14px; font-weight: 600;
  text-decoration: none; transition: all var(--duration-fast);
}
.article-sidebar__btn:hover { background: var(--sky-50); transform: translateY(-2px); }

.article-sidebar__related-title { font-size: 14px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 14px; }
.related-item {
  display: flex; align-items: center; gap: 12px;
  padding: 12px; border-radius: var(--radius);
  background: var(--bg-surface); border: 1px solid var(--border-subtle);
  text-decoration: none; margin-bottom: 8px;
  transition: all var(--duration-fast);
}
.related-item:hover { border-color: var(--sky-200); transform: translateX(3px); }
.related-item__img  { width: 44px; height: 44px; border-radius: var(--radius-sm); flex-shrink: 0; }
.related-item__title { font-size: 13px; font-weight: 600; color: var(--text-primary); line-height: 1.3; margin-bottom: 3px; }
.related-item__time  { font-size: 12px; color: var(--text-muted); }

.article-view__not-found { text-align: center; padding: 80px; color: var(--text-secondary); }

@media (max-width: 900px) {
  .article-view__layout { grid-template-columns: 1fr; }
  .article-sidebar { position: static; }
}
</style>
