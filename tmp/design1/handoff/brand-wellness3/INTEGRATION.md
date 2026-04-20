# Handoff: Brand Wellness3 — "Midnight Bloom"

## Overview
Acesta este pachetul de integrare pentru **Brand v3 "Midnight Bloom"** al Wellness Portal — al treilea design de brand, complet diferit de v1 (Sky Blue) și v2 (Earthy Editorial). Conceptul: dark-first, imersiv, cu animații legate de clear mind și liniște.

> ⚠️ **Important:** Fișierele HTML din `../../ui_kits/wellness-app/` sunt **prototipuri de design în HTML+React** — referințe vizuale, nu cod de producție. Sarcina este să **recreezi aceste design-uri în codebase-ul Vue 3 existent**, folosind structura și pattern-urile deja stabilite.

## Fidelitate
**High-fidelity** — prototipul este pixel-accurate ca intenție vizuală. Respectă exact culorile, tipografia, spacing-ul și animațiile descrise mai jos. Adaptează implementarea la Vue 3 Composition API + Vite.

---

## Cum se integrează în repo-ul existent

### Structura repo-ului tău actual
```
wellness-portal/          ← repo v1 (Sky Blue)
└── src/
    ├── brands/
    │   └── wellness2/    ← assets pentru brand v2
    ├── styles/           ← variables.css, base.css, typography.css etc.
    └── ...

wellness-portal-v2/       ← repo v2 (Earthy Editorial) — codebase separat
```

### Opțiunea recomandată: repo nou `wellness-portal-v3`

**Pasul 1 — Clonează v2 ca punct de start:**
```bash
# Clonează wellness-portal-v2 și creează un nou repo
git clone https://github.com/mirunadragunoi/wellness-portal-v2 wellness-portal-v3
cd wellness-portal-v3
git remote set-url origin <noul-tau-repo-url>
```

**Pasul 2 — Înlocuiește styles/variables.css:**
Copiază `styles/variables.css` din acest pachet peste `src/styles/variables.css` din repo.

**Pasul 3 — Actualizează fonturile în index.html:**
```html
<!-- Înlocuiește orice import de font existent cu: -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@300;400;500&family=Nunito:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

**Pasul 4 — Adaugă animations.css:**
Copiază `styles/animations.css` din acest pachet în `src/styles/animations.css`.

**Pasul 5 — Actualizează base.css:**
Copiază `styles/base.css` din acest pachet peste `src/styles/base.css`.

**Pasul 6 — Adaugă componenta MindCanvas:**
Copiază `components/MindCanvas.vue` în `src/components/landing/MindCanvas.vue`.
Folosește-o în `LandingView.vue` în secțiunea hero.

**Pasul 7 — Actualizează BaseButton.vue:**
Copiază `components/BaseButton.vue` peste `src/components/base/BaseButton.vue`.

**Pasul 8 — Actualizează ExploreSessionCard.vue:**
Copiază `components/SessionCard.vue` peste `src/components/explore/ExploreSessionCard.vue`.

---

## Design Tokens (v3 Midnight Bloom)

### Culori principale
| Token | Valoare | Utilizare |
|-------|---------|-----------|
| `--violet` | `#a78bfa` | Brand primary, accente, active states |
| `--teal` | `#2dd4bf` | Brand secondary, teal accente |
| `--rose` | `#f9a8d4` | Highlight, favorites, warmth |
| `--blue` | `#7c9fff` | Informational, link |
| `--amber` | `#fbbf24` | Streak, warmth, energie |
| `--bg` | `#070d1a` | Background principal (dark) |
| `--bg2` | `#0d1628` | Background secundar |
| `--glass` | `rgba(255,255,255,0.055)` | Glass card surface |
| `--glass-border` | `rgba(255,255,255,0.10)` | Glass card border |
| `--text` | `#e8edf8` | Text primar |
| `--muted` | `rgba(232,237,248,0.55)` | Text secundar |
| `--faint` | `rgba(232,237,248,0.3)` | Text terțiar, placeholder |

### Tipografie
| Token | Valoare |
|-------|---------|
| `--font-d` | `'Cinzel', Georgia, serif` |
| `--font-b` | `'Nunito', system-ui, sans-serif` |

**Cinzel** — fondul display pentru titluri, navbar logo, headings majore. Greutăți: 300, 400, 500.
**Nunito** — body, butoane, labels, meta. Greutăți: 300, 400, 500, 600, 700.

