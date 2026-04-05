<template>
  <div class="pre-play">
    <div class="pre-play__cover" :style="{ background: session?.thumbnailGradient }">
      <span class="pre-play__type-emoji">{{ typeEmoji }}</span>
    </div>

    <div class="pre-play__content">
      <span class="pre-play__category-badge">{{ session?.category }}</span>
      <h1 class="pre-play__title">{{ session?.title }}</h1>
      <p class="pre-play__meta">
        {{ session?.type }} · {{ durationLabel }} · {{ session?.level }}
      </p>
      <p class="pre-play__desc">{{ session?.description }}</p>

      <div class="pre-play__actions">
        <button class="pre-play__play-btn" @click="emit('play')">
          <span class="pre-play__play-icon">▶</span>
          {{ t('player.play') }}
        </button>
        <button
          class="pre-play__fav-btn"
          :class="{ 'pre-play__fav-btn--active': isFavorite }"
          @click="emit('favorite')"
          :title="isFavorite ? t('player.remove_favorite') : t('player.add_favorite')"
        >
          {{ isFavorite ? '❤️' : '🤍' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useProgressStore } from '@/stores/progress'

const { t } = useI18n()
const props = defineProps({ session: Object })
const emit  = defineEmits(['play', 'favorite'])
const progressStore = useProgressStore()

const isFavorite = computed(() => progressStore.isFavorite(props.session?.id))
const typeEmojiMap = { meditation: '🧘', 'sleep-story': '🌙', soundscape: '🎵', motivational: '⚡', breathing: '💨' }
const typeEmoji   = computed(() => typeEmojiMap[props.session?.type] || '🧘')
const durationLabel = computed(() => {
  const m = Math.round((props.session?.duration || 0) / 60)
  return `${m} ${t('explore.min')}`
})
</script>

<style scoped>
.pre-play { display: flex; flex-direction: column; align-items: center; max-width: 560px; margin: 0 auto; padding: 32px 20px; }
.pre-play__cover {
  width: 100%; max-width: 320px; aspect-ratio: 1;
  border-radius: var(--radius-xl); margin-bottom: 36px;
  display: flex; align-items: center; justify-content: center;
  box-shadow: var(--shadow-xl);
}
.pre-play__type-emoji { font-size: 80px; }
.pre-play__content { width: 100%; text-align: center; }
.pre-play__category-badge {
  display: inline-block; padding: 4px 14px; border-radius: 100px;
  background: var(--sky-100); color: var(--sky-700);
  font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;
  margin-bottom: 16px;
}
.pre-play__title {
  font-family: var(--font-display); font-size: clamp(28px, 5vw, 40px);
  font-weight: 400; color: var(--text-primary); margin-bottom: 10px; line-height: 1.2;
}
.pre-play__meta   { font-size: 14px; color: var(--text-muted); margin-bottom: 20px; }
.pre-play__desc   { font-size: 16px; color: var(--text-secondary); line-height: 1.7; margin-bottom: 36px; max-width: 480px; }
.pre-play__actions { display: flex; align-items: center; justify-content: center; gap: 16px; }
.pre-play__play-btn {
  display: flex; align-items: center; gap: 12px;
  padding: 18px 48px; border-radius: 100px; border: none; cursor: pointer;
  background: linear-gradient(135deg, var(--sky-500), var(--sky-600));
  color: white; font-family: var(--font-body); font-size: 18px; font-weight: 500;
  box-shadow: 0 6px 24px rgba(14,165,233,0.35);
  transition: all var(--duration-normal) var(--ease-smooth);
}
.pre-play__play-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 32px rgba(14,165,233,0.45); }
.pre-play__play-icon { font-size: 16px; }
.pre-play__fav-btn {
  width: 52px; height: 52px; border-radius: 50%;
  background: var(--bg-surface); border: 1.5px solid var(--border-default);
  font-size: 22px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all var(--duration-fast) var(--ease-bounce);
}
.pre-play__fav-btn:hover { transform: scale(1.15); }
</style>
