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
  position: fixed;
  bottom: 90px;
  right: 24px;
  z-index: 70;
  width: 56px; height: 56px;
  border-radius: 50%;
  background: none;
  border: none;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
}
.sos-button__ring {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid rgba(239, 68, 68, 0.4);
  animation: pulse-ring 2s ease-out infinite;
}
.sos-button__inner {
  width: 52px; height: 52px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  font-size: 11px; font-weight: 700;
  letter-spacing: 0.5px;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 16px rgba(239, 68, 68, 0.45);
  transition: transform var(--duration-fast) var(--ease-bounce);
}
.sos-button:hover .sos-button__inner { transform: scale(1.1); }
.sos-button:active .sos-button__inner { transform: scale(0.95); }

@keyframes pulse-ring {
  0%   { transform: scale(0.9); opacity: 0.7; }
  70%  { transform: scale(1.3); opacity: 0; }
  100% { opacity: 0; }
}

/* Hide on mobile (bottom bar has SOS) */
@media (max-width: 768px) { .sos-button { display: none; } }
</style>
