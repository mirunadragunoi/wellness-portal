<template>
  <section class="testimonials section">
    <div class="container">
      <div class="testimonials__header">
        <span class="section-label">{{ t('testimonials.label') }}</span>
        <h2 class="section-title">{{ t('testimonials.title_1') }} <em>{{ t('testimonials.title_em') }}</em></h2>
      </div>
      <div class="testimonials__grid">
        <div v-for="t_ in items" :key="t_.nameKey" class="testimonial">
          <div class="testimonial__media" :style="{ backgroundImage: `linear-gradient(180deg, rgba(15,23,42,0.1), rgba(15,23,42,0.35)), url(${t_.image})` }" />
          <div class="testimonial__stars" aria-hidden="true">
            <Icon v-for="n in 5" :key="n" icon="mdi:star" class="testimonial__star app-icon app-icon--sm" />
          </div>
          <p class="testimonial__text">"{{ t(t_.textKey) }}"</p>
          <div class="testimonial__author">
            <div class="testimonial__avatar" :style="{ backgroundImage: `url(${t_.image})` }" />
            <div>
              <div class="testimonial__name">{{ t(t_.nameKey) }}</div>
              <div class="testimonial__role">{{ t(t_.roleKey) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { LANDING_IMAGES } from '@/constants/landingImages'
const { t } = useI18n()
const items = [
  { textKey: 'testimonials.t1_text', nameKey: 'testimonials.t1_name', roleKey: 'testimonials.t1_role', image: LANDING_IMAGES.testimonial1 },
  { textKey: 'testimonials.t2_text', nameKey: 'testimonials.t2_name', roleKey: 'testimonials.t2_role', image: LANDING_IMAGES.testimonial2 },
  { textKey: 'testimonials.t3_text', nameKey: 'testimonials.t3_name', roleKey: 'testimonials.t3_role', image: LANDING_IMAGES.testimonial3 }
]
</script>

<style scoped>
.testimonials { background: var(--bg-base); }
.testimonials__header { text-align: center; margin-bottom: 48px; }
.testimonials__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }

.testimonial {
  padding: 0 32px 28px;
  background: var(--bg-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-subtle);
  display: flex; flex-direction: column; gap: 16px;
  transition: all var(--duration-normal) var(--ease-smooth);
}
.testimonial:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); border-color: var(--sky-200); }
.testimonial__media {
  margin: 0 -32px 16px;
  height: 132px;
  background-size: cover;
  background-position: center;
}

.testimonial__stars {
  display: flex; gap: 3px; color: var(--accent);
}
.testimonial__star { width: 16px; height: 16px; }
.testimonial__text {
  font-family: var(--font-display); font-size: 18px; font-weight: 400;
  color: var(--text-primary); line-height: 1.65; font-style: italic; flex: 1;
}
.testimonial__author { display: flex; align-items: center; gap: 12px; margin-top: auto; }
.testimonial__avatar {
  width: 44px; height: 44px; border-radius: 50%;
  background-size: cover;
  background-position: center;
  border: 2px solid var(--sky-200);
  flex-shrink: 0;
}
.testimonial__name { font-weight: 600; font-size: 15px; color: var(--text-primary); }
.testimonial__role { font-size: 13px; color: var(--text-muted); }

@media (max-width: 768px) { .testimonials__grid { grid-template-columns: 1fr; } }
</style>
