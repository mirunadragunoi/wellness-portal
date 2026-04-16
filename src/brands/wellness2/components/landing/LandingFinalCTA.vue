<template>
  <section class="cta-section">
    <div class="cta-section__photos">
      <div class="cta-photo cta-photo--a" :style="{ backgroundImage:`url(${ctaBg1})` }" />
      <div class="cta-photo cta-photo--b" :style="{ backgroundImage:`url(${ctaBg2})` }" />
    </div>
    <div class="cta-section__content">
      <span class="section-label">{{ t('finalCta.label') }}</span>
      <h2 class="cta-title">{{ t('finalCta.title_1') }}<br/><em>{{ t('finalCta.title_em') }}</em></h2>
      <p class="cta-body">{{ t('finalCta.body') }}</p>
      <div class="cta-actions">
        <RouterLink to="/signup" class="cta-btn">
          {{ t('finalCta.btn') }}
          <Icon icon="lucide:arrow-right" class="app-icon app-icon--md" />
        </RouterLink>
        <span class="cta-note">{{ t('finalCta.note') }}</span>
      </div>
    </div>
    <div class="cta-section__photo-c" :style="{ backgroundImage:`url(${ctaBg3})` }" />
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { LANDING_IMAGES } from '@/constants/landingImages'
const { t } = useI18n()
const { ctaBg1, ctaBg2, ctaBg3 } = LANDING_IMAGES
</script>

<style scoped>
.cta-section {
  display:grid;
  grid-template-columns:200px 1fr 200px;
  min-height:480px;
  border-top:2px solid var(--ink-200);
  border-bottom:2px solid var(--ink-200);
}

.cta-section__photos { display:flex; flex-direction:column; gap:0; overflow:hidden; }
.cta-photo { flex:1; background-size:cover; background-position:center; }

.cta-section__content {
  background:var(--parchment);
  display:flex; flex-direction:column; align-items:flex-start; justify-content:center;
  padding:clamp(40px,6vw,80px) clamp(32px,5vw,64px);
  border-left:2px solid var(--ink-200);
  border-right:2px solid var(--ink-200);
}

.cta-title {
  font-family:var(--font-display);
  font-size:clamp(38px,5vw,62px); font-weight:300;
  line-height:1.05; letter-spacing:-1px;
  color:var(--ink-900); margin-bottom:20px;
}
.cta-title em { font-style:italic; color:var(--sage-600); }

.cta-body { font-size:17px; color:var(--text-secondary); line-height:1.75; margin-bottom:36px; max-width:440px; }

.cta-actions { display:flex; align-items:center; gap:20px; flex-wrap:wrap; }
.cta-btn {
  display:inline-flex; align-items:center; gap:10px;
  padding:15px 36px; font-size:16px; font-weight:700;
  background:var(--sage-500); color:white;
  border:2px solid var(--sage-600);
  border-radius:var(--radius-sm); text-decoration:none;
  box-shadow:4px 4px 0 var(--sage-700);
  transition:all var(--duration-fast);
}
.cta-btn:hover { background:var(--sage-600); box-shadow:2px 2px 0 var(--sage-700); transform:translate(1px,1px); }

.cta-note { font-size:13px; color:var(--text-muted); }

.cta-section__photo-c { background-size:cover; background-position:center; overflow:hidden; }

@media (max-width:900px) {
  .cta-section { grid-template-columns:1fr; }
  .cta-section__photos { flex-direction:row; height:200px; }
  .cta-section__photo-c { display:none; }
  .cta-section__content { border-left:none; border-right:none; border-top:2px solid var(--ink-200); }
}
</style>
