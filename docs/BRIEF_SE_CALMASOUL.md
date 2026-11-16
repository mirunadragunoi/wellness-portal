# Brief: Calmasoul Suedia (`se.calmasoul.com`)

> **Scris 2026-11-16**, din backendul real (RVDPlatform @ `5bb28bc`), nu din memorie: fiecare rută,
> valoare și nume de coloană de mai jos a fost verificat în cod sau în baza de date.
> **Starea:** backendul e scris și pe `main`; portalul suedez e partea care lipsește.
> Precedentul de clonat este **Calmasoul GB** (`src/config/markets/calmasoul-gb.js`, lansat
> 2026-11-09), cu patru deosebiri de fond — vezi §5.

---

## 1. Ce lansăm

Calmasoul în Suedia, prin agregatorul **Viatel**: abonament **lunar**, facturat pe factura de
telefon (DCB), **comandat pe landing page cu MSISDN + PIN**, nu în portal. Portalul servește
conținutul abonaților care s-au abonat deja și paginile legale.

Brandul e **`wellness3`** (Calmasoul), deci build-ul e `npm run build:wellness3`.

**Hostul este `se.calmasoul.com`.** Nu apexul, nu `www`: SMS-ul de chitanță trimite abonatul la
`https://se.calmasoul.com/dologin/<access_code>` după fiecare debitare reușită, deci ruta
`/dologin/<cod>` trebuie să funcționeze **pe hostul acela**.

---

## 2. Valorile pieței SE

