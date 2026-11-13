// Mortal relationships live separately from the gods' relationship box so old saves
// and existing divine relationships remain untouched.
import { t } from './i18n.js';

const COOLDOWN_AEONS = 3;
const PEOPLE = [
  { id: 'mara', name: 'Mara', role: 'healer', age: 27, child: 'Liora', topics: ['The clinic is short of medicine.', 'A family fears the coming winter.', 'The village needs a place to heal.'] },
  { id: 'tomas', name: 'Tomas', role: 'builder', age: 30, child: 'Elian', topics: ['The well needs repairs.', 'A storm damaged several homes.', 'The village wants a safer gathering place.'] },
  { id: 'nadiya', name: 'Nadiya', role: 'teacher', age: 25, child: 'Soren', topics: ['The children need books.', 'Some families cannot spare time for lessons.', 'The village hopes to preserve its stories.'] },
];

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const aeon = state => Math.max(1, Number(state.aeon) || 1);

export function ensureSocial(state) {
  if (!state.social || typeof state.social !== 'object' || Array.isArray(state.social)) state.social = {};
  const social = state.social;
  if (!Array.isArray(social.people)) social.people = [];
  if (!Array.isArray(social.children)) social.children = [];
  for (const person of PEOPLE) {
    let savedPerson = social.people.find(p => p && p.id === person.id);
    if (!savedPerson) {
      savedPerson = { id: person.id, metAeon: aeon(state), affection: 0, partner: false, lastTalk: 0 };
      social.people.push(savedPerson);
    }
    if (!Number.isFinite(Number(savedPerson.lastProposal))) savedPerson.lastProposal = 0;
    if (!Number.isFinite(Number(savedPerson.lastFamilyDiscuss))) savedPerson.lastFamilyDiscuss = 0;
  }
  return social;
}

export function personAge(state, person) {
  const definition = PEOPLE.find(p => p.id === person.id);
  return definition ? definition.age + Math.max(0, aeon(state) - (Number(person.metAeon) || aeon(state))) * 3 : 0;
}

export function childAge(state, child) {
  return Math.max(0, aeon(state) - (Number(child.bornAeon) || aeon(state))) * 3;
}

