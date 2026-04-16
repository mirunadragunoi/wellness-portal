<template>
  <section class="preview section">
    <div class="container">
      <div class="preview__header">
        <span class="section-label">{{ t('preview.label') }}</span>
        <h2 class="section-title">{{ t('preview.title_1') }} <em>{{ t('preview.title_em') }}</em></h2>
        <p class="section-subtitle">{{ t('preview.subtitle') }}</p>
      </div>

      <!-- Masonry-style preview grid -->
      <div class="preview__mosaic">
        <div class="preview__tile preview__tile--tall"  :style="{ backgroundImage:`url(${LANDING_IMAGES.preview1})` }">
          <div class="tile__label">Guided Meditation</div>
        </div>
        <div class="preview__tile preview__tile--short" :style="{ backgroundImage:`url(${LANDING_IMAGES.preview2})` }">
          <div class="tile__label">Breathing</div>
        </div>
        <div class="preview__tile preview__tile--short" :style="{ backgroundImage:`url(${LANDING_IMAGES.preview3})` }">
          <div class="tile__label">Sleep Stories</div>
        </div>
        <div class="preview__tile preview__tile--tall"  :style="{ backgroundImage:`url(${LANDING_IMAGES.preview4})` }">
          <div class="tile__label">Personal Tracking</div>
        </div>
      </div>

      <div class="preview__cta">
        <RouterLink to="/explore" class="preview__link">
          Explore all sessions
          <Icon icon="lucide:arrow-right" class="app-icon app-icon--sm" />
        </RouterLink>
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
.preview { background:var(--parchment); }
.preview__header { margin-bottom:40px; }

.preview__mosaic {
  display:grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-auto-rows: 230px;
  gap: 14px;
}
.preview__tile {
  background-size:cover; background-position:center;
  border-radius:var(--radius-lg);
  border:2px solid var(--ink-100);
  position:relative; overflow:hidden;
  cursor:pointer;
  transition:transform var(--duration-normal), box-shadow var(--duration-normal);
}
.preview__tile:hover { transform:translate(-2px,-3px); box-shadow:6px 6px 0 var(--ink-200); }
.preview__tile--tall  { grid-row: auto; }

.tile__label {
  position:absolute; bottom:0; left:0; right:0;
  background:linear-gradient(to top, rgba(28,26,22,0.7), transparent);
  padding:24px 16px 14px;
  font-family:var(--font-display); font-size:18px; font-style:italic;
  color:white; font-weight:300;
}

.preview__cta { margin-top:28px; display:flex; justify-content:flex-end; }
.preview__link {
  display:inline-flex; align-items:center; gap:6px;
  font-size:15px; font-weight:600; color:var(--ink-800);
  text-decoration:none;
  border-bottom:2px solid var(--sage-400); padding-bottom:2px;
  transition:color var(--duration-fast), border-color var(--duration-fast);
}
.preview__link:hover { color:var(--sage-600); border-color:var(--sage-600); }

@media (max-width:1024px) {
  .preview__mosaic {
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 220px;
  }
}

@media (max-width:640px) {
  .preview__mosaic { grid-template-columns:1fr; grid-template-rows:auto; }
  .preview__tile { height:190px; }
  .preview__tile--tall { grid-row:span 1; height:190px; }
  .preview__tile--short { height:190px; }
}
</style>
