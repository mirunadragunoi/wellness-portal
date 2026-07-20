# Wellness Portal — Context pentru Claude

## Despre proiect
Platformă de **meditație și wellness** multi-brand: sesiuni audio ghidate, exerciții de respirație, povești pentru somn, mood tracking, statistici de progres, articole educative, video practice.

**Branduri active** (cu base/views/styling/i18n separate per brand):
- **wellness** (Harmonoria) — brand default, în `src/`
- **wellness2** (Innerawake) — în `src/brands/wellness2/`
- **wellness3** (Calmasoul) — în `src/brands/wellness3/`

---

## Stack tehnologic
- **Frontend:** Vue 3 (Composition API) + Vite
- **State:** Pinia (cu persistență localStorage)
- **Routing:** Vue Router 4
- **i18n:** Vue i18n
- **Audio:** Howler.js (singleton la nivel de modul în `useAudioPlayer.js`)
- **Grafice:** Chart.js + vue-chartjs
- **Date:** Dayjs
- **Icoane:** Iconify
- **UI:** Componente custom (fără UI library externă)
- **Backend:** API real per brand (vezi `src/services/api.js` + `src/config/brands/*.js`)

---

## Structura `src/`

**SIMETRIE COMPLETĂ:** toate cele 3 branduri trăiesc identic sub `src/brands/{wellness,wellness2,wellness3}/`. NU există master brand — Harmonoria (`wellness`) e tratat la fel ca celelalte. `src/` la nivel top conține DOAR cod partajat.

```
src/
├── brands/
│   ├── wellness/                  # Harmonoria — assets, components, constants, i18n, styles, views
│   ├── wellness2/                 # Innerawake — assets, components, constants, i18n, styles, views
│   └── wellness3/                 # Calmasoul — assets, components, constants, i18n, styles, views
│   #
│   # Fiecare brand are structură identică:
│   #   views/      LandingView, auth/{Login,Signup}, OnboardingView, HomeView, ExploreView,
│   #               ListenView, PracticeView, PracticeVideoView, session/SessionView,
│   #               breathing/BreathingView, learn/{LearnView,ArticleView}, ProgressView, ProfileView
│   #   components/ base/ landing/ home/ explore/ player/ breathing/ learn/ progress/ onboarding/ layout/
│   #   constants/  appIcons.js, landingImages.js
│   #   styles/     variables.css, base.css, typography.css, animations.css, utilities.css
│   #   assets/     landing/ + logo-uri
│   #   i18n/locales/ {en,ro,cz,sk}.json (overrides — doar diferențele față de base)
│   #
│   # ALIAS: vite.config.js redirecționează @/views/, @/components/, @/styles/, @/assets/,
│   # @/constants/ → src/brands/$brand/... pentru BRANDUL ACTIV (toate, inclusiv wellness).
│   # Deci importurile @/components/... din orice fișier se rezolvă la brandul curent.
│   #
│   # GOTCHA componente shared noi: dacă creezi o componentă în brands/wellness/components/
│   # și o imporți cu @/components/... dintr-un fișier brand-specific, TREBUIE copiată în
│   # toate 3 brandurile (altfel build-ul altui brand sparge ENOENT). Vezi memoria.
│   #
│   # GOTCHA inline rendering: wellness2/wellness3 randează frecvent INLINE în view-uri
│   # (LearnView, ExploreView) fără componentele din components/. Fix-urile trebuie aplicate
│   # în toate brandurile relevante.
│
├── legal/                       # LegalPageView.vue — view PARTAJAT (legal/about/contact/faq/
│                                # terms/privacy/cookies/unsubscribe). NU e per-brand; folosit
│                                # de router cu @/legal/ (nealiasat). Afișează navbar-ul brandului activ.
│
├── auth/                        # DoLoginView.vue — view PARTAJAT pentru ruta /dologin/:code
│                                # (auto-login din URL). NU e per-brand; @/auth/ (nealiasat).
│
├── config/
│   ├── brand.js                   # Resolver brand + country (din env / hostname / ?country=)
│   ├── countries.js               # COUNTRIES (UK/CZ/SK/RO/LV/FR), subdomainToCountry, getCountryConfig
│   └── brands/
│       ├── wellness.js            # Harmonoria — apiBase rvdhub, portalName "Harmonoria", companyName "Runvas Digital", countries: UK+SK+LV
│       ├── wellness2.js           # Innerawake — apiBase dnaperf, portalName "Innerawake", companyName "DNA Mobile Content", countries: UK
│       └── wellness3.js           # Calmasoul — apiBase dnaperf, portalName "Calmasoul", companyName "DNA Mobile Content", countries: UK+CZ+RO+FR
│
├── services/
│   └── api.js                     # `request()` — auto-injectează `portal_name` + `country` (UPPER) + `language` (lower)
│                                  # pe toate apelurile. Override dev: VITE_API_BASE_URL
│
├── stores/                      # auth, mood, player, products, progress, ui, user (Pinia + persist)
├── composables/                 # useAudioPlayer, useArticlePage, useBreathing, useGreeting, useNativePracticeVideoProgress
├── utils/                       # articleContent, audioDuration, cookies, productImageUrl, productKinds
├── data/                        # sessions.js, articles.js, phrases.js (mock — în uz parțial, deprecated treptat)
├── i18n/                        # index.js + locales/{en,ro,cz,sk,lv,fr}.json BASE neutru (overrides în brands/*/i18n/locales/)
├── router/                      # index.js
├── App.vue
└── main.js
```

