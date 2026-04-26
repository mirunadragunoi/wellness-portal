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
  background: rgba(7,15,10,0.94);
  backdrop-filter: blur(24px);
  border-top: 1px solid rgba(184,245,102,0.1);
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
  border-top:2px solid transparent;
  transition:all var(--duration-fast);
}
.tab.active {
  color:var(--lime-400);
  border-top-color: rgba(184,245,102,0.65);
  background: rgba(184,245,102,0.07);
}
.tab__icon { opacity:0.8; }
.tab.active .tab__icon { opacity:1; }
.tab__label { font-size:10px; font-weight:600; letter-spacing:0.5px; text-transform:uppercase; }

/* SOS pill */
.tab--sos { flex-shrink:0; margin:0 4px; }
.tab__sos-pill {
  padding:8px 14px;
  background:rgba(239,68,68,0.2); color:#f87171;
  font-size:11px; font-weight:800; letter-spacing:1px;
  border-radius:999px;
  border:1px solid rgba(239,68,68,0.35);
  transition:transform var(--duration-fast);
}
.tab--sos:hover .tab__sos-pill { transform:scale(1.05); }
.tab--sos:active .tab__sos-pill { transform:scale(0.96); }

@media (max-width:768px) { .tab-bar { display:flex; } }
</style>
