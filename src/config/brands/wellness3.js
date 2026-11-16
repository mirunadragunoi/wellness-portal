import calmasoulGb from '../markets/calmasoul-gb'
import calmasoulSe from '../markets/calmasoul-se'

export default {
  key: 'wellness3',
  name: 'Wellness3',
  portalName: 'Calmasoul',
  // Legal entity shown in Contact page intro. Calmasoul = DNA Mobile Content.
  companyName: 'DNA Mobile Content',
  apiBaseUrl: 'https://api.dnaperf.com',
  countries: ['GB', 'CZ', 'RO', 'FR', 'SE'],
  // GB is English only on Calmasoul (DMB launch); the legal pages exist in EN only.
  countryLanguages: { GB: ['en'] },
  // External registration ("premium landing") URLs per COUNTRY (from subdomain).
  // When set for the active country, all signup CTAs point here instead of the
  // internal /signup. CZ = cz.calmasoul.com, RO = ro.calmasoul.com, FR = fr.calmasoul.com,
  // GB = gb.calmasoul.com (and www/apex) -> the DMB payment page,
  // SE = se.calmasoul.com -> the Viatel landing, which takes the order with MSISDN + PIN.
  registrationUrls: {
    GB: calmasoulGb.paymentUrl,
    SE: calmasoulSe.subscribeUrl,
    CZ: 'https://premium.calmasoul.com/czcalm/',
    RO: 'https://premium.calmasoul.com/rocalm/click/',
    // TODO(FR): PLACEHOLDER — no premium landing yet. Replace with the real URL before FR go-live.
    FR: 'https://premium.calmasoul.com/frcalm/click/'
  },
  storagePrefix: 'wellness3',
  featureFlags: {
    brandedOverrides: true
  }
}
