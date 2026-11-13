// GODSPIRE — game data and pure mechanics (no DOM)

export const RANKS = [
  { name: 'Demigod', need: 0, ap: 3, lore: 'A spark of the divine, barely kindled. The world does not yet know your name.' },
  { name: 'Divine Spark', need: 1600, ap: 3, lore: 'The first temple rises. Somewhere, a child draws your sigil in the dust.' },
  { name: 'Minor Deity', need: 3800, ap: 3, lore: 'A city takes your name. Priests argue over the meaning of your silence.' },
  { name: 'Patron God', need: 7200, ap: 4, lore: 'A nation calls you theirs. Your banners fly over fields you have never walked.' },
  { name: 'Greater God', need: 12000, ap: 4, lore: 'Your myths are sung in three languages. Rival gods send envoys, not armies.' },
  { name: 'High God', need: 18500, ap: 4, lore: 'The old powers take notice. The heavens rearrange themselves around your throne.' },
  { name: 'Elder God', need: 27500, ap: 5, lore: 'You remember the first dawn. Mortals now measure time by your festivals.' },
  { name: 'Primordial', need: 39000, ap: 5, lore: 'You are older than worship. The stars lean in to hear what you will do next.' },
  { name: 'Supreme Architect', need: 54000, ap: 6, lore: 'The Twenty Thrones bow. You are the hand that turns the wheel of myth.' },
];

export const RANK_THRESHOLDS = RANKS.map(r => r.need);

export const AGE_START = 18;
export const AGE_PER_AEON = 3;
export const AGE_MILESTONES = {
  45: { en: 'The years settle on your shoulders. Mortals begin to call you ancient.', es: 'Los años se posan en tus hombros. Los mortales empiezan a llamarte antiguo.' },
  60: { en: 'Your hair greys and your gaze deepens. Sixty years of prayers have carved you.', es: 'Tu cabello encanece y tu mirada se vuelve más profunda. Sesenta años de plegarias te han tallado.' },
  75: { en: 'Seventy-five years. Temples depict you with lines on your face, and it feels right.', es: 'Setenta y cinco años. Los templos te representan con arrugas, y te parece justo.' },
  90: { en: 'Ninety years. You are older than many gods, and far more patient.', es: 'Noventa años. Eres más viejo que muchos dioses y mucho más paciente.' },
};

let numberLocale = 'en-US';
export function setNumberLocale(next) { numberLocale = next === 'es' ? 'es-ES' : 'en-US'; }

export const DOMAINS = [
  { id: 'storm', name: 'Storm', color: '#7fb8ff', mods: { miracleBonus: 0.25 }, passive: 'Miracles convert 25% more souls.' },
  { id: 'death', name: 'Death', color: '#a58cff', mods: { smiteBonus: 3 }, passive: 'Smiting grants +3 extra power.' },
  { id: 'love', name: 'Love', color: '#ff8fb1', mods: { faithPerAeon: 2 }, passive: '+2 faith every aeon.' },
  { id: 'war', name: 'War', color: '#ff8a5c', mods: { powerPerAeon: 2 }, passive: '+2 power every aeon.' },
  { id: 'wisdom', name: 'Wisdom', color: '#ffd77a', mods: { wisdomPerAeon: 2 }, passive: '+2 wisdom every aeon.' },
  { id: 'nature', name: 'Nature', color: '#8ee6a8', mods: { growth: 0.1 }, passive: 'Your worshippers multiply 10% faster.' },
  { id: 'sun', name: 'Sun', color: '#ffc857', mods: { faithPerAeon: 1, influencePerAeon: 1 }, passive: '+1 faith and +1 influence every aeon.' },
  { id: 'moon', name: 'Moon', color: '#c8d4ff', mods: { wisdomPerAeon: 1, growth: 0.05 }, passive: '+1 wisdom and 5% faster growth.' },
  { id: 'trickery', name: 'Trickery', color: '#b7f0d0', mods: { influencePerAeon: 2 }, passive: '+2 influence every aeon.' },
  { id: 'forge', name: 'Forge', color: '#ff9d6e', mods: { relicBonus: 0.35, relicDiscount: 6 }, passive: 'Relics are 35% stronger and cost less faith.' },
  { id: 'sea', name: 'Sea', color: '#63d7d0', mods: { growth: 0.06, influencePerAeon: 1 }, passive: '6% faster growth and +1 influence every aeon.' },
  { id: 'time', name: 'Time', color: '#d0b3ff', mods: { apEvery3: true, wisdomPerAeon: 1 }, passive: 'Gain +1 action every third aeon. +1 wisdom per aeon.' },
];

export const LINEAGES = [
  { id: 'titan', name: 'Titan', color: '#d7b27a', mods: { powerPerAeon: 2, growth: 0.02 }, desc: 'Elder-blooded and vast. Might gathers in your shadow.' },
  { id: 'celestial', name: 'Celestial', color: '#c9d8ff', mods: { faithPerAeon: 2, influencePerAeon: 1 }, desc: 'Born between the stars. Prayer reaches you without effort.' },
  { id: 'chthonic', name: 'Chthonic', color: '#a58cff', mods: { smiteBonus: 2, influencePerAeon: 2 }, desc: 'Crowned beneath the earth. The dead whisper your titles.' },
  { id: 'elemental', name: 'Elemental', color: '#8ee6a8', mods: { growth: 0.1, powerPerAeon: 1 }, desc: 'A living force of the world. Life clings to your passing.' },
  { id: 'ascended', name: 'Ascended Mortal', color: '#ffc857', mods: { wisdomPerAeon: 1, faithPerAeon: 1, growth: 0.06 }, desc: 'You were mortal once. You have not forgotten how they think.' },
];

export const SKIN_TONES = [
  { name: 'Porcelain', hex: '#f4d8c6' },
  { name: 'Warm Ivory', hex: '#e8b894' },
  { name: 'Amber', hex: '#c98e63' },
  { name: 'Umber', hex: '#a76b45' },
  { name: 'Deep Bronze', hex: '#7d4a2e' },
  { name: 'Obsidian', hex: '#54342a' },
  { name: 'Ashen', hex: '#c7c2c9' },
  { name: 'Starlit', hex: '#c9c2e6' },
  { name: 'Jade', hex: '#b6c9a8' },
  { name: 'Rose', hex: '#e9b7b0' },
];

export const HAIR_COLORS = [
  { name: 'Raven', hex: '#1c1a26' },
  { name: 'Walnut', hex: '#3b2a24' },
  { name: 'Chestnut', hex: '#6b4630' },
  { name: 'Ember', hex: '#b06a3b' },
  { name: 'Wheat', hex: '#d9bd86' },
  { name: 'Silver', hex: '#c9cbd8' },
  { name: 'Snow', hex: '#f0edf6' },
  { name: 'Violet', hex: '#7b5cff' },
  { name: 'Tide', hex: '#39d6c8' },
  { name: 'Blood', hex: '#8f2f40' },
];

