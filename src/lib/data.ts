/**
 * Static content model for NEXUS ARENA.
 * Everything here is fictional demo data — no external API calls, so pages
 * stay statically renderable and fast.
 */

export type Genre =
  | "FPS"
  | "Battle Royale"
  | "MOBA"
  | "RPG"
  | "Racing"
  | "Strategy"
  | "Fighting"
  | "Survival";

export type Platform = "PC" | "PS5" | "Xbox" | "Switch" | "Cloud";

export interface Game {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  genre: Genre;
  platforms: Platform[];
  rating: number;
  players: string;
  playersRaw: number;
  releaseYear: number;
  price: number;
  discount?: number;
  featured: boolean;
  trending: boolean;
  tags: string[];
  /** Procedural cover art: [from, via, to] hex stops + a shape seed. */
  art: { from: string; via: string; to: string; seed: number };
}

export const GAMES: Game[] = [
  {
    id: "g1",
    slug: "eclipse-protocol",
    title: "Eclipse Protocol",
    tagline: "The sun went out. Something else woke up.",
    description:
      "A tactical extraction shooter set beneath a dead star. Six squads drop, one extracts. Every match rewrites the map through persistent, server-wide destruction.",
    genre: "FPS",
    platforms: ["PC", "PS5", "Xbox"],
    rating: 4.9,
    players: "2.4M",
    playersRaw: 2_400_000,
    releaseYear: 2025,
    price: 59.99,
    discount: 35,
    featured: true,
    trending: true,
    tags: ["Tactical", "Co-op", "Extraction", "Competitive"],
    art: { from: "#00e5ff", via: "#0b2f6b", to: "#04050a", seed: 1 },
  },
  {
    id: "g2",
    slug: "neon-dynasty",
    title: "Neon Dynasty",
    tagline: "Rule the sprawl. Or be deleted by it.",
    description:
      "An open-world cyberpunk RPG across seven vertical districts. Your implants rewrite your dialogue, your combat, and the ending you are allowed to reach.",
    genre: "RPG",
    platforms: ["PC", "PS5", "Xbox", "Cloud"],
    rating: 4.8,
    players: "1.8M",
    playersRaw: 1_800_000,
    releaseYear: 2026,
    price: 69.99,
    featured: true,
    trending: true,
    tags: ["Open World", "Story Rich", "Cyberpunk", "Single Player"],
    art: { from: "#ff2e88", via: "#5b1a7a", to: "#04050a", seed: 2 },
  },
  {
    id: "g3",
    slug: "voidrunner",
    title: "Voidrunner",
    tagline: "Anti-gravity racing at Mach 4.",
    description:
      "Magnetic hovercraft racing across collapsing orbital rings. Zero brakes by design — you shed velocity by drifting the walls or you do not shed it at all.",
    genre: "Racing",
    platforms: ["PC", "PS5", "Switch"],
    rating: 4.7,
    players: "940K",
    playersRaw: 940_000,
    releaseYear: 2025,
    price: 39.99,
    discount: 50,
    featured: true,
    trending: false,
    tags: ["Arcade", "Multiplayer", "Split Screen", "Fast Paced"],
    art: { from: "#7c3aed", via: "#00e5ff", to: "#04050a", seed: 3 },
  },
  {
    id: "g4",
    slug: "titan-siege",
    title: "Titan Siege",
    tagline: "Five heroes. One collapsing lane. No respawns.",
    description:
      "A 5v5 MOBA built on a single shrinking lane. Objectives migrate every ninety seconds, so the map you drafted for is never the map you fight on.",
    genre: "MOBA",
    platforms: ["PC", "Cloud"],
    rating: 4.6,
    players: "3.1M",
    playersRaw: 3_100_000,
    releaseYear: 2024,
    price: 0,
    featured: true,
    trending: true,
    tags: ["Free to Play", "Esports", "Team Based", "Strategy"],
    art: { from: "#b6ff3c", via: "#0d5c4a", to: "#04050a", seed: 4 },
  },
  {
    id: "g5",
    slug: "ashfall-72",
    title: "Ashfall 72",
    tagline: "Seventy-two hours until the ash reaches you.",
    description:
      "A 100-player battle royale on a volcanic archipelago. The safe zone is not a circle — it is whatever the lava has not claimed yet.",
    genre: "Battle Royale",
    platforms: ["PC", "PS5", "Xbox", "Cloud"],
    rating: 4.5,
    players: "4.7M",
    playersRaw: 4_700_000,
    releaseYear: 2025,
    price: 0,
    featured: true,
    trending: true,
    tags: ["Free to Play", "Battle Royale", "Squad", "Survival"],
    art: { from: "#ff6b2e", via: "#7a1a3d", to: "#04050a", seed: 5 },
  },
  {
    id: "g6",
    slug: "cryostasis",
    title: "Cryostasis",
    tagline: "You have eight minutes of heat. Spend them well.",
    description:
      "A brutal survival sim on a frozen exomoon. Heat is currency, oxygen is ammunition, and every death is written permanently into the shared world seed.",
    genre: "Survival",
    platforms: ["PC", "Xbox"],
    rating: 4.4,
    players: "620K",
    playersRaw: 620_000,
    releaseYear: 2026,
    price: 34.99,
    discount: 20,
    featured: false,
    trending: true,
    tags: ["Survival", "Hardcore", "Permadeath", "Crafting"],
    art: { from: "#8fd8ff", via: "#1d3a8a", to: "#04050a", seed: 6 },
  },
  {
    id: "g7",
    slug: "hexcommand",
    title: "HexCommand",
    tagline: "Every turn is a hundred simultaneous decisions.",
    description:
      "Simultaneous-turn grand strategy. All players resolve orders in the same tick, so victory belongs to whoever predicted the other six correctly.",
    genre: "Strategy",
    platforms: ["PC"],
    rating: 4.7,
    players: "310K",
    playersRaw: 310_000,
    releaseYear: 2024,
    price: 44.99,
    featured: false,
    trending: false,
    tags: ["4X", "Turn Based", "Multiplayer", "Deep"],
    art: { from: "#00e5ff", via: "#7c3aed", to: "#04050a", seed: 7 },
  },
  {
    id: "g8",
    slug: "ronin-circuit",
    title: "Ronin Circuit",
    tagline: "Rollback netcode. Zero excuses.",
    description:
      "A 2.5D fighter with 34 characters and frame-perfect rollback. Ranked seasons reset monthly and the top 64 auto-qualify for the Nexus Invitational.",
    genre: "Fighting",
    platforms: ["PC", "PS5", "Switch"],
    rating: 4.8,
    players: "780K",
    playersRaw: 780_000,
    releaseYear: 2025,
    price: 49.99,
    discount: 15,
    featured: false,
    trending: true,
    tags: ["Fighting", "Esports", "Rollback", "1v1"],
    art: { from: "#ff2e88", via: "#c2410c", to: "#04050a", seed: 8 },
  },
  {
    id: "g9",
    slug: "starforge-online",
    title: "Starforge Online",
    tagline: "Build a fleet. Lose it. Build a better one.",
    description:
      "A persistent-universe MMO where every ship is player-built and permanently destructible. The economy has no reset and no safety net.",
    genre: "Strategy",
    platforms: ["PC", "Cloud"],
    rating: 4.3,
    players: "1.1M",
    playersRaw: 1_100_000,
    releaseYear: 2023,
    price: 24.99,
    discount: 60,
    featured: false,
    trending: false,
    tags: ["MMO", "Sandbox", "PvP", "Economy"],
    art: { from: "#7c3aed", via: "#1e1b4b", to: "#04050a", seed: 9 },
  },
  {
    id: "g10",
    slug: "blackwater-division",
    title: "Blackwater Division",
    tagline: "Breach. Clear. Disappear.",
    description:
      "A methodical 4-player co-op tactical shooter. No respawns, no HUD, no minimap — only your team's callouts and a floor plan you memorised.",
    genre: "FPS",
    platforms: ["PC", "PS5", "Xbox"],
    rating: 4.6,
    players: "530K",
    playersRaw: 530_000,
    releaseYear: 2026,
    price: 54.99,
    featured: false,
    trending: true,
    tags: ["Co-op", "Tactical", "Realistic", "Hardcore"],
    art: { from: "#3f6f8f", via: "#0f2027", to: "#04050a", seed: 10 },
  },
  {
    id: "g11",
    slug: "prism-break",
    title: "Prism Break",
    tagline: "Light is the only weapon that matters.",
    description:
      "A puzzle-platform roguelite where refracted light is both traversal and damage. Every run generates a new spectrum and a new solution set.",
    genre: "RPG",
    platforms: ["PC", "Switch", "Cloud"],
    rating: 4.5,
    players: "410K",
    playersRaw: 410_000,
    releaseYear: 2025,
    price: 19.99,
    discount: 40,
    featured: false,
    trending: false,
    tags: ["Roguelite", "Puzzle", "Indie", "Relaxing"],
    art: { from: "#b6ff3c", via: "#00e5ff", to: "#04050a", seed: 11 },
  },
  {
    id: "g12",
    slug: "iron-covenant",
    title: "Iron Covenant",
    tagline: "Forty tonnes of walking artillery. Yours.",
    description:
      "Mech combat with per-component damage modelling. Lose a leg actuator and you fight the rest of the match on your knees — literally.",
    genre: "Battle Royale",
    platforms: ["PC", "PS5", "Xbox"],
    rating: 4.7,
    players: "1.3M",
    playersRaw: 1_300_000,
    releaseYear: 2026,
    price: 44.99,
    featured: false,
    trending: true,
    tags: ["Mechs", "Simulation", "PvP", "Customization"],
    art: { from: "#ff8a00", via: "#4a1d96", to: "#04050a", seed: 12 },
  },
];

