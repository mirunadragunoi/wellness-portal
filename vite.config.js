import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const knownBrands = ['wellness', 'wellness2', 'wellness3']
  const envBrand = (env.VITE_BRAND || '').toLowerCase()
  const modeBrand = (mode || '').toLowerCase()
  const brand = knownBrands.includes(modeBrand)
    ? modeBrand
    : (knownBrands.includes(envBrand) ? envBrand : 'wellness')
  const baseAlias = [
    {
      find: '@',
      replacement: fileURLToPath(new URL('./src', import.meta.url))
    }
  ]

  const brandAlias = brand !== 'wellness'
    ? [
        {
          find: /^@\/views\//,
          replacement: fileURLToPath(new URL(`./src/brands/${brand}/views/`, import.meta.url))
        },
        {
          find: /^@\/components\//,
          replacement: fileURLToPath(new URL(`./src/brands/${brand}/components/`, import.meta.url))
        },
        {
          find: /^@\/styles\//,
          replacement: fileURLToPath(new URL(`./src/brands/${brand}/styles/`, import.meta.url))
        },
        {
          find: /^@\/assets\//,
          replacement: fileURLToPath(new URL(`./src/brands/${brand}/assets/`, import.meta.url))
        },
        {
          find: /^@\/constants\//,
          replacement: fileURLToPath(new URL(`./src/brands/${brand}/constants/`, import.meta.url))
        }
        // NOTE: NU adăuga alias pentru @/i18n/locales/ — i18n/index.js importă
        // explicit `src/i18n/locales/*.json` (base neutru) și `src/brands/*/i18n/locales/*.json`
        // (overrides per brand), apoi le merge-uiește cu mergeMessages(). Un alias aici
        // ar redirecționa importurile de base către folder-ul brand-ului, care nu
        // conține toate limbile și sparge build-ul.
      ]
    : []

  return {
    plugins: [vue()],
    resolve: {
      alias: [...brandAlias, ...baseAlias]
    },
    css: {
      preprocessorOptions: {}
    }
  }
})
