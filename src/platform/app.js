/**
 * Bootstrap pentru build-ul de aplicație (VITE_PLATFORM=app). Încărcat dinamic
 * din main.js doar pe app, deci nu ajunge în bundle-ul web.
 *
 *  1. restaurează sesiunea din Keystore/Keychain (supraviețuiește ștergerii
 *     datelor WebView-ului), ÎNAINTE de primul guard al routerului;
 *  2. leagă access gate-ul (401 → /access-expired);
 *  3. leagă deep link-urile (calmasoul://dologin/123456 → /dologin/123456);
 *  4. montează aplicația.
 */
import { useAuthStore } from '@/stores/auth'
import { native } from '@/config/platform'

export async function bootstrapApp({ app, router, pinia }) {
  const rvd = native()
  if (!rvd) {
    console.error('[app] window.RvdMobile lipsește: rvd-mobile.js nu a fost încărcat. Pornesc ca web.')
    app.mount('#app')
    return
  }
  rvd.mark('vue-bootstrap')
  document.documentElement.classList.add('is-app', `is-app--${rvd.platform.name}`)

  const auth = useAuthStore(pinia)
  try {
    const stored = await rvd.session.load()
    if (stored?.accessCode && !auth.isLoggedIn) {
      auth.accessCode = stored.accessCode
      auth.isLoggedIn = true
      console.info('[app] sesiune restaurată din', rvd.session.backend)
    } else if (!stored && auth.isLoggedIn && auth.accessCode) {
      // Migrare: sesiune veche doar în localStorage → o copiem în storage-ul securizat.
      await rvd.session.save({ accessCode: auth.accessCode, country: '', savedAt: new Date().toISOString() })
    }
  } catch (e) {
    console.error('[app] restaurare sesiune', e)
  }

  rvd.access.onDenied(() => {
    const current = router.currentRoute.value.name
    if (current !== 'access-expired' && current !== 'login' && current !== 'dologin') {
      router.replace({ name: 'access-expired' })
    }
  })

  rvd.deepLinks.onOpen(path => router.push(path))

  app.mount('#app')
  rvd.mark('vue-mounted')
  router.isReady().then(() => rvd.mark('router-ready'))
}
