<template>
  <div class="dologin">
    <span class="dologin__spinner" aria-hidden="true" />
    <p class="dologin__text">{{ t('common.loading') }}</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'

const { t }   = useI18n()
const route   = useRoute()
const router  = useRouter()
const auth    = useAuthStore()
const user    = useUserStore()

// The link can end with either a bare 6-digit access code, or a 2-uppercase-
// letter prefix followed by 6 digits — in which case the prefix is stripped.
// Anything else is passed through and the backend will reject it.
function normalizeCode(raw) {
  const value = String(raw || '').trim()
  return /^[A-Z]{2}\d{6}$/.test(value) ? value.slice(2) : value
}

onMounted(async () => {
  try {
    const data = await auth.login(normalizeCode(route.params.code))
    if (data.profile) {
      user._applyApiProfile(data.profile)
      router.replace({ name: 'home' })
    } else {
      router.replace(user.onboardingCompleted ? { name: 'home' } : { name: 'onboarding' })
    }
  } catch {
    router.replace({ name: 'login', query: { error: 'invalid_code' } })
  }
})
</script>

<style scoped>
.dologin {
  min-height: var(--app-min-height);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 16px; background: var(--bg-base);
}
.dologin__spinner {
  width: 40px; height: 40px; border-radius: 50%;
  border: 3px solid var(--border-subtle); border-top-color: var(--text-secondary);
  animation: dologin-spin 0.7s linear infinite;
}
.dologin__text { font-size: 15px; color: var(--text-secondary); }
@keyframes dologin-spin { to { transform: rotate(360deg); } }
</style>
