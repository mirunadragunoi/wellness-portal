/**
 * Platforma de build: web (implicit) sau aplicația mobilă (Capacitor).
 *
 * `VITE_PLATFORM` e înlocuit static de Vite la build, deci pe web `IS_APP` e
 * constanta `false` și toate ramurile `if (IS_APP)` sunt eliminate din bundle
 * (dead code). Comportamentul site-ului nu se schimbă.
 *
 * În aplicație, stratul nativ (@rvd/mobile-core din repo-ul rvd-mobile-portals)
 * e încărcat înaintea Vue și expune `window.RvdMobile`. Acesta e singurul
 * contract: aici nu importăm nimic din Capacitor.
 */
export const IS_APP = import.meta.env.VITE_PLATFORM === 'app'

/** Doar spike: RTL smoke test cu locale `ar` generat din `en` (VITE_RTL_SMOKE=1). */
export const RTL_SMOKE = IS_APP && import.meta.env.VITE_RTL_SMOKE === '1'

/** API-ul nativ (`window.RvdMobile`) sau null (web / încă neîncărcat). */
export function native() {
  if (!IS_APP || typeof window === 'undefined') return null
  return window.RvdMobile || null
}
