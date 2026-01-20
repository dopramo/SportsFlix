
export const TARGET_CHANNELS = [
  "cricket gold","a sports","willow","ptv sports","fancode","wwe",
  "golf channel","dd sports","star sports select 1","star sports select 2",
  "star sports 1","star sports 2","star sports 1 hindi","espn","espn 1","espn 2","geo super","tsports","t sports","sky cricket",
  "sony ten 1","sony ten 2","sony ten 3","sony ten 5","sony sports 3","peo sports 1","the papare",
  "fox sports","fox","fox cricket","cbs sports","red bull","bein sports","ten cricket","ten sports","astro","astro cricket",
  "tnt 1","tnt 2","tnt 3","tnt 4","premier sports 1","premier sports 2","premier sports 3",
  "persiana sports 1","persiana sports 2","persiana sports 3","persiana sports 4",
  "sky sports cricket","sky sports main event","sky cinema","sky sports action","sky sports golf",
  "sky sports premier league","sky sports football","sky sports plus","sky sports f1",
  "sky sports arena","sky sports mix","sky sports tennis","laliga",
  "super football","super premier league","willow hd 2"
];

// Channel display order for home page
export const CHANNEL_ORDER = [
  "a sports hd",
  "a sports",
  "t sports",
  "geo super",
  "the papare",
  "ptv sports",
  "star sports 1",
  "star sports 1 hindi",
  "star sports 2",
  "star sports select 1",
  "star sports select 2",
  "sony ten 1",
  "sony ten 2",
  "sony ten 3",
  "sony sports3",
  "sony sports 3",
  "sony ten 5",
  "willow hd",
  "willow",
  "willow xtra",
  "willow hd 2",
  "sky sports cricket",
  "tnt sports 1",
  "tnt sports 2",
  "tnt sports 3",
  "tnt sports 4",
  "tnt 1",
  "tnt 2",
  "tnt 3",
  "tnt 4",
  "ten sports",
  "ten cricket",
  "red bull",
  "cricket gold",
  "dd sports"
];

// Allowed M3U channels only (filter out others)
export const ALLOWED_M3U_CHANNELS = [
  "a sports hd",
  "a sports",
  "t sports",
  "geo super",
  "the papare",
  "ptv sports",
  "star sports 1",
  "star sports 1 hindi",
  "star sports 2",
  "star sports select 1",
  "star sports select 2",
  "sony ten 1",
  "sony ten 2",
  "sony ten 3",
  "sony sports3",
  "sony sports 3",
  "sony ten 5",
  "willow hd",
  "willow",
  "willow xtra",
  "willow hd 2",
  "sky sports cricket",
  "tnt sports 1",
  "tnt sports 2",
  "tnt sports 3",
  "tnt sports 4",
  "tnt 1",
  "tnt 2",
  "tnt 3",
  "tnt 4",
  "ten sports",
  "ten cricket",
  "red bull",
  "cricket gold",
  "dd sports"
];

export function getChannelOrder(channelName) {
  const index = CHANNEL_ORDER.indexOf(channelName.toLowerCase());
  return index === -1 ? 9999 : index; // Channels not in order list go to the end
}

