<template>
  <div class="auth-page">
    <RouterLink to="/" class="auth-page__logo">🌿 Serenity</RouterLink>
    <div class="auth-card">
      <h1 class="auth-card__title">{{ t('auth.login_title') }}</h1>
      <p class="auth-card__sub">{{ t('auth.login_subtitle') }}</p>
      <form class="auth-form" @submit.prevent="submit">
        <div class="field">
          <label class="field__label">{{ t('auth.phone_label') }}</label>
          <input v-model="phone" type="tel" class="field__input" :placeholder="t('auth.phone_placeholder')" required />
        </div>
        <div class="field">
          <label class="field__label">{{ t('auth.code_label') }}</label>
          <input v-model="code" type="text" class="field__input" :placeholder="t('auth.code_placeholder')" required style="text-transform:uppercase;letter-spacing:2px" />
        </div>
        <p v-if="error" class="auth-error">{{ error }}</p>
        <button type="submit" class="auth-btn" :disabled="loading">
          <span v-if="loading" class="spinner" />
          {{ loading ? '' : t('auth.login_btn') }}
        </button>
      </form>
      <p class="auth-card__switch">
        {{ t('auth.no_account') }}
        <RouterLink to="/signup" class="auth-card__link">{{ t('auth.signup_link') }}</RouterLink>
      </p>
      <p style="text-align:center;font-size:13px;color:var(--text-muted)">Demo code: <strong>DEMO123</strong></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'

const { t }    = useI18n()
const router   = useRouter()
const auth     = useAuthStore()
const user     = useUserStore()
const phone    = ref('')
const code     = ref('')
const error    = ref('')
const loading  = ref(false)

async function submit() {
  error.value = ''; loading.value = true
  try {
    await auth.login(phone.value, code.value)
    router.push(user.onboardingCompleted ? { name: 'home' } : { name: 'onboarding' })
  } catch {
    error.value = t('auth.invalid_code')
  } finally { loading.value = false }
}
</script>

<style scoped>
.auth-page { min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; background:var(--bg-base); padding:24px; gap:32px; }
.auth-page__logo { font-family:var(--font-display); font-size:28px; font-weight:500; color:var(--text-primary); text-decoration:none; }
.auth-card { width:100%; max-width:440px; background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:var(--radius-xl); padding:40px; box-shadow:var(--shadow-md); }
.auth-card__title { font-family:var(--font-display); font-size:32px; font-weight:400; color:var(--text-primary); margin-bottom:8px; }
.auth-card__sub   { font-size:15px; color:var(--text-secondary); margin-bottom:32px; line-height:1.6; }
.auth-form { display:flex; flex-direction:column; gap:20px; margin-bottom:24px; }
.field { display:flex; flex-direction:column; gap:8px; }
.field__label { font-size:14px; font-weight:500; color:var(--text-primary); }
.field__input { padding:14px 18px; border-radius:var(--radius); border:1.5px solid var(--border-default); background:var(--bg-base); font-family:var(--font-body); font-size:15px; color:var(--text-primary); outline:none; transition:border-color var(--duration-fast); }
.field__input:focus { border-color:var(--sky-400); box-shadow:0 0 0 3px rgba(14,165,233,0.1); }
.auth-error { font-size:14px; color:#dc2626; background:#fee2e2; padding:10px 14px; border-radius:var(--radius-sm); }
.auth-btn { width:100%; padding:16px; border-radius:100px; border:none; cursor:pointer; background:linear-gradient(135deg,var(--sky-500),var(--sky-600)); color:white; font-family:var(--font-body); font-size:16px; font-weight:500; box-shadow:0 4px 16px rgba(14,165,233,0.3); transition:all var(--duration-normal); display:flex; align-items:center; justify-content:center; gap:8px; min-height:52px; }
.auth-btn:hover:not(:disabled) { transform:translateY(-2px); }
.auth-btn:disabled { opacity:0.7; cursor:not-allowed; }
.spinner { width:20px; height:20px; border-radius:50%; border:2px solid rgba(255,255,255,0.4); border-top-color:white; animation:spin 0.7s linear infinite; }
@keyframes spin { to { transform:rotate(360deg); } }
.auth-card__switch { text-align:center; font-size:14px; color:var(--text-secondary); margin-bottom:16px; }
.auth-card__link { color:var(--sky-600); font-weight:500; text-decoration:none; }
.auth-card__link:hover { text-decoration:underline; }
</style>
