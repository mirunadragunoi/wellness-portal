export default {
  key: 'wellness3',
  name: 'Wellness3',
  portalName: 'Calmasoul',
  apiBaseUrl: 'https://api.rvdhub.com',
  countries: ['UK', 'CZ', 'RO'],
  // External registration ("premium landing") URLs per COUNTRY (from subdomain).
  // When set for the active country, all signup CTAs point here instead of the
  // internal /signup. CZ = cz.calmasoul.com, RO = ro.calmasoul.com.
  registrationUrls: {
    CZ: 'https://premium.calmasoul.com/czcalm/',
    RO: 'https://premium.calmasoul.com/rocalm/click/'
  },
  storagePrefix: 'wellness3',
  featureFlags: {
    brandedOverrides: true
  }
}
