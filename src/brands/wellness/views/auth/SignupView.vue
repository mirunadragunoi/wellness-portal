<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1 class="auth-card__title">{{ t('auth.signup_title') }}</h1>
      <p class="auth-card__sub">{{ t('auth.signup_subtitle') }}</p>

      <div class="auth-info">
        <div class="auth-info__step">
          <span class="auth-info__num">1</span>
          <p>{{ t('auth.signup_step1') }}</p>
        </div>
        <div class="auth-info__step">
          <span class="auth-info__num">2</span>
          <p>{{ t('auth.signup_step2') }}</p>
        </div>
        <div class="auth-info__step">
          <span class="auth-info__num">3</span>
          <p>{{ t('auth.signup_step3') }}</p>
        </div>
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
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<style scoped>
.auth-page { min-height: var(--app-min-height); display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--bg-base); padding: 24px; box-sizing: border-box; }
.auth-card { width: 100%; max-width: 440px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); padding: 40px; box-shadow: var(--shadow-md); }
.auth-card__title { font-family: var(--font-display); font-size: 32px; font-weight: 400; color: var(--text-primary); margin-bottom: 8px; }
.auth-card__sub   { font-size: 15px; color: var(--text-secondary); margin-bottom: 32px; line-height: 1.6; }

.auth-info { display: flex; flex-direction: column; gap: 16px; margin-bottom: 32px; }
.auth-info__step { display: flex; align-items: flex-start; gap: 14px; }
.auth-info__num {
  width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
  background: linear-gradient(135deg, var(--sky-500), var(--sky-600));
  color: white; font-size: 13px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
}
.auth-info__step p { font-size: 15px; color: var(--text-secondary); line-height: 1.5; padding-top: 4px; }

.auth-btn {
  width: 100%; padding: 16px; border-radius: 100px; border: none; cursor: pointer;
  background: linear-gradient(135deg, var(--sky-500), var(--sky-600));
  color: white; font-family: var(--font-body); font-size: 16px; font-weight: 500;
  box-shadow: 0 4px 16px rgba(14,165,233,0.3); transition: all var(--duration-normal);
  display: flex; align-items: center; justify-content: center; min-height: 52px;
  text-decoration: none; margin-bottom: 24px;
}
.auth-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(14,165,233,0.4); }

.auth-card__switch { text-align: center; font-size: 14px; color: var(--text-secondary); }
.auth-card__link   { color: var(--sky-600); font-weight: 500; text-decoration: none; }
.auth-card__link:hover { text-decoration: underline; }
</style>
