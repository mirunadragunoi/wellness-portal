<template>
  <div class="breathing-wrap">
    <!-- Rings -->
    <div class="ring ring--outer" />
    <div class="ring ring--mid" />

    <!-- Main circle -->
    <div
      class="circle"
      :class="[`circle--${phase}`]"
      :style="circleStyle"
    >
      <span class="circle__phase">{{ phaseLabel }}</span>
      <span class="circle__count">{{ displayCount }}</span>
      <span class="circle__unit">{{ phase === 'idle' ? '' : 'sec' }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  phase: {
    type: String,
    default: 'idle', // idle | inhale | hold | exhale | hold2
  },
  count: {
    type: Number,
    default: 0,
  },
  totalDuration: {
    type: Number,
    default: 4,
  },
})

const { t } = useI18n()

const phaseLabel = computed(() => {
  const map = {
    idle:   '✦',
    inhale: t('breathing.inhale'),
    hold:   t('breathing.hold'),
    exhale: t('breathing.exhale'),
    hold2:  t('breathing.hold'),
  }
  return map[props.phase] ?? '—'
})

const displayCount = computed(() =>
  props.phase === 'idle' ? '—' : props.count
)

// Dynamic scale based on phase + progress within phase
const circleStyle = computed(() => {
  const progress = props.totalDuration > 0 ? 1 - props.count / props.totalDuration : 0
  let scale = 1
  let glow  = '0 0 0 0 rgba(184,245,102,0)'

  if (props.phase === 'inhale') {
    scale = 1 + 0.18 * progress
    const g = Math.round(40 + 30 * progress)
    glow  = `0 0 ${g}px rgba(184,245,102,0.25)`
  } else if (props.phase === 'exhale') {
    scale = 1.18 - 0.18 * progress
    const g = Math.round(70 - 30 * progress)
    glow  = `0 0 ${g}px rgba(184,245,102,0.15)`
  } else if (props.phase === 'hold' || props.phase === 'hold2') {
    scale = 1.18
    glow  = '0 0 60px rgba(184,245,102,0.2)'
  }

  return {
    transform: `scale(${scale})`,
    boxShadow: glow,
  }
})
</script>

<style scoped>
/* ── Wrapper ── */
.breathing-wrap {
  position: relative;
  width: 280px;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── Rings ── */
.ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(184,245,102,0.1);
  animation: ring-pulse 4s ease-in-out infinite;
}
.ring--outer { inset: -20px; animation-delay: 0s; }
.ring--mid   { inset: -8px;  animation-delay: 0.5s; }

/* ── Main circle ── */
.circle {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(
    circle at 40% 35%,
    rgba(184,245,102,0.15) 0%,
    rgba(34,197,94,0.08)   40%,
    rgba(13,31,18,0.9)     100%
  );
  border: 2px solid rgba(184,245,102,0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s linear, box-shadow 0.15s linear;
  cursor: default;
}

/* Idle state — slow breathe animation */
.circle--idle {
  animation: breathe 8s ease-in-out infinite;
}

/* ── Text inside circle ── */
.circle__phase {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  color: var(--lime-400);
  letter-spacing: -0.3px;
  margin-bottom: 4px;
  line-height: 1;
}
.circle__count {
  font-family: var(--font-mono);
  font-size: 52px;
  font-weight: 400;
  color: var(--text-primary);
  line-height: 1;
}
.circle__unit {
  font-size: 11px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: 4px;
  min-height: 14px;
}

/* ── Keyframes (defined here for scoped usage; also in animations.css) ── */
@keyframes ring-pulse {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50%       { opacity: 1;   transform: scale(1.04); }
}
@keyframes breathe {
  0%, 100% { transform: scale(1);    box-shadow: 0 0 0 0 rgba(184,245,102,0.1); }
  50%       { transform: scale(1.1); box-shadow: 0 0 40px 8px rgba(184,245,102,0.08); }
}

/* ── Responsive ── */
@media (max-width: 480px) {
  .breathing-wrap { width: 220px; height: 220px; }
  .circle__count  { font-size: 40px; }
}
</style>
