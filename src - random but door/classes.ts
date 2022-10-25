import {} from './index';
import { checkIfNotFloor, mapSize } from './random';
import { skeletonSetup,} from './variables';
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
    x: number = 1,
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
  pickASpot(x: number, y: number):void {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (!checkIfNotFloor(x - j, y - i)) {
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
    this.HP = 15;
    this.DP = 4;
    this.SP = 6;
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
    this.HP = 10;
    this.DP = 1;
    this.SP = 2;
  }
}
export class Door extends Monster {
  init(): void {
    this.image = 'door';
    this.pickASpot(
      mapSize,
      mapSize
    );
    this.alive = true;
    this.HP = 0;
    this.DP = 0;
    this.SP = 0;
  }
}
