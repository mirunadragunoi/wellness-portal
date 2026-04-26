<template>
  <section class="cta-section">
    <div class="cta-glow" />
    <div class="cta-inner">
      <div class="reveal">
        <h2 class="cta-title">
          {{ t('finalCta.title_1') }}<br>
          <span class="lime">{{ t('finalCta.title_em') }}</span>
        </h2>
        <p class="cta-body">{{ t('finalCta.body') }}</p>
        <RouterLink to="/signup" class="cta-btn">
          {{ t('finalCta.btn') }}
          <Icon icon="lucide:arrow-right" class="app-icon app-icon--sm" />
        </RouterLink>
        <div class="cta-note">{{ t('finalCta.note') }}</div>
      </div>

      <div class="cta-card reveal reveal-2">
        <div class="cta-card-title">✦ Create your account</div>
        <div class="cta-card-sub">Enter your phone and access code to begin your personalized journey.</div>
        <input class="cta-input" type="text" placeholder="+40 700 000 000" />
        <input class="cta-input" type="text" placeholder="Access code" />
        <RouterLink to="/signup" class="cta-submit">Start Your Journey →</RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<style scoped>
.cta-section {
  background: var(--forest-950);
  padding: 100px 0; position: relative; overflow: hidden;
}
.cta-glow {
  position: absolute; bottom: -200px; left: -200px;
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(184,245,102,0.07) 0%, transparent 70%);
  pointer-events: none;
}
.cta-inner {
  max-width: var(--container-max); margin: 0 auto;
  padding: 0 var(--container-pad);
  display: grid; grid-template-columns: 1fr 400px; gap: 80px; align-items: center;
}

.cta-title {
  font-family: var(--font-display);
  font-size: clamp(40px, 5vw, 68px); font-weight: 800;
  letter-spacing: -3px; color: var(--text-primary); line-height: 1.0; margin-bottom: 20px;
}
.lime { color: var(--lime-500); }
.cta-body { font-size: 16px; color: var(--text-secondary); line-height: 1.75; margin-bottom: 36px; }
.cta-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 16px 36px; border-radius: 999px;
  background: var(--lime-500); color: var(--forest-900);
  font-size: 16px; font-weight: 700; text-decoration: none;
  transition: all 220ms var(--ease-smooth);
}
.cta-btn:hover { background: var(--lime-400); box-shadow: 0 0 40px rgba(184,245,102,0.35); transform: translateY(-1px); }
.cta-note { font-size: 13px; color: var(--text-muted); margin-top: 14px; }

/* Right card */
.cta-card {
  padding: 36px; background: var(--bg-glass); backdrop-filter: blur(20px);
  border: 1px solid rgba(184,245,102,0.2); border-radius: 24px;
  box-shadow: 0 0 60px rgba(184,245,102,0.06);
}
.cta-card-title {
  font-family: var(--font-display); font-size: 20px; font-weight: 800;
  color: var(--text-primary); margin-bottom: 8px; letter-spacing: -0.5px;
}
.cta-card-sub { font-size: 13px; color: var(--text-secondary); margin-bottom: 28px; line-height: 1.5; }
.cta-input {
  width: 100%; padding: 13px 18px; margin-bottom: 12px;
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px; color: var(--text-primary);
  font-family: var(--font-body); font-size: 15px;
  outline: none; transition: border-color 200ms;
}
.cta-input:focus { border-color: rgba(184,245,102,0.4); box-shadow: 0 0 0 3px rgba(184,245,102,0.08); }
.cta-input::placeholder { color: var(--text-muted); }
.cta-submit {
  display: block; width: 100%; padding: 14px; border-radius: 12px;
  background: var(--lime-500); color: var(--forest-900);
  font-family: var(--font-body); font-size: 15px; font-weight: 700;
  text-align: center; text-decoration: none;
  transition: all 200ms;
}
.cta-submit:hover { background: var(--lime-400); box-shadow: 0 0 32px rgba(184,245,102,0.3); }

@media (max-width: 1024px) {
  .cta-inner { grid-template-columns: 1fr; }
  .cta-card { display: none; }
}
</style>
