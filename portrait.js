import { domainOf, lineageOf, raceOf, combinedMods } from './data.js';

let uidCounter = 0;

function clamp255(v) { return Math.max(0, Math.min(255, Math.round(v))); }
function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
}
function rgbToHex(r, g, b) { return '#' + [r, g, b].map(v => clamp255(v).toString(16).padStart(2, '0')).join(''); }
export function mix(a, b, t) {
  const A = hexToRgb(a), B = hexToRgb(b);
  return rgbToHex(A.r + (B.r - A.r) * t, A.g + (B.g - A.g) * t, A.b + (B.b - A.b) * t);
}
function lighten(hex, t) { return mix(hex, '#ffffff', t); }
function darken(hex, t) { return mix(hex, '#0a0912', t); }

const HEAD_PATHS = {
  oval: 'M200 84 C246 84 270 120 270 166 C270 214 242 254 200 266 C158 254 130 214 130 166 C130 120 154 84 200 84 Z',
  angular: 'M200 82 C248 82 272 118 272 164 C272 192 266 212 256 232 C246 254 226 268 200 272 C174 268 154 254 144 232 C134 212 128 192 128 164 C128 118 152 82 200 82 Z',
  round: 'M200 86 C250 86 276 124 276 170 C276 218 246 252 200 258 C154 252 124 218 124 170 C124 124 150 86 200 86 Z',
  heart: 'M200 84 C250 84 276 118 276 158 C276 198 250 218 236 238 C224 256 212 266 200 268 C188 266 176 256 164 238 C150 218 124 198 124 158 C124 118 150 84 200 84 Z',
  long: 'M200 80 C242 80 266 114 266 160 C266 216 244 264 200 282 C156 264 134 216 134 160 C134 114 158 80 200 80 Z',
};

const BUILD_WIDTH = { slender: 104, athletic: 118, broad: 134, colossal: 148 };

function eyeLocal(shape, cx, cy, eyeColor, glow, uid) {
  const id = `${uid}-eye-${cx}`;
  let sclera;
  if (shape === 'round') sclera = `<circle cx="0" cy="0" r="10.5" fill="#f8f4ec" stroke="#2c2333" stroke-opacity=".45" stroke-width="1"/>`;
  else if (shape === 'sharp') sclera = `<path d="M-15 2 L-4 -8 L12 -5 L15 0 L2 7 L-10 6 Z" fill="#f8f4ec" stroke="#2c2333" stroke-opacity=".45" stroke-width="1"/>`;
  else if (shape === 'gentle') sclera = `<path d="M-14 0 Q-6 -7 2 -5 Q10 -3 14 2 Q6 8 -2 8 Q-9 6 -14 0 Z" fill="#f8f4ec" stroke="#2c2333" stroke-opacity=".45" stroke-width="1"/>`;
  else sclera = `<path d="M-14 1 Q-7 -8 1 -6 Q9 -4 14 1 Q7 8 0 8 Q-7 7 -14 1 Z" fill="#f8f4ec" stroke="#2c2333" stroke-opacity=".45" stroke-width="1"/>`;
  let lash;
  if (shape === 'sharp') lash = 'M-16 1 L-4 -8 L12 -6 L16 0';
  else if (shape === 'round') lash = 'M-11 -4 Q0 -13 11 -4';
  else if (shape === 'gentle') lash = 'M-15 0 Q-5 -8 3 -6 Q11 -4 15 2';
  else lash = 'M-15 0 Q-7 -9 1 -7 Q10 -5 15 0';
  const brow = shape === 'sharp' ? 'M-17 -11 L14 -17' : shape === 'round' ? 'M-17 -18 Q-4 -24 14 -16' : shape === 'gentle' ? 'M-17 -14 Q-3 -20 15 -12' : 'M-17 -16 Q-5 -22 15 -13';
  return `<g transform="translate(${cx} ${cy})">
    ${glow ? `<circle cx="0" cy="0" r="10" fill="${eyeColor}" opacity=".55" filter="url(#${id}-blur)"/>` : ''}
    ${sclera}
    <circle cx="0" cy="0.5" r="6.1" fill="${eyeColor}" stroke="${darken(eyeColor, .45)}" stroke-width="1"/>
    <circle cx="0" cy="0.5" r="2.7" fill="#15111e"/>
    <circle cx="-2" cy="-1.8" r="1.5" fill="#ffffff" opacity=".9"/>
    <path d="${lash}" fill="none" stroke="#241b2b" stroke-width="2.4" stroke-linecap="round"/>
    <path d="${brow}" fill="none" stroke="#2b2130" stroke-width="4.2" stroke-linecap="round" opacity=".85"/>
  </g>`;
}

