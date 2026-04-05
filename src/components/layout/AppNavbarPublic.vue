<template>
  <nav class="navbar" :class="{ 'navbar--scrolled': scrolled }">
    <div class="navbar__inner">
      <!-- Logo -->
      <RouterLink to="/" class="navbar__logo">
        <div class="navbar__logo-icon">
          <Icon :icon="BRAND_ICON" class="app-icon app-icon--md" />
        </div>
        <span class="navbar__logo-text">{{ t('brand.name') }}</span>
      </RouterLink>

      <!-- Desktop links -->
      <ul class="navbar__links">
        <li><RouterLink to="/explore" class="navbar__link">{{ t('nav.explore') }}</RouterLink></li>
        <li><RouterLink to="/learn"   class="navbar__link">{{ t('nav.learn') }}</RouterLink></li>
        <li><a href="#about"          class="navbar__link">{{ t('nav.about') }}</a></li>
      </ul>

      <!-- Actions -->
      <div class="navbar__actions">
        <RouterLink to="/login"  class="btn btn-ghost">{{ t('nav.login') }}</RouterLink>
        <RouterLink to="/signup" class="btn btn-primary">{{ t('nav.cta') }}</RouterLink>
      </div>

      <!-- Mobile hamburger -->
      <button class="navbar__burger" @click="mobileOpen = !mobileOpen" :class="{ open: mobileOpen }">
        <span /><span /><span />
      </button>
    </div>

    <!-- Mobile Menu -->
    <Transition name="mobile-menu">
      <div v-if="mobileOpen" class="navbar__mobile">
        <RouterLink to="/explore" class="navbar__mobile-link" @click="mobileOpen = false">{{ t('nav.explore') }}</RouterLink>
        <RouterLink to="/learn"   class="navbar__mobile-link" @click="mobileOpen = false">{{ t('nav.learn') }}</RouterLink>
        <div class="navbar__mobile-divider" />
        <RouterLink to="/login"  class="navbar__mobile-link" @click="mobileOpen = false">{{ t('nav.login') }}</RouterLink>
        <RouterLink to="/signup" class="btn btn-primary" style="width:100%;justify-content:center;margin-top:8px" @click="mobileOpen = false">
          {{ t('nav.cta') }}
        </RouterLink>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { BRAND_ICON } from '@/constants/appIcons'

const { t } = useI18n()
const scrolled    = ref(false)
const mobileOpen  = ref(false)

function onScroll() { scrolled.value = window.scrollY > 20 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  transition: all var(--duration-normal) var(--ease-smooth);
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px var(--container-pad);
  background: rgba(240, 249, 255, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(186, 230, 253, 0.3);
  transition: all var(--duration-normal) var(--ease-smooth);
}
[data-theme="dark"] .navbar__inner {
  background: rgba(11, 18, 32, 0.9);
  border-bottom-color: rgba(14, 165, 233, 0.15);
}
.navbar--scrolled .navbar__inner {
  padding-top: 12px;
  padding-bottom: 12px;
  box-shadow: var(--shadow-sm);
}

.navbar__logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}
.navbar__logo-icon {
  width: 40px; height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--sky-400), var(--sky-600));
  display: flex; align-items: center; justify-content: center;
  color: white;
}
.navbar__logo-text {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 500;
  color: var(--text-primary);
  letter-spacing: -0.5px;
}

.navbar__links {
  display: flex;
  align-items: center;
  gap: 32px;
  list-style: none;
}
.navbar__link {
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 15px;
  font-weight: 400;
  transition: color var(--duration-fast);
}
.navbar__link:hover { color: var(--sky-600); }

.navbar__actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 10px 24px; border-radius: 100px;
  font-family: var(--font-body); font-size: 14px; font-weight: 500;
  text-decoration: none; cursor: pointer; border: none;
  transition: all var(--duration-normal) var(--ease-smooth);
}
.btn-primary {
  background: linear-gradient(135deg, var(--sky-500), var(--sky-600));
  color: white;
  box-shadow: 0 4px 14px rgba(14, 165, 233, 0.3);
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(14, 165, 233, 0.4); }
.btn-ghost { background: transparent; color: var(--text-secondary); }
.btn-ghost:hover { color: var(--sky-600); }

/* Burger */
.navbar__burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 4px;
}
.navbar__burger span {
  display: block;
  width: 24px; height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: all var(--duration-normal);
}
.navbar__burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.navbar__burger.open span:nth-child(2) { opacity: 0; }
.navbar__burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* Mobile menu */
.navbar__mobile {
  display: flex;
  flex-direction: column;
  padding: 16px 24px 24px;
  background: var(--bg-surface);
  border-top: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-lg);
}
.navbar__mobile-link {
  display: block;
  padding: 14px 0;
  color: var(--text-primary);
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  border-bottom: 1px solid var(--border-subtle);
}
.navbar__mobile-divider { margin: 8px 0; }

.mobile-menu-enter-active, .mobile-menu-leave-active {
  transition: all var(--duration-normal) var(--ease-smooth);
}
.mobile-menu-enter-from, .mobile-menu-leave-to {
  opacity: 0; transform: translateY(-12px);
}

@media (max-width: 768px) {
  .navbar__inner { padding-top: 14px; padding-bottom: 14px; }
  .navbar__links, .navbar__actions { display: none; }
  .navbar__burger { display: flex; }
}
</style>
