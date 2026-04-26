<template>
  <div class="breathing-view">
    <div class="type-bar">
      <RouterLink to="/home" class="back-btn">
        <Icon icon="lucide:arrow-left" class="app-icon app-icon--xs" />
        Home
      </RouterLink>
      <div class="type-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="type-tab"
          :class="{ active: activeType === tab.id }"
          @click="changeType(tab.id)"
        >
          {{ tab.label }}
        </button>
      </div>
      <div style="width: 80px"></div>
    </div>

    <div class="breath-main">
      <div class="bg-glow"></div>
      <div class="breath-info">
        <div class="breath-type-badge">Breathing exercise</div>
        <h1 class="breath-title">{{ config.title }}</h1>
        <p class="breath-desc">{{ config.description }}</p>
      </div>
      <div class="breathing-view__inner">
        <BreathingCircle
          :phase="isRunning ? currentPhase?.phase : 'idle'"
          :count="phaseCountdown"
          :total-duration="currentPhase?.duration || 4"
        />
        <div class="breathing-view__stats">
          <BaseProgressBar :value="progress" :height="6" style="max-width:280px;width:100%" />
          <p class="breathing-view__remaining">{{ isRunning ? formattedRemaining : 'Ready to start' }}</p>
          <p v-if="isRunning" class="breathing-view__rounds">Round {{ rounds + 1 }}</p>
        </div>
        <BreathingControls
          v-model="totalDuration"
          :durations="config.availableDurations"
          :is-running="isRunning"
          :is-paused="isPaused"
          @start="start"
          @pause="pause"
          @stop="stop"
        />
      </div>

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
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { useBreathing } from '@/composables/useBreathing'
import BreathingCircle   from '@/components/breathing/BreathingCircle.vue'
import BreathingControls from '@/components/breathing/BreathingControls.vue'
import BaseProgressBar   from '@/components/base/BaseProgressBar.vue'

const route  = useRoute()
const router = useRouter()
const typeId = route.params.type || 'box'

const {
  config, isRunning, isPaused, isComplete,
  currentPhase, phaseCountdown, rounds,
  totalDuration, progress, formattedRemaining,
  start, pause, stop, reset
} = useBreathing(typeId)

const tabs = [
  { id: 'box', label: 'Box' },
  { id: '4-7-8', label: '4-7-8' },
  { id: 'calm', label: 'Calm' },
  { id: 'sos', label: 'SOS' }
]
const activeType = computed(() => route.params.type || 'box')
function changeType(id) {
  router.push({ name: 'breathing', params: { type: id } })
}
</script>

<style scoped>
.breathing-view {
  min-height: var(--app-min-height);
  background: var(--forest-950);
  overflow: hidden;
}
.type-bar { position: fixed; top: 0; left: 0; right: 0; z-index: 10; display: flex; align-items: center; justify-content: space-between; padding: 0 clamp(16px,3vw,40px); height: 68px; background: rgba(2,10,4,0.8); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(184,245,102,0.06); }
.type-tabs { display: flex; gap: 4px; background: rgba(255,255,255,0.04); border-radius: 999px; padding: 4px; border: 1px solid rgba(255,255,255,0.06); }
.type-tab { padding: 7px 16px; border: none; border-radius: 999px; background: transparent; font-size: 13px; font-weight: 600; color: var(--text-muted); cursor: pointer; }
.type-tab.active { background: var(--lime-500); color: var(--forest-900); }
.back-btn { display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: var(--text-secondary); text-decoration: none; }
.breath-main { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding-top: 68px; position: relative; }
.bg-glow { position: absolute; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(184,245,102,0.06) 0%, transparent 70%); left: 50%; top: 50%; transform: translate(-50%, -50%); pointer-events: none; animation: breathe-bg 8s ease-in-out infinite; }
@keyframes breathe-bg { 0%,100% { transform: translate(-50%, -50%) scale(1); } 50% { transform: translate(-50%, -50%) scale(1.3); } }
.breath-info { text-align: center; margin-bottom: 24px; z-index: 2; }
.breath-type-badge { display: inline-flex; padding: 5px 14px; border-radius: 999px; background: rgba(184,245,102,0.08); border: 1px solid rgba(184,245,102,0.18); font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; color: var(--lime-400); margin-bottom: 12px; }
.breath-title { font-family: var(--font-display); font-size: clamp(22px, 3vw, 32px); font-weight: 800; letter-spacing: -1px; color: var(--text-primary); margin-bottom: 6px; }
.breath-desc { font-size: 14px; color: var(--text-secondary); }
.breathing-view__inner { display: flex; flex-direction: column; align-items: center; gap: 24px; z-index: 2; }
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
  .type-tab { padding: 6px 10px; font-size: 11px; }
  .breathing-view__inner { gap: 18px; width: calc(100% - 32px); }
}
</style>
