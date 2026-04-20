<template>
  <section class="hero">
    <!-- LEFT PANEL: typography -->
    <div class="hero__left">
      <div class="hero__left-inner">
        <span class="hero__eyebrow">
          <span class="hero__eyebrow-dot" />
          {{ t('hero.badge') }}
        </span>

        <h1 class="hero__title">
          {{ t('hero.title_line1') }}<br/>
          <em>{{ t('hero.title_em') }}</em><br/>
          {{ t('hero.title_line2') }}
        </h1>

        <p class="hero__subtitle">{{ t('hero.subtitle') }}</p>

        <div class="hero__actions">
          <RouterLink to="/signup" class="hero__btn-primary">
            {{ t('hero.cta_primary') }}
            <Icon icon="lucide:arrow-right" class="app-icon app-icon--sm" />
          </RouterLink>
          <RouterLink to="/explore" class="hero__btn-ghost">
            {{ t('hero.cta_secondary') }}
          </RouterLink>
        </div>

        <!-- Social proof row -->
        <div class="hero__proof">
          <div class="hero__proof-avatars">
            <span v-for="(av, i) in proofAvatars" :key="i" class="hero__proof-av">
              <img :src="av" alt="" />
            </span>
          </div>
          <p class="hero__proof-text"><strong>12,000+</strong> people finding calm</p>
        </div>
      </div>

      <!-- Floating stat cards — inside left panel -->
      <div class="hero__stat hero__stat--a">
        <Icon icon="lucide:flame" class="app-icon app-icon--sm hero__stat-icon" />
        <div>
          <div class="hero__stat-val">21 days</div>
          <div class="hero__stat-lbl">Current streak</div>
        </div>
      </div>
      <div class="hero__stat hero__stat--b">
        <Icon icon="lucide:smile" class="app-icon app-icon--sm hero__stat-icon" />
        <div>
          <div class="hero__stat-val">Bright</div>
          <div class="hero__stat-lbl">Mood today</div>
        </div>
      </div>
    </div>

    <!-- RIGHT PANEL: full-bleed photo -->
    <div class="hero__right" :style="{ backgroundImage: `url(${heroPanelImage})` }">
      <div class="hero__right-overlay" />
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { LANDING_IMAGES } from '@/constants/landingImages'
import heroPanelImage from '@/assets/landing/hero-main-wellness2-forest.png'
const { t } = useI18n()
const { heroMain, heroProof1, heroProof2 } = LANDING_IMAGES
const proofAvatars = [heroProof1, heroProof2, heroMain, heroProof1]
</script>

<style scoped>
/* ── Two-panel split layout ── */
.hero {
  display:grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
}

/* ── Left: parchment editorial ── */
.hero__left {
  background:var(--parchment);
  display:flex; flex-direction:column; justify-content:flex-start;
  padding:clamp(48px,8vh,88px) clamp(28px,5vw,72px);
  position:relative;
  border-right:2px solid var(--ink-200);
}
.hero__left-inner { max-width:520px; }

.hero__eyebrow {
  display:inline-flex; align-items:center; gap:8px;
  font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:3px;
  color:var(--sage-600); margin-bottom:28px;
}
.hero__eyebrow-dot {
  width:7px; height:7px; border-radius:50%;
  background:var(--sage-400); animation:pulse-dot 2.5s ease infinite;
}

.hero__title {
  font-family:var(--font-display);
  font-size:clamp(44px,5.5vw,72px); font-weight:300;
  line-height:1.05; letter-spacing:-1.5px;
  color:var(--ink-900); margin-bottom:24px;
}
.hero__title em { font-style:italic; color:var(--sage-600); }

.hero__subtitle {
  font-size:17px; line-height:1.75;
  color:var(--text-secondary); margin-bottom:40px;
  max-width:400px;
}

.hero__actions { display:flex; align-items:center; gap:16px; flex-wrap:wrap; margin-bottom:36px; }

.hero__btn-primary {
  display:inline-flex; align-items:center; gap:8px;
  padding:14px 32px; font-size:16px; font-weight:600;
  background:var(--ink-900); color:var(--parchment);
  border:2px solid var(--ink-900); border-radius:var(--radius-sm);
  text-decoration:none;
  transition:all var(--duration-fast);
  box-shadow:4px 4px 0 var(--sage-300);
}
.hero__btn-primary:hover { background:var(--sage-600); border-color:var(--sage-600); box-shadow:4px 4px 0 var(--sage-200); transform:translate(-1px,-1px); }

.hero__btn-ghost {
  font-size:15px; font-weight:500; color:var(--text-secondary);
  text-decoration:none; padding:4px 0;
  border-bottom:2px solid var(--ink-300);
  transition:color var(--duration-fast), border-color var(--duration-fast);
}
.hero__btn-ghost:hover { color:var(--ink-900); border-color:var(--ink-800); }

/* Proof */
.hero__proof { display:flex; align-items:center; gap:12px; }
.hero__proof-avatars { display:flex; }
.hero__proof-av {
  width:28px; height:28px; border-radius:50%;
  border:2px solid var(--parchment); overflow:hidden; margin-left:-7px;
}
.hero__proof-av:first-child { margin-left:0; }
.hero__proof-av img { width:100%; height:100%; object-fit:cover; }
.hero__proof-text { font-size:13px; color:var(--text-secondary); }
.hero__proof-text strong { color:var(--ink-900); }

/* Stat cards */
.hero__stat {
  position:absolute;
  display:flex; align-items:center; gap:10px;
  background:white; border:2px solid var(--ink-200); border-radius:var(--radius);
  padding:12px 16px;
  box-shadow:3px 3px 0 var(--ink-200);
}
.hero__stat-icon { color:var(--sage-500); flex-shrink:0; }
.hero__stat-val  { font-size:14px; font-weight:700; color:var(--ink-900); line-height:1.2; }
.hero__stat-lbl  { font-size:11px; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px; }
.hero__stat--a { bottom:clamp(32px,6%,60px); right:clamp(16px,4%,40px); animation:float-slow 7s ease-in-out infinite; }
.hero__stat--b { top:clamp(32px,6%,60px);    right:clamp(16px,4%,40px); animation:float-slow 9s ease-in-out infinite 2s; }

/* ── Right: photo panel ── */
.hero__right {
  position:relative; background-size:cover; background-position:center;
  min-height:520px;
}
.hero__right-overlay {
  position:absolute; inset:0;
  background:linear-gradient(160deg, rgba(28,26,22,0.2) 0%, rgba(28,26,22,0.08) 100%);
}

/* Mobile */
@media (max-width:900px) {
  .hero { grid-template-columns:1fr; }
  .hero__left { padding:clamp(32px,6vw,56px); border-right:none; border-bottom:2px solid var(--ink-200); }
  .hero__left-inner { max-width:100%; }
  .hero__right { min-height:320px; }
  .hero__stat--a, .hero__stat--b { display:none; }
}
@media (max-width:600px) {
  .hero__title { font-size:clamp(38px,10vw,52px); }
  .hero__actions { flex-direction:column; align-items:stretch; }
  .hero__btn-primary { justify-content:center; }
}

@keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.4;transform:scale(0.75);} }
@keyframes float-slow { 0%,100%{transform:translate(0,0);} 33%{transform:translate(6px,-10px);} 66%{transform:translate(-4px,6px);} }
</style>