// State transitions validate their own prerequisites, not just disabled buttons.
export function socialAction(state, kind, id, random = Math.random) {
  const social = ensureSocial(state);
  const person = social.people.find(p => p.id === id);
  const def = PEOPLE.find(p => p.id === id);
  const child = social.children.find(c => c.id === id);
  const fail = message => ({ ok: false, message });
  if (!state.stats || !Number.isFinite(state.ap)) return fail('The heavens are not ready.');
  if (['listen', 'help', 'dismiss'].includes(kind)) {
    if (!person || !def) return fail('That person is not here.');
    if (person.lastTalk === aeon(state)) return fail('You have already spoken this aeon.');
    if (state.ap < 1) return fail('Requires 1 divine action.');
    if (kind === 'help' && state.stats.faith < 4) return fail('Requires 4 faith.');
    state.ap--;
    person.lastTalk = aeon(state);
    person.affection = clamp((Number(person.affection) || 0) + (kind === 'listen' ? 16 : kind === 'help' ? 22 : -12), 0, 100);
    if (kind === 'listen') { state.stats.wisdom += 2; return { ok: true, message: `You listen to ${def.name}. Trust and wisdom grow.`, tone: 'wisdom' }; }
    if (kind === 'help') { state.stats.faith -= 4; state.stats.influence += 2; state.followers += 20; return { ok: true, message: `You help ${def.name} meet a village need. Twenty souls join your flock.`, tone: 'faith' }; }
    state.stats.power += 2;
    state.stats.influence = Math.max(0, state.stats.influence - 1);
    return { ok: true, message: `You dismiss ${def.name}'s concerns. Your authority grows, but trust suffers.`, tone: 'power' };
  }
  if (kind === 'partner') {
    if (!person || !def || person.partner || (Number(person.affection) || 0) < 40 || (Number(state.age) || 0) < 18 || personAge(state, person) < 18) return fail('A willing adult friendship of 40 trust is required.');
    if (person.lastProposal && aeon(state) - person.lastProposal < COOLDOWN_AEONS) return fail(t('You may ask {name} again in {n} aeon(s).', { name: def.name, n: COOLDOWN_AEONS - (aeon(state) - person.lastProposal) }));
    person.lastProposal = aeon(state);
    if (random() >= 0.3 + clamp(Number(person.affection) || 0, 0, 100) * 0.0065) {
      return { ok: true, outcome: 'declined', message: `${def.name} declines for now and asks you to respect their choice.`, tone: 'divine' };
    }
    person.partner = true;
    return { ok: true, outcome: 'accepted', message: `${def.name} gladly agrees to a committed partnership. Either of you may choose whether to start a family.`, tone: 'divine' };
  }
  if (kind === 'separate') {
    if (!person || !def || !person.partner) return fail('There is no partnership to end.');
    person.partner = false;
    return { ok: true, message: `You and ${def.name} part respectfully. Your family ties remain.`, tone: 'divine' };
  }
  if (kind === 'family') {
    if (!person || !def || !person.partner || (Number(person.affection) || 0) < 40 || (Number(state.age) || 0) < 18 || personAge(state, person) < 18) return fail('A willing adult partnership with 40 trust is required.');
    if (social.children.some(c => c.parentId === id)) return fail('You have already started a family together.');
    if (person.lastFamilyDiscuss && aeon(state) - person.lastFamilyDiscuss < COOLDOWN_AEONS) return fail(t('You may discuss starting a family again in {n} aeon(s).', { n: COOLDOWN_AEONS - (aeon(state) - person.lastFamilyDiscuss) }));
    if (state.ap < 1 || state.stats.faith < 6) return fail('Requires 1 action and 6 faith.');
    state.ap--;
    person.lastFamilyDiscuss = aeon(state);
    if (random() >= 0.45 + clamp(Number(person.affection) || 0, 0, 100) * 0.005) {
      return { ok: true, outcome: 'declined', message: `${def.name} is not ready to start a family and asks to revisit the question later.`, tone: 'divine' };
    }
    state.stats.faith -= 6;
    social.children.push({ id: `child-${id}`, name: def.child, parentId: id, bornAeon: aeon(state), bond: 0, lastCare: 0 });
    return { ok: true, outcome: 'accepted', message: `You and ${def.name} both choose to welcome ${def.child} into your family.`, tone: 'divine' };
  }
  if (kind === 'care') {
    if (!child) return fail('That family member is not here.');
    if (child.lastCare === aeon(state)) return fail('You have already spent time together this aeon.');
    if (state.ap < 1) return fail('Requires 1 divine action.');
    state.ap--; child.lastCare = aeon(state);
    child.bond = clamp((Number(child.bond) || 0) + 15, 0, 100);
    if (childAge(state, child) >= 18) {
      state.stats.influence += 3;
      return { ok: true, message: `You and ${child.name} exchange ideas as adults. Your influence grows.`, tone: 'influence' };
    }
    state.stats.wisdom += 2;
    return { ok: true, message: `You spend time caring for ${child.name}. Your bond and wisdom grow.`, tone: 'wisdom' };
  }
  return fail('Unknown choice.');
}

