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
  stress:      { bg: '#dbeafe', color: '#1e40af' },
  anxiety:     { bg: '#ede9fe', color: '#5b21b6' },
  sleep:       { bg: '#e0e7ff', color: '#3730a3' },
  focus:       { bg: '#fef9c3', color: '#854d0e' },
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
.recommended__header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
.recommended__title { font-family: var(--font-display); font-size: 24px; font-weight: 500; color: var(--text-primary); }
.recommended__see-all {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 14px; color: var(--sky-600); text-decoration: none; font-weight: 500;
}
.recommended__see-all:hover { text-decoration: underline; }

.recommended__scroll { overflow-x: auto; padding-bottom: 8px; }
.recommended__scroll::-webkit-scrollbar { display: none; }
.recommended__track { display: flex; gap: 16px; padding: 4px 0; }

.session-card {
  flex-shrink: 0; width: 200px;
  background: var(--bg-surface); border: 1px solid var(--border-subtle);
  border-radius: var(--radius); overflow: hidden; cursor: pointer;
  transition: all var(--duration-normal) var(--ease-smooth);
}
.session-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }

.session-card__img {
  height: 130px; position: relative;
  display: flex; align-items: center; justify-content: center;
}
.session-card__badge {
  position: absolute; top: 10px; left: 10px;
  padding: 3px 8px; border-radius: 100px;
  font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;
}
.session-card__play {
  width: 40px; height: 40px; border-radius: 50%;
  background: rgba(255,255,255,0.9); border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: var(--sky-700);
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  transition: transform var(--duration-fast) var(--ease-bounce);
}
.session-card:hover .session-card__play { transform: scale(1.15); }
.session-card__type-icon {
  position: absolute; bottom: 10px; right: 10px;
  width: 28px; height: 28px; border-radius: 8px;
  background: rgba(255,255,255,0.92);
  display: flex; align-items: center; justify-content: center;
  color: var(--sky-700);
  box-shadow: 0 1px 4px rgba(0,0,0,0.12);
}

.session-card__body { padding: 14px; }
.session-card__title { font-size: 14px; font-weight: 600; color: var(--text-primary); margin-bottom: 6px; line-height: 1.3; }
.session-card__meta  { display: flex; gap: 6px; font-size: 12px; color: var(--text-muted); }
</style>
