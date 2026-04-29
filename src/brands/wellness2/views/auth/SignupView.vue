<template>
  <div class="auth-page">
    <div class="auth-visual">
      <RouterLink to="/" class="auth-logo"><span class="auth-logo-dot" />{{ t('brand.name') }}</RouterLink>
      <div>
        <h2 class="auth-quote">Start your <span>inner</span> journey today</h2>
        <p class="auth-visual-sub">Join thousands of people finding calm, focus, and better sleep with Innerawake.</p>
      </div>
    </div>
    <div class="auth-form-side">
      <div class="auth-card">
        <span class="auth-kicker">Create account</span>
        <h1 class="auth-card__title">{{ t('auth.signup_title') }}</h1>
        <p class="auth-card__sub">{{ t('auth.signup_subtitle') }}</p>

        <div class="auth-steps">
          <div class="auth-steps__item"><span class="auth-steps__num">1</span><p>{{ t('auth.signup_step1') }}</p></div>
          <div class="auth-steps__item"><span class="auth-steps__num">2</span><p>{{ t('auth.signup_step2') }}</p></div>
          <div class="auth-steps__item"><span class="auth-steps__num">3</span><p>{{ t('auth.signup_step3') }}</p></div>
        </div>

        <RouterLink to="/login" class="auth-btn">
          {{ t('auth.login_btn') }}
        </RouterLink>

        <p class="auth-card__switch">
          {{ t('auth.have_account') }}
          <RouterLink to="/login" class="auth-card__link">{{ t('auth.login_link') }}</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<style scoped>
.auth-page {
  min-height: var(--app-min-height);
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: var(--forest-900);
}
.auth-visual {
  padding: 40px clamp(28px, 5vw, 72px);
  background: radial-gradient(circle at 20% 10%, rgba(184,245,102,0.14), transparent 38%), var(--forest-850);
  border-right: 1px solid rgba(184,245,102,0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.auth-logo {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 800;
}
.auth-logo-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--lime-500);
  box-shadow: 0 0 10px rgba(184,245,102,0.7);
}
.auth-quote {
  font-family: var(--font-display);
  font-size: clamp(28px, 4vw, 42px);
  line-height: 1.08;
  color: var(--text-primary);
}
.auth-quote span { color: var(--lime-500); }
.auth-visual-sub { margin-top: 10px; color: var(--text-secondary); max-width: 440px; }
.auth-form-side {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 36px var(--container-pad);
}
.auth-card {
  width: 100%;
  max-width: 440px;
  background: var(--bg-glass);
  backdrop-filter: blur(18px);
  border: var(--border-glass);
  border-radius: 20px;
  padding: 34px;
  box-shadow: var(--glow-card);
}
.auth-kicker {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: var(--lime-500);
}
.auth-card__title {
  margin-top: 10px;
  font-family: var(--font-display);
  font-size: clamp(28px, 3.2vw, 38px);
  font-weight: 800;
  letter-spacing: -1.4px;
  color: var(--text-primary);
  margin-bottom: 6px;
}
.auth-card__sub {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 24px;
  line-height: 1.65;
}
.auth-steps { display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; }
.auth-steps__item { display: flex; align-items: flex-start; gap: 12px; }
.auth-steps__num {
  width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0;
  background: var(--lime-500); color: var(--forest-900);
  font-size: 12px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
}
.auth-steps__item p { font-size: 14px; color: var(--text-secondary); line-height: 1.5; padding-top: 3px; }
.auth-btn {
  width: 100%;
  padding: 14px;
  cursor: pointer;
  background: var(--lime-500);
  color: var(--forest-900);
  border: none;
  border-radius: 14px;
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 700;
  transition: all var(--duration-fast);
  display: flex; align-items: center; justify-content: center; gap: 8px; min-height: 50px;
  text-decoration: none; margin-bottom: 16px;
}
.auth-btn:hover {
  background: var(--lime-400);
  box-shadow: 0 0 28px rgba(184,245,102,0.35);
  transform: translateY(-1px);
}
.auth-card__switch { text-align: center; font-size: 14px; color: var(--text-secondary); margin-bottom: 12px; }
.auth-card__link { color: var(--lime-400); font-weight: 600; text-decoration: none; }
.auth-card__link:hover { color: var(--lime-300); }
@media (max-width: 640px) {
  .auth-page { grid-template-columns: 1fr; }
  .auth-visual { display: none; }
  .auth-card { padding: 24px 18px; }
}
</style>
