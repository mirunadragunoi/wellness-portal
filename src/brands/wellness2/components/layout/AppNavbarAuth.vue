<template>
  <nav class="navbar-auth" :class="{ 'scrolled': scrolled }">
    <div class="navbar-auth__inner">
      <RouterLink :to="{ name: 'landing' }" class="auth-logo">
        <span class="auth-logo__name">{{ t('brand.name') }}</span>
      </RouterLink>

      <ul class="auth-nav">
        <li v-for="item in navItems" :key="item.to">
          <RouterLink :to="item.to" class="auth-nav__link" :class="{ active: route.name === item.name }">
            {{ item.label }}
          </RouterLink>
        </li>
      </ul>

      <div class="auth-actions">
        <div class="streak-tag">
          <Icon icon="lucide:flame" class="app-icon app-icon--sm" />
          {{ progressStore.streakDays }}
        </div>
        <RouterLink to="/profile" class="avatar-ring">
          <Icon :icon="AVATAR_ICONS[userStore.avatar] || AVATAR_ICONS['avatar-1']"
            class="app-icon app-icon--md app-icon--primary" />
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useProgressStore } from '@/stores/progress'
import { AVATAR_ICONS } from '@/constants/appIcons'
const { t } = useI18n()
const route = useRoute()
const userStore = useUserStore()
const progressStore = useProgressStore()
const scrolled = ref(false)
function onScroll() { scrolled.value = window.scrollY > 10 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
const navItems = computed(() => [
  { to:'/home',     name:'home',     label:t('nav.home')     },
  { to:'/explore',  name:'explore',  label:t('nav.explore')  },
  { to:'/learn',    name:'learn',    label:t('nav.learn')    },
  { to:'/progress', name:'progress', label:t('nav.progress') },
])
</script>

<style scoped>
.navbar-auth {
  position:sticky; top:0; z-index:90;
}
.navbar-auth__inner {
  display:flex; align-items:center; justify-content:space-between;
  padding:0 var(--container-pad);
  min-height:var(--navbar-height);
  background:var(--bg-surface);
  border-bottom:2px solid var(--ink-200);
  transition:border-color var(--duration-normal), box-shadow var(--duration-normal);
}
.scrolled .navbar-auth__inner {
  border-bottom-color:var(--sage-300);
  box-shadow:0 2px 12px rgba(28,26,22,0.06);
}
[data-theme="dark"] .navbar-auth__inner { background:var(--bg-surface); }

/* Logo */
.auth-logo { display:flex; align-items:center; gap:9px; text-decoration:none; }
.auth-logo__name { font-family:var(--font-display); font-size:20px; font-weight:400; color:var(--text-primary); }

/* Nav */
.auth-nav { display:flex; align-items:center; gap:2px; list-style:none; min-height:var(--navbar-height); }
.auth-nav__link {
  display:flex; align-items:center; justify-content:center;
  min-height: var(--navbar-height);
  padding: 10px clamp(10px,1.2vw,18px);
  font-size:14px; font-weight:500; color:var(--text-secondary);
  text-decoration:none; position:relative;
  transition:color var(--duration-fast);
  line-height: 1;
}
.auth-nav__link::after {
  content:''; position:absolute; bottom:0; left:0; right:0; height:3px;
  background:var(--sage-500); transform:scaleX(0);
  transition:transform var(--duration-fast); transform-origin:left;
}
.auth-nav__link:hover { color:var(--ink-900); }
.auth-nav__link.active { color:var(--ink-900); font-weight:600; }
.auth-nav__link.active::after { transform:scaleX(1); }

/* Right */
.auth-actions { display:flex; align-items:center; gap:10px; }
.streak-tag {
  display:flex; align-items:center; gap:5px;
  padding:5px 12px; background:var(--parchment-2);
  border:1.5px solid var(--parchment-4); border-radius:var(--radius-sm);
  font-size:13px; font-weight:700; color:#92400e;
}
.avatar-ring {
  width:36px; height:36px; border-radius:50%;
  background:var(--sage-100); border:2px solid var(--sage-200);
  display:flex; align-items:center; justify-content:center;
  text-decoration:none; transition:border-color var(--duration-fast);
}
.avatar-ring:hover { border-color:var(--sage-500); }

@media (max-width:768px) { .auth-nav { display:none; } }

@media (max-width: 1024px) {
  .auth-logo__name {
    font-size: 18px;
  }
  .auth-actions {
    gap: 8px;
  }
}

@media (max-width: 640px) {
  .navbar-auth__inner {
    min-height: 60px;
    padding: 0 16px;
  }
  .streak-tag {
    padding: 4px 10px;
    font-size: 12px;
  }
}
</style>
