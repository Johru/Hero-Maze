import {} from './index';
import { d6 } from './utility';
import { checkIfAlreadyFloor } from './random';
import { skeletonSetup, monsterLevel } from './variables';
export class Monster {
  orderNumber: number;
  x: number;
  y: number;
  image: string;
  HP: number;
  DP: number;
  SP: number;
  alive: boolean;
  hasKey: boolean;
  constructor(
    order: number,
    x: number = 0,
    y: number = 0,
    image: string = 'boss',
    hp: number = 0,
    DP: number = 0,
    SP: number = 0,
    alive: boolean = true
  ) {
    this.orderNumber = order;
    this.x = x;
    this.y = y;
    this.image = image;
    this.HP = hp;
    this.DP = DP;
    this.SP = SP;
    this.alive = alive;
  }
  pickASpot(x: number, y: number) {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (!checkIfAlreadyFloor(x - j, y - i)) {
          this.x = x - j;
          this.y = y - i;
          console.log(
            `${this.image}${this.orderNumber} placed at ${this.x}, ${this.y}`
          );
          return;
        }
        console.log(
          `${this.image}${this.orderNumber} not placed at ${x - j}, ${y - i}`
        );
      }
    }
    console.log(
      `${this.image}${this.orderNumber} incorrectly placed, ${this.x}, ${this.y}`
    );
    return;
  }
  init(): void {
    this.pickASpot(10, 10);
    this.alive = true;
    this.HP = d6(5) + 2 * monsterLevel * d6(1);
    this.DP = Math.floor(monsterLevel * d6(1));
    this.SP = monsterLevel * d6(1) + monsterLevel;
  }
}
export class Skeleton extends Monster {
  init(): void {
    this.image = 'skeleton';
    this.pickASpot(
      skeletonSetup[this.orderNumber - 1][0],
      skeletonSetup[this.orderNumber - 1][1]
    );
    this.alive = true;
    this.HP = d6(2) * 2 * monsterLevel;
    this.DP = Math.floor((monsterLevel * d6(1)) / 2 + monsterLevel / 2);
    this.SP = monsterLevel * d6(1) + 3 * monsterLevel;
  }
}
