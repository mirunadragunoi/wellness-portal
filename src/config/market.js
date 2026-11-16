import { getBrandKey, getCountryKey } from './brand'
import calmasoulGb from './markets/calmasoul-gb'
import calmasoulSe from './markets/calmasoul-se'

/**
 * Per brand × country market settings that are neither brand-wide nor
 * country-wide (regulated launches). Today Calmasoul GB and SE; every other
 * instance gets null and behaves exactly as before.
 */
const MARKETS = {
  wellness3: { GB: calmasoulGb, SE: calmasoulSe }
}

export function getMarket() {
  return MARKETS[getBrandKey()]?.[getCountryKey()] || null
}

/**
 * Replace the market's placeholders that have a value. Unfilled placeholders
 * stay literal on purpose (see markets/calmasoul-gb.js).
 */
export function fillPlaceholders(text, market = getMarket()) {
  if (!market || !text) return text
  return Object.entries(market.placeholders || {}).reduce(
    (out, [token, value]) => (value ? out.replaceAll(token, value) : out),
    String(text)
  )
}
