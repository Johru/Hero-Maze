import {
  monsterList,
  tileWidth,
  ctx,
  blood,
  updateDestination,
  getDestination,
  heroStats,
  witchList,
  greenChestList,
  redChestList,
  monsterLevel,
  wallPositionList,
} from './variables';
import { getSpriteByName, checkIfMoveAllowed, battle } from './utility';
import { Monster } from './classes';
import {
  escapedown,
  scrollingModifierX,
  scrollingModifierY,
  spacedown,
} from './index';
import { greenPotionsTotal, redPotionsTotal } from './mapgeneration';
import { paintPath } from './map-render';
export let pathToPaint: number[][] = [];
// import cloneDeep from 'lodash.clonedeep';
export let unblocked = false;

export function renderAllMonsters(): void {
  for (let i = 0; i < monsterList.length; i++) {
    renderMonster(monsterList[i]);
  }
}
export function renderMonster(specimen: Monster): void {
  if (
    specimen.alive &&
    specimen.x - scrollingModifierX <= 10 &&
    specimen.y - scrollingModifierY <= 10
  ) {
    ctx.drawImage(
      getSpriteByName(specimen.image),
      (specimen.x - 1 - scrollingModifierX) * tileWidth,
      (specimen.y - 1 - scrollingModifierY) * tileWidth,
      tileWidth,
      tileWidth
    );
  } else if (
    specimen.x - scrollingModifierX <= 10 &&
    specimen.y - scrollingModifierY <= 10
  ) {
    ctx.drawImage(
      blood,
      (specimen.x - 1 - scrollingModifierX) * tileWidth,
      (specimen.y - 1 - scrollingModifierY) * tileWidth,
      tileWidth,
      tileWidth
    );
  }
}

export function resetMonsters() {
  for (let monster of monsterList) {
    monster.init();
  }
  let swordChest: number;
  let greenChestKey: number = Math.floor(
    Math.random() * (greenChestList.length - 1)
  );
  let redChestKey: number = Math.floor(
    Math.random() * (redChestList.length - 1)
  );
  if (monsterLevel == 3) {
    swordChest = Math.floor(Math.random() * (redChestList.length - 1));
    console.log(`gigachad sword in chest ${swordChest}`);
  }
  let greenChestPotion: number = greenPotionsTotal[monsterLevel - 1];
  let redChestPotion: number = redPotionsTotal[monsterLevel - 1];
  for (let chest of greenChestList) {
    if (chest.orderNumber == greenChestKey) {
      chest.hasKey = true;
    } else if (greenChestPotion > 0) {
      chest.hasPotion = true;
      greenChestPotion--;
    } else {
      chest.gold = 50;
    }
  }
  for (let chest of redChestList) {
    if (chest.orderNumber == swordChest) {
      chest.hasSword = true;
    }
    if (chest.orderNumber == redChestKey) {
      chest.hasKey = true;
    } else if (redChestPotion > 0) {
      chest.hasPotion = true;
      redChestPotion--;
    } else {
      chest.gold = 50;
    }
  }
}

export function iterateList(input: any): void {
  for (let specimen of monsterList) {
    input(specimen);
  }
}

export const losArray: number[][] = [];

export function checkLineOfSight() {
  losArray.length = 0;
  let x1 = 5;
  let y1 = 5;
  let x0 = heroStats.x;
  let y0 = heroStats.y;
  let sx = x0 < x1 ? 1 : -1;
  let sy = y0 < y1 ? 1 : -1;

  let dx = Math.abs(x1 - x0);
  let dy = Math.abs(y1 - y0);

  let err = (dx > dy ? dx : -dy) / 2;

  let break50 = 0;
  while (true) {
    if (x0 === x1 && y0 === y1) {
      break;
    }
    if (err > -dx) {
      err -= dy;
      x0 += sx;
    }
    if (x0 === x1 && y0 === y1) {
      break;
    }
    if (err > -dx) losArray.push([x0, y0]);
    if (err < dy) {
      err += dx;
      y0 += sy;
    }
    if (x0 === x1 && y0 === y1) {
      break;
    }

    losArray.push([x0, y0]);
    break50++;
  }
  unblocked = true;

  for (let i = 0; i < losArray.length; i++) {
    if (!isLOSunblocked(losArray[i][0], losArray[i][1])) unblocked = false;
  }

  if (unblocked) paintPathToHero();
}

export function paintPathToHero() {
  pathToPaint = findShortestPath(5, 5, heroStats.x, heroStats.y);
}

interface Node {
  thisNodeX: number;
  thisNodeY: number;
  fScore: number;
  gScore: number;
  prevNode: number[];
}

