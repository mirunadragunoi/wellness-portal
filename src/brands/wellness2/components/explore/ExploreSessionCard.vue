<template>
  <div class="session-card" @click="emit('play', session)">
    <!-- Thumbnail -->
    <div class="session-card__img" :style="{ background: session.thumbnailGradient }">
      <span class="session-card__badge" :style="badgeStyle">{{ session.category }}</span>
      <div class="session-card__play-overlay">
        <button type="button" class="play-btn" aria-label="Play" @click.stop="emit('play', session)">
          <Icon icon="lucide:play" class="app-icon app-icon--lg" />
        </button>
      </div>
      <span class="session-card__type">
        <Icon :icon="sessionTypeIcon(session.type)" class="app-icon app-icon--sm" />
      </span>
    </div>

    <!-- Body -->
    <div class="session-card__body">
      <h4 class="session-card__title">{{ session.title }}</h4>
      <div class="session-card__meta">
        <span class="session-card__duration">{{ durationLabel }}</span>
        <span class="session-card__dot">·</span>
        <span class="session-card__level">{{ session.level }}</span>
      </div>
    </div>

    <!-- Favorite -->
    <button
      class="session-card__fav"
      :class="{ 'session-card__fav--active': isFavorite }"
      @click.stop="emit('favorite', session.id)"
      :aria-label="t('player.add_favorite')"
    >
      <Icon
        :icon="isFavorite ? 'mdi:heart' : 'lucide:heart'"
        class="session-card__fav-icon app-icon app-icon--md"
      />
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useProgressStore } from '@/stores/progress'
import { sessionTypeIcon } from '@/constants/appIcons'

const { t } = useI18n()
const props = defineProps({ session: { type: Object, required: true } })
const emit  = defineEmits(['play', 'favorite'])

const progressStore = useProgressStore()
const isFavorite = computed(() => progressStore.isFavorite(props.session.id))

const categoryColors = {
  stress:      { bg: 'var(--sage-100)', color: '#1e40af' },
  anxiety:     { bg: '#f0f7ee', color: 'var(--sage-700)' },
  sleep:       { bg: '#e0e7ff', color: '#3730a3' },
  focus:       { bg: 'var(--parchment-2)', color: 'var(--ink-700)' },
  mindfulness: { bg: '#dcfce7', color: '#166534' },
  energy:      { bg: '#fef3c7', color: '#92400e' }
}
const badgeStyle = computed(() => {
  const c = categoryColors[props.session.category] || { bg: '#f1f5f9', color: '#475569' }
  return { background: c.bg, color: c.color }
})

const durationLabel = computed(() => {
  const m = Math.round(props.session.duration / 60)
  return `${m} ${t('explore.min')}`
})
</script>

<style scoped>
.session-card {
  position: relative;
  background: var(--bg-glass); backdrop-filter: blur(16px);
  border: var(--border-glass); border-radius: 18px;
  overflow: hidden; display: flex; flex-direction: column;
  cursor: pointer; transition: all 280ms var(--ease-smooth);
  box-shadow: var(--glow-card);
}
.session-card:hover { border-color: rgba(184,245,102,0.25); box-shadow: var(--glow-card-hover); transform: translateY(-4px); }

.session-card__img {
  height: 150px; position: relative; overflow: hidden;
  background: var(--forest-700);
  background-size: cover; background-position: center;
}
.session-card__img::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(160deg, rgba(184,245,102,0.08), rgba(7,15,10,0.5));
}
.session-card__badge {
  position: absolute; top: 10px; left: 10px; z-index: 2;
  padding: 3px 10px; border-radius: 999px;
  background: rgba(7,15,10,0.75); backdrop-filter: blur(8px);
  font-size: 9px; font-weight: 700; color: var(--lime-400);
  letter-spacing: 1px; text-transform: uppercase;
  border: 1px solid rgba(184,245,102,0.2);
}
.session-card__play-overlay {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
}
.play-btn {
  width: 34px; height: 34px; border-radius: 50%;
  background: var(--lime-500); color: var(--forest-900);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transform: scale(0.6); transition: all 220ms var(--ease-smooth);
}
.session-card:hover .play-btn { opacity: 1; transform: scale(1); }
.session-card__type {
  position: absolute; left: 10px; bottom: 10px; z-index: 2;
  padding: 3px 8px; border-radius: 999px;
  background: rgba(7,15,10,0.6); backdrop-filter: blur(4px);
  font-size: 9px; color: var(--text-muted); border: 1px solid rgba(255,255,255,0.08);
  display: flex; align-items: center;
}

.session-card__body { padding: 14px 16px; flex: 1; display: flex; flex-direction: column; gap: 6px; }
.session-card__title {
  font-family: var(--font-display); font-size: 14px; font-weight: 700;
  color: var(--text-primary); line-height: 1.2;
}
.session-card__meta { display: flex; align-items: center; justify-content: space-between; }
.session-card__duration { font-family: var(--font-mono); font-size: 10px; color: var(--text-muted); }
.session-card__dot { display: none; }
.session-card__level { font-size: 11px; color: var(--lime-500); font-weight: 600; }
.session-card__fav {
  position: absolute; right: 10px; top: 10px; z-index: 2;
  background: rgba(7,15,10,0.6); backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.1); cursor: pointer;
  color: var(--text-muted); width: 28px; height: 28px; border-radius: 50%;
  display: inline-flex; align-items: center; justify-content: center;
  opacity: 0; transition: all 150ms;
}
.session-card:hover .session-card__fav { opacity: 1; }
.session-card__fav--active { color: #f87171; opacity: 1; }
.session-card__fav:hover { color: #f87171; background: rgba(239,68,68,0.1); }
</style>
