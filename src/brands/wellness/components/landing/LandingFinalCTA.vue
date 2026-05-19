<template>
  <section class="final-cta">
    <div class="final-cta__photo final-cta__photo--left" :style="{ backgroundImage: `url(${ctaBg1})` }" />
    <div class="final-cta__photo final-cta__photo--right" :style="{ backgroundImage: `url(${ctaBg2})` }" />
    <div class="final-cta__photo final-cta__photo--bottom" :style="{ backgroundImage: `url(${ctaBg3})` }" />
    <div class="final-cta__blob final-cta__blob--1" />
    <div class="final-cta__blob final-cta__blob--2" />
    <div class="container" style="position:relative;z-index:1;text-align:center">
      <h2 class="section-title">{{ t('finalCta.title_1') }} <em>{{ t('finalCta.title_em') }}</em></h2>
      <p class="final-cta__body">{{ t('finalCta.body') }}</p>
      <RouterLink to="/signup" class="final-cta__btn">{{ t('finalCta.btn') }}</RouterLink>
      <p class="final-cta__note">{{ t('finalCta.note') }}</p>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { LANDING_IMAGES } from '@/constants/landingImages'
const { t } = useI18n()
const { ctaBg1, ctaBg2, ctaBg3 } = LANDING_IMAGES
</script>

<style scoped>
.final-cta {
  padding: 120px 0;
  background: var(--bg-surface);
  text-align: center;
  position: relative; overflow: hidden;
}
.final-cta__photo {
  position: absolute;
  border-radius: var(--radius-lg);
  border: 1px solid rgba(14,165,233,0.18);
  box-shadow: var(--shadow-md);
  background-size: cover;
  background-position: center;
  pointer-events: none;
  opacity: 0.95;
}
.final-cta__photo--left {
  width: 250px;
  height: 160px;
  left: 40px;
  top: 80px;
  transform: rotate(-6deg);
}
.final-cta__photo--right {
  width: 260px;
  height: 170px;
  right: 36px;
  top: 74px;
  transform: rotate(5deg);
}
.final-cta__photo--bottom {
  width: 320px;
  height: 130px;
  right: 12%;
  bottom: 22px;
}
.final-cta__blob {
  position: absolute; border-radius: 50%; pointer-events: none;
}
.final-cta__blob--1 {
  top: -30%; left: -10%; width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(186,230,253,0.3) 0%, transparent 65%);
  animation: float-slow 18s ease-in-out infinite;
}
.final-cta__blob--2 {
  bottom: -30%; right: -10%; width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(167,196,160,0.2) 0%, transparent 65%);
  animation: float-slow 22s ease-in-out infinite reverse;
}
.section-title { margin-bottom: 20px; }
.final-cta__body { font-size: 18px; color: var(--text-secondary); max-width: 520px; margin: 0 auto 40px; line-height: 1.7; }
.final-cta__btn {
  display: inline-flex; align-items: center; padding: 18px 48px;
  border-radius: 100px;
  background: linear-gradient(135deg, var(--sky-500), var(--sky-600));
  color: white; font-family: var(--font-body); font-size: 18px; font-weight: 500;
  text-decoration: none; box-shadow: 0 6px 24px rgba(14,165,233,0.35);
  transition: all var(--duration-normal) var(--ease-smooth);
  margin-bottom: 20px;
}
.final-cta__btn:hover { transform: translateY(-3px); box-shadow: 0 10px 32px rgba(14,165,233,0.45); }
.final-cta__note { font-size: 13px; color: var(--text-muted); }

@media (max-width: 980px) {
  .final-cta__photo { display: none; }
}
</style>
