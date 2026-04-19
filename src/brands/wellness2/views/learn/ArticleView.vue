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
  height: 320px; border-radius: var(--radius-lg);
  display: flex; align-items: flex-end;
  padding: 24px; margin-bottom: 36px;
  border: 2px solid var(--ink-200);
  box-shadow: 6px 6px 0 var(--ink-200);
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
.article-content__body strong { font-weight: 700; color: var(--ink-900); }
.article-content__body em { font-style: italic; color: var(--sage-600); }

.article-related { max-width: 720px; margin: 0 auto; padding: 0 var(--container-pad) 80px; }
.article-related__title { font-family: var(--font-display); font-size: 26px; font-weight: 300; color: var(--ink-900); margin-bottom: 20px; padding-bottom: 12px; border-bottom: 2px solid var(--ink-200); }
.article-related__grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(200px,1fr)); gap: 16px; }
.related-item { text-decoration: none; display: flex; flex-direction: column; gap: 10px; cursor: pointer; }
.related-item__img {
  height: 120px; border-radius: var(--radius);
  border: 2px solid var(--ink-100); transition: all var(--duration-normal);
}
.related-item:hover .related-item__img { transform: translate(-2px,-2px); box-shadow: 4px 4px 0 var(--ink-200); }
.related-item__cat { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: var(--sage-500); }
.related-item__title { font-family: var(--font-display); font-size: 16px; font-weight: 400; color: var(--ink-900); line-height: 1.4; }

.article-404 { text-align: center; padding: 80px 20px; color: var(--text-secondary); }
</style>
