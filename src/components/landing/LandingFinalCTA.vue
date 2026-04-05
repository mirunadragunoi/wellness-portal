<template>
  <section class="final-cta">
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
const { t } = useI18n()
</script>

<style scoped>
.final-cta {
  padding: 120px 0;
  background: var(--bg-surface);
  text-align: center;
  position: relative; overflow: hidden;
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
</style>
