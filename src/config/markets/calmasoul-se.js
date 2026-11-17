/**
 * Calmasoul — Sweden (se.calmasoul.com), launched through the aggregator
 * Viatel: a MONTHLY subscription charged to the phone bill (DCB), ordered on
 * the premium landing with MSISDN + PIN, not in the portal. The portal serves
 * the content of existing subscribers and the legal pages; the receipt SMS
 * sends them to se.calmasoul.com/dologin/<access_code> after each successful
 * charge.
 *
 * THE single place for everything SE-specific that is still to be completed.
 * The legal pages (terms, privacy, cookies, customer-care, faq) are served
 * from the database with their placeholders kept LITERAL — [DATUM] and
 * [SE TELEFONNUMMER], twelve times each — and are filled here, at render
 * time, exactly as GB fills its own. An empty value leaves the placeholder
 * visible as-is: a marker is noticed, an invented phone number is not.
 *
 * Differences from calmasoul-gb.js (the model): no payment page (the landing
 * takes the order), no merchantRef (a DMB mechanism Viatel does not have),
 * stopping is a keyword command and the cycle is monthly in SEK. Sweden does
 * not require the Ofcom eligibility / wellbeing notices on the portal, so
 * those two keys are deliberately absent.
 */

// The three values that are still moving. Written ONCE here: the price notice,
// the footer and (for the texts that come from the database) the legal pages
// all read them from this file, never from a translation.
// 199 kr is the final price, fixed on 2026-11-17 and matching the database (the texts
// there were brought from the 49 placeholder to 199 by se_viatel_price_199_sek.sql).
const PRICE = '199 kr'
// Shared shortcode: the keyword is what routes the SMS to Calmasoul. Without
// CALMA the message reaches another service on the same number, so every text
// must carry both parts.
const SHORTCODE = '72300'
const STOP_COMMAND = 'STOPP CALMA'

export default {
  placeholders: {
    '[DATUM]': '',              // effective date of the legal texts
    '[SE TELEFONNUMMER]': ''    // customer service phone — does not exist yet
  },

  // First sentence copied from the terms in the database, so the page and the
  // invoice say the same thing.
  priceNotice: `${PRICE} per månad, moms inkluderad. Avgiften läggs på din mobilräkning eller dras från ditt förbetalda saldo. Abonnemanget förnyas varje månad till dess att du skickar ${STOP_COMMAND} till ${SHORTCODE}.`,

  // Footer on every SE page.
  footerLines: [
    'Calmasoul tillhandahålls av DNA Mobile Content Ltd, 168 Triq San Kristofru, Valletta VLT 1467, Malta.',
    'Organisationsnummer C 110955 · VAT MT31824004',
    'Kundtjänst: secs@cc-sms.com · [SE TELEFONNUMMER]',
    `${PRICE} per månad till dess att du skickar ${STOP_COMMAND} till ${SHORTCODE}.`
  ],
  // The unsubscribe form works on SE (service_unsubman is configured), so the
  // link belongs in the footer next to the pages that come from the database.
  footerLinks: ['about', 'faq', 'terms', 'privacy', 'cookies', 'customer_care', 'unsubscribe'],
  customerCareEmail: 'secs@cc-sms.com',

  // No payment page: the order is placed on the premium landing with phone
  // number + PIN, which is also where attribution happens (hence no merchantRef).
  paymentUrl: null,
  merchantRef: null,
  subscribeUrl: 'https://premium.calmasoul.com/',
  paymentReturn: null,

  dateFormat: 'YYYY-MM-DD',
  // ⚠ NOT 'se': that is the ISO 639-1 code of Northern Sami. Swedish is 'sv'.
  // The frontend/backend language code stays 'se' (the project's country-based
  // convention, like 'cz' for Czech) — this value is only what <html lang> declares.
  htmlLang: 'sv-SE'
}