export const EYE_COLORS = [
  { name: 'Amber', hex: '#ffd166' },
  { name: 'Azure', hex: '#58c7ff' },
  { name: 'Verdant', hex: '#7ef0c0' },
  { name: 'Violet', hex: '#c08bff' },
  { name: 'Crimson', hex: '#ff6b6b' },
  { name: 'Silver', hex: '#e8eefc' },
  { name: 'Rose', hex: '#ffa8c9' },
  { name: 'Gold', hex: '#f5c451' },
];

export const TRAITS = [
  { id: 'industrious', name: 'Industrious', glyph: 'hammer', desc: '+12% follower growth.', mods: { growth: 0.12 } },
  { id: 'arcane', name: 'Arcane', glyph: 'star4', desc: '+2 wisdom every aeon.', mods: { wisdomPerAeon: 2 } },
  { id: 'zealous', name: 'Zealous', glyph: 'flame', desc: '+3 faith every aeon.', mods: { faithPerAeon: 3 } },
  { id: 'feral', name: 'Feral', glyph: 'bolt', desc: '+2 power every aeon.', mods: { powerPerAeon: 2 } },
  { id: 'tidal', name: 'Tidal', glyph: 'waves', desc: '+1 influence and 6% faster growth.', mods: { influencePerAeon: 1, growth: 0.06 } },
  { id: 'stoic', name: 'Stoic', glyph: 'mountain', desc: '+1 power and +1 wisdom every aeon.', mods: { powerPerAeon: 1, wisdomPerAeon: 1 } },
  { id: 'cosmic', name: 'Cosmic', glyph: 'moon', desc: '+1 faith and +1 wisdom every aeon.', mods: { faithPerAeon: 1, wisdomPerAeon: 1 } },
  { id: 'apex', name: 'Apex', glyph: 'crown', desc: '+3 power every aeon.', mods: { powerPerAeon: 3 } },
];

export const STARTER_RACES = [
  { id: 'humans', name: 'Humans', trait: 'industrious', glyph: 'users', color: '#e7c27a', ears: 'round', form: 'Humanoid', desc: 'Short-lived, hungry, and endlessly inventive.', descEs: 'De vida breve, hambrientos e infinitamente inventivos.' },
  { id: 'elves', name: 'High Elves', trait: 'arcane', glyph: 'leaf', color: '#9fd9c4', ears: 'pointed', form: 'Elven', desc: 'Long of memory, longer of grudge, beautiful in grief.', descEs: 'De larga memoria, rencor más largo, hermosos en el duelo.' },
  { id: 'dwarves', name: 'Stone Dwarves', trait: 'stoic', glyph: 'mountain', color: '#d9a06b', ears: 'round', form: 'Dwarven', desc: 'They carve your face into mountains and call it modest.', descEs: 'Tallan tu rostro en las montañas y lo llaman modesto.' },
  { id: 'beastkin', name: 'Beastkin', trait: 'feral', glyph: 'paw', color: '#e39a6f', ears: 'pointed', form: 'Beastfolk', desc: 'Claws, tusks, bright eyes. They worship with their whole bodies.', descEs: 'Garras, colmillos, ojos brillantes. Adoran con todo el cuerpo.' },
  { id: 'tideborn', name: 'Tideborn', trait: 'tidal', glyph: 'waves', color: '#74d4d0', ears: 'finned', form: 'Aquatic', desc: 'They build shrines of coral and sing in drowned chords.', descEs: 'Construyen santuarios de coral y cantan en acordes ahogados.' },
  { id: 'emberkin', name: 'Emberkin', trait: 'zealous', glyph: 'flame', color: '#ff9c66', ears: 'pointed', form: 'Emberborn', desc: 'Born in ash, devoted in fire, brief and blinding.', descEs: 'Nacidos de la ceniza, devotos del fuego, breves y cegadores.' },
  { id: 'starfolk', name: 'Starfolk', trait: 'cosmic', glyph: 'star4', color: '#cdb8ff', ears: 'pointed', form: 'Starborn', desc: 'They read your will in comets and argue about the commas.', descEs: 'Leen tu voluntad en los cometas y discuten sobre las comas.' },
  { id: 'draconians', name: 'Draconians', trait: 'apex', glyph: 'bolt', color: '#ff7a7a', ears: 'horned', form: 'Draconic', desc: 'Scaled empires that remember every oath you ever broke.', descEs: 'Imperios escamosos que recuerdan cada juramento que rompiste.' },
];

export const APPEARANCE_OPTIONS = {
  faces: [
    { id: 'oval', name: 'Oval' },
    { id: 'angular', name: 'Angular' },
    { id: 'round', name: 'Round' },
    { id: 'heart', name: 'Heart' },
    { id: 'long', name: 'Long' },
    { id: 'heroic', name: 'Heroic' },
    { id: 'bearded', name: 'Bearded' },
  ],
  clothing: [
    { id: 'chiton', name: 'Greek Chiton' },
    { id: 'himation', name: 'Draped Himation' },
    { id: 'armor', name: 'Bronze Cuirass' },
  ],
  builds: [
    { id: 'slender', name: 'Slender', desc: 'Willow-thin, made of light and debt.' },
    { id: 'athletic', name: 'Athletic', desc: 'A body built for walking between worlds.' },
    { id: 'broad', name: 'Broad', desc: 'Shoulders like temple gates.' },
    { id: 'colossal', name: 'Colossal', desc: 'The room bends around you.' },
  ],
  eyeShapes: [
    { id: 'almond', name: 'Almond' },
    { id: 'round', name: 'Round' },
    { id: 'sharp', name: 'Sharp' },
    { id: 'gentle', name: 'Gentle' },
  ],
  hairStyles: [
    { id: 'flowing', name: 'Flowing' },
    { id: 'short', name: 'Cropped' },
    { id: 'braided', name: 'Braided' },
    { id: 'topknot', name: 'Topknot' },
    { id: 'wild', name: 'Wild' },
    { id: 'mohawk', name: 'Mohawk' },
    { id: 'ponytail', name: 'Ponytail' },
    { id: 'curls', name: 'Curls' },
    { id: 'locs', name: 'Locs' },
    { id: 'bun', name: 'Bun' },
    { id: 'undercut', name: 'Undercut' },
    { id: 'megaran', name: 'Megaran Sweep' },
    { id: 'bald', name: 'Bald' },
  ],
  markings: [
    { id: 'none', name: 'None' },
    { id: 'rune', name: 'Rune' },
    { id: 'warpaint', name: 'War Paint' },
    { id: 'constellation', name: 'Constellation' },
    { id: 'tears', name: 'Tears of Light' },
  ],
  crowns: [
    { id: 'none', name: 'None' },
    { id: 'laurel', name: 'Laurel' },
    { id: 'circlet', name: 'Circlet' },
    { id: 'horns', name: 'Horns' },
    { id: 'halo', name: 'Halo' },
  ],
  complexions: [
    { id: 'natural', name: 'Natural' },
    { id: 'radiant', name: 'Radiant' },
    { id: 'ashen', name: 'Ashen' },
    { id: 'starlit', name: 'Starlit' },
  ],
};

