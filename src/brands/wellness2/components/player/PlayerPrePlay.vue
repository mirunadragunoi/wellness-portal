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
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  background: var(--forest-900);
  padding: calc(var(--navbar-height) + 24px) var(--container-pad) 60px;
}
.pre-play__cover {
  width: min(100%, 520px); height: 240px;
  background: var(--forest-700);
  background-size: cover; background-position: center;
  border: 1px solid rgba(184,245,102,0.15);
  border-radius: var(--radius-xl);
  box-shadow: 0 0 40px rgba(184,245,102,0.08);
  display: flex; align-items: flex-end; justify-content: flex-end;
  padding: 16px; overflow: hidden; position: relative;
}
.pre-play__cover::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(7,15,10,0.6) 0%, transparent 50%);
}
.pre-play__type-icon {
  position: relative; z-index: 1;
  color: var(--lime-400);
  filter: drop-shadow(0 0 12px rgba(184,245,102,0.4));
}
.pre-play__content {
  width: min(100%, 520px); margin-top: 16px;
  background: rgba(13,31,18,0.7); backdrop-filter: blur(20px);
  border: 1px solid rgba(184,245,102,0.12);
  border-radius: var(--radius-lg);
  box-shadow: var(--glow-card);
  padding: 24px;
}
.pre-play__category-badge {
  display: inline-flex; padding: 4px 12px; border-radius: 999px;
  background: rgba(184,245,102,0.1); border: 1px solid rgba(184,245,102,0.2);
  color: var(--lime-400); font-size: 11px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 1px;
}
.pre-play__title { font-family: var(--font-display); font-size: clamp(22px,3vw,30px); font-weight: 800; letter-spacing: -1px; color: var(--text-primary); margin: 10px 0 6px; line-height: 1.15; }
.pre-play__meta { font-family: var(--font-mono); font-size: 12px; color: var(--text-muted); margin-bottom: 14px; }
.pre-play__desc { font-size: 14px; color: var(--text-secondary); line-height: 1.7; }
.pre-play__actions { margin-top: 20px; display: flex; gap: 10px; }
.pre-play__play-btn {
  flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  padding: 13px 20px; border-radius: var(--radius-pill);
  border: none; background: var(--lime-500); color: var(--forest-900);
  font-size: 15px; font-weight: 700; font-family: var(--font-body); cursor: pointer;
  transition: all 220ms var(--ease-smooth);
}
.pre-play__play-btn:hover { background: var(--lime-400); box-shadow: 0 0 28px rgba(184,245,102,0.35); }
.pre-play__fav-btn {
  width: 50px; height: 50px; border-radius: var(--radius-pill);
  border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.06);
  color: var(--text-secondary); cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all 150ms;
}
.pre-play__fav-btn:hover { border-color: rgba(239,68,68,0.3); color: #f87171; background: rgba(239,68,68,0.08); }
.pre-play__fav-btn--active { color: #f87171; border-color: rgba(239,68,68,0.3); background: rgba(239,68,68,0.08); }

@media (max-width: 640px) {
  .pre-play { padding: calc(var(--navbar-height) + 16px) 16px 40px; }
  .pre-play__cover { height: 180px; }
  .pre-play__content { padding: 16px; }
}
</style>
