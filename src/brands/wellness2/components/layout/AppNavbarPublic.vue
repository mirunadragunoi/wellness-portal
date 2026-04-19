<template>
  <nav class="navbar" :class="{ 'navbar--pinned': scrolled }">
    <div class="navbar__band">
      <!-- Logo -->
      <RouterLink to="/" class="navbar__logo">
        <span class="navbar__logo-name">{{ t('brand.name') }}</span>
      </RouterLink>

      <!-- Links -->
      <ul class="navbar__links">
        <li><RouterLink to="/explore" class="navbar__link">{{ t('nav.explore') }}</RouterLink></li>
        <li><RouterLink to="/learn"   class="navbar__link">{{ t('nav.learn') }}</RouterLink></li>
        <li><a href="#about"          class="navbar__link">{{ t('nav.about') }}</a></li>
      </ul>

      <!-- CTA group -->
      <div class="navbar__cta">
        <RouterLink to="/login"  class="navbar__ghost">{{ t('nav.login') }}</RouterLink>
        <RouterLink to="/signup" class="navbar__btn">{{ t('nav.cta') }}</RouterLink>
      </div>

      <!-- Burger -->
      <button class="navbar__burger" @click="open = !open" :aria-expanded="open">
        <span /><span /><span />
      </button>
    </div>

    <!-- Mobile drawer -->
    <Transition name="drawer">
      <div v-if="open" class="navbar__drawer">
        <RouterLink to="/explore" class="drawer__link" @click="open=false">{{ t('nav.explore') }}</RouterLink>
        <RouterLink to="/learn"   class="drawer__link" @click="open=false">{{ t('nav.learn') }}</RouterLink>
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
function onScroll() { scrolled.value = window.scrollY > 24 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
/* ── Band ── */
.navbar { position:fixed; top:0; left:0; right:0; z-index:100; }

.navbar__band {
  display:flex; align-items:center; justify-content:space-between;
  padding:0 var(--container-pad);
  height:var(--navbar-height);
  background:var(--parchment);
  border-bottom:2px solid var(--ink-200);
  transition:border-color var(--duration-normal);
}
.navbar--pinned .navbar__band {
  border-bottom-color:var(--sage-400);
  box-shadow:0 2px 0 var(--sage-100);
}

/* Logo */
.navbar__logo { display:flex; align-items:center; gap:10px; text-decoration:none; }
.navbar__logo-name {
  font-family:var(--font-display); font-size:22px; font-weight:400;
  color:var(--text-primary); letter-spacing:-0.3px;
}

/* Links */
.navbar__links { display:flex; align-items:center; gap:0; list-style:none; }
.navbar__link {
  display:block; padding:8px 18px;
  font-size:14px; font-weight:500; color:var(--text-secondary);
  text-decoration:none; position:relative;
  transition:color var(--duration-fast);
}
.navbar__link::after {
  content:''; position:absolute; bottom:0; left:18px; right:18px; height:2px;
  background:var(--sage-500); transform:scaleX(0); transition:transform var(--duration-fast);
  transform-origin:left;
}
.navbar__link:hover { color:var(--ink-900); }
.navbar__link:hover::after { transform:scaleX(1); }

/* CTA */
.navbar__cta { display:flex; align-items:center; gap:8px; }
.navbar__ghost {
  padding:8px 16px; font-size:14px; font-weight:500;
  color:var(--text-secondary); text-decoration:none;
  border-radius:var(--radius-sm);
  transition:color var(--duration-fast), background var(--duration-fast);
}
.navbar__ghost:hover { color:var(--ink-900); background:var(--parchment-2); }
.navbar__btn {
  display:inline-flex; align-items:center; justify-content:center;
  padding:9px 22px; font-size:14px; font-weight:600;
  background:var(--ink-900); color:var(--parchment);
  text-decoration:none; border-radius:var(--radius-sm);
  border:2px solid var(--ink-900);
  transition:all var(--duration-fast);
}
.navbar__btn:hover { background:var(--sage-600); border-color:var(--sage-600); }

/* Burger */
.navbar__burger { display:none; flex-direction:column; gap:5px; padding:4px; background:none; border:none; cursor:pointer; }
.navbar__burger span { display:block; width:22px; height:2px; background:var(--ink-800); border-radius:1px; transition:all var(--duration-normal); }

/* Drawer */
.navbar__drawer {
  display:flex; flex-direction:column; gap:0;
  background:var(--parchment); border-bottom:2px solid var(--sage-400);
  padding:8px 24px 20px;
}
.drawer__link {
  display:block; padding:14px 0; color:var(--text-primary); font-size:16px; font-weight:500;
  text-decoration:none; border-bottom:1px solid var(--ink-100);
}
.drawer__rule { border:none; border-top:1px solid var(--ink-200); margin:8px 0; }
.drawer__btn { width:100%; justify-content:center; margin-top:12px; }

.drawer-enter-active, .drawer-leave-active { transition:all var(--duration-normal) var(--ease-smooth); }
.drawer-enter-from, .drawer-leave-to { opacity:0; transform:translateY(-8px); }

@media (max-width:768px) {
  .navbar__links, .navbar__cta { display:none; }
  .navbar__burger { display:flex; }
}
</style>
