<template>
  <div class="step-select">
    <h2 class="step-title">{{ t('onboarding.step7_title') }}</h2>
    <div class="duration-grid">
      <button
        v-for="opt in options" :key="opt.id"
        class="dur-card" :class="{ 'dur-card--active': selected === opt.id }"
        @click="selected = opt.id"
      >
        <span class="dur-card__time">{{ t(opt.labelKey) }}</span>
        <span class="dur-card__sub">{{ opt.sub }}</span>
      </button>
    </div>
    <button class="step-btn" :disabled="!selected" @click="emit('next', { dailyDuration: selected })">
      {{ t('onboarding.btn_personalize') }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const emit = defineEmits(['next'])
const selected = ref('')
const options = [
  { id: '2-5',   labelKey: 'onboarding.duration_2_5',    sub: 'Quick daily reset' },
  { id: '5-10',  labelKey: 'onboarding.duration_5_10',   sub: 'Steady practice'   },
  { id: '10-20', labelKey: 'onboarding.duration_10_20',  sub: 'Deeper sessions'   },
  { id: '20+',   labelKey: 'onboarding.duration_20plus', sub: 'Full immersion'    }
]
</script>

<style scoped>
.step-select { display: flex; flex-direction: column; align-items: center; padding: 48px 32px 40px; max-width: 480px; margin: 0 auto; }
.step-title { font-family: var(--font-display); font-size: 34px; font-weight: 400; color: var(--text-primary); text-align: center; margin-bottom: 40px; }
.duration-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; width: 100%; margin-bottom: 40px; }
.dur-card {
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  padding: 28px 20px; border-radius: var(--radius-lg);
  background: var(--bg-surface); border: 2px solid var(--border-subtle);
  cursor: pointer; transition: all var(--duration-normal) var(--ease-smooth);
}
.dur-card:hover { border-color: var(--sky-300); background: var(--sky-50); transform: translateY(-3px); }
.dur-card--active { border-color: var(--sky-500); background: var(--sky-50); box-shadow: 0 0 0 3px rgba(14,165,233,0.12); }
.dur-card__time { font-family: var(--font-display); font-size: 28px; font-weight: 500; color: var(--text-primary); }
.dur-card__sub  { font-size: 13px; color: var(--text-secondary); }
.step-btn {
  width: 100%; max-width: 360px; padding: 16px; border-radius: 100px; border: none; cursor: pointer;
  background: linear-gradient(135deg, var(--sky-500), var(--sky-600)); color: white;
  font-family: var(--font-body); font-size: 16px; font-weight: 500;
  box-shadow: 0 4px 16px rgba(14,165,233,0.3); transition: all var(--duration-normal) var(--ease-smooth);
}
.step-btn:hover:not(:disabled) { transform: translateY(-2px); }
.step-btn:disabled { opacity: 0.4; cursor: not-allowed; }
</style>
