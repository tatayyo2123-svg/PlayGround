import {
  RANKS, DOMAINS, LINEAGES, STARTER_RACES, TRAITS, ACTIONS, APPEARANCE_OPTIONS,
  SKIN_TONES, HAIR_COLORS, EYE_COLORS, DEFAULT_EPITHETS,
  domainOf, lineageOf, raceOf, traitOf, combinedMods, apMax, computeMight, fmt, roman,
  newGame, performAction, canAfford, canAscend, ascend, standing,
  endAeon, applyEventChoice, pickEvent, addLog, RIVAL_POOL, setNumberLocale,
} from './data.js';
import { renderPortrait } from './portrait.js';
import { icon, DOMAIN_ICONS, STAT_ICONS, TRAIT_ICONS, RACE_ICONS } from './icons.js';
import { t, setLang, isEs, applyStatic, localizedEvent, ACTION_TEXT_ES } from './i18n.js';

const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));
const SAVE_KEY = 'godspire.save.v1';
const AEON_TITLES = ['The First Dawn', 'The Gathering', 'The Age of Temples', 'The Long Summer', 'The Turning', 'The Age of Kings', 'The Holy Wars', 'The Quiet Sky', 'The Gilded Age', 'The Last Silence', 'The Starfall'];
const MOOD_COLORS = { serene: '#9fd9c4', radiant: '#ffd77a', triumphant: '#e8c987', wrathful: '#ff8a5c', weary: '#a58cff', restless: '#7fb8ff', ancient: '#d9b36b' };

let uiLang = 'en';
try { uiLang = localStorage.getItem('godspire.lang') === 'es' ? 'es' : 'en'; } catch (e) { /* noop */ }
setLang(uiLang);
setNumberLocale(uiLang);

let draft = makeDraft();
let creatorTab = 'face';
let epithetTouched = false;
let state = null;
let soundOn = true;
try { soundOn = localStorage.getItem('godspire.sound') !== 'off'; } catch (e) { /* noop */ }
let audioCtx = null;
let toastTimer = null;

function makeDraft() {
  return {
    name: 'Aurelion',
    epithet: t('The Stormlord'),
    pantheon: t('The New Order'),
    domain: 'storm',
    lineage: 'celestial',
    race: 'humans',
    appearance: {
      skin: '#e8b894',
      face: 'oval',
      build: 'athletic',
      eyeShape: 'almond',
      eyeColor: '#58c7ff',
      glow: true,
      hairStyle: 'flowing',
      hairColor: '#1c1a26',
      markings: 'rune',
      crown: 'circlet',
      complexion: 'natural',
    },
  };
}

const rand = arr => arr[Math.floor(Math.random() * arr.length)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
function rgba(hex, a) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

function showScreen(id) {
  $$('.screen').forEach(s => s.classList.toggle('active', s.id === id));
  window.scrollTo(0, 0);
}

function domainName(d) { return t(d.name); }
function lineageName(l) { return t(l.name); }
function rankName(rank) { return t(rank.name); }
function ageOf(s = state) { return (s && Number(s.age)) || 18; }
function ageLabel(age) { return t('Age {age}', { age }); }

function missingReasonText(action) {
  if ((state.ap || 0) < action.ap) return t('Requires {n} actions', { n: action.ap });
  for (const [k, v] of Object.entries(action.cost || {})) {
    if ((k === 'faith' || k === 'power') && state.stats[k] < v) return t('Requires {n} ' + k, { n: v });
  }
  return '';
}

function actionChronicleText(actionId, res) {
  if (actionId === 'relic') return t(ACTION_TEXT_ES.relic, { relic: res.relic ? res.relic.name : t('Relic') });
  if (isEs() && ACTION_TEXT_ES[actionId]) return ACTION_TEXT_ES[actionId];
  return res.text;
}

function logText(entry) {
  return isEs() && entry.textEs ? entry.textEs : entry.text;
}

function computeMood() {
  if (!state) return 'serene';
  if (canAscend(state)) return 'triumphant';
  if (ageOf() >= 90) return 'ancient';
  if ((state.followerDelta || 0) < 0) return 'wrathful';
  if ((state.ap || 0) <= 0) return 'restless';
  if (ageOf() >= 65) return 'weary';
  if (state.stats.faith > state.stats.power * 2 || state.rank >= 5) return 'radiant';
  return 'serene';
}

function syncLangButtons() {
  $$('.lang-switch [data-lang]').forEach(b => b.classList.toggle('active', b.dataset.lang === uiLang));
}

function setLanguage(next) {
  if (next !== 'es' && next !== 'en') return;
  if (next === uiLang) return;
  uiLang = setLang(next);
  setNumberLocale(uiLang);
  try { localStorage.setItem('godspire.lang', uiLang); } catch (e) { /* noop */ }
  applyStatic();
  syncLangButtons();
  if (!epithetTouched) {
    draft.epithet = t(DEFAULT_EPITHETS[draft.domain]);
    const input = $('#godEpithet');
    if (input) input.value = draft.epithet;
  }
  if (state) {
    state.locale = uiLang;
    saveGame();
    renderGame();
  }
  if ($('#screen-create').classList.contains('active')) {
    renderPanel();
    renderPreview();
  }
  if ($('#screen-title').classList.contains('active')) renderTitle();
  closeModal();
  toast(uiLang === 'es' ? 'Idioma: Español' : 'Language: English');
}

/* ══════════ starfield ══════════ */
function initStars() {
  const canvas = $('#starfield');
  const ctx = canvas.getContext('2d');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  let stars = [], shooting = null, last = performance.now();
  function resize() {
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(220, Math.round((w * h) / 9000));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.2 + 0.25,
      a: Math.random() * 0.55 + 0.18,
      sp: Math.random() * 0.014 + 0.003,
      ph: Math.random() * Math.PI * 2,
      hue: Math.random() < 0.16 ? '#e8c987' : Math.random() < 0.4 ? '#c7d6ff' : '#ffffff',
    }));
  }
  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    const dt = reduced ? 0 : Math.min(48, t - last); last = t;
    for (const s of stars) {
      s.ph += s.sp * (dt / 16.7);
      const alpha = s.a * (0.6 + 0.4 * Math.sin(s.ph));
      ctx.globalAlpha = alpha;
      ctx.fillStyle = s.hue;
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
      if (s.r > 1.05) {
        ctx.globalAlpha = alpha * 0.35;
        ctx.fillRect(s.x - 3, s.y - 0.3, 6, 0.6);
        ctx.fillRect(s.x - 0.3, s.y - 3, 0.6, 6);
      }
    }
    if (!reduced) {
      if (!shooting && Math.random() < 0.0025) {
        shooting = { x: Math.random() * w * 0.7 + w * 0.15, y: Math.random() * h * 0.35, vx: 2.6 + Math.random() * 2, vy: 1.4 + Math.random(), life: 1 };
      }
      if (shooting) {
        shooting.x += shooting.vx * 4; shooting.y += shooting.vy * 4; shooting.life -= 0.012;
        ctx.globalAlpha = Math.max(0, shooting.life) * 0.8;
        ctx.strokeStyle = '#f5e7c2'; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(shooting.x, shooting.y); ctx.lineTo(shooting.x - 70, shooting.y - 36); ctx.stroke();
        if (shooting.life <= 0) shooting = null;
      }
    }
    ctx.globalAlpha = 1;
    if (!reduced) requestAnimationFrame(draw);
  }
  resize();
  window.addEventListener('resize', resize);
  if (reduced) draw(0); else requestAnimationFrame(draw);
}