/* ------------------------------------------------------------------ */

export interface Tournament {
  id: string;
  name: string;
  game: string;
  gameSlug: string;
  prizePool: number;
  /** ISO date — parsed client-side for the countdown. */
  startsAt: string;
  region: string;
  format: string;
  teams: number;
  slotsLeft: number;
  status: "open" | "live" | "closed";
  tier: "Major" | "Invitational" | "Open Qualifier" | "Community Cup";
}

/** Dates are generated relative to build time so countdowns always read sensibly. */
function daysOut(days: number, hours = 0): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + days);
  d.setUTCHours(d.getUTCHours() + hours, 0, 0, 0);
  return d.toISOString();
}

export const TOURNAMENTS: Tournament[] = [
  {
    id: "t1",
    name: "Nexus Invitational — Season 7",
    game: "Eclipse Protocol",
    gameSlug: "eclipse-protocol",
    prizePool: 2_500_000,
    startsAt: daysOut(4, 6),
    region: "Global",
    format: "Double Elimination",
    teams: 32,
    slotsLeft: 0,
    status: "open",
    tier: "Invitational",
  },
  {
    id: "t2",
    name: "Ashfall World Series",
    game: "Ashfall 72",
    gameSlug: "ashfall-72",
    prizePool: 1_800_000,
    startsAt: daysOut(11, 3),
    region: "NA / EU",
    format: "Points Series",
    teams: 50,
    slotsLeft: 6,
    status: "open",
    tier: "Major",
  },
  {
    id: "t3",
    name: "Titan Siege Continental Cup",
    game: "Titan Siege",
    gameSlug: "titan-siege",
    prizePool: 950_000,
    startsAt: daysOut(0, 2),
    region: "APAC",
    format: "Group Stage → Playoffs",
    teams: 16,
    slotsLeft: 0,
    status: "live",
    tier: "Major",
  },
  {
    id: "t4",
    name: "Ronin Circuit Monthly #48",
    game: "Ronin Circuit",
    gameSlug: "ronin-circuit",
    prizePool: 120_000,
    startsAt: daysOut(2, 9),
    region: "Global",
    format: "Single Elimination",
    teams: 256,
    slotsLeft: 41,
    status: "open",
    tier: "Open Qualifier",
  },
  {
    id: "t5",
    name: "Voidrunner Grand Prix",
    game: "Voidrunner",
    gameSlug: "voidrunner",
    prizePool: 400_000,
    startsAt: daysOut(19),
    region: "EU",
    format: "Time Trial + Finals",
    teams: 64,
    slotsLeft: 18,
    status: "open",
    tier: "Major",
  },
  {
    id: "t6",
    name: "Blackwater Community Clash",
    game: "Blackwater Division",
    gameSlug: "blackwater-division",
    prizePool: 25_000,
    startsAt: daysOut(6, 14),
    region: "NA",
    format: "Swiss",
    teams: 128,
    slotsLeft: 73,
    status: "open",
    tier: "Community Cup",
  },
  {
    id: "t7",
    name: "Iron Covenant Proving Grounds",
    game: "Iron Covenant",
    gameSlug: "iron-covenant",
    prizePool: 300_000,
    startsAt: daysOut(27, 5),
    region: "Global",
    format: "Double Elimination",
    teams: 24,
    slotsLeft: 9,
    status: "open",
    tier: "Major",
  },
  {
    id: "t8",
    name: "HexCommand Strategist Open",
    game: "HexCommand",
    gameSlug: "hexcommand",
    prizePool: 75_000,
    startsAt: daysOut(33, 1),
    region: "Global",
    format: "Round Robin",
    teams: 12,
    slotsLeft: 3,
    status: "open",
    tier: "Open Qualifier",
  },
];