export const DEFAULT_EPITHETS = {
  storm: 'The Stormlord', death: 'Keeper of the Last Door', love: 'The Golden Flame',
  war: 'The Red Banner', wisdom: 'The Grey-Eyed', nature: 'The Verdant Hand',
  sun: 'The Dawnbringer', moon: 'The Silver Veil', trickery: 'The Laughing Shadow',
  forge: 'The Shaper', sea: "The Deep's Voice", time: 'The Unmoved Hour',
};

export const ACTIONS = [
  {
    id: 'prayers', name: 'Answer Prayers', glyph: 'hands', ap: 1, cost: {},
    blurb: 'Hear the pleas of mortals.', desc: 'Gain faith and a handful of devout souls.',
    run(s, rng) {
      return { text: 'A thousand whispers rise from the mortal world. You listen, and the faithful feel heard.', changes: { faith: 6, wisdom: 1, followersFlat: 20, followersPct: 0.045 } };
    },
  },
  {
    id: 'miracle', name: 'Perform Miracle', glyph: 'star4', ap: 1, cost: { faith: 12 },
    blurb: 'Bend the impossible into being.', desc: 'A great conversion of souls and influence.',
    run(s) {
      const m = combinedMods(s);
      return { text: 'You reach into the weave and pull the impossible into being. They will tell this story for a thousand years.', changes: { followersPct: 0.09 * (1 + m.miracleBonus), followersFlat: 55, influence: 2, power: 1 } };
    },
  },
  {
    id: 'bless', name: 'Bless the Land', glyph: 'leaf', ap: 1, cost: { faith: 6 },
    blurb: 'Let rain fall on forgotten fields.', desc: 'Steady growth among the common folk.',
    run(s) {
      return { text: 'Rain falls soft on fields that had forgotten green. Farmers leave bread at your roadside stones.', changes: { followersPct: 0.05, followersFlat: 35, faith: 2 } };
    },
  },
  {
    id: 'smite', name: 'Smite the Wicked', glyph: 'bolt', ap: 1, cost: {},
    blurb: 'Make an example of the faithless.', desc: 'Gain power and influence; fear costs a few souls.',
    run(s) {
      const m = combinedMods(s);
      return { text: 'The sky cracks once. The wicked are unmade, and everyone else remembers your name.', changes: { power: 4 + m.smiteBonus, influence: 2, faith: 1, followersPct: -0.008 } };
    },
  },
  {
    id: 'prophecy', name: 'Grant Prophecy', glyph: 'eye', ap: 1, cost: { faith: 10 },
    blurb: 'Speak of what is to come.', desc: 'Grow wisdom and influence among kings.',
    run(s) {
      return { text: 'You speak of what is to come. Kings write down every word, and queens hide the ones they fear.', changes: { wisdom: 3, influence: 3, faith: 4, followersPct: 0.02 } };
    },
  },
  {
    id: 'meditate', name: 'Meditate in the Void', glyph: 'moon', ap: 1, cost: {},
    blurb: 'Withdraw into the quiet between stars.', desc: 'Deepen wisdom and divine power.',
    run(s) {
      return { text: 'You withdraw into the quiet between stars. When you return, the world feels smaller and your will feels older.', changes: { wisdom: 3, power: 2, faith: 2 } };
    },
  },
  {
    id: 'festival', name: 'Sacred Festival', glyph: 'flame', ap: 1, cost: { faith: 14 },
    blurb: 'Light every hearth in your name.', desc: 'A costly but mighty surge of devotion.',
    run(s) {
      return { text: 'For one night, every hearth burns in your honor. The songs will outlive the singers.', changes: { followersPct: 0.075, influence: 4, wisdom: 1 } };
    },
  },
  {
    id: 'walk', name: 'Walk Among Mortals', glyph: 'footsteps', ap: 1, cost: { faith: 4 },
    blurb: 'Wear a mortal face for a day.', desc: 'Learn what prayers never say. Gain influence.',
    run(s) {
      return { text: 'You wear a mortal face and walk among them. Someone shares their last loaf with you, not knowing what you are.', changes: { influence: 4, followersPct: 0.035, wisdom: 1 } };
    },
  },
  {
    id: 'relic', name: 'Forge a Relic', glyph: 'gem', ap: 2, cost: { faith: 20, power: 8 },
    blurb: 'Make a piece of the world holy.', desc: 'Create a relic of lasting divine might.',
    special: 'relic',
  },
  {
    id: 'race', name: 'Forge a Race', glyph: 'users', ap: 2, cost: { faith: 30, power: 12 },
    blurb: 'Breathe life into a new people.', desc: 'Create a custom race that worships you forever.',
    special: 'race',
  },
];

const RELIC_PREFIX = ['Crown of', 'Eye of', 'Scepter of', 'Tear of', 'Heart of', 'Chain of', 'Mirror of', 'Bell of', 'Ash-', 'Cup of'];
const RELIC_NOUN = ['the First Dawn', 'the Drowned King', 'Endless Winter', 'the Last Oath', 'Seven Thunders', 'the Hollow Moon', 'the Ember Throne', 'the Silent Bell', 'the Broken Star', 'the Ninth Wave', 'the Nameless Saint', 'the Sleeping Mountain'];
const RELIC_PREFIX_ES = ['Corona de', 'Ojo de', 'Cetro de', 'Lágrima de', 'Corazón de', 'Cadena de', 'Espejo de', 'Campana de', 'Ceniza de', 'Copa de'];
const RELIC_NOUN_ES = ['la Primera Aurora', 'el Rey Ahogado', 'el Invierno Eterno', 'el Último Juramento', 'los Siete Truenos', 'la Luna Hueca', 'el Trono de Brasas', 'la Campana Silente', 'la Estrella Rota', 'la Novena Ola', 'el Santo sin Nombre', 'la Montaña Dormida'];