export function createSocialUI({ getState, openModal, closeBtn, renderGame, addLog, toast, playSound }) {
  const $ = sel => document.querySelector(sel);
  const all = sel => Array.from(document.querySelectorAll(sel));
  const state = () => getState();
  function presentMessage(kind, id, result) {
    if (!result.ok) return t(result.message);
    const person = PEOPLE.find(p => p.id === id);
    const familyMember = kind === 'care' ? state().social?.children.find(c => c.id === id) : null;
    const child = result.outcome === 'accepted' && kind === 'family' ? person?.child : null;
    const keys = {
      listen: ['You listen to {name}. Trust and wisdom grow.', { name: person?.name }],
      help: ['You help {name} meet a village need. Twenty souls join your flock.', { name: person?.name }],
      dismiss: ["You dismiss {name}'s concerns. Your authority grows, but trust suffers.", { name: person?.name }],
      partner: result.outcome === 'accepted'
        ? ['{name} gladly agrees to a committed partnership. Either of you may choose whether to start a family.', { name: person?.name }]
        : ['{name} declines for now and asks you to respect their choice.', { name: person?.name }],
      family: result.outcome === 'accepted'
        ? ['You and {name} both choose to welcome {child} into your family.', { name: person?.name, child }]
        : ['{name} is not ready to start a family and asks to revisit the question later.', { name: person?.name }],
      separate: ['You and {name} part respectfully. Your family ties remain.', { name: person?.name }],
      care: result.tone === 'influence'
        ? ['You and {name} exchange ideas as adults. Your influence grows.', { name: familyMember?.name }]
        : ["You spend time caring for {name}. Your bond and wisdom grow.", { name: familyMember?.name }],
    };
    const entry = keys[kind];
    return entry ? t(entry[0], entry[1]) : result.message;
  }
  function perform(kind, id, returnTo) {
    const s = state();
    const result = socialAction(s, kind, id);
    const message = presentMessage(kind, id, result);
    if (!result.ok) { toast(message, true); return; }
    addLog(s, 'users', message, result.tone);
    renderGame(); // also saves
    playSound('action');
    toast(message);
    returnTo();
  }
  function openVillagePeople() {
    const s = state(), social = ensureSocial(s);
    openModal(`${closeBtn()}<div class="modal-kicker">${esc(t('The mortal realm'))}</div><h2>${esc(t('Village conversations'))}</h2>
      <p class="modal-text">${esc(t('Meet the adults who shape your village. One conversation per person each aeon; your choices change both trust and your realm.'))}</p>
      <div class="olympus-list">${PEOPLE.map(def => {
        const person = social.people.find(p => p.id === def.id);
        const trust = clamp(Number(person.affection) || 0, 0, 100);
        return `<button class="olympus-row olympus-god" data-person="${def.id}"><span class="olympus-person"><strong>${esc(def.name)}</strong><small>${esc(t(def.role))} · ${esc(t('age {age}', { age: personAge(s, person) }))} · ${esc(t(person.partner ? 'Partner' : 'Village resident'))} · ${esc(t('{n} trust', { n: trust }))}</small></span><span class="olympus-affection">${esc(t('Talk →'))}</span></button>`;
      }).join('')}</div><div class="modal-actions"><button class="btn ghost" id="socialFamily">${esc(t('Family ({n})', { n: social.children.length }))}</button></div>`, 'social-modal');
    all('#modalRoot [data-person]').forEach(button => button.addEventListener('click', () => openPerson(button.dataset.person)));
    $('#socialFamily').addEventListener('click', openFamily);
  }
  function openPerson(id) {
    const s = state(), social = ensureSocial(s), def = PEOPLE.find(p => p.id === id), person = social.people.find(p => p.id === id);
    if (!def || !person) return openVillagePeople();
    const trust = clamp(Number(person.affection) || 0, 0, 100);
    const talked = person.lastTalk === aeon(s), noActions = s.ap < 1;
    const adult = Number(s.age) >= 18 && personAge(s, person) >= 18;
    const hasChild = social.children.some(c => c.parentId === id);
    openModal(`${closeBtn()}<div class="modal-kicker">${esc(t('Village {role} · age {age}', { role: t(def.role), age: personAge(s, person) }))}</div><h2>${esc(def.name)}</h2>
      <p class="modal-text">${esc(t('{name} says: “{topic}”', { name: def.name, topic: t(def.topics[(aeon(s) - 1) % def.topics.length]) }))}</p>
      <div class="relationship-meter"><span>${esc(t(person.partner ? 'Committed partners' : 'Village friendship'))} ${esc(t('· trust'))}</span><strong>${trust}<small> / 100</small></strong><i><b style="width:${trust}%"></b></i></div>
      <p class="village-note">${esc(t(talked ? 'You have spoken this aeon. Return next aeon for another conversation.' : 'Choose one response this aeon.'))}</p>
      <div class="social-actions">
        <button class="choice" data-social="listen" ${talked || noActions ? 'disabled' : ''}><span class="ch-label">${esc(t('Listen with care'))}</span><span class="ch-tags">${esc(t('1 action · +16 trust · +2 wisdom'))}</span></button>
        <button class="choice" data-social="help" ${talked || noActions || s.stats.faith < 4 ? 'disabled' : ''}><span class="ch-label">${esc(t('Offer practical help'))}</span><span class="ch-tags">${esc(t('1 action · −4 faith · +22 trust · +2 influence · +20 souls'))}</span></button>
        <button class="choice" data-social="dismiss" ${talked || noActions ? 'disabled' : ''}><span class="ch-label">${esc(t('Dismiss the concern'))}</span><span class="ch-tags">${esc(t('1 action · −12 trust · +2 power · −1 influence'))}</span></button>
        ${person.partner ? `<button class="choice" data-social="family" ${!adult || trust < 40 || hasChild || noActions || s.stats.faith < 6 ? 'disabled' : ''}><span class="ch-label">${esc(t('Discuss starting a family'))}</span><span class="ch-tags">${esc(t('Both agree · 1 action · 6 faith · 40 trust · one child together'))}</span></button><button class="choice" data-social="separate"><span class="ch-label">${esc(t('End the partnership respectfully'))}</span><span class="ch-tags">${esc(t('Family ties remain'))}</span></button>` : `<button class="choice" data-social="partner" ${!adult || trust < 40 ? 'disabled' : ''}><span class="ch-label">${esc(t('Ask about a committed partnership'))}</span><span class="ch-tags">${esc(t('Both adults · 40 trust · {name} may freely agree', { name: def.name }))}</span></button>`}
      </div><div class="modal-actions"><button class="btn ghost" id="socialBack">${esc(t('Back to village'))}</button><button class="btn ghost" id="socialFamily">${esc(t('Family ({n})', { n: social.children.length }))}</button></div>`, 'social-modal');
    all('#modalRoot [data-social]').forEach(button => button.addEventListener('click', () => perform(button.dataset.social, id, () => openPerson(id))));
    $('#socialBack').addEventListener('click', openVillagePeople);
    $('#socialFamily').addEventListener('click', openFamily);
  }
  function openFamily() {
    const s = state(), social = ensureSocial(s);
    openModal(`${closeBtn()}<div class="modal-kicker">${esc(t('Your living legacy'))}</div><h2>${esc(t('Family'))}</h2>
      <p class="modal-text">${esc(t('Children age three years per aeon. Spend time together once per aeon to build a lasting bond and gain wisdom; adult children share ideas for influence instead.'))}</p>
      ${social.children.length ? `<div class="olympus-list">${social.children.map(child => {
        const parent = PEOPLE.find(p => p.id === child.parentId), age = childAge(s, child), bond = clamp(Number(child.bond) || 0, 0, 100);
        return `<div class="olympus-row"><div><strong>${esc(child.name)}</strong><small>${esc(t('Age {age} · {stage} · parent: {parent} · bond {bond}/100', { age, stage: t(age >= 18 ? 'Adult' : 'Child'), parent: parent ? parent.name : 'Unknown', bond }))}</small></div><button class="btn ghost" data-care="${esc(child.id)}" ${child.lastCare === aeon(s) || s.ap < 1 ? 'disabled' : ''}>${esc(t(age >= 18 ? 'Exchange ideas' : 'Spend time'))}</button></div>`;
      }).join('')}</div>` : `<div class="relationship-empty large">${esc(t('No children yet. Build trust with a village adult and agree to a partnership before discussing a family.'))}</div>`}
      <p class="village-note">${esc(t('Spending time costs 1 action · {n} remaining.', { n: s.ap }))}</p><div class="modal-actions"><button class="btn ghost" id="socialBack">${esc(t('Back to village'))}</button></div>`, 'social-modal');
    all('#modalRoot [data-care]').forEach(button => button.addEventListener('click', () => perform('care', button.dataset.care, openFamily)));
    $('#socialBack').addEventListener('click', openVillagePeople);
  }
  return { openVillagePeople, openFamily };
}
