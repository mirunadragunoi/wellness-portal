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

```
src/
├── views/                       # Pagini brand-ul default (wellness/Harmonoria)
│   ├── LandingView.vue            # / — landing public
│   ├── auth/{LoginView,SignupView}.vue
│   ├── OnboardingView.vue         # /onboarding — 8 pași
│   ├── HomeView.vue               # /home — dashboard
│   ├── ExploreView.vue            # /explore — catalog sesiuni
│   ├── ListenView.vue             # /listen — audio/MP3
│   ├── PracticeView.vue           # /practice — exerciții ghidate
│   ├── PracticeVideoView.vue      # /practice/:id — player video
│   ├── session/SessionView.vue    # /session/:id — player audio
│   ├── breathing/BreathingView.vue
│   ├── learn/{LearnView,ArticleView}.vue
│   ├── ProgressView.vue
│   └── ProfileView.vue
│
├── brands/
│   ├── wellness2/                 # Innerawake — assets, components, constants, i18n, styles, views
│   └── wellness3/                 # Calmasoul — assets, components, constants, i18n, styles, views
│   # IMPORTANT: wellness2/wellness3 randează frecvent INLINE în view-uri
│   # (LearnView, ExploreView), fără să folosească componentele partajate.
│   # Vezi memoria "Brand override gotcha".
│   # ALIAS gotcha: vite.config.js redirecționează @/components/ → src/brands/$brand/components/
│   # pentru brand-urile non-default. Orice componentă nouă în src/components/layout/X.vue
│   # importată cu @/components/layout/X.vue din fișiere brand-specific TREBUIE copiată
│   # în toate 3 brand-urile (src/ + wellness2/ + wellness3/), altfel build-ul sparge ENOENT.
│
├── components/                  # Componente partajate (pot fi suprascrise în brands/*/components)
│   ├── base/                      # BaseButton, BaseCard, BaseChip, BaseModal, BaseProgressBar, BaseSkeleton, BaseToast
│   ├── landing/                   # LandingHero, LandingFeatures, LandingHowItWorks, LandingMetrics, LandingPreview, LandingTestimonials, LandingFinalCTA
│   ├── home/                      # HomeGreeting, HomeMoodCheckin, HomeRecommended, HomeCategoriesGrid, HomeStreakCard, HomePhraseOfDay, HomeMomentOfDay
│   ├── explore/                   # ExploreCategoryChips, ExploreFilterPanel, ExploreSearch, ExploreSessionCard
│   ├── player/                    # PlayerPrePlay, PlayerAudio, PlayerPostSession
│   ├── breathing/                 # BreathingCircle, BreathingControls
│   ├── learn/                     # LearnArticleCard
│   ├── progress/                  # ProgressStatsGrid, ProgressMoodChart, ProgressSessionHistory
│   ├── onboarding/                # OnboardingProgressBar + steps/ (8 step-uri)
│   └── layout/                    # AppNavbarPublic, AppNavbarAuth, AppBottomBar, AppFooter, AppMiniPlayer, AppSOSButton, AppSOSOverlay
│
├── config/
│   ├── brand.js                   # Resolver brand + country (din env / hostname / ?country=)
│   ├── countries.js               # COUNTRIES (UK/CZ/SK), subdomainToCountry, getCountryConfig
│   └── brands/
│       ├── wellness.js            # Harmonoria — apiBase rvdhub, portalName "Harmonoria", countries: UK+SK
│       ├── wellness2.js           # Innerawake — apiBase dnaperf, portalName "Innerawake", countries: UK
│       └── wellness3.js           # Calmasoul — apiBase rvdhub, portalName "Calmasoul", countries: UK+CZ
│
├── services/
│   └── api.js                     # `request()` — auto-injectează `portal_name` + `country` (UPPER) + `language` (lower)
│                                  # pe toate apelurile. Override dev: VITE_API_BASE_URL
│
├── stores/                      # auth, mood, player, products, progress, ui, user (Pinia + persist)
├── composables/                 # useAudioPlayer, useArticlePage, useBreathing, useGreeting, useNativePracticeVideoProgress
├── utils/                       # articleContent, audioDuration, cookies, productImageUrl, productKinds
├── data/                        # sessions.js, articles.js, phrases.js (mock — în uz parțial, deprecated treptat)
├── constants/                   # appIcons.js, landingImages.js
├── i18n/                        # index.js + locales/{en,ro,cz,sk}.json (brand overrides în brands/*/i18n/locales/)
├── router/                      # index.js
├── styles/                      # variables.css, base.css, typography.css, animations.css, utilities.css
└── main.js
```

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
- `country` = cod țară 2 litere UPPERCASE (`UK` / `CZ` / `SK`) — `UK` e legacy, nu ISO (`GB`)
- `language` = cod limbă 2 litere lowercase (`en` / `ro` / `cz` / `sk`) — `cz` e legacy, nu ISO (`cs`)