/* ══════════ sound ══════════ */
function audio() {
  if (!audioCtx) {
    try { audioCtx = new AudioContext(); } catch (e) { return null; }
  }
  if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});
  return audioCtx;
}
function tone(freq, dur = 0.14, type = 'sine', vol = 0.035, delay = 0) {
  if (!soundOn) return;
  const ctx = audio(); if (!ctx) return;
  const t0 = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type; osc.frequency.setValueAtTime(freq, t0);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(vol, t0 + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g); g.connect(ctx.destination);
  osc.start(t0); osc.stop(t0 + dur + 0.02);
}
function playSound(kind) {
  if (!soundOn) return;
  if (kind === 'action') { tone(392, 0.18, 'sine', 0.03); tone(587, 0.22, 'sine', 0.02, 0.05); }
  else if (kind === 'turn') { tone(196, 0.5, 'sine', 0.03); tone(294, 0.45, 'sine', 0.02, 0.08); tone(392, 0.4, 'sine', 0.015, 0.16); }
  else if (kind === 'ascend') { [261, 329, 392, 523, 659].forEach((f, i) => tone(f, 1.1, 'sine', 0.028, i * 0.12)); tone(130, 1.4, 'triangle', 0.02); }
  else if (kind === 'error') { tone(150, 0.16, 'square', 0.016); }
  else if (kind === 'click') { tone(660, 0.05, 'sine', 0.02); }
  else if (kind === 'omen') { tone(220, 0.6, 'triangle', 0.02); tone(330, 0.5, 'sine', 0.015, 0.15); }
}

/* ══════════ toast ══════════ */
function toast(msg, bad = false) {
  const root = $('#toastRoot');
  const el = document.createElement('div');
  el.className = 'toast' + (bad ? ' bad' : '');
  el.textContent = msg;
  root.appendChild(el);
  setTimeout(() => el.remove(), 2800);
  while (root.children.length > 3) root.firstChild.remove();
}

/* ══════════ title ══════════ */
function sampleGod() {
  return {
    name: 'Aurelion', epithet: 'The Stormlord', domain: 'storm', lineage: 'celestial', race: 'elves',
    appearance: {
      skin: '#e8b894', face: 'angular', build: 'athletic', eyeShape: 'sharp', eyeColor: '#7fb8ff', glow: true,
      hairStyle: 'flowing', hairColor: '#f0edf6', markings: 'rune', crown: 'circlet', complexion: 'radiant',
    },
  };
}
function renderTitle() {
  let god = null;
  let save = null;
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) { save = JSON.parse(raw); if (save && save.god) god = save.god; }
  } catch (e) { /* noop */ }
  if (!god) god = sampleGod();
  const age = (save && save.age) || god.age || 0;
  $('#titlePortrait').innerHTML = renderPortrait(god, { age });
  $('#titleHeroName').textContent = (god.name || 'Aurelion').toUpperCase();
  const plaque = document.querySelector('.hero-plaque span');
  if (plaque) plaque.textContent = t(god.epithet || 'The Stormlord').toUpperCase();
  $('#continueBtn').hidden = !hasSave();
}
function hasSave() {
  try { return !!localStorage.getItem(SAVE_KEY); } catch (e) { return false; }
}

/* ══════════ creator ══════════ */
function creatorAccent() {
  const d = domainOf(draft.domain);
  const screen = $('#screen-create');
  screen.style.setProperty('--accent', d.color);
  screen.style.setProperty('--accent-soft', rgba(d.color, 0.15));
}
function renderPreview() {
  const d = domainOf(draft.domain);
  const l = lineageOf(draft.lineage);
  const r = raceOf(draft.race);
  $('#creatorPortrait').innerHTML = renderPortrait(draft);
  $('#previewName').textContent = draft.name.trim() || t('The Nameless');
  $('#previewEpithet').textContent = t(draft.epithet.trim() || DEFAULT_EPITHETS[draft.domain]).toUpperCase();
  $('#previewChips').innerHTML = `<span>${esc(domainName(d))}</span><span>${esc(lineageName(l))}</span><span>${esc(t(r.name))}</span><span>${esc(draft.pantheon.trim() || t('The New Order'))}</span>`;
  $('#previewGlow').style.background = `radial-gradient(ellipse 70% 45% at 50% 38%, ${rgba(d.color, 0.16)}, transparent 70%)`;
  $('#buildSummary').innerHTML = `${t('Domain of')} <b>${esc(domainName(d))}</b> · <b>${esc(lineageName(l))}</b> · ${t('Worshipped by')} <b>${esc(t(r.name))}</b><br>${esc(isEs() && r.descEs ? r.descEs : r.desc)} <span style="color:var(--muted-2)">${esc(t(d.passive))}</span>`;
  creatorAccent();
}

function groupLabel(title, sub) {
  return `<div class="group-label"><strong>${title}</strong><em>${sub || ''}</em></div>`;
}
function swatches(field, list, current) {
  return `<div class="swatches">${list.map(c => `<button class="swatch${c.hex === current ? ' selected' : ''}" style="background:${c.hex}" data-field="${field}" data-value="${c.hex}" title="${esc(t(c.name))}" aria-label="${esc(t(c.name))}"></button>`).join('')}</div>`;
}
function options(field, list, current) {
  return `<div class="options">${list.map(o => `<button class="option${o.id === current ? ' selected' : ''}" data-field="${field}" data-value="${o.id}">${esc(t(o.name))}</button>`).join('')}</div>`;
}
function domainGrid() {
  return `<div class="domain-grid">${DOMAINS.map(d => `<button class="domain${d.id === draft.domain ? ' selected' : ''}" style="--dc:${d.color}" data-field="domain" data-value="${d.id}"><span style="color:${d.color}">${icon(DOMAIN_ICONS[d.id])}</span><span>${esc(domainName(d))}</span></button>`).join('')}</div>`;
}
function lineageCards() {
  return `<div class="lineage-grid">${LINEAGES.map(l => `<button class="option-card${l.id === draft.lineage ? ' selected' : ''}" data-field="lineage" data-value="${l.id}">
    <div class="oc-top">${icon(l.id === 'titan' ? 'mountain' : l.id === 'celestial' ? 'star4' : l.id === 'chthonic' ? 'skull' : l.id === 'elemental' ? 'gem' : 'flame')}<span class="oc-name">${esc(lineageName(l))}</span></div>
    <p>${esc(t(l.desc))}</p></button>`).join('')}</div>`;
}
function raceCards() {
  return `<div class="race-grid">${STARTER_RACES.map(r => {
    const tr = traitOf(r.trait);
    return `<button class="option-card${r.id === draft.race ? ' selected' : ''}" data-field="race" data-value="${r.id}">
      <div class="oc-top" style="color:${r.color}">${icon(RACE_ICONS[r.id] || 'users')}<span class="oc-name" style="color:var(--text)">${esc(t(r.name))}</span></div>
      <p>${esc(isEs() && r.descEs ? r.descEs : r.desc)}</p><div class="oc-mods">${esc(t(tr.name))} · ${esc(t(tr.desc))}</div></button>`;
  }).join('')}</div>`;
}

