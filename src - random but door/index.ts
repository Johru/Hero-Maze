import {
  emptyMapLists,
  randomizeFloor,
  adjustWalls,
  pushBoundariesToWallList,
  setup,
  mapSize,
  setMapSize,
} from './random';
import { writeGameLog } from './utility';
import {
  renderFloor,
  renderWalls,
  printstats,
  clearCanvas,
//  drawDoor,
} from './map-render';
import {
  checkIfHeroDead,
  attemptToMoveHero,
  renderHero,
  increaseMapLevel,
  setHeroLevel,
} from './hero';
import {
  renderAllMonsters,
  checkIfBattleForMonsters,
  attemptToMoveMonster,
  resetMonsters,
} from './monster';
import {
  monsterList,
  bossMonster,
  heroStats,
  updateSpeed,
  moveEveryXMiliseconds,
   theDoor,
} from './variables';
export let scrollingModifierX: number = 0;
export let scrollingModifierY: number = 0;
let lastUpdate = Date.now();
let currentTime = Date.now();
const fps: number = 60;
//setup
window.onload = () => {
  updateGameState();
};
setup();
animate();
export let interval = setInterval(tickController, moveEveryXMiliseconds);

//Game loop handling
function tickController() {
  if (heroStats.currentHP < 1) return;
  for (let specimen of monsterList) {
    attemptToMoveMonster(specimen);
  }
}
export function resetScrolling() :void{
  scrollingModifierX = 0;
  scrollingModifierY = 0;
}
export function setMonsterSpeed(): void {
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
  //drawDoor();
  printstats();
  renderAllMonsters();
  setHeroLevel();
  renderHero();
  checkIfBattleForMonsters();
  checkIfHeroDead();
  checkVictoryConditions();
}

//Reset when Map Level finished.
function checkVictoryConditions() {
  if (heroStats.x==theDoor.x&&heroStats.y==theDoor.y) {
    increaseMapLevel();
    setMapSize();
    
    emptyMapLists();
    randomizeFloor();
    adjustWalls();
    pushBoundariesToWallList();
    resetMonsters();
           if (moveEveryXMiliseconds > 500) {
      updateSpeed(500);
      writeGameLog(`Monster Level Increases. Monsters now move faster!`);
    } else {
      writeGameLog(`Monster Level increases. Maximum speed reached.`);
    }
    clearInterval(interval);
    setMonsterSpeed();
    resetScrolling();
    
  }
}

//manage user input
document.addEventListener('keydown', function (keyHit) {
  if (heroStats.currentHP < 1) return;

  switch (keyHit.key) {
    case 'ArrowDown':
      heroStats.facing = 'heroDown';
      if (attemptToMoveHero()) {
        heroStats.y++;
        if (heroStats.y > 5 && heroStats.y < mapSize - 4) {
          scrollingModifierY++;
          console.log(`Y: ${scrollingModifierY}`);
        }
      }
      break;
    case 'ArrowUp':
      heroStats.facing = 'heroUp';
      if (attemptToMoveHero()) {
        heroStats.y--;
        if (heroStats.y > 4 && heroStats.y < mapSize - 5) {
          scrollingModifierY--;
          console.log(`Y: ${scrollingModifierY}`);
        }
      }
      break;
    case 'ArrowLeft':
      heroStats.facing = 'heroLeft';
      if (attemptToMoveHero()) {
        heroStats.x--;
        if (heroStats.x > 4 && heroStats.x < mapSize - 5) {
          scrollingModifierX--;
          console.log(`X: ${scrollingModifierX}`);
        }
      }
      break;
    case 'ArrowRight':
      heroStats.facing = 'heroRight';
      if (attemptToMoveHero()) {
        heroStats.x++;
        if (heroStats.x > 5 && heroStats.x < mapSize - 4) {
          scrollingModifierX++;
          console.log(`X: ${scrollingModifierX}`);
        }
      }
      break;

    case ' ':
      if (heroStats.overKill == false) {
        heroStats.overKill = true;
      } else if (heroStats.overKill == true) {
        heroStats.overKill = false;
      }
            break;
  }
});
