<template>
  <div class="auth-page">
    <RouterLink to="/" class="auth-page__logo">
      {{ t('brand.name') }}
    </RouterLink>

    <div class="auth-wrap">
    <div class="auth-card">
      <h1 class="auth-card__title">{{ t('auth.signup_title') }}</h1>
      <p class="auth-card__sub">{{ t('auth.signup_subtitle') }}</p>

      <form class="auth-form" @submit.prevent="submit">
        <div class="field">
          <label class="field__label">{{ t('auth.phone_label') }}</label>
          <input
            v-model="phone" type="tel" class="field__input"
            :placeholder="t('auth.phone_placeholder')"
            autocomplete="tel" required
          />
        </div>
        <div class="field">
          <label class="field__label">{{ t('auth.code_label') }}</label>
          <input
            v-model="code" type="text" class="field__input"
            :placeholder="t('auth.code_placeholder')"
            autocomplete="off" required
            style="text-transform: uppercase; letter-spacing: 2px;"
          />
        </div>

        <p v-if="error" class="auth-error">{{ error }}</p>

        <button type="submit" class="auth-btn" :disabled="loading">
          <span v-if="loading" class="spinner" />
          {{ loading ? '' : t('auth.signup_btn') }}
        </button>
      </form>

      <p class="auth-card__switch">
        {{ t('auth.have_account') }}
        <RouterLink to="/login" class="auth-card__link">{{ t('auth.login_link') }}</RouterLink>
      </p>

      <div class="auth-info">
        <p>{{ t('auth.no_code') }}</p>
        <p class="auth-info__detail">{{ t('auth.no_code_info') }}</p>
        <p class="auth-info__hint">Demo code: <strong>DEMO123</strong></p>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const { t }    = useI18n()
const router   = useRouter()
const auth     = useAuthStore()

const phone   = ref('')
const code    = ref('')
const error   = ref('')
const loading = ref(false)

async function submit() {
  error.value   = ''
  loading.value = true
  try {
    await auth.signup(phone.value, code.value)
    router.push({ name: 'onboarding' })
  } catch (e) {
    error.value = e.message === 'INVALID_CODE'
      ? t('auth.invalid_code')
      : t('auth.error_generic')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-page {
  min-height: var(--app-min-height); display: flex; flex-direction: column;
  background: var(--parchment); position: relative; overflow: hidden;
}
.auth-page::before {
  content: ''; position: absolute; top: 0; left: 0; bottom: 0; width: 40%;
  background: linear-gradient(180deg, var(--sage-700), var(--sage-500)); pointer-events: none;
}
.auth-page__logo {
  position: relative; z-index: 1;
  display: inline-flex; align-items: center; gap: 10px; padding: 24px var(--container-pad);
  font-family: var(--font-display); font-size: 22px; font-weight: 400;
  color: var(--parchment); text-decoration: none;
}
.auth-wrap {
  flex: 1; display: flex; align-items: center; justify-content: center;
  padding: 32px var(--container-pad); position: relative; z-index: 1;
}
.auth-card {
  width: 100%; max-width: 440px;
  background: var(--bg-surface);
  border: 2px solid var(--ink-200); border-radius: var(--radius-lg);
  padding: 40px; box-shadow: 8px 8px 0 var(--ink-200);
}
.auth-card__title { font-family: var(--font-display); font-size: 30px; font-weight: 300; color: var(--text-primary); margin-bottom: 6px; }
.auth-card__sub   { font-size: 15px; color: var(--text-secondary); margin-bottom: 28px; line-height: 1.6; }
.auth-form { display: flex; flex-direction: column; gap: 16px; margin-bottom: 20px; }
.field { display: flex; flex-direction: column; gap: 6px; }
.field__label { font-size: 13px; font-weight: 600; color: var(--text-primary); text-transform: uppercase; letter-spacing: 1px; }
.field__input {
  padding: 12px 16px; border-radius: var(--radius-sm);
  border: 2px solid var(--ink-200); background: var(--parchment);
  font-family: var(--font-body); font-size: 15px; color: var(--text-primary); outline: none;
  transition: border-color var(--duration-fast);
}
.field__input:focus { border-color: var(--sage-500); background: white; }
.auth-error { font-size: 13px; color: #dc2626; background: #fee2e2; padding: 10px 14px; border-radius: var(--radius-sm); border-left: 3px solid #dc2626; }
.auth-btn {
  width: 100%; padding: 14px; border-radius: var(--radius-sm); border: 2px solid var(--sage-600);
  cursor: pointer; background: var(--sage-500); color: #fff;
  font-family: var(--font-body); font-size: 15px; font-weight: 700;
  box-shadow: 4px 4px 0 var(--sage-300);
  transition: all var(--duration-fast);
  display: flex; align-items: center; justify-content: center; gap: 8px; min-height: 50px;
}
.auth-btn:hover:not(:disabled) { background: var(--sage-600); border-color: var(--sage-600); box-shadow: 2px 2px 0 var(--sage-300); transform: translate(1px,1px); }
.auth-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.spinner { width: 18px; height: 18px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; animation: spin 0.7s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.auth-card__switch { text-align: center; font-size: 14px; color: var(--text-secondary); margin-bottom: 12px; }
.auth-card__link { color: var(--sage-600); font-weight: 600; text-decoration: none; border-bottom: 1.5px solid var(--sage-300); }
.auth-card__link:hover { color: var(--sage-700); }
.terms { font-size: 12px; color: var(--text-muted); text-align: center; margin-top: 4px; line-height: 1.6; }
.terms a { color: var(--sage-600); text-decoration: underline; }
.auth-info { margin-top: 16px; padding: 14px; background: var(--parchment-2); border-radius: var(--radius-sm); border: 1px solid var(--ink-100); }
.auth-info p { font-size: 13px; color: var(--text-secondary); margin-bottom: 4px; }
.auth-info__detail { color: var(--text-muted) !important; font-size: 12px !important; }
.auth-info__hint { font-size: 13px !important; color: var(--ink-900) !important; margin-top: 8px !important; }
@media (max-width: 640px) {
  .auth-page::before { display: none; }
  .auth-page__logo { color: var(--ink-900); }
  .auth-card { padding: 24px 18px; box-shadow: 4px 4px 0 var(--ink-200); }
}
</style>