function renderPanel() {
  const a = draft.appearance;
  const panels = $('#creatorPanels');
  let html = '';
  if (creatorTab === 'face') {
    html = `
      ${groupLabel(t('Skin'), t('The hue of a body carved from starlight and clay.'))}
      <div class="field-group">${swatches('appearance.skin', SKIN_TONES, a.skin)}</div>
      ${groupLabel(t('Face'), t('Bone structure is a kind of mythology.'))}
      <div class="field-group">${options('appearance.face', APPEARANCE_OPTIONS.faces, a.face)}</div>
      ${groupLabel(t('Complexion'), t('What mortals see when they dare to look closely.'))}
      <div class="field-group">${options('appearance.complexion', APPEARANCE_OPTIONS.complexions, a.complexion)}</div>
      ${groupLabel(t('Sacred Markings'), t('Your sigil written on the flesh.'))}
      <div class="field-group">${options('appearance.markings', APPEARANCE_OPTIONS.markings, a.markings)}</div>
      ${groupLabel(t('Adornment'), t('A crown is a promise the heavens must keep.'))}
      <div class="field-group">${options('appearance.crown', APPEARANCE_OPTIONS.crowns, a.crown)}</div>`;
  } else if (creatorTab === 'body') {
    html = `
      ${groupLabel(t('Build'), t('The silhouette that will fill a thousand statues.'))}
      <div class="field-group option-card-grid">${APPEARANCE_OPTIONS.builds.map(b => `<button class="option-card${b.id === a.build ? ' selected' : ''}" data-field="appearance.build" data-value="${b.id}">
        <div class="oc-top">${icon(b.id === 'slender' ? 'moon' : b.id === 'athletic' ? 'shield' : b.id === 'broad' ? 'mountain' : 'crown')}<span class="oc-name">${t(b.name)}</span></div><p>${esc(t(b.desc))}</p></button>`).join('')}</div>
      ${groupLabel(t('Presence'), t('The air around you is part of the body.'))}
      <div class="field-group"><div class="toggle-row"><div><strong>${t('Divine radiance')}</strong><p>${t('A soft glow gathers at your edges.')}</p></div><button class="switch on" disabled style="opacity:.55"></button></div></div>
      <p style="font-family:var(--serif);font-style:italic;font-size:11px;color:var(--muted-2);margin-top:4px">${t('Your build shapes the shoulders and chest of every idol carved in your name.')}</p>`;
  } else if (creatorTab === 'eyes') {
    html = `
      ${groupLabel(t('Shape'), t('How you look upon the world.'))}
      <div class="field-group">${options('appearance.eyeShape', APPEARANCE_OPTIONS.eyeShapes, a.eyeShape)}</div>
      ${groupLabel(t('Iris'), t('The colour mortals will write prophecies about.'))}
      <div class="field-group">${swatches('appearance.eyeColor', EYE_COLORS, a.eyeColor)}</div>
      ${groupLabel(t('Divine Light'), t('When you are angry, the air remembers.'))}
      <div class="field-group"><div class="toggle-row"><div><strong>${t('Eyes of power')}</strong><p>${t('A faint luminescence spills from your irises.')}</p></div><button class="switch${a.glow ? ' on' : ''}" data-toggle="appearance.glow" aria-label="${t('Toggle eye glow')}"></button></div></div>`;
  } else if (creatorTab === 'hair') {
    html = `
      ${groupLabel(t('Style'), t('A crown of hair, or a crown over none.'))}
      <div class="field-group">${options('appearance.hairStyle', APPEARANCE_OPTIONS.hairStyles, a.hairStyle)}</div>
      ${groupLabel(t('Colour'), t('Raven, wheat, starlight, or something stranger.'))}
      <div class="field-group">${swatches('appearance.hairColor', HAIR_COLORS, a.hairColor)}</div>
      <p style="font-family:var(--serif);font-style:italic;font-size:11px;color:var(--muted-2)">${t('Hair grows differently for the divine. It may move in a wind that only you feel.')}</p>`;
  } else {
    html = `
      ${groupLabel(t('Domain'), t('What you are the god of. This shapes your powers and your passives.'))}
      <div class="field-group">${domainGrid()}
        <p style="font-family:var(--serif);font-style:italic;font-size:11px;color:var(--muted-2);margin-top:9px">${esc(t(domainOf(draft.domain).passive))}</p>
      </div>
      ${groupLabel(t('Divine Lineage'), t('The kind of god you were born to be.'))}
      <div class="field-group">${lineageCards()}</div>
      ${groupLabel(t('Your First People'), t('The race that will speak your name first.'))}
      <div class="field-group">${raceCards()}</div>`;
  }
  panels.innerHTML = html;
}

function updateDraft(field, value) {
  if (field.startsWith('appearance.')) {
    draft.appearance[field.split('.')[1]] = value;
  } else if (field === 'domain') {
    draft.domain = value;
    if (!epithetTouched) {
      draft.epithet = DEFAULT_EPITHETS[value] || draft.epithet;
      const input = $('#godEpithet'); if (input) input.value = draft.epithet;
    }
  } else {
    draft[field] = value;
  }
}

function bindCreator() {
  $('#godName').addEventListener('input', e => { draft.name = e.target.value; renderPreview(); });
  $('#godEpithet').addEventListener('input', e => { draft.epithet = e.target.value; epithetTouched = true; renderPreview(); });
  $('#godPantheon').addEventListener('input', e => { draft.pantheon = e.target.value; renderPreview(); });
  $('#creatorTabs').addEventListener('click', e => {
    const btn = e.target.closest('.tab'); if (!btn) return;
    creatorTab = btn.dataset.tab;
    $$('#creatorTabs .tab').forEach(t => t.classList.toggle('active', t === btn));
    renderPanel();
    playSound('click');
  });
  $('#creatorPanels').addEventListener('click', e => {
    const sw = e.target.closest('[data-toggle]');
    if (sw) {
      const field = sw.dataset.toggle;
      draft.appearance.glow = !draft.appearance.glow;
      sw.classList.toggle('on', draft.appearance.glow);
      renderPreview();
      playSound('click');
      return;
    }
    const el = e.target.closest('[data-field]');
    if (!el) return;
    updateDraft(el.dataset.field, el.dataset.value);
    const panels = $('#creatorPanels');
    const sc = panels.scrollTop;
    renderPanel();
    panels.scrollTop = sc;
    renderPreview();
    playSound('click');
  });
  $('#randomizeBtn').addEventListener('click', () => {
    const a = draft.appearance;
    a.skin = rand(SKIN_TONES).hex;
    a.face = rand(APPEARANCE_OPTIONS.faces).id;
    a.build = rand(APPEARANCE_OPTIONS.builds).id;
    a.eyeShape = rand(APPEARANCE_OPTIONS.eyeShapes).id;
    a.eyeColor = rand(EYE_COLORS).hex;
    a.glow = Math.random() < 0.75;
    a.hairStyle = rand(APPEARANCE_OPTIONS.hairStyles).id;
    a.hairColor = rand(HAIR_COLORS).hex;
    a.markings = rand(APPEARANCE_OPTIONS.markings).id;
    a.crown = rand(APPEARANCE_OPTIONS.crowns).id;
    a.complexion = rand(APPEARANCE_OPTIONS.complexions).id;
    renderPanel();
    renderPreview();
    playSound('action');
  });
  $('#backToTitle').addEventListener('click', () => { showScreen('screen-title'); renderTitle(); });
  $('#beginGameBtn').addEventListener('click', beginGame);
}

function beginGame() {
  if (!draft.name.trim()) draft.name = t('The Nameless');
  if (!draft.epithet.trim()) draft.epithet = t(DEFAULT_EPITHETS[draft.domain]);
  if (!draft.pantheon.trim()) draft.pantheon = t('The New Order');
  state = newGame(draft);
  state.locale = uiLang;
  saveGame();
  enterGame();
  playSound('ascend');
}

/* ══════════ game shell ══════════ */
function enterGame() {
  showScreen('screen-game');
  $('#screen-game').dataset.mtab = 'realm';
  $$('.mobile-tabs button').forEach(b => b.classList.toggle('active', b.dataset.mtab === 'realm'));
  renderGame();
}

function saveGame() {
  if (!state) return;
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch (e) { /* noop */ }
}
function loadSaved() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.god || typeof parsed.followers !== 'number') return false;
    state = parsed;
    if (!state.lastRanks) state.lastRanks = {};
    if (!state.age) state.age = 18 + Math.max(0, (state.aeon || 1) - 1) * 3;
    state.locale = uiLang;
    return true;
  } catch (e) { return false; }
}

