<template>
  <div class="practice-video-view">
    <div class="practice-wrap">
      <button type="button" class="back-btn" @click="router.push({ name: 'practice' })">
        <Icon icon="lucide:arrow-left" class="app-icon app-icon--sm" />
        {{ t('common.back') }}
      </button>

      <div v-if="item">
        <div class="player-shell">
          <iframe
            v-if="embedUrl"
            :src="embedUrl"
            class="player-media"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          />
          <video v-else class="player-media" controls playsinline :src="videoUrl" />
        </div>
        <h1 class="player-title">{{ item.title }}</h1>
        <p class="player-desc">{{ item.descriptionShort || t('practice.no_description') }}</p>
      </div>
      <div v-else class="empty">
        <Icon icon="lucide:clapperboard" class="app-icon app-icon--2xl app-icon--muted" />
        <p>{{ t('practice.empty') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/products'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()
const item = ref(null)

onMounted(async () => {
  if (!productsStore.loaded) await productsStore.fetchProducts()
  item.value = productsStore.getById(route.params.id) || (await productsStore.fetchProductById(route.params.id))
})

const videoUrl = computed(() => item.value?.videoPresentation || item.value?.audioUrl || '')
const embedUrl = computed(() => {
  const url = videoUrl.value
  if (!url) return ''
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/i)
  if (yt?.[1]) return `https://www.youtube.com/embed/${yt[1]}`
  const vm = url.match(/vimeo\.com\/(\d+)/i)
  if (vm?.[1]) return `https://player.vimeo.com/video/${vm[1]}`
  return ''
})
</script>

<style scoped>
.practice-video-view { min-height: var(--app-min-height); background: var(--forest-900); }
.practice-wrap { max-width: 1280px; margin: 0 auto; padding: calc(var(--navbar-height) + 28px) var(--container-pad) 100px; }
.back-btn { border-radius: 999px; border: var(--border-glass); background: var(--bg-glass); color: var(--text-primary); padding: 8px 14px; display: inline-flex; align-items: center; gap: 6px; cursor: pointer; }
.player-shell { margin-top: 14px; border-radius: 18px; overflow: hidden; border: var(--border-glass); background: #000; aspect-ratio: 16/9; }
.player-media { width: 100%; height: 100%; border: 0; }
.player-title { margin-top: 14px; font-family: var(--font-display); font-size: 26px; }
.player-desc { margin-top: 8px; color: var(--text-secondary); }
.empty { margin-top: 34px; text-align: center; color: var(--text-secondary); }
</style>
