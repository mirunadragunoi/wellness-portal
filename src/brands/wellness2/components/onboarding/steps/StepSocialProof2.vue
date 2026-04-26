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
  padding: 20px 24px; border-radius: var(--radius-lg);
  background: rgba(184,245,102,0.06); border: 1px solid rgba(184,245,102,0.15);
  display: flex; align-items: center; justify-content: center;
}
.proof-community { display: flex; gap: 8px; }
.proof-avatar {
  width: 38px; height: 38px; border-radius: 50%;
  background: rgba(255,255,255,0.06); border: 1px solid rgba(184,245,102,0.2);
  display: flex; align-items: center; justify-content: center;
  color: var(--lime-400);
}
.proof-title { font-family: var(--font-display); font-size: clamp(22px,3vw,32px); font-weight: 800; letter-spacing: -1px; color: var(--text-primary); line-height: 1.15; }
.proof-body { font-size: 15px; color: var(--text-secondary); line-height: 1.7; max-width: 520px; }
.step-btn {
  width: 100%; max-width: 340px; padding: 13px 16px;
  border-radius: var(--radius-pill); border: none;
  background: var(--lime-500); color: var(--forest-900);
  font-size: 15px; font-weight: 700; cursor: pointer;
  transition: all 200ms; font-family: var(--font-body);
}
.step-btn:hover { background: var(--lime-400); box-shadow: 0 0 28px rgba(184,245,102,0.3); }
</style>