function changeTags(changes) {
  const parts = [];
  const map = { faith: 'Faith', power: 'Power', wisdom: 'Wisdom', influence: 'Influence' };
  for (const k of ['faith', 'power', 'wisdom', 'influence']) {
    if (changes[k]) parts.push(`${changes[k] > 0 ? '+' : ''}${changes[k]} ${t(map[k])}`);
  }
  if (changes.followers) parts.push(`${changes.followers > 0 ? '+' : ''}${fmt(changes.followers)} ${t('souls')}`);
  return parts;
}
function tagHtml(text, good) {
  return `<span class="chg ${good === undefined ? '' : good ? 'good' : 'bad'}">${esc(text)}</span>`;
}

/* ══════════ game render ══════════ */
function renderGame() {
  if (!state) return;
  const d = domainOf(state.god.domain);
  const l = lineageOf(state.god.lineage);
  const might = computeMight(state);
  const stand = standing(state);
  const rank = RANKS[state.rank] || RANKS[0];
  const screen = $('#screen-game');
  screen.style.setProperty('--accent', d.color);
  screen.style.setProperty('--accent-soft', rgba(d.color, 0.15));

  const age = ageOf();
  const mood = computeMood();
  const moodName = t(mood.charAt(0).toUpperCase() + mood.slice(1));
  const hudAvatar = $('#hudAvatar');
  if (hudAvatar) {
    hudAvatar.dataset.mood = mood;
    hudAvatar.style.setProperty('--mood', MOOD_COLORS[mood]);
    hudAvatar.title = t('Mood: {mood} · Age {age}', { mood: moodName, age });
    hudAvatar.setAttribute('aria-label', hudAvatar.title);
  }
  $('#hudAvatarInner').innerHTML = renderPortrait(state.god, { age, crop: 'face' });
  $('#hudAvatarBadge').innerHTML = icon(DOMAIN_ICONS[d.id]);
  const moodLine = $('#moodLine');
  if (moodLine) {
    moodLine.dataset.mood = mood;
    moodLine.style.setProperty('--mood', MOOD_COLORS[mood]);
    moodLine.innerHTML = `<span class="mood-dot"></span><span>${esc(t('{mood} · {age} years', { mood: moodName, age }))}</span>`;
  }
  $('#hudName').textContent = state.god.name;
  $('#hudRank').textContent = rankName(rank);
  $('#hudEpithet').textContent = `${t(state.god.epithet)} · ${t(state.god.pantheon)} · ${ageLabel(age)}`;
  $('#hudMight').textContent = fmt(might);
  $('#hudStanding').textContent = '#' + stand.rank;
  $('#hudAeon').textContent = t('Aeon {n}', { n: roman(state.aeon) });
  $('#hudDomain').textContent = domainName(d);

  $('#gamePortrait').innerHTML = renderPortrait(state.god, { age });
  $('#cardName').textContent = state.god.name;
  $('#cardSub').textContent = `${rankName(rank)} · ${domainName(d)} · ${ageLabel(age)}`;
  $('#cardMight').textContent = fmt(might);
  const next = RANKS[state.rank + 1];
  const curNeed = rank.need;
  const pct = next ? Math.max(0, Math.min(100, ((might - curNeed) / (next.need - curNeed)) * 100)) : 100;
  $('#mightBar').style.width = pct + '%';
  if (next && might < next.need) {
    $('#mightNext').textContent = t('{n} more might to become {name}', { n: fmt(next.need - might), name: rankName(next) });
  } else if (next) {
    $('#mightNext').textContent = t('The way to {name} is open.', { name: rankName(next) });
  } else {
    $('#mightNext').textContent = t('You stand at the summit of the divine order.');
  }
  $('#cardFollowers').textContent = fmt(state.followers);
  const delta = state.followerDelta || 0;
  $('#followersTrend').textContent = delta > 0 ? `+${fmt(delta)}` : delta < 0 ? `${fmt(delta)}` : '';
  $('#followersTrend').className = 'trend' + (delta < 0 ? ' down' : '');

  $('#statGrid').innerHTML = ['faith', 'power', 'wisdom', 'influence'].map(k =>
    `<div class="stat-cell" title="${esc(t(k.charAt(0).toUpperCase() + k.slice(1)))}">${icon(STAT_ICONS[k])}<div><span class="sv">${fmt(state.stats[k])}</span><span class="sl">${esc(t(k))}</span></div></div>`).join('');

  const ascBtn = $('#ascendBtn');
  const ready = canAscend(state);
  if (!next) {
    ascBtn.disabled = true;
    ascBtn.classList.remove('ready');
    ascBtn.innerHTML = `<span class="asc-main">${icon('crown')} ${esc(t('Supreme Architect'))}</span><span class="asc-sub">${esc(t('The summit is yours'))}</span>`;
  } else if (ready) {
    ascBtn.disabled = false;
    ascBtn.classList.add('ready');
    ascBtn.innerHTML = `<span class="asc-main">${icon('crown')} ${esc(t('Ascend to {name}', { name: rankName(next) }))}</span><span class="asc-sub">${esc(t('The heavens are watching'))}</span>`;
  } else {
    ascBtn.disabled = true;
    ascBtn.classList.remove('ready');
    ascBtn.innerHTML = `<span class="asc-main">${icon('crown')} ${esc(t('Ascend'))}</span><span class="asc-sub">${esc(t('{n} might required', { n: fmt(next.need - might) }))}</span>`;
  }

  $('#raceChips').innerHTML = state.races.map((r, i) =>
    `<button class="race-chip" data-race="${i}" title="${esc(t(r.traitName))}"><span class="dot" style="background:${r.color};color:${r.color}"></span>${esc(r.name)}</button>`).join('');
  $('#relicList').innerHTML = state.relics.length
    ? state.relics.map((r, i) => `<div class="relic-row" data-relic="${i}">${icon('gem')}<span>${esc(r.name)}</span><b>+${fmt(r.power)}</b></div>`).join('')
    : `<div class="relic-empty">${esc(t('No relics yet. Make something holy.'))}</div>`;
  $('#relicCount').textContent = state.relics.length ? `${state.relics.length} ${t('forged')}` : '';

  renderActions();
  renderLog();
  renderBoard(stand, might);
  saveGame();
}

function renderActions() {
  $('#apPips').innerHTML = Array.from({ length: apMax(state) }, (_, i) => `<span class="ap-pip${i < state.ap ? ' full' : ''}"></span>`).join('');
  $('#aeonLabel').textContent = t('Aeon {n}', { n: roman(state.aeon) });
  $('#aeonSub').textContent = t(AEON_TITLES[(state.aeon - 1) % AEON_TITLES.length]);
  $('#actionsGrid').innerHTML = ACTIONS.map(a => {
    const afford = canAfford(state, a);
    const reason = missingReasonText(a);
    const costParts = [t('{n} AP', { n: a.ap })];
    if (a.cost.faith) costParts.push(t('{n} faith', { n: a.cost.faith }));
    if (a.cost.power) costParts.push(t('{n} power', { n: a.cost.power }));
    return `<button class="action${afford ? '' : ' disabled'}" data-action="${a.id}" ${reason ? `title="${esc(reason)}"` : ''}>
      <span class="a-icon">${icon(a.glyph)}</span>
      <span class="a-body">
        <span class="a-name"><strong>${esc(t(a.name))}</strong><span class="a-cost">${esc(costParts.join(' · '))}</span></span>
        <span class="a-desc">${esc(t(a.desc))}</span>
      </span>
    </button>`;
  }).join('');
}

function renderLog() {
  const entries = state.log.slice(-40).reverse();
  $('#chronicleMeta').textContent = t('{n} entries · Aeon {n2}', { n: state.log.length, n2: roman(state.aeon) });
  $('#logList').innerHTML = entries.map(e =>
    `<div class="log-entry tone-${e.tone || 'divine'}">
      <span class="le-icon">${icon(e.icon || 'star4')}</span>
      <span class="le-text">${esc(logText(e))}</span>
      <span class="le-aeon">${roman(e.aeon)}</span>
    </div>`).join('');
  const log = $('#logList'); if (log) log.scrollTop = 0;
}

