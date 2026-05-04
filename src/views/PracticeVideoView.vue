<template>
  <div class="practice-video-view">
    <div class="container">
      <button type="button" class="practice-video-view__back" @click="router.push({ name: 'practice' })">
        <Icon icon="lucide:arrow-left" class="app-icon app-icon--sm" />
        {{ t('common.back') }}
      </button>

      <div v-if="item" class="practice-video-view__content">
        <div class="practice-video-view__player">
          <iframe
            v-if="embedUrl"
            :src="embedUrl"
            class="practice-video-view__frame"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          />
          <video v-else class="practice-video-view__video" controls playsinline :src="videoUrl" />
        </div>
        <h1 class="practice-video-view__title">{{ item.title }}</h1>
        <p class="practice-video-view__description">{{ item.descriptionShort || t('practice.no_description') }}</p>
      </div>

      <div v-else class="practice-video-view__empty">
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
.practice-video-view__back { border: 1px solid var(--border-subtle); border-radius: 999px; background: var(--bg-surface); padding: 8px 14px; display: inline-flex; gap: 6px; align-items: center; cursor: pointer; }
.practice-video-view__content { margin-top: 14px; }
.practice-video-view__player { border-radius: var(--radius-lg); overflow: hidden; background: #000; aspect-ratio: 16/9; }
.practice-video-view__video, .practice-video-view__frame { width: 100%; height: 100%; border: 0; }
.practice-video-view__title { margin-top: 16px; font-size: 28px; }
.practice-video-view__description { margin-top: 8px; color: var(--text-secondary); }
.practice-video-view__empty { text-align: center; padding: 80px 20px; color: var(--text-secondary); display: flex; flex-direction: column; align-items: center; gap: 14px; }
</style>
