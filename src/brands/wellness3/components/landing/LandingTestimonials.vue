<template>
  <section class="testimonials section">
    <div class="container">
      <div class="testimonials__header">
        <span class="section-label">{{ t('testimonials.label') }}</span>
        <h2 class="section-title">
          {{ t('testimonials.title_1') }}
          <span class="grad-text">{{ t('testimonials.title_em') }}</span>
        </h2>
      </div>
      <div class="testimonials__grid">
        <div v-for="item in items" :key="item.nameKey" class="testimonial">
          <div class="testimonial__stars" aria-hidden="true">
            <Icon v-for="n in 5" :key="n" icon="mdi:star" class="testimonial__star app-icon app-icon--sm" />
          </div>
          <p class="testimonial__text">"{{ t(item.textKey) }}"</p>
          <div class="testimonial__author">
            <div class="testimonial__avatar">
              <img :src="item.avatar" alt="" />
            </div>
            <div>
              <div class="testimonial__name">{{ t(item.nameKey) }}</div>
              <div class="testimonial__role">{{ t(item.roleKey) }}</div>
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
const { testimonial1, testimonial2, testimonial3 } = LANDING_IMAGES

const items = [
  { textKey: 'testimonials.t1_text', nameKey: 'testimonials.t1_name', roleKey: 'testimonials.t1_role', avatar: testimonial1 },
  { textKey: 'testimonials.t2_text', nameKey: 'testimonials.t2_name', roleKey: 'testimonials.t2_role', avatar: testimonial2 },
  { textKey: 'testimonials.t3_text', nameKey: 'testimonials.t3_name', roleKey: 'testimonials.t3_role', avatar: testimonial3 },
]
</script>

<style scoped>
.testimonials {
  background: transparent;
}

.testimonials__header {
  text-align: center;
  margin-bottom: 48px;
}

.grad-text {
  background: linear-gradient(135deg, var(--rose), var(--violet));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.testimonials__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.testimonial {
  padding: 24px;
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: all var(--duration-normal) var(--ease-smooth);
}
.testimonial:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.09);
  border-color: rgba(167, 139, 250, 0.25);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
}

.testimonial__stars {
  display: flex;
  gap: 2px;
}
.testimonial__star { color: var(--amber); }

.testimonial__text {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
  font-style: italic;
  flex: 1;
}

.testimonial__author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.testimonial__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 0 16px rgba(167, 139, 250, 0.25);
  overflow: hidden;
}
.testimonial__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.testimonial__name {
  font-family: var(--font-d);
  font-size: 14px;
  font-weight: 400;
  color: var(--text-primary);
}
.testimonial__role {
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 2px;
}

@media (max-width: 768px) {
  .testimonials__grid {
    grid-template-columns: 1fr;
  }
}
</style>