function renderBoard(stand, might) {
  const entries = [
    ...state.rivals.map(r => ({ name: r.name, epithet: r.epithet, pantheon: r.pantheon, domain: r.domain, might: r.might, player: false })),
    { name: 'YOU', might, domain: state.god.domain, pantheon: state.god.pantheon, epithet: state.god.epithet, player: true },
  ].sort((a, b) => b.might - a.might);
  const playerIndex = entries.findIndex(e => e.player);
  const rows = entries.map((e, i) => {
    const playerRank = i + 1;
    if (!e.player && i >= 20) return '';
    const dd = domainOf(e.domain);
    const prev = state.lastRanks ? state.lastRanks[e.player ? 'YOU' : e.name] : null;
    let trend = '';
    if (prev) {
      const diff = prev - playerRank;
      if (diff > 0) trend = `<span class="t-trend up">▲ ${diff}</span>`;
      else if (diff < 0) trend = `<span class="t-trend down">▼ ${Math.abs(diff)}</span>`;
      else trend = `<span class="t-trend">—</span>`;
    }
    const prow = e.player;
    return `<li class="throne${prow ? ' you' : ''}${playerRank <= 3 ? ' top' : ''}" ${prow ? '' : `data-rival="${state.rivals.findIndex(r => r.name === e.name)}"`}>
      <span class="t-rank">${playerRank}</span>
      <span class="t-sigil" style="color:${dd.color}">${icon(DOMAIN_ICONS[dd.id])}</span>
      <span class="t-info"><span class="t-name">${esc(prow ? state.god.name : e.name)}${prow ? `<span class="you-tag">${esc(t('YOU'))}</span>` : ''}</span><span class="t-sub">${esc(domainName(dd))} · ${esc(t(e.pantheon))}</span></span>
      <span class="t-might">${fmt(e.might)}${trend}</span>
    </li>`;
  }).join('');
  $('#leaderboard').innerHTML = rows;
  $('#boardCrown').innerHTML = icon('crown');
  $('#playerStanding').innerHTML = `<span class="standing-text">${esc(t('Your standing'))}</span><span class="standing-badge">#${stand.rank} <span style="color:var(--muted-2);font-size:9px">${esc(t('of {n}', { n: stand.total }))}</span></span>`;
  if (playerIndex >= 20) {
    const note = document.createElement('div');
    note.className = 'standing-text';
    note.style.padding = '6px 4px 0';
    note.innerHTML = t('You are outside the Twenty Thrones. <b>{n}</b> might.', { n: fmt(might) });
    $('#playerStanding').prepend(note);
  }
}

function flashAction(id) {
  const el = document.querySelector(`.action[data-action="${id}"]`);
  if (!el) return;
  el.classList.add('flash');
  setTimeout(() => el.classList.remove('flash'), 600);
}

function toneForAction(id) {
  return ({ prayers: 'faith', miracle: 'divine', bless: 'faith', smite: 'power', prophecy: 'wisdom', meditate: 'wisdom', festival: 'influence', walk: 'influence', relic: 'power', race: 'divine' })[id] || 'divine';
}

/* ══════════ game actions ══════════ */
function bindGame() {
  $('#actionsGrid').addEventListener('click', e => {
    const card = e.target.closest('.action'); if (!card) return;
    const action = ACTIONS.find(a => a.id === card.dataset.action); if (!action) return;
    if (action.special === 'race') { openRaceForge(); return; }
    if (!canAfford(state, action)) {
      toast(missingReasonText(action) || t('The heavens are not yet ready.'), true);
      playSound('error');
      return;
    }
    const res = performAction(state, action.id);
    if (!res.ok) { toast(t(res.error), true); playSound('error'); return; }
    state.followerDelta = res.changes ? res.changes.followers || 0 : 0;
    addLog(state, action.glyph, res.text, toneForAction(action.id), actionChronicleText(action.id, res));
    renderGame();
    flashAction(action.id);
    playSound('action');
    const summary = res.changes ? changeTags(res.changes).slice(0, 3).join(' · ') : (res.relic ? res.relic.name : t('Done'));
    toast(summary || t(action.name));
    if (canAscend(state)) toast(t('The way to {name} is open', { name: rankName(RANKS[state.rank + 1]) }), false);
    if (res.relic) setTimeout(() => openRelicModal(res.relic), 420);
  });

  $('#openRaceBtn').addEventListener('click', openRaceForge);
  $('#ascendBtn').addEventListener('click', () => {
    if (!canAscend(state)) {
      toast(t('You are not yet mighty enough to ascend.'), true);
      playSound('error');
      return;
    }
    const info = ascend(state);
    if (!info) return;
    renderGame();
    playSound('ascend');
    const victory = state.rank === RANKS.length - 1;
    if (victory) state.victory = true;
    saveGame();
    setTimeout(() => openAscendModal(info, victory), 220);
  });

  $('#endTurnBtn').addEventListener('click', () => {
    if (!state) return;
    const res = endAeon(state);
    state.followerDelta = res.gains.followers;
    renderGame();
    playSound('turn');
    toast(t('Aeon {n} begins · +{n2} souls', { n: roman(state.aeon), n2: fmt(res.gains.followers) }));
    if (res.event) setTimeout(() => openEventModal(res.event), 480);
    else if (canAscend(state)) setTimeout(() => toast(t('The way to {name} is open', { name: rankName(RANKS[state.rank + 1]) })), 600);
    saveGame();
  });

  $('#soundBtn').addEventListener('click', () => {
    soundOn = !soundOn;
    try { localStorage.setItem('godspire.sound', soundOn ? 'on' : 'off'); } catch (e) { /* noop */ }
    updateSoundButton();
    if (soundOn) playSound('click');
    toast(t(soundOn ? 'Sound on' : 'Sound off'));
  });
  $('#menuBtn').innerHTML = icon('menu');
  $('#menuBtn').addEventListener('click', openMenu);

  $('#leaderboard').addEventListener('click', e => {
    const row = e.target.closest('[data-rival]'); if (!row) return;
    const idx = Number(row.dataset.rival);
    const r = state.rivals[idx]; if (!r) return;
    openRivalModal(r);
  });
  $('#raceChips').addEventListener('click', e => {
    const chip = e.target.closest('[data-race]'); if (!chip) return;
    const r = state.races[Number(chip.dataset.race)]; if (!r) return;
    openRaceDetail(r);
  });
  $('#relicList').addEventListener('click', e => {
    const row = e.target.closest('[data-relic]'); if (!row) return;
    const r = state.relics[Number(row.dataset.relic)]; if (!r) return;
    openRelicModal(r);
  });

  $('.mobile-tabs').addEventListener('click', e => {
    const btn = e.target.closest('[data-mtab]'); if (!btn) return;
    $$('.mobile-tabs button').forEach(b => b.classList.toggle('active', b === btn));
    $('#screen-game').dataset.mtab = btn.dataset.mtab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playSound('click');
  });
}

function updateSoundButton() {
  $('#soundBtn').innerHTML = icon(soundOn ? 'sound' : 'mute');
}

