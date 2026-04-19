<template>
  <div class="controls">
    <div class="controls__duration">
      <span class="controls__duration-label">{{ t('breathing.duration_label') }}</span>
      <div class="controls__duration-pills">
        <button
          v-for="sec in durations" :key="sec"
          class="dur-pill"
          :class="{ 'dur-pill--active': modelValue === sec }"
          :disabled="isRunning"
          @click="emit('update:modelValue', sec)"
        >
          {{ sec / 60 }} min
        </button>
      </div>
    </div>

    <div class="controls__btns">
      <template v-if="!isRunning">
        <button class="ctrl-btn ctrl-btn--start" @click="emit('start')">
          {{ t('breathing.start') }}
        </button>
      </template>
      <template v-else>
        <button class="ctrl-btn ctrl-btn--pause" @click="emit('pause')">
          {{ isPaused ? t('breathing.start') : t('breathing.pause_btn') }}
        </button>
        <button class="ctrl-btn ctrl-btn--stop" @click="emit('stop')">
          {{ t('breathing.stop') }}
        </button>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
defineProps({
  modelValue: Number,
  durations:  Array,
  isRunning:  Boolean,
  isPaused:   Boolean
})
const emit = defineEmits(['update:modelValue', 'start', 'pause', 'stop'])
</script>

<style scoped>
.controls {
  width: min(100%, 430px);
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.controls__duration {
  background: var(--bg-surface);
  border: 2px solid var(--ink-200);
  border-radius: var(--radius-lg);
  padding: 16px;
}
.controls__duration-label {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1.2px;
}
.controls__duration-pills {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.dur-pill {
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  border: 1.5px solid var(--ink-200);
  background: #fff;
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}
.dur-pill--active {
  border-color: var(--sage-400);
  background: var(--sage-100);
  color: var(--sage-700);
}
.dur-pill:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.controls__btns {
  display: flex;
  justify-content: center;
  gap: 10px;
}
.ctrl-btn {
  min-width: 120px;
  padding: 12px 20px;
  border-radius: var(--radius-sm);
  border: 2px solid transparent;
  font-size: 14px;
  font-weight: 700;
}
.ctrl-btn--start,
.ctrl-btn--pause {
  background: var(--sage-500);
  color: #fff;
  border-color: var(--sage-600);
}
.ctrl-btn--stop {
  background: #fff;
  color: var(--sage-700);
  border-color: var(--sage-300);
}
</style>
