<template>
  <nav class="navbar" :class="{ 'navbar--scrolled': scrolled }">
    <div class="navbar__inner container glass">
      <RouterLink to="/" class="navbar__logo">
        <span class="navbar__logo-text">{{ t('brand.name') }}</span>
      </RouterLink>

      <ul class="navbar__links">
        <li><RouterLink to="/explore" class="navbar__link">{{ t('nav.explore') }}</RouterLink></li>
        <li><RouterLink to="/learn" class="navbar__link">{{ t('nav.learn') }}</RouterLink></li>
        <li><a href="#about" class="navbar__link">{{ t('nav.about') }}</a></li>
      </ul>

      <div class="navbar__actions">
        <RouterLink to="/login" class="btn btn-ghost">{{ t('nav.login') }}</RouterLink>
        <RouterLink to="/signup" class="btn btn-primary">{{ t('nav.cta') }}</RouterLink>
      </div>

      <button class="navbar__burger" @click="mobileOpen = !mobileOpen" :class="{ open: mobileOpen }" aria-label="Toggle menu">
        <span /><span /><span />
      </button>
    </div>

    <Transition name="mobile-menu">
      <div v-if="mobileOpen" class="navbar__mobile">
        <RouterLink to="/explore" class="navbar__mobile-link" @click="mobileOpen = false">{{ t('nav.explore') }}</RouterLink>
        <RouterLink to="/learn" class="navbar__mobile-link" @click="mobileOpen = false">{{ t('nav.learn') }}</RouterLink>
        <div class="navbar__mobile-divider" />
        <RouterLink to="/login" class="navbar__mobile-link" @click="mobileOpen = false">{{ t('nav.login') }}</RouterLink>
        <RouterLink to="/signup" class="btn btn-primary navbar__mobile-cta" @click="mobileOpen = false">
          {{ t('nav.cta') }}
        </RouterLink>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

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
  inset: 0 0 auto 0;
  z-index: 120;
  transition: all var(--duration-normal) var(--ease-smooth);
  padding-top: 12px;
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 58px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: var(--r-lg);
  border-color: rgba(167, 139, 250, 0.24);
  transition: all var(--duration-normal) var(--ease-smooth);
}
.navbar--scrolled .navbar__inner {
  border-color: rgba(45, 212, 191, 0.25);
  box-shadow: var(--shadow-sm);
}

.navbar__logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}
.navbar__logo-text {
  font-family: var(--font-d);
  font-size: 20px;
  font-weight: 400;
  color: var(--text-primary);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.navbar__links {
  display: flex;
  align-items: center;
  gap: 26px;
  list-style: none;
}
.navbar__link {
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.03em;
  transition: color var(--duration-fast);
}
.navbar__link:hover { color: var(--violet); }

.navbar__actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 9px 18px; border-radius: var(--r-full);
  font-family: var(--font-b); font-size: 13px; font-weight: 700;
  text-decoration: none; cursor: pointer; border: none;
  transition: all var(--duration-normal) var(--ease-smooth);
}
.btn-primary {
  background: linear-gradient(135deg, var(--violet), var(--teal));
  color: #070d1a;
  box-shadow: 0 4px 16px rgba(167, 139, 250, 0.3);
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(167, 139, 250, 0.45); }
.btn-ghost { background: rgba(255, 255, 255, 0.06); color: var(--text-secondary); border: 1px solid var(--glass-border); }
.btn-ghost:hover { color: var(--violet); }

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
  margin: 10px var(--pad) 0;
  border-radius: var(--r-lg);
  background: rgba(7, 13, 26, 0.9);
  border: 1px solid var(--glass-border);
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
.navbar__mobile-cta { width: 100%; justify-content: center; margin-top: 10px; }

.mobile-menu-enter-active, .mobile-menu-leave-active {
  transition: all var(--duration-normal) var(--ease-smooth);
}
.mobile-menu-enter-from, .mobile-menu-leave-to {
  opacity: 0; transform: translateY(-12px);
}

@media (max-width: 768px) {
  .navbar {
    padding-top: 8px;
  }
  .navbar__inner {
    border-radius: var(--r);
  }
  .navbar__links, .navbar__actions { display: none; }
  .navbar__burger { display: flex; }
}
</style>
