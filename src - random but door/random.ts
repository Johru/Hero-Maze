import { assignKey, resetMonsters } from './monster';
import { heroInit } from './hero';
import { monsterLevel } from './variables';
export let floorList: number[] = [1, 1];
export let wallPositionList: number[][] = [];
export let mapSize: number = 10;
let currentX: number = 1;
let currentY: number = 1;
let direction: number = 0;
let canMove: boolean = false;
let stopIfInfinite: number = 0;
let targetX: number = 1;
let targetY: number = 1;
let adjacentX: number = 0;
let adjacentY: number = 0;
export function emptyMapLists(): void {
  wallPositionList = [];
  floorList = [1, 1];
  currentX = 1;
  currentY = 1;
  targetX = 1;
  targetY = 1;
}
export function setup(): void {
  emptyMapLists();
  randomizeFloor();
  adjustWalls();
  pushBoundariesToWallList();
  heroInit();
  resetMonsters();
  assignKey();
  
}
export function randomizeFloor(): void {
  let retraceChecker = 0;
  while (floorList.length < (mapSize * mapSize * 5) / 4) {
    if (stopIfInfinite > 100000) {
      console.log('infinite loop stopped at 100 000');
      break;
    }
    direction = Math.floor(Math.random() * 4) + 1;
    setTarget(direction);
    if (!checkIfNotFloor(targetX, targetY)) {
      retraceChecker++;
      currentX = targetX;
      currentY = targetY;
      stopIfInfinite++;
      continue;
    }
    innerloop: for (let i = 1; i < 5; i++) {
      setAdjacent(i);
      if (!checkAdjacent()) {
        canMove = false;
        resetAdjacent();
        targetX = currentX;
        targetY = currentY;
        break innerloop;
      }
      resetAdjacent();
      canMove = true;
    }
    if (canMove) {
      currentX = targetX;
      currentY = targetY;

      if (checkIfNotFloor(currentX, currentY)) {
        floorList.push(currentX);
        floorList.push(currentY);
      }
    }
    stopIfInfinite++;
  }
  console.log(`${retraceChecker} times going back on existing floor, not placing new.`);
  console.log(`${stopIfInfinite-retraceChecker} attempts to place a new tile.`);
  console.log(
    `${stopIfInfinite} moves in total were needed to place floor tiles.`
  );
  stopIfInfinite = 0;
}

function setAdjacent(input: number) {
  switch (input) {
    case 1: //down
      return adjacentY++;
    case 2: //up
      return adjacentY--;
    case 3: //left
      return adjacentX++;
    case 4: //right
      return adjacentX--;
  }
}
function resetAdjacent() {
  adjacentX = targetX;
  adjacentY = targetY;
}
function checkAdjacent() {
  if (!(adjacentX == currentX && adjacentY == currentY)) {
    return checkIfNotFloor(adjacentX, adjacentY);
  }

  return true;
}

export function adjustWalls(): void {
  for (let y = 1; y <= mapSize; y++) {
    for (let x = 1; x <= mapSize; x++) {
      targetX = x;
      targetY = y;
      if (checkIfNotFloor(targetX, targetY)) {
        wallPositionList.push([x, y]);
      }
    }
  }
}

export function checkIfNotFloor(x: number, y: number): boolean {
  for (let j = 0; j < floorList.length; j += 2) {
    if (x == floorList[j] && y == floorList[j + 1]) return false;
  }
  return true;
}

function setTarget(input: number) {
  switch (input) {
    case 1: //down
      if (targetY < mapSize) {
        targetY++;
      }
      break;
    case 2: //up
      if (targetY > 1) {
        targetY--;
      }
      break;
    case 3: //left
      if (targetX > 1) {
        targetX--;
      }
      break;
    case 4: //right
      if (targetX < mapSize) {
        targetX++;
      }
      break;
  }
}

export function pushBoundariesToWallList(): void {
  for (let j = 1; j < mapSize + 1; j++) {
    wallPositionList.push([j, mapSize + 1]);
  }
  for (let j = 1; j < mapSize + 1; j++) {
    wallPositionList.push([j, 0]);
  }
  for (let k = 1; k < mapSize + 1; k++) {
    wallPositionList.push([0, k]);
  }
  for (let k = 1; k < mapSize + 1; k++) {
    wallPositionList.push([mapSize + 1, k]);
  }
}

export function setMapSize() :void{
  mapSize = 5 + monsterLevel * 5;
}


