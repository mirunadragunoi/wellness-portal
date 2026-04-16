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
  color:     { type: String, default: 'var(--sage-500)' }
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
  width: min(84vw, 330px);
  height: min(84vw, 330px);
  display: flex;
  align-items: center;
  justify-content: center;
}
.ring {
  position: absolute;
  border-radius: 50%;
  border: 1.5px solid color-mix(in srgb, var(--ring-color), white 55%);
  opacity: 0.5;
}
.ring--1 { width: 260px; height: 260px; }
.ring--2 { width: 292px; height: 292px; opacity: 0.35; }
.ring--3 { width: 324px; height: 324px; opacity: 0.22; }

.orb {
  width: 222px;
  height: 222px;
  border-radius: 50%;
  border: 2px solid color-mix(in srgb, var(--orb-color), white 40%);
  background: radial-gradient(circle at 28% 24%, #ffffff, color-mix(in srgb, var(--orb-color-light), #ffffff 45%));
  box-shadow: 0 18px 40px rgba(40, 72, 59, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.5s var(--ease-smooth), box-shadow 0.3s ease;
}
.orb--idle {
  animation: idlePulse 7s ease-in-out infinite;
}
.orb--inhale {
  transform: scale(1.08);
}
.orb--hold {
  transform: scale(1.09);
}
.orb--exhale {
  transform: scale(0.92);
}
.orb--pause {
  transform: scale(0.97);
}

.orb__content {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.orb__label {
  font-family: var(--font-display);
  font-size: 24px;
  color: var(--ink-900);
}
.orb__count {
  font-family: var(--font-display);
  font-size: 42px;
  color: var(--sage-700);
  line-height: 1;
}

.phase-enter-active,
.phase-leave-active { transition: opacity .2s ease, transform .2s ease; }
.phase-enter-from,
.phase-leave-to { opacity: 0; transform: translateY(6px); }

@keyframes idlePulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.04); }
}
</style>
