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
  padding: 24px;
  background: linear-gradient(135deg, var(--forest-700), var(--forest-600));
  border: var(--border-glass); border-radius: 18px;
  position: relative; overflow: hidden;
  cursor: pointer;
  transition: all 280ms var(--ease-smooth);
}
.moment-card::before {
  content: ''; position: absolute; top: -40px; right: -40px;
  width: 160px; height: 160px;
  background: radial-gradient(circle, rgba(184,245,102,0.1) 0%, transparent 70%);
  pointer-events: none;
}
.moment-card:hover { border-color: rgba(184,245,102,0.22); box-shadow: var(--glow-card-hover); }
.moment-card__img { display: none; }
.moment-card__time-label,
.moment-card__play { position: relative; z-index: 1; }
.moment-card__time-label {
  display: block; font-size: 11px; font-weight: 600;
  text-transform: uppercase; letter-spacing: 3px; color: var(--lime-500); margin-bottom: 10px;
}
.moment-card__play {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 0; background: none; border: none;
  color: var(--lime-400); font-size: 13px; font-weight: 600;
  cursor: pointer; margin-top: 16px; transition: gap 150ms;
}
.moment-card__play:hover { gap: 10px; }
.moment-card__body { padding: 0; }
.moment-card__sub {
  margin: 0; font-size: 11px; font-weight: 600;
  text-transform: uppercase; letter-spacing: 3px; color: var(--lime-500); margin-bottom: 10px;
}
.moment-card__title {
  margin: 0; font-family: var(--font-display); font-size: 16px; font-weight: 700;
  color: var(--text-primary); line-height: 1.3;
}
.moment-card__meta { margin: 0; color: var(--text-muted); font-size: 12px; margin-top: 6px; }
</style>
