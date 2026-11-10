import { getMarket } from './market'

/**
 * Merchant reference for the DMB payment page (Calmasoul GB, brief §2.8).
 *
 * It is the platform's traveler id `dtrv`, computed exactly like the landings
 * (rvd-landings, landingGlobalMixin): `?trv=` if given, else a generated UUID,
 * overwritten by the Google click ID — gclid as is, wbraid / gbraid with a
 * WBRAID / GBRAID prefix, each cut at the first comma. On the landings this
 * value ends in billing.subscription.affiliate_click_id and GoogleAdsApiManager
 * reads the prefixes, so the DMB notification handler can store merchantref
 * there and conversions follow the existing pipeline. No backend call.
 *
 * Kept in sessionStorage so a visitor who lands on one page and subscribes from
 * another carries the same id. Storage may be unavailable (private mode,
 * blocked site data): then the id lives for the current page only.
 */

const STORAGE_KEY = 'dtrv'

function firstValue(query, name) {
  const value = query.get(name)
  if (!value) return null
  const comma = value.indexOf(',')
  return comma > -1 ? value.slice(0, comma) : value
}

function newUuid() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID()
  // RFC 4122 v4 from Math.random: only for browsers without crypto.randomUUID
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

/** The traveler id carried by a URL, or null when the URL has none. */
function travelerIdFromUrl(query) {
  const gclid = firstValue(query, 'gclid')
  if (gclid) return gclid
  const wbraid = firstValue(query, 'wbraid')
  if (wbraid) return 'WBRAID' + wbraid
  const gbraid = firstValue(query, 'gbraid')
  if (gbraid) return 'GBRAID' + gbraid
  return query.get('trv') || null
}

let current = null

/** Call once at boot, before the router changes the URL. */
export function captureClickReference() {
  if (!getMarket()?.merchantRef) return

  // A click ID in the URL always wins (a new ad click in the same tab); without
  // one, keep the id of this visit, or start a new one.
  let stored = null
  try {
    stored = sessionStorage.getItem(STORAGE_KEY)
  } catch {
    stored = null
  }
  current = travelerIdFromUrl(new URLSearchParams(window.location.search)) || stored || newUuid()

  try {
    sessionStorage.setItem(STORAGE_KEY, current)
  } catch {
    // storage unavailable: the id lives only for this page
  }
}

/** The payment URL with the visit's traveler id appended as merchant reference. */
export function withMerchantRef(url) {
  const config = getMarket()?.merchantRef
  if (!url || !config || !current) return url

  const target = new URL(url)
  target.searchParams.set(config.param, current)
  return target.toString()
}
