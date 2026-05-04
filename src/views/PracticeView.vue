<template>
  <div class="practice-view">
    <div class="container">
      <div class="practice-view__header">
        <h1 class="practice-view__title">{{ t('practice.title') }}</h1>
        <p class="practice-view__subtitle">{{ t('practice.subtitle') }}</p>
      </div>

      <div v-if="practiceItems.length" class="practice-grid">
        <article
          v-for="item in practiceItems"
          :key="item.id"
          class="practice-card"
          @click="openPractice(item.id)"
        >
          <div class="practice-card__thumb" :style="thumbStyle(item)">
            <span class="practice-card__badge">{{ item.category }}</span>
          </div>
          <h2 class="practice-card__title">{{ item.title }}</h2>
          <p class="practice-card__desc">{{ item.descriptionShort || t('practice.no_description') }}</p>
        </article>
      </div>

      <div v-else class="practice-view__empty">
        <Icon icon="lucide:clapperboard" class="app-icon app-icon--2xl app-icon--muted" />
        <p>{{ t('practice.empty') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/products'

const { t } = useI18n()
const router = useRouter()
const productsStore = useProductsStore()

onMounted(async () => {
  if (!productsStore.loaded) await productsStore.fetchProducts()
})

const practiceItems = computed(() =>
  productsStore.sessions.filter((p) => {
    if (p.type === 'practice') return true
    const video = p.videoPresentation || p.audioUrl || ''
    return /youtube\.com|youtu\.be|vimeo\.com|\.mp4($|\?)/i.test(video)
  })
)

function openPractice(id) {
  router.push({ name: 'practice-video', params: { id } })
}

function thumbStyle(item) {
  const src = item.thumbnail || item.banner
  return src
    ? { backgroundImage: `url("${src}")`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { background: item.thumbnailGradient }
}
</script>

<style scoped>
.practice-view { padding: 40px 0 var(--page-pad-bottom-auth); min-height: var(--app-min-height); }
.practice-view__header { margin-bottom: 24px; }
.practice-view__title { font-family: var(--font-display); font-size: clamp(32px, 4vw, 48px); font-weight: 300; }
.practice-view__subtitle { color: var(--text-secondary); max-width: 680px; }
.practice-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr)); gap: 20px; }
.practice-card { border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); background: var(--bg-surface); overflow: hidden; cursor: pointer; transition: transform var(--duration-fast), box-shadow var(--duration-fast); }
.practice-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); }
.practice-card__thumb { height: 180px; display: flex; align-items: flex-end; padding: 12px; background: var(--bg-muted); }
.practice-card__badge { background: rgba(255,255,255,0.9); font-size: 11px; text-transform: capitalize; color: var(--text-primary); padding: 4px 10px; border-radius: 99px; }
.practice-card__title { font-size: 20px; margin: 14px 14px 8px; }
.practice-card__desc { margin: 0 14px 14px; color: var(--text-secondary); font-size: 14px; line-height: 1.55; }
.practice-view__empty { text-align: center; padding: 100px 20px; color: var(--text-secondary); display: flex; flex-direction: column; align-items: center; gap: 14px; }
</style>
