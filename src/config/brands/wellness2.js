export default {
  key: 'wellness2',
  name: 'Wellness2',
  portalName: 'Innerawake',
  // Legal entity shown in Contact page intro. Innerawake = DNA Mobile Content.
  companyName: 'DNA Mobile Content',
  apiBaseUrl: 'https://api.dnaperf.com',
  countries: ['UK', 'RO'],
  // External registration ("premium landing") URLs per COUNTRY (from subdomain).
  // When set for the active country, all signup CTAs point here instead of the
  // internal /signup. RO = ro.innerawake.com. UK has no entry → internal /signup.
  registrationUrls: {
    RO: 'https://subscribe.innerawake.com/trezit/'
  },
  storagePrefix: 'wellness2',
  featureFlags: {
    brandedOverrides: true
  }
}
