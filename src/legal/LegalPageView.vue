<template>
  <div class="legal-view">
    <!-- Logged-in users already have AppNavbarAuth from App.vue -->
    <AppNavbarPublic v-if="!auth.isLoggedIn" />
    <main class="legal-page">
    <section class="legal-hero">
      <h1>{{ title }}</h1>
      <p class="legal-summary">{{ summary }}</p>
    </section>

    <section v-if="isLoading" class="legal-card legal-state">
      <p>{{ t('common.loading') }}</p>
    </section>

    <section v-else-if="errorMessage && pageKey !== 'unsubscribe'" class="legal-card legal-state">
      <p>{{ errorMessage }}</p>
      <button class="legal-retry" type="button" @click="loadContent">
        {{ t('common.retry') }}
      </button>
    </section>

    <section v-else-if="pageKey === 'faq' && faqItems.length" class="legal-card legal-faq">
      <article v-for="item in faqItems" :key="`${item.order}-${item.question}`" class="legal-faq__item">
        <h2>{{ item.question }}</h2>
        <div class="legal-content" v-html="item.answerHtml" />
      </article>
    </section>

    <template v-else-if="pageKey === 'unsubscribe'">
      <section v-if="errorMessage" class="legal-card legal-state legal-warning">
        <p>{{ errorMessage }}</p>
      </section>

      <section v-if="contentHtml" class="legal-card">
        <div class="legal-content" v-html="contentHtml" />
      </section>

      <section class="legal-card unsubscribe-card">
        <form class="unsubscribe-form" @submit.prevent="submitUnsubscribe">
          <div class="form-row">
            <label for="unsubscribe-phone">{{ t('legal.unsubscribe_form.phone') }}</label>
            <div class="phone-input" :class="{ 'phone-input--valid': isPhoneValid }">
              <span>{{ selectedPhoneCountryMeta.dialCode }}</span>
              <input
                id="unsubscribe-phone"
                :value="phoneNumber"
                inputmode="numeric"
                type="tel"
                :maxlength="selectedPhoneCountryMeta.length"
                :placeholder="selectedPhoneCountryMeta.hint"
                autocomplete="tel"
                @input="onPhoneInput"
              >
            </div>
            <p class="form-hint">
              {{ t('legal.unsubscribe_form.phone_hint', { format: selectedPhoneCountryMeta.hint }) }}
            </p>
          </div>

          <div ref="recaptchaContainer" class="recaptcha-box" />

          <p v-if="submitError" class="form-message form-message--error">{{ submitError }}</p>
          <p v-if="submitMessage" class="form-message form-message--success">{{ submitMessage }}</p>

          <button class="legal-retry" type="submit" :disabled="isSubmitting || !isPhoneValid">
            {{ isSubmitting ? t('legal.unsubscribe_form.submitting') : t('legal.unsubscribe_form.submit') }}
          </button>
        </form>
      </section>
    </template>

    <section v-else-if="contentHtml" class="legal-card">
      <div class="legal-content" v-html="contentHtml" />
    </section>

    <section v-else class="legal-card legal-state">
      <p>{{ t('legal.placeholder') }}</p>
    </section>
    </main>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { api } from '@/services/api'
import { useAuthStore } from '@/stores/auth'
import { getCountryKey } from '@/config/brand'
import AppNavbarPublic from '@/components/layout/AppNavbarPublic.vue'

const route = useRoute()
const { t, locale } = useI18n()
const auth = useAuthStore()

const pageKey = computed(() => route.meta.legalKey || 'about')
const title = computed(() => t(`legal.pages.${pageKey.value}.title`))
const summary = computed(() => t(`legal.pages.${pageKey.value}.summary`))

const isLoading = ref(false)
const errorMessage = ref('')
const contentHtml = ref('')
const faqItems = ref([])
const phoneNumber = ref('')
const recaptchaToken = ref('')
const recaptchaContainer = ref(null)
const recaptchaWidgetId = ref(null)
const isSubmitting = ref(false)
const submitError = ref('')
const submitMessage = ref('')

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LdDBHcqAAAAADmNepiNSpPMrtRUDwY7FTRds_72'

