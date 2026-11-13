// Optional adventures use the same action economy and chronicle as divine actions.
import { applyChanges, addLog } from './data.js';

export function openActivities({ state, openModal, closeBtn, renderGame, isEs }) {
  const es = isEs();
  const text = (en, spanish) => es ? spanish : en;
  const adventures = [
    { id: 'train', title: text('Train in the palaestra', 'Entrenar en la palestra'), desc: text('Hone your divine strength · +3 power', 'Perfecciona tu fuerza divina · +3 poder'), effects: { power: 3 }, result: text('You trained among the marble columns of the palaestra.', 'Entrenaste entre las columnas de mármol de la palestra.') },
    { id: 'oracle', title: text('Consult the oracle', 'Consultar al oráculo'), desc: text('Study the threads of fate · +3 wisdom', 'Estudia los hilos del destino · +3 sabiduría'), effects: { wisdom: 3 }, result: text('The oracle shared a fragment of the future.', 'El oráculo compartió un fragmento del futuro.') },
    { id: 'games', title: text('Host sacred games', 'Celebrar juegos sagrados'), desc: text('Bring the town together · +2 influence, +25 souls', 'Reúne al pueblo · +2 influencia, +25 almas'), effects: { influence: 2, followersFlat: 25 }, result: text('The town gathered for games in your honor.', 'El pueblo se reunió para celebrar juegos en tu honor.') },
  ];
  const battles = [
    { id: 'beast', title: text('Battle the Nemean beast', 'Combatir a la bestia de Nemea'), difficulty: 12, reward: { power: 3, followersFlat: 45 }, loss: { faith: -2 }, detail: text('Victory: +3 power, +45 souls · Defeat: −2 faith', 'Victoria: +3 poder, +45 almas · Derrota: −2 fe') },
    { id: 'titan', title: text('Challenge a Titan', 'Desafiar a un titán'), difficulty: 24, reward: { power: 6, influence: 3, followersFlat: 100 }, loss: { faith: -4, followersPct: -0.02 }, detail: text('Victory: +6 power, +3 influence, +100 souls · Defeat: −4 faith, −2% souls', 'Victoria: +6 poder, +3 influencia, +100 almas · Derrota: −4 fe, −2% almas') },
  ];
  const chance = b => Math.max(20, Math.min(90, 50 + (state.stats.power - b.difficulty) * 2));
  openModal(`${closeBtn()}<div class="modal-kicker">${text('Beyond the throne', 'Más allá del trono')}</div>
    <h2>${text('Activities & battles', 'Actividades y batallas')}</h2>
    <p class="modal-text">${text('Each venture costs 1 divine action. Battles are risky: your power improves your chance of victory.', 'Cada aventura cuesta 1 acción divina. Las batallas son arriesgadas: tu poder mejora tus posibilidades de victoria.')}</p>
    <div class="choice-list">${adventures.map(a => `<button class="choice" data-venture="${a.id}"><span class="ch-label">${a.title}</span><span class="ch-tags">${a.desc}</span></button>`).join('')}
    ${battles.map(b => `<button class="choice" data-venture="${b.id}"><span class="ch-label">⚔ ${b.title} · ${chance(b)}%</span><span class="ch-tags">${b.detail}</span></button>`).join('')}</div>`);
  document.querySelectorAll('#modalRoot [data-venture]').forEach(button => button.addEventListener('click', () => {
    if (state.ap < 1) {
      button.insertAdjacentHTML('afterend', `<p class="modal-text" role="alert">${text('No actions left. End the aeon to recover.', 'No quedan acciones. Termina el eón para recuperarlas.')}</p>`);
      return;
    }
    const activity = adventures.find(a => a.id === button.dataset.venture);
    const battle = battles.find(b => b.id === button.dataset.venture);
    if (!activity && !battle) return;
    state.ap -= 1;
    let result;
    if (activity) {
      applyChanges(state, activity.effects);
      result = activity.result;
    } else {
      const victory = Math.random() * 100 < chance(battle);
      applyChanges(state, victory ? battle.reward : battle.loss);
      state.battles = state.battles || { wins: 0, losses: 0 };
      state.battles[victory ? 'wins' : 'losses']++;
      result = victory ? text(`Victory! ${battle.title}.`, `¡Victoria! ${battle.title}.`) : text(`Defeat. ${battle.title}.`, `Derrota. ${battle.title}.`);
    }
    addLog(state, 'star4', result, 'power');
    renderGame();
    openModal(`${closeBtn()}<div class="modal-kicker">${text('Your chronicle', 'Tu crónica')}</div><h2>${result}</h2><p class="modal-text">${text('Your deeds have been recorded.', 'Tus hazañas han quedado registradas.')}</p><div class="modal-actions"><button class="btn primary" id="moreVentures">${text('More adventures', 'Más aventuras')}</button></div>`);
    document.querySelector('#moreVentures').addEventListener('click', () => openActivities({ state, openModal, closeBtn, renderGame, isEs }));
  }));
}
