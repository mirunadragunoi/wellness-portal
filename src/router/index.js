import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  // ─── Public ────────────────────────────────────────────
  {
    path: '/',
    name: 'landing',
    component: () => import('@/views/LandingView.vue'),
    meta: { public: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: { public: true, hideForAuth: true }
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/auth/SignupView.vue'),
    meta: { public: true, hideForAuth: true }
  },
  {
    path: '/onboarding',
    name: 'onboarding',
    component: () => import('@/views/OnboardingView.vue'),
    meta: { public: true } // accessible before & after auth
  },

  // ─── Authenticated ──────────────────────────────────────
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/explore',
    name: 'explore',
    component: () => import('@/views/ExploreView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/session/:id',
    name: 'session',
    component: () => import('@/views/session/SessionView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/breathing/:type',
    name: 'breathing',
    component: () => import('@/views/breathing/BreathingView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/learn',
    name: 'learn',
    component: () => import('@/views/learn/LearnView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/learn/:slug',
    name: 'article',
    component: () => import('@/views/learn/ArticleView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/progress',
    name: 'progress',
    component: () => import('@/views/ProgressView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: { requiresAuth: true }
  },

  // ─── Catch-all ──────────────────────────────────────────
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  }
})

// ─── Global navigation guard ────────────────────────────
router.beforeEach((to) => {
  // Must use inside guard to avoid setup-time store access issues
  const auth = useAuthStore()

  // Redirect logged-in users away from login/signup
  if (to.meta.hideForAuth && auth.isLoggedIn) {
    return { name: 'home' }
  }

  // Redirect unauthenticated users to login
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})

export default router
