# Portal Vijesti - Online News Platform

Moderna web aplikacija za online novine izgrađena sa Next.js 15, TypeScript i Tailwind CSS. Potpuno funkcionalan news portal sa admin panelom za upravljanje sadržajem.

## Funkcionalnosti

- **Homepage** - Pregled najnovijih vijesti sa featured člancima
- **Kategorije** - Politika, Sport, Tehnologija, Zabava, Biznis, Zdravlje
- **Pojedinačni članci** - Puni prikaz članaka sa slikama i povezanim vijestima
- **Admin panel** - Dodavanje, uređivanje i brisanje članaka bez kodiranja
- **Pretraga** - Napredna pretraga sa filterima po kategoriji i datumu
- **Responsivan dizajn** - Optimiziran za desktop, tablet i mobilne uređaje
- **SEO optimizacija** - Meta tagovi, Open Graph i strukturirani podaci

## Instalacija

### Preduvjeti

- [Node.js](https://nodejs.org/) verzija 18 ili novija
- npm ili yarn package manager

### Koraci

1. **Preuzmite projekat**

   Ako ste preuzeli ZIP:
   ```bash
   # Raspakujte ZIP fajl
   # Otvorite terminal u tom folderu
   ```

   Ili klonirajte sa GitHub-a:
   ```bash
   git clone [URL_REPOZITORIJUMA]
   cd portal-vijesti
   ```

2. **Instalirajte dependencies**
   ```bash
   npm install
   ```

3. **Pokrenite development server**
   ```bash
   npm run dev
   ```

4. **Otvorite u browseru**
   ```
   http://localhost:3000
   ```

## Korištenje

### Javni dio sajta

| Stranica | URL | Opis |
|----------|-----|------|
| Homepage | `/` | Pregled svih vijesti |
| Kategorija | `/kategorija/[slug]` | Vijesti po kategoriji |
| Članak | `/vijest/[slug]` | Pojedinačni članak |
| Pretraga | `/pretraga` | Napredna pretraga |

### Admin panel

1. **Pristupite admin panelu**
   ```
   http://localhost:3000/admin/login
   ```

2. **Unesite lozinku**
   ```
   admin123
   ```

3. **Upravljanje člancima**
   - **Novi članak** - Kliknite "Novi članak" dugme
   - **Uredi** - Kliknite "Uredi" pored bilo kojeg članka
   - **Obriši** - Kliknite "Obriši" za uklanjanje članka
   - **Featured** - Označite članak kao istaknut na homepage-u

### Dodavanje novog članka

1. Idite na Admin panel → Novi članak
2. Popunite formu:
   - **Naslov** - Naslov vijesti
   - **Kategorija** - Izaberite iz dropdown-a
   - **Kratki opis** - Sažetak za preview
   - **Sadržaj** - Puni tekst članka
   - **URL slike** - Link do slike (ili ostavite prazno)
   - **Autor** - Ime autora
   - **Featured** - Da li je istaknuta vijest
3. Kliknite "Objavi članak"

## Struktura projekta

```
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout sa headerom i footerom
│   ├── not-found.tsx         # 404 stranica
│   ├── admin/
│   │   ├── login/page.tsx    # Admin login
│   │   ├── page.tsx          # Admin dashboard
│   │   ├── novi/page.tsx     # Kreiranje članka
│   │   └── uredi/[id]/page.tsx # Uređivanje članka
│   ├── vijest/
│   │   └── [slug]/page.tsx   # Pojedinačni članak
│   ├── kategorija/
│   │   └── [slug]/page.tsx   # Stranica kategorije
│   └── pretraga/
│       └── page.tsx          # Pretraga sa filterima
├── components/
│   ├── header.tsx            # Navigacija
│   ├── footer.tsx            # Footer
│   ├── sidebar.tsx           # Bočna traka
│   ├── article-card.tsx      # Kartica članka
│   └── admin-header.tsx      # Admin navigacija
├── lib/
│   ├── types.ts              # TypeScript tipovi
│   ├── mock-data.ts          # Početni podaci
│   ├── data-utils.ts         # Funkcije za rad sa podacima
│   └── admin-utils.ts        # Admin funkcije
└── public/
    └── *.jpg                 # Slike za članke
```

## Tehnologije

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Jezik**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI komponente**: [shadcn/ui](https://ui.shadcn.com/)
- **Ikone**: [Lucide React](https://lucide.dev/)
- **Storage**: localStorage (browser)


### Ostali hosting servisi

```bash
# Build za produkciju
npm run build

# Pokrenite produkcijski server
npm start
```

## Promjena lozinke za admin

Uredite fajl `lib/admin-utils.ts`:

```typescript
const ADMIN_PASSWORD = "vasa_nova_lozinka";
```

## Napomene

- Svi podaci se čuvaju u browser localStorage-u
- Podaci su vezani za browser - različiti browseri imaju različite podatke
- Za produkcijsku verziju preporučuje se integracija sa bazom podataka (Supabase, Neon, itd.)

## Proširenje sa bazom podataka

Za trajno čuvanje podataka, možete dodati Supabase integraciju:

1. Kreirajte Supabase projekat na [supabase.com](https://supabase.com)
2. Dodajte environment varijable
3. Zamijenite localStorage funkcije sa Supabase API pozivima


