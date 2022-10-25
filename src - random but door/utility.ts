import {
  heroDown,
  heroUp,
  heroLeft,
  heroRight,
  skeleton,
  boss,
  getDestination,
  heroStats,
  monsterHasKey,
  door,
} from './variables';
import { Monster } from './classes';
import { wallPositionList } from './random';
export function d6(numberOfRolls: number): number {
  let total: number = 0;
  for (let i = 0; i < numberOfRolls; i++) {
    total += Math.floor(Math.random() * 6) + 1;
  }
  return total;
}
export function d3(numberOfRolls: number): number {
  let total: number = 0;
  for (let i = 0; i < numberOfRolls; i++) {
    total += Math.floor(Math.random() * 3) + 1;
  }
  return total;
}
export function getSpriteByName(name: string): HTMLImageElement {
  switch (name) {
    case 'heroDown':
      return heroDown;
    case 'heroUp':
      return heroUp;
    case 'heroLeft':
      return heroLeft;
    case 'heroRight':
      return heroRight;
    case 'skeleton':
      return skeleton;
      case 'boss':
        return boss;
        case 'door':
      return door;
  }
  return heroDown;
}
export function checkIfMoveAllowed(): boolean {
  for (let i = 0; i < wallPositionList.length; i++) {
    if (
      getDestination()[0] == wallPositionList[i][0] &&
      getDestination()[1] == wallPositionList[i][1]
    )
      return false;
  }
  return true;
}

export function battle(monster: Monster): void {
  if (heroStats.currentHP < 1) return;
  let stopIfInfinite: number = 0;
  let overKillUsed = false;
  let xpGain=0;
  while (monster.HP > 0 && stopIfInfinite < 10000) {
    let heroAttack: number = heroStats.SP + d3(1);
    if (heroStats.overKill == true) {
      heroAttack += heroStats.overKillPoints;
      heroStats.overKill = false;
      overKillUsed = true;
    }
    let monsterAttack: number = monster.SP + d3(1);
    if (heroAttack > monster.DP) {
      monster.HP -= heroAttack - monster.DP;
    }
    if (monsterAttack > heroStats.DP) {
      heroStats.currentHP -= monsterAttack - heroStats.DP;
    }
    if (monster.HP < 0) heroStats.overKillPoints += -1 * monster.HP;
    if (overKillUsed) heroStats.overKillPoints = 0;

    stopIfInfinite++;
  }
  monster.alive = false;
  if(heroStats.currentHP>0){
    if (monster.image=='skeleton')xpGain=1;
if (monster.image=='boss')xpGain=3;
  if (monster.orderNumber == monsterHasKey) {
    heroStats.hasKey = true;
    writeGameLog(`You killed a ${monster.image} and obtained the Key!.`);
  } else {
    writeGameLog(`You killed a ${monster.image}.`);
  }
  }
heroStats.currentXP+=xpGain;
  stopIfInfinite = 0;
}
export let gameLog: string[] = [];

export function writeGameLog(newLline: string): void {
  gameLog.slice(9, 1);
  for (let i = 9; i > 0; i--) {
    gameLog.splice(i, 1, gameLog[i - 1]);
  }
  gameLog[0] = newLline;
}
