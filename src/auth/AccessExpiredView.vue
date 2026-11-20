<template>
  <div class="expired">
    <div class="expired__card" role="alert">
      <Icon icon="lucide:lock-keyhole" class="expired__icon" aria-hidden="true" />
      <h1 class="expired__title">{{ t('title') }}</h1>
      <p class="expired__text">{{ t('text', { brand: brandName }) }}</p>
      <!-- Fără link sau CTA de plată: în aplicație nu trimitem userul spre abonare
           externă (App Store 3.1.1 / Google Play Payments). -->
      <button type="button" class="expired__btn expired__btn--primary" @click="enterNewCode">
        {{ t('new_code') }}
      </button>
      <button type="button" class="expired__btn" @click="retry">{{ t('retry') }}</button>
      <RouterLink to="/contact" class="expired__link">{{ t('contact') }}</RouterLink>
    </div>
  </div>
</template>

<script setup>
// View PARTAJAT, înregistrat în router doar când VITE_PLATFORM=app.
// Textele sunt locale (useI18n local) ca să nu atingem fișierele de traduceri în spike.
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { getBrandConfig } from '@/config/brand'

const { t } = useI18n({
  useScope: 'local',
  messages: {
    en: {
      title: 'Your access has expired',
      text: 'Your {brand} access is no longer active. If you have a new access code, enter it below.',
      new_code: 'Enter a new access code',
      retry: 'Try again',
      contact: 'Contact us'
    },
    ro: {
      title: 'Accesul tău a expirat',
      text: 'Accesul tău {brand} nu mai este activ. Dacă ai un cod de acces nou, introdu-l mai jos.',
      new_code: 'Introdu un cod nou',
      retry: 'Încearcă din nou',
      contact: 'Contactează-ne'
    }
  }
})
const router = useRouter()
const auth = useAuthStore()
const brandName = getBrandConfig().portalName

function enterNewCode() {
  auth.logout()
  router.replace({ name: 'login' })
}

function retry() {
  router.replace({ name: 'home' })
}
</script>

<style scoped>
.expired { min-height: var(--app-min-height, 100vh); display: flex; align-items: center; justify-content: center; padding: 32px 24px; background: var(--bg-base); box-sizing: border-box; }
.expired__card { width: 100%; max-width: 420px; text-align: center; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); padding: 40px 28px; display: flex; flex-direction: column; gap: 14px; }
.expired__icon { font-size: 44px; color: var(--violet, var(--brand-primary)); margin: 0 auto 4px; }
.expired__title { font-family: var(--font-display); font-size: 28px; font-weight: 400; color: var(--text-primary); }
.expired__text { font-size: 15px; line-height: 1.6; color: var(--text-secondary); margin-bottom: 10px; }
.expired__btn { width: 100%; min-height: 50px; border-radius: 100px; border: 1px solid var(--border-default); background: transparent; color: var(--text-primary); font-family: var(--font-body); font-size: 15px; cursor: pointer; }
.expired__btn--primary { border: none; background: var(--brand-primary); color: var(--brand-on-primary, #fff); }
.expired__link { font-size: 14px; color: var(--text-muted); margin-top: 6px; }
</style>