/* ------------------------------------------------------------------ */

export interface Player {
  rank: number;
  handle: string;
  team: string;
  country: string;
  flag: string;
  points: number;
  winRate: number;
  kd: number;
  game: string;
  change: number;
  tier: "Radiant" | "Immortal" | "Ascendant" | "Diamond";
}

export const LEADERBOARD: Player[] = [
  { rank: 1, handle: "V0RTEX", team: "Sentinel Nine", country: "South Korea", flag: "🇰🇷", points: 18_420, winRate: 71.4, kd: 2.81, game: "Eclipse Protocol", change: 2, tier: "Radiant" },
  { rank: 2, handle: "kx.nova", team: "Obsidian GG", country: "Sweden", flag: "🇸🇪", points: 17_980, winRate: 69.8, kd: 2.64, game: "Eclipse Protocol", change: -1, tier: "Radiant" },
  { rank: 3, handle: "HALCYON", team: "Nightfall", country: "Brazil", flag: "🇧🇷", points: 17_310, winRate: 68.2, kd: 2.59, game: "Ashfall 72", change: 4, tier: "Radiant" },
  { rank: 4, handle: "m1rage", team: "Sentinel Nine", country: "United States", flag: "🇺🇸", points: 16_744, winRate: 66.9, kd: 2.47, game: "Titan Siege", change: 0, tier: "Immortal" },
  { rank: 5, handle: "Yuki_Ao", team: "Kaiju Esports", country: "Japan", flag: "🇯🇵", points: 16_120, winRate: 65.5, kd: 2.38, game: "Ronin Circuit", change: 1, tier: "Immortal" },
  { rank: 6, handle: "AXIOM", team: "Obsidian GG", country: "Germany", flag: "🇩🇪", points: 15_890, winRate: 64.8, kd: 2.31, game: "Eclipse Protocol", change: -3, tier: "Immortal" },
  { rank: 7, handle: "zephyr.exe", team: "Vanta Collective", country: "Canada", flag: "🇨🇦", points: 15_402, winRate: 63.1, kd: 2.22, game: "Ashfall 72", change: 5, tier: "Immortal" },
  { rank: 8, handle: "NOCTIS", team: "Nightfall", country: "France", flag: "🇫🇷", points: 14_970, winRate: 62.4, kd: 2.18, game: "Iron Covenant", change: -2, tier: "Ascendant" },
  { rank: 9, handle: "prism_", team: "Aurora Line", country: "Australia", flag: "🇦🇺", points: 14_530, winRate: 61.7, kd: 2.09, game: "Voidrunner", change: 1, tier: "Ascendant" },
  { rank: 10, handle: "Dr4ke", team: "Kaiju Esports", country: "Singapore", flag: "🇸🇬", points: 14_115, winRate: 60.9, kd: 2.04, game: "Titan Siege", change: 0, tier: "Ascendant" },
  { rank: 11, handle: "SOLSTICE", team: "Vanta Collective", country: "Poland", flag: "🇵🇱", points: 13_780, winRate: 60.2, kd: 1.98, game: "Blackwater Division", change: 3, tier: "Ascendant" },
  { rank: 12, handle: "echo.null", team: "Aurora Line", country: "United Kingdom", flag: "🇬🇧", points: 13_402, winRate: 59.6, kd: 1.94, game: "Eclipse Protocol", change: -4, tier: "Diamond" },
];