| | valoare |
|---|---|
| țară (backend + `countries.js`) | `SE` |
| limbă (cod de **frontend**, minuscule) | `se` — vezi capcana din §6.2 pentru `<html lang>` |
| monedă / ciclu | SEK / lunar |
| preț | **199 kr/månad** — ⚠ propunere, neconfirmată încă de Viatel; în baza de date e deocamdată 49 |
| shortcode | **72300** |
| comanda de oprire | **`STOPP CALMA`** (nu „text STOP to …", ca pe GB) |
| email de suport | **`secs@cc-sms.com`** |
| telefon customer service | **nu există încă** — rămâne placeholder gol |
| firma | DNA Mobile Content Ltd, 168 Triq San Kristofru, Valletta VLT 1467, Malta · C 110955 · VAT MT31824004 |
| landing (de unde se abonează) | `https://premium.calmasoul.com/` |
| numere suedeze de ajutor, deja folosite în textul About din backend | **1177** (consiliere medicală), **112** (urgențe), **Mind Självmordslinjen 90101** |

⚠ **Nu inventa alte numere de ajutor și nu traduce cele britanice.** Textul About din baza de date
le conține deja pe cele suedeze; dacă apar și în UI, folosește exact aceleași.

---

## 3. Fișierele de atins

1. **`src/config/countries.js`** — un rând în `COUNTRIES`:
   `SE: { code: 'SE', defaultLanguage: 'se', languages: ['se'] }`, plus `se: 'SE'` în
   `SUBDOMAIN_COUNTRY`. (Fără `www`/apex: acelea sunt deja GB.)
2. **`src/config/markets/calmasoul-se.js`** — nou, modelat pe `calmasoul-gb.js`. Singurul loc în
   care se scriu prețul, telefonul de suport, footerul și placeholderele. Vezi §4 pentru formă.
3. **`src/config/market.js`** — `MARKETS.wellness3.SE = calmasoulSe` (plus importul).
4. **`src/i18n/locales/se.json`** — traducerea de **bază**, ~21 KB de chei (cât `en.json`).
   **Ăsta e cel mai mare efort din tot brief-ul**; plănuiește-l ca atare.
5. **`src/brands/wellness3/i18n/locales/se.json`** — overlay-ul de brand, 10 chei de nivel înalt
   (`brand`, `nav`, `hero`, `footer`, `auth`, `onboarding`, `home`, `learn`, `progress`, `profile`).
6. **`src/i18n/index.js`** — importurile noi, `BASE_LOCALES.se` și `BRAND_LOCALES.wellness3.se`.
   ⚠ **Și funcția `htmlLang()`** — vezi §6.2, e o schimbare de cod, nu de configurare.

Un overlay de piață (`src/brands/wellness3/i18n/markets/se.se.json`) **nu e necesar**: `se` există
doar pe piața suedeză, deci diferențele de formulare pot sta direct în overlay-ul de brand.

---

## 4. Forma lui `calmasoul-se.js`

Aceeași structură ca GB, cu patru lucruri schimbate și două scoase:

```js
placeholders: {
  '[DATUM]': '',              // data de intrare în vigoare a textelor legale
  '[SE TELEFONNUMMER]': ''    // telefonul de customer service
},
customerCareEmail: 'secs@cc-sms.com',
paymentUrl: null,             // SE nu are pagină de plată: abonarea e pe landing
merchantRef: null,            // DMB-specific, nu există la Viatel
subscribeUrl: 'https://premium.calmasoul.com/',
dateFormat: 'YYYY-MM-DD',     // convenția suedeză
htmlLang: 'sv-SE'             // ⚠ NU 'se' — vezi §6.2
```

⚠ **Cele două placeholdere sunt LITERALE în baza de date, fiecare de 12 ori** (`[DATUM]` și
`[SE TELEFONNUMMER]`). Mecanismul e identic cu GB: textele legale sunt copiate exact, cu marcajele
păstrate, iar `fillPlaceholders()` le completează la randare. O valoare goală **lasă marcajul
vizibil**, deliberat — un marcaj se vede, un număr inventat nu. Backendul nu le atinge: nu sunt
de tipul `#VAR_...#`.

**Notița de preț** trebuie să spună exact ce spun textele legale și SMS-urile, altfel pagina și
factura se contrazic. Propunere (de revizuit împreună cu restul textelor suedeze):

> `199 kr per månad, moms inkluderad. Avgiften läggs på din mobilräkning eller dras från ditt`
> `förbetalda saldo. Abonnemanget förnyas varje månad till dess att du skickar STOPP CALMA till 72300.`

Prima propoziție e copiată din termenii din baza de date, ca formularea să fie aceeași.

**Footer** (propunere, aceeași firmă ca pe GB):

> `Calmasoul tillhandahålls av DNA Mobile Content Ltd, 168 Triq San Kristofru, Valletta VLT 1467, Malta.`
> `Organisationsnummer C 110955 · VAT MT31824004`
> `Kundtjänst: secs@cc-sms.com · [SE TELEFONNUMMER]`
> `199 kr per månad till dess att du skickar STOPP CALMA till 72300.`

⚠ GB are și `eligibilityNotice` / `wellbeingNotice`, din reguli Ofcom. **Specificația suedeză nu
le cere pe portal**, deci nu le inventa; dacă Viatel sau TR cer echivalentul lor, locul lor e aici.

---

## 5. Cele patru deosebiri față de GB

1. **Nu există pagină de plată.** GB trimite fiecare CTA de abonare la `pay-gb.calmasoul.com`
   (găzduit de DMB). Pe SE abonarea se face pe **landing**, cu număr de telefon și PIN, deci
   `paymentUrl` e `null` și CTA-ul duce la `premium.calmasoul.com`.
2. **Nu există `merchantRef`.** E un mecanism DMB (`src/config/merchantRef.js`); Viatel nu-l are.
   Atribuirea pe SE se face pe landing, ca pe toate celelalte piețe.
3. **Oprirea e `STOPP CALMA` la 72300**, o comandă cu cuvânt-cheie, nu `STOP` la un shortcode
   dedicat brandului. Textul trebuie să conțină ambele părți: fără `CALMA`, SMS-ul ajunge la alt
   serviciu de pe același shortcode.
4. **Ciclul e lunar, nu săptămânal**, și moneda e SEK. Orice text care spune „per week" are nevoie
   de perechea suedeză, nu de o traducere a celui britanic.

---

## 6. Capcane

### 6.1 Până când conținutul e pus în producție, SE răspunde cu erori

Scriptul SQL cu paginile legale, FAQ-ul, About-ul și pagina de Customer Care suedeză e **scris și
validat, dar NU a fost încă rulat pe producție** (așteaptă prețul final și telefonul de suport).
Până atunci: rutele legale dau **2104**, iar `/wellness/about` dă **404 ERR_ABOUT_NOT_FOUND**.

Nu e un bug al frontendului și **nu există fallback pe engleză**: fallback-ul din `/wellness/about`
reinterogează aceeași țară, iar rândurile pe GB nu sunt implicite pentru nicio altă țară (join
strict pe țară). Dezvoltă pe dev sau tratează 404 ca stare așteptată.

### 6.2 ⚠ `<html lang="se">` înseamnă **sami de nord**, nu suedeză

`htmlLang()` din `src/i18n/index.js` citește `market.htmlLang` **numai când locale-ul e `en`**:

```js
function htmlLang(locale) {
  return (locale === 'en' && getMarket()?.htmlLang) || locale
}
```

Pe SE, locale-ul e `se`, deci funcția întoarce `'se'` — iar `se` e codul ISO 639-1 al **limbii sami
de nord**; suedeza e `sv`. Pagina s-ar declara în altă limbă decât e scrisă, pentru cititoare de
ecran, pentru Google și pentru traducerea automată. Nu dă nicio eroare și validează perfect.

Funcția trebuie să consulte piața pentru **orice** locale, nu doar pentru `en` — de exemplu
`getMarket()?.htmlLang || locale`, cu `htmlLang: 'sv-SE'` în configurația SE. ⚠ Verifică că GB
rămâne pe `en-GB` după schimbare (acolo locale-ul **este** `en`, deci merge în ambele variante).

Același lucru e valabil pentru codul de limbă al platformei: `se` e deliberat codul de **țară**, nu
cel al limbii — convenția e aceeași ca `cz` pentru cehă (ISO ar fi `cs`), deja documentată în
`countries.js`. Nu „corecta" `se` în `sv` în apelurile la backend: backendul caută conținutul pe
`se`/`SE`.

### 6.3 Diacriticele se scriu normal

å ä ö peste tot, fără excepție. (Restricția „fără diacritice" din platformă e despre textele SMS
ale altor limbi; pe suedeză nici acolo nu se aplică, fiindcă å ä ö sunt în alfabetul GSM-7.)

### 6.4 Majuscule/minuscule la `language`

Trimite `se` cu minuscule. Backendul normalizează singur: rutele legale fac `.upper()`, iar
`/wellness/about` compară `lower(trim(...)) = lower(:language)`. În baza de date conținutul legal e
pe `'SE'` cu majuscule și `store.portal_language` pe `'se'` cu minuscule — niciuna nu te privește
din frontend, dar explică de ce vezi ambele forme dacă te uiți în bază.

---

## 7. Contractul de backend (`api.rvdhub.com`)

Toate rutele există deja și nu se schimbă pentru SE.

| rută | note |
|---|---|
| `POST /wellness/auth/login` | login cu codul de acces; evenimentul **601** se loghează server-side, nu trimite nimic pentru el |
| `GET /wellness/about` | ⚠ `country` **obligatoriu**, fără `access_code`, răspuns cu envelope **plat** (`content`, `label`, `language`) |
| `GET /wellness/legals/terms` · `privacy` · `cookies_policy` · `unsubscribe` · `faq` · `customer_care` | `country=SE` **și** `language=se`; ⚠ fără `language` răspund `999 Internal Error`, nu „parametru lipsă" |
| `GET /wellness/legals/contact` | singura care **nu** primește `language` |
| `GET /wellness/products` | catalogul |
| `/wellness/mood`, `/wellness/mood/history`, `/wellness/breathing/*`, `/wellness/progress/*`, `/wellness/favorites`, `/wellness/user/profile` | neschimbate |
| `POST /wellness/logEvent` | **602** launch · **603** page_view · **604** consumption |
| `/wellness/UnsubscribePhoneNumber` | formularul de dezabonare din portal **funcționează pe SE**: `service_unsubman` e configurat pe deployment 54 (pe piețele unde lipsește, ruta răspunde `2048` pe un abonament viu) |

Pagina de **Customer Care** (`/wellness/legals/customer_care`) a apărut pe GB și SE e a doua piață
care o are: conținut separat de „contact", cu oprirea prin SMS, reclamații și rambursări.

---

## 8. Ce să nu faci

- **nimic legat de landing page** — e alt pipeline (`inspire_pin`, generat din
  `marketing.landing_setup` în RVDPlatform), nu ține de proiectul ăsta;
- **nu activa SE pe Harmonoria sau Innerawake** — doar `wellness3`;
- **nu rula deploy-ul** — îl rulează owner-ul (`deploy_wellness.py`);
- **nu pune prețul, telefonul de suport sau shortcode-ul direct în traduceri** — toate trei se
  schimbă încă, și trebuie să existe într-un singur loc, în configurația de piață;
- **nu traduce textele legale** — ele vin din baza de date, scrise și validate separat.

---

## 9. De verificat la final

1. `se.calmasoul.com/dologin/<cod>` intră în portal;
2. fiecare pagină legală apare în suedeză (nu în engleză, nu 2104);
3. **niciun `[DATUM]` sau `[SE TELEFONNUMMER]` rămas vizibil** într-o pagină randată;
4. `document.documentElement.lang` este **`sv-SE`**, nu `se` (§6.2), iar pe GB a rămas `en-GB`;
5. formularul de dezabonare trimite și primește răspuns;
6. 602/603/604 ajung pe `/wellness/logEvent`;
7. prețul, shortcode-ul și comanda de oprire sunt identice în UI, în notița de preț, în footer și
   în paginile legale venite din bază.

---

## 10. Ce rămâne în afara acestui brief

Prețul final (199 e propunere), telefonul de customer service, grila de payout și credențialele
Viatel — toate țin de backend și de Viatel, și sunt urmărite în
`RVDPlatform/docs/viatel/PLAN_IMPLEMENTARE.md` (§10 e secvența de lansare, §12 informațiile de la
2026-11-15). Textele suedeze propuse aici — notița de preț și footerul — intră în aceeași revizuire
ca textele legale, înainte de lansare.
