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
        },
        {
          find: /^@\/i18n\/locales\//,
          replacement: fileURLToPath(new URL(`./src/brands/${brand}/i18n/locales/`, import.meta.url))
        }
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
