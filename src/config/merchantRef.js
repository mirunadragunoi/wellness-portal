import { getMarket } from './market'
import { api } from '@/services/api'

/**
 * Merchant reference for ad visits (Calmasoul GB, DMB brief §2.8).
 *
 * On the first page of a visit that arrives with a click ID (gclid, fbclid…),
 * the backend stores the click ID and returns a short reference; the subscribe
 * redirect then appends that reference to the payment URL. The raw click ID is
 * never put in the URL to DMB. Instances without `market.merchantRef` do
 * nothing at all.
 *
 * The reference is kept in sessionStorage so that a visitor who lands on the
 * homepage and subscribes from another page still carries it. Storage may be
 * unavailable (private mode, blocked site data): everything degrades to "no
 * reference", never to an error.
 */

const STORAGE_KEY = 'merchant-ref'
let pending = null

function readStored() {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null')
  } catch {
    return null
  }
}

function store(value) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  } catch {
    // storage unavailable: the reference lives only for this page
  }
}

/** Call once at boot, before the router changes the URL. */
export function captureClickReference() {
  const config = getMarket()?.merchantRef
  if (!config) return

  const query = new URLSearchParams(window.location.search)
  const source = config.clickParams.find(name => query.get(name))
  if (!source) return

  const clickId = query.get(source)
  const stored = readStored()
  if (stored?.clickId === clickId && stored?.reference) return

  const utm = {}
  for (const [key, value] of query) {
    if (key.startsWith('utm_') && value) utm[key] = value
  }

  pending = api.createClickReference({
    click_source: source,
    click_id: clickId,
    entry_page: window.location.pathname,
    utm
  })
    .then(data => {
      if (data?.reference) {
        store({ clickId, reference: data.reference })
        return data.reference
      }
      return null
    })
    .catch(() => null)
}

/**
 * The payment URL with the visit's reference appended, if there is one. Waits
 * briefly for a reference still being created (a fast click right after
 * landing), then goes on without it rather than holding the visitor.
 */
export async function withMerchantRef(url, waitMs = 1500) {
  const config = getMarket()?.merchantRef
  if (!url || !config) return url

  let reference = readStored()?.reference
  if (!reference && pending) {
    reference = await Promise.race([
      pending,
      new Promise(resolve => setTimeout(() => resolve(null), waitMs))
    ])
  }
  if (!reference) return url

  const target = new URL(url)
  target.searchParams.set(config.param, reference)
  return target.toString()
}
