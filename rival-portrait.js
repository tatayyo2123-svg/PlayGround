// Stable appearances give every rival a recognizable face, including in older saves.
import { renderPortrait } from './portrait.js';

export function rivalPortrait(rival) {
  let seed = 2166136261;
  for (const char of rival.name) seed = Math.imul(seed ^ char.charCodeAt(0), 16777619) >>> 0;
  const pick = list => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return list[seed % list.length];
  };
  const appearance = {
    skin: pick(['#f0c6a4', '#d6a17e', '#a96f50', '#774b38', '#563729', '#dfb69b']),
    hairColor: pick(['#211923', '#523126', '#896144', '#c5a16b', '#a94e37', '#e3d8bd']),
    eyeColor: pick(['#6fa3ac', '#8eaf80', '#a47a54', '#786b9c', '#d4a554']),
    face: pick(['oval', 'angular', 'round', 'heart', 'long']),
    eyeShape: pick(['almond', 'round', 'sharp', 'gentle']),
    hairStyle: pick(['flowing', 'short', 'braided', 'topknot', 'wild', 'curls', 'locs', 'bun', 'ponytail']),
    crown: pick(['none', 'laurel', 'circlet', 'halo']),
    markings: pick(['none', 'none', 'rune', 'constellation']),
  };
  return renderPortrait({ ...rival, ...appearance }, { crop: 'face' });
}