### Radius
| Token | Valoare | Utilizare |
|-------|---------|-----------|
| `--r-sm` | `10px` | Butoane mici, badge-uri |
| `--r` | `16px` | Carduri standard |
| `--r-lg` | `24px` | Carduri mari, modals |
| `--r-xl` | `32px` | Hero elements |
| `--r-full` | `999px` | Pills, avatare, chips |

### Shadows (glass-style, fără offset dur)
| Token | Valoare |
|-------|---------|
| `--shadow-sm` | `0 4px 24px rgba(0,0,0,0.3)` |
| `--shadow-md` | `0 8px 32px rgba(0,0,0,0.4)` |
| `--shadow-lg` | `0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(167,139,250,0.12)` |
| `--shadow-glow` | `0 0 30px rgba(167,139,250,0.4)` |

---

## Screens / Views

### 1. Landing Page (`/`)
**Layout:** Full-viewport hero cu grid 2 coloane (text stânga, animație dreapta) pe desktop; single column pe mobil.

**Hero stânga:**
- Badge pill: `rgba(167,139,250,.1)` bg, border `rgba(167,139,250,.25)`, text `--violet`, font Nunito 11px uppercase letterSpacing 2.5px
- H1: Cinzel 400, `clamp(44px, 5.5vw, 72px)`, letterSpacing 1px, color `--text`. Cuvântul cheie ("stillness") are gradient text: `linear-gradient(135deg, #a78bfa, #2dd4bf)`
- Subtitle: Nunito 18px, color `--muted`, lineHeight 1.8
- CTA primary: gradient button `linear-gradient(135deg, #a78bfa, #2dd4bf)`, color `#070d1a`, borderRadius `--r-full`
- CTA secondary: glass button `rgba(255,255,255,.05)`, border `rgba(255,255,255,.1)`

**Hero dreapta:** Componenta `<MindCanvas>` (animație particule — vezi `components/MindCanvas.vue`)

**Culoare secțiuni:**
- Features: `rgba(255,255,255,.02)` bg cu `border-top/bottom: 1px solid rgba(255,255,255,.05)`
- How It Works: transparent (bg principal `#070d1a`)
- Metrics: același ca Features
- CTA section: card cu `linear-gradient(135deg,rgba(167,139,250,.12),rgba(45,212,191,.08))`, border `rgba(167,139,250,.2)`

### 2. Auth (`/login`, `/signup`)
**Layout:** Centrat vertical și orizontal, max-width 420px.
- Card: `rgba(255,255,255,.055)` bg, blur(24px), border `rgba(255,255,255,.1)`, borderRadius `--r-xl`
- Mode toggle (Login/Signup): pill toggle cu `rgba(255,255,255,.05)` bg
- Inputs: `rgba(255,255,255,.06)` bg, border `rgba(255,255,255,.12)`, focus border `rgba(167,139,250,.6)`, focus shadow `0 0 0 3px rgba(167,139,250,.12)`

### 3. Onboarding (`/onboarding`)
**Layout:** Full-screen, centrat, max-width 520px. Progress bar Cinzel thin linie 3px.
- Steps: 6 pași cu selecție interactivă
- Selected item: `rgba(167,139,250,.15)` bg, border `rgba(167,139,250,.6)`, glow `0 0 20px rgba(167,139,250,.2)`
- Loading final: `<BreathingOrb>` animat + progress bar gradient

### 4. Home (`/home`)
**Layout:** Padding-bottom pentru bottom bar. Header cu gradient `rgba(167,139,250,.06) → transparent`.
- Cards de statistici: glass card `rgba(255,255,255,.055)`, border `rgba(255,255,255,.09)`, blur(16px)
- Streak dots completate: gradient `var(--violet) → var(--teal)` cu glow
- Moment of Day: gradient card `rgba(124,159,255,.12) → rgba(45,212,191,.08)` cu play button
- Category buttons: CSS gradient backgrounds cu `translateY(-3px) scale(1.02)` pe hover

### 5. Explore (`/explore`)
**Layout:** Header cu search pill + chip filters; grid `auto-fill minmax(220px, 1fr)`.
- Session cards: glass morphism — `rgba(255,255,255,.055)` bg, blur(20px)
- Thumbnail: CSS gradient (nu imagine) cu overlay `linear-gradient(to top, rgba(7,13,26,.65), transparent 55%)`
- Hover: `translateY(-5px) scale(1.01)` + deep shadow + violet border

### 6. Learn (`/learn`)
**Layout:** Header search + chips; grid `auto-fill minmax(300px, 1fr)` pe desktop, 1fr pe mobil.
- Article cards: același glass style ca session cards, cu imagine placeholder 120px înălțime