/* ------------------------------------------------------------------ */

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "Patch Notes" | "Esports" | "Announcement" | "Dev Blog" | "Community";
  date: string;
  readTime: number;
  author: string;
  featured: boolean;
  accent: string;
}

export const NEWS: NewsItem[] = [
  {
    id: "n1",
    slug: "eclipse-protocol-season-7",
    title: "Eclipse Protocol: Season 7 rewrites the extraction meta",
    excerpt:
      "Persistent map destruction now carries across the entire server region. Extraction points are no longer fixed, and the top 500 will feel it first.",
    category: "Patch Notes",
    date: "2026-08-04",
    readTime: 6,
    author: "Dev Team",
    featured: true,
    accent: "#00e5ff",
  },
  {
    id: "n2",
    slug: "nexus-invitational-prize-pool",
    title: "Nexus Invitational prize pool crosses $2.5M",
    excerpt:
      "Community crowdfunding pushed Season 7 past every previous record with eleven days still on the clock. Here is the full regional breakdown.",
    category: "Esports",
    date: "2026-08-02",
    readTime: 4,
    author: "Esports Desk",
    featured: true,
    accent: "#ff2e88",
  },
  {
    id: "n3",
    slug: "neon-dynasty-district-eight",
    title: "Neon Dynasty announces District Eight expansion",
    excerpt:
      "Forty square kilometres of vertical sprawl, a new implant tree, and a companion whose loyalty is genuinely losable. Free for all owners.",
    category: "Announcement",
    date: "2026-07-30",
    readTime: 8,
    author: "Studio Nexus",
    featured: true,
    accent: "#7c3aed",
  },
  {
    id: "n4",
    slug: "rollback-netcode-deep-dive",
    title: "Dev Blog: How we shipped 2-frame rollback across 34 characters",
    excerpt:
      "A candid engineering write-up on deterministic simulation, input prediction, and the eleven bugs that nearly cancelled Ronin Circuit's launch.",
    category: "Dev Blog",
    date: "2026-07-27",
    readTime: 12,
    author: "R. Okafor, Netcode Lead",
    featured: false,
    accent: "#b6ff3c",
  },
  {
    id: "n5",
    slug: "community-map-contest-winners",
    title: "Community map contest: the six maps entering rotation",
    excerpt:
      "Over 4,100 submissions, three months of playtesting, and six creators who are now shipping official content. Meet them.",
    category: "Community",
    date: "2026-07-24",
    readTime: 5,
    author: "Community Team",
    featured: false,
    accent: "#00e5ff",
  },
  {
    id: "n6",
    slug: "ashfall-anti-cheat-report",
    title: "Ashfall 72 anti-cheat transparency report, Q2",
    excerpt:
      "218,000 accounts actioned, a 41% drop in reported encounters, and what we are changing about the appeals process.",
    category: "Announcement",
    date: "2026-07-21",
    readTime: 7,
    author: "Trust & Safety",
    featured: false,
    accent: "#ff2e88",
  },
  {
    id: "n7",
    slug: "titan-siege-lane-rework",
    title: "Titan Siege 4.2: the lane rework, explained by the designers",
    excerpt:
      "Objective migration now happens every 90 seconds instead of 120. The reasoning, the data, and what it does to late-game drafts.",
    category: "Patch Notes",
    date: "2026-07-18",
    readTime: 9,
    author: "Balance Team",
    featured: false,
    accent: "#7c3aed",
  },
  {
    id: "n8",
    slug: "apac-qualifier-recap",
    title: "APAC Qualifier recap: Kaiju Esports' impossible reverse sweep",
    excerpt:
      "Down 0-2 with a 14,000 gold deficit, Kaiju took three straight. Frame-by-frame on the play that turned it.",
    category: "Esports",
    date: "2026-07-15",
    readTime: 6,
    author: "Esports Desk",
    featured: false,
    accent: "#b6ff3c",
  },
];