**Partajat (în `src/`, nealiasat — un singur exemplar pentru toate brandurile):** `stores/`, `composables/`, `utils/`, `config/`, `services/`, `data/`, `router/`, `i18n/` (index + base locales), `legal/`, `auth/`, `App.vue`, `main.js`.

---

## Backend & date

**API endpoint principal:** `/wellness/products` (GET) — returnează catalog complet de produse.

**Product response shape** (mapat în `stores/products.js → mapProduct`):
- `type`: numeric (1=meditation, 2=sleep, 3=article, 4=breathing, 5=focus, 6=meditation/MP3)
- `icon_small` / `icon_large`: thumbnail (icon unic per produs)
- `banner_small` / `banner_medium` / `banner_large`: banner (poate fi partajat între produse)
- `url`: audio MP3 / PDF (pentru articole)
- `description_short` / `description_long`
- `code`: identifier intern (folosit pentru detectare categorie via keyword matching)

Categoria e derivată prin keyword matching pe `code`/`title` (`stress`, `sleep`, `focus`, etc.); fallback la `type` numeric.

**Routing catalogue → player corect** (`src/utils/productKinds.js → routeForProduct(product)`):
- `type === 'article'` sau `isMotivationalSpeechProduct(p)` → ruta `article` (text view)
- `type === 'practice'` (yoga/video, rawType=5) → ruta `practice-video` (video player)
- restul → ruta `session` (audio player)

Folosit în ~16 call-site-uri (HomeRecommended/HomeMomentOfDay/ExploreView/ProfileView favorites/PlayerPostSession/AppMiniPlayer + HomeView pe wellness2/3). **NU folosesc helper-ul intenționat:** `AppSOSOverlay` (id hardcoded `med-010`, mereu audio) și `ArticleView.listenAudio` (forțează audio session cu autoplay pentru un articol).

**Auto-inject pe toate apelurile** (din `services/api.js`):
- `portal_name` = brand identifier (`Harmonoria` / `Innerawake` / `Calmasoul`)
- `country` = cod țară 2 litere UPPERCASE (`UK` / `CZ` / `SK` / `RO` / `LV` / `FR`) — `UK` e legacy, nu ISO (`GB`)
- `language` = cod limbă 2 litere lowercase (`en` / `ro` / `cz` / `sk` / `lv` / `fr`) — `cz` e legacy, nu ISO (`cs`)

Pentru GET: ca query params. Pentru POST/PUT: în body.