// `length` = expected digit count, `pattern` = full validation (prefix + length).
const phoneCountries = [
  { code: 'UK', label: 'United Kingdom', dialCode: '+44', hint: '7xxxxxxxxx', length: 10, pattern: /^7\d{9}$/ },
  { code: 'RO', label: 'Romania', dialCode: '+40', hint: '7xxxxxxxx', length: 9, pattern: /^7\d{8}$/ },
  { code: 'CZ', label: 'Czech Republic', dialCode: '+420', hint: '7xxxxxxxx', length: 9, pattern: /^7\d{8}$/ },
  { code: 'SK', label: 'Slovakia', dialCode: '+421', hint: '9xxxxxxxx', length: 9, pattern: /^9\d{8}$/ }
]

const selectedPhoneCountry = computed(() => {
  if (String(locale.value || '').toLowerCase() === 'ro') return 'RO'
  return getCountryKey()
})

const selectedPhoneCountryMeta = computed(() =>
  phoneCountries.find((country) => country.code === selectedPhoneCountry.value) || phoneCountries[0]
)

// Valid only when the digits match the country's full pattern (prefix + length).
const isPhoneValid = computed(() =>
  selectedPhoneCountryMeta.value.pattern.test(phoneNumber.value)
)

// Keep the input digits-only and capped at the country's expected length.
function onPhoneInput(event) {
  const digits = event.target.value
    .replace(/\D/g, '')
    .slice(0, selectedPhoneCountryMeta.value.length)
  phoneNumber.value = digits
  event.target.value = digits
}

// Target country can change at runtime (language switch) — reset stale input.
watch(selectedPhoneCountry, () => {
  phoneNumber.value = ''
})

const loaders = {
  about: api.getAbout,
  contact: api.getLegalContact,
  faq: api.getLegalFaq,
  terms: api.getLegalTerms,
  privacy: api.getLegalPrivacy,
  cookies: api.getLegalCookies,
  unsubscribe: api.getLegalUnsubscribe
}

function unwrapData(response) {
  return response?.data ?? response
}

function normalizeItems(payload) {
  const data = unwrapData(payload)
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.items)) return data.items
  return []
}