/* ------------------------------------------------------------------ */

export interface Product {
  id: string;
  name: string;
  type: "Game" | "Bundle" | "Currency" | "Battle Pass" | "Cosmetic" | "Hardware";
  price: number;
  discount?: number;
  rating: number;
  badge?: string;
  description: string;
  art: { from: string; via: string; to: string; seed: number };
}

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Eclipse Protocol — Deluxe Edition",
    type: "Game",
    price: 89.99,
    discount: 35,
    rating: 4.9,
    badge: "Best Seller",
    description: "Base game, Season 7 pass, three legendary operator skins, and the Blackout weapon set.",
    art: { from: "#00e5ff", via: "#0b2f6b", to: "#04050a", seed: 1 },
  },
  {
    id: "p2",
    name: "Neon Dynasty — Collector's Bundle",
    type: "Bundle",
    price: 129.99,
    discount: 20,
    rating: 4.8,
    badge: "New",
    description: "Full game, District Eight expansion, digital artbook, and the original 42-track score.",
    art: { from: "#ff2e88", via: "#5b1a7a", to: "#04050a", seed: 2 },
  },
  {
    id: "p3",
    name: "Nexus Credits — 5,000",
    type: "Currency",
    price: 44.99,
    rating: 4.6,
    description: "Platform-wide currency, spendable across every title and every in-game store.",
    art: { from: "#b6ff3c", via: "#0d5c4a", to: "#04050a", seed: 4 },
  },
  {
    id: "p4",
    name: "Season 7 Battle Pass",
    type: "Battle Pass",
    price: 9.99,
    rating: 4.7,
    badge: "Limited",
    description: "120 tiers, 4 mythic operators, and enough credits to buy next season outright.",
    art: { from: "#7c3aed", via: "#00e5ff", to: "#04050a", seed: 3 },
  },
  {
    id: "p5",
    name: "Voidrunner — Chrome Fleet Pack",
    type: "Cosmetic",
    price: 19.99,
    discount: 50,
    rating: 4.4,
    description: "Six reactive hovercraft liveries that shift hue with your current velocity.",
    art: { from: "#8fd8ff", via: "#1d3a8a", to: "#04050a", seed: 6 },
  },
  {
    id: "p6",
    name: "Nexus Arena Pro Controller",
    type: "Hardware",
    price: 179.99,
    discount: 15,
    rating: 4.8,
    badge: "Staff Pick",
    description: "Hall-effect sticks, 8kHz polling, four remappable paddles, sub-1ms wireless.",
    art: { from: "#ff8a00", via: "#4a1d96", to: "#04050a", seed: 12 },
  },
  {
    id: "p7",
    name: "Titan Siege — Champion Vault",
    type: "Bundle",
    price: 59.99,
    discount: 25,
    rating: 4.5,
    description: "Unlocks all 78 current champions plus every champion released through 2027.",
    art: { from: "#b6ff3c", via: "#1e3a8a", to: "#04050a", seed: 7 },
  },
  {
    id: "p8",
    name: "Ronin Circuit — Season 3 Pass",
    type: "Battle Pass",
    price: 14.99,
    rating: 4.6,
    description: "Three new fighters, 60 tiers of cosmetics, and priority ranked queue access.",
    art: { from: "#ff2e88", via: "#c2410c", to: "#04050a", seed: 8 },
  },
];