/* ══════════ modals ══════════ */
function closeModal() { $('#modalRoot').innerHTML = ''; }
function openModal(inner, cls = '') {
  $('#modalRoot').innerHTML = `<div class="modal-backdrop"><div class="modal ${cls}" role="dialog" aria-modal="true">${inner}</div></div>`;
  const bd = $('#modalRoot').firstElementChild;
  bd.addEventListener('click', e => { if (e.target === bd) closeModal(); });
}
function closeBtn() { return `<button class="modal-close" data-close aria-label="${esc(t('Close'))}">${icon('close')}</button>`; }
function affordableEffects(effects = {}) {
  for (const k of ['faith', 'power']) {
    if (effects[k] < 0 && state.stats[k] < -effects[k]) return false;
  }
  return true;
}
function effectTags(effects = {}) {
  const out = [];
  for (const [k, label] of [['faith', 'Faith'], ['power', 'Power'], ['wisdom', 'Wisdom'], ['influence', 'Influence']]) {
    if (effects[k]) out.push(tagHtml(`${effects[k] > 0 ? '+' : ''}${effects[k]} ${t(label)}`, effects[k] > 0));
  }
  if (effects.followersPct) out.push(tagHtml(t('{n}% Souls', { n: (effects.followersPct > 0 ? '+' : '') + Math.round(effects.followersPct * 100) }), effects.followersPct > 0));
  if (effects.relic) out.push(tagHtml(t('+ Relic'), true));
  return out.join('');
}

function openEventModal(rawEv) {
  const ev = localizedEvent(rawEv);
  openModal(`${closeBtn()}
    <div class="modal-kicker">${esc(t('Aeon {n} · Omen', { n: roman(state.aeon) }))}</div>
    <h2>${esc(ev.title)}</h2>
    <p class="modal-text">${esc(ev.text)}</p>
    <div class="choice-list">${ev.choices.map((c, i) => {
      const ok = affordableEffects(c.effects);
      return `<button class="choice" data-choice="${i}" ${ok ? '' : 'disabled'}>
        <span class="ch-label">${esc(c.label)}</span>
        <span class="ch-tags">${effectTags(c.effects)}</span>
      </button>`;
    }).join('')}</div>`);
  $$('#modalRoot .choice').forEach(btn => btn.addEventListener('click', () => {
    if (btn.disabled) return;
    const choiceIndex = Number(btn.dataset.choice);
    const choice = ev.choices[choiceIndex];
    const out = applyEventChoice(state, choice);
    const enResult = (rawEv.choices[choiceIndex] && rawEv.choices[choiceIndex].result) || out.result;
    addLog(state, 'star4', enResult, 'divine', out.result);
    state.followerDelta = out.changes.followers || 0;
    renderGame();
    saveGame();
    playSound('omen');
    const tags = changeTags(out.changes).map(t => tagHtml(t, !t.startsWith('-'))).join('');
    openModal(`${closeBtn()}
      <div class="modal-kicker">${esc(ev.title)}</div>
      <p class="modal-text">${esc(out.result)}</p>
      ${out.relic ? `<p class="modal-text" style="color:var(--gold)">${t('You also gain the relic <b>{relic}</b>.', { relic: esc(out.relic.name) })}</p>` : ''}
      <div class="result-changes">${tags || tagHtml(t('The story moves on'), true)}</div>
      <div class="modal-actions"><button class="btn primary" data-close>${esc(t('Continue'))}</button></div>`);
    if (canAscend(state)) setTimeout(() => toast(t('The way to {name} is open', { name: rankName(RANKS[state.rank + 1]) })), 400);
  }));
}

function openAscendModal(info, victory) {
  const gains = [
    tagHtml(t('+{n} Might', { n: fmt(info.gainedMight) }), true),
    tagHtml(t('+18% Souls'), true),
    tagHtml(t('+12 Faith'), true),
    tagHtml(t('+7 Power'), true),
    tagHtml(t('+7 Wisdom'), true),
    tagHtml(t('+5 Influence'), true),
  ].join('');
  const victoryText = victory
    ? `<p class="modal-text">${esc(t('The Twenty Thrones are silent. One by one, the elder powers incline their heads. The mortal world will tell this story until the last star burns out — the story of the god who climbed from a single prayer to the hand that turns the wheel of myth.'))}</p>`
    : `<p class="modal-text">${esc(t(info.to.lore))}</p>`;
  openModal(`<div class="ascend-glyph">${icon(victory ? 'wheel' : 'crown')}</div>
    <div class="modal-kicker">${esc(victory ? t('The summit of the divine order') : t('Aeon {n} · Apotheosis', { n: roman(state.aeon) }))}</div>
    <h2>${esc(victory ? t('Supreme Architect') : rankName(info.to))}</h2>
    <div class="new-rank">${esc(rankName(info.from))} → ${esc(rankName(info.to))}</div>
    ${victoryText}
    <div class="ascend-gains">${gains}</div>
    <div class="modal-actions">${victory
      ? `<button class="btn ghost" data-new>${esc(t('Begin a New Myth'))}</button><button class="btn primary" data-close>${esc(t('Continue Eternally'))}</button>`
      : `<button class="btn primary" data-close>${esc(t('Take Your Place'))}</button>`}</div>`,
    'ascend-modal' + (victory ? ' victory' : ''));
  const newBtn = $('#modalRoot [data-new]');
  if (newBtn) newBtn.addEventListener('click', () => { closeModal(); startNewGodFlow(); });
}

function openRivalModal(r) {
  const dd = domainOf(r.domain);
  const lore = {
    storm: 'Their storms still answer to the old names. They resent new thunder.',
    death: 'They keep a ledger of every soul, including yours.',
    love: 'They collect devotion the way other gods collect swords.',
    war: 'They have never lost a war. They are careful about which wars they start.',
    wisdom: 'They know what you are planning. They have known for some time.',
    nature: 'Their forests grow in the shape of old promises.',
    sun: 'Their light exposes everything. They cast no shadow of their own.',
    moon: 'They speak only in tides and omens.',
    trickery: 'They taught the first lie to the first god.',
    forge: 'They can unmake anything, including a reputation.',
    sea: 'They remember the world before the shore.',
    time: 'They have already seen how this ends. They are not telling.',
  };
  const entries = [...state.rivals, { name: state.god.name, might: computeMight(state), player: true }].sort((a, b) => b.might - a.might);
  const rank = entries.findIndex(e => e.name === r.name && !e.player) + 1;
  openModal(`${closeBtn()}
    <div class="modal-kicker">${esc(t('{domain} deity', { domain: domainName(dd) }))} · ${esc(t(r.pantheon))}</div>
    <div class="rival-card" style="--accent:${dd.color};--accent-soft:${rgba(dd.color, 0.16)}">
      <div class="rival-sigil">${icon(DOMAIN_ICONS[dd.id])}</div>
      <div><h2 style="font-size:28px">${esc(r.name)}</h2><div class="rival-meta">${esc(t(r.epithet))}</div><div class="rival-might">${fmt(r.might)} <span style="font-size:10px;font-family:var(--sans);letter-spacing:.12em;color:var(--muted-2)">${esc(t('MIGHT'))} · #${rank}</span></div></div>
    </div>
    <p class="modal-text" style="margin-top:18px">${esc(t(lore[r.domain] || 'They watch your rise with the patience of something older than patience.'))}</p>
    <div class="result-changes">${tagHtml(t('{domain} domain', { domain: domainName(dd) }), true)}${tagHtml(t('Cult growth +{n}% / aeon', { n: Math.round(r.growth * 1000) / 10 }))}</div>
    <div class="modal-actions"><button class="btn ghost" data-close>${esc(t('Withdraw'))}</button></div>`);
}



function modsText(mods = {}) {
  const out = [];
  if (mods.growth) out.push(t('+{n}% follower growth', { n: Math.round(mods.growth * 100) }));
  if (mods.faithPerAeon) out.push(t('+{n} faith / aeon', { n: mods.faithPerAeon }));
  if (mods.powerPerAeon) out.push(t('+{n} power / aeon', { n: mods.powerPerAeon }));
  if (mods.wisdomPerAeon) out.push(t('+{n} wisdom / aeon', { n: mods.wisdomPerAeon }));
  if (mods.influencePerAeon) out.push(t('+{n} influence / aeon', { n: mods.influencePerAeon }));
  return out;
}