function normalizePayload(payload) {
  const data = unwrapData(payload)
  if (Array.isArray(data)) {
    return { content: data.map((item) => item.content).filter(Boolean).join('\n\n') }
  }
  return data || {}
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function parseVariables(value) {
  if (!value) return {}
  if (typeof value === 'object') return value
  try {
    return JSON.parse(value)
  } catch {
    return {}
  }
}

function replaceVariables(content, payload) {
  const variables = {
    ...parseVariables(payload.variables),
    EMAIL: payload.email,
    email: payload.email
  }

  return Object.entries(variables).reduce((text, [key, value]) => {
    if (value === null || value === undefined) return text
    return text
      .replaceAll(`#${key}#`, String(value))
      .replaceAll(`{{${key}}}`, String(value))
  }, content)
}

/**
 * Normalize newlines: backend may send `\n` as a literal two-char sequence
 * (backslash + n) instead of a real newline char. Convert both literal escape
 * sequences and real CR/CRLF into a single consistent `\n`.
 */
function normalizeNewlines(text) {
  return String(text || '')
    .replace(/\\r\\n/g, '\n')
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\n')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
}

// Block-level tags mean the backend already structured the layout — trust it as-is.
const BLOCK_HTML_RE = /<(?:p|div|ul|ol|li|h[1-6]|table|thead|tbody|tr|td|th|section|article|header|footer|blockquote|pre|figure|hr)[\s/>]/i
// Any tag at all (used to detect inline markup like <a>, <strong>, <em>).
const ANY_HTML_RE = /<[a-z][\s\S]*?>/i

/**
 * Convert backend content into safe display HTML. Handles 3 cases:
 *  1. Structured HTML (has block tags) → returned as-is.
 *  2. Mixed: plain text + inline tags (<a>, <strong>...) + newlines →
 *     newline formatting applied, inline tags preserved.
 *  3. Pure plain text → escaped, then newline formatting applied.
 * In all cases `\n\n` becomes a new paragraph and a single `\n` becomes `<br>`.
 */
function toHtml(content, payload = {}) {
  const text = normalizeNewlines(replaceVariables(String(content || ''), payload)).trim()
  if (!text) return ''

  // Case 1: structured HTML — trust the backend layout.
  if (BLOCK_HTML_RE.test(text)) return text

  // Case 2 (inline markup) keeps tags; Case 3 (no markup) escapes.
  const hasInlineHtml = ANY_HTML_RE.test(text)
  const render = hasInlineHtml ? (s) => s : escapeHtml

  return text
    .split(/\n{2,}/)
    .map((paragraph) => {
      const html = render(paragraph)
        // Collapse explicit <br> + any adjacent newline so we don't double the break.
        .replace(/\n?[ \t]*<br\s*\/?>[ \t]*\n?/gi, '<br>')
        .replace(/\n/g, '<br>')
      return `<p>${html}</p>`
    })
    .join('')
}

function currentApiLanguage() {
  return String(locale.value || 'en').toUpperCase()
}

function resetRecaptcha() {
  recaptchaToken.value = ''
  if (window.grecaptcha && recaptchaWidgetId.value !== null) {
    window.grecaptcha.reset(recaptchaWidgetId.value)
  }
}

function loadRecaptchaScript() {
  return new Promise((resolve, reject) => {
    // Already fully initialized.
    if (window.grecaptcha?.render) {
      resolve()
      return
    }

    // Inject the script once.
    if (!document.querySelector('script[data-recaptcha-v2]')) {
      const script = document.createElement('script')
      script.src = 'https://www.google.com/recaptcha/api.js?render=explicit'
      script.async = true
      script.defer = true
      script.dataset.recaptchaV2 = 'true'
      script.onerror = () => reject(new Error('Failed to load reCAPTCHA script'))
      document.head.appendChild(script)
    }

    // `script.onload` fires before grecaptcha.render is defined — poll until
    // the API is actually usable, with a timeout so we never hang forever.
    let waited = 0
    const interval = window.setInterval(() => {
      if (window.grecaptcha?.render) {
        window.clearInterval(interval)
        resolve()
      } else if ((waited += 100) >= 10000) {
        window.clearInterval(interval)
        reject(new Error('reCAPTCHA failed to initialize'))
      }
    }, 100)
  })
}

async function renderRecaptcha() {
  if (pageKey.value !== 'unsubscribe' || !recaptchaContainer.value || recaptchaWidgetId.value !== null) return
  await loadRecaptchaScript()
  // The widget iframe can't be styled by us — only its built-in light/dark
  // theme. Follow the site theme so it blends instead of a stark white box.
  const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
  recaptchaWidgetId.value = window.grecaptcha.render(recaptchaContainer.value, {
    sitekey: RECAPTCHA_SITE_KEY,
    theme,
    callback: (token) => {
      recaptchaToken.value = token
      submitError.value = ''
    },
    'expired-callback': () => {
      recaptchaToken.value = ''
    },
    'error-callback': () => {
      recaptchaToken.value = ''
      submitError.value = t('legal.unsubscribe_form.recaptcha_error')
    }
  })
}

async function submitUnsubscribe() {
  submitError.value = ''
  submitMessage.value = ''

  if (!phoneNumber.value) {
    submitError.value = t('legal.unsubscribe_form.phone_required')
    return
  }

  if (!recaptchaToken.value) {
    submitError.value = t('legal.unsubscribe_form.recaptcha_required')
    return
  }

  isSubmitting.value = true
  try {
    await api.unsubscribePhoneNumber({
      country: selectedPhoneCountry.value,
      language: currentApiLanguage(),
      phoneNumber: phoneNumber.value,
      recaptchaToken: recaptchaToken.value
    })
    submitMessage.value = t('legal.unsubscribe_form.success')
    phoneNumber.value = ''
    resetRecaptcha()
  } catch (error) {
    // error_code 2048 = backend "subscription not found" → show a localized,
    // user-friendly message instead of the raw "HTTP 500".
    submitError.value = error?.errorCode === 2048
      ? t('legal.unsubscribe_form.not_found')
      : t('legal.unsubscribe_form.error')
    resetRecaptcha()
  } finally {
    isSubmitting.value = false
  }
}

async function loadContent() {
  const loader = loaders[pageKey.value]
  if (!loader) return

  isLoading.value = true
  errorMessage.value = ''
  contentHtml.value = ''
  faqItems.value = []

  try {
    const response = await loader(auth.accessCode)
    if (pageKey.value === 'faq') {
      faqItems.value = normalizeItems(response)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map((item) => ({ ...item, answerHtml: toHtml(item.answer) }))
    } else {
      const payload = normalizePayload(response)
      contentHtml.value = toHtml(payload.content, payload)
    }
  } catch (error) {
    errorMessage.value = error?.message || t('common.error')
  } finally {
    isLoading.value = false
  }

  // Render reCAPTCHA only after isLoading is false — otherwise the form (and
  // its container ref) is not yet in the DOM and the widget is never mounted.
  if (pageKey.value === 'unsubscribe') {
    await nextTick()
    try {
      await renderRecaptcha()
    } catch (e) {
      console.warn('reCAPTCHA render failed:', e?.message || e)
    }
  }
}

watch(pageKey, loadContent, { immediate: true })

onBeforeUnmount(() => {
  recaptchaWidgetId.value = null
})
</script>

<style scoped>
/* Distinct page background so the content area separates clearly from the
   translucent navbar (which shares --bg-base) and makes the white cards pop. */
.legal-view {
  min-height: 100vh;
  background: var(--bg-muted);
}

.legal-page {
  width: min(900px, calc(100% - 32px));
  margin: 0 auto;
  /* Top padding clears the fixed navbar — AppNavbarPublic for guests,
     AppNavbarAuth (from App.vue) for logged-in users — both ~--navbar-height. */
  padding: calc(var(--navbar-height) + 40px) 0 96px;
}

.legal-hero {
  margin-bottom: 28px;
}

.legal-hero h1 {
  margin: 0;
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: clamp(36px, 7vw, 64px);
  line-height: 1.05;
}

.legal-summary {
  max-width: 720px;
  margin: 20px 0 0;
  color: var(--text-secondary);
  font-size: 18px;
  line-height: 1.7;
}

.legal-card {
  padding: 32px;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
  background: var(--bg-surface);
  color: var(--text-secondary);
  line-height: 1.8;
}

.legal-card p {
  margin: 0;
}

.legal-state {
  display: grid;
  gap: 16px;
}

.legal-retry {
  justify-self: start;
  border: 0;
  border-radius: var(--radius-full);
  padding: 10px 18px;
  background: var(--brand-primary);
  color: white;
  font-weight: 700;
  cursor: pointer;
}

.legal-faq {
  display: grid;
  gap: 24px;
}

.legal-faq__item {
  display: grid;
  gap: 10px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border-subtle);
}

