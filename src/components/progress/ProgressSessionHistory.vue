<template>
  <div class="session-history">
    <h3 class="session-history__title">{{ t('progress.recent_sessions') }}</h3>
    <div v-if="progressStore.recentSessions.length" class="session-history__list">
      <div v-for="s in progressStore.recentSessions" :key="s.id + s.completedAt" class="history-item">
        <div class="history-item__icon">{{ typeEmoji(s.type) }}</div>
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
import dayjs from 'dayjs'

const { t }         = useI18n()
const progressStore = useProgressStore()

const typeEmojiMap = { meditation: '🧘', 'sleep-story': '🌙', soundscape: '🎵', motivational: '⚡', breathing: '💨' }
const typeEmoji = (type) => typeEmojiMap[type] || '🧘'
const formatDate = (iso) => dayjs(iso).format('MMM D, YYYY')

const catColors = {
  stress:      { bg: '#dbeafe', color: '#1e40af' },
  anxiety:     { bg: '#ede9fe', color: '#5b21b6' },
  sleep:       { bg: '#e0e7ff', color: '#3730a3' },
  focus:       { bg: '#fef9c3', color: '#854d0e' },
  mindfulness: { bg: '#dcfce7', color: '#166534' },
  energy:      { bg: '#fef3c7', color: '#92400e' }
}
const catStyle = (cat) => {
  const c = catColors[cat] || { bg: '#f1f5f9', color: '#475569' }
  return { background: c.bg, color: c.color }
}
</script>

<style scoped>
.session-history { display: flex; flex-direction: column; gap: 16px; }
.session-history__title { font-family: var(--font-display); font-size: 22px; font-weight: 500; color: var(--text-primary); }
.session-history__list  { display: flex; flex-direction: column; gap: 10px; }
.session-history__empty { font-size: 15px; color: var(--text-muted); padding: 32px 0; text-align: center; }

.history-item {
  display: flex; align-items: center; gap: 14px;
  padding: 16px 20px; background: var(--bg-surface);
  border: 1px solid var(--border-subtle); border-radius: var(--radius);
  transition: all var(--duration-fast);
}
.history-item:hover { border-color: var(--sky-200); transform: translateX(3px); }
.history-item__icon { font-size: 24px; flex-shrink: 0; }
.history-item__info { flex: 1; min-width: 0; }
.history-item__title { font-size: 15px; font-weight: 600; color: var(--text-primary); margin-bottom: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.history-item__meta  { font-size: 13px; color: var(--text-muted); }
.history-item__cat {
  padding: 3px 10px; border-radius: 100px;
  font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.3px;
  white-space: nowrap; flex-shrink: 0;
}
</style>