function openMenu() {
  openModal(`${closeBtn()}
    <div class="modal-kicker">${esc(t('Aeon {n}', { n: roman(state.aeon) }))} · ${esc(rankName(RANKS[state.rank]))}</div>
    <h2>${esc(t('The Chronicle Paused'))}</h2>
    <div class="menu-list">
      <button class="menu-item" data-close>${icon('book')}<div class="mi-text"><strong>${esc(t('Resume the chronicle'))}</strong><span>${esc(t('Return to your divine work.'))}</span></div></button>
      <button class="menu-item" id="menuGuide">${icon('scale')}<div class="mi-text"><strong>${esc(t('How to Play'))}</strong><span>${esc(t('The loop, the ranks, the throne.'))}</span></div></button>
      <button class="menu-item" id="menuSound">${icon(soundOn ? 'sound' : 'mute')}<div class="mi-text"><strong>${esc(t(soundOn ? 'Sound: on' : 'Sound: off'))}</strong><span>${esc(t('A little music between prayers.'))}</span></div></button>
      <button class="menu-item" id="menuSave">${icon('star4')}<div class="mi-text"><strong>${esc(t('Save &amp; return to title'))}</strong><span>${esc(t('Your chronicle is stored in this browser.'))}</span></div></button>
      <button class="menu-item" id="menuNew">${icon('flame')}<div class="mi-text"><strong>${esc(t('Begin a new myth'))}</strong><span>${esc(t('Cast this god aside and start over.'))}</span></div></button>
    </div>`);
  $('#menuGuide').addEventListener('click', openGuide);
  $('#menuSound').addEventListener('click', () => {
    soundOn = !soundOn;
    try { localStorage.setItem('godspire.sound', soundOn ? 'on' : 'off'); } catch (e) { /* noop */ }
    updateSoundButton();
    if (soundOn) playSound('click');
    openMenu();
  });
  $('#menuSave').addEventListener('click', () => {
    saveGame();
    closeModal();
    showScreen('screen-title');
    renderTitle();
    toast(t('Chronicle saved'));
  });
  $('#menuNew').addEventListener('click', openNewGodConfirm);
}

function openNewGodConfirm() {
  openModal(`${closeBtn()}
    <div class="modal-kicker">${esc(t('A clean slate'))}</div>
    <h2>${esc(t('Abandon This Myth?'))}</h2>
    <p class="modal-text">${esc(t('Your current chronicle will be overwritten when you create a new god. The old story will be lost to the void.'))}</p>
    <div class="modal-actions"><button class="btn ghost" data-close>${esc(t('Keep this chronicle'))}</button><button class="btn primary" id="confirmNewGod">${esc(t('Begin anew'))}</button></div>`);
  $('#confirmNewGod').addEventListener('click', () => { closeModal(); startNewGodFlow(); });
}

function openGuide() {
  openModal(`${closeBtn()}
    <div class="modal-kicker">${esc(t('The divine handbook'))}</div>
    <h2>${esc(t('How to Play'))}</h2>
    <div class="guide-section">
      <h3>${esc(t('1 · Shape a god'))}</h3>
      <p>${esc(t('Choose a face, body, eyes, hair, domain, lineage, and the first race that will worship you. Every choice changes both your portrait and your passives.'))}</p>
    </div>
    <div class="guide-section">
      <h3>${esc(t('2 · Spend your aeons'))}</h3>
      <p>${esc(t('Each aeon grants 3 divine actions. Answer prayers, work miracles, forge relics, or breathe a new race into being. When you end the aeon, your followers grow, your rivals grow, and an omen may demand a choice.'))}</p>
    </div>
    <div class="guide-section">
      <h3>${esc(t('3 · Ascend'))}</h3>
      <p>${esc(t('Divine Might is your score. When it crosses the threshold, ascend to the next rank. Ascension grants a surge of power and extra actions at higher ranks.'))}</p>
      <div class="guide-ranks">${RANKS.map(r => `<span>${esc(rankName(r))}</span>`).join('')}</div>
    </div>
    <div class="guide-section">
      <h3>${esc(t('4 · Claim a throne'))}</h3>
      <p>${t('The Twenty Thrones rank every god by Divine Might. Rivals scheme and grow every aeon. Reach <b style="color:var(--gold)">Supreme Architect</b> and stand above them all.')}</p>
    </div>
    <div class="guide-section">
      <h3>${esc(t('5 · Build a people'))}</h3>
      <p>${esc(t('Forge custom races in the Genesis Forge. Each race adds permanent passive bonuses, and only four can hold your name.'))}</p>
    </div>
    <div class="modal-actions"><button class="btn primary" data-close>${esc(t('Return to the myth'))}</button></div>`);
}

