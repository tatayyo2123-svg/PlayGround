const PATHS = {
  star4: '<path d="M12 2.6 14 10l7.4 2L14 14l-2 7.4L10 14 2.6 12 10 10Z" fill="none"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/>',
  sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>',
  bolt: '<path d="M13 2.5 5 13.5h6l-1 8 9-11.5h-6Z"/>',
  heart: '<path d="M12 20.5C4.5 14.8 4.2 10 6.5 7.2 8.8 4.4 12 5.6 12 8.4c0-2.8 3.2-4 5.5-1.2 2.3 2.8 2 7.6-5.5 13.3Z"/>',
  eye: '<path d="M2.5 12C5 7.8 8.4 5.8 12 5.8s7 2 9.5 6.2c-2.5 4.2-5.9 6.2-9.5 6.2S5 16.2 2.5 12Z"/><circle cx="12" cy="12" r="3.1"/>',
  leaf: '<path d="M4 20C4 10 10 4 20 4c0 10-6 16-16 16Z"/><path d="M4.5 19.5c4-4.5 8-8 12-11.5"/>',
  crown: '<path d="M3.5 18 5 7l4.5 4L12 5l2.5 6L19 7l1.5 11Z"/><path d="M4.5 21h15"/>',
  users: '<circle cx="9" cy="8" r="3.2"/><path d="M3.4 20c.4-4 2.6-6 5.6-6s5.2 2 5.6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M15.7 14.2c2.9-.5 4.6 1.3 4.9 4.3"/>',
  skull: '<path d="M12 3C7.5 3 4.5 6.2 4.5 10.5c0 2.5 1.3 4.3 2.5 5.5V19c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-3c1.2-1.2 2.5-3 2.5-5.5C19.5 6.2 16.5 3 12 3Z"/><circle cx="9.2" cy="10.6" r="1.5"/><circle cx="14.8" cy="10.6" r="1.5"/><path d="M10 16.5v-2M14 16.5v-2M10.5 21v-2M13.5 21v-2"/>',
  sword: '<path d="M4 20 18 6M14 4h6v6M6 4l14 14M4 14l6 6M18 20l2-2"/>',
  moon: '<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4 6.8 6.8 0 0 0 20 14.5Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"/>',
  hammer: '<path d="M14.5 3 21 9.5l-3 3L11.5 6Z"/><path d="M11 7.5 16.5 13 8 21.5 2.5 16Z"/>',
  waves: '<path d="M2 7.5c2-1.8 4-1.8 6 0s4 1.8 6 0 4-1.8 6 0M2 12.5c2-1.8 4-1.8 6 0s4 1.8 6 0 4-1.8 6 0M2 17.5c2-1.8 4-1.8 6 0s4 1.8 6 0 4-1.8 6 0"/>',
  hourglass: '<path d="M6 3h12M6 21h12M7.5 3c0 4.7 4.5 5.7 4.5 9s-4.5 4.3-4.5 9M16.5 3c0 4.7-4.5 5.7-4.5 9s4.5 4.3 4.5 9"/>',
  mountain: '<path d="M2 20 9 6l4 7 3-4 6 11Z"/><path d="M2 20h20"/>',
  flame: '<path d="M12 2c3 4 7 6 7 12 0 4-3 7-7 7s-7-3-7-7c0-4 4-7 7-12Z"/><path d="M12 11c1.5 2 3 3 3 5.5 0 2-1.3 3.5-3 3.5s-3-1.5-3-3.5c0-2.5 1.5-3.5 3-5.5Z"/>',
  gem: '<path d="M7 3h10l4 6-9 12L3 9Z"/><path d="M3 9h18M9 3l3 6 3-6M12 9v12"/>',
  hands: '<path d="M4 13c0 5 3 8 8 8s8-3 8-8"/><path d="M8 15c0-4 2-6 4-6s4 2 4 6"/><path d="M12 3v4M8.5 4.5 10 7M15.5 4.5 14 7"/>',
  footsteps: '<ellipse cx="8" cy="7" rx="2.8" ry="4.4" transform="rotate(-14 8 7)"/><circle cx="8.4" cy="2.6" r="1.1"/><ellipse cx="15.5" cy="16" rx="2.8" ry="4.4" transform="rotate(-14 15.5 16)"/><circle cx="15.9" cy="11.6" r="1.1"/>',
  paw: '<ellipse cx="12" cy="15.5" rx="5.5" ry="4.5"/><circle cx="5.5" cy="10" r="2"/><circle cx="9.5" cy="6.5" r="2.1"/><circle cx="14.5" cy="6.5" r="2.1"/><circle cx="18.5" cy="10" r="2"/>',
  book: '<path d="M4 5c3-1.5 6-1.5 8 0 2-1.5 5-1.5 8 0v15c-3-1.5-6-1.5-8 0-2-1.5-5-1.5-8 0Z"/><path d="M12 5v15"/>',
  close: '<path d="M5 5l14 14M19 5 5 19"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  sound: '<path d="M4 9v6h4l5 4V5L8 9Z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>',
  mute: '<path d="M4 9v6h4l5 4V5L8 9Z"/><path d="M16 9l5 6M21 9l-5 6"/>',
  chevron: '<path d="M6 9l6 6 6-6"/>',
  arrow: '<path d="M4 12h15M13 6l6 6-6 6"/>',
  shield: '<path d="M12 3 20 6v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6Z"/>',
  scale: '<path d="M12 3v18M7 21h10M5 7h14M5 7l-3 6a3.2 3.2 0 0 0 6 0ZM19 7l-3 6a3.2 3.2 0 0 0 6 0Z"/>',
  mask: '<path d="M3.5 5.5C7 4 10 4 12 6c2-2 5-2 8.5-.5-1 7-3.5 12.5-8.5 15-5-2.5-7.5-8-8.5-15Z"/><path d="M7 10c1.5-1 3-1 4 0M13 10c1-1 2.5-1 4 0M9 15c2 1.5 4 1.5 6 0"/>',
  wheel: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3v6M12 15v6M3 12h6M15 12h6"/>',
};

export function icon(name, cls = '') {
  const body = PATHS[name] || PATHS.star4;
  return `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}

export const DOMAIN_ICONS = {
  storm: 'bolt', death: 'skull', love: 'heart', war: 'sword', wisdom: 'eye', nature: 'leaf',
  sun: 'sun', moon: 'moon', trickery: 'mask', forge: 'hammer', sea: 'waves', time: 'hourglass',
};

export const STAT_ICONS = {
  faith: 'star4', power: 'bolt', wisdom: 'eye', influence: 'crown', followers: 'users',
};

export const TRAIT_ICONS = {
  industrious: 'hammer', arcane: 'star4', zealous: 'flame', feral: 'bolt',
  tidal: 'waves', stoic: 'mountain', cosmic: 'moon', apex: 'crown',
};

export const RACE_ICONS = {
  humans: 'users', elves: 'leaf', dwarves: 'mountain', beastkin: 'paw',
  tideborn: 'waves', emberkin: 'flame', starfolk: 'star4', draconians: 'bolt',
  custom: 'gem',
};
