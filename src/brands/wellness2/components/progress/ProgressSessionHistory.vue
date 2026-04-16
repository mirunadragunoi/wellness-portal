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
  stress:      { bg: 'var(--sage-100)', color: '#1e40af' },
  anxiety:     { bg: '#f0f7ee', color: 'var(--sage-700)' },
  sleep:       { bg: '#e0e7ff', color: '#3730a3' },
  focus:       { bg: 'var(--parchment-2)', color: 'var(--ink-700)' },
  mindfulness: { bg: '#dcfce7', color: '#166534' },
  energy:      { bg: '#fef3c7', color: '#92400e' }
}
const catStyle = (cat) => {
  const c = catColors[cat] || { bg: '#f1f5f9', color: '#475569' }
  return { background: c.bg, color: c.color }
}
</script>

<style scoped>
.session-history {
  background: var(--bg-surface); border: 2px solid var(--ink-200);
  border-radius: var(--radius-lg); overflow: hidden; box-shadow: 3px 3px 0 var(--ink-100);
}
.session-history__head {
  padding: 18px 20px 14px; border-bottom: 1.5px solid var(--ink-100);
  display: flex; align-items: center; justify-content: space-between;
}
.session-history__title {
  font-family: var(--font-display); font-size: 18px; font-weight: 400; color: var(--ink-900);
  padding: 16px 20px 10px;
  border-bottom: 1.5px solid var(--ink-100);
}
.session-history__list { display: flex; flex-direction: column; }
.history-item {
  display: flex; align-items: center; gap: 14px; padding: 14px 20px;
  border-bottom: 1px solid var(--ink-100); transition: background var(--duration-fast);
}
.history-item:last-child { border-bottom: none; }
.history-item:hover { background: var(--parchment); }
.history-item__icon {
  width: 40px; height: 40px; border-radius: var(--radius-sm); flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  border: 1.5px solid var(--ink-100);
  background: #fff;
}
.history-item__info { flex: 1; min-width: 0; }
.history-item__title { font-size: 14px; font-weight: 600; color: var(--ink-900); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.history-item__meta  { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
.history-item__cat {
  font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;
  padding: 3px 8px; border-radius: var(--radius-sm);
}
.session-history__empty { padding: 40px 20px; text-align: center; color: var(--text-muted); font-size: 14px; }
</style>
