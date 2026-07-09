export default {
  key: 'wellness',
  name: 'Wellness',
  portalName: 'Harmonoria',
  // Legal entity shown in Contact page intro. Harmonoria = Runvas Digital.
  companyName: 'Runvas Digital',
  apiBaseUrl: 'https://api.rvdhub.com',
  countries: ['UK', 'SK', 'LV'],
  // External registration ("premium landing") URLs per COUNTRY (from subdomain).
  // When set for the active country, all signup CTAs point here instead of the
  // internal /signup. SK = sk.harmonoria.com, LV = lv.harmonoria.com.
  registrationUrls: {
    SK: 'https://premium.harmonoria.com/skharm/click/',
    LV: 'https://premium.harmonoria.com/lvharm/mo/'
  },
  storagePrefix: 'wellness',
  featureFlags: {
    brandedOverrides: false
  }
}
