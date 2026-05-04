<template>
  <div class="practice-view">
    <div class="practice-wrap">
      <header class="practice-head">
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
            <span class="practice-card__badge">{{ item.category }}</span>
          </div>
          <h2 class="practice-card__title">{{ item.title }}</h2>
          <p class="practice-card__desc">{{ item.descriptionShort || t('practice.no_description') }}</p>
        </article>
      </div>

      <div v-else class="empty">
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
.practice-view { min-height: var(--app-min-height); background: var(--forest-900); }
.practice-wrap { max-width: 1280px; margin: 0 auto; padding: calc(var(--navbar-height) + 28px) var(--container-pad) 100px; }
.practice-head h1 { font-family: var(--font-display); font-size: clamp(24px, 3vw, 34px); letter-spacing: -1px; }
.practice-head p { color: var(--text-secondary); margin-top: 6px; }
.practice-grid { margin-top: 22px; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 290px), 1fr)); gap: 14px; }
.practice-card { background: var(--bg-glass); border: var(--border-glass); border-radius: 18px; overflow: hidden; cursor: pointer; transition: all 260ms var(--ease-out); }
.practice-card:hover { border-color: rgba(184,245,102,0.28); box-shadow: var(--glow-card-hover); transform: translateY(-3px); }
.practice-card__thumb { height: 170px; display: flex; align-items: flex-end; padding: 12px; }
.practice-card__badge { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; background: rgba(7,15,10,0.7); color: var(--lime-400); border: 1px solid rgba(184,245,102,0.22); border-radius: 999px; padding: 3px 9px; }
.practice-card__title { margin: 12px 14px 8px; font-family: var(--font-display); font-size: 20px; }
.practice-card__desc { margin: 0 14px 14px; color: var(--text-secondary); font-size: 14px; line-height: 1.55; }
.empty { margin-top: 34px; text-align: center; color: var(--text-secondary); }
</style>
