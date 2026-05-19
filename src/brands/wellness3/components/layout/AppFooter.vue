<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__left">
        <RouterLink to="/" class="footer__logo">
          <img :src="logoUrl" :alt="t('brand.name')" class="footer__logo-img" />
        </RouterLink>
        <span class="footer__copy">{{ t('footer.copy') }}</span>
      </div>
      <ul class="footer__links">
        <li><RouterLink to="/about" class="footer__link">{{ t('footer.about') }}</RouterLink></li>
        <li><RouterLink to="/contact" class="footer__link">{{ t('footer.contact') }}</RouterLink></li>
        <li><RouterLink to="/faq" class="footer__link">{{ t('footer.faq') }}</RouterLink></li>
        <li><RouterLink to="/terms" class="footer__link">{{ t('footer.terms_conditions') }}</RouterLink></li>
        <li><RouterLink to="/privacy" class="footer__link">{{ t('footer.privacy_policy') }}</RouterLink></li>
        <li><RouterLink to="/cookies-policy" class="footer__link">{{ t('footer.cookies_policy') }}</RouterLink></li>
        <li><RouterLink to="/unsubscription" class="footer__link">{{ t('footer.unsubscribe') }}</RouterLink></li>
      </ul>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import logoUrl from '@/assets/calmasoul-sparkle-horizontal.png'

const { t } = useI18n()
</script>

<style scoped>
.footer { background: var(--bg-surface); border-top: 1px solid var(--border-subtle); margin-top: auto; }
.footer__inner {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 32px var(--container-pad);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
.footer__left { display: flex; align-items: center; gap: 24px; }
.footer__logo { display: inline-flex; align-items: center; }
.footer__logo-img { height: 34px; width: auto; display: block; }
.footer__copy { font-size: 13px; color: var(--text-muted); }
.footer__links { display: flex; gap: 24px; list-style: none; }
.footer__link { font-size: 14px; color: var(--text-secondary); text-decoration: none; transition: color var(--duration-fast); }
.footer__link:hover { color: var(--sky-600); }

@media (max-width: 640px) {
  .footer__inner { flex-direction: column; text-align: center; padding: 24px var(--container-pad); }
  .footer__left  { flex-direction: column; gap: 8px; }
  .footer__links { flex-wrap: wrap; justify-content: center; gap: 16px; }
}
</style>