export function findShortestPath(
  startX: number,
  startY: number,
  targetX: number,
  targetY: number
) {
  console.log(
    `Attempting to find path from (${startX + ',' + startY}) to (${
      targetX + ',' + targetY
    })`
  );

  let currentNode: Node = {
    thisNodeX: startX,
    thisNodeY: startY,
    fScore: 999,
    gScore: 0,
    prevNode: [],
  };

  let openList: Node[] = [];
  let closedList: Node[] = [];
  let exploreList: number[][] = [];

  openList.push(currentNode);

  // loop1: for (let j = 0; j < 15; j++) {
  loop1: while (openList.length > 0) {
    exploreList.length = 0;

    exploreList = [
      [currentNode.thisNodeX, currentNode.thisNodeY - 1],
      [currentNode.thisNodeX + 1, currentNode.thisNodeY],
      [currentNode.thisNodeX, currentNode.thisNodeY + 1],
      [currentNode.thisNodeX - 1, currentNode.thisNodeY],
    ];

    loop2: for (let i = 0; i < 4; i++) {
      if (isWall(exploreList[i][0], exploreList[i][1])) {
        continue loop2;
      }

      if (isOnClosedList(exploreList[i][0], exploreList[i][1])) {
        continue loop2;
      }

      if (isOnOpenList(exploreList[i][0], exploreList[i][1])) {
        continue loop2;
      }

      let fX = exploreList[i][0] - targetX;
      let fY = exploreList[i][1] - targetY;
      let gScore = currentNode.gScore + 1;
      let fScore = Math.sqrt(fX * fX + fY * fY) + gScore;

      let newNode = {
        thisNodeX: exploreList[i][0],
        thisNodeY: exploreList[i][1],
        fScore: fScore,
        gScore: gScore,
        prevNode: [currentNode.thisNodeX, currentNode.thisNodeY],
      };
      openList.push(newNode);
    }

    openList.sort((a, b) => (a.fScore < b.fScore ? -1 : 1));

    let clone = JSON.parse(JSON.stringify(currentNode));
    closedList.push(clone);

    currentNode = JSON.parse(JSON.stringify(openList[0]));

    openList.shift();

    if (currentNode.thisNodeX == targetX && currentNode.thisNodeY == targetY) {
      let shortestPath: number[][] = [];
      let current = [currentNode.thisNodeX, currentNode.thisNodeY];
      shortestPath.push(current);

      let previous = closedList.find(
        element =>
          element.thisNodeX == currentNode.prevNode[0] &&
          element.thisNodeY == currentNode.prevNode[1]
      );

      for (let i = 0; i < currentNode.gScore; i++) {
        shortestPath.push([previous.thisNodeX, previous.thisNodeY]);
        let previous2 = closedList.find(
          element =>
            element.thisNodeX == previous.prevNode[0] &&
            element.thisNodeY == previous.prevNode[1]
        );
        previous = previous2;
      }
      console.log(...shortestPath);
      return shortestPath.reverse();
      break loop1;
    }
  }

  function isOnOpenList(x: number, y: number) {
    for (let node of openList) {
      if (node.thisNodeX == x && node.thisNodeY == y) return true;
    }

    return false;
  }

  function isOnClosedList(x: number, y: number) {
    for (let node of closedList) {
      if (node.thisNodeX == x && node.thisNodeY == y) return true;
    }

    return false;
  }

  function isWall(x: number, y: number) {
    for (let i = 0; i < wallPositionList.length; i++) {
      if (x == wallPositionList[i][0] && y == wallPositionList[i][1])
        return true;
    }
    return false;
  }
}

export function isLOSunblocked(x: number, y: number): boolean {
  for (let i = 0; i < wallPositionList.length; i++) {
    if (x == wallPositionList[i][0] && y == wallPositionList[i][1]) {
      return false;
    }
  }
  return true;
}

export function attemptToMoveMonster(specimen: Monster): void {
  if (escapedown) return;
  if (specimen.alive && specimen.speed > 0) {
    let direction: number = 0;
    let hasMoved: boolean = false;
    let stopIfInfinite: number = 0;
    while (!hasMoved) {
      if (stopIfInfinite > 100) break;
      direction = Math.floor(Math.random() * 4) + 1;
      monsterDestination(direction, specimen);

      if (
        checkIfMoveAllowed() &&
        checkOtherMonsters(specimen) &&
        specimen.image != 'door'
      ) {
        specimen.x = getDestination()[0];
        specimen.y = getDestination()[1];
        hasMoved = true;
      }
      stopIfInfinite++;
      //}
    }
  }
}

function monsterDestination(input: number, specimen: Monster) {
  switch (input) {
    case 1: //down
      updateDestination(specimen.x, specimen.y + 1);
      break;
    case 2: //up
      updateDestination(specimen.x, specimen.y - 1);
      break;
    case 3: //left
      updateDestination(specimen.x - 1, specimen.y);
      break;
    case 4: //right
      updateDestination(specimen.x + 1, specimen.y);
      break;
  }
}

function checkOtherMonsters(specimen: Monster) {
  for (let i = 0; i < monsterList.length; i++) {
    if (i == specimen.orderNumber) continue;
    if (
      monsterList[i].x == getDestination()[0] &&
      monsterList[i].y == getDestination()[1]
    ) {
      return false;
    }
  }
  return true;
}

export function assignKey(): void {
  let witchNumber: number = Math.floor(Math.random() * (witchList.length - 1));
  for (let witsch of witchList) {
    if (witsch.orderNumber == witchNumber) {
      witsch.hasKey = true;
    } else {
      witsch.hasKey = false;
    }
  }
}

export function checkIfBattleForMonsters(): void {
  for (let monster of monsterList) {
    if (
      heroStats.x == monster.x &&
      heroStats.y == monster.y &&
      monster.alive &&
      monster.speed > 0
    ) {
      battle(monster);
    }
  }
}