Pentru GET: ca query params. Pentru POST/PUT: în body.

---

## Country & limbă — arhitectură

**Detectare country** (în `src/config/brand.js → getCountryKey()`), priorități:
1. `?country=XX` URL param (dev/test override, normalizat upper)
2. Subdomain: `cz.` → CZ, `sk.` → SK, `www.` sau apex → UK
3. Fallback: prima țară din allow-list-ul brand-ului

**Matrice brand × country × limbi disponibile** (`src/config/brands/*.js` → `countries[]` + `src/config/countries.js` → `COUNTRIES`):

| Brand        | Domain principal      | Subdomenii  | Country | Limbi disponibile  | Default |
|--------------|-----------------------|-------------|---------|---------------------|---------|
| Harmonoria   | harmonoria.com        | `www`/apex  | UK      | en, ro              | en      |
| Harmonoria   | harmonoria.com        | `sk.`       | SK      | sk                  | sk      |
| Innerawake   | innerawake.com        | `www`/apex  | UK      | en, ro              | en      |
| Calmasoul    | calmasoul.com         | `www`/apex  | UK      | en, ro              | en      |
| Calmasoul    | calmasoul.com         | `cz.`       | CZ      | cz                  | cz      |

**Selectorul de limbă** (`components/layout/LanguageSelector.vue`):
- Afișat în navbar (Auth + Public) **doar dacă country are 2+ limbi** (deci doar pe UK momentan).
- La schimbare: persist în **cookie** (`{brand-storagePrefix}-locale-{country}`, ex: `calmasoul-locale-UK`), `SameSite=Lax`, max-age 1 an.
- După select, refresh `productsStore` pentru ca traducerile catalogului să vină de la backend cu noua limbă.

**Fișiere locale** (cheie = limbă, NU țară):
- `src/i18n/locales/{en,ro,cz,sk}.json` — base **NEUTRU** (fără referințe la branduri); `brand.name = "Wellness Portal"`, `footer.copy = "© 2026 All rights reserved."`, `onboarding.step4_body` fără numele brand-ului
- `src/brands/wellness/i18n/locales/{en,ro,cz,sk}.json` — Harmonoria overrides
- `src/brands/wellness2/i18n/locales/{en,ro}.json` — Innerawake overrides
- `src/brands/wellness3/i18n/locales/{en,ro,cz}.json` — Calmasoul overrides

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
- Multi-country routing (subdomain → country, `?country=` dev override)
- Multi-language i18n (en, ro, cz, sk) cu selector în navbar, persist în cookie

### În tranziție / parțial
- **Migrare mock → API:** multe componente încă referă `thumbnailGradient` (placeholder) în loc de `thumbnail`/`banner` reale. Pattern recurent de bug-uri "imaginile nu apar pe X".
- **Brand override inline rendering:** wellness2/wellness3 randează frecvent inline în loc să folosească componentele partajate — fix-urile trebuie aplicate și în `src/brands/*/views/`.
- **Traduceri ro/cz/sk:** fișierele locale există ca stub-uri `{}`. Sursa de adevăr = `src/i18n/locales/en.json` (~180 chei) + brand overrides. Audit hardcoded EN finalizat — toate textele vizibile (titluri, butoane, labels, placeholder, tooltips, aria-labels) trec prin `t()`. User-ul va completa traducerile cu altă sesiune Claude.

### Lipsește / De făcut
- [ ] Autentificare reală (JWT / OAuth) — momentan auth mock
- [ ] Push notificări
- [ ] Pagina de profil completată
- [ ] Traduceri complete în ro/cz/sk
- [ ] Symmetrie completă brand wellness pentru views/components (Harmonoria în `src/brands/wellness/views/` + `components/`) — i18n e deja simetric, dar views/components rămân în `src/views/` + `src/components/`

---

## Task-uri în lucru
- [ ] (niciun task activ momentan)
