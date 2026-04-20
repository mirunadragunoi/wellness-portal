<template>
  <div class="step-proof">
    <div class="proof-visual">
      <div class="proof-community">
        <span v-for="(icon, i) in COMMUNITY_PROOF_ICONS" :key="i" class="proof-avatar">
          <Icon :icon="icon" class="app-icon app-icon--lg app-icon--primary" />
        </span>
      </div>
    </div>
    <h2 class="proof-title">{{ t('onboarding.step4_title') }}</h2>
    <p class="proof-body">{{ t('onboarding.step4_body') }}</p>
    <button class="step-btn" @click="emit('next')">{{ t('onboarding.btn_continue') }}</button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { COMMUNITY_PROOF_ICONS } from '@/constants/appIcons'

const { t } = useI18n()
const emit = defineEmits(['next'])
</script>

<style scoped>
.step-proof { display: flex; flex-direction: column; align-items: center; padding: 48px 32px 40px; max-width: 480px; margin: 0 auto; text-align: center; }
.proof-visual { margin-bottom: 36px; }
.proof-community { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; max-width: 300px; }
.proof-avatar {
  width: 52px; height: 52px; border-radius: 50%;
  background: var(--sky-100); border: 2px solid white;
  display: flex; align-items: center; justify-content: center;
  box-shadow: var(--shadow-sm);
  animation: float-slow 4s ease-in-out infinite;
}
.proof-avatar:nth-child(odd) { animation-duration: 5s; }
.proof-avatar:nth-child(3n) { animation-delay: 1.5s; }
.proof-title { font-family: var(--font-display); font-size: 32px; font-weight: 400; color: var(--text-primary); margin-bottom: 16px; }
.proof-body { font-size: 17px; color: var(--text-secondary); line-height: 1.7; margin-bottom: 40px; }
.step-btn {
  width: 100%; max-width: 360px; padding: 16px; border-radius: 100px; border: none; cursor: pointer;
  background: linear-gradient(135deg, var(--sky-500), var(--sky-600)); color: white;
  font-family: var(--font-body); font-size: 16px; font-weight: 500;
  box-shadow: 0 4px 16px rgba(14,165,233,0.3); transition: all var(--duration-normal) var(--ease-smooth);
}
.step-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(14,165,233,0.4); }
</style>