export const RIVAL_POOL = [
  { name: 'Zeus', epithet: 'The Thunderer', pantheon: 'Olympian', domain: 'storm' },
  { name: 'Athena', epithet: 'The Grey-Eyed', pantheon: 'Olympian', domain: 'wisdom' },
  { name: 'Hades', epithet: 'Keeper of Keys', pantheon: 'Chthonic', domain: 'death' },
  { name: 'Aphrodite', epithet: 'Foam-Born', pantheon: 'Olympian', domain: 'love' },
  { name: 'Ares', epithet: 'Sacker of Cities', pantheon: 'Olympian', domain: 'war' },
  { name: 'Poseidon', epithet: 'Earth-Shaker', pantheon: 'Olympian', domain: 'sea' },
  { name: 'Hephaestus', epithet: 'The Lamplit', pantheon: 'Olympian', domain: 'forge' },
  { name: 'Artemis', epithet: 'The Unyielding', pantheon: 'Olympian', domain: 'moon' },
  { name: 'Apollo', epithet: 'The Far-Shining', pantheon: 'Olympian', domain: 'sun' },
  { name: 'Hera', epithet: 'Throne-Keeper', pantheon: 'Olympian', domain: 'love' },
  { name: 'Odin', epithet: 'All-Father', pantheon: 'Aesir', domain: 'wisdom' },
  { name: 'Thor', epithet: 'Warden of Midgard', pantheon: 'Aesir', domain: 'storm' },
  { name: 'Loki', epithet: 'Sky-Walker', pantheon: 'Aesir', domain: 'trickery' },
  { name: 'Freyja', epithet: 'Mistress of Seiðr', pantheon: 'Vanir', domain: 'love' },
  { name: 'Hel', epithet: 'Half-Lit', pantheon: 'Jotun', domain: 'death' },
  { name: 'Tyr', epithet: 'The One-Handed', pantheon: 'Aesir', domain: 'war' },
  { name: 'Ra', epithet: 'The Noon Sun', pantheon: 'Heliopolitan', domain: 'sun' },
  { name: 'Anubis', epithet: 'Guide of Souls', pantheon: 'Heliopolitan', domain: 'death' },
  { name: 'Isis', epithet: 'Thousand-Named', pantheon: 'Heliopolitan', domain: 'wisdom' },
  { name: 'Set', epithet: 'Lord of Red Sands', pantheon: 'Heliopolitan', domain: 'storm' },
  { name: 'Horus', epithet: 'The Distant One', pantheon: 'Heliopolitan', domain: 'sun' },
  { name: 'Amaterasu', epithet: 'Heaven-Shining', pantheon: 'Shinto', domain: 'sun' },
  { name: 'Susanoo', epithet: 'Storm of the Sea', pantheon: 'Shinto', domain: 'storm' },
  { name: 'Inari', epithet: 'Thousand-Gated', pantheon: 'Shinto', domain: 'nature' },
  { name: 'Tsukuyomi', epithet: 'The Cold Light', pantheon: 'Shinto', domain: 'moon' },
  { name: 'Shiva', epithet: 'The Dancer', pantheon: 'Vedic', domain: 'time' },
  { name: 'Kali', epithet: 'The Black Mother', pantheon: 'Vedic', domain: 'death' },
  { name: 'Vishnu', epithet: 'The Preserver', pantheon: 'Vedic', domain: 'time' },
  { name: 'Indra', epithet: 'Vajra-Bearer', pantheon: 'Vedic', domain: 'storm' },
  { name: 'Quetzalcoatl', epithet: 'Feathered Serpent', pantheon: 'Aztec', domain: 'wisdom' },
  { name: 'Tezcatlipoca', epithet: 'Smoking Mirror', pantheon: 'Aztec', domain: 'trickery' },
  { name: 'Tlaloc', epithet: 'He Who Makes Things Sprout', pantheon: 'Aztec', domain: 'storm' },
  { name: 'Morrigan', epithet: 'Phantom Queen', pantheon: 'Celtic', domain: 'war' },
  { name: 'The Dagda', epithet: 'The Good God', pantheon: 'Celtic', domain: 'nature' },
  { name: 'Brigid', epithet: 'Flame of the Forge', pantheon: 'Celtic', domain: 'forge' },
  { name: 'Anansi', epithet: 'The Story-Spinner', pantheon: 'Akan', domain: 'trickery' },
  { name: 'Enlil', epithet: 'Lord of the Air', pantheon: 'Mesopotamian', domain: 'storm' },
  { name: 'Inanna', epithet: 'Queen of Heaven', pantheon: 'Mesopotamian', domain: 'love' },
  { name: 'Marduk', epithet: 'Dragon-Slayer', pantheon: 'Mesopotamian', domain: 'war' },
  { name: 'Nyx', epithet: 'The First Night', pantheon: 'Primeval', domain: 'moon' },
];

