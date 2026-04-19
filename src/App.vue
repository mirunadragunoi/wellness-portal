<template>
  <div
    class="app"
    :class="{ 'app--authenticated': authStore.isLoggedIn }"
    :data-theme="userStore.darkMode ? 'dark' : 'light'"
    :data-brand="brand.key"
  >

    <!-- Authenticated layout -->
    <template v-if="authStore.isLoggedIn">
      <AppNavbarAuth />

      <main class="app-main app-main--auth">
        <RouterView v-slot="{ Component }">
          <Transition name="page" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </main>

      <AppFooter />

      <!-- Mobile bottom navigation -->
      <AppBottomBar />

      <!-- Persistent mini player (shown when session is playing + not on session page) -->
      <AppMiniPlayer v-if="playerStore.isVisible && !isSessionPage" />

      <!-- SOS floating button (desktop) -->
      <AppSOSButton />

      <!-- SOS overlay -->
      <Transition name="fade">
        <AppSOSOverlay v-if="uiStore.sosOpen" />
      </Transition>
    </template>

    <!-- Public layout -->
    <template v-else>
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
      <AppFooter />
    </template>

    <!-- Global toast notifications -->
    <BaseToast />
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

import { useAuthStore }   from '@/stores/auth'
import { useUserStore }   from '@/stores/user'
import { usePlayerStore } from '@/stores/player'
import { useUIStore }     from '@/stores/ui'
import { getBrandConfig } from '@/config/brand'

import AppNavbarAuth  from '@/components/layout/AppNavbarAuth.vue'
import AppFooter      from '@/components/layout/AppFooter.vue'
import AppBottomBar   from '@/components/layout/AppBottomBar.vue'
import AppMiniPlayer  from '@/components/layout/AppMiniPlayer.vue'
import AppSOSButton   from '@/components/layout/AppSOSButton.vue'
import AppSOSOverlay  from '@/components/layout/AppSOSOverlay.vue'
import BaseToast      from '@/components/base/BaseToast.vue'

const authStore   = useAuthStore()
const userStore   = useUserStore()
const playerStore = usePlayerStore()
const uiStore     = useUIStore()
const route       = useRoute()
const brand       = getBrandConfig()

const isSessionPage = computed(() => route.name === 'session')

// Apply dark mode class on mount and on change
function applyTheme() {
  document.documentElement.setAttribute(
    'data-theme',
    userStore.darkMode ? 'dark' : 'light'
  )
}

onMounted(applyTheme)
watch(() => userStore.darkMode, applyTheme)
</script>

<style>
/* These styles are global, not scoped */
.app {
  min-height: var(--app-min-height);
  display: flex;
  flex-direction: column;
  background: var(--bg-base);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.app-main {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.app-main--auth {
  /* Bottom safe area; page views use --page-pad-bottom-auth for nav / mini player */
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

/* Page transition */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* Fade */
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }

/* Footer clears fixed bottom nav on mobile when logged in */
@media (max-width: 768px) {
  .app--authenticated .footer {
    margin-bottom: calc(var(--bottom-bar-height) + env(safe-area-inset-bottom, 0px));
  }
}
</style>
