import { renderFloor } from './map-render';
import {
  skeletonSetup,
  wallPositionList,
  ctx,
  tileWidth,
  blood,
  wall,
  key,
  heroDown,
  heroLeft,
  heroRight,
  heroUp,
  skeleton,
  boss
} from './variables';
export const canvas = document.querySelector(
  '.main-canvas'
) as HTMLCanvasElement;
export let heroStats = {
  x: 0,
  y: 0,
  facing: 'heroDown',
  level: 1,
  maxHP: d6(3) + 20,
  currentHP: 6,
  DP: d6(2),
  SP: d6(1) + 7,
  hasKey: false,
};
//import {renderFloor} from './functions'
let destination: number[] = [];
heroStats.currentHP = heroStats.maxHP;
let monstersMove: boolean = false;
let monsterHasKey: number = 1;

export let monsterLevel: number = 1;

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
class Skeleton extends Monster {
  init() {
    this.x = skeletonSetup[this.orderNumber - 1][0];
    this.y = skeletonSetup[this.orderNumber - 1][1];
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
assignKey();
updateGameState();

for (let j = 1; j < 11; j++) {
  wallPositionList.push([j, 11]);
}
for (let j = 1; j < 11; j++) {
  wallPositionList.push([j, 0]);
}
for (let k = 1; k < 11; k++) {
  wallPositionList.push([0, k]);
}
for (let k = 1; k < 11; k++) {
  wallPositionList.push([11, k]);
}
export function d6(numberOfRolls: number): number {
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
  printstats();
  renderHero();
  renderAllMonsters();
  resetMonsterMoveTimer();
  renderHero();
  checkIfBattleForMonsters();
  checkIfHeroDead();
  checkRoundEnd();
}
function resetMonsterMoveTimer() {
  if (monstersMove) {
    monstersMove = false;
  } else {
    monstersMove = true;
  }
}
function renderAllMonsters() {
  for (let i = 0; i < monsterList.length; i++) {
    renderMonster(monsterList[i]);
  }
}

function checkRoundEnd() {
  if (bossMonster.alive == false && heroStats.hasKey) {
    heroStats.x = 0;
    heroStats.y = 0;
    heroStats.hasKey = false;
    let hpGainRandomizer = Math.random() * 100 + 1;
    console.log(hpGainRandomizer);
    if (hpGainRandomizer <= 10) {
      heroStats.currentHP = heroStats.maxHP;
      console.log('Full HP restored!');
    }
    if (40 >= hpGainRandomizer && hpGainRandomizer > 10) {
      heroStats.currentHP =
        heroStats.currentHP + Math.floor(heroStats.maxHP / 3);
      console.log('A third of HP restored!');
    }
    if (hpGainRandomizer > 40) {
      heroStats.currentHP =
        heroStats.currentHP + Math.floor(heroStats.maxHP / 10);
      console.log('A tenth of HP restored!');
    }
    if (heroStats.currentHP > heroStats.maxHP) {
      heroStats.currentHP = heroStats.maxHP;
    }
    monsterLevel++;

    for (let monster of monsterList) {
      monster.init();
    }
    assignKey();
  }
}

function assignKey() {
  monsterHasKey = Math.floor(Math.random() * 3) + 1;
  console.log(monsterHasKey);
}
function checkIfHeroDead() {
  if (heroStats.currentHP < 1) {
    window.location.reload();
  }
}
function monsterDestination(input: number, specimen: Monster) {
  switch (input) {
    case 1: //down
      destination = [specimen.x, specimen.y + 1];
      break;
    case 2: //up
      destination = [specimen.x, specimen.y - 1];
      break;
    case 3: //left
      destination = [specimen.x - 1, specimen.y];
      break;
    case 4: //right
      destination = [specimen.x + 1, specimen.y];
      break;
  }
}

function attemptToMoveMonster(specimen: Monster) {
  if (monstersMove) {
    let direction: number = 0;
    let hasMoved: boolean = false;
    let stopIfInfinite: number = 0;
    while (!hasMoved) {
      if (stopIfInfinite > 100) break;
      direction = Math.floor(Math.random() * 4) + 1;
      monsterDestination(direction, specimen);

      if (checkIfMoveAllowed() && checkOtherMonsters(specimen)) {
        specimen.x = destination[0];
        specimen.y = destination[1];
        hasMoved = true;
      }
      stopIfInfinite++;
    }
  }
}

function checkOtherMonsters(specimen: Monster) {
  for (let i = 0; i < monsterList.length; i++) {
    if (i == specimen.orderNumber) continue;
    if (
      monsterList[i].x == destination[0] &&
      monsterList[i].y == destination[1]
    ) {
      return false;
    }
  }
  return true;
}
function renderMonster(specimen: Monster) {
  if (specimen.alive) {
    attemptToMoveMonster(specimen);
    ctx.drawImage(
      getSpriteByName(specimen.image),
      (specimen.x - 1) * tileWidth,
      (specimen.y - 1) * tileWidth,
      tileWidth,
      tileWidth
    );
  } else {
    ctx.drawImage(
      blood,
      (specimen.x - 1) * tileWidth,
      (specimen.y - 1) * tileWidth,
      tileWidth,
      tileWidth
    );
  }
}
/*
export function renderFloor() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      ctx.drawImage(floor, i * tileWidth, j * tileWidth, tileWidth, tileWidth);
    }
  }
}
*/
function renderWalls() {
  for (let i: number = 0; i < wallPositionList.length - 40; i++) {
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
  if (heroStats.hasKey) {
    ctx.drawImage(key, 860, 25, 125, 52);
  }
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
  if (heroStats.hasKey) {
    ctx.fillText(`You have the key to next level!`, 660, 300);
  } else {
    ctx.fillText(`You havent found the key yet.`, 660, 300);
  }
  ctx.font = '13px Arial';
  ctx.fillText(
    `One of the Skeletons has a key. To win a level, you must find the key`,
    660,
    500
  );
  ctx.fillText(`and defeat the Boss.`, 660, 515);
  ctx.fillText(
    `Whenever you win a level, map will reset, you keep your progress `,
    660,
    530
  );
  ctx.fillText(`but the level of monsters goes up, so be careful!`, 660, 545);
  ctx.fillText(`When your HP drops to 0, you die and game restarts.`, 660, 560);
  ctx.fillText(
    `Killing Skeletons increases your hero level, use them to get stronger early on.`,
    660,
    575
  );
  ctx.fillText(`Winning a level has a chance to restore your HP.`, 660, 590);
}
function attemptToMoveHero() {
  makeDestination();
  checkIfBattle();
  return checkIfMoveAllowed();
}
function checkIfMoveAllowed() {
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
  if (monster.orderNumber == monsterHasKey) {
    heroStats.hasKey = true;
  }
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

function checkIfBattleForMonsters() {
  for (let monster of monsterList) {
    if (
      heroStats.x + 1 == monster.x &&
      heroStats.y + 1 == monster.y &&
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
  ctx.drawImage(
    getSpriteByName(heroStats.facing),
    heroStats.x * tileWidth,
    heroStats.y * tileWidth,
    tileWidth,
    tileWidth
  );
}
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}



function getSpriteByName(name: string) {
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
}
document.addEventListener('keydown', function (keyHit) {
  switch (keyHit.key) {
    case 'ArrowDown':
      heroStats.facing = 'heroDown';
      if (attemptToMoveHero()) {
        heroStats.y++;
      }
      updateGameState();
      break;
    case 'ArrowUp':
      heroStats.facing = 'heroUp';
      if (attemptToMoveHero()) {
        heroStats.y--;
      }
      updateGameState();
      break;
    case 'ArrowLeft':
      heroStats.facing = 'heroLeft';
      if (attemptToMoveHero()) {
        heroStats.x--;
      }
      updateGameState();
      break;
    case 'ArrowRight':
      heroStats.facing = 'heroRight';
      if (attemptToMoveHero()) {
        heroStats.x++;
      }
      updateGameState();
      break;
  }
});
