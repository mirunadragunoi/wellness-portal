<template>
  <div class="landing" :class="{ 'landing--public': !authStore.isLoggedIn }">
    <!-- Logged-in users already have AppNavbarAuth from App.vue -->
    <AppNavbarPublic v-if="!authStore.isLoggedIn" />

    <main>
      <LandingHero />

      <div class="reveal reveal-1"><LandingFeatures /></div>
      <div class="reveal reveal-2"><LandingHowItWorks /></div>
      <div class="reveal reveal-3"><LandingPreview /></div>
      <div class="reveal reveal-2"><LandingMetrics /></div>
      <div class="reveal reveal-3"><LandingTestimonials /></div>
      <div class="reveal reveal-4"><LandingFinalCTA /></div>
    </main>

    <!-- Quiz float button -->
    <RouterLink
      to="/onboarding"
      class="quiz-float"
      :class="{ 'quiz-float--auth-mobile': authStore.isLoggedIn }"
    >
      <Icon icon="lucide:sparkles" class="quiz-float__icon app-icon app-icon--md" />
      {{ t('quizFloat') }}
    </RouterLink>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
import AppNavbarPublic   from '@/components/layout/AppNavbarPublic.vue'
import LandingHero       from '@/components/landing/LandingHero.vue'
import LandingFeatures   from '@/components/landing/LandingFeatures.vue'
import LandingHowItWorks from '@/components/landing/LandingHowItWorks.vue'
import LandingPreview    from '@/components/landing/LandingPreview.vue'
import LandingMetrics    from '@/components/landing/LandingMetrics.vue'
import LandingTestimonials from '@/components/landing/LandingTestimonials.vue'
import LandingFinalCTA   from '@/components/landing/LandingFinalCTA.vue'
const { t } = useI18n()
const authStore = useAuthStore()

onMounted(() => {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  )
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
})
</script>

<style scoped>
/* flex: 1 alone = flex-basis 0%, which can cap <main> to the viewport and clip sections below the hero */
.landing {
  min-height: var(--app-min-height);
  display: flex;
  flex-direction: column;
  width: 100%;
}
.landing--public :deep(.hero) {
  min-height: calc(98vh + 10px) !important;
}
main {
  flex: 1 0 auto;
  min-height: min-content;
}

.reveal {
  opacity: 0;
  transform: translateY(26px);
  transition: opacity 620ms var(--ease-smooth), transform 620ms var(--ease-smooth);
}
.reveal.visible {
  opacity: 1;
  transform: none;
}
.reveal-1 { transition-delay: 80ms; }
.reveal-2 { transition-delay: 150ms; }
.reveal-3 { transition-delay: 220ms; }
.reveal-4 { transition-delay: 300ms; }

.quiz-float {
  position: fixed; bottom: 32px; left: 32px; z-index: 60;
  display: flex; align-items: center; gap: 8px;
  padding: 12px 22px; border-radius: 100px;
  background: var(--bg-surface); color: var(--text-primary);
  font-size: 14px; font-weight: 500; text-decoration: none;
  border: 1.5px solid var(--border-default);
  box-shadow: var(--shadow-md);
  transition: all var(--duration-normal) var(--ease-smooth);
  animation: fadeInUp 0.8s var(--ease-smooth) 1.2s both;
}
.quiz-float:hover { background: var(--sky-50); border-color: var(--sky-300); transform: translateY(-2px); box-shadow: var(--shadow-lg); }
.quiz-float__icon { color: var(--sky-500); font-size: 16px; }

@media (max-width: 640px) {
  .quiz-float { bottom: 20px; left: 20px; right: 20px; justify-content: center; }
}
@media (max-width: 768px) {
  .landing--public :deep(.hero) {
    min-height: calc(90vh + 10px) !important;
  }
  .quiz-float--auth-mobile {
    bottom: calc(var(--bottom-bar-height) + 12px + env(safe-area-inset-bottom, 0px));
  }
}

</style>
