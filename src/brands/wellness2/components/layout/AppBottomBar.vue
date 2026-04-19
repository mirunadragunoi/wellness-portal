<template>
  <nav class="tab-bar">
    <RouterLink to="/home"    class="tab" :class="{ active: route.name==='home' }">
      <Icon icon="lucide:home" class="tab__icon app-icon app-icon--md" />
      <span class="tab__label">{{ t('nav.home') }}</span>
    </RouterLink>
    <RouterLink to="/explore" class="tab" :class="{ active: route.name==='explore' }">
      <Icon icon="lucide:search" class="tab__icon app-icon app-icon--md" />
      <span class="tab__label">{{ t('nav.explore') }}</span>
    </RouterLink>
    <button class="tab tab--sos" @click="uiStore.openSOS()">
      <span class="tab__sos-pill">SOS</span>
    </button>
    <RouterLink to="/learn"   class="tab" :class="{ active: route.name==='learn' }">
      <Icon icon="lucide:book-open" class="tab__icon app-icon app-icon--md" />
      <span class="tab__label">{{ t('nav.learn') }}</span>
    </RouterLink>
    <RouterLink to="/profile" class="tab" :class="{ active: route.name==='profile' }">
      <Icon icon="lucide:user" class="tab__icon app-icon app-icon--md" />
      <span class="tab__label">{{ t('nav.profile') }}</span>
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
.tab-bar {
  display:none;
  position:fixed; bottom:0; left:0; right:0;
  height:var(--bottom-bar-height);
  background:var(--bg-surface);
  border-top: 1px solid var(--ink-200);
  z-index:80;
  align-items:stretch;
  justify-content:space-around;
}

.tab {
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  gap:3px; flex:1;
  text-decoration:none; color:var(--text-muted);
  background:none; border:none; cursor:pointer;
  padding:8px 0;
  border-top:3px solid transparent;
  transition:color var(--duration-fast), border-color var(--duration-fast);
}
.tab.active { color:var(--sage-600); border-top-color:var(--sage-500); }
.tab__icon { opacity:0.7; }
.tab.active .tab__icon { opacity:1; }
.tab__label { font-size:10px; font-weight:600; letter-spacing:0.5px; text-transform:uppercase; }

/* SOS pill */
.tab--sos { flex-shrink:0; margin:0 4px; }
.tab__sos-pill {
  padding:8px 14px;
  background:#dc2626; color:white;
  font-size:11px; font-weight:800; letter-spacing:1px;
  border-radius:var(--radius-sm);
  border:2px solid #b91c1c;
  transition:transform var(--duration-fast);
}
.tab--sos:hover .tab__sos-pill { transform:scale(1.05); }
.tab--sos:active .tab__sos-pill { transform:scale(0.96); }

@media (max-width:768px) { .tab-bar { display:flex; } }
</style>
