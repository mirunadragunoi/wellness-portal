<template>
  <nav class="navbar-auth">
    <div class="navbar-auth__inner">
      <!-- Logo -->
      <RouterLink to="/home" class="navbar-auth__logo">
        <span class="navbar-auth__logo-dot" />
        {{ t('brand.name') }}
      </RouterLink>

      <!-- Nav tabs -->
      <ul class="navbar-auth__tabs">
        <li>
          <RouterLink to="/home"     class="nav-tab" active-class="nav-tab--active">{{ t('nav.home') }}</RouterLink>
        </li>
        <li>
          <RouterLink to="/explore"  class="nav-tab" active-class="nav-tab--active">{{ t('nav.explore') }}</RouterLink>
        </li>
        <li>
          <RouterLink to="/learn"    class="nav-tab" active-class="nav-tab--active">{{ t('nav.learn') }}</RouterLink>
        </li>
        <li>
          <RouterLink to="/progress" class="nav-tab" active-class="nav-tab--active">{{ t('nav.progress') }}</RouterLink>
        </li>
      </ul>

      <!-- Right actions -->
      <div class="navbar-auth__right">
        <button class="sos-btn" @click="uiStore.openSOS()">
          <Icon icon="lucide:alert-circle" class="app-icon app-icon--sm" />
          {{ t('nav.sos') }}
        </button>
        <RouterLink to="/profile" class="avatar-btn">
          <Icon :icon="userIcon" class="app-icon app-icon--sm" />
        </RouterLink>
      </div>

      <!-- Burger (mobile) -->
      <button
        class="navbar-auth__burger"
        :aria-expanded="open"
        @click="open = !open"
      >
        <span /><span /><span />
      </button>
    </div>

    <!-- Mobile drawer -->
    <Transition name="drawer">
      <div v-if="open" class="navbar-auth__drawer">
        <RouterLink to="/home"     class="drawer__link" @click="open=false">{{ t('nav.home') }}</RouterLink>
        <RouterLink to="/explore"  class="drawer__link" @click="open=false">{{ t('nav.explore') }}</RouterLink>
        <RouterLink to="/learn"    class="drawer__link" @click="open=false">{{ t('nav.learn') }}</RouterLink>
        <RouterLink to="/progress" class="drawer__link" @click="open=false">{{ t('nav.progress') }}</RouterLink>
        <hr class="drawer__rule" />
        <RouterLink to="/profile"  class="drawer__link" @click="open=false">{{ t('nav.profile') }}</RouterLink>
        <RouterLink to="/sos"      class="sos-btn drawer__sos" @click="open=false">
          {{ t('nav.sos') }}
        </RouterLink>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue'
import { useUserStore } from '@/stores/user'
import { useUIStore } from '@/stores/ui'
import { AVATAR_ICONS } from '@/brands/wellness2/constants/appIcons'

const { t } = useI18n()
const open = ref(false)
const uiStore = useUIStore()
const userStore = useUserStore()
const userIcon = AVATAR_ICONS[userStore.profile?.avatar] || 'lucide:user'
</script>

<style scoped>
.navbar-auth {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  background: rgba(7,15,10,0.88); backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(184,245,102,0.08);
}

.navbar-auth__inner {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 var(--container-pad);
  height: var(--navbar-height);
  max-width: var(--container-max);
  margin: 0 auto;
}

/* Logo */
.navbar-auth__logo {
  display: flex; align-items: center; gap: 7px;
  font-family: var(--font-display); font-size: 18px; font-weight: 800;
  color: var(--text-primary); text-decoration: none; letter-spacing: -0.5px;
}
.navbar-auth__logo-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--lime-500); box-shadow: 0 0 8px rgba(184,245,102,0.8);
  animation: pulse-dot 2.5s ease infinite; flex-shrink: 0;
}

/* Nav tabs */
.navbar-auth__tabs { display: flex; align-items: center; gap: 2px; list-style: none; }
.nav-tab {
  display: block; padding: 8px 16px;
  font-size: 14px; font-weight: 500; color: var(--text-muted);
  text-decoration: none; border-radius: var(--radius-pill);
  transition: all 150ms;
}
.nav-tab:hover         { color: var(--text-secondary); background: rgba(255,255,255,0.04); }
.nav-tab--active       { color: var(--lime-500); background: rgba(184,245,102,0.08); }

/* Right */
.navbar-auth__right { display: flex; align-items: center; gap: 8px; }

.sos-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 14px; font-size: 13px; font-weight: 600;
  border-radius: var(--radius-pill); text-decoration: none;
  background: rgba(239,68,68,0.1); color: #f87171;
  border: 1px solid rgba(239,68,68,0.25);
  transition: all 150ms;
}
.sos-btn:hover { background: rgba(239,68,68,0.18); }

.avatar-btn {
  width: 36px; height: 36px; border-radius: 50%;
  background: var(--forest-600); border: 2px solid rgba(184,245,102,0.2);
  display: flex; align-items: center; justify-content: center;
  color: var(--lime-400); text-decoration: none;
  transition: border-color 200ms;
}
.avatar-btn:hover { border-color: rgba(184,245,102,0.5); }

/* Burger */
.navbar-auth__burger {
  display: none; flex-direction: column; gap: 5px;
  padding: 4px; background: none; border: none; cursor: pointer;
}
.navbar-auth__burger span {
  display: block; width: 22px; height: 2px;
  background: var(--text-primary); border-radius: 1px;
}

/* Drawer */
.navbar-auth__drawer {
  display: flex; flex-direction: column;
  background: rgba(7,15,10,0.95); backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(184,245,102,0.08);
  padding: 8px var(--container-pad) 24px;
}
.drawer__link {
  display: block; padding: 14px 0;
  color: var(--text-primary); font-size: 16px; font-weight: 500;
  text-decoration: none; border-bottom: 1px solid rgba(255,255,255,0.05);
  transition: color 150ms;
}
.drawer__link:hover { color: var(--lime-400); }
.drawer__rule { border: none; border-top: 1px solid rgba(255,255,255,0.06); margin: 8px 0; }
.drawer__sos  { margin-top: 12px; justify-content: center; }

.drawer-enter-active, .drawer-leave-active { transition: all 300ms var(--ease-smooth); }
.drawer-enter-from, .drawer-leave-to { opacity: 0; transform: translateY(-10px); }

@media (max-width: 768px) {
  .navbar-auth__tabs, .navbar-auth__right { display: none; }
  .navbar-auth__burger { display: flex; }
}
</style>
