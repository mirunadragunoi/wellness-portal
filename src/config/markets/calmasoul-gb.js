/**
 * Calmasoul — United Kingdom (gb.calmasoul.com, also www/apex), launched via
 * Dynamic Mobile Billing (DMB), regulated by Ofcom.
 *
 * THE single place for everything GB-specific that is still to be completed.
 * The legal pages (terms, privacy, customer-care) are served from the database
 * with their placeholders kept LITERAL (texts validated for compliance, copied
 * exactly); they are filled here, at render time, together with the footer and
 * the price notice. An empty value leaves the placeholder visible as-is, so a
 * missing value stays obvious instead of disappearing.
 */
export default {
  placeholders: {
    '[UK PHONE NUMBER]': '',
    '[SHORTCODE]': '',
    '[DATE]': '',              // effective date of the legal texts (all three are v1.0)
    '[ICO NUMBER]': '',        // privacy policy footer
    // UK GDPR Article 27 representative (privacy policy §1)
    '[NAME]': '',
    '[UK POSTAL ADDRESS]': '',
    '[EMAIL]': ''
  },

  // Brief §2.2 — exact wording, shown next to every subscribe button.
  priceNotice: '£4.50 per week until you text STOP to [SHORTCODE]. Charged to your mobile phone bill or deducted from your prepay credit.',
  eligibilityNotice: "For adults (18+). You must be the bill payer or have the bill payer's permission.",
  wellbeingNotice: 'Calmasoul is a wellbeing service. It is not a medical service and does not replace professional advice.',

  // Brief §2.3 — footer on every GB page.
  footerLines: [
    'Calmasoul is provided by DNA Mobile Content Ltd, 168 Triq San Kristofru, Valletta VLT 1467, Malta.',
    'Company number C 110955 · VAT MT31824004',
    'Customer Care: gbcs@cc-sms.com · [UK PHONE NUMBER] · Mon to Fri, 9:00 to 17:30 UK time',
    '£4.50 per week until you text STOP to [SHORTCODE].'
  ],
  customerCareEmail: 'gbcs@cc-sms.com',

  // DMB-hosted payment page (live; preview = https://preview-pay-gb.calmasoul.com/).
  // Not live yet. Every subscribe CTA goes here through /signup.
  paymentUrl: 'https://pay-gb.calmasoul.com/',

  // Extension point, NOT implemented: subscriber access after payment (DMB
  // redirect with a reference, tied to the `subscribe` notification). Waits for
  // the DMB documentation; until then subscribers log in with their access code.
  paymentReturn: null,

  dateFormat: 'DD/MM/YYYY',
  htmlLang: 'en-GB'
}
