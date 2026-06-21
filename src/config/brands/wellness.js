export default {
  key: 'wellness',
  name: 'Wellness',
  portalName: 'Harmonoria',
  apiBaseUrl: 'https://api.rvdhub.com',
  countries: ['UK', 'SK'],
  // External registration ("premium landing") URLs per COUNTRY (from subdomain).
  // When set for the active country, all signup CTAs point here instead of the
  // internal /signup. SK = sk.harmonoria.com.
  registrationUrls: {
    SK: 'https://premium.harmonoria.com/skharm/click/'
  },
  storagePrefix: 'wellness',
  featureFlags: {
    brandedOverrides: false
  }
}
