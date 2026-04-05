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
  stress:      { bg: '#dbeafe', color: '#1e40af' },
  anxiety:     { bg: '#ede9fe', color: '#5b21b6' },
  sleep:       { bg: '#e0e7ff', color: '#3730a3' },
  focus:       { bg: '#fef9c3', color: '#854d0e' },
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
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius);
  overflow: hidden; cursor: pointer; position: relative;
  transition: all var(--duration-normal) var(--ease-smooth);
}
.session-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); border-color: var(--sky-200); }

.session-card__img {
  height: 150px; position: relative;
  display: flex; align-items: center; justify-content: center;
}
.session-card__badge {
  position: absolute; top: 10px; left: 10px;
  padding: 3px 10px; border-radius: 100px;
  font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;
}
.session-card__play-overlay {
  opacity: 0; transition: opacity var(--duration-normal);
  position: absolute; inset: 0;
  background: rgba(0,0,0,0.12);
  display: flex; align-items: center; justify-content: center;
}
.session-card:hover .session-card__play-overlay { opacity: 1; }
.play-btn {
  width: 52px; height: 52px; border-radius: 50%;
  background: rgba(255,255,255,0.95); border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: var(--sky-800);
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
  transition: transform var(--duration-fast) var(--ease-bounce);
}
.play-btn:hover { transform: scale(1.1); }
.session-card__type {
  position: absolute; bottom: 10px; right: 10px;
  width: 30px; height: 30px; border-radius: 8px;
  background: rgba(255,255,255,0.92);
  display: flex; align-items: center; justify-content: center;
  color: var(--sky-700);
  box-shadow: 0 1px 4px rgba(0,0,0,0.12);
}

.session-card__body { padding: 14px 14px 40px; }
.session-card__title {
  font-size: 15px; font-weight: 600; color: var(--text-primary);
  margin-bottom: 6px; line-height: 1.3;
}
.session-card__meta { display: flex; gap: 6px; font-size: 12px; color: var(--text-muted); align-items: center; }

.session-card__fav {
  position: absolute; bottom: 12px; right: 12px;
  background: none; border: none; cursor: pointer;
  transition: transform var(--duration-fast) var(--ease-bounce);
  padding: 4px;
  color: var(--text-muted);
}
.session-card__fav-icon { color: inherit; }
.session-card__fav--active { color: #e11d48; animation: fav-pop 0.3s var(--ease-bounce); }
.session-card__fav:hover { transform: scale(1.15); color: #e11d48; }
@keyframes fav-pop { 0%,100% { transform: scale(1); } 50% { transform: scale(1.4); } }
</style>
