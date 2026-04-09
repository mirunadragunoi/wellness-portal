# Wellness Portal — Context pentru Claude

## Despre proiect
Platformă de **meditație și wellness**: sesiuni audio ghidate, exerciții de respirație, povești pentru somn, mood tracking, statistici de progres.

---

## Stack tehnologic
- **Frontend:** Vue 3 (Composition API) + Vite
- **State:** Pinia (cu persistență localStorage)
- **Routing:** Vue Router 4
- **i18n:** Vue i18n
- **Audio:** Howler.js
- **Grafice:** Chart.js + vue-chartjs
- **Date:** Dayjs
- **Icoane:** Iconify
- **UI:** Componente custom (fără UI library externă)
- **Backend:** Niciun backend real — mock data + localStorage

---

## Structura `src/`

```
src/
├── views/                    # Pagini principale
│   ├── LandingView.vue         # / — landing public
│   ├── auth/
│   │   ├── LoginView.vue       # /login
│   │   └── SignupView.vue      # /signup
│   ├── OnboardingView.vue      # /onboarding — 8 pași
│   ├── HomeView.vue            # /home — dashboard
│   ├── ExploreView.vue         # /explore — catalog sesiuni
│   ├── session/
│   │   └── SessionView.vue     # /session/:id — player
│   ├── breathing/
│   │   └── BreathingView.vue   # /breathing/:type — exercițiu respirație
│   ├── learn/
│   │   ├── LearnView.vue       # /learn — articole
│   │   └── ArticleView.vue     # /learn/:id — articol individual
│   ├── ProgressView.vue        # /progress — statistici
│   └── ProfileView.vue         # /profile
│
├── components/
│   ├── base/                   # BaseButton, BaseCard, BaseChip, BaseModal,
│   │                           # BaseProgressBar, BaseSkeleton, BaseToast
│   ├── landing/                # LandingHero, LandingFeatures, LandingHowItWorks,
│   │                           # LandingMetrics, LandingPreview, LandingTestimonials, LandingFinalCTA
│   ├── home/                   # HomeGreeting, HomeMoodCheckin, HomeRecommended,
│   │                           # HomeCategoriesGrid, HomeStreakCard, HomePhraseOfDay, HomeMomentOfDay
│   ├── explore/                # ExploreCategoryChips, ExploreFilterPanel,
│   │                           # ExploreSearch, ExploreSessionCard
│   ├── player/                 # PlayerPrePlay, PlayerAudio, PlayerPostSession
│   ├── breathing/              # BreathingCircle, BreathingControls
│   ├── learn/                  # LearnArticleCard
│   ├── progress/               # ProgressStatsGrid, ProgressMoodChart, ProgressSessionHistory
│   ├── onboarding/             # OnboardingProgressBar + steps/ (8 step-uri)
│   └── layout/                 # AppNavbarPublic, AppNavbarAuth, AppBottomBar,
│                               # AppFooter, AppMiniPlayer, AppSOSButton, AppSOSOverlay
│
├── stores/                     # auth.js, mood.js, player.js, progress.js, ui.js, user.js
├── composables/                # useAudioPlayer.js, useBreathing.js, useGreeting.js
├── data/                       # sessions.js, articles.js, phrases.js (mock data)
├── constants/                  # appIcons.js, landingImages.js
├── i18n/                       # index.js + locales/en.json
├── router/                     # index.js
├── styles/                     # variables.css, base.css, typography.css,
│                               # animations.css, utilities.css
└── main.js
```

---

## Starea curentă a funcționalităților

### Implementat
- Autentificare mock (coduri statice, fără backend)
- Onboarding multi-pas (8 pași)
- Catalog sesiuni cu filtrare pe categorii
- Mood check-in zilnic
- Player audio (Howler.js — fișierele audio sunt `null` în mock data)
- Exerciții de respirație (animație vizuală)
- Favorite sesiuni
- Buton SOS (pentru crize de anxietate)
- Statistici progres (streak, ore, grafice Chart.js)
- Articole educative
- Persistență date (localStorage via Pinia)
- Internationalizare (i18n)

### Lipsește / De făcut
- [ ] Backend real + bază de date
- [ ] Autentificare reală (JWT / OAuth)
- [ ] Fișiere audio reale
- [ ] Imagini/thumbnailuri pentru sesiuni (acum sunt gradienți CSS)
- [ ] Push notificări
- [ ] Pagina de profil completată
- [ ] Localizare completă (doar `en.json` momentan)

---

## Task-uri în lucru
<!-- Adaugă task-urile aici pe măsură ce apar -->

- [ ] (niciun task activ momentan)
