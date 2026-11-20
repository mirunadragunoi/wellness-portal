import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { Icon } from '@iconify/vue'

import App    from './App.vue'
import router from './router/index.js'
import { i18n } from './i18n/index.js'
import { captureClickReference } from './config/merchantRef.js'
import { IS_APP } from './config/platform.js'

// Global styles
import '@/styles/variables.css'
import '@/styles/base.css'
import '@/styles/typography.css'
import '@/styles/animations.css'
import '@/styles/utilities.css'

// Create pinia with persistence
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// Bootstrap app
const app = createApp(App)
app.component('Icon', Icon)

app.use(pinia)
app.use(router)
app.use(i18n)

const t = i18n.global.t
document.title = `${t('brand.name')} — ${t('brand.tagline')}`
document.querySelector('meta[name="description"]')?.setAttribute('content', t('brand.description'))

// Traveler id (dtrv) -> merchant reference for the payment page (Calmasoul GB only).
captureClickReference()

if (IS_APP) {
  // App: restaurează sesiunea din Keystore/Keychain înainte de primul guard,
  // apoi leagă deep links + access gate (src/platform/app.js, chunk separat).
  import('./platform/app.js').then(m => m.bootstrapApp({ app, router, pinia }))
} else {
  app.mount('#app')
}