export const EVENTS = [
  {
    id: 'prayer', title: 'A Prayer in the Dark',
    text: 'A dying child prays to you by name. No priest is present. No temple stands near. Just one small voice, asking you to make the fever stop.',
    choices: [
      { label: 'Answer the prayer', effects: { faith: -8, followersPct: 0.1, wisdom: 2 }, result: 'The fever breaks. By morning, the village has built you a shrine out of firewood and wonder.' },
      { label: 'Send a silent sign', effects: { faith: -3, influence: 2, followersPct: 0.04 }, result: 'A white moth settles on the child\'s pillow. The family understands, though they cannot say why.' },
      { label: 'Let the wheel turn', effects: { wisdom: 3, power: 1, followersPct: -0.02 }, result: 'The child passes. You learn something grief-shaped about mortals, and the lesson settles into your bones.' },
    ],
  },
  {
    id: 'drought', title: 'The Long Drought',
    text: 'The rivers have shrunk to brown threads. Your people gather at the dry riverbed and sing until their voices crack.',
    choices: [
      { label: 'Break the sky open', effects: { faith: -10, followersPct: 0.15, influence: 2 }, result: 'Rain falls for nine days. The river returns with fish in it, and the songs grow loud.' },
      { label: 'Demand a sacrifice', effects: { faith: 12, followersPct: -0.08, power: 3 }, result: 'They give you a bull and their best wine. The rain comes late. Some forgive you. Some do not.' },
      { label: 'Teach them to dig', effects: { wisdom: 3, followersPct: 0.05, faith: 2 }, result: 'Wells appear in every village. They learn that your gifts are sometimes instructions.' },
    ],
  },
  {
    id: 'herald', title: 'A Rival\'s Herald',
    text: 'A herald in the colors of {rival} arrives at your temple. "My master offers you a place at their table," he says, "if you will bend the knee."',
    choices: [
      { label: 'Defy the rival', effects: { power: 3, influence: 3, followersPct: 0.06 }, result: 'You send the herald home with his shoes full of thunder. The tale spreads faster than any sermon.' },
      { label: 'Accept the offer', effects: { faith: 10, influence: 4, power: -2 }, result: 'You sit at their table and say nothing. A week later, two of their cults quietly begin to pray to you.' },
      { label: 'Bribe the herald', effects: { faith: -6, influence: 2, wisdom: 1 }, result: 'The herald leaves rich and compromised. His master never learns what was said in your hall.' },
    ],
  },
  {
    id: 'idol', title: 'The Shattered Idol',
    text: 'Lightning strikes your greatest statue during a festival. Its face lies in pieces at the feet of a stunned crowd. They look up, waiting to see what you make of this insult.',
    choices: [
      { label: 'Rebuild it twice as tall', effects: { faith: -9, influence: 4, followersPct: 0.06 }, result: 'Scaffolding covers the plaza for a year. When the cloth comes down, the new idol casts a shadow over the palace.' },
      { label: 'Let the ruins stand', effects: { wisdom: 3, faith: 6, followersPct: 0.02 }, result: 'You let them keep the broken face. Pilgrims come to touch the cracks. It becomes the holiest thing you own.' },
      { label: 'Mend it with light', effects: { faith: -14, followersPct: 0.12, power: 2 }, result: 'The stone rises and joins itself in front of ten thousand witnesses. There is no word for the sound they make.' },
    ],
  },
  {
    id: 'heresy', title: 'The Prophet\'s Heresy',
    text: 'A wandering prophet claims you are only the servant of a greater god. Their sermons are beautiful. Half your priesthood is listening.',
    choices: [
      { label: 'Debate the prophet', effects: { wisdom: 3, influence: 3, faith: -4 }, result: 'You meet them under an olive tree for three days. On the fourth, the prophet weeps and admits they were never sure.' },
      { label: 'Strike them down', effects: { power: 4, followersPct: -0.06, influence: 1 }, result: 'The prophet falls at noon. Their followers scatter, but their words go underground and grow roots.' },
      { label: 'Bless their ministry', effects: { faith: 6, wisdom: 2, influence: -2 }, result: 'You bless the prophet in public. Confused, they spend the rest of their life trying to explain why.' },
    ],
  },
  {
    id: 'star', title: 'A Star Falls',
    text: 'Something burns across the night and lands in the hills. The air tastes of iron and old light. Your priests ask what it means.',
    choices: [
      { label: 'Claim it as your sign', effects: { power: 3, influence: 3, followersPct: 0.07 }, result: 'You raise the fallen star on a pillar of black stone. The other gods begin to send spies.' },
      { label: 'Study its nature', effects: { wisdom: 4, power: 2, faith: -3 }, result: 'It is older than the world. You spend a season learning its language, and it teaches you one true thing.' },
      { label: 'Seal it away', effects: { wisdom: 2, faith: 6, influence: -1 }, result: 'You bury it deep and set a silent order to watch the ground. Some doors are holier shut.' },
    ],
  },
  {
    id: 'queen', title: 'The Mortal Queen',
    text: 'A queen who does not believe in you sends an envoy. She offers an alliance: her armies, her roads, her silver—if you will bless her dynasty alone.',
    choices: [
      { label: 'Accept the alliance', effects: { followersPct: 0.1, influence: 5, faith: -4 }, result: 'Her legions march under your sigil. The priests grumble, but the collection plates are heavy.' },
      { label: 'Refuse the throne', effects: { faith: 8, wisdom: 2, influence: -2 }, result: 'You bless the beggars of her city instead. It costs you a queen and earns you ten thousand small believers.' },
      { label: 'Test her devotion', effects: { faith: -6, wisdom: 3, followersPct: 0.05 }, result: 'You ask her to give up something she loves. She does. You are not sure whether to be impressed or afraid.' },
    ],
  },
  {
    id: 'shard', title: 'Forge of the Fallen',
    text: 'In the ruins of an old god\'s forge, you find a shard of something that predates language. It hums when you touch it.',
    choices: [
      { label: 'Forge it into a relic', effects: { faith: -8, power: 5, relic: true }, result: 'The shard drinks your blood and becomes something new. It remembers being a star.' },
      { label: 'Give it to your smiths', effects: { faith: 6, influence: 3, wisdom: 1 }, result: 'Your mortal smiths make wonders from the shavings. They will never know what they were working with.' },
      { label: 'Return it to the earth', effects: { wisdom: 4, faith: 4, power: -1 }, result: 'You bury it where the old god fell. That night, you dream of a hand closing around yours.' },
    ],
  },
  {
    id: 'flood', title: 'The Sea Remembers',
    text: 'A flood rises against the coast. It is not weather. Something beneath the water is pulling the ocean toward your cities like a blanket.',
    choices: [
      { label: 'Hold back the sea', effects: { faith: -12, power: 4, followersPct: 0.1 }, result: 'You stand on the seawall for three days, and the water kneels. The coast will tell this story forever.' },
      { label: 'Let it cleanse the coast', effects: { power: 4, followersPct: -0.07, faith: 6 }, result: 'The old harbors drown. What survives is leaner, harder, and far more devout.' },
      { label: 'Bargain with the deep', effects: { influence: 4, wisdom: 2, faith: -5 }, result: 'You speak to what lives below. It accepts your terms and asks for one name, which you do not give.' },
    ],
  },
  {
    id: 'prophecy', title: 'A Child of Prophecy',
    text: 'A child is born under three moons. Every temple in the region claims the birth as their own. The child\'s mother prays only to you.',
    choices: [
      { label: 'Bless the child', effects: { faith: -7, followersPct: 0.08, influence: 3 }, result: 'You touch the cradle. The child will grow up to unite a nation, and to forget your name for twenty years.' },
      { label: 'Take the child', effects: { power: 5, faith: 4, followersPct: -0.04 }, result: 'Your priests raise them in the high temple. They are brilliant, obedient, and terribly lonely.' },
      { label: 'Hide the child', effects: { wisdom: 4, faith: 3, influence: -1 }, result: 'You erase every omen. The child grows up a fisher, happy and unremarkable. You never tell anyone why.' },
    ],
  },
  {
    id: 'empty', title: 'The Empty Temple',
    text: 'The great temple is half empty tonight. The songs are the same, but the room is not. Faith is a fire, and yours is burning low.',
    choices: [
      { label: 'Work a public miracle', effects: { faith: -15, followersPct: 0.12, influence: 3 }, result: 'You heal the whole square. By dusk, the temple is standing room only and the priests are hoarse.' },
      { label: 'Preach a harder truth', effects: { faith: 9, wisdom: 2, followersPct: -0.03 }, result: 'You tell them what you really are. Some leave. The ones who stay will never leave again.' },
      { label: 'Open the doors to all', effects: { influence: 4, followersPct: 0.06, faith: -4 }, result: 'You tear down the entry fee and the caste marks. The old families are furious. The streets are full.' },
    ],
  },
  {
    id: 'moons', title: 'Twin Moons Align',
    text: 'Two moons stand shoulder to shoulder for the first time in nine hundred years. The air is thin and bright. Every oracle in the world is awake.',
    choices: [
      { label: 'Meditate beneath them', effects: { wisdom: 4, power: 3, faith: 2 }, result: 'You sit in the silver light until your thoughts go quiet. Something ancient sits down beside you.' },
      { label: 'Declare a grand festival', effects: { faith: -12, followersPct: 0.13, influence: 4 }, result: 'You empty the temples into the streets. Nine hundred years from now, they will still be dancing.' },
      { label: 'Read the omen', effects: { wisdom: 3, faith: 5, influence: 1 }, result: 'The omen is not about you. It is about what comes after you. You decide not to tell anyone.' },
    ],
  },
  {
    id: 'dying', title: 'A God Is Dying',
    text: '{rival} has not answered a prayer in a year. Their cults are starving. Their temples are being sold for roof tiles. An envoy asks if you will take their remaining worshippers.',
    choices: [
      { label: 'Absorb their cults', effects: { followersPct: 0.14, faith: 8, influence: -2 }, result: 'You take the hungry and the frightened. Some of them still whisper the old name when they think you are not listening.' },
      { label: 'Send them aid', effects: { faith: -8, wisdom: 3, influence: 5 }, result: 'You feed a rival\'s flock in your own name and ask nothing. It is the most terrifying thing you have ever done.' },
      { label: 'Let them fade', effects: { power: 5, wisdom: 2, followersPct: 0.03 }, result: 'A god dies in the dark. You feel the vacancy like a pulled tooth, and something in the cosmos shifts toward you.' },
    ],
  },
  {
    id: 'crown', title: 'The Crown of the Void',
    text: 'A crown of no material appears on your altar. It has no weight. When you look at it, you remember being nothing, and how much you liked it.',
    choices: [
      { label: 'Wear it', effects: { power: 8, wisdom: -3, influence: 4 }, result: 'The crown settles. Everything becomes very clear and very far away. Your priests say your shadow no longer falls in the right direction.' },
      { label: 'Break it', effects: { wisdom: 5, faith: 8, power: -2 }, result: 'It shatters without sound. You feel the void flinch, and then forget you entirely.' },
      { label: 'Hide it away', effects: { wisdom: 3, influence: 2, faith: 3 }, result: 'You bury it under a mountain with seven seals. The eighth seal you keep in your chest, where no one can reach.' },
    ],
  },
  {
    id: 'bones', title: 'An Old God\'s Bones',
    text: 'They find the skeleton of a god who died before the invention of the plough. Its ribs arch over a valley like the beams of a ruined cathedral.',
    choices: [
      { label: 'Build a shrine in the ribs', effects: { faith: 10, influence: 4, followersPct: 0.07 }, result: 'Pilgrims walk through the dead god\'s chest and leave offerings in its shadow. It does not seem to mind.' },
      { label: 'Study the remains', effects: { wisdom: 5, power: 2, faith: -3 }, result: 'From the bones you learn the shape of a god who is remembered by no one. You write their name down before it disappears.' },
      { label: 'Devour its power', effects: { power: 7, faith: -5, influence: -1 }, result: 'You take what is left. The valley goes quiet. For a week, your dreams are not your own.' },
    ],
  },
  {
    id: 'plague', title: 'The Grey Cough',
    text: 'A plague moves through your cities. It has no respect for prayer. Your priests are dying beside the people they bless.',
    choices: [
      { label: 'Heal the sick', effects: { faith: -18, followersPct: 0.12, influence: 3 }, result: 'You spend yourself against the plague for a season. You save most of them. You remember every face you lose.' },
      { label: 'Quarantine the cities', effects: { wisdom: 4, influence: 4, followersPct: -0.04 }, result: 'Your orders are brutal and effective. The plague breaks. The survivors will argue about the cost for generations.' },
      { label: 'Let it burn through', effects: { power: 5, faith: 8, followersPct: -0.1 }, result: 'The plague takes a third of them. The rest pray harder than ever, with the particular devotion of the spared.' },
    ],
  },
  {
    id: 'titan', title: 'The Wandering Titan',
    text: 'A titan from the elder wars walks through your territory. It does not stop for temples. It does not even seem to see them.',
    choices: [
      { label: 'Meet it in battle', effects: { power: 7, influence: 4, followersPct: -0.05 }, result: 'You fight for a day and a night. The titan kneels at dusk. Your people build a hill out of the fallen stones.' },
      { label: 'Guide it away', effects: { wisdom: 4, influence: 3, faith: -5 }, result: 'You walk beside it for a hundred miles, singing the old songs. It turns south, away from your cities, and never returns.' },
      { label: 'Hide your people', effects: { faith: 7, followersPct: 0.03, power: -2 }, result: 'You draw a mist over the cities. The titan passes through your land and sees only empty hills.' },
    ],
  },
  {
    id: 'conclave', title: 'The Gods\' Assembly',
    text: '{rival} summons the divine powers to settle an ancient dispute. Your name is on the invitation, though no one admits who added it.',
    choices: [
      { label: 'Speak for the younger gods', effects: { influence: 5, wisdom: 3, power: -2 }, result: 'You give the unseated gods a voice. The old guard calls it insolence; the rest call it a beginning.' },
      { label: 'Challenge the host', effects: { power: 6, followersPct: 0.04, influence: -3 }, result: 'You name the host a coward before the full assembly. The challenge is accepted, and every throne turns to watch.' },
      { label: 'Leave with the secret', effects: { wisdom: 5, faith: 4, influence: 2 }, result: 'You uncover the real cause of the dispute and leave before anyone can ask what you know.' },
    ],
  },
  {
    id: 'true-name', title: 'The Name Beneath Your Name',
    text: 'An oracle speaks a name no mortal should know. Across the world, your oldest shrines answer with a light you have not seen since your first prayer.',
    choices: [
      { label: 'Claim the name', effects: { power: 5, faith: 5, influence: -2 }, result: 'The name settles into you like a second heartbeat. Every shrine flares, and every rival feels the change.' },
      { label: 'Give it to your priests', effects: { followersPct: 0.09, wisdom: 3, faith: -4 }, result: 'Your priests guard the syllables in a new sacred hymn. Pilgrims travel from distant lands to learn its refrain.' },
      { label: 'Bury it again', effects: { wisdom: 5, influence: 2, power: -1 }, result: 'You seal the name beneath the first altar you ever raised. The oracle forgets it before sunrise.' },
    ],
  },
  {
    id: 'mortal-apotheosis', title: 'A Mortal Reaches for Heaven',
    text: 'A beloved hero refuses the crown your priests offer and declares that mortals need no gods. Their words are stirring, and your temples are listening.',
    choices: [
      { label: 'Raise them as a demigod', effects: { faith: -8, influence: 5, followersPct: 0.06 }, result: 'You share a spark of divinity. The new demigod kneels to no one, but stands beside you.' },
      { label: 'Debate them before the people', effects: { wisdom: 4, influence: 3, faith: 3 }, result: 'You meet beneath the open sky. Neither of you wins, and the people leave with better questions.' },
      { label: 'Let their legend grow', effects: { followersPct: -0.04, power: 4, wisdom: 3 }, result: 'You do not interfere. Their legend grows—and your people learn that faith freely given is worth more.' },
    ],
  },
  {
    id: 'divine-envoy', title: 'An Envoy from Beyond the Veil',
    text: 'A messenger arrives from a realm beyond mortal sight, bearing a treaty signed by gods whose constellations vanished before the first dawn.',
    choices: [
      { label: 'Sign the treaty', effects: { influence: 5, faith: 4, power: -2 }, result: 'The ink burns cold. Somewhere beyond the veil, an ancient power now knows your name.' },
      { label: 'Demand a divine gift', effects: { power: 4, wisdom: 2, faith: -5 }, result: 'The envoy leaves a drop of starfire in your palm and a warning that it must never be spilled.' },
      { label: 'Send the envoy away', effects: { wisdom: 4, followersPct: 0.04, influence: 1 }, result: 'You refuse to bind your fate to a vanished pantheon. The messenger bows, almost as if relieved.' },
    ],
  },
];

