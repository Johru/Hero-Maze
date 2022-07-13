import { inherits } from 'util';

//import {renderFloor} from './functions'
let destination: number[] = [];
const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
let skeleton = document.getElementById('skeleton') as HTMLImageElement;
let heroUp = document.getElementById('hero-up') as HTMLImageElement;
let heroDown = document.getElementById('hero-down') as HTMLImageElement;
let heroLeft = document.getElementById('hero-left') as HTMLImageElement;
let heroRight = document.getElementById('hero-right') as HTMLImageElement;
let floor = document.getElementById('floor') as HTMLImageElement;
let wall = document.getElementById('wall') as HTMLImageElement;
let boss = document.getElementById('boss') as HTMLImageElement;
let tileWidth: number = 65;
let monsterLevel: number = 1;
let heroStats = {
  x: 0,
  y: 0,
  facing: 'heroDown',
  level: 1,
  maxHP: d6(3) + 20,
  currentHP: 6,
  DP: d6(2),
  SP: d6(1) + 7,
};
let skeletonSetup = {
  1: [5, 4],
  2: [10, 1],
  3: [5, 8],
};
heroStats.currentHP = heroStats.maxHP;
class Monster {
  orderNumber: number;
  x: number;
  y: number;
  image: string;
  HP: number;
  DP: number;
  SP: number;
  alive: boolean;
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
  init() {
    this.x = 10;
    this.y = 10;
    this.alive = true;
    this.HP = d6(8) + 2 * monsterLevel * d6(1);
    this.DP = Math.floor((monsterLevel / 2) * d6(1));
    this.SP = monsterLevel * d6(1) + 3 * monsterLevel;
  }
}
class Skeleton extends Monster {
  init() {
    this.x = skeletonSetup[this.orderNumber][0];
    this.y = skeletonSetup[this.orderNumber][1];
    this.alive = true;
    this.HP = d6(2) * 2 * monsterLevel;
    this.DP = Math.floor((monsterLevel * d6(1)) / 2 + monsterLevel / 2);
    this.SP = monsterLevel * d6(1) + 3 * monsterLevel;
    this.image = 'skeleton';
  }
}
let bossMonster: Monster = new Monster(0);
let skeleton1: Monster = new Skeleton(1);
let skeleton2: Monster = new Skeleton(2);
let skeleton3: Monster = new Skeleton(3);
let monsterList: Monster[] = [];
monsterList.push(bossMonster);
monsterList.push(skeleton1);
monsterList.push(skeleton2);
monsterList.push(skeleton3);
for (let monster of monsterList) {
  monster.init();
}
let wallPositionList: number[][] = [
  [4, 1],
  [4, 2],
  [4, 3],
  [3, 3],
  [2, 3],
  [1, 5],
  [2, 5],
  [3, 5],
  [4, 5],
  [2, 6],
  [2, 7],
  [4, 6],
  [4, 7],
  [6, 2],
  [6, 3],
  [6, 4],
  [6, 5],
  [7, 5],
  [8, 5],
  [9, 5],
  [8, 2],
  [9, 2],
  [8, 3],
  [9, 3],
  [6, 7],
  [6, 8],
  [7, 7],
  [7, 8],
  [4, 10],
  [2, 9],
  [3, 9],
  [4, 9],
  [6, 10],
  [7, 10],
  [9, 7],
  [9, 8],
  [9, 9],
];
function d6(numberOfRolls: number) {
  let total: number = 0;
  for (let i = 0; i < numberOfRolls; i++) {
    total += Math.floor(Math.random() * 6) + 1;
  }
  return total;
}
function updateGameState() {
  clearCanvas();
  renderFloor();
  renderWalls();
  renderHero();
  printstats();
  for (let i = 0; i < monsterList.length; i++) {
    renderMonster(monsterList[i]);
  }
  checkIfHeroDead();
  checkRoundEnd();
}

function checkRoundEnd() {
  if (bossMonster.alive == false) {
    heroStats.x = 0;
    heroStats.y = 0;
    let hpGainRandomizer = Math.random() * 101;
    console.log(hpGainRandomizer);
    if (hpGainRandomizer <= 10) {
      heroStats.currentHP = heroStats.maxHP;
      console.log('Full HP restored!');
    }
    if (40 >= hpGainRandomizer && hpGainRandomizer > 10) {
      heroStats.currentHP = heroStats.currentHP+Math.floor(heroStats.maxHP / 3);
      console.log('A third of HP restored!');
    }
    if (hpGainRandomizer > 40) {
      heroStats.currentHP =heroStats.currentHP+ Math.floor(heroStats.maxHP / 10);
      console.log('A tenth of HP restored!');
    }
    monsterLevel++;
    for (let monster of monsterList) {
      monster.init();
    }
  }
}
function checkIfHeroDead() {
  if (heroStats.currentHP < 1) {
    window.location.reload();
  }
}
function renderMonster(type: Monster) {
  if (type.alive) {
    ctx.drawImage(
      eval(type.image),
      (type.x - 1) * tileWidth,
      (type.y - 1) * tileWidth,
      tileWidth,
      tileWidth
    );
  }
}

