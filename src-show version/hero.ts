import {
  heroStats,
  monsterList,
  getDestination,
  updateDestination,
  ctx,
  tileWidth,
  updateMonstersLevel,
  resetMonstersLevel,
  resetSpeed,
} from './variables';
import {
  checkIfMoveAllowed,
  battle,
  getSpriteByName,
  d6,
  writeGameLog,
} from './utility';
import {
  setMonsterSpeed,
  interval,
  scrollingModifierX,
  scrollingModifierY,
  resetScrolling,
} from './index';
import { setup } from './random';

export function checkIfHeroDead(): void {
  if (heroStats.currentHP < 1) {
    writeGameLog('YOU DIED');
    resetMonstersLevel();
    setup();
    resetSpeed(2000);
    clearInterval(interval);
    setMonsterSpeed();
    heroInit();
    resetScrolling();
  }
}

export function heroInit(): void {
  heroStats.x = 1;
  heroStats.y = 1;
  heroStats.hasKey = false;
  heroStats.hasPotion = false; //not implemented.
  heroStats.facing = 'heroDown';
  heroStats.level = 1;
  heroStats.maxHP = d6(3) + 20;
  heroStats.currentHP = 6;
  heroStats.DP = d6(2);
  heroStats.SP = d6(1) + 7;
  heroStats.currentHP = heroStats.maxHP;
}

export function increaseMapLevel(): void {
  let hpGainRandomizer = Math.random() * 100 + 1;
  let originalHP = heroStats.currentHP;
  if (hpGainRandomizer <= 10) {
    heroStats.currentHP = heroStats.maxHP;
  }
  if (40 >= hpGainRandomizer && hpGainRandomizer > 10) {
    heroStats.currentHP = heroStats.currentHP + Math.floor(heroStats.maxHP / 3);
  }
  if (hpGainRandomizer > 40) {
    heroStats.currentHP =
      heroStats.currentHP + Math.floor(heroStats.maxHP / 10);
  }
  if (heroStats.currentHP > heroStats.maxHP) {
    heroStats.currentHP = heroStats.maxHP;
  }
  writeGameLog(`Your HP increased by ${heroStats.currentHP - originalHP}`);
  heroStats.x = 1;
  heroStats.y = 1;
  heroStats.hasKey = false;
  updateMonstersLevel(1);
}

export function renderHero(): void {
  ctx.drawImage(
    getSpriteByName(heroStats.facing),
    (heroStats.x - 1 - scrollingModifierX) * tileWidth,
    (heroStats.y - 1 - scrollingModifierY) * tileWidth,
    tileWidth,
    tileWidth
  );
}

export function attemptToMoveHero(): boolean {
  makeDestination();
  checkIfBattle();
  return checkIfMoveAllowed();
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
