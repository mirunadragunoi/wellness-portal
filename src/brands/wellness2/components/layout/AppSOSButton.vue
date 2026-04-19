<template>
  <button class="sos-button" @click="uiStore.openSOS()" :aria-label="t('nav.sos')">
    <span class="sos-button__ring" />
    <span class="sos-button__inner">SOS</span>
  </button>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useUIStore } from '@/stores/ui'
const { t } = useI18n()
const uiStore = useUIStore()
</script>

<style scoped>
.sos-button {
  position: fixed; bottom: 28px; right: 20px; z-index: 60;
  width: 58px; height: 58px; border-radius: 50%;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white; font-size: 11px; font-weight: 800;
  letter-spacing: 0.6px; border: 2px solid #b91c1c;
  box-shadow: 0 10px 20px rgba(185, 28, 28, 0.28);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all var(--duration-fast);
  overflow: hidden;
}
.sos-button:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 14px 26px rgba(185, 28, 28, 0.32); }
.sos-button:active { transform: translateY(0); }
.sos-button__ring {
  position: absolute;
  inset: 6px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.45);
  animation: sos-pulse 2s ease-in-out infinite;
}
.sos-button__inner {
  position: relative;
  z-index: 1;
  font-weight: 800;
}
@keyframes sos-pulse {
  0%, 100% { transform: scale(1); opacity: 0.85; }
  50% { transform: scale(1.08); opacity: 0.55; }
}
@media (max-width: 768px) { .sos-button { display: none; } }
</style>