**Pagini legale (`/wellness/legals/{faq,contact,terms,privacy,cookies_policy,unsubscribe}` + `/wellness/about`):**
- Backend-ul împachetează răspunsul într-un **envelope**: `{ treatment, error_code, error_description, <resursă> }`.
- Listele vin sub o cheie denumită după resursă (`faq`, `contact`), NU sub `data`/`items`. Paginile de conținut au `content` string direct în envelope (terms/privacy/cookies/unsubscribe).
- `LegalPageView.vue` normalizează generic: `firstArray()` găsește prima valoare-array din envelope (pt. faq/contact); altfel folosește `content`. **Nu hardcoda cheia resursei** — dacă apare o resursă nouă, `firstArray` o prinde.
- `getAbout` (în `api.js`) NU mai trimite `access_code` — se bazează doar pe `country` + `language` (auto-injectate). Celelalte `legals/*` primesc `access_code` doar dacă userul e logat, dar backend-ul nu îl folosește acolo.

**Contact — intro static + FAQ accordion** (în `LegalPageView.vue`):
- **Pagina Contact:** deasupra conținutului de la backend se randează un bloc intro static din i18n (`legal.contact_intro.{provider,faq,help}`), în ACELAȘI card (`.legal-card`) cu lista de contact, separat printr-o linie. Textul e un template per limbă cu `{brand}` (din `brand.name`) + `{company}` (din `getBrandConfig().companyName`) — deci fără duplicare per brand. Cuvântul „FAQ page" e `<RouterLink to="/faq">` randat via `<i18n-t>` (slot `faqLink`). Datele de contact (email/telefon) sunt evidențiate (mărite + bold; linkurile `mailto:`/`tel:` primesc culoarea brandului).
- **Pagina FAQ:** accordion (harmonică). Toate întrebările închise by default; click → deschide răspunsul (state `openFaqs: Set<index>`, se pot deschide mai multe simultan). Chevron rotativ + animație smooth via `grid-template-rows: 0fr → 1fr`.

**User-action logging → `store.portal_event_log`** (via `POST /wellness/logEvent`):
- Helper: `api.logEvent({ event_type, product?, page?, duration_seconds? })` în `services/api.js`. **Fire-and-forget** — nu aruncă, nu blochează caller-ul, înghite orice eroare rețea/parse. Auto-injectează `portal_name`/`country`/`language` (via `request()`); adaugă `access_code` din auth store-ul persistat în localStorage (citit direct din `localStorage['auth']`, NU prin import, ca să evite import circular — auth store importă `api`). Pe pagini publice loghează anonim.
- **Trei event types:** `602` launch (user pornește un produs), `603` page_view (fiecare navigare), `604` consumption (secunde efectiv consumate).
- **Call-sites:**
  - `router/index.js` `afterEach` → `603` la fiecare navigare; atașează `product` doar pe rutele de produs (`PRODUCT_ROUTES = {session, practice-video}`, unde `:id` e id numeric).
  - `useAudioPlayer.js` → `602` la load; `604` cu timp real ascultat (pauzele NU se numără). Flush pe final natural / schimbare sesiune / unmount / `beforeunload` → prinde și consum **parțial** (abandon la mijloc) fără heartbeat. State la nivel de modul (mirror la singleton-ul howl).
  - `useNativePracticeVideoProgress.js` → aceeași logică 602/604 pentru video native (MP4); ascultător `pause` pe `<video>`. YouTube/Vimeo iframe = out of scope.
  - `useArticlePage.js` → `602` la deschiderea unui articol (cu `product` pentru produse reale din store; fără pentru mock/demo).
- **Backend:** endpoint-ul `POST /wellness/logEvent` trebuie implementat ca datele să ajungă în `store.portal_event_log`. Până atunci apelurile eșuează silențios, fără efect pe UX.

---

## Country & limbă — arhitectură

**Detectare country** (în `src/config/brand.js → getCountryKey()`), priorități:
1. `?country=XX` URL param (dev/test override, normalizat upper)
2. Subdomain: `cz.` → CZ, `sk.` → SK, `ro.` → RO, `lv.` → LV, `fr.` → FR, `www.` sau apex → UK
3. Fallback: prima țară din allow-list-ul brand-ului

