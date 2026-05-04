<template>
  <div class="practice-video-view">
    <div class="container">
      <button type="button" class="practice-video-back" @click="router.push({ name: 'practice' })">
        <Icon icon="lucide:arrow-left" class="app-icon app-icon--sm" />
        {{ t('common.back') }}
      </button>

      <div v-if="item" class="practice-video-content">
        <div class="practice-video-wrap">
          <iframe
            v-if="embedUrl"
            :src="embedUrl"
            class="practice-video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          />
          <video v-else class="practice-video" controls playsinline :src="videoUrl" />
        </div>
        <h1 class="practice-title">{{ item.title }}</h1>
        <p class="practice-desc">{{ item.descriptionShort || t('practice.no_description') }}</p>
      </div>
      <div v-else class="practice-empty">
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
.practice-video-view { padding: 34px 0 var(--page-pad-bottom-auth); min-height: var(--app-min-height); }
.practice-video-back { border: 1px solid rgba(255,255,255,0.12); border-radius: var(--r-full); background: rgba(255,255,255,0.04); color: var(--text-primary); padding: 8px 14px; display: inline-flex; align-items: center; gap: 6px; cursor: pointer; }
.practice-video-content { margin-top: 12px; }
.practice-video-wrap { background: #000; border-radius: var(--r-lg); overflow: hidden; border: 1px solid rgba(255,255,255,0.12); aspect-ratio: 16/9; }
.practice-video { width: 100%; height: 100%; border: 0; }
.practice-title { margin-top: 12px; font-family: var(--font-d); font-size: 28px; }
.practice-desc { margin-top: 8px; color: var(--text-secondary); }
.practice-empty { text-align: center; padding: 80px 20px; color: var(--text-secondary); }
</style>
