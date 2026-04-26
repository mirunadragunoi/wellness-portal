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
.step-select { display: flex; flex-direction: column; align-items: center; gap: 18px; padding: 24px var(--container-pad) 48px; min-height: 60vh; justify-content: center; max-width: 780px; margin: 0 auto; }
.step-title { font-family: var(--font-display); font-size: clamp(22px,3vw,32px); font-weight: 800; letter-spacing: -1px; color: var(--text-primary); text-align: center; line-height: 1.15; }
.duration-grid { width: 100%; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
.dur-card {
  padding: 16px; border-radius: var(--radius);
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09);
  display: flex; flex-direction: column; align-items: flex-start; gap: 4px; text-align: left;
  cursor: pointer; transition: all 180ms var(--ease-smooth);
}
.dur-card:hover { background: rgba(184,245,102,0.05); border-color: rgba(184,245,102,0.2); }
.dur-card--active { border-color: rgba(184,245,102,0.4); background: rgba(184,245,102,0.1); box-shadow: 0 0 16px rgba(184,245,102,0.1); }
.dur-card__time { font-size: 16px; font-weight: 700; color: var(--text-primary); }
.dur-card__sub { font-size: 12px; color: var(--text-secondary); }
.step-btn {
  width: 100%; max-width: 340px; padding: 13px 16px;
  border-radius: var(--radius-pill); border: none;
  background: var(--lime-500); color: var(--forest-900);
  font-size: 15px; font-weight: 700; cursor: pointer;
  transition: all 200ms; font-family: var(--font-body);
}
.step-btn:hover:not(:disabled) { background: var(--lime-400); box-shadow: 0 0 28px rgba(184,245,102,0.3); }
.step-btn:disabled { opacity: 0.45; cursor: not-allowed; }
@media (max-width: 768px) { .duration-grid { grid-template-columns: 1fr; } }
</style>