**Matrice brand × country × limbi disponibile** (`src/config/brands/*.js` → `countries[]` + `src/config/countries.js` → `COUNTRIES`):

| Brand        | Domain principal      | Subdomenii  | Country | Limbi disponibile  | Default |
|--------------|-----------------------|-------------|---------|---------------------|---------|
| Harmonoria   | harmonoria.com        | `www`/apex  | UK      | en, ro              | en      |
| Harmonoria   | harmonoria.com        | `sk.`       | SK      | sk                  | sk      |
| Harmonoria   | harmonoria.com        | `lv.`       | LV      | lv                  | lv      |
| Innerawake   | innerawake.com        | `www`/apex  | UK      | en, ro              | en      |
| Calmasoul    | calmasoul.com         | `www`/apex  | UK      | en, ro              | en      |
| Calmasoul    | calmasoul.com         | `cz.`       | CZ      | cz                  | cz      |
| Calmasoul    | calmasoul.com         | `ro.`       | RO      | ro                  | ro      |
| Calmasoul    | calmasoul.com         | `fr.`       | FR      | fr                  | fr      |

**Înregistrare externă per instanță** (`src/config/brands/*.js → registrationUrls`):
- Unele instanțe au un URL extern de înregistrare (landing premium) în loc de fluxul intern `/signup`. **Cheie = cod țară** (rezolvat din subdomeniu), fiindcă fiecare landing premium e o instanță de țară dedicată: Harmonoria `SK` (`sk.`) → `premium.harmonoria.com/skharm/click/`, Harmonoria `LV` (`lv.`) → `premium.harmonoria.com/lvharm/mo/`, Calmasoul `CZ` (`cz.`) → `premium.calmasoul.com/czcalm/`, Calmasoul `RO` (`ro.`) → `premium.calmasoul.com/rocalm/click/`, Calmasoul `FR` (`fr.`) → `premium.calmasoul.com/frcalm/click/` (**PLACEHOLDER** — încă nu există landing FR real; vezi `TODO(FR)` în `wellness3.js`).
- `RO` e o **țară** (subdomeniu `ro.`), distinctă de limba `ro` disponibilă sub UK. Calmasoul RO = piață românească dedicată cu landing premium; UK+ro = doar traducerea română a instanței UK (signup intern). Analog: `FR` (Calmasoul, `fr.`) e o piață dedicată; `LV` (Harmonoria, `lv.`) o piață dedicată cu limbă proprie.
- Helper: `getRegistrationUrl()` în `brand.js` — întoarce URL-ul pentru brand + country activ (`getCountryKey()`) sau `null`.
- Ruta `/signup` are `beforeEnter` care, dacă există URL extern, face `window.location.href = url`. Astfel TOATE CTA-urile care duc la `/signup` (navbar, hero, final CTA, preview, link signup din login) redirecționează automat extern.
- `quiz-float` din LandingView (wellness/wellness3) duce la `/onboarding`, deci e tratat separat: `<a href>` extern când există URL, altfel `RouterLink` intern.
- UK: fără URL extern → `/signup` intern. Instanță nouă = țară în `countries[]` + subdomeniu în `countries.js` + o linie (cheie = cod țară) în `registrationUrls`.

**Selectorul de limbă** (`components/layout/LanguageSelector.vue`):
- Afișat în navbar (Auth + Public) **doar dacă country are 2+ limbi** (deci doar pe UK momentan).
- La schimbare: persist în **cookie** (`{brand-storagePrefix}-locale-{country}`, ex: `calmasoul-locale-UK`), `SameSite=Lax`, max-age 1 an.
- După select, refresh `productsStore` pentru ca traducerile catalogului să vină de la backend cu noua limbă.

