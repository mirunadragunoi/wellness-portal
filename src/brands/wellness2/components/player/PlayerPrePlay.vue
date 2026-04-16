<template>
  <div class="pre-play">
    <div class="pre-play__cover" :style="{ background: session?.thumbnailGradient }">
      <Icon :icon="coverIcon" class="pre-play__type-icon app-icon app-icon--3xl" />
    </div>

    <div class="pre-play__content">
      <span class="pre-play__category-badge">{{ session?.category }}</span>
      <h1 class="pre-play__title">{{ session?.title }}</h1>
      <p class="pre-play__meta">
        {{ session?.type }} · {{ durationLabel }} · {{ session?.level }}
      </p>
      <p class="pre-play__desc">{{ session?.description }}</p>

      <div class="pre-play__actions">
        <button type="button" class="pre-play__play-btn" @click="emit('play')">
          <Icon icon="lucide:play" class="pre-play__play-icon app-icon app-icon--md" />
          {{ t('player.play') }}
        </button>
        <button
          class="pre-play__fav-btn"
          :class="{ 'pre-play__fav-btn--active': isFavorite }"
          @click="emit('favorite')"
          :title="isFavorite ? t('player.remove_favorite') : t('player.add_favorite')"
        >
          <Icon :icon="isFavorite ? 'mdi:heart' : 'lucide:heart'" class="app-icon app-icon--md" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useProgressStore } from '@/stores/progress'
import { sessionTypeIcon } from '@/constants/appIcons'

const { t } = useI18n()
const props = defineProps({ session: Object })
const emit  = defineEmits(['play', 'favorite'])
const progressStore = useProgressStore()

const isFavorite = computed(() => progressStore.isFavorite(props.session?.id))
const coverIcon = computed(() => sessionTypeIcon(props.session?.type))
const durationLabel = computed(() => {
  const m = Math.round((props.session?.duration || 0) / 60)
  return `${m} ${t('explore.min')}`
})
</script>

<style scoped>
.pre-play {
  min-height: var(--app-min-height);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--parchment);
  padding: 34px var(--container-pad);
}
.pre-play__cover {
  width: min(100%, 520px);
  height: 230px;
  background-size: cover;
  background-position: center;
  border: 2px solid var(--ink-200);
  border-radius: var(--radius-xl);
  box-shadow: 5px 5px 0 var(--ink-100);
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 16px;
}
.pre-play__type-icon {
  color: rgba(255,255,255,0.92);
  filter: drop-shadow(0 4px 10px rgba(0,0,0,0.28));
}
.pre-play__content {
  width: min(100%, 520px);
  margin-top: 16px;
  background: #fff;
  border: 2px solid var(--ink-200);
  border-radius: var(--radius-lg);
  box-shadow: 4px 4px 0 var(--ink-100);
  padding: 20px;
}
.pre-play__category-badge {
  display: inline-flex;
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  background: var(--sage-100);
  border: 1px solid var(--sage-200);
  color: var(--sage-700);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.pre-play__title { font-family: var(--font-display); font-size: 30px; font-weight: 300; color: var(--ink-900); margin: 10px 0 6px; line-height: 1.2; }
.pre-play__meta { font-size: 13px; color: var(--text-muted); margin-bottom: 14px; }
.pre-play__desc { font-size: 15px; color: var(--text-secondary); line-height: 1.7; }
.pre-play__actions { margin-top: 18px; display: flex; gap: 10px; }
.pre-play__play-btn {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 13px 16px;
  border-radius: var(--radius-sm);
  border: 2px solid var(--sage-600);
  background: var(--sage-500);
  color: #fff;
  font-size: 15px;
  font-weight: 700;
}
.pre-play__fav-btn {
  width: 50px;
  height: 50px;
  border-radius: var(--radius-sm);
  border: 2px solid var(--ink-200);
  background: #fff;
  color: var(--text-secondary);
}
.pre-play__fav-btn--active {
  color: #b85c38;
  border-color: #d9a08b;
  background: #fff3ee;
}

@media (max-width: 640px) {
  .pre-play {
    padding: 18px 16px;
  }
  .pre-play__cover {
    height: 180px;
  }
  .pre-play__content {
    padding: 16px;
  }
  .pre-play__title {
    font-size: 25px;
  }
}
</style>
