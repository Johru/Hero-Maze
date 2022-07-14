import {
  heroDown,
  heroUp,
  heroLeft,
  heroRight,
  skeleton,
  boss,
  wallPositionList,
  getDestination,
  heroStats,
  monsterHasKey,
} from './variables';
import { Monster } from './classes';
export function d6(numberOfRolls: number): number {
  let total: number = 0;
  for (let i = 0; i < numberOfRolls; i++) {
    total += Math.floor(Math.random() * 6) + 1;
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
  if (heroStats.currentHP < 1) {return}
  while (monster.HP > 0) {
        let heroAttack: number = heroStats.SP + d6(1);
    let monsterAttack: number = monster.SP + d6(1);
    if (heroAttack > monster.DP) {
      monster.HP -= heroAttack - monster.DP;
    }
    if (monsterAttack > heroStats.DP) {
      heroStats.currentHP -= monsterAttack - heroStats.DP;
    }
  }
  monster.alive = false;
  let hpBoost: number = d6(1);
  heroStats.maxHP += hpBoost;
  heroStats.currentHP += hpBoost;
  heroStats.DP += 1;
  heroStats.SP += 2;
  heroStats.level++;
  if (monster.orderNumber == monsterHasKey) {
    heroStats.hasKey = true;
  }
}
