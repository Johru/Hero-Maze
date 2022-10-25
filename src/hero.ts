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
  heroXpArray,
  doorList,
  chestList,
} from './variables';
import {
  checkIfMoveAllowed,
  battle,
  getSpriteByName,
  d6,
  writeGameLog,
  gameLog,
} from './utility';
import {
  setMonsterSpeed,
  interval,
  scrollingModifierX,
  scrollingModifierY,
  resetScrolling,
  escapedown,
} from './index';
import { setMapSize, setup } from './setup';
import { Monster } from './classes';

export function checkIfHeroDead(): void {
  if (heroStats.currentHP < 1) {
    let deaths = localStorage.getItem('deaths');
    if (deaths === undefined || deaths === null) deaths = '0';
    let deathCount = parseInt(deaths!);
    deathCount++;
    localStorage.setItem('deaths', deathCount.toString());
    writeGameLog('YOU DIED');
    writeGameLog(`Deaths so far: ${localStorage.getItem('deaths')}`);
    resetMonstersLevel();
    setMapSize();
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
  heroStats.hasGreenKey = false;
  heroStats.hasRedKey = false;
  heroStats.hasSword = false;
  heroStats.hasPotion = 0; //not implemented.
  heroStats.facing = 'heroDown';
  heroStats.level = 1;
  heroStats.gold = 0;
  heroStats.neededXP = heroXpArray[heroStats.level];
  heroStats.currentXP = 0;
  heroStats.maxHP = 20;
  heroStats.currentHP = 20;
  heroStats.DP = 3;
  heroStats.SP = 5;
  heroStats.currentHP = heroStats.maxHP;
  heroStats.overKillPoints = 0;
  heroStats.overKill = false;
}

export function increaseMapLevel(): void {
  heroStats.x = 1;
  heroStats.y = 1;
  heroStats.hasKey = false;
  heroStats.hasGreenKey = false;
  heroStats.hasRedKey = false;
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
  if (escapedown) return;
  makeDestination();
  checkIfBattle();
  if (blockIfDoor()) return false;
  checkChest();
  return checkIfMoveAllowed();
}

export function blockIfDoor() {
  for (let i = 0; i < doorList.length; i++) {
    if (
      getDestination()[0] == doorList[i].x &&
      getDestination()[1] == doorList[i].y
    ) {
      if (checkDoorColor(doorList[i])) {
        return true;
      }
    }
  }
  return false;
}

export function checkChest() {
  for (let chest of chestList) {
    if (getDestination()[0] == chest.x && getDestination()[1] == chest.y) {
      if (chest.hasKey && chest.image == 'greenChest') {
        heroStats.hasGreenKey = true;
        writeGameLog('You obtained the green key.');
      }
      if (chest.hasSword) {
        heroStats.hasSword = true;
        chest.hasSword = false;
        heroStats.SP += 5;

        writeGameLog('You obtained the legendary Gigachad Sword.');
      }
      if (chest.hasKey && chest.image == 'redChest') {
        heroStats.hasRedKey = true;
        writeGameLog('You obtained the red key.');
      }
      if (chest.hasPotion) {
        heroStats.hasPotion++;
        writeGameLog('You found a potion.');
        chest.hasPotion = false;
      }
      if (chest.gold > 0) {
        heroStats.gold += chest.gold;
        chest.gold = 0;
        writeGameLog('You found 50 gold.');
      }
      if (chest.image == 'greenChest') {
        chest.image = 'greenChestOpen';
      }
      if (chest.image == 'redChest') {
        chest.image = 'redChestOpen';
      }
    }
  }
}

export function checkDoorColor(door: Monster) {
  switch (door.image) {
    case 'door':
      if (heroStats.hasKey) {
        return false;
      } else {
        writeGameLog("You don't have the Key!");
        return true;
      }
    case 'greenDoor':
      if (heroStats.hasGreenKey) return false;
      else {
        writeGameLog("You don't have green key!");
        return true;
      }
    case 'redDoor':
      if (heroStats.hasRedKey) {
        return false;
      } else {
        writeGameLog("You don't have red key!");
        return true;
      }
    default:
  }
  console.log('door type not recognized');
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
      monster.alive &&
      monster.speed > 0
    ) {
      battle(monster);
    }
  }
}

export function setHeroLevel(): void {
  if (heroStats.currentXP >= heroStats.neededXP) {
    heroStats.level++;
    writeGameLog('You leveled up.');
    heroStats.currentXP -= heroStats.neededXP;
    heroStats.neededXP = heroXpArray[heroStats.level];
    let hpBoost: number = d6(1);
    heroStats.maxHP += hpBoost;
    heroStats.currentHP += hpBoost;
    heroStats.DP += 1;
    heroStats.SP += 2;
  }
}