**Fișiere locale** (cheie = limbă, NU țară):
- `src/i18n/locales/{en,ro,cz,sk,lv,fr}.json` — base **NEUTRU** (fără referințe la branduri); `brand.name = "Wellness Portal"`, `footer.copy = "© 2026 All rights reserved."`, `onboarding.step4_body` fără numele brand-ului
- `src/brands/wellness/i18n/locales/{en,ro,cz,sk,lv}.json` — Harmonoria overrides (lv = piața Letonia)
- `src/brands/wellness2/i18n/locales/{en,ro}.json` — Innerawake overrides
- `src/brands/wellness3/i18n/locales/{en,ro,cz,fr}.json` — Calmasoul overrides (fr = piața Franța)

**Adăugare limbă NOUĂ** (ex: `lv`, `fr`): importurile în `src/i18n/index.js` sunt **statice**, deci nu e destul să pui fișierul JSON. Trebuie: (1) `src/i18n/locales/{lang}.json` base + (2) override-ul de brand `src/brands/{brand}/i18n/locales/{lang}.json`, apoi (3) în `index.js`: `import` base + brand, adaugă în `BASE_LOCALES`, `BRAND_LOCALES.{brand}` și `LOCALE_LABELS` (ex: `lv: 'Latviešu'`, `fr: 'Français'`).

**REGULĂ override:** în fișierele de brand pui **doar cheile care diferă** de base. `mergeMessages()` face deep-merge: cheile lipsă fallback la base. Pentru cele 3 branduri actuale, diferențele sunt în general:
- `brand.{name, tagline, description}` (mereu diferă)
- `footer.copy` (conține numele brand-ului)
- `onboarding.step4_body` (text cu numele brand-ului)
- `auth.*` (variate, fiecare brand are tagline/CTA-uri proprii pe Login/Signup)
- Pentru wellness3 (Calmasoul) în plus: `nav.cta`, `hero.*`, `home.recommended_title`, `learn.subtitle`, `progress.title`, `profile.title` (vocabular diferit "begin/stillness/your" vs base "start/balance/—")

**Nu duplica restul** — dacă în brand override apare exact aceeași valoare ca în base, șterge-o (curăță-te clutter).

**Schimbare valori brand-specifice:** modifică în `src/brands/{brand}/i18n/locales/`, NU în base (base e neutru, partajat).

**Dev override pentru test fără DNS:**
```
http://localhost:5173/?country=cz   # forțează CZ pe brand-ul curent (dacă e în allow-list)
http://localhost:5173/?country=sk   # SK
http://localhost:5173/?country=UK   # UK (sau orice case)
```
Override-ul prinde doar dacă country e în allow-list-ul brand-ului. Altfel cade pe default.

---

## Navigare & auth public

**Navbar public = meniu complet (paritate cu logat).** `AppNavbarPublic` (per brand) afișează ACELEAȘI link-uri ca `AppNavbarAuth` (Home/Explore/Practice/[Listen]/Learn/Progress; wellness n-are Listen), plus în dreapta selector limbă + Login + Signup. Apare pe landing și pe paginile legale când nu ești logat. Link-urile duc la rute `requiresAuth` → guard-ul din `router/index.js` redirecționează la `/login?redirect=...`. Deci „blocarea cu access code" e implicită prin guard, nu prin ascunderea meniului.

**Pagina de login are header.** `LoginView` (toate 3 brandurile) randează `AppNavbarPublic` în partea de sus; layout-ul rezervă spațiu cu `padding-top: var(--navbar-height)` (wellness2 e split-screen, logo-ul propriu din panou a fost scos ca să nu se dubleze).

**Flux CTA pe landing:**
- Header „Începe" + hero „Începe Călătoria" + FinalCTA + Preview → `/signup` → `beforeEnter` redirecționează la landing premium extern (când instanța are `registrationUrl`), altfel signup intern. **Direct, fără chestionar.**
- `quiz-float` (popup stânga jos) → MEREU `/onboarding` (chestionar). La final, `OnboardingView.finish()`: dacă `!auth.isLoggedIn` → `/signup` (deci → landing premium când există, sau signup intern UK); dacă logat → `/home`. (Userul a cerut explicit acest comportament.)