export const LOGO_MAP = {
  "a sports": "https://s3.aynaott.com/storage/64de30d2df9b2a888cb73f17614a9a8b",
  "willow": "https://s3.aynaott.com/storage/94a778ec3219f7eb54bdf1ee07a95788",
  "ptv sports": "https://s3.aynaott.com/storage/9d9d7cbfba5a8ceea648bbd963ad1014",
  "fancode": "https://s3.aynaott.com/storage/cd6a179dd0365490479660ed00665aa",
  "golf channel": "https://s3.aynaott.com/storage/edb73991516696dfd53efbd32d80ca58",
  "dd sports": "https://s3.aynaott.com/storage/188500190395c4de0e506d518925dcc4",
  "star sports select 1": "https://s3.aynaott.com/storage/c96957383c33f1948e34fdcc07fbc29f",
  "star sports select 2": "https://s3.aynaott.com/storage/16ee3a1243424dfe8f4341a90afbd46e",
  "star sports 1": "https://s3.aynaott.com/storage/64fb82ecdef7d8b182c944c639c4f8b7",
  "star sports 2": "https://s3.aynaott.com/storage/daeac3b0e17bfabd911bd5dc63c69aa8",
  "geo super": "https://crystalpng.com/wp-content/uploads/2025/04/geo-super-logo.png",
  "tsports": "https://upload.wikimedia.org/wikipedia/commons/4/4c/T_Sports_logo.svg",
  "t sports": "https://upload.wikimedia.org/wikipedia/commons/4/4c/T_Sports_logo.svg",
  "fox sports": "https://s3.aynaott.com/storage/04d612228fedede6da010e5b163d5ac6",
  "cbs sports": "https://s3.aynaott.com/storage/default-cbs.png",
  "bein sports": "https://s3.aynaott.com/storage/04a56bc13c4c486ad4a4d82a1e00fd73",
  "peo sports 1": "https://s3.aynaott.com/storage/b0befd2d80789976ef317aeb5ef935b9",
  "the papare": "https://www.thepapare.com/wp-content/uploads/Logo-01.png",
  "red bull": "https://m.media-amazon.com/images/I/41hkhdw+XvL.png",
  "wwe": "https://s3.aynaott.com/storage/default-wwe.png",
  "espn": "https://s3.aynaott.com/storage/default-espn.png",
  "sony ten 1": "/logo/Sony1.png",
  "sony ten 2": "/logo/sony%202.png",
  "sony ten 3": "/logo/Sony1.png",
  "sony ten 5": "/logo/sony%205.png",
  "sony sports 3": "/logo/Sony1.png",
  "astro": "https://s3.aynaott.com/storage/default-astro.png",
  "astro cricket": "https://s3.aynaott.com/storage/default-astro.png",
  "star sports 1 hindi": "https://s3.aynaott.com/storage/64fb82ecdef7d8b182c944c639c4f8b7",
  "willow hd 2": "https://s3.aynaott.com/storage/94a778ec3219f7eb54bdf1ee07a95788",
  "ten sports": "https://s3.aynaott.com/storage/default-ten.png",
  "espn 1": "https://s3.aynaott.com/storage/default-espn.png",
  "espn 2": "https://s3.aynaott.com/storage/default-espn.png",
  "sky sports cricket": "https://s3.aynaott.com/storage/default-sky.png",
  "sky sports main event": "https://s3.aynaott.com/storage/default-sky.png",
  "sky cinema": "https://s3.aynaott.com/storage/default-sky.png",
  "sky sports action": "https://s3.aynaott.com/storage/default-sky.png",
  "sky sports golf": "https://s3.aynaott.com/storage/default-sky.png",
  "sky sports premier league": "https://s3.aynaott.com/storage/default-sky.png",
  "sky sports football": "https://s3.aynaott.com/storage/default-sky.png",
  "sky sports plus": "https://s3.aynaott.com/storage/default-sky.png",
  "sky sports f1": "https://s3.aynaott.com/storage/default-sky.png",
  "sky sports arena": "https://s3.aynaott.com/storage/default-sky.png",
  "sky sports mix": "https://s3.aynaott.com/storage/default-sky.png",
  "sky sports tennis": "https://s3.aynaott.com/storage/default-sky.png",
  "laliga": "https://s3.aynaott.com/storage/default-laliga.png",
  "super football": "https://s3.aynaott.com/storage/default-super.png",
  "super premier league": "https://s3.aynaott.com/storage/default-super.png",
  "fox cricket": "https://s3.aynaott.com/storage/04d612228fedede6da010e5b163d5ac6",
  "tnt 1": "https://s3.aynaott.com/storage/default-tnt.png",
  "tnt 2": "https://s3.aynaott.com/storage/default-tnt.png",
  "tnt 3": "https://s3.aynaott.com/storage/default-tnt.png",
  "tnt 4": "https://s3.aynaott.com/storage/default-tnt.png",
  "premier sports 1": "https://s3.aynaott.com/storage/default-premier.png",
  "premier sports 2": "https://s3.aynaott.com/storage/default-premier.png",
  "premier sports 3": "https://s3.aynaott.com/storage/default-premier.png",
  "persiana sports 1": "https://s3.aynaott.com/storage/default-persiana.png",
  "persiana sports 2": "https://s3.aynaott.com/storage/default-persiana.png",
  "persiana sports 3": "https://s3.aynaott.com/storage/default-persiana.png",
  "persiana sports 4": "https://s3.aynaott.com/storage/default-persiana.png"
};

