<template>
  <div class="progress-bar" :style="{ height: height + 'px' }">
    <div
      class="progress-bar__fill"
      :class="{ 'progress-bar__fill--animated': animated }"
      :style="{ width: clampedValue + '%', background: color || undefined }"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  value:    { type: Number, default: 0 },
  height:   { type: Number, default: 4 },
  color:    { type: String, default: '' },
  animated: { type: Boolean, default: true }
})
const clampedValue = computed(() => Math.max(0, Math.min(100, props.value)))
</script>

<style scoped>
.progress-bar {
  width: 100%;
  background: var(--bg-muted);
  border-radius: 100px;
  overflow: hidden;
}
.progress-bar__fill {
  height: 100%;
  background: linear-gradient(90deg, var(--sky-400), var(--sky-600));
  border-radius: 100px;
  transition: width 0.4s var(--ease-smooth);
}
.progress-bar__fill--animated {
  position: relative;
}
.progress-bar__fill--animated::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  animation: shimmer 2s infinite;
}
@keyframes shimmer {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
</style>
