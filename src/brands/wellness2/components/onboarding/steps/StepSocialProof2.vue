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
.step-proof { display: flex; flex-direction: column; align-items: center; gap: 20px; padding: 24px var(--container-pad) 48px; min-height: 65vh; justify-content: center; text-align: center; }
.proof-visual {
  width: 220px;
  min-height: 100px;
  border-radius: var(--radius-lg);
  background: var(--sage-50);
  border: 2px solid var(--sage-200);
  box-shadow: 6px 6px 0 var(--sage-100);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px;
}
.proof-community {
  display: flex;
  gap: 8px;
}
.proof-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid var(--sage-200);
  display: flex;
  align-items: center;
  justify-content: center;
}
.proof-title { font-family: var(--font-display); font-size: clamp(28px,4vw,40px); font-weight: 300; color: var(--ink-900); line-height: 1.2; }
.proof-body { font-size: 16px; color: var(--text-secondary); line-height: 1.7; max-width: 520px; }
.step-btn {
  width: 100%;
  max-width: 340px;
  padding: 13px 16px;
  border-radius: var(--radius-sm);
  border: 2px solid var(--sage-600);
  background: var(--sage-500);
  color: #fff;
  font-size: 15px;
  font-weight: 700;
}
</style>