export function renderFloor() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      ctx.drawImage(floor, i * tileWidth, j * tileWidth, tileWidth, tileWidth);
    }
  }
}

function renderWalls() {
  for (let i: number = 0; i < wallPositionList.length; i++) {
    renderWallTile(wallPositionList[i][0] - 1, wallPositionList[i][1] - 1);
  }
}
function renderWallTile(xPosition: number, yPosition: number) {
  ctx.drawImage(
    wall,
    xPosition * tileWidth,
    yPosition * tileWidth,
    tileWidth,
    tileWidth
  );
}
function printstats() {
  ctx.font = '20px Arial';
  ctx.fillText('Stats:', 660, 25);
  ctx.fillText(`Hero Level: ${heroStats.level}`, 660, 50);
  ctx.fillText(
    `HP:         ${heroStats.currentHP}/${heroStats.maxHP}`,
    660,
    75
  );
  ctx.fillText(`DP:         ${heroStats.DP}`, 660, 100);
  ctx.fillText(`SP:         ${heroStats.SP}`, 660, 125);
  ctx.fillText(`Monster Level:${monsterLevel}`, 660, 175);
  if (bossMonster.alive) {
    ctx.fillText(`Boss is still alive!`, 660, 200);
  } else {
    ctx.fillText(`Boss is dead. Congrats.`, 660, 200);
  }
  ctx.fillText(`HP:       ${bossMonster.HP}`, 660, 225);
  ctx.fillText(`DP:       ${bossMonster.DP}`, 660, 250);
  ctx.fillText(`SP:       ${bossMonster.SP}`, 660, 275);
  ctx.fillText(`You havent found the key yet.`, 660, 300);
}
function checkIfMoveAllowed() {
  makeDestination();
  checkIfBattle();
  for (let i = 0; i < wallPositionList.length; i++) {
    if (
      destination[0] == wallPositionList[i][0] &&
      destination[1] == wallPositionList[i][1]
    )
      return false;
  }
  return true;
}
function battle(monster: Monster) {
  while (monster.HP > 0) {
    if (heroStats.currentHP < 1) {
      return alert('You died!');
    }
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
  heroStats.SP += 1;
  heroStats.level++;
}
function checkIfBattle() {
  for (let monster of monsterList) {
    if (
      destination[0] == monster.x &&
      destination[1] == monster.y &&
      monster.alive
    ) {
      battle(monster);
    }
  }
}
function makeDestination() {
  if (heroStats.facing == 'heroDown')
    return (destination = [heroStats.x + 1, heroStats.y + 2]);
  if (heroStats.facing == 'heroUp')
    return (destination = [heroStats.x + 1, heroStats.y]);
  if (heroStats.facing == 'heroLeft')
    return (destination = [heroStats.x, heroStats.y + 1]);
  if (heroStats.facing == 'heroRight')
    return (destination = [heroStats.x + 2, heroStats.y + 1]);
}
function renderHero() {
  if (heroStats.x < 0) {
    heroStats.x = 0;
  }
  if (heroStats.y < 0) {
    heroStats.y = 0;
  }
  if (heroStats.x > 9) {
    heroStats.x = 9;
  }
  if (heroStats.y > 9) {
    heroStats.y = 9;
  }

  ctx.drawImage(
    eval(heroStats.facing),
    heroStats.x * tileWidth,
    heroStats.y * tileWidth,
    tileWidth,
    tileWidth
  );
}
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

updateGameState();

document.addEventListener('keydown', function (keyHit) {
  switch (keyHit.key) {
    case 'ArrowDown':
      heroStats.facing = 'heroDown';
      if (checkIfMoveAllowed()) {
        heroStats.y++;
      }
      updateGameState();
      break;
    case 'ArrowUp':
      heroStats.facing = 'heroUp';
      if (checkIfMoveAllowed()) {
        heroStats.y--;
      }
      updateGameState();
      break;
    case 'ArrowLeft':
      heroStats.facing = 'heroLeft';
      if (checkIfMoveAllowed()) {
        heroStats.x--;
      }
      updateGameState();
      break;
    case 'ArrowRight':
      heroStats.facing = 'heroRight';
      if (checkIfMoveAllowed()) {
        heroStats.x++;
      }
      updateGameState();
      break;
  }
});
