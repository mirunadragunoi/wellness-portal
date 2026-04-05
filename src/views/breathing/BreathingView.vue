<template>
  <div class="breathing-view">
    <div class="breathing-view__inner">
      <!-- Header -->
      <div class="breathing-view__header">
        <RouterLink to="/home" class="breathing-view__back">← Back</RouterLink>
        <div class="breathing-view__info">
          <h1 class="breathing-view__title">{{ config.title }}</h1>
          <p class="breathing-view__desc">{{ config.description }}</p>
        </div>
      </div>

      <!-- Circle -->
      <BreathingCircle
        :phase="isRunning ? currentPhase : null"
        :countdown="phaseCountdown"
        :is-running="isRunning"
        :color="config.color"
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
          <div class="breathing-complete__check">✓</div>
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
import { useBreathing } from '@/composables/useBreathing'
import BreathingCircle   from '@/components/breathing/BreathingCircle.vue'
import BreathingControls from '@/components/breathing/BreathingControls.vue'
import BaseProgressBar   from '@/components/base/BaseProgressBar.vue'

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
  min-height: 100vh; display: flex; align-items: center; justify-content: center;
  background: var(--bg-base); padding: 24px;
  position: relative; overflow: hidden;
}
.breathing-view::before {
  content: ''; position: absolute; top: -20%; left: -10%;
  width: 600px; height: 600px; border-radius: 50%;
  background: radial-gradient(circle, rgba(186,230,253,0.2) 0%, transparent 65%);
  animation: float-slow 20s ease-in-out infinite;
  pointer-events: none;
}
.breathing-view__inner {
  display: flex; flex-direction: column; align-items: center; gap: 40px;
  width: 100%; max-width: 520px; position: relative; z-index: 1;
}
.breathing-view__header { text-align: center; width: 100%; }
.breathing-view__back {
  display: inline-block; font-size: 14px; color: var(--text-muted);
  text-decoration: none; margin-bottom: 20px;
}
.breathing-view__back:hover { color: var(--sky-600); }
.breathing-view__title { font-family: var(--font-display); font-size: 36px; font-weight: 400; color: var(--text-primary); margin-bottom: 8px; }
.breathing-view__desc  { font-size: 15px; color: var(--text-secondary); }

.breathing-view__stats { display: flex; flex-direction: column; align-items: center; gap: 10px; }
.breathing-view__remaining { font-family: var(--font-display); font-size: 24px; color: var(--text-secondary); }
.breathing-view__rounds    { font-size: 13px; color: var(--text-muted); }

.breathing-complete {
  position: fixed; inset: 0; z-index: 200;
  background: rgba(240,249,255,0.96);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 20px; text-align: center; padding: 24px;
}
[data-theme="dark"] .breathing-complete { background: rgba(11,18,32,0.96); }
.breathing-complete__check {
  width: 80px; height: 80px; border-radius: 50%;
  background: linear-gradient(135deg, #d1fae5, #6ee7b7);
  display: flex; align-items: center; justify-content: center;
  font-size: 36px; color: #059669;
  animation: bounceIn 0.6s var(--ease-bounce);
}
.breathing-complete h2 { font-family: var(--font-display); font-size: 36px; font-weight: 400; color: var(--text-primary); }
.breathing-complete p  { font-size: 16px; color: var(--text-secondary); max-width: 360px; line-height: 1.6; }
.breathing-complete__btns { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
.bc-btn { padding: 14px 32px; border-radius: 100px; font-family: var(--font-body); font-size: 15px; font-weight: 500; cursor: pointer; border: none; text-decoration: none; display: inline-flex; align-items: center; transition: all var(--duration-normal); }
.bc-btn--primary { background: linear-gradient(135deg, var(--sky-500), var(--sky-600)); color: white; box-shadow: 0 4px 16px rgba(14,165,233,0.3); }
.bc-btn--primary:hover { transform: translateY(-2px); }
.bc-btn--ghost { background: var(--bg-surface); color: var(--text-secondary); border: 1.5px solid var(--border-default); }
@keyframes bounceIn { 0% { transform: scale(0.3); } 60% { transform: scale(1.1); } 100% { transform: scale(1); } }
</style>
