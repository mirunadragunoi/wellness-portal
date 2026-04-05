<template>
  <div class="moment-card" @click="goToSession">
    <div class="moment-card__img" :style="{ background: session?.thumbnailGradient }">
      <span class="moment-card__time-label">{{ label }}</span>
      <button type="button" class="moment-card__play">
        <Icon icon="lucide:play" class="app-icon app-icon--sm" aria-hidden="true" />
        {{ t('home.play') }}
      </button>
    </div>
    <div class="moment-card__body">
      <p class="moment-card__sub">{{ t('home.moment_title') }}</p>
      <h3 class="moment-card__title">{{ session?.title }}</h3>
      <p class="moment-card__meta">{{ session?.type }} · {{ session ? Math.round(session.duration / 60) : 0 }} {{ t('explore.min') }}</p>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useMomentOfDay } from '@/composables/useGreeting'
import { usePlayerStore } from '@/stores/player'

const { t }   = useI18n()
const router  = useRouter()
const player  = usePlayerStore()
const { session, label } = useMomentOfDay()

function goToSession() {
  if (!session.value) return
  player.loadSession(session.value)
  router.push({ name: 'session', params: { id: session.value.id } })
}
</script>

<style scoped>
.moment-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg); overflow: hidden;
  cursor: pointer; transition: all var(--duration-normal) var(--ease-smooth);
  display: flex; flex-direction: column;
}
.moment-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); }

.moment-card__img {
  height: 160px; position: relative;
  display: flex; align-items: flex-end; padding: 16px;
}
.moment-card__time-label {
  position: absolute; top: 14px; left: 14px;
  background: rgba(255,255,255,0.9); border-radius: 100px;
  padding: 4px 12px; font-size: 12px; font-weight: 600; color: var(--text-primary);
}
.moment-card__play {
  margin-left: auto; padding: 10px 20px;
  background: rgba(255,255,255,0.9); border: none; border-radius: 100px;
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 13px; font-weight: 600; color: var(--text-primary); cursor: pointer;
  transition: all var(--duration-fast);
}
.moment-card:hover .moment-card__play { background: white; transform: scale(1.05); }

.moment-card__body { padding: 20px; }
.moment-card__sub   { font-size: 12px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
.moment-card__title { font-family: var(--font-display); font-size: 24px; font-weight: 500; color: var(--text-primary); margin-bottom: 8px; }
.moment-card__meta  { font-size: 14px; color: var(--text-secondary); }
</style>
