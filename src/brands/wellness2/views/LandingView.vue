<template>
  <div class="landing">
    <AppNavbarPublic v-if="!authStore.isLoggedIn" />

    <main>
      <LandingHero />

      <!-- Marquee strip -->
      <div class="marquee-strip">
        <div class="marquee-inner">
          <span v-for="(item, i) in marqueeItems.concat(marqueeItems)" :key="i" class="marquee-item">
            {{ item }}
          </span>
        </div>
      </div>

      <LandingMetrics />
      <LandingFeatures />
      <LandingPreview />
      <LandingHowItWorks />
      <LandingTestimonials />
      <LandingFinalCTA />
    </main>

    <RouterLink
      :to="quizTarget"
      class="quiz-float"
      :class="{ 'quiz-float--auth-mobile': authStore.isLoggedIn }"
      :style="{ translate: `0 -${floatLift}px` }"
    >
      <Icon icon="lucide:sparkles" class="app-icon app-icon--sm" />
      {{ t('quizFloat') }}
    </RouterLink>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
import AppNavbarPublic   from '@/components/layout/AppNavbarPublic.vue'
import LandingHero       from '@/components/landing/LandingHero.vue'
import LandingMetrics    from '@/components/landing/LandingMetrics.vue'
import LandingFeatures   from '@/components/landing/LandingFeatures.vue'
import LandingPreview    from '@/components/landing/LandingPreview.vue'
import LandingHowItWorks from '@/components/landing/LandingHowItWorks.vue'
import LandingTestimonials from '@/components/landing/LandingTestimonials.vue'
import LandingFinalCTA   from '@/components/landing/LandingFinalCTA.vue'

const { t } = useI18n()
const authStore = useAuthStore()
const quizTarget = computed(() => (authStore.isLoggedIn ? '/onboarding' : '/signup'))

const marqueeItems = ['Breathe', 'Meditate', 'Sleep Better', 'Find Calm', 'Reduce Stress', 'Increase Focus', 'Improve Mood']

// Lift the floating quiz button so it parks above the footer instead of
// overlapping it (which would block clicks on the footer links).
const floatLift = ref(0)
let floatRaf = null

function updateFloatPosition() {
  floatRaf = null
  const footer = document.querySelector('.footer')
  const float = document.querySelector('.quiz-float')
  if (!footer || !float) {
    floatLift.value = 0
    return
  }
  const bottomGap = parseFloat(getComputedStyle(float).bottom) || 28
  const floatBottomY = window.innerHeight - bottomGap
  const footerTop = footer.getBoundingClientRect().top
  const overlap = floatBottomY - footerTop + 16
  floatLift.value = overlap > 0 ? overlap : 0
}

function onScrollOrResize() {
  if (floatRaf == null) floatRaf = requestAnimationFrame(updateFloatPosition)
}

onMounted(() => {
  const io = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  )
  document.querySelectorAll('.reveal').forEach(el => io.observe(el))

  updateFloatPosition()
  window.addEventListener('scroll', onScrollOrResize, { passive: true })
  window.addEventListener('resize', onScrollOrResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScrollOrResize)
  window.removeEventListener('resize', onScrollOrResize)
  if (floatRaf != null) cancelAnimationFrame(floatRaf)
})
</script>

<style scoped>
.landing {
  min-height: var(--app-min-height);
  display: flex; flex-direction: column; width: 100%;
  background: var(--forest-900);
}
main { flex: 1 0 auto; min-height: min-content; }

/* ── Marquee ── */
.marquee-strip {
  background: var(--lime-500); overflow: hidden; padding: 14px 0;
  position: relative; z-index: 3;
}
.marquee-inner {
  display: flex; white-space: nowrap;
  animation: marquee 20s linear infinite;
}
.marquee-item {
  font-family: var(--font-display); font-size: 13px; font-weight: 700;
  color: var(--forest-900); text-transform: uppercase; letter-spacing: 2px;
  padding: 0 32px; display: inline-flex; align-items: center; gap: 16px;
}
.marquee-item::after { content: '✦'; font-size: 10px; }

/* ── Quiz float ── */
.quiz-float {
  position: fixed; bottom: 28px; left: 28px; z-index: 90;
  display: flex; align-items: center; gap: 8px;
  padding: 11px 20px; border-radius: 999px;
  background: rgba(13,31,18,0.9); backdrop-filter: blur(20px);
  border: 1px solid rgba(184,245,102,0.22); color: var(--lime-400);
  font-size: 13px; font-weight: 600;
  box-shadow: 0 4px 24px rgba(2,10,4,0.6); text-decoration: none;
  /* transform is excluded from the transition so the lift tracks scroll 1:1 */
  transition: background 250ms var(--ease-smooth),
              border-color 250ms var(--ease-smooth),
              box-shadow 250ms var(--ease-smooth);
  animation: fadeInUp 1s var(--ease-smooth) 2s both;
}
.quiz-float:hover { border-color: rgba(184,245,102,0.5); transform: translateY(-2px); }

@media (max-width: 640px) {
  .quiz-float { left: 16px; right: 16px; bottom: 16px; justify-content: center; }
}
@media (max-width: 768px) {
  .quiz-float--auth-mobile {
    bottom: calc(var(--bottom-bar-height) + 12px + env(safe-area-inset-bottom, 0px));
  }
}
</style>