export const FALLBACK_EVENTS = [
  {
    id: 'omen-1', title: 'A Quiet Omen',
    text: 'A white stag walks through your temple at dawn and leaves without leaving hoofprints. The priests argue about what it means.',
    choices: [
      { label: 'Read it as a blessing', effects: { faith: 7, followersPct: 0.03 }, result: 'You let them believe it was a blessing. Sometimes belief is the point.' },
      { label: 'Follow the stag', effects: { wisdom: 3, power: 2 }, result: 'It leads you to a spring that was not there yesterday. You drink, and understand something new.' },
    ],
  },
  {
    id: 'omen-2', title: 'A Generous Harvest',
    text: 'The harvest is so abundant that the granaries burst. Your people credit you. They are mostly right.',
    choices: [
      { label: 'Declare a feast', effects: { faith: -5, followersPct: 0.08, influence: 2 }, result: 'The feast lasts a week. Three marriages and one war begin at your table.' },
      { label: 'Store the surplus', effects: { wisdom: 2, faith: 4, followersPct: 0.04 }, result: 'The grain silos fill. When the lean years come, they will remember who told them to save.' },
    ],
  },
  {
    id: 'omen-3', title: 'The Pilgrim Road',
    text: 'A new road opens between two of your holy cities. Merchants, beggars, and the curious begin to flow along it.',
    choices: [
      { label: 'Bless the travelers', effects: { faith: 5, influence: 3, followersPct: 0.05 }, result: 'Your name travels faster than any army. It arrives in places you have never heard of.' },
      { label: 'Build waystones', effects: { wisdom: 2, faith: 3, influence: 2 }, result: 'Every mile has a stone with your sigil. The road itself becomes a slow prayer.' },
    ],
  },
];

