<template>
  <div class="practice-view">
    <div class="container">
      <header class="practice-header">
        <h1>{{ t('practice.title') }}</h1>
        <p>{{ t('practice.subtitle') }}</p>
      </header>

      <div v-if="practiceItems.length" class="practice-grid">
        <article
          v-for="item in practiceItems"
          :key="item.id"
          class="practice-card"
          @click="openPractice(item.id)"
        >
          <div class="practice-card__thumb" :style="thumbStyle(item)">
            <span class="practice-card__badge">{{ translateTaxonomyLabel(t, item.category) }}</span>
            <span class="practice-card__dur">{{ durationLabel(item) }}</span>
          </div>
          <h2 class="practice-card__title">{{ item.title }}</h2>
          <p class="practice-card__desc">{{ item.descriptionShort || t('practice.no_description') }}</p>
        </article>
      </div>

      <div v-else class="practice-empty">
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
import { translateTaxonomyLabel } from '@/utils/i18nLabels'

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

function durationLabel(item) {
  const m = Math.round((item.duration || 0) / 60)
  return `${m} ${t('explore.min')}`
}

function thumbStyle(item) {
  const src = item.thumbnail || item.banner
  return src
    ? { backgroundImage: `url("${src}")`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { background: item.thumbnailGradient }
}
</script>

<style scoped>
.practice-view { padding: 34px 0 var(--page-pad-bottom-auth); min-height: var(--app-min-height); }
.practice-header h1 { font-family: var(--font-d); font-size: clamp(26px, 3.5vw, 38px); font-weight: 400; letter-spacing: 0.03em; }
.practice-header p { margin-top: 6px; color: var(--text-secondary); }
.practice-grid { margin-top: 20px; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); gap: 14px; }
.practice-card { border-radius: var(--r-lg); border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.04); overflow: hidden; cursor: pointer; transition: all var(--duration-fast) var(--ease-smooth); }
.practice-card:hover { border-color: rgba(167,139,250,0.5); transform: translateY(-2px); }
.practice-card__thumb { height: 170px; display: flex; align-items: flex-end; padding: 12px; position: relative; }
.practice-card__badge { font-size: 10px; letter-spacing: .12em; text-transform: uppercase; color: #e9ddff; background: rgba(7,13,26,0.55); border: 1px solid rgba(167,139,250,0.45); border-radius: var(--r-full); padding: 3px 9px; }
.practice-card__dur {
  position: absolute; top: 10px; right: 10px;
  font-size: 11px; font-weight: 600; color: #fff;
  background: rgba(0, 0, 0, 0.62); padding: 4px 9px; border-radius: 8px;
}
.practice-card__title { margin: 12px 12px 8px; font-family: var(--font-d); font-size: 22px; }
.practice-card__desc { margin: 0 12px 12px; color: var(--text-secondary); font-size: 14px; line-height: 1.55; }
.practice-empty { text-align: center; padding: 80px 20px; color: var(--text-secondary); }
</style>
