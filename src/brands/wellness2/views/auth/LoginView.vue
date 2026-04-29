<template>
  <div class="auth-page">
    <div class="auth-visual">
      <RouterLink to="/" class="auth-logo"><span class="auth-logo-dot" />{{ t('brand.name') }}</RouterLink>
      <div>
        <h2 class="auth-quote">Welcome <span>back</span> to your practice</h2>
        <p class="auth-visual-sub">Your sessions, streak, and progress are waiting. Pick up right where you left off.</p>
      </div>
    </div>
    <div class="auth-form-side">
      <div class="auth-card">
        <span class="auth-kicker">Welcome back</span>
        <h1 class="auth-card__title">{{ t('auth.login_title') }}</h1>
        <p class="auth-card__sub">{{ t('auth.login_subtitle') }}</p>
        <form class="auth-form" @submit.prevent="submit">
          <div class="field">
            <label class="field__label">{{ t('auth.code_label') }}</label>
            <input
              v-model="code"
              type="text"
              class="field__input"
              :placeholder="t('auth.code_placeholder')"
              required
              style="text-transform:uppercase;letter-spacing:2px"
            />
            <p class="field__hint">Use the wellness code provided by your subscription.</p>
          </div>
          <p v-if="error" class="auth-error">{{ error }}</p>
          <button type="submit" class="auth-btn" :disabled="loading">
            <span v-if="loading" class="spinner" />
            {{ loading ? 'Logging in...' : t('auth.login_btn') }}
          </button>
        </form>
        <p class="auth-card__switch">
          {{ t('auth.no_account') }}
          <RouterLink to="/signup" class="auth-card__link">{{ t('auth.signup_link') }}</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'

const { t }   = useI18n()
const router  = useRouter()
const auth    = useAuthStore()
const user    = useUserStore()
const code    = ref('')
const error   = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''; loading.value = true
  try {
    const data = await auth.login(code.value)
    if (data.profile) {
      user._applyApiProfile(data.profile)
      router.push({ name: 'home' })
    } else {
      router.push(user.onboardingCompleted ? { name: 'home' } : { name: 'onboarding' })
    }
  } catch {
    error.value = t('auth.invalid_code')
  } finally { loading.value = false }
}
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
  max-width: 430px;
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
.auth-form { display: flex; flex-direction: column; gap: 18px; margin-bottom: 20px; }
.field     { display: flex; flex-direction: column; gap: 6px; }
.field__label {
  font-size: 11px;
  font-weight: 600;
  color: var(--lime-500);
  text-transform: uppercase;
  letter-spacing: 2px;
}
.field__input {
  padding: 13px 16px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.04);
  font-family: var(--font-body);
  font-size: 15px;
  color: var(--text-primary);
  outline: none;
  transition: all var(--duration-fast);
}
.field__input:focus {
  border-color: rgba(184,245,102,0.4);
  background: rgba(255,255,255,0.07);
  box-shadow: 0 0 0 3px rgba(184,245,102,0.08);
}
.field__hint { font-size: 12px; color: var(--text-muted); }
.auth-error {
  font-size: 13px;
  color: #fca5a5;
  background: rgba(220, 38, 38, 0.16);
  border: 1px solid rgba(220, 38, 38, 0.28);
  padding: 10px 14px;
  border-radius: 12px;
}
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
}
.auth-btn:hover:not(:disabled) {
  background: var(--lime-400);
  box-shadow: 0 0 28px rgba(184,245,102,0.35);
  transform: translateY(-1px);
}
.auth-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.spinner {
  width: 18px; height: 18px; border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.3); border-top-color: white;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.auth-card__switch {
  text-align: center; font-size: 14px; color: var(--text-secondary); margin-bottom: 8px;
}
.auth-card__link {
  color: var(--lime-400);
  font-weight: 600;
  text-decoration: none;
}
.auth-card__link:hover { color: var(--lime-300); }

@media (max-width: 640px) {
  .auth-page { grid-template-columns: 1fr; }
  .auth-visual { display: none; }
  .auth-card { padding: 24px 18px; }
}
</style>
