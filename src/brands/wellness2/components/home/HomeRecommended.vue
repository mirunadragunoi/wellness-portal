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
.recommended { display: flex; flex-direction: column; gap: 18px; margin-bottom: 36px; }
.recommended__header { display: flex; align-items: center; justify-content: space-between; }
.recommended__title { font-family: var(--font-display); font-size: 18px; font-weight: 700; color: var(--text-primary); }
.recommended__see-all {
  font-size: 13px; font-weight: 600; color: var(--lime-500); text-decoration: none; transition: opacity 150ms;
}
.recommended__see-all:hover { opacity: 0.7; }
.recommended__scroll { overflow-x: auto; padding-bottom: 8px; scroll-snap-type: x mandatory; }
.recommended__scroll::-webkit-scrollbar { height: 2px; }
.recommended__scroll::-webkit-scrollbar-thumb { background: rgba(184,245,102,0.15); border-radius: 999px; }
.recommended__track {
  display: flex; gap: 14px; min-width: max-content;
}
.session-card {
  flex-shrink: 0; width: 200px; scroll-snap-align: start;
  background: var(--bg-glass); backdrop-filter: blur(16px);
  border: var(--border-glass); border-radius: 18px; overflow: hidden;
  cursor: pointer; transition: all 250ms var(--ease-smooth);
  box-shadow: var(--glow-card);
}
.session-card:hover { border-color: rgba(184,245,102,0.25); transform: translateY(-3px); box-shadow: var(--glow-card-hover); }
.session-card__img {
  position: relative; height: 120px; background: var(--forest-700); overflow: hidden;
  background-size: cover; background-position: center;
}
.session-card__img::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(160deg, rgba(184,245,102,0.08), rgba(13,31,18,0.6));
}
.session-card__badge {
  position: absolute; top: 8px; left: 8px; z-index: 2;
  padding: 2px 8px; border-radius: 999px;
  background: rgba(7,15,10,0.7); font-size: 9px; font-weight: 700;
  color: var(--lime-400); letter-spacing: 1px; text-transform: uppercase;
  border: 1px solid rgba(184,245,102,0.2);
}
.session-card__play {
  position: absolute; right: 8px; bottom: 8px; z-index: 2;
  width: 30px; height: 30px; border-radius: 50%;
  background: var(--lime-500); display: flex; align-items: center; justify-content: center;
  color: var(--forest-900); opacity: 0; transform: scale(0.5); transition: all 200ms;
}
.session-card:hover .session-card__play { opacity: 1; transform: scale(1); }
.session-card__type-icon { display: none; }
.session-card__body { padding: 12px 14px; }
.session-card__title {
  font-family: var(--font-display); font-size: 13px; font-weight: 700;
  color: var(--text-primary); margin-bottom: 4px; line-height: 1.2;
}
.session-card__meta {
  display: flex; justify-content: space-between;
  font-size: 10px; color: var(--text-muted); font-family: var(--font-mono);
}
</style>
