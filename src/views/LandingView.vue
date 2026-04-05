<template>
  <div class="landing">
    <AppNavbarPublic />

    <main>
      <LandingHero />
      <LandingFeatures />
      <LandingHowItWorks />
      <LandingPreview />
      <LandingMetrics />
      <LandingTestimonials />
      <LandingFinalCTA />
    </main>

    <AppFooter />

    <!-- Quiz float button -->
    <RouterLink to="/onboarding" class="quiz-float">
      <span class="quiz-float__icon">✦</span>
      {{ t('quizFloat') }}
    </RouterLink>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import AppNavbarPublic   from '@/components/layout/AppNavbarPublic.vue'
import AppFooter         from '@/components/layout/AppFooter.vue'
import LandingHero       from '@/components/landing/LandingHero.vue'
import LandingFeatures   from '@/components/landing/LandingFeatures.vue'
import LandingHowItWorks from '@/components/landing/LandingHowItWorks.vue'
import LandingPreview    from '@/components/landing/LandingPreview.vue'
import LandingMetrics    from '@/components/landing/LandingMetrics.vue'
import LandingTestimonials from '@/components/landing/LandingTestimonials.vue'
import LandingFinalCTA   from '@/components/landing/LandingFinalCTA.vue'
const { t } = useI18n()
</script>

<style scoped>
.landing { min-height: 100vh; display: flex; flex-direction: column; }
main { flex: 1; }

.quiz-float {
  position: fixed; bottom: 32px; left: 32px; z-index: 60;
  display: flex; align-items: center; gap: 8px;
  padding: 12px 22px; border-radius: 100px;
  background: var(--bg-surface); color: var(--text-primary);
  font-size: 14px; font-weight: 500; text-decoration: none;
  border: 1.5px solid var(--border-default);
  box-shadow: var(--shadow-md);
  transition: all var(--duration-normal) var(--ease-smooth);
}
.quiz-float:hover { background: var(--sky-50); border-color: var(--sky-300); transform: translateY(-2px); box-shadow: var(--shadow-lg); }
.quiz-float__icon { color: var(--sky-500); font-size: 16px; }

@media (max-width: 640px) {
  .quiz-float { bottom: 20px; left: 20px; right: 20px; justify-content: center; }
}
</style>
