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
  border: 1.5px solid var(--ink-200);
  border-radius: var(--radius-lg);
  overflow: hidden;
  min-width: 0;
  box-shadow: 0 10px 24px rgba(28, 26, 22, 0.08);
  cursor: pointer;
  transition: transform var(--duration-fast), box-shadow var(--duration-fast), border-color var(--duration-fast);
}
.moment-card:hover {
  transform: translateY(-2px);
  border-color: var(--sage-300);
  box-shadow: 0 16px 28px rgba(28, 26, 22, 0.12);
}
.moment-card__img {
  position: relative;
  min-height: 136px;
  padding: 14px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
}
.moment-card__img::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, rgba(16, 24, 18, 0.12) 0%, rgba(16, 24, 18, 0.45) 100%);
}
.moment-card__time-label,
.moment-card__play {
  position: relative;
  z-index: 1;
}
.moment-card__time-label {
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.9);
  color: var(--ink-900);
}
.moment-card__play {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background: rgba(16, 24, 18, 0.6);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all var(--duration-fast);
}
.moment-card__play:hover {
  background: rgba(255, 255, 255, 0.92);
  color: var(--ink-900);
}
.moment-card__body {
  padding: 14px 16px 16px;
  display: grid;
  gap: 6px;
}
.moment-card__sub {
  margin: 0;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: var(--sage-600);
}
.moment-card__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 22px;
  line-height: 1.12;
  font-weight: 400;
  color: var(--ink-900);
}
.moment-card__meta {
  margin: 0;
  color: var(--text-secondary);
  font-size: 13px;
}

@media (max-width: 640px) {
  .moment-card__img {
    min-height: 122px;
    padding: 12px;
  }
  .moment-card__title {
    font-size: 20px;
  }
}
</style>
