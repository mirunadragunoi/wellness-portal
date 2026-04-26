<template>
  <div class="session-history">
    <h3 class="session-history__title">{{ t('progress.recent_sessions') }}</h3>
    <div v-if="progressStore.recentSessions.length" class="session-history__list">
      <div v-for="s in progressStore.recentSessions" :key="s.id + s.completedAt" class="history-item">
        <div class="history-item__icon">
          <Icon :icon="sessionTypeIcon(s.type)" class="app-icon app-icon--md app-icon--primary" />
        </div>
        <div class="history-item__info">
          <p class="history-item__title">{{ s.title }}</p>
          <p class="history-item__meta">{{ formatDate(s.completedAt) }} · {{ Math.round(s.duration / 60) }} {{ t('explore.min') }}</p>
        </div>
        <span class="history-item__cat" :style="catStyle(s.category)">{{ s.category }}</span>
      </div>
    </div>
    <p v-else class="session-history__empty">{{ t('progress.no_sessions') }}</p>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useProgressStore } from '@/stores/progress'
import { sessionTypeIcon } from '@/constants/appIcons'
import dayjs from 'dayjs'

const { t }         = useI18n()
const progressStore = useProgressStore()

const formatDate = (iso) => dayjs(iso).format('MMM D, YYYY')

const catColors = {
  stress:      { bg: 'rgba(239,68,68,0.1)',    color: '#f87171' },
  anxiety:     { bg: 'rgba(245,158,11,0.1)',   color: 'var(--amber-400)' },
  sleep:       { bg: 'rgba(139,92,246,0.1)',   color: '#a78bfa' },
  focus:       { bg: 'rgba(184,245,102,0.1)',  color: 'var(--lime-400)' },
  mindfulness: { bg: 'rgba(52,211,153,0.1)',   color: 'var(--emerald-400)' },
  energy:      { bg: 'rgba(251,191,36,0.1)',   color: 'var(--amber-300)' }
}
const catStyle = (cat) => {
  const c = catColors[cat] || { bg: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)' }
  return { background: c.bg, color: c.color }
}
</script>

<style scoped>
.session-history {
  background: var(--bg-glass); backdrop-filter: blur(20px);
  border: var(--border-glass); border-radius: 20px; padding: 28px;
}
.session-history__title {
  font-family: var(--font-display); font-size: 16px; font-weight: 700; color: var(--text-primary);
  margin-bottom: 20px;
}
.session-history__list { display: flex; flex-direction: column; }
.history-item {
  display: grid; grid-template-columns: 36px 1fr auto; gap: 12px; align-items: center;
  padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.04);
}
.history-item:last-child { border-bottom: none; padding-bottom: 0; }
.history-item__icon {
  width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0;
  background: rgba(184,245,102,0.08); border: 1px solid rgba(184,245,102,0.12);
  display: flex; align-items: center; justify-content: center;
  color: var(--lime-400);
}
.history-item__info { flex: 1; min-width: 0; }
.history-item__title { font-size: 14px; font-weight: 600; color: var(--text-primary); margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.history-item__meta  { font-size: 11px; color: var(--text-muted); }
.history-item__cat {
  font-family: var(--font-mono); font-size: 11px; color: var(--lime-500); font-weight: 500;
  padding: 3px 8px; border-radius: 999px;
}
.session-history__empty { padding: 40px 20px; text-align: center; color: var(--text-muted); font-size: 14px; }
</style>