export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export function roman(n) {
  const table = [[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];
  let out = '';
  for (const [v, s] of table) while (n >= v) { out += s; n -= v; }
  return out || 'I';
}

export function fmt(n) {
  n = Math.round(n);
  if (n >= 1e9) return (n / 1e9).toFixed(n >= 1e10 ? 0 : 1).replace(/\.0$/, '') + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(n >= 1e7 ? 1 : 2).replace(/\.0+$/, '') + 'M';
  if (n >= 1e4) return (n / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
  if (n >= 1000) return n.toLocaleString(numberLocale);
  return String(n);
}

export function domainOf(id) { return DOMAINS.find(d => d.id === id) || DOMAINS[0]; }
export function lineageOf(id) { return LINEAGES.find(l => l.id === id) || LINEAGES[0]; }
export function raceOf(id) { return STARTER_RACES.find(r => r.id === id) || STARTER_RACES[0]; }
export function traitOf(id) { return TRAITS.find(t => t.id === id) || TRAITS[0]; }

export function combinedMods(state) {
  const m = { growth: 0, faithPerAeon: 0, powerPerAeon: 0, wisdomPerAeon: 0, influencePerAeon: 0, miracleBonus: 0, smiteBonus: 0, relicBonus: 0, relicDiscount: 0, apEvery3: false };
  const add = mods => { if (!mods) return; for (const k of Object.keys(mods)) { if (k === 'apEvery3') m.apEvery3 = m.apEvery3 || !!mods[k]; else m[k] = (m[k] || 0) + mods[k]; } };
  add(domainOf(state.god.domain).mods);
  add(lineageOf(state.god.lineage).mods);
  for (const r of state.races || []) add(r.mods);
  return m;
}

export function apMax(state) {
  const rank = state.rank || 0;
  let ap = 3 + (rank >= 3 ? 1 : 0) + (rank >= 6 ? 1 : 0);
  if (combinedMods(state).apEvery3 && (state.aeon || 1) % 3 === 0) ap += 1;
  return ap;
}

export function computeMight(state) {
  const f = Math.pow(Math.max(0, state.followers), 0.72) * 6;
  const stats = state.stats;
  const relicMight = (state.relics || []).reduce((a, r) => a + r.power, 0);
  const rank = state.rank || 0;
  const rankBonus = rank * 400 + rank * rank * 180;
  return Math.round(f + stats.faith * 18 + stats.wisdom * 18 + stats.power * 16 + stats.influence * 14 + relicMight + rankBonus);
}

export function applyChanges(state, c = {}) {
  const before = state.followers;
  let f = before;
  if (c.followersFlat) f += c.followersFlat;
  if (c.followersPct) f *= (1 + c.followersPct);
  state.followers = Math.max(0, Math.round(f));
  const changes = { followers: state.followers - before };
  for (const k of ['faith', 'power', 'wisdom', 'influence']) {
    if (c[k]) {
      const old = state.stats[k];
      state.stats[k] = Math.max(0, old + c[k]);
      changes[k] = state.stats[k] - old;
    }
  }
  return changes;
}

export function canAfford(state, action) {
  if ((state.ap || 0) < (action.ap || 0)) return false;
  for (const [k, v] of Object.entries(action.cost || {})) {
    if (k === 'faith' || k === 'power') { if (state.stats[k] < v) return false; }
  }
  return true;
}

export function missingReason(state, action) {
  if ((state.ap || 0) < action.ap) return `Requires ${action.ap} actions`;
  for (const [k, v] of Object.entries(action.cost || {})) {
    if ((k === 'faith' || k === 'power') && state.stats[k] < v) return `Requires ${v} ${k}`;
  }
  return '';
}

export function makeRelic(state, rng = Math.random) {
  const m = combinedMods(state);
  const power = Math.round((260 + (state.rank || 0) * 150 + rng() * 180) * (1 + m.relicBonus));
  const es = state.locale === 'es';
  const prefixes = es ? RELIC_PREFIX_ES : RELIC_PREFIX;
  const nouns = es ? RELIC_NOUN_ES : RELIC_NOUN;
  const name = prefixes[Math.floor(rng() * prefixes.length)] + ' ' + nouns[Math.floor(rng() * nouns.length)];
  return { id: 'r' + Date.now() + Math.floor(rng() * 999), name, power };
}

export function performAction(state, actionId, rng = Math.random) {
  const action = ACTIONS.find(a => a.id === actionId);
  if (!action) return { ok: false, error: 'Unknown action.' };
  if (!canAfford(state, action)) return { ok: false, error: missingReason(state, action) || 'Not enough resources.' };
  if (action.special === 'race') return { ok: false, error: 'Choose a race in the forge.' };

  state.ap -= action.ap;
  for (const [k, v] of Object.entries(action.cost || {})) {
    if (k === 'faith' || k === 'power') state.stats[k] = Math.max(0, state.stats[k] - v);
  }
  if (action.special === 'relic') {
    const relic = makeRelic(state, rng);
    state.relics.push(relic);
    return { ok: true, text: `You take a piece of the world and make it holy. The ${relic.name} is born.`, relic, changes: {} };
  }
  const result = action.run(state, rng);
  const changes = applyChanges(state, result.changes);
  return { ok: true, text: result.text, changes };
}

export function makeRivals(rng = Math.random) {
  const pool = [...RIVAL_POOL];
  for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
  const picks = pool.slice(0, 24);
  const rivals = picks.map((g, i) => {
    const base = 43000 * Math.pow(0.9, i) * (0.86 + rng() * 0.3);
    return {
      ...g,
      id: 'rival-' + i,
      might: Math.round(base),
      growth: 0.006 + rng() * 0.013,
      prevMight: Math.round(base),
    };
  });
  return rivals.sort((a, b) => b.might - a.might);
}

export function newGame(draft, rng = Math.random) {
  const starter = raceOf(draft.race);
  const trait = traitOf(starter.trait);
  const state = {
    version: 1,
    god: JSON.parse(JSON.stringify(draft)),
    stats: { faith: 16, power: 12, wisdom: 10, influence: 8 },
    followers: 420,
    aeon: 1,
    age: AGE_START,
    ap: 3,
    rank: 0,
    relics: [],
    relationships: [],
    salonPurchases: [],
    attractiveStick: false,
    races: [{ id: starter.id, name: starter.name, glyph: starter.glyph, color: starter.color, form: starter.form, ears: starter.ears, trait: trait.id, traitName: trait.name, mods: { ...trait.mods }, custom: false }],
    log: [],
    seenEvents: [],
    rivals: makeRivals(rng),
    lastRanks: {},
    victory: false,
  };
  state.ap = apMax(state);
  addLog(state, 'star4',
    'You wake in the space between prayers. The mortal world is small, loud, and entirely yours to shape.',
    'divine',
    'Despiertas en el espacio entre plegarias. El mundo mortal es pequeño, ruidoso y completamente tuyo para moldearlo.');
  addLog(state, 'users',
    `The ${starter.name} are the first to speak your name. ${starter.desc}`,
    'faith',
    `Los ${starter.name} son los primeros en pronunciar tu nombre. ${starter.descEs || starter.desc}`);
  return state;
}

export function addLog(state, icon, text, tone = '', textEs = '') {
  state.log.push({ aeon: state.aeon, icon, text, textEs, tone, at: Date.now() });
  if (state.log.length > 90) state.log.splice(0, state.log.length - 90);
}

export function passiveTick(state, rng = Math.random) {
  const m = combinedMods(state);
  const rank = state.rank || 0;
  const faithBase = state.stats.faith;
  const influenceBase = state.stats.influence;
  const followersGain = Math.round((6 + faithBase * 0.55 + influenceBase * 0.9) * (1 + m.growth + rank * 0.06));
  const gains = {
    followers: followersGain,
    faith: 1 + Math.round(m.faithPerAeon),
    power: 1 + Math.round(m.powerPerAeon),
    wisdom: 1 + Math.round(m.wisdomPerAeon),
    influence: 1 + Math.round(m.influencePerAeon),
  };
  state.followers += gains.followers;
  state.stats.faith += gains.faith;
  state.stats.power += gains.power;
  state.stats.wisdom += gains.wisdom;
  state.stats.influence += gains.influence;

  const surges = [];
  for (const r of state.rivals) {
    r.prevMight = r.might;
    r.might = Math.round(r.might * (1 + r.growth + (rng() - 0.5) * 0.004) + 20);
  }
  if (rng() < 0.55) {
    const r = state.rivals[Math.floor(rng() * state.rivals.length)];
    const boost = 1.02 + rng() * 0.04;
    r.might = Math.round(r.might * boost);
    surges.push({
      rival: r,
      text: `Cults of ${r.name} swell in the night. Their might rises sharply.`,
      textEs: `Los cultos de ${r.name} crecen en la noche. Su poder se dispara.`,
    });
  }
  return { gains, surges };
}

export function rankMap(state) {
  const all = [...state.rivals.map(r => ({ key: r.name, might: r.might })), { key: 'YOU', might: computeMight(state) }];
  all.sort((a, b) => b.might - a.might);
  const map = {};
  all.forEach((e, i) => { map[e.key] = i + 1; });
  return map;
}

export function standing(state) {
  const might = computeMight(state);
  const above = state.rivals.filter(r => r.might > might).length;
  return { might, rank: above + 1, total: state.rivals.length + 1 };
}

export function canAscend(state) {
  return state.rank < RANKS.length - 1 && computeMight(state) >= RANKS[state.rank + 1].need;
}

export function ascend(state) {
  if (!canAscend(state)) return null;
  const from = RANKS[state.rank];
  state.rank += 1;
  const to = RANKS[state.rank];
  const beforeMight = computeMight(state);
  state.followers = Math.round(state.followers * 1.12);
  state.stats.faith += 10;
  state.stats.power += 6;
  state.stats.wisdom += 6;
  state.stats.influence += 4;
  state.ap = apMax(state);
  addLog(state, 'crown',
    `You ascend from ${from.name} to ${to.name}. The heavens rearrange themselves around your throne.`,
    'rank',
    `Asciendes de ${from.name} a ${to.name}. Los cielos se reorganizan alrededor de tu trono.`);
  return { from, to, afterMight: computeMight(state), gainedMight: computeMight(state) - beforeMight };
}

export function applyEventChoice(state, choice) {
  const changes = applyChanges(state, choice.effects || {});
  let relic = null;
  if (choice.effects && choice.effects.relic) {
    relic = makeRelic(state);
    state.relics.push(relic);
  }
  return { changes, relic, result: choice.result };
}

export function pickEvent(state, rng = Math.random) {
  let pool = EVENTS.filter(e => !state.seenEvents.includes(e.id));
  if (!pool.length) pool = FALLBACK_EVENTS.slice();
  const ev = pool[Math.floor(rng() * pool.length)];
  const rival = state.rivals[Math.floor(rng() * state.rivals.length)];
  const clone = JSON.parse(JSON.stringify(ev));
  const swap = str => (str || '').replace(/\{rival\}/g, rival ? rival.name : 'a rival god');
  clone.title = swap(clone.title);
  clone.text = swap(clone.text);
  clone.rivalName = rival ? rival.name : 'a rival god';
  clone.choices = clone.choices.map(c => ({ ...c, result: swap(c.result) }));
  if (!state.seenEvents.includes(ev.id)) state.seenEvents.push(ev.id);
  return clone;
}

export function endAeon(state, rng = Math.random) {
  const before = rankMap(state);
  const currentAge = Number.isFinite(state.age) && state.age >= AGE_START
    ? state.age
    : AGE_START + Math.max(0, (state.aeon || 1) - 1) * AGE_PER_AEON;
  const { gains, surges } = passiveTick(state, rng);
  state.aeon += 1;
  state.age = currentAge + AGE_PER_AEON;
  state.ap = apMax(state);
  state.lastRanks = before;
  const text = `The world turns. ${fmt(gains.followers)} souls join your flock, and devotion gathers in the dark.`;
  const textEs = `El mundo gira. ${fmt(gains.followers)} almas se unen a tu rebaño, y la devoción se reúne en la oscuridad.`;
  addLog(state, 'sun', text, 'faith', textEs);
  for (const s of surges) addLog(state, 'crown', s.text, 'rival', s.textEs);
  const milestone = AGE_MILESTONES[state.age];
  if (milestone) addLog(state, 'hourglass', milestone.en, 'divine', milestone.es);
  return { gains, surges, event: rng() < 0.72 ? pickEvent(state, rng) : null };
}