function hairColorLayers(hairGrad, hair) {
  return `<linearGradient id="${hairGrad}" x1="0" y1="0" x2="0.4" y2="1">
    <stop offset="0" stop-color="${lighten(hair, 0.26)}"/>
    <stop offset=".45" stop-color="${hair}"/>
    <stop offset="1" stop-color="${darken(hair, 0.34)}"/>
  </linearGradient>`;
}

export function renderPortrait(god, opts = {}) {
  const uid = 'p' + (++uidCounter) + Math.floor(Math.random() * 1000);
  const a = god.appearance || god;
  const domain = domainOf(god.domain || a.domain || 'storm');
  const race = raceOf(god.race || a.race || 'humans');
  const accent = domain.color;
  const skin = a.skin || '#e8b894';
  const hair = a.hairColor || '#1c1a26';
  const eye = a.eyeColor || '#58c7ff';
  const build = a.build || 'athletic';
  const face = a.face || 'oval';
  const eyeShape = a.eyeShape || 'almond';
  const hairStyle = a.hairStyle || 'flowing';
  const markings = a.markings || 'none';
  const crown = a.crown || 'none';
  const complexion = a.complexion || 'natural';
  const glow = a.glow !== false;
  const sw = BUILD_WIDTH[build] || 118;
  const head = HEAD_PATHS[face] || HEAD_PATHS.oval;
  const skinLight = lighten(skin, 0.14);
  const skinDark = darken(skin, 0.24);
  const hairDark = darken(hair, 0.32);
  const robeA = mix(domain.color, '#171428', 0.66);
  const robeB = '#0b0a14';
  const earCx = face === 'round' ? 127 : face === 'long' ? 134 : face === 'heart' ? 128 : 131;

  // aura rays
  const rays = Array.from({ length: 18 }, (_, i) => {
    const angle = (i / 18) * Math.PI * 2;
    const x1 = 200 + Math.cos(angle) * 168, y1 = 190 + Math.sin(angle) * 168;
    const x2 = 200 + Math.cos(angle) * 184, y2 = 190 + Math.sin(angle) * 184;
    return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${accent}" stroke-opacity=".3" stroke-width="1"/>`;
  }).join('');
  const motes = [[96,150,3,0],[304,170,2.5,.6],[124,318,2,1.2],[286,342,3,.3],[168,72,2,1.5],[248,92,2.4,.9]].map(([x, y, r, d]) =>
    `<circle class="portrait-mote" cx="${x}" cy="${y}" r="${r}" fill="${accent}" style="animation-delay:${d}s"/>`).join('');

  // ---- back hair ----
  let backHair = '';
  if (hairStyle === 'flowing') {
    backHair = `<path d="M200 60 C138 60 102 106 102 172 C102 228 88 278 76 330 C70 356 78 382 94 392 C120 386 138 358 148 324 C154 300 156 268 154 238 L246 238 C244 268 246 300 252 324 C262 358 280 386 306 392 C322 382 330 356 324 330 C312 278 298 228 298 172 C298 106 262 60 200 60 Z" fill="url(#${uid}-hair)"/>`;
  } else if (hairStyle === 'braided') {
    backHair = `<path d="M200 64 C144 64 110 108 110 170 C110 216 102 254 96 288 L304 288 C298 254 290 216 290 170 C290 108 256 64 200 64 Z" fill="url(#${uid}-hair)"/>`;
  } else if (hairStyle === 'topknot') {
    backHair = `<circle cx="200" cy="54" r="25" fill="url(#${uid}-hair)"/><path d="M170 236 C172 274 184 296 200 304 C216 296 228 274 230 236 Z" fill="${hairDark}"/>`;
  } else if (hairStyle === 'wild') {
    backHair = `<g fill="url(#${uid}-hair)">
      <circle cx="128" cy="146" r="34"/><circle cx="118" cy="194" r="30"/><circle cx="132" cy="238" r="26"/>
      <circle cx="272" cy="146" r="34"/><circle cx="282" cy="194" r="30"/><circle cx="268" cy="238" r="26"/>
      <circle cx="156" cy="96" r="32"/><circle cx="200" cy="76" r="38"/><circle cx="244" cy="96" r="32"/>
    </g>`;
  } else if (hairStyle === 'short' || hairStyle === 'mohawk') {
    backHair = `<path d="M166 236 C170 274 182 296 200 304 C218 296 230 274 234 236 Z" fill="${hairDark}" opacity=".9"/>`;
  }

  // ---- cap / front hair ----
  const cap = `<path d="M200 66 C252 66 290 104 292 158 C292 170 290 182 286 192 C282 166 268 142 246 130 C228 120 214 116 200 116 C186 116 172 120 154 130 C132 142 118 166 114 192 C110 182 108 170 108 158 C110 104 148 66 200 66 Z" fill="url(#${uid}-hair)"/>`;
  let frontHair = '';
  if (hairStyle === 'flowing') {
    frontHair = `${cap}
      <path d="M200 100 C184 102 166 112 152 134 C164 126 180 122 194 126 C198 116 200 108 200 100 Z" fill="url(#${uid}-hair)"/>
      <path d="M200 100 C216 102 234 112 248 134 C236 126 220 122 206 126 C202 116 200 108 200 100 Z" fill="${lighten(hair, 0.06)}"/>
      <path d="M124 130 C112 176 108 234 114 292 C118 326 126 346 138 362 C146 340 148 304 146 268 C144 222 142 174 148 138 Z" fill="url(#${uid}-hair)"/>
      <path d="M276 130 C288 176 292 234 286 292 C282 326 274 346 262 362 C254 340 252 304 254 268 C256 222 258 174 252 138 Z" fill="url(#${uid}-hair)"/>`;
  } else if (hairStyle === 'short') {
    frontHair = `${cap}
      <path d="M114 176 C110 166 111 158 114 150 C118 158 120 168 120 180 Z" fill="${hairDark}"/>
      <path d="M286 176 C290 166 289 158 286 150 C282 158 280 168 280 180 Z" fill="${hairDark}"/>
      <path d="M140 118 L150 138 L164 116 L178 140 L192 114 L200 132 L208 114 L222 140 L236 116 L250 138 L260 118 C238 106 216 100 200 100 C184 100 162 106 140 118 Z" fill="url(#${uid}-hair)"/>`;
  } else if (hairStyle === 'braided') {
    frontHair = `${cap}
      <path d="M200 100 C182 104 164 116 154 136 C168 128 184 124 196 128 C199 118 200 108 200 100 Z" fill="url(#${uid}-hair)"/>
      <path d="M200 100 C218 104 236 116 246 136 C232 128 216 124 204 128 C201 118 200 108 200 100 Z" fill="url(#${uid}-hair)"/>
      <g fill="${hair}">
        <ellipse cx="132" cy="300" rx="17" ry="20"/><ellipse cx="127" cy="326" rx="16" ry="19"/>
        <ellipse cx="123" cy="351" rx="15" ry="18"/><ellipse cx="119" cy="375" rx="13" ry="16"/>
        <ellipse cx="116" cy="396" rx="11" ry="14"/>
      </g>
      <path d="M125 312 L131 318 M120 338 L128 344 M116 363 L124 369" stroke="${hairDark}" stroke-width="2" opacity=".7"/>
      <ellipse cx="121" cy="361" rx="14" ry="4" fill="none" stroke="#d9b36b" stroke-width="2.4"/>
      <ellipse cx="116" cy="388" rx="11" ry="3" fill="none" stroke="#d9b36b" stroke-width="2"/>`;
  } else if (hairStyle === 'topknot') {
    frontHair = `${cap}
      <ellipse cx="200" cy="72" rx="21" ry="7" fill="#d9b36b" opacity=".95"/>
      <path d="M150 132 C144 162 143 190 146 214" stroke="${lighten(hair, 0.12)}" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M250 132 C256 162 257 190 254 214" stroke="${lighten(hair, 0.12)}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  } else if (hairStyle === 'wild') {
    frontHair = `${cap}
      <g fill="url(#${uid}-hair)">
        <circle cx="150" cy="118" r="23"/><circle cx="250" cy="118" r="23"/>
        <circle cx="172" cy="94" r="23"/><circle cx="228" cy="94" r="23"/>
      </g>
      <path d="M150 118 q12 -14 24 -2 M226 96 q12 -12 24 0" stroke="${hairDark}" stroke-width="2" fill="none" opacity=".5"/>`;
  } else if (hairStyle === 'mohawk') {
    frontHair = `<path d="M184 122 C174 92 178 62 192 40 C198 58 202 64 204 46 C212 64 218 60 224 42 C238 66 240 96 230 122 C218 116 196 116 184 122 Z" fill="url(#${uid}-hair)"/>
      <path d="M120 178 C114 162 114 144 124 128 C138 114 156 108 170 112 C150 124 138 146 132 178 Z" fill="${darken(skin, .1)}" opacity=".22"/>
      <path d="M280 178 C286 162 286 144 276 128 C262 114 244 108 230 112 C250 124 262 146 268 178 Z" fill="${darken(skin, .1)}" opacity=".22"/>`;
  } else if (hairStyle === 'bald') {
    frontHair = `<ellipse cx="186" cy="116" rx="30" ry="14" fill="#ffffff" opacity=".1"/>`;
  }

  // ---- ears ----
  let ears = '';
  if (race.ears === 'pointed') {
    ears = `<path d="M140 166 C128 155 112 143 104 149 C98 158 110 180 126 194 C134 200 142 193 144 180 Z" fill="${skin}" stroke="${skinDark}" stroke-opacity=".4"/>
      <path d="M260 166 C272 155 288 143 296 149 C302 158 290 180 274 194 C266 200 258 193 256 180 Z" fill="${skin}" stroke="${skinDark}" stroke-opacity=".4"/>
      <path d="M117 158 C124 166 130 176 132 186 M283 158 C276 166 270 176 268 186" stroke="${skinDark}" stroke-width="2" fill="none" opacity=".45"/>`;
  } else if (race.ears === 'finned') {
    ears = `<path d="M140 166 C124 154 106 144 98 152 C92 162 108 184 128 198 C136 202 143 194 144 180 Z" fill="${skin}" stroke="${skinDark}" stroke-opacity=".4"/>
      <path d="M260 166 C276 154 294 144 302 152 C308 162 292 184 272 198 C264 202 257 194 256 180 Z" fill="${skin}" stroke="${skinDark}" stroke-opacity=".4"/>
      <g stroke="${accent}" stroke-width="2.2" opacity=".65">
        <path d="M120 160 L102 148"/><path d="M116 172 L96 164"/><path d="M118 184 L100 184"/>
        <path d="M280 160 L298 148"/><path d="M284 172 L304 164"/><path d="M282 184 L300 184"/>
      </g>`;
  } else {
    ears = `<ellipse cx="${earCx}" cy="182" rx="13" ry="21" fill="${skin}" stroke="${skinDark}" stroke-opacity=".35"/>
      <ellipse cx="${400 - earCx}" cy="182" rx="13" ry="21" fill="${skin}" stroke="${skinDark}" stroke-opacity=".35"/>
      <path d="M${earCx} 168 C${earCx - 8} 174 ${earCx - 8} 192 ${earCx} 198" stroke="${skinDark}" stroke-width="2" fill="none" opacity=".4"/>
      <path d="M${400 - earCx} 168 C${400 - earCx + 8} 174 ${400 - earCx + 8} 192 ${400 - earCx} 198" stroke="${skinDark}" stroke-width="2" fill="none" opacity=".4"/>`;
  }
  if (race.ears === 'horned' && crown !== 'horns') {
    ears += `<path d="M158 118 C146 98 146 80 156 66 C152 90 160 104 172 112 Z" fill="#d8c8ab" stroke="#8d7b62" stroke-width="1.5"/>
      <path d="M242 118 C254 98 254 80 244 66 C248 90 240 104 228 112 Z" fill="#d8c8ab" stroke="#8d7b62" stroke-width="1.5"/>`;
  }

  // ---- markings ----
  let mark = '';
  if (markings === 'rune') {
    mark = `<g stroke="${accent}" stroke-width="2" fill="none" opacity=".9" stroke-linejoin="round">
      <path d="M200 143 L206 153 L200 163 L194 153 Z"/>
      <circle cx="200" cy="153" r="1.8" fill="${accent}" stroke="none"/>
    </g>`;
  } else if (markings === 'warpaint') {
    mark = `<g stroke="${accent}" stroke-width="5" stroke-linecap="round" opacity=".78">
      <path d="M151 200 L168 220"/><path d="M147 216 L161 231"/>
      <path d="M249 200 L232 220"/><path d="M253 216 L239 231"/>
      <path d="M200 190 L200 208" stroke-width="3"/>
    </g>`;
  } else if (markings === 'constellation') {
    mark = `<g opacity=".9">
      <g stroke="${accent}" stroke-width="1" opacity=".7">
        <path d="M238 194 L251 206 L243 220 L258 228 L248 242"/>
      </g>
      <g fill="${accent}">
        <circle cx="238" cy="194" r="2"/><circle cx="251" cy="206" r="2.6"/><circle cx="243" cy="220" r="1.8"/>
        <circle cx="258" cy="228" r="2.4"/><circle cx="248" cy="242" r="1.7"/>
      </g>
    </g>`;
  } else if (markings === 'tears') {
    mark = `<g stroke="${accent}" stroke-width="2.4" stroke-linecap="round" opacity=".8">
      <path d="M166 195 C165 208 165 221 166 231"/><path d="M234 195 C235 208 235 221 234 231"/>
      <circle cx="166" cy="238" r="2" fill="${accent}" stroke="none"/><circle cx="234" cy="238" r="2" fill="${accent}" stroke="none"/>
    </g>`;
  }

  // ---- complexion ----
  let complexionFx = '';
  if (complexion === 'radiant') {
    complexionFx = `<ellipse cx="162" cy="206" rx="26" ry="16" fill="${accent}" opacity=".14" filter="url(#${uid}-blur)"/>
      <ellipse cx="238" cy="206" rx="26" ry="16" fill="${accent}" opacity=".14" filter="url(#${uid}-blur)"/>
      <ellipse cx="200" cy="138" rx="38" ry="20" fill="#fff4d8" opacity=".1" filter="url(#${uid}-blur)"/>`;
  } else if (complexion === 'ashen') {
    complexionFx = `<path d="M200 84 C246 84 270 120 270 166 C270 214 242 254 200 266 C158 254 130 214 130 166 C130 120 154 84 200 84 Z" fill="#738197" opacity=".12"/>
      <ellipse cx="200" cy="212" rx="52" ry="30" fill="#2d3442" opacity=".1"/>`;
  } else if (complexion === 'starlit') {
    complexionFx = `<g fill="#fff6dd" opacity=".85">
      <circle cx="164" cy="204" r="1.3"/><circle cx="178" cy="216" r=".9"/><circle cx="154" cy="190" r=".8"/>
      <circle cx="238" cy="208" r="1.1"/><circle cx="224" cy="218" r="1.4"/><circle cx="248" cy="192" r=".8"/>
      <circle cx="196" cy="140" r="1.2"/><circle cx="214" cy="132" r=".7"/>
    </g>`;
  }

  // ---- crown ----
  let crownSvg = '';
  if (crown === 'laurel') {
    const leaves = (side) => {
      const pts = [[146, 126, -48, 1], [138, 112, -58, .95], [134, 98, -68, .9], [136, 84, -78, .82]];
      return pts.map(([x, y, rot, s]) => {
        const X = side === 1 ? x : 400 - x;
        const R = side === 1 ? rot : 180 - rot;
        return `<ellipse cx="0" cy="0" rx="${10 * s}" ry="${4.4 * s}" transform="translate(${X} ${y}) rotate(${R})" fill="url(#${uid}-gold)"/>`;
      }).join('');
    };
    crownSvg = `<g stroke="#c9a35f" stroke-width="2" fill="none">
      <path d="M148 134 C132 114 126 92 134 72"/><path d="M252 134 C268 114 274 92 266 72"/>
      </g>${leaves(1)}${leaves(-1)}`;
  } else if (crown === 'circlet') {
    crownSvg = `<g>
      <path d="M142 138 Q200 118 258 138" fill="none" stroke="url(#${uid}-gold)" stroke-width="5" stroke-linecap="round"/>
      <path d="M150 132 Q200 114 250 132" fill="none" stroke="#fff2c9" stroke-width="1" opacity=".7"/>
      <circle cx="200" cy="123" r="7" fill="${accent}" stroke="#f0d79d" stroke-width="2"/>
      <circle cx="200" cy="121" r="2" fill="#fff8e3" opacity=".9"/>
      <circle cx="168" cy="131" r="2.4" fill="#f0d79d"/><circle cx="232" cy="131" r="2.4" fill="#f0d79d"/>
    </g>`;
  } else if (crown === 'horns') {
    crownSvg = `<g>
      <path d="M170 128 C148 100 148 64 166 40 C158 72 166 98 184 116 Z" fill="#e6d8bd" stroke="#8a7a64" stroke-width="1.6"/>
      <path d="M230 128 C252 100 252 64 234 40 C242 72 234 98 216 116 Z" fill="#e6d8bd" stroke="#8a7a64" stroke-width="1.6"/>
      <path d="M160 92 q8 4 13 1 M160 78 q7 3 11 1 M240 92 q-8 4 -13 1 M240 78 q-7 3 -11 1" stroke="#b09c7d" stroke-width="1.4" fill="none"/>
    </g>`;
  } else if (crown === 'halo') {
    crownSvg = `<g>
      <ellipse cx="200" cy="52" rx="63" ry="15" fill="none" stroke="${accent}" stroke-width="7" opacity=".35" filter="url(#${uid}-blur)"/>
      <ellipse cx="200" cy="52" rx="61" ry="14" fill="none" stroke="url(#${uid}-gold)" stroke-width="3"/>
      <ellipse cx="200" cy="52" rx="53" ry="10" fill="none" stroke="#fff4d2" stroke-width="1" opacity=".6"/>
    </g>`;
  }

  const eyes = eyeLocal(eyeShape, 174, 178, eye, glow, uid) + eyeLocal(eyeShape, 226, 178, eye, glow, uid);

  return `<svg class="portrait-svg" viewBox="0 0 400 520" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Portrait of ${(god.name || 'a god').replace(/"/g, '')}">
  <defs>
    <radialGradient id="${uid}-aura" cx="50%" cy="38%" r="52%">
      <stop offset="0" stop-color="${accent}" stop-opacity=".34"/>
      <stop offset=".55" stop-color="${accent}" stop-opacity=".12"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="${uid}-robe" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0" stop-color="${robeA}"/>
      <stop offset=".55" stop-color="${mix(domain.color, robeB, .82)}"/>
      <stop offset="1" stop-color="${robeB}"/>
    </linearGradient>
    <linearGradient id="${uid}-skin" x1="0" y1="0" x2=".35" y2="1">
      <stop offset="0" stop-color="${skinLight}"/>
      <stop offset=".55" stop-color="${skin}"/>
      <stop offset="1" stop-color="${skinDark}"/>
    </linearGradient>
    ${hairColorLayers(uid + '-hair', hair)}
    <linearGradient id="${uid}-gold" x1="0" y1="0" x2="0.6" y2="1">
      <stop offset="0" stop-color="#fff1c8"/><stop offset=".5" stop-color="#e2bf7f"/><stop offset="1" stop-color="#a9803f"/>
    </linearGradient>
    <radialGradient id="${uid}-vig" cx="50%" cy="44%" r="68%">
      <stop offset=".55" stop-color="#07060d" stop-opacity="0"/>
      <stop offset="1" stop-color="#07060d" stop-opacity=".6"/>
    </radialGradient>
    <filter id="${uid}-blur" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="7"/></filter>
    <filter id="${uid}-eye-174-blur" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="3.2"/></filter>
    <filter id="${uid}-eye-226-blur" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="3.2"/></filter>
  </defs>
  <g>
    <circle cx="200" cy="190" r="198" fill="url(#${uid}-aura)"/>
    <g class="portrait-orbit" style="transform-origin:200px 190px">
      <circle cx="200" cy="190" r="168" fill="none" stroke="${accent}" stroke-opacity=".22" stroke-width="1" stroke-dasharray="2 9"/>
      <circle cx="200" cy="190" r="154" fill="none" stroke="${accent}" stroke-opacity=".1" stroke-width="1"/>
    </g>
    ${rays}
    ${motes}

    <!-- neck -->
    <path d="M177 238 L223 238 L229 286 C229 298 239 306 249 311 L151 311 C161 306 171 298 171 286 Z" fill="${skinDark}"/>
    <path d="M177 260 C184 275 190 284 200 288 C210 284 216 275 223 260" fill="none" stroke="${darken(skin, .4)}" stroke-opacity=".35" stroke-width="2"/>
    <path d="M179 297 C186 303 194 307 200 307 C206 307 214 303 221 297" fill="none" stroke="#ffffff" stroke-opacity=".14" stroke-width="2"/>

    <!-- shoulders -->
    <path d="M200 288 C${200 - sw * .58} 288 ${200 - sw * .88} 308 ${200 - sw} 332 C${200 - sw * 1.2} 368 ${200 - sw * 1.35} 444 ${200 - sw * 1.44} 520 L${200 + sw * 1.44} 520 C${200 + sw * 1.35} 444 ${200 + sw * 1.2} 368 ${200 + sw} 332 C${200 + sw * .88} 308 ${200 + sw * .58} 288 200 288 Z" fill="url(#${uid}-robe)" stroke="${accent}" stroke-opacity=".3" stroke-width="1.2"/>
    <path d="M200 290 L162 302 C172 338 186 368 200 384 C214 368 228 338 238 302 Z" fill="${mix(domain.color, '#0a0912', .82)}" stroke="${accent}" stroke-opacity=".22" stroke-width="1"/>
    <path d="M162 300 C172 336 186 366 200 382 C214 366 228 336 238 300" fill="none" stroke="#e5c485" stroke-opacity=".62" stroke-width="2.4"/>
    <path d="M146 298 C164 311 182 316 200 316 C218 316 236 311 254 298" fill="none" stroke="url(#${uid}-gold)" stroke-width="3.4" stroke-linecap="round"/>
    <circle cx="200" cy="330" r="7" fill="${accent}" stroke="#f0d79d" stroke-width="2"/>
    <circle cx="200" cy="328" r="2.3" fill="#fff8e3" opacity=".9"/>
    <path d="M120 366 C148 348 174 340 200 340 C226 340 252 348 280 366" fill="none" stroke="${accent}" stroke-opacity=".16" stroke-width="9"/>
    <path d="M148 388 C156 456 166 496 180 518 M252 388 C244 456 234 496 220 518" fill="none" stroke="${accent}" stroke-opacity=".1" stroke-width="2"/>
    <path d="M100 448 C130 480 160 500 200 500 C240 500 270 480 300 448" fill="none" stroke="${accent}" stroke-opacity=".14" stroke-width="10"/>

    ${backHair}
    ${ears}
    <path d="${head}" fill="url(#${uid}-skin)" stroke="${skinDark}" stroke-opacity=".28" stroke-width="1"/>
    <path d="M200 84 C246 84 270 120 270 166 C270 214 242 254 200 266 C158 254 130 214 130 166 C130 120 154 84 200 84 Z" fill="none" stroke="${skinDark}" stroke-opacity=".12"/>
    <ellipse cx="200" cy="222" rx="42" ry="24" fill="${skinDark}" opacity=".1"/>
    <ellipse cx="166" cy="202" rx="20" ry="13" fill="#ffffff" opacity=".08"/>
    <ellipse cx="234" cy="202" rx="20" ry="13" fill="#ffffff" opacity=".06"/>
    <ellipse cx="186" cy="118" rx="26" ry="12" fill="#ffffff" opacity=".07"/>
    ${complexionFx}

    ${eyes}

    <path d="M199 174 C196 190 193 197 189 204 C194 208 202 208 207 205" fill="none" stroke="${skinDark}" stroke-opacity=".55" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M187 227 Q194 221 200 226 Q206 221 213 227 Q206 237 200 237 Q194 237 187 227 Z" fill="${mix(skin, '#a8505c', .55)}"/>
    <path d="M187 227 Q194 222 200 226 Q206 222 213 227" fill="none" stroke="${darken(skin, .45)}" stroke-opacity=".5" stroke-width="1.1"/>
    <path d="M194 233 Q200 236 206 233" fill="none" stroke="#ffffff" stroke-opacity=".22" stroke-width="1.4"/>

    ${mark}
    ${frontHair}
    ${hairStyle === 'flowing' ? `<path d="M200 72 C202 90 202 102 200 112" fill="none" stroke="${hairDark}" stroke-width="1.4" opacity=".55"/>
    <g fill="none" stroke="${lighten(hair, .3)}" stroke-width="1.2" opacity=".22" stroke-linecap="round">
      <path d="M130 148 C122 196 120 250 126 302"/>
      <path d="M270 148 C278 196 280 250 274 302"/>
      <path d="M120 200 C116 250 118 292 126 330"/>
      <path d="M280 200 C284 250 282 292 274 330"/>
    </g>` : ''}
    ${crownSvg}
    <rect width="400" height="520" fill="url(#${uid}-vig)" pointer-events="none"/>
  </g>
</svg>`;
}
