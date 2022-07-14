import {
  heroStats,
  monsterList,
  getDestination,
  updateDestination,
  ctx,
  tileWidth,
} from './variables';
import { checkIfMoveAllowed, battle,getSpriteByName } from './utility';
export function checkIfHeroDead():void {
  if (heroStats.currentHP < 1) {
    window.location.reload();
  }
}

export function renderHero():void {
  ctx.drawImage(
    getSpriteByName(heroStats.facing),
    (heroStats.x - 1) * tileWidth,
    (heroStats.y - 1) * tileWidth,
    tileWidth,
    tileWidth
  );
}

export function attemptToMoveHero():boolean {
  makeDestination();
  checkIfBattle();
  return checkIfMoveAllowed();
}

export function checkIfBattle(): void {
  for (let monster of monsterList) {
    if (
      getDestination()[0] == monster.x &&
      getDestination()[1] == monster.y &&
      monster.alive
    ) {
      battle(monster);
    }
  }
}

export function makeDestination(): number[] | undefined {
  if (heroStats.facing == 'heroDown')
    return updateDestination(heroStats.x, heroStats.y + 1);
  if (heroStats.facing == 'heroUp')
    return updateDestination(heroStats.x, heroStats.y - 1);
  if (heroStats.facing == 'heroLeft')
    return updateDestination(heroStats.x - 1, heroStats.y);
  if (heroStats.facing == 'heroRight')
    return updateDestination(heroStats.x + 1, heroStats.y);
}
