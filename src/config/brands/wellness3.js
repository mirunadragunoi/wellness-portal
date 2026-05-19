export default {
  key: 'wellness3',
  name: 'Wellness3',
  portalName: 'Calmasoul',
  apiBaseUrl: 'https://api.rvdhub.com',
  countries: ['UK', 'CZ'],
  // External registration ("landing") URLs per country. When set for the
  // active country, all signup CTAs point here instead of the internal /signup.
  registrationUrls: {
    CZ: 'https://premium.calmasoul.com/czcalm/'
  },
  storagePrefix: 'wellness3',
  featureFlags: {
    brandedOverrides: true
  }
}
