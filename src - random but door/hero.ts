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

  bossMonster,
  monsterLevel,
  skeleton4,
  skeleton,
  skeleton5,
  theDoor,
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
import {setMapSize, setup } from './random';

export function checkIfHeroDead(): void {
  if (heroStats.currentHP < 1) {
    writeGameLog('YOU DIED');
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
  heroStats.hasPotion = false; //not implemented.
  heroStats.facing = 'heroDown';
  heroStats.level = 1;
  heroStats.neededXP = heroXpArray[heroStats.level];
  heroStats.currentXP = 0;
  heroStats.maxHP = 15;
  heroStats.currentHP = 15;
  heroStats.DP = 3;
  heroStats.SP = 5;
  heroStats.currentHP = heroStats.maxHP;
  heroStats.overKillPoints=0;
  heroStats.overKill=false;
}

export function increaseMapLevel(): void {
    heroStats.x = 1;
  heroStats.y = 1;
  heroStats.hasKey = false;
  updateMonstersLevel(1);
  if(monsterLevel>1)monsterList.push(skeleton4);
if(monsterLevel>1)monsterList.push(skeleton5);
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
  if (blockIfDoor())return false;
  return checkIfMoveAllowed();
}

export function blockIfDoor(){
  if (!bossMonster.alive && heroStats.hasKey) return false;
  if (getDestination()[0]==theDoor.x&&getDestination()[1]==theDoor.y) return true;
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
      monster.alive&&monster.image!='door'
    ) {
      battle(monster);
    }
  }
}

export function setHeroLevel ():void{
  if (heroStats.currentXP>=heroStats.neededXP){
    heroStats.level++;
    writeGameLog('You leveled up.');
    heroStats.currentXP-=heroStats.neededXP;
    heroStats.neededXP=heroXpArray[heroStats.level];
    let hpBoost: number = d6(1);
    heroStats.maxHP += hpBoost;
  heroStats.currentHP += hpBoost;
  heroStats.DP += 1;
  heroStats.SP += 2;
  }
}
