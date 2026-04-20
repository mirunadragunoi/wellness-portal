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
.controls { display: flex; flex-direction: column; align-items: center; gap: 24px; width: 100%; }
.controls__duration { display: flex; flex-direction: column; align-items: center; gap: 12px; }
.controls__duration-label { font-size: 13px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; font-weight: 500; }
.controls__duration-pills { display: flex; gap: 8px; }
.dur-pill {
  padding: 8px 18px; border-radius: 100px;
  background: var(--bg-surface); border: 1.5px solid var(--border-subtle);
  font-family: var(--font-body); font-size: 14px; font-weight: 500;
  color: var(--text-secondary); cursor: pointer;
  transition: all var(--duration-fast) var(--ease-smooth);
}
.dur-pill:hover:not(:disabled) { border-color: var(--sky-300); color: var(--sky-600); }
.dur-pill--active { border-color: var(--sky-500); background: var(--sky-50); color: var(--sky-600); }
.dur-pill:disabled { opacity: 0.4; cursor: not-allowed; }

.controls__btns { display: flex; gap: 12px; }
.ctrl-btn {
  padding: 14px 36px; border-radius: 100px; border: none; cursor: pointer;
  font-family: var(--font-body); font-size: 16px; font-weight: 500;
  transition: all var(--duration-normal) var(--ease-smooth);
}
.ctrl-btn--start { background: linear-gradient(135deg, var(--sky-500), var(--sky-600)); color: white; box-shadow: 0 4px 16px rgba(14,165,233,0.3); }
.ctrl-btn--start:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(14,165,233,0.4); }
.ctrl-btn--pause { background: var(--sky-100); color: var(--sky-700); }
.ctrl-btn--stop  { background: var(--bg-muted); color: var(--text-secondary); }
.ctrl-btn--stop:hover { background: #fee2e2; color: #991b1b; }
</style>
