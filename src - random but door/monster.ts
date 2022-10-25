import {
  monsterList,
  tileWidth,
  ctx,
  blood,
  updateDestination,
  getDestination,
  updateMonsterHasKey,
  heroStats,
} from './variables';
import { getSpriteByName, checkIfMoveAllowed, battle } from './utility';
import { Monster } from './classes';
import { scrollingModifierX, scrollingModifierY } from './index';

export function renderAllMonsters(): void {
  for (let i = 0; i < monsterList.length; i++) {
    renderMonster(monsterList[i]);
  }
}
export function renderMonster(specimen: Monster): void {
  if (specimen.alive&&specimen.x-scrollingModifierX<=10&&specimen.y-scrollingModifierY<=10) {
    ctx.drawImage(
      getSpriteByName(specimen.image),
      (specimen.x - 1-scrollingModifierX) * tileWidth,
      (specimen.y - 1-scrollingModifierY) * tileWidth,
      tileWidth,
      tileWidth
    );
  } else if(specimen.x-scrollingModifierX<=10&&specimen.y-scrollingModifierY<=10) {
    ctx.drawImage(
      blood,
      (specimen.x - 1-scrollingModifierX) * tileWidth,
      (specimen.y - 1-scrollingModifierY) * tileWidth,
      tileWidth,
      tileWidth
    );
 }
}

export function resetMonsters() {
  for (let monster of monsterList) {
    monster.init();
  }
  assignKey();
}

export function iterateList(input: any): void {
  for (let specimen of monsterList) {
    input(specimen);
  }
}
export function attemptToMoveMonster(specimen: Monster): void {
  if (specimen.alive) {
    let direction: number = 0;
    let hasMoved: boolean = false;
    let stopIfInfinite: number = 0;
    while (!hasMoved) {
      if (stopIfInfinite > 100) break;
      direction = Math.floor(Math.random() * 4) + 1;
      monsterDestination(direction, specimen);

      if (checkIfMoveAllowed() && checkOtherMonsters(specimen)&&specimen.image!='door') {
        specimen.x = getDestination()[0];
        specimen.y = getDestination()[1];
        hasMoved = true;
      }
      stopIfInfinite++;
      //}
    }
  }
}

function monsterDestination(input: number, specimen: Monster) {
  switch (input) {
    case 1: //down
      updateDestination(specimen.x, specimen.y + 1);
      break;
    case 2: //up
      updateDestination(specimen.x, specimen.y - 1);
      break;
    case 3: //left
      updateDestination(specimen.x - 1, specimen.y);
      break;
    case 4: //right
      updateDestination(specimen.x + 1, specimen.y);
      break;
  }
}

function checkOtherMonsters(specimen: Monster) {
  for (let i = 0; i < monsterList.length; i++) {
    if (i == specimen.orderNumber) continue;
    if (
      monsterList[i].x == getDestination()[0] &&
      monsterList[i].y == getDestination()[1]
    ) {
      return false;
    }
  }
  return true;
}

export function assignKey(): void {
  updateMonsterHasKey(Math.floor(Math.random() * 3) + 1);
}

export function checkIfBattleForMonsters(): void {
  for (let monster of monsterList) {
    if (heroStats.x == monster.x && heroStats.y == monster.y && monster.alive&&monster.image!='door') {
      battle(monster);
    }
  }
}