.legal-faq__item:last-child {
  padding-bottom: 0;
  border-bottom: 0;
}

.legal-faq__item h2 {
  margin: 0;
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: 22px;
  line-height: 1.3;
}

.legal-content :deep(p) {
  margin: 0 0 18px;
}

.legal-content :deep(p:last-child) {
  margin-bottom: 0;
}

.legal-content :deep(h2),
.legal-content :deep(h3) {
  margin: 32px 0 12px;
  color: var(--text-primary);
  font-family: var(--font-display);
  line-height: 1.25;
}

.legal-content :deep(ul),
.legal-content :deep(ol) {
  padding-left: 24px;
  margin: 0 0 18px;
}

.legal-content :deep(a) {
  color: var(--brand-primary);
}

.unsubscribe-card {
  margin-top: 24px;
}

.unsubscribe-form {
  display: grid;
  gap: 22px;
}

.form-row {
  display: grid;
  gap: 8px;
}

.form-row label {
  color: var(--text-primary);
  font-weight: 700;
}

.form-row select,
.phone-input input {
  width: 100%;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  background: var(--bg-base);
  color: var(--text-primary);
  font: inherit;
}

.form-row select {
  padding: 12px 14px;
}

.phone-input {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  overflow: hidden;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  background: var(--bg-base);
  transition: border-color var(--duration-fast), box-shadow var(--duration-fast);
}

/* Highlight when the entered number is valid for the selected country. */
.phone-input--valid {
  border-color: #16a34a;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.15);
}

.phone-input span {
  padding: 0 14px;
  color: var(--text-secondary);
  font-weight: 700;
}

.phone-input input {
  border: 0;
  border-left: 1px solid var(--border-default);
  border-radius: 0;
  padding: 12px 14px;
}

.form-hint {
  color: var(--text-muted);
  font-size: 13px;
}

.recaptcha-box {
  min-height: 78px;
}

.form-message {
  padding: 12px 14px;
  border-radius: var(--radius-lg);
  font-weight: 600;
}

.form-message--error {
  background: rgba(239, 68, 68, 0.12);
  color: #dc2626;
}

.form-message--success {
  background: rgba(34, 197, 94, 0.12);
  color: #16a34a;
}

.legal-warning {
  margin-bottom: 24px;
  border-color: rgba(245, 158, 11, 0.35);
  background: rgba(245, 158, 11, 0.08);
}

.legal-retry:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

@media (max-width: 640px) {
  .legal-page {
    padding: 48px 0 72px;
  }

  .legal-card {
    padding: 24px;
  }
}
</style>
