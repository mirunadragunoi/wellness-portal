<template>
  <section class="testimonials section">
    <div class="container">
      <div class="testimonials__header">
        <span class="section-label">{{ t('testimonials.label') }}</span>
        <h2 class="section-title">{{ t('testimonials.title_1') }} <em>{{ t('testimonials.title_em') }}</em></h2>
      </div>
      <!-- Staggered quote cards — different from original uniform grid -->
      <div class="testimonials__grid">
        <div v-for="(item, i) in items" :key="item.nameKey" class="quote-card" :class="`quote-card--${i}`">
          <div class="quote-card__mark">"</div>
          <p class="quote-card__text">{{ t(item.textKey) }}</p>
          <div class="quote-card__footer">
            <div class="quote-card__avatar" :style="{ backgroundImage:`url(${item.image})` }" />
            <div class="quote-card__meta">
              <span class="quote-card__name">{{ t(item.nameKey) }}</span>
              <span class="quote-card__role">{{ t(item.roleKey) }}</span>
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
  { textKey:'testimonials.t1_text', nameKey:'testimonials.t1_name', roleKey:'testimonials.t1_role', image:LANDING_IMAGES.testimonial1 },
  { textKey:'testimonials.t2_text', nameKey:'testimonials.t2_name', roleKey:'testimonials.t2_role', image:LANDING_IMAGES.testimonial2 },
  { textKey:'testimonials.t3_text', nameKey:'testimonials.t3_name', roleKey:'testimonials.t3_role', image:LANDING_IMAGES.testimonial3 },
]
</script>

<style scoped>
.testimonials { background:var(--parchment); }
.testimonials__header { margin-bottom:52px; }

.testimonials__grid {
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:24px;
  align-items:start;
}

.quote-card {
  background:var(--bg-surface);
  border:2px solid var(--ink-100);
  border-radius:var(--radius-lg);
  padding:32px 28px 24px;
  position:relative;
  transition:transform var(--duration-normal), box-shadow var(--duration-normal);
}
/* Stagger — every third card is taller/shifted */
.quote-card--1 { margin-top:32px; }
.quote-card:hover { transform:translate(-3px,-4px); box-shadow:6px 6px 0 var(--sage-200); }

.quote-card__mark {
  font-family:var(--font-display); font-size:72px; line-height:0.6;
  color:var(--sage-200); margin-bottom:20px; display:block;
}
.quote-card__text {
  font-family:var(--font-display); font-size:17px; font-style:italic;
  color:var(--text-primary); line-height:1.7; margin-bottom:24px;
}
.quote-card__footer { display:flex; align-items:center; gap:12px; }
.quote-card__avatar {
  width:40px; height:40px; border-radius:50%;
  background-size:cover; background-position:center;
  border:2px solid var(--ink-100); flex-shrink:0;
}
.quote-card__name { display:block; font-size:14px; font-weight:600; color:var(--ink-900); }
.quote-card__role { font-size:12px; color:var(--text-muted); }

@media (max-width:768px) {
  .testimonials__grid { grid-template-columns:1fr; }
  .quote-card--1 { margin-top:0; }
}
</style>
