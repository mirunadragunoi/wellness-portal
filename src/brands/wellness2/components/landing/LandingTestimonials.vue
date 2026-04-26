<template>
  <section class="testi-section">
    <div class="testi-inner">
      <span class="section-label reveal">{{ t('testimonials.label') }}</span>
      <h2 class="section-title reveal reveal-1">
        {{ t('testimonials.title_1') }} <span class="lime">{{ t('testimonials.title_em') }}</span>
      </h2>

      <div class="testi-layout">
        <!-- Featured large testimonial -->
        <div class="testi-featured reveal">
          <div>
            <div class="testi-big-quote">"</div>
            <p class="testi-big-text">{{ t('testimonials.t1_text') }}</p>
          </div>
          <div class="testi-author">
            <div class="testi-av" :style="{ backgroundImage: `url(${LANDING_IMAGES.testimonial1})` }" />
            <div>
              <div class="testi-stars">★★★★★</div>
              <div class="testi-name">{{ t('testimonials.t1_name') }}</div>
              <div class="testi-role">{{ t('testimonials.t1_role') }}</div>
            </div>
          </div>
        </div>

        <!-- 2 small stacked -->
        <div class="testi-stack">
          <div class="testi-small-card reveal reveal-1">
            <div class="testi-stars">★★★★★</div>
            <p class="testi-small-text">{{ t('testimonials.t2_text') }}</p>
            <div class="testi-author">
              <div class="testi-av" :style="{ backgroundImage: `url(${LANDING_IMAGES.testimonial2})` }" />
              <div>
                <div class="testi-name">{{ t('testimonials.t2_name') }}</div>
                <div class="testi-role">{{ t('testimonials.t2_role') }}</div>
              </div>
            </div>
          </div>
          <div class="testi-small-card reveal reveal-2">
            <div class="testi-stars">★★★★★</div>
            <p class="testi-small-text">{{ t('testimonials.t3_text') }}</p>
            <div class="testi-author">
              <div class="testi-av" :style="{ backgroundImage: `url(${LANDING_IMAGES.testimonial3})` }" />
              <div>
                <div class="testi-name">{{ t('testimonials.t3_name') }}</div>
                <div class="testi-role">{{ t('testimonials.t3_role') }}</div>
              </div>
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
</script>

<style scoped>
.testi-section { background: var(--forest-900); padding: 100px 0; }
.testi-inner { max-width: var(--container-max); margin: 0 auto; padding: 0 var(--container-pad); }

.section-label {
  font-size: 11px; font-weight: 600; text-transform: uppercase;
  letter-spacing: 3px; color: var(--lime-500); display: block; margin-bottom: 12px;
}
.section-title {
  font-family: var(--font-display); font-size: clamp(36px,4vw,56px);
  font-weight: 800; letter-spacing: -2px; color: var(--text-primary); margin-bottom: 56px;
}
.lime { color: var(--lime-500); }

.testi-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

/* Featured */
.testi-featured {
  padding: 48px; background: var(--bg-glass); backdrop-filter: blur(20px);
  border: var(--border-glass); border-radius: 24px; box-shadow: var(--glow-card);
  grid-row: span 2; display: flex; flex-direction: column; justify-content: space-between;
}
.testi-big-quote {
  font-family: var(--font-display); font-size: clamp(40px,5vw,64px);
  color: var(--lime-500); line-height: 0.8; margin-bottom: 20px;
}
.testi-big-text {
  font-size: clamp(17px,2vw,21px); color: var(--text-primary); line-height: 1.65; margin-bottom: 32px;
}

/* Small cards */
.testi-stack { display: flex; flex-direction: column; gap: 16px; }
.testi-small-card {
  padding: 28px; background: rgba(13,31,18,0.5); backdrop-filter: blur(12px);
  border: var(--border-glass); border-radius: 20px; box-shadow: var(--glow-card);
}
.testi-small-text { font-size: 14px; color: var(--text-secondary); line-height: 1.65; margin-bottom: 20px; }

/* Author row */
.testi-author { display: flex; align-items: center; gap: 10px; }
.testi-av {
  width: 38px; height: 38px; border-radius: 50%; overflow: hidden;
  background: var(--forest-600); border: 2px solid rgba(184,245,102,0.15); flex-shrink: 0;
  background-size: cover; background-position: center;
}
.testi-name { font-family: var(--font-display); font-size: 14px; font-weight: 700; color: var(--text-primary); }
.testi-role { font-size: 12px; color: var(--text-muted); }
.testi-stars { color: var(--amber-400); font-size: 12px; letter-spacing: 1px; margin-bottom: 4px; }

@media (max-width: 1024px) {
  .testi-layout { grid-template-columns: 1fr; }
  .testi-featured { grid-row: span 1; }
}
</style>