**Auto-login din URL — `/dologin/:code`** (`src/auth/DoLoginView.vue`, partajat, `meta.public`):
- Codul de la final acceptă fie **6 cifre** (`123456`), fie **prefix 2 litere mari + 6 cifre** (`RO123456`) — prefixul se ignoră (regex `^[A-Z]{2}\d{6}$` → `slice(2)`).
- Apelează `auth.login(code)`, apoi același flux ca LoginView (profil → `/home`, fără profil → `/onboarding`). La eroare → `router.replace('/login?error=invalid_code')`, iar LoginView afișează mesaj generic „cod invalid" (backend-ul nu distinge expirat vs invalid).
- NU are `hideForAuth` → rulează mereu, chiar dacă userul e deja logat (re-loghează cu noul cod).

**Footer — `unsubscribe` ascuns pe RO.** `AppFooter` (toate 3) calculează `isRO = getCountryKey() === 'RO'` și pune `v-if="!isRO"` pe link-ul de dezabonare. Ruta `/unsubscription` rămâne accesibilă direct prin URL — doar link-ul din footer e ascuns.

---

## Audio player — arhitectură

`useAudioPlayer.js` e **singleton la nivel de modul** — toate componentele (SessionView, PlayerAudio, AppMiniPlayer) împart același Howl.

**View ≠ Play (decoupled):**
- Click pe card → doar `router.push` (NU mai face `loadSession`)
- SessionView mount → fetch în `viewSession` local (NU `load()`)
- Pre-play afișează `viewSession`; mini-player + audio reflectă `playerStore.currentSession`
- `startPlay()` → `load(viewSession)` + `play()` → distruge howl-ul anterior

Comportament cerut explicit de user: audio-ul curent NU se oprește la navigare, doar la click pe Play. Nu modifica fără confirmare.

---

## Starea curentă a funcționalităților

### Implementat
- 3 branduri (Harmonoria / Innerawake / Calmasoul) cu override-uri views/styling/i18n
- Backend integration pentru catalog produse (`productsStore`)
- Player audio Howler.js (fișiere MP3 reale de la API)
- Player video pentru practice (`PracticeVideoView`)
- Onboarding multi-pas (8 pași)
- Catalog sesiuni cu filtrare pe categorii
- Mood check-in zilnic
- Exerciții de respirație (animație vizuală)
- Favorite sesiuni
- Buton SOS (pentru crize de anxietate)
- Statistici progres (streak, ore, grafice Chart.js)
- Articole educative (cu PDF de la API)
- Persistență date (localStorage via Pinia)
- Multi-country routing (subdomain → country, `?country=` dev override) — UK, SK, RO, CZ, LV, FR
- Multi-language i18n (en, ro, cz, sk, lv, fr) cu selector în navbar, persist în cookie
- User-action logging (602 launch / 603 page_view / 604 consumption) → `store.portal_event_log` via `api.logEvent` (fire-and-forget; necesită endpoint backend `POST /wellness/logEvent`)

### În tranziție / parțial
- **Migrare mock → API:** multe componente încă referă `thumbnailGradient` (placeholder) în loc de `thumbnail`/`banner` reale. Pattern recurent de bug-uri "imaginile nu apar pe X".
- **Brand override inline rendering:** wellness2/wellness3 randează frecvent inline în loc să folosească componentele partajate — fix-urile trebuie aplicate și în `src/brands/*/views/`.
- **Traduceri ro/cz/sk:** fișierele locale există ca stub-uri `{}`. Sursa de adevăr = `src/i18n/locales/en.json` (~180 chei) + brand overrides. Audit hardcoded EN finalizat — toate textele vizibile (titluri, butoane, labels, placeholder, tooltips, aria-labels) trec prin `t()`. User-ul va completa traducerile cu altă sesiune Claude.

### Lipsește / De făcut
- [ ] Autentificare reală (JWT / OAuth) — momentan auth mock
- [ ] Push notificări
- [ ] Pagina de profil completată
- [ ] Traduceri complete în ro/cz/sk

---

## Task-uri în lucru
- [ ] (niciun task activ momentan)