export const normalize = n =>
  n.toLowerCase().replace(/hd|fhd|[^a-z0-9\s]/gi," ").replace(/\s+/g," ").trim();

export function matchChannel(name) {
  const norm = normalize(name);
  
  // Exclude patterns - channels that should NOT match
  const excludePatterns = [
    'national geo', 'nat geo', 'natgeo'
  ];
  
  if (excludePatterns.some(pattern => norm.includes(pattern))) {
    return null;
  }
  
  // Direct match first
  for (const target of TARGET_CHANNELS) {
    if (norm === target || norm.includes(target) || target.includes(norm)) {
      return target;
    }
  }
  
  // Special case matching for variations
  const specialCases = {
    'star sports select 1': ['starsportsselect1', 'star sports select 1', 'star select 1', 'star select1', 'ss select1'],
    'star sports select 2': ['starsportsselect2', 'star sports select 2', 'star select 2', 'star select2', 'ss select2'],
    'star sports 2': ['starsports2', 'star sport 2', 'ss2'],
    'star sports 1': ['starsports1', 'star sport 1', 'ss1'],
    'geo super': ['geosuper', 'geo super'],
    'tsports': ['t sports', 'tsport', 't sport'],
    'fox sports': ['fox sport', 'foxsports'],
    'red bull': ['redbull', 'red bull tv'],
    'bein sports': ['beinsports', 'bein sport'],
    'the papare': ['papare'],
    'peo sports 1': ['peo sport 1', 'peosports1'],
    'tnt 1': ['tnt1', 'tnt 1'],
    'tnt 2': ['tnt2', 'tnt 2'],
    'tnt 3': ['tnt3', 'tnt 3'],
    'tnt 4': ['tnt4', 'tnt 4'],
    'premier sports 1': ['premiersports1', 'premier sport 1'],
    'premier sports 2': ['premiersports2', 'premier sport 2'],
    'premier sports 3': ['premiersports3', 'premier sport 3'],
    'persiana sports 1': ['persianasports1', 'persiana sport 1'],
    'persiana sports 2': ['persianasports2', 'persiana sport 2'],
    'persiana sports 3': ['persianasports3', 'persiana sport 3'],
    'persiana sports 4': ['persianasports4', 'persiana sport 4'],
    'star sports 1 hindi': ['star sports 1 hindi', 'star sports 1 hind', 'ss1 hindi', 'star sports hindi'],
    'willow hd 2': ['willow hd 2', 'willow hd2', 'willow 2'],
    'ten sports': ['tensports', 'ten sport'],
    'espn 1': ['espn1', 'espn 1'],
    'espn 2': ['espn2', 'espn 2'],
    'sky sports cricket': ['sky cricket', 'sky sports cricket'],
    'sky sports main event': ['sky main event', 'sky sports main'],
    'sky cinema': ['skycinema'],
    'sky sports action': ['sky action', 'sky sports action'],
    'sky sports golf': ['sky golf', 'sky sports golf'],
    'sky sports premier league': ['sky premier league', 'sky sports pl', 'sky pl'],
    'sky sports football': ['sky football', 'sky sports football'],
    'sky sports plus': ['sky plus', 'sky sports plus'],
    'sky sports f1': ['sky f1', 'sky sports f1'],
    'sky sports arena': ['sky arena', 'sky sports arena'],
    'sky sports mix': ['sky mix', 'sky sports mix'],
    'sky sports tennis': ['sky tennis', 'sky sports tennis'],
    'laliga': ['laliga', 'la liga', 'laliga tv'],
    'super football': ['super football'],
    'super premier league': ['super premier league', 'super pl'],
    'fox cricket': ['fox cricket', 'foxcricket'],
    'sony sports 3': ['sony sports 3', 'sonysports3', 'sony sport 3'],
    'astro cricket': ['astro cricket', 'astrocricket'],
  };
  
  for (const [canonical, variations] of Object.entries(specialCases)) {
    if (variations.some(v => norm.includes(v.replace(/\s+/g, ' ')))) {
      return canonical;
    }
  }
  
  return null;
}

export function getLogo(channelKey) {
  return LOGO_MAP[channelKey] || null;
}
