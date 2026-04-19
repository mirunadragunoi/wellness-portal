<template>
  <div class="recommended">
    <div class="recommended__header">
      <h2 class="recommended__title">{{ t('home.recommended_title') }}</h2>
      <RouterLink to="/explore" class="recommended__see-all">
        {{ t('home.see_all') }}
        <Icon icon="lucide:chevron-right" class="app-icon app-icon--xs" aria-hidden="true" />
      </RouterLink>
    </div>
    <div class="recommended__scroll">
      <div class="recommended__track">
        <div
          v-for="session in recommended"
          :key="session.id"
          class="session-card"
          @click="goToSession(session)"
        >
          <div class="session-card__img" :style="{ background: session.thumbnailGradient }">
            <span class="session-card__badge" :style="getBadgeStyle(session.category)">
              {{ session.category }}
            </span>
            <button type="button" class="session-card__play" aria-label="Play">
              <Icon icon="lucide:play" class="app-icon app-icon--sm" />
            </button>
            <span class="session-card__type-icon">
              <Icon :icon="sessionTypeIcon(session.type)" class="app-icon app-icon--sm" />
            </span>
          </div>
          <div class="session-card__body">
            <h4 class="session-card__title">{{ session.title }}</h4>
            <div class="session-card__meta">
              <span>{{ Math.round(session.duration / 60) }} {{ t('explore.min') }}</span>
              <span>·</span>
              <span>{{ session.level }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useRecommendations } from '@/composables/useGreeting'
import { usePlayerStore } from '@/stores/player'
import { sessionTypeIcon } from '@/constants/appIcons'

const { t }    = useI18n()
const router   = useRouter()
const player   = usePlayerStore()
const { recommended } = useRecommendations(8)

const categoryColors = {
  stress:      { bg: 'var(--sage-100)', color: '#1e40af' },
  anxiety:     { bg: '#f0f7ee', color: 'var(--sage-700)' },
  sleep:       { bg: '#e0e7ff', color: '#3730a3' },
  focus:       { bg: 'var(--parchment-2)', color: 'var(--ink-700)' },
  mindfulness: { bg: '#dcfce7', color: '#166534' },
  energy:      { bg: '#fef3c7', color: '#92400e' }
}

function getBadgeStyle(cat) {
  const c = categoryColors[cat] || { bg: '#f1f5f9', color: '#475569' }
  return { background: c.bg, color: c.color }
}

function goToSession(session) {
  player.loadSession(session)
  router.push({ name: 'session', params: { id: session.id } })
}
</script>

<style scoped>
.recommended { display: flex; flex-direction: column; gap: 14px; }
.recommended__header { display: flex; align-items: center; justify-content: space-between; }
.recommended__title { font-family: var(--font-display); font-size: 20px; font-weight: 400; color: var(--ink-900); }
.recommended__see-all {
  font-size: 13px; font-weight: 600; color: var(--sage-600); text-decoration: none;
  border-bottom: 1.5px solid var(--sage-300); padding-bottom: 1px; transition: color var(--duration-fast);
}
.recommended__see-all:hover { color: var(--sage-700); }
.recommended__scroll { overflow-x: auto; padding-bottom: 4px; }
.recommended__track {
  display: grid;
  grid-template-columns: repeat(8, minmax(220px, 1fr));
  gap: 14px;
  min-width: max-content;
}
.session-card {
  background: var(--bg-surface);
  border: 2px solid var(--ink-200);
  border-radius: var(--radius-lg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  box-shadow: 2px 2px 0 var(--ink-100);
  transition: all var(--duration-fast);
}
.session-card:hover {
  border-color: var(--sage-300);
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0 var(--sage-100);
}
.session-card__img {
  position: relative;
  height: 120px;
  background-size: cover;
  background-position: center;
}
.session-card__img::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(32, 56, 47, 0.35), transparent 65%);
}
.session-card__badge {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 2;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 4px 8px;
  border-radius: var(--radius-sm);
}
.session-card__play {
  position: absolute;
  right: 8px;
  bottom: 8px;
  z-index: 2;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.8);
  background: rgba(255,255,255,0.95);
  color: var(--ink-900);
  display: flex;
  align-items: center;
  justify-content: center;
}
.session-card__type-icon {
  position: absolute;
  left: 8px;
  bottom: 8px;
  z-index: 2;
  width: 26px;
  height: 26px;
  border-radius: var(--radius-sm);
  background: rgba(255,255,255,0.92);
  color: var(--sage-700);
  display: flex;
  align-items: center;
  justify-content: center;
}
.session-card__body { padding: 12px; display: flex; flex-direction: column; gap: 8px; }
.session-card__title {
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 400;
  color: var(--ink-900);
  line-height: 1.25;
}
.session-card__meta {
  display: flex;
  gap: 8px;
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 600;
}

@media (max-width: 768px) {
  .recommended__track {
    grid-template-columns: repeat(8, minmax(196px, 1fr));
    gap: 12px;
  }
}
</style>
