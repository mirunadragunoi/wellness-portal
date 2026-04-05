import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App    from './App.vue'
import router from './router/index.js'
import { i18n } from './i18n/index.js'

// Global styles
import './styles/variables.css'
import './styles/base.css'
import './styles/typography.css'
import './styles/animations.css'
import './styles/utilities.css'

// Create pinia with persistence
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// Bootstrap app
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(i18n)

app.mount('#app')
