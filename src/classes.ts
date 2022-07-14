import {} from './index'
import {d6} from './utility'
import {skeletonSetup,monsterLevel} from './variables'
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
  init(): void {
    this.x = 10;
    this.y = 10;
    this.alive = true;
    this.HP = d6(8) + 2 * monsterLevel * d6(1);
    this.DP = Math.floor((monsterLevel / 2) * d6(1));
    this.SP = monsterLevel * d6(1) + 3 * monsterLevel;
  }
}
export class Skeleton extends Monster {
  init():void {
    this.x = skeletonSetup[this.orderNumber - 1][0];
    this.y = skeletonSetup[this.orderNumber - 1][1];
    this.alive = true;
    this.HP = d6(2) * 2 * monsterLevel;
    this.DP = Math.floor((monsterLevel * d6(1)) / 2 + monsterLevel / 2);
    this.SP = monsterLevel * d6(1) + 3 * monsterLevel;
    this.image = 'skeleton';
  }
}