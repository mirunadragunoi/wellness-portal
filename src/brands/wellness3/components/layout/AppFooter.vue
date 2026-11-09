<template>
  <!-- Calmasoul GB (DMB / Ofcom): fixed provider block + the four regulated pages. -->
  <footer v-if="market" class="footer footer--market">
    <div class="footer__inner footer__inner--market">
      <RouterLink to="/" class="footer__logo">
        <img :src="logoUrl" :alt="t('brand.name')" class="footer__logo-img" />
      </RouterLink>
      <div class="footer__legal">
        <p v-for="(line, i) in marketLines" :key="i" class="footer__legal-line">{{ line }}</p>
      </div>
      <ul class="footer__links footer__links--market">
        <li><RouterLink to="/terms" class="footer__link">{{ t('footer.terms_conditions') }}</RouterLink></li>
        <li><RouterLink to="/privacy" class="footer__link">{{ t('footer.privacy_policy') }}</RouterLink></li>
        <li><RouterLink to="/cookies-policy" class="footer__link">{{ t('footer.cookies_policy') }}</RouterLink></li>
        <li><RouterLink to="/customer-care" class="footer__link">{{ t('footer.customer_care') }}</RouterLink></li>
      </ul>
    </div>
  </footer>
  <footer v-else class="footer">
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
        <li v-if="!isRO"><RouterLink to="/unsubscription" class="footer__link">{{ t('footer.unsubscribe') }}</RouterLink></li>
      </ul>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { getCountryKey } from '@/config/brand'
import { getMarket, fillPlaceholders } from '@/config/market'
import logoUrl from '@/assets/calmasoul-sparkle-horizontal.png'

const { t } = useI18n()
// RO instance hides the unsubscribe link (handled on the premium landing side).
const isRO = getCountryKey() === 'RO'
const market = getMarket()
const marketLines = market ? market.footerLines.map((line) => fillPlaceholders(line, market)) : []
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

.footer__inner--market {
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}
.footer__legal { display: grid; gap: 4px; }
.footer__legal-line { margin: 0; font-size: 13px; line-height: 1.5; color: var(--text-secondary); overflow-wrap: anywhere; }
.footer__links--market { flex-wrap: wrap; gap: 8px 20px; }

@media (max-width: 640px) {
  .footer__inner { flex-direction: column; text-align: center; padding: 24px var(--container-pad); }
  .footer__left  { flex-direction: column; gap: 8px; }
  .footer__links { flex-wrap: wrap; justify-content: center; gap: 16px; }
  .footer__inner--market { align-items: center; }
}
</style>
