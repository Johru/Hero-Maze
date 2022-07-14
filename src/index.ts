import { setup } from './setup';
import {
  renderFloor,
  renderWalls,
  printstats,
  clearCanvas,
} from './map-render';
import { checkIfHeroDead, attemptToMoveHero, renderHero } from './hero';
import {
  renderAllMonsters,
  assignKey,
  checkIfBattleForMonsters,
  attemptToMoveMonster,
 } from './monster';
import {
  monsterList,
  bossMonster,
  updateMonstersLevel,
  heroStats,
  } from './variables';
  
let lastUpdate = Date.now();
let currentTime = Date.now();
const fps: number = 60;
let moveEveryXMiliseconds: number = 2000;
window.onload = () => {
  updateGameState();
};
setup();
animate();
let interval = setInterval(tickController, moveEveryXMiliseconds);

//Game loop handling

function tickController() {
  if (heroStats.currentHP < 1) {return}
    for (let specimen of monsterList) {
    attemptToMoveMonster(specimen);
  }
}

function initiate() {
  interval = setInterval(tickController, moveEveryXMiliseconds);
}

function animate() {
  currentTime = Date.now();

  let elapsedTime = currentTime - lastUpdate;
  if (elapsedTime >= 1000 / fps) {
    updateGameState();
    lastUpdate = currentTime;
  }
 
  requestAnimationFrame(animate);
}

function updateGameState() {
  clearCanvas();
  renderFloor();
  renderWalls();
  printstats();
  renderAllMonsters();
  renderHero();
  checkIfBattleForMonsters();
  checkIfHeroDead();
  checkVictoryConditions();
}

//Reset when Level finished.
function checkVictoryConditions() {
  if (!bossMonster.alive && heroStats.hasKey) {
    heroStats.x = 1;
    heroStats.y = 1;
    heroStats.hasKey = false;
    let hpGainRandomizer = Math.random() * 100 + 1;
        if (hpGainRandomizer <= 10) {
      heroStats.currentHP = heroStats.maxHP;
        }
    if (40 >= hpGainRandomizer && hpGainRandomizer > 10) {
      heroStats.currentHP =
        heroStats.currentHP + Math.floor(heroStats.maxHP / 3);
          }
    if (hpGainRandomizer > 40) {
      heroStats.currentHP =
        heroStats.currentHP + Math.floor(heroStats.maxHP / 10);
        }
    if (heroStats.currentHP > heroStats.maxHP) {
      heroStats.currentHP = heroStats.maxHP;
    }
    updateMonstersLevel(1);

    for (let monster of monsterList) {
      monster.init();
    }
    assignKey();
    if (moveEveryXMiliseconds > 500) {
      moveEveryXMiliseconds -= 500;
    }

    clearInterval(interval);
    initiate();
  }
}
//manage user input
document.addEventListener('keydown', function (keyHit) {
  if (heroStats.currentHP < 1) {return}
  switch (keyHit.key) {
    case 'ArrowDown':
      heroStats.facing = 'heroDown';
      if (attemptToMoveHero()) {
        heroStats.y++;
      }
      break;
    case 'ArrowUp':
      heroStats.facing = 'heroUp';
      if (attemptToMoveHero()) {
        heroStats.y--;
      }
      break;
    case 'ArrowLeft':
      heroStats.facing = 'heroLeft';
      if (attemptToMoveHero()) {
        heroStats.x--;
      }
      break;
    case 'ArrowRight':
      heroStats.facing = 'heroRight';
      if (attemptToMoveHero()) {
        heroStats.x++;
      }
      break;
  }
});