/* ------------------------------------------------------------------ */

export const CATEGORIES: {
  name: Genre;
  count: number;
  accent: string;
  blurb: string;
}[] = [
  { name: "FPS", count: 248, accent: "#00e5ff", blurb: "Precision, recoil, and milliseconds" },
  { name: "Battle Royale", count: 96, accent: "#ff2e88", blurb: "Last squad standing" },
  { name: "MOBA", count: 41, accent: "#b6ff3c", blurb: "Draft, rotate, dominate" },
  { name: "RPG", count: 312, accent: "#7c3aed", blurb: "Worlds that remember you" },
  { name: "Racing", count: 87, accent: "#ff8a00", blurb: "Apex lines at terminal velocity" },
  { name: "Strategy", count: 154, accent: "#8fd8ff", blurb: "Win before the first move" },
  { name: "Fighting", count: 63, accent: "#ff2e88", blurb: "Frame data is destiny" },
  { name: "Survival", count: 129, accent: "#4ade80", blurb: "Outlast everything" },
];

export const SPONSORS = [
  { name: "HYPERCORE", tag: "Silicon" },
  { name: "VANTA", tag: "Peripherals" },
  { name: "NOVA ENERGY", tag: "Fuel" },
  { name: "AXIS AUDIO", tag: "Sound" },
  { name: "QUANTUMNET", tag: "Netcode" },
  { name: "IRONCLAD", tag: "Chassis" },
  { name: "SPECTRA", tag: "Displays" },
  { name: "ZEROLAG", tag: "Hosting" },
];