function openRaceForge() {
  if (!state) return;
  if (state.races.length >= 4) { toast(t('Four races already hold your name. The forge is closed.'), true); playSound('error'); return; }
  const action = ACTIONS.find(a => a.id === 'race');
  if (!canAfford(state, action)) {
    toast(missingReasonText(action) || t('The forge demands more.'), true);
    playSound('error');
    return;
  }
  const forms = [
    { name: 'Humanoid', ears: 'round' }, { name: 'Elven', ears: 'pointed' }, { name: 'Aquatic', ears: 'finned' },
    { name: 'Draconic', ears: 'horned' }, { name: 'Beastfolk', ears: 'pointed' }, { name: 'Starborn', ears: 'pointed' },
  ];
  const f = { name: '', glyph: 'star4', color: '#cdb8ff', trait: 'industrious', form: 'Humanoid', ears: 'round' };
  const glyphs = ['star4', 'gem', 'leaf', 'flame', 'moon', 'bolt', 'waves', 'crown', 'eye', 'hammer', 'mountain', 'paw'];
  const colors = ['#e7c27a', '#9fd9c4', '#74d4d0', '#ff9c66', '#cdb8ff', '#ff7a7a', '#8ee6a8', '#7fb8ff', '#f2d9a0', '#e39a6f'];
  const traits = TRAITS;
  openModal(`${closeBtn()}
    <div class="modal-kicker">${esc(t('The Genesis Forge'))}</div>
    <h2>${esc(t('Forge a New Race'))}</h2>
    <p class="modal-text" style="font-size:14px">${esc(t('Clay, starlight, and a whispered name. Choose what kind of people will look up at you.'))}</p>
    <div class="modal-body">
      <div class="forge-preview">
        <div class="forge-sigil" id="forgeSigil" style="color:${f.color};border-color:${rgba(f.color, 0.4)};background:${rgba(f.color, 0.12)}">${icon(f.glyph)}</div>
        <div><strong id="forgePreviewName">${esc(t('An Unnamed People'))}</strong><span id="forgePreviewMeta">${esc(t('Industrious'))} · ${esc(t('Humanoid'))}</span></div>
      </div>
      <div class="field" style="margin-top:12px"><span>${esc(t('Race name'))}</span><input id="forgeName" maxlength="22" placeholder="${esc(t('e.g. The Glassborn'))}" autocomplete="off" /></div>
      <div class="forge-grid" style="margin-top:12px">
        <div><div class="group-label"><strong>${esc(t('Sigil'))}</strong></div><div class="glyph-picker">${glyphs.map(g => `<button class="glyph-pick${g === f.glyph ? ' selected' : ''}" data-glyph="${g}">${icon(g)}</button>`).join('')}</div></div>
        <div><div class="group-label"><strong>${esc(t('Colour'))}</strong></div><div class="swatches">${colors.map(c => `<button class="swatch${c === f.color ? ' selected' : ''}" style="background:${c}" data-color="${c}"></button>`).join('')}</div></div>
      </div>
      <div class="group-label" style="margin-top:14px"><strong>${esc(t('Nature'))}</strong><em>${esc(t('A permanent passive for your god.'))}</em></div>
      <div class="trait-grid">${traits.map(tr => `<button class="trait${tr.id === f.trait ? ' selected' : ''}" data-trait="${tr.id}"><strong>${icon(TRAIT_ICONS[tr.id])}${esc(t(tr.name))}</strong>${esc(t(tr.desc))}</button>`).join('')}</div>
      <div class="group-label" style="margin-top:14px"><strong>${esc(t('Form'))}</strong></div>
      <div class="options">${forms.map((fo, i) => `<button class="option${i === 0 ? ' selected' : ''}" data-form="${i}">${esc(t(fo.name))}</button>`).join('')}</div>
      <div class="forge-cost">${t('Costs <b>2 actions</b>, <b>30 faith</b> and <b>12 power</b>. Grants <b>+18% souls</b> immediately.')}</div>
    </div>
    <div class="modal-actions"><button class="btn ghost" data-close>${esc(t('Leave the forge'))}</button><button class="btn primary" id="forgeConfirm" disabled>${esc(t('Breathe Life'))}</button></div>`);

  const syncPreview = () => {
    const trait = traitOf(f.trait);
    $('#forgePreviewName').textContent = f.name.trim() || t('An Unnamed People');
    $('#forgePreviewMeta').textContent = `${t(trait.name)} · ${t(f.form)}`;
    $('#forgeSigil').style.color = f.color;
    $('#forgeSigil').style.borderColor = rgba(f.color, 0.4);
    $('#forgeSigil').style.background = rgba(f.color, 0.12);
    $('#forgeSigil').innerHTML = icon(f.glyph);
    $('#forgeConfirm').disabled = !f.name.trim();
  };
  $('#forgeName').addEventListener('input', e => { f.name = e.target.value; syncPreview(); });
  $$('#modalRoot [data-glyph]').forEach(b => b.addEventListener('click', () => {
    f.glyph = b.dataset.glyph;
    $$('#modalRoot [data-glyph]').forEach(x => x.classList.toggle('selected', x === b));
    syncPreview();
  }));
  $$('#modalRoot [data-color]').forEach(b => b.addEventListener('click', () => {
    f.color = b.dataset.color;
    $$('#modalRoot [data-color]').forEach(x => x.classList.toggle('selected', x === b));
    syncPreview();
  }));
  $$('#modalRoot [data-trait]').forEach(b => b.addEventListener('click', () => {
    f.trait = b.dataset.trait;
    $$('#modalRoot [data-trait]').forEach(x => x.classList.toggle('selected', x === b));
    syncPreview();
  }));
  $$('#modalRoot [data-form]').forEach((b, i) => b.addEventListener('click', () => {
    f.form = forms[i].name; f.ears = forms[i].ears;
    $$('#modalRoot [data-form]').forEach(x => x.classList.toggle('selected', x === b));
    syncPreview();
  }));
  $('#forgeConfirm').addEventListener('click', () => {
    if (!f.name.trim()) return;
    if (!canAfford(state, action)) { toast(missingReasonText(action), true); return; }
    const trait = traitOf(f.trait);
    state.ap -= action.ap;
    state.stats.faith -= 30;
    state.stats.power -= 12;
    state.followers = Math.round(state.followers * 1.18);
    state.followerDelta = 0;
    state.races.push({
      id: 'custom-' + Date.now(), name: f.name.trim(), glyph: f.glyph, color: f.color, form: f.form, ears: f.ears,
      trait: trait.id, traitName: trait.name, mods: { ...trait.mods }, custom: true, founded: state.aeon,
    });
    addLog(state, 'users',
      `From clay and starlight you forge the ${f.name.trim()}. Their first prayer is a child's laugh, and it is answered.`,
      'divine',
      `Con barro y luz de estrellas forjas a los ${f.name.trim()}. Su primera plegaria es la risa de un niño, y es respondida.`);
    closeModal();
    renderGame();
    saveGame();
    playSound('ascend');
    toast(t('The {race} now worship you', { race: f.name.trim() }));
    if (canAscend(state)) setTimeout(() => toast(t('The way to {name} is open', { name: rankName(RANKS[state.rank + 1]) })), 700);
  });
}

function openRaceDetail(r) {
  const mods = modsText(r.mods).map(m => tagHtml(m, true)).join('');
  openModal(`${closeBtn()}
    <div class="modal-kicker">${esc(t(r.custom ? 'A race of your making' : 'Your first people'))}</div>
    <div class="race-detail">
      <div class="forge-sigil" style="width:60px;height:60px;color:${r.color};border-color:${rgba(r.color, 0.4)};background:${rgba(r.color, 0.12)}">${icon(r.glyph || RACE_ICONS[r.id] || 'users')}</div>
      <div><h2 style="font-size:27px">${esc(r.name)}</h2><div class="rival-meta">${esc(t(r.form || 'Mortal'))} · ${esc(t(r.traitName))}</div></div>
    </div>
    <p class="modal-text" style="font-size:14px">${esc(t('They build their lives around your name. Their prayers arrive with every dawn, and their gifts accumulate in the dark of your temple.'))}</p>
    <div class="result-changes">${mods || tagHtml(t('Faithful and true'), true)}${r.founded ? tagHtml(t('Adopted in Aeon {n}', { n: roman(r.founded) })) : ''}</div>
    <div class="modal-actions"><button class="btn ghost" data-close>${esc(t('Close'))}</button></div>`);
}

function openRelicModal(r) {
  openModal(`${closeBtn()}
    <div class="modal-kicker">${esc(t('Relic of your making'))}</div>
    <h2>${esc(r.name)}</h2>
    <p class="modal-text">${esc(t('A piece of the world made holy. It remembers being something else, and it hums when you are angry.'))}</p>
    <div class="result-changes">${tagHtml(t('+{n} Might', { n: fmt(r.power) }), true)}${tagHtml(t('Forged by your hand'), true)}</div>
    <div class="modal-actions"><button class="btn ghost" data-close>${esc(t('Return it to the altar'))}</button></div>`);
}

function startNewGodFlow() {
  draft = makeDraft();
  epithetTouched = false;
  $('#godName').value = draft.name;
  $('#godEpithet').value = draft.epithet;
  $('#godPantheon').value = draft.pantheon;
  creatorTab = 'face';
  $$('#creatorTabs .tab').forEach(tab => tab.classList.toggle('active', tab.dataset.tab === 'face'));
  renderPanel();
  renderPreview();
  showScreen('screen-create');
}

function continueGame() {
  if (loadSaved()) {
    enterGame();
    toast(t('Chronicle resumed'));
    playSound('omen');
  } else {
    toast(t('No chronicle found'), true);
    renderTitle();
  }
}

/* ══════════ init ══════════ */
function init() {
  initStars();
  updateSoundButton();
  applyStatic();
  syncLangButtons();
  renderTitle();
  bindCreator();
  bindGame();

  $('#beginBtn').addEventListener('click', () => {
    showScreen('screen-create');
    renderPanel();
    renderPreview();
    playSound('omen');
  });
  $('#continueBtn').addEventListener('click', continueGame);
  $('#guideBtn').addEventListener('click', openGuide);

  $('#godName').value = draft.name;
  $('#godEpithet').value = draft.epithet;
  $('#godPantheon').value = draft.pantheon;
  renderPanel();
  renderPreview();

  document.addEventListener('click', e => {
    const langBtn = e.target.closest('[data-lang]');
    if (langBtn) { setLanguage(langBtn.dataset.lang); return; }
    if (e.target.closest('[data-close]')) closeModal();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  window.addEventListener('pointerdown', () => audio(), { once: true });

  // small developer hook, useful for QA and future expansions
  window.godspire = {
    get state() { return state; },
    setState(s) { state = s; saveGame(); enterGame(); },
    render: renderGame,
    newGame: d => { draft = { ...draft, ...d }; state = newGame(draft); saveGame(); enterGame(); },
    openEvent: () => { if (state) openEventModal(pickEvent(state)); },
    openRaceForge,
  };
}

init();
