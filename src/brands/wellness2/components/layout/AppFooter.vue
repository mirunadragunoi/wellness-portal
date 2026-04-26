<template>
  <footer class="footer">
    <div class="footer__top">
      <div class="footer__brand">
        <RouterLink to="/" class="footer__logo">
          {{ t('brand.name') }}
        </RouterLink>
        <p class="footer__tagline">Your daily companion for mindful living.</p>
      </div>
      <ul class="footer__links">
        <li><a href="#" class="footer__link">{{ t('footer.about') }}</a></li>
        <li><a href="#" class="footer__link">{{ t('footer.contact') }}</a></li>
        <li><a href="#" class="footer__link">{{ t('footer.terms') }}</a></li>
        <li><a href="#" class="footer__link">{{ t('footer.privacy') }}</a></li>
      </ul>
    </div>
    <div class="footer__bottom">
      <span class="footer__copy">{{ t('footer.copy') }}</span>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<style scoped>
.footer {
  background: var(--forest-950);
  margin-top: auto;
  border-top: 1px solid rgba(184,245,102,0.08);
}

.footer__top {
  display:flex; align-items:flex-start; justify-content:space-between;
  gap:32px; padding:48px var(--container-pad) 32px;
  border-bottom:1px solid rgba(255,255,255,0.08);
}
.footer__brand { display:flex; flex-direction:column; gap:10px; }
.footer__logo {
  display:inline-flex; align-items:center; gap:10px;
  font-family:var(--font-display); font-size:20px; font-weight:700;
  color:var(--text-primary); text-decoration:none;
  transition: opacity 150ms;
}
.footer__logo:hover { opacity: 0.8; }
.footer__tagline {
  font-size: 13px;
  color: var(--text-secondary);
  max-width: 260px;
  line-height: 1.6;
}

.footer__links {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px 22px;
  list-style: none;
}
.footer__link {
  font-size:14px; color:var(--text-secondary); text-decoration:none;
  transition:color var(--duration-fast);
}
.footer__link:hover { color:var(--lime-400); }

.footer__bottom {
  display:flex; align-items:center; justify-content:flex-start;
  padding:16px var(--container-pad);
}
.footer__copy { font-size:12px; color:var(--text-muted); }

@media (max-width:640px) {
  .footer__top { flex-direction:column; padding: 36px 16px 24px; }
  .footer__links { gap: 12px 16px; }
  .footer__bottom {
    padding: 14px 16px calc(14px + env(safe-area-inset-bottom, 0px));
    justify-content: flex-start;
  }
}
</style>
