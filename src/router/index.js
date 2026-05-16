import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { getBrandKey } from '@/config/brand'

const brand = getBrandKey()

const brandViews = {
  wellness: {
    landing: () => import('@/views/LandingView.vue'),
    login: () => import('@/views/auth/LoginView.vue'),
    signup: () => import('@/views/auth/SignupView.vue'),
    onboarding: () => import('@/views/OnboardingView.vue'),
    home: () => import('@/views/HomeView.vue'),
    explore: () => import('@/views/ExploreView.vue'),
    session: () => import('@/views/session/SessionView.vue'),
    breathing: () => import('@/views/breathing/BreathingView.vue'),
    practice: () => import('@/views/PracticeView.vue'),
    practiceVideo: () => import('@/views/PracticeVideoView.vue'),
    listen: () => import('@/views/ListenView.vue'),
    learn: () => import('@/views/learn/LearnView.vue'),
    article: () => import('@/views/learn/ArticleView.vue'),
    progress: () => import('@/views/ProgressView.vue'),
    profile: () => import('@/views/ProfileView.vue')
  },
  wellness2: {
    landing: () => import('@/brands/wellness2/views/LandingView.vue'),
    login: () => import('@/brands/wellness2/views/auth/LoginView.vue'),
    signup: () => import('@/brands/wellness2/views/auth/SignupView.vue'),
    onboarding: () => import('@/brands/wellness2/views/OnboardingView.vue'),
    home: () => import('@/brands/wellness2/views/HomeView.vue'),
    explore: () => import('@/brands/wellness2/views/ExploreView.vue'),
    session: () => import('@/brands/wellness2/views/session/SessionView.vue'),
    breathing: () => import('@/brands/wellness2/views/breathing/BreathingView.vue'),
    practice: () => import('@/brands/wellness2/views/PracticeView.vue'),
    practiceVideo: () => import('@/brands/wellness2/views/PracticeVideoView.vue'),
    listen: () => import('@/brands/wellness2/views/ListenView.vue'),
    learn: () => import('@/brands/wellness2/views/learn/LearnView.vue'),
    article: () => import('@/brands/wellness2/views/learn/ArticleView.vue'),
    progress: () => import('@/brands/wellness2/views/ProgressView.vue'),
    profile: () => import('@/brands/wellness2/views/ProfileView.vue')
  },
  wellness3: {
    landing: () => import('@/brands/wellness3/views/LandingView.vue'),
    login: () => import('@/brands/wellness3/views/auth/LoginView.vue'),
    signup: () => import('@/brands/wellness3/views/auth/SignupView.vue'),
    onboarding: () => import('@/brands/wellness3/views/OnboardingView.vue'),
    home: () => import('@/brands/wellness3/views/HomeView.vue'),
    explore: () => import('@/brands/wellness3/views/ExploreView.vue'),
    session: () => import('@/brands/wellness3/views/session/SessionView.vue'),
    breathing: () => import('@/brands/wellness3/views/breathing/BreathingView.vue'),
    practice: () => import('@/brands/wellness3/views/PracticeView.vue'),
    practiceVideo: () => import('@/brands/wellness3/views/PracticeVideoView.vue'),
    listen: () => import('@/brands/wellness3/views/ListenView.vue'),
    learn: () => import('@/brands/wellness3/views/learn/LearnView.vue'),
    article: () => import('@/brands/wellness3/views/learn/ArticleView.vue'),
    progress: () => import('@/brands/wellness3/views/ProgressView.vue'),
    profile: () => import('@/brands/wellness3/views/ProfileView.vue')
  }
}

const views = brandViews[brand] || brandViews.wellness

const routes = [
  // ─── Public ────────────────────────────────────────────
  {
    path: '/',
    name: 'landing',
    component: views.landing,
    meta: { public: true }
  },
  {
    path: '/login',
    name: 'login',
    component: views.login,
    meta: { public: true, hideForAuth: true }
  },
  {
    path: '/signup',
    name: 'signup',
    component: views.signup,
    meta: { public: true, hideForAuth: true }
  },
  {
    path: '/about',
    name: 'legal-about',
    component: () => import('../views/legal/LegalPageView.vue'),
    meta: { public: true, legalKey: 'about' }
  },
  {
    path: '/contact',
    name: 'legal-contact',
    component: () => import('../views/legal/LegalPageView.vue'),
    meta: { public: true, legalKey: 'contact' }
  },
  {
    path: '/faq',
    name: 'legal-faq',
    component: () => import('../views/legal/LegalPageView.vue'),
    meta: { public: true, legalKey: 'faq' }
  },
  {
    path: '/terms',
    name: 'legal-terms',
    component: () => import('../views/legal/LegalPageView.vue'),
    meta: { public: true, legalKey: 'terms' }
  },
  {
    path: '/privacy',
    name: 'legal-privacy',
    component: () => import('../views/legal/LegalPageView.vue'),
    meta: { public: true, legalKey: 'privacy' }
  },
  {
    path: '/cookies-policy',
    name: 'legal-cookies',
    component: () => import('../views/legal/LegalPageView.vue'),
    meta: { public: true, legalKey: 'cookies' }
  },
  {
    path: '/unsubscription',
    name: 'legal-unsubscribe',
    component: () => import('../views/legal/LegalPageView.vue'),
    meta: { public: true, legalKey: 'unsubscribe' }
  },
  {
    path: '/onboarding',
    name: 'onboarding',
    component: views.onboarding,
    meta: { public: true } // accessible before & after auth
  },

  // ─── Authenticated ──────────────────────────────────────
  {
    path: '/home',
    name: 'home',
    component: views.home,
    meta: { requiresAuth: true }
  },
  {
    path: '/explore',
    name: 'explore',
    component: views.explore,
    meta: { requiresAuth: true }
  },
  {
    path: '/session/:id',
    name: 'session',
    component: views.session,
    meta: { requiresAuth: true }
  },
  {
    path: '/breathing/:type',
    name: 'breathing',
    component: views.breathing,
    meta: { requiresAuth: true }
  },
  {
    path: '/practice',
    name: 'practice',
    component: views.practice,
    meta: { requiresAuth: true }
  },
  {
    path: '/practice/:id',
    name: 'practice-video',
    component: views.practiceVideo,
    meta: { requiresAuth: true }
  },
  ...(brand === 'wellness'
    ? []
    : [{
        path: '/listen',
        name: 'listen',
        component: views.listen,
        meta: { requiresAuth: true }
      }]),
  {
    path: '/learn',
    name: 'learn',
    component: views.learn,
    meta: { requiresAuth: true }
  },
  {
    path: '/learn/:slug',
    name: 'article',
    component: views.article,
    meta: { requiresAuth: true }
  },
  {
    path: '/progress',
    name: 'progress',
    component: views.progress,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: views.profile,
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

// ─── Stale chunk recovery ───────────────────────────────
// After a redeploy, the browser may hold an old index.js that references
// chunk filenames which no longer exist. The dynamic import fails — reload
// to fetch the fresh asset manifest.
router.onError((error, to) => {
  const msg = error?.message || ''
  const isChunkError =
    msg.includes('Failed to fetch dynamically imported module') ||
    msg.includes('error loading dynamically imported module') ||
    msg.includes('Importing a module script failed')
  if (isChunkError) {
    if (to?.fullPath) {
      window.location.href = to.fullPath
    } else {
      window.location.reload()
    }
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
