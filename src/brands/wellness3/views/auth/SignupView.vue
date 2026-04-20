<template>
  <div class="auth-page">
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
  align-items: center; justify-content: center;
  background: var(--bg-base); padding: 24px;
  box-sizing: border-box;
}
.auth-card {
  width: 100%; max-width: 440px;
  background: var(--bg-surface); border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl); padding: 40px;
  box-shadow: var(--shadow-md);
}
.auth-card__title { font-family: var(--font-display); font-size: 32px; font-weight: 400; color: var(--text-primary); margin-bottom: 8px; }
.auth-card__sub   { font-size: 15px; color: var(--text-secondary); margin-bottom: 32px; line-height: 1.6; }
.auth-form        { display: flex; flex-direction: column; gap: 20px; margin-bottom: 24px; }
.field            { display: flex; flex-direction: column; gap: 8px; }
.field__label     { font-size: 14px; font-weight: 500; color: var(--text-primary); }
.field__input {
  padding: 14px 18px; border-radius: var(--radius);
  border: 1.5px solid var(--border-default); background: var(--bg-base);
  font-family: var(--font-body); font-size: 15px; color: var(--text-primary);
  transition: border-color var(--duration-fast);
  outline: none;
}
.field__input:focus { border-color: var(--sky-400); box-shadow: 0 0 0 3px rgba(14,165,233,0.1); }
.auth-error { font-size: 14px; color: #dc2626; background: #fee2e2; padding: 10px 14px; border-radius: var(--radius-sm); }
.auth-btn {
  width: 100%; padding: 16px; border-radius: 100px; border: none; cursor: pointer;
  background: linear-gradient(135deg, var(--sky-500), var(--sky-600));
  color: white; font-family: var(--font-body); font-size: 16px; font-weight: 500;
  box-shadow: 0 4px 16px rgba(14,165,233,0.3);
  transition: all var(--duration-normal) var(--ease-smooth);
  display: flex; align-items: center; justify-content: center; gap: 8px; min-height: 52px;
}
.auth-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(14,165,233,0.4); }
.auth-btn:disabled { opacity: 0.7; cursor: not-allowed; }
.spinner {
  width: 20px; height: 20px; border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.4); border-top-color: white;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.auth-card__switch { text-align: center; font-size: 14px; color: var(--text-secondary); margin-bottom: 24px; }
.auth-card__link   { color: var(--sky-600); font-weight: 500; text-decoration: none; }
.auth-card__link:hover { text-decoration: underline; }
.auth-info { padding: 16px; background: var(--bg-muted); border-radius: var(--radius); font-size: 13px; color: var(--text-secondary); line-height: 1.6; }
.auth-info__detail { color: var(--text-muted); font-size: 12px; }
.auth-info__hint   { margin-top: 8px; color: var(--text-primary); }
</style>
