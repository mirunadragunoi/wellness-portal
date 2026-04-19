<template>
  <nav class="navbar-auth" :class="{ 'navbar-auth--scrolled': scrolled }">
    <div class="navbar-auth__inner">
      <!-- Logo -->
      <RouterLink :to="{ name: 'landing' }" class="navbar-auth__logo">
        <span class="logo-text">{{ t('brand.name') }}</span>
      </RouterLink>

      <!-- Desktop Nav -->
      <ul class="navbar-auth__links">
        <li>
          <RouterLink to="/home" class="nav-link" :class="{ active: route.name === 'home' }">
            {{ t('nav.home') }}
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/explore" class="nav-link" :class="{ active: route.name === 'explore' }">
            {{ t('nav.explore') }}
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/learn" class="nav-link" :class="{ active: route.name === 'learn' }">
            {{ t('nav.learn') }}
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/progress" class="nav-link" :class="{ active: route.name === 'progress' }">
            {{ t('nav.progress') }}
          </RouterLink>
        </li>
      </ul>

      <!-- Right: Avatar + streak -->
      <div class="navbar-auth__right">
        <div class="streak-pill" title="Current streak">
          <Icon icon="lucide:flame" class="app-icon app-icon--sm" aria-hidden="true" />
          {{ progressStore.streakDays }}
        </div>
        <RouterLink to="/profile" class="avatar-btn">
          <Icon
            :icon="AVATAR_ICONS[userStore.avatar] || AVATAR_ICONS['avatar-1']"
            class="avatar-btn__icon app-icon app-icon--md app-icon--primary"
          />
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useProgressStore } from '@/stores/progress'
import { AVATAR_ICONS } from '@/constants/appIcons'

const { t } = useI18n()
const route = useRoute()
const userStore    = useUserStore()
const progressStore = useProgressStore()
const scrolled = ref(false)

function onScroll() { scrolled.value = window.scrollY > 10 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.navbar-auth {
  position: sticky;
  top: 0;
  z-index: 90;
  transition: box-shadow var(--duration-normal) var(--ease-smooth);
}
.navbar-auth--scrolled { box-shadow: var(--shadow-sm); }

.navbar-auth__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--container-pad);
  height: var(--navbar-height);
  background: rgba(240, 249, 255, 0.92);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-subtle);
}
[data-theme="dark"] .navbar-auth__inner {
  background: rgba(11, 18, 32, 0.92);
}

.navbar-auth__logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}
.logo-text {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 500;
  color: var(--text-primary);
}

.navbar-auth__links {
  display: flex;
  align-items: center;
  gap: 4px;
  list-style: none;
}
.nav-link {
  display: block;
  padding: 8px clamp(10px, 1.2vw, 16px);
  border-radius: 100px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all var(--duration-fast) var(--ease-smooth);
}
.nav-link:hover { color: var(--sky-600); background: var(--sky-50); }
.nav-link.active { color: var(--sky-600); background: var(--sky-100); }

.navbar-auth__right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.streak-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: var(--warm-100);
  border-radius: 100px;
  font-size: 14px;
  font-weight: 600;
  color: #92400e;
  border: 1px solid #fde68a;
}

.avatar-btn {
  width: 40px; height: 40px;
  border-radius: 50%;
  background: var(--sky-100);
  display: flex; align-items: center; justify-content: center;
  text-decoration: none;
  border: 2px solid var(--sky-200);
  transition: all var(--duration-fast);
}
.avatar-btn:hover {
  border-color: var(--sky-400);
  transform: scale(1.05);
}

@media (max-width: 1024px) {
  .navbar-auth__links { gap: 0; }
  .nav-link { font-size: 13px; }
}

@media (max-width: 768px) {
  .navbar-auth__links { display: none; }
}
</style>
