<template>
  <div class="breathing-wrap">
    <!-- Outer rings -->
    <div class="ring ring--3" :style="ringStyle" />
    <div class="ring ring--2" :style="ringStyle" />
    <div class="ring ring--1" :style="ringStyle" />

    <!-- Main orb -->
    <div class="orb" :class="orbClass" :style="orbStyle">
      <Transition name="phase" mode="out-in">
        <div :key="phase?.phase" class="orb__content">
          <span class="orb__label">{{ phase?.label || 'Ready' }}</span>
          <span class="orb__count">{{ isRunning ? countdown : '' }}</span>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  phase:     { type: Object, default: null },
  countdown: { type: Number, default: 0 },
  isRunning: { type: Boolean, default: false },
  color:     { type: String, default: '#0ea5e9' }
})

const orbClass = computed(() => ({
  'orb--idle':   !props.isRunning,
  'orb--inhale': props.phase?.phase === 'inhale',
  'orb--hold':   props.phase?.phase === 'hold',
  'orb--exhale': props.phase?.phase === 'exhale',
  'orb--pause':  props.phase?.phase === 'pause'
}))

const orbStyle = computed(() => ({
  '--orb-color': props.color,
  '--orb-color-light': props.color + '33'
}))

const ringStyle = computed(() => ({ '--ring-color': props.color }))
</script>

<style scoped>
.breathing-wrap {
  position: relative;
  width: 280px; height: 280px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

.ring {
  position: absolute; border-radius: 50%;
  border: 1px solid var(--ring-color, #0ea5e9);
  opacity: 0.2;
}
.ring--1 { width: 100%; height: 100%; animation: ring-pulse 4s ease-in-out infinite; }
.ring--2 { width: 115%; height: 115%; animation: ring-pulse 4s ease-in-out infinite 0.5s; opacity: 0.12; }
.ring--3 { width: 130%; height: 130%; animation: ring-pulse 4s ease-in-out infinite 1s; opacity: 0.07; }

@keyframes ring-pulse {
  0%,100% { transform: scale(1);    opacity: 0.2; }
  50%      { transform: scale(1.04); opacity: 0.35; }
}

.orb {
  width: 220px; height: 220px; border-radius: 50%;
  background: radial-gradient(circle at 40% 35%,
    rgba(255,255,255,0.9) 0%,
    var(--orb-color-light, rgba(14,165,233,0.2)) 50%,
    var(--orb-color, #0ea5e9) 100%
  );
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.8s ease-in-out;
  box-shadow: 0 0 60px var(--orb-color-light, rgba(14,165,233,0.2));
}

.orb--idle   { animation: breathe-idle 6s ease-in-out infinite; }
.orb--inhale { animation: orb-inhale var(--breathe-in, 4s) ease-in forwards; }
.orb--hold   { transform: scale(1.2); }
.orb--exhale { animation: orb-exhale var(--breathe-out, 4s) ease-out forwards; }
.orb--pause  { transform: scale(0.9); }

@keyframes breathe-idle { 0%,100% { transform: scale(1); }  50% { transform: scale(1.08); } }
@keyframes orb-inhale   { from { transform: scale(0.85); } to { transform: scale(1.2); } }
@keyframes orb-exhale   { from { transform: scale(1.2);  } to { transform: scale(0.85); } }

.orb__content { text-align: center; display: flex; flex-direction: column; gap: 6px; }
.orb__label {
  font-size: 15px; font-weight: 500; color: var(--orb-color, #0369a1); letter-spacing: 0.5px;
}
.orb__count {
  font-family: var(--font-display); font-size: 52px; font-weight: 300;
  color: var(--orb-color, #0369a1); line-height: 1;
}

.phase-enter-active, .phase-leave-active { transition: all 0.3s ease; }
.phase-enter-from { opacity: 0; transform: scale(0.8); }
.phase-leave-to   { opacity: 0; transform: scale(1.1); }
</style>
