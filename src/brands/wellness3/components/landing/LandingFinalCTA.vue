<template>
  <section class="final-cta section">
    <div class="container">
      <div class="cta-card">
        <div class="cta-card__glow" />
        <div class="cta-card__photos">
          <span
            v-for="(photo, idx) in ctaPhotos"
            :key="idx"
            class="cta-card__photo"
            :style="{ backgroundImage: `url(${photo})` }"
          />
        </div>
        <span class="section-label" style="color: var(--violet)">Begin Today</span>
        <h2 class="cta-card__title">
          {{ t('finalCta.title_1') }}<br />
          <span class="grad-text">{{ t('finalCta.title_em') }}</span>
        </h2>
        <p class="cta-card__body">{{ t('finalCta.body') }}</p>
        <RouterLink to="/signup" class="cta-btn">{{ t('finalCta.btn') }}</RouterLink>
        <p class="cta-card__note">{{ t('finalCta.note') }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { LANDING_IMAGES } from '@/constants/landingImages'

const { t } = useI18n()
const { ctaBg1, ctaBg2, ctaBg3 } = LANDING_IMAGES
const ctaPhotos = [ctaBg1, ctaBg2, ctaBg3]
</script>

<style scoped>
.final-cta {
  background: transparent;
  text-align: center;
}

.cta-card {
  position: relative;
  background: linear-gradient(135deg, rgba(167, 139, 250, 0.12), rgba(45, 212, 191, 0.08));
  border: 1px solid rgba(167, 139, 250, 0.2);
  border-radius: var(--radius-xl);
  padding: clamp(40px, 6vw, 56px) clamp(28px, 6vw, 48px);
  backdrop-filter: blur(20px);
  max-width: 640px;
  margin: 0 auto;
}
.cta-card__photos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}
.cta-card__photo {
  height: 86px;
  border-radius: 12px;
  background-size: cover;
  background-position: center;
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.cta-card__glow {
  position: absolute;
  inset: 0;
  border-radius: var(--radius-xl);
  background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(167, 139, 250, 0.1), transparent);
  pointer-events: none;
}

.grad-text {
  background: linear-gradient(135deg, var(--violet), var(--teal));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.cta-card__title {
  font-family: var(--font-d);
  font-size: clamp(24px, 3.5vw, 40px);
  font-weight: 400;
  color: var(--text-primary);
  letter-spacing: 0.5px;
  line-height: 1.15;
  margin-bottom: 14px;
}

.cta-card__body {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.75;
  margin-bottom: 32px;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 40px;
  border-radius: var(--r-full);
  background: linear-gradient(135deg, var(--violet), var(--teal));
  color: #070d1a;
  font-family: var(--font-b);
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 0 20px rgba(167, 139, 250, 0.3);
  transition: all 200ms var(--ease-smooth);
  margin-bottom: 14px;
}
.cta-btn:hover {
  background: linear-gradient(135deg, #b8a5fc, #4de8d8);
  box-shadow: 0 0 40px rgba(167, 139, 250, 0.5), 0 0 60px rgba(45, 212, 191, 0.2);
  transform: translateY(-2px) scale(1.02);
}

.cta-card__note {
  font-size: 12px;
  color: var(--faint);
}

@media (max-width: 640px) {
  .cta-btn { width: 100%; }
}
</style>
