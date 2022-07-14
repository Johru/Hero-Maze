import { setup } from './setup';
import {
  renderFloor,
  renderWalls,
  printstats,
  clearCanvas,
} from './map-render';
import { checkIfHeroDead,attemptToMoveHero,renderHero } from './hero';
import { renderAllMonsters,assignKey,checkIfBattleForMonsters } from './monster';
import {
  monsterList,
  bossMonster,
  monstersMove,
  updateMonstersMove,
  updateMonstersLevel,
  heroStats,
} from './variables';

setup();
window.onload = () => {
  updateGameState();
};

function updateGameState() {
  clearCanvas();
  renderFloor();
  renderWalls();
  printstats();
  renderHero();
  renderAllMonsters();
  resetMonsterMoveTimer();
  renderHero();
  checkIfBattleForMonsters();
  checkIfHeroDead();
  checkRoundEnd();
}
function resetMonsterMoveTimer() {
  if (monstersMove) {
    updateMonstersMove(false);
  } else {
    updateMonstersMove(true);
  }
}

function checkRoundEnd() {
  if (!bossMonster.alive&& heroStats.hasKey) {
    heroStats.x = 1;
    heroStats.y = 1;
    heroStats.hasKey = false;
    let hpGainRandomizer = Math.random() * 100 + 1;
    console.log(hpGainRandomizer);
    if (hpGainRandomizer <= 10) {
      heroStats.currentHP = heroStats.maxHP;
      console.log('Full HP restored!');
    }
    if (40 >= hpGainRandomizer && hpGainRandomizer > 10) {
      heroStats.currentHP =
        heroStats.currentHP + Math.floor(heroStats.maxHP / 3);
      console.log('A third of HP restored!');
    }
    if (hpGainRandomizer > 40) {
      heroStats.currentHP =
        heroStats.currentHP + Math.floor(heroStats.maxHP / 10);
      console.log('A tenth of HP restored!');
    }
    if (heroStats.currentHP > heroStats.maxHP) {
      heroStats.currentHP = heroStats.maxHP;
    }
    updateMonstersLevel(1);

    for (let monster of monsterList) {
      monster.init();
    }
    assignKey();
  }
}

document.addEventListener('keydown', function (keyHit) {
  switch (keyHit.key) {
    case 'ArrowDown':
      heroStats.facing = 'heroDown';
      if (attemptToMoveHero()) {
        heroStats.y++;
      }
      updateGameState();
      break;
    case 'ArrowUp':
      heroStats.facing = 'heroUp';
      if (attemptToMoveHero()) {
        heroStats.y--;
      }
      updateGameState();
      break;
    case 'ArrowLeft':
      heroStats.facing = 'heroLeft';
      if (attemptToMoveHero()) {
        heroStats.x--;
      }
      updateGameState();
      break;
    case 'ArrowRight':
      heroStats.facing = 'heroRight';
      if (attemptToMoveHero()) {
        heroStats.x++;
      }
      updateGameState();
      break;
  }
});
