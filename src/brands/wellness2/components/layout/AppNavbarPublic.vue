<template>
  <nav class="navbar" :class="{ 'navbar--scrolled': scrolled }">
    <div class="navbar__inner">
      <!-- Logo -->
      <RouterLink to="/" class="navbar__logo">
        <span class="navbar__logo-dot" />
        {{ t('brand.name') }}
      </RouterLink>

      <!-- Links -->
      <ul class="navbar__links">
        <li><a href="#features" class="navbar__link">{{ t('nav.explore') }}</a></li>
        <li><a href="#sessions" class="navbar__link">Sessions</a></li>
        <li><a href="#how"      class="navbar__link">{{ t('nav.about') }}</a></li>
      </ul>

      <!-- CTA -->
      <div class="navbar__cta">
        <RouterLink to="/login"  class="navbar__ghost">{{ t('nav.login') }}</RouterLink>
        <RouterLink to="/signup" class="navbar__btn">{{ t('nav.cta') }}</RouterLink>
      </div>

      <!-- Burger (mobile) -->
      <button
        class="navbar__burger"
        :aria-expanded="open"
        @click="open = !open"
      >
        <span :class="{ open }" /><span :class="{ open }" /><span :class="{ open }" />
      </button>
    </div>

    <!-- Mobile drawer -->
    <Transition name="drawer">
      <div v-if="open" class="navbar__drawer">
        <a href="#features" class="drawer__link" @click="open=false">Features</a>
        <a href="#sessions" class="drawer__link" @click="open=false">Sessions</a>
        <a href="#how"      class="drawer__link" @click="open=false">How it works</a>
        <hr class="drawer__rule" />
        <RouterLink to="/login"  class="drawer__link" @click="open=false">{{ t('nav.login') }}</RouterLink>
        <RouterLink to="/signup" class="navbar__btn drawer__btn" @click="open=false">{{ t('nav.cta') }}</RouterLink>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const scrolled = ref(false)
const open = ref(false)

function onScroll() { scrolled.value = window.scrollY > 40 }
onMounted(()  => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
/* ── Navbar ── */
.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  background: transparent;
  border-bottom: 1px solid transparent;
  backdrop-filter: blur(0px);
  transition: all 400ms var(--ease-smooth);
}
.navbar--scrolled {
  background: rgba(7,15,10,0.88);
  backdrop-filter: blur(24px);
  border-bottom-color: rgba(184,245,102,0.08);
}

.navbar__inner {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 var(--container-pad);
  height: var(--navbar-height);
  max-width: var(--container-max);
  margin: 0 auto;
}

/* Logo */
.navbar__logo {
  display: flex; align-items: center; gap: 7px;
  font-family: var(--font-display); font-size: 19px; font-weight: 800;
  color: var(--text-primary); text-decoration: none; letter-spacing: -0.5px;
}
.navbar__logo-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--lime-500);
  box-shadow: 0 0 8px rgba(184,245,102,0.8);
  animation: pulse-dot 2.5s ease infinite;
  flex-shrink: 0;
}

/* Links */
.navbar__links {
  display: flex; align-items: center; gap: 2px; list-style: none;
}
.navbar__link {
  display: block; padding: 8px 16px;
  font-size: 14px; font-weight: 500; color: rgba(240,250,242,0.7);
  text-decoration: none; border-radius: var(--radius-pill);
  transition: all 150ms;
}
.navbar__link:hover { color: var(--text-primary); background: rgba(255,255,255,0.05); }

/* CTA */
.navbar__cta { display: flex; align-items: center; gap: 8px; }
.navbar__ghost {
  padding: 8px 18px; font-size: 14px; font-weight: 500;
  color: rgba(240,250,242,0.65); text-decoration: none;
  transition: color 150ms;
}
.navbar__ghost:hover { color: var(--text-primary); }

.navbar__btn {
  display: inline-flex; align-items: center;
  padding: 10px 22px; font-size: 14px; font-weight: 700;
  background: var(--lime-500); color: var(--forest-900);
  text-decoration: none; border-radius: var(--radius-pill);
  transition: all 200ms;
}
.navbar__btn:hover {
  background: var(--lime-400);
  box-shadow: 0 0 24px rgba(184,245,102,0.4);
}

/* Burger */
.navbar__burger {
  display: none; flex-direction: column; gap: 5px;
  padding: 4px; background: none; border: none; cursor: pointer;
}
.navbar__burger span {
  display: block; width: 22px; height: 2px;
  background: var(--text-primary); border-radius: 1px;
  transition: all 300ms var(--ease-smooth);
}
.navbar__burger span.open:nth-child(1) { transform: rotate(45deg) translate(5px,5px); }
.navbar__burger span.open:nth-child(2) { opacity: 0; transform: translateX(-8px); }
.navbar__burger span.open:nth-child(3) { transform: rotate(-45deg) translate(5px,-5px); }

/* Mobile drawer */
.navbar__drawer {
  display: flex; flex-direction: column;
  background: rgba(7,15,10,0.95); backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(184,245,102,0.1);
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
.drawer__btn  { width: 100%; justify-content: center; margin-top: 12px; }

/* Drawer transition */
.drawer-enter-active, .drawer-leave-active { transition: all 300ms var(--ease-smooth); }
.drawer-enter-from, .drawer-leave-to { opacity: 0; transform: translateY(-10px); }

@media (max-width: 768px) {
  .navbar__links, .navbar__cta { display: none; }
  .navbar__burger { display: flex; }
}
</style>