export interface CommunityPost {
  id: string;
  author: string;
  handle: string;
  avatarAccent: string;
  content: string;
  likes: number;
  replies: number;
  posted: string;
  tag: string;
}

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: "c1",
    author: "Mira Sandoval",
    handle: "@prism_",
    avatarAccent: "#00e5ff",
    content:
      "Hit Radiant on a controller in Eclipse Protocol. Everyone said the aim ceiling would stop me at Immortal. Six months of vod review says otherwise.",
    likes: 12_400,
    replies: 843,
    posted: "2h ago",
    tag: "Milestone",
  },
  {
    id: "c2",
    author: "Kenji Watanabe",
    handle: "@Yuki_Ao",
    avatarAccent: "#ff2e88",
    content:
      "Full frame-data spreadsheet for all 34 Ronin Circuit characters, updated for 3.1. Free, no paywall, no login. Link in my profile.",
    likes: 28_900,
    replies: 1_204,
    posted: "5h ago",
    tag: "Guide",
  },
  {
    id: "c3",
    author: "Ada Okonkwo",
    handle: "@echo.null",
    avatarAccent: "#7c3aed",
    content:
      "Our community-built Ashfall map just entered official rotation. Two years, 400 playtests, and a Discord that never once let it die.",
    likes: 41_200,
    replies: 2_780,
    posted: "1d ago",
    tag: "Community Win",
  },
  {
    id: "c4",
    author: "Lucas Fernandes",
    handle: "@HALCYON",
    avatarAccent: "#b6ff3c",
    content:
      "Streaming the APAC qualifier watch party tonight at 20:00 UTC. Bringing two Kaiju players on to break down the reverse sweep live.",
    likes: 8_650,
    replies: 412,
    posted: "1d ago",
    tag: "Stream",
  },
];

export const LIVE_STATS = [
  { label: "Players Online", value: 1_284_930, suffix: "", accent: "#00e5ff" },
  { label: "Active Matches", value: 86_420, suffix: "", accent: "#ff2e88" },
  { label: "Prize Pool Awarded", value: 42, suffix: "M+", prefix: "$", accent: "#7c3aed" },
  { label: "Registered Teams", value: 197_300, suffix: "", accent: "#b6ff3c" },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */

export const GENRES: Genre[] = [
  "FPS",
  "Battle Royale",
  "MOBA",
  "RPG",
  "Racing",
  "Strategy",
  "Fighting",
  "Survival",
];

export const PLATFORMS: Platform[] = ["PC", "PS5", "Xbox", "Switch", "Cloud"];

export function formatCompact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

export function formatPrice(price: number, discount?: number): string {
  if (price === 0) return "Free to Play";
  const final = discount ? price * (1 - discount / 100) : price;
  return `$${final.toFixed(2)}`;
}

export function getGame(slug: string): Game | undefined {
  return GAMES.find((g) => g.slug === slug);
}
