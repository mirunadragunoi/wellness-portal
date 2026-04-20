<template>
  <nav class="bottom-bar">
    <RouterLink to="/home"    class="bottom-bar__item" :class="{ active: route.name === 'home' }">
      <Icon icon="lucide:home" class="bottom-bar__icon app-icon app-icon--md" />
      <span class="bottom-bar__label">{{ t('nav.home') }}</span>
    </RouterLink>

    <RouterLink to="/explore" class="bottom-bar__item" :class="{ active: route.name === 'explore' }">
      <Icon icon="lucide:search" class="bottom-bar__icon app-icon app-icon--md" />
      <span class="bottom-bar__label">{{ t('nav.explore') }}</span>
    </RouterLink>

    <!-- SOS center button -->
    <button class="bottom-bar__sos" @click="uiStore.openSOS()">
      <span class="bottom-bar__sos-inner">SOS</span>
    </button>

    <RouterLink to="/learn"   class="bottom-bar__item" :class="{ active: route.name === 'learn' }">
      <Icon icon="lucide:book-open" class="bottom-bar__icon app-icon app-icon--md" />
      <span class="bottom-bar__label">{{ t('nav.learn') }}</span>
    </RouterLink>

    <RouterLink to="/profile" class="bottom-bar__item" :class="{ active: route.name === 'profile' }">
      <Icon icon="lucide:user" class="bottom-bar__icon app-icon app-icon--md" />
      <span class="bottom-bar__label">{{ t('nav.profile') }}</span>
    </RouterLink>
  </nav>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useUIStore } from '@/stores/ui'

const { t } = useI18n()
const route  = useRoute()
const uiStore = useUIStore()
</script>

<style scoped>
.bottom-bar {
  display: none;
  position: fixed;
  bottom: 0; left: 0; right: 0;
  height: var(--bottom-bar-height);
  background: rgba(7, 13, 26, 0.94);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  z-index: 80;
  align-items: center;
  justify-content: space-around;
  padding: 0 6px;
  box-shadow: 0 -8px 30px rgba(0, 0, 0, 0.35);
}

.bottom-bar__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  flex: 1;
  text-decoration: none;
  color: var(--text-muted);
  transition: color var(--duration-fast);
  padding: 8px 0;
}
.bottom-bar__item.active { color: var(--violet); }
.bottom-bar__icon { opacity: 0.85; }
.bottom-bar__item.active .bottom-bar__icon { opacity: 1; color: var(--violet); }
.bottom-bar__label { font-size: 10px; font-weight: 500; }

/* SOS center */
.bottom-bar__sos {
  flex-shrink: 0;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  margin: 0 8px;
  margin-bottom: 20px;
}
.bottom-bar__sos-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px; height: 52px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
  box-shadow: 0 8px 18px rgba(239, 68, 68, 0.35);
  transition: transform var(--duration-fast) var(--ease-bounce);
}
.bottom-bar__sos:hover .bottom-bar__sos-inner { transform: scale(1.1); }
.bottom-bar__sos:active .bottom-bar__sos-inner { transform: scale(0.95); }

@media (max-width: 768px) {
  .bottom-bar { display: flex; }
}
</style>
