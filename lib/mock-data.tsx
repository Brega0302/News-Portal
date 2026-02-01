import type { Article, Category } from "./types"

export const categories: Category[] = [
  {
    id: "1",
    name: "Politika",
    slug: "politika",
    description: "Najnovije vijesti iz političke scene",
    color: "#dc2626",
  },
  {
    id: "2",
    name: "Sport",
    slug: "sport",
    description: "Sportske vijesti i rezultati",
    color: "#16a34a",
  },
  {
    id: "3",
    name: "Tehnologija",
    slug: "tehnologija",
    description: "Tech vijesti i inovacije",
    color: "#2563eb",
  },
  {
    id: "4",
    name: "Zabava",
    slug: "zabava",
    description: "Showbiz i entertainment",
    color: "#dc2626",
  },
  {
    id: "5",
    name: "Biznis",
    slug: "biznis",
    description: "Ekonomske vijesti i tržište",
    color: "#059669",
  },
  {
    id: "6",
    name: "Zdravlje",
    slug: "zdravlje",
    description: "Zdravstvene vijesti i savjeti",
    color: "#7c3aed",
  },
]

export const mockArticles: Article[] = [
  {
    id: "1",
    title: "Novi zakon o digitalnoj transformaciji stupio na snagu",
    slug: "novi-zakon-digitalna-transformacija",
    excerpt:
      "Vlada je danas usvojila novi zakon koji će ubrzati digitalnu transformaciju javnih službi i olakšati građanima pristup e-uslugama.",
    content: `
      <p>Vlada je danas usvojila novi zakon o digitalnoj transformaciji koji će značajno ubrzati proces modernizacije javnih službi u našoj zemlji.</p>
      
      <p>Ovaj zakon predviđa da će do kraja 2025. godine sve javne institucije morati da digitalizuju svoje usluge i omoguće građanima online pristup.</p>
      
      <h3>Ključne odredbe zakona:</h3>
      <ul>
        <li>Obavezna digitalizacija svih javnih usluga</li>
        <li>Jedinstveni portal za sve e-usluge</li>
        <li>Digitalni identitet za sve građane</li>
        <li>Automatska razmjena podataka između institucija</li>
      </ul>
      
      <p>Ministar za digitalnu transformaciju izjavio je da će ovaj zakon značajno olakšati život građanima i smanjiti birokraciju.</p>
    `,
    imageUrl: "/digital-transformation-government-building.jpg",
    category: categories[0],
    author: "Marko Petrović",
    publishedAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    featured: true,
    tags: ["digitalizacija", "vlada", "e-usluge"],
    readTime: 3,
  },
  {
    id: "2",
    title: "Fudbalska reprezentacija pobjedila u prijateljskoj utakmici",
    slug: "reprezentacija-pobjeda-prijateljska",
    excerpt:
      "Naša fudbalska reprezentacija pobijedila je večeras selekciju Sjeverne Makedonije rezultatom 2:1 u prijateljskoj utakmici.",
    content: `
      <p>U uzbudljivoj prijateljskoj utakmici na Olimpijskom stadionu, naša fudbalska reprezentacija je pobijedila Sjevernu Makedoniju rezultatom 2:1.</p>
      
      <p>Golove za našu reprezentaciju postigli su Miloš Jovanović u 23. minuti i Stefan Nikolić u 67. minuti, dok je jedini gol za goste postigao Aleksandar Trajkovski u 45. minuti.</p>
      
      <h3>Statistike utakmice:</h3>
      <ul>
        <li>Posjed lopte: 58% - 42%</li>
        <li>Šutevi na gol: 7 - 4</li>
        <li>Korneri: 6 - 3</li>
        <li>Žuti kartoni: 2 - 3</li>
      </ul>
      
      <p>Selektor je izrazio zadovoljstvo igrom tima i najavio da će ova postava biti osnova za nadolazeće kvalifikacije.</p>
    `,
    imageUrl: "/football-match-celebration-players.jpg",
    category: categories[1],
    author: "Ana Stojanović",
    publishedAt: "2024-01-14T22:15:00Z",
    updatedAt: "2024-01-14T22:15:00Z",
    featured: true,
    tags: ["fudbal", "reprezentacija", "utakmica"],
    readTime: 2,
  },
  {
    id: "3",
    title: "Nova AI tehnologija revolucionira medicinu",
    slug: "ai-tehnologija-medicina",
    excerpt:
      "Istraživači su razvili naprednu AI tehnologiju koja može dijagnostikovati rak sa 95% tačnošću, što predstavlja veliki korak naprijed u medicini.",
    content: `
      <p>Tim međunarodnih istraživača objavio je revolucionarno otkriće u oblasti medicinske dijagnostike.</p>
      
      <p>Nova AI tehnologija, razvijena tokom tri godine istraživanja, može da dijagnostikuje različite tipove raka sa nevjerovatnom tačnošću od 95%.</p>
      
      <h3>Prednosti nove tehnologije:</h3>
      <ul>
        <li>Brža dijagnoza - rezultati za 10 minuta</li>
        <li>Veća tačnost od tradicionalnih metoda</li>
        <li>Niži troškovi dijagnostike</li>
        <li>Dostupnost u manjim zdravstvenim centrima</li>
      </ul>
      
      <p>Očekuje se da će ova tehnologija biti dostupna u našim bolnicama već krajem ove godine.</p>
    `,
    imageUrl: "/ai-medical-technology-doctor-computer.jpg",
    category: categories[2],
    author: "Dr. Milica Radović",
    publishedAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-14T14:20:00Z",
    featured: false,
    tags: ["AI", "medicina", "dijagnostika", "rak"],
    readTime: 4,
  },
  {
    id: "4",
    title: "Poznati glumac dobio glavnu ulogu u Hollywood filmu",
    slug: "glumac-hollywood-film",
    excerpt:
      "Naš poznati glumac Nikola Đuričko dobio je glavnu ulogu u novom Hollywood blockbuster filmu koji će se snimati naredne godine.",
    content: `
      <p>Nikola Đuričko, jedan od najpoznatijih glumaca naše kinematografije, dobio je glavnu ulogu u novom Hollywood filmu.</p>
      
      <p>Film će režirati poznati reditelj Christopher Nolan, a radnja se odvija u futurističkom svijetu gdje tehnologija mijenja ljudsko društvo.</p>
      
      <p>Đuričko će tumačiti ulogu naučnika koji pokušava da spasi čovječanstvo od tehnološke katastrofe.</p>
      
      <p>"Ovo je san svakog glumca", izjavio je Đuričko na press konferenciji. "Raditi sa Nolanom je privilegija."</p>
      
      <p>Snimanje filma počinje u martu 2024. godine, a premijera je planirana za decembar 2025.</p>
    `,
    imageUrl: "/actor-hollywood-movie-set-film-camera.jpg",
    category: categories[3],
    author: "Jelena Marković",
    publishedAt: "2024-01-13T16:45:00Z",
    updatedAt: "2024-01-13T16:45:00Z",
    featured: false,
    tags: ["glumac", "Hollywood", "film", "Nolan"],
    readTime: 2,
  },
  {
    id: "5",
    title: "Berza dostigla rekordne vrijednosti",
    slug: "berza-rekordne-vrijednosti",
    excerpt:
      "Glavni indeks naše berze dostigao je danas rekordnu vrijednost od 1.250 bodova, što predstavlja rast od 15% u odnosu na početak godine.",
    content: `
      <p>Beogradska berza zabilježila je danas istorijski dan kada je glavni indeks BELEXline dostigao rekordnu vrijednost od 1.250 bodova.</p>
      
      <p>Ovaj rast od 15% u odnosu na početak godine rezultat je povećanog interesovanja stranih investitora i pozitivnih ekonomskih pokazatelja.</p>
      
      <h3>Najuspješnije dionice:</h3>
      <ul>
        <li>NIS - rast od 8%</li>
        <li>Telekom Srbija - rast od 6%</li>
        <li>Energoprojekt - rast od 12%</li>
        <li>Metalac - rast od 9%</li>
      </ul>
      
      <p>Analitičari predviđaju da će pozitivan trend nastaviti i u narednim mjesecima.</p>
    `,
    imageUrl: "/stock-market-trading-floor-charts-growth.jpg",
    category: categories[4],
    author: "Milan Jovanović",
    publishedAt: "2024-01-13T11:30:00Z",
    updatedAt: "2024-01-13T11:30:00Z",
    featured: false,
    tags: ["berza", "ekonomija", "investicije"],
    readTime: 3,
  },
  {
    id: "6",
    title: "Novi tretman za dijabetes pokazuje obećavajuće rezultate",
    slug: "novi-tretman-dijabetes",
    excerpt:
      "Klinička ispitivanja novog tretmana za dijabetes tip 2 pokazala su da može značajno smanjiti nivo šećera u krvi bez nuspojava.",
    content: `
      <p>Revolucionarni tretman za dijabetes tip 2, razvijen u našem Institutu za endokrinologiju, pokazao je izuzetne rezultate u kliničkim ispitivanjima.</p>
      
      <p>Tretman se zasniva na kombinaciji prirodnih ekstrakta i napredne terapije koja pomaže organizmu da bolje reguliše nivo šećera u krvi.</p>
      
      <h3>Rezultati ispitivanja:</h3>
      <ul>
        <li>85% pacijenata imalo je značajno poboljšanje</li>
        <li>Smanjenje nivoa šećera za 40% u prosjeku</li>
        <li>Nema zabilježenih nuspojava</li>
        <li>Poboljšanje kvaliteta života</li>
      </ul>
      
      <p>Tretman će biti dostupan pacijentima već u drugoj polovini ove godine.</p>
    `,
    imageUrl: "/medical-research-diabetes-treatment-laboratory.jpg",
    category: categories[5],
    author: "Dr. Petar Nikolić",
    publishedAt: "2024-01-12T09:15:00Z",
    updatedAt: "2024-01-12T09:15:00Z",
    featured: false,
    tags: ["dijabetes", "tretman", "medicina", "istraživanje"],
    readTime: 3,
  },
]