### 7. Progress (`/progress`)
**Layout:** 2x2 stats grid + mood chart + recent sessions list.
- Stats: numere mari Cinzel cu gradient text `culoare → white`
- Mood bars: gradient `var(--violet) → var(--blue)` cu glow `0 0 10px rgba(167,139,250,.25)`

### 8. Profile (`/profile`)
**Layout:** Header dark cu avatar + info; secțiuni glass card stacked.
- Avatar: gradient background cu `box-shadow: 0 0 28px rgba(167,139,250,.3)`
- Settings rows: `border-top: 1px solid rgba(255,255,255,.05)` separator

### 9. Player (`/session/:id`)
**Layout:** Full-screen dark, thumbnail mare (35vw height), controls centrate.
- Play button: 68px, gradient `var(--violet) → var(--teal)`, glow `0 0 30px rgba(167,139,250,.4)`
- Scrubber: `input[type=range]` custom stilizat
- Hover play: `scale(1.06)` + glow mai intens

### 10. Breathing (`/breathing/:type`)
**Layout:** Full-screen centrat, cerc animat + controls jos.
- Cerc: breathing animation CSS cu `animation: breathe dur ease-in-out infinite`
- Culoare cerc: se schimbă per fază (Inhale=teal, Hold=amber, Exhale=violet)

---

## Animații

### Breathing (CSS)
```css
@keyframes breathe {
  0%, 100% { transform: scale(1); opacity: .7; }
  50% { transform: scale(1.2); opacity: 1; }
}
```
Folosit pe `.breath-core` cu `animation-duration` variabil per fază.

### Page Transition
```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: none; }
}
.page-in { animation: fadeUp .35s cubic-bezier(.4,0,.2,1) both; }
```

### Glass card hover
```css
transition: all 250ms cubic-bezier(.4,0,.2,1);
/* hover: */
transform: translateY(-5px) scale(1.01);
box-shadow: 0 20px 60px rgba(0,0,0,.5), 0 0 40px rgba(167,139,250,.12);
border-color: rgba(167,139,250,.35);
```

### MindCanvas (JS/Canvas)
Vezi `components/MindCanvas.vue` — animație canvas cu 220 particule care spiralează spre centru, trail effect, ripple la dizolvare. Nu folosește librării externe.

---

## Navbar

**Desktop navbar (auth):**
- `position: sticky; top: 0; z-index: 90`
- Background: `rgba(7,13,26,.88)` + `backdrop-filter: blur(20px)`
- Border-bottom: `1px solid rgba(255,255,255,.07)`
- Înălțime: `66px` (`--nb: 66px`)
- Active link: `color: var(--violet)` + `border-bottom: 2px solid var(--violet)`

**Mobile bottom bar:**
- `position: fixed; bottom: 0`
- Background: `rgba(7,13,26,.94)` + blur(20px)
- Border-top: `1px solid rgba(255,255,255,.08)`
- Înălțime: `62px` (`--bb: 62px`)
- Active icon: `stroke: var(--violet)` + `strokeWidth: 2.5`

---

## Responsive Breakpoints
- Mobile: `< 768px` → single column, font sizes mici, hide desktop nav
- Desktop: `≥ 768px` → grid layouts, desktop navbar vizibil

---

## Assets
- **Fonturi:** Cinzel + Nunito via Google Fonts (nu sunt fișiere locale)
- **Imagini:** Fără imagini în v3 — session thumbnails sunt CSS gradients
- **Icoane:** Iconify cu Lucide (același ca v1/v2) — `@iconify/vue`
- **Audio:** Howler.js (același ca v1/v2, nicio schimbare)

---

## Fișiere incluse în pachet
```
handoff/brand-wellness3/
├── INTEGRATION.md          ← acest fișier
├── styles/
│   ├── variables.css       ← CSS tokens v3 (înlocuiește src/styles/variables.css)
│   ├── base.css            ← Base styles dark mode (înlocuiește src/styles/base.css)
│   └── animations.css      ← Animații v3 (înlocuiește src/styles/animations.css)
└── components/
    ├── MindCanvas.vue      ← Animația "Clear Mind" (nou, în src/components/landing/)
    ├── BaseButton.vue      ← Button v3 glass style (înlocuiește src/components/base/)
    └── SessionCard.vue     ← Session card glass (înlocuiește ExploreSessionCard.vue)
```

**Referință vizuală completă:** `../../ui_kits/wellness-app/index.html`
