<template>
  <div class="breathing-view">
    <div class="breathing-view__inner">
      <!-- Header -->
      <div class="breathing-view__header">
        <RouterLink to="/home" class="breathing-view__back">
          <Icon icon="lucide:arrow-left" class="app-icon app-icon--xs" aria-hidden="true" />
          {{ t('common.back') }}
        </RouterLink>
        <div class="breathing-view__info">
          <h1 class="breathing-view__title">{{ config.title }}</h1>
          <p class="breathing-view__desc">{{ config.description }}</p>
        </div>
      </div>

      <!-- Circle -->
      <BreathingCircle
        :phase="isRunning ? currentPhase?.phase : 'idle'"
        :count="phaseCountdown"
        :total-duration="currentPhase?.duration || 4"
      />

      <!-- Progress / remaining -->
      <div class="breathing-view__stats">
        <BaseProgressBar :value="progress" :height="6" style="max-width:280px;width:100%" />
        <p class="breathing-view__remaining">{{ isRunning ? formattedRemaining : 'Ready to start' }}</p>
        <p v-if="isRunning" class="breathing-view__rounds">Round {{ rounds + 1 }}</p>
      </div>

      <!-- Controls -->
      <BreathingControls
        v-model="totalDuration"
        :durations="config.availableDurations"
        :is-running="isRunning"
        :is-paused="isPaused"
        @start="start"
        @pause="pause"
        @stop="stop"
      />

      <!-- Complete overlay -->
      <Transition name="fade">
        <div v-if="isComplete" class="breathing-complete">
          <div class="breathing-complete__check">
            <Icon icon="lucide:check" class="app-icon app-icon--2xl" aria-hidden="true" />
          </div>
          <h2>Session Complete</h2>
          <p>Great work. You've completed {{ Math.round(totalDuration / 60) }} minutes of mindful breathing.</p>
          <div class="breathing-complete__btns">
            <button class="bc-btn bc-btn--primary" @click="reset">Practice Again</button>
            <RouterLink to="/home" class="bc-btn bc-btn--ghost">Back to Home</RouterLink>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useBreathing } from '@/composables/useBreathing'
import BreathingCircle   from '@/components/breathing/BreathingCircle.vue'
import BreathingControls from '@/components/breathing/BreathingControls.vue'
import BaseProgressBar   from '@/components/base/BaseProgressBar.vue'

const { t }  = useI18n()
const route  = useRoute()
const typeId = route.params.type || 'box'

const {
  config, isRunning, isPaused, isComplete,
  currentPhase, phaseCountdown, rounds,
  totalDuration, progress, formattedRemaining,
  start, pause, stop, reset
} = useBreathing(typeId)
</script>

<style scoped>
.breathing-view {
  min-height: var(--app-min-height);
  display: flex; align-items: center; justify-content: center;
  background: var(--bg-base);
  padding: 24px; position: relative; overflow: hidden;
}
.breathing-view::before {
  content: ''; position: absolute; top: -15%; right: -10%;
  width: 500px; height: 500px; border-radius: 50%;
  background: radial-gradient(circle, rgba(184,245,102,0.06) 0%, transparent 65%);
  pointer-events: none;
}
.breathing-view::after {
  content: ''; position: absolute; bottom: -20%; left: -10%;
  width: 400px; height: 400px; border-radius: 50%;
  background: radial-gradient(circle, rgba(34,197,94,0.04) 0%, transparent 65%);
  pointer-events: none;
}
.breathing-view__inner {
  display: flex; flex-direction: column; align-items: center; gap: 40px;
  width: 100%; max-width: 520px; position: relative; z-index: 1;
}
.breathing-view__header { text-align: center; width: 100%; }
.breathing-view__back {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 13px; font-weight: 600; color: var(--lime-400);
  text-decoration: none; margin-bottom: 24px;
  padding: 7px 14px; border: 1px solid rgba(184,245,102,0.2);
  border-radius: var(--radius-pill); transition: all var(--duration-fast);
}
.breathing-view__back:hover { color: var(--lime-300); border-color: rgba(184,245,102,0.4); }
.breathing-view__title { font-family: var(--font-display); font-size: 36px; font-weight: 800; color: var(--text-primary); margin-bottom: 8px; letter-spacing: -1px; }
.breathing-view__desc  { font-size: 15px; color: var(--text-secondary); }
.breathing-view__stats { display: flex; flex-direction: column; align-items: center; gap: 10px; }
.breathing-view__remaining { font-family: var(--font-mono); font-size: 24px; color: var(--lime-400); }
.breathing-view__rounds    { font-size: 13px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; }

.breathing-complete {
  position: fixed; inset: 0; z-index: 200;
  background: rgba(7, 15, 10, 0.96);
  backdrop-filter: blur(20px);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 24px; text-align: center; padding: 24px;
}
.breathing-complete__check {
  width: 80px; height: 80px; border-radius: 50%;
  background: rgba(184,245,102,0.12); border: 2px solid rgba(184,245,102,0.4);
  display: flex; align-items: center; justify-content: center;
  color: var(--lime-400); animation: bounceIn 0.6s var(--ease-bounce);
  box-shadow: 0 0 40px rgba(184,245,102,0.2);
}
.breathing-complete h2 { font-family: var(--font-display); font-size: 36px; font-weight: 800; color: var(--text-primary); letter-spacing: -1.5px; }
.breathing-complete p  { font-size: 15px; color: var(--text-secondary); max-width: 360px; line-height: 1.6; }
.breathing-complete__btns { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
.bc-btn {
  padding: 13px 30px; border-radius: var(--radius-pill); font-family: var(--font-body);
  font-size: 14px; font-weight: 700; cursor: pointer; border: 1px solid transparent;
  text-decoration: none; display: inline-flex; align-items: center; transition: all var(--duration-fast);
}
.bc-btn--primary { background: var(--lime-500); color: var(--forest-900); }
.bc-btn--primary:hover { background: var(--lime-400); box-shadow: 0 0 24px rgba(184,245,102,0.35); }
.bc-btn--ghost { background: rgba(255,255,255,0.05); color: var(--text-primary); border-color: rgba(255,255,255,0.12); }
.bc-btn--ghost:hover { background: rgba(255,255,255,0.09); }

@media (max-width: 640px) {
  .breathing-view {
    padding: 18px 16px;
  }
  .breathing-view__inner {
    gap: 28px;
  }
  .breathing-view__title {
    font-size: 30px;
  }
}
</style>
