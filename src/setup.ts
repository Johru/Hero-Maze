import { assignKey, resetMonsters } from './monster';
import { heroInit } from './hero';
import { emptyMapLists, monsterLevel, wallPositionList} from './variables';
import { instantiateSetupArrays, wallSetup } from './mapgeneration';
export let floorList: number[] = [1, 1];

export let mapSize: number = 10;


export function setup(): void {
  emptyMapLists();
  instantiateSetupArrays();
   adjustWalls();
  pushBoundariesToWallList();
  heroInit();
  resetMonsters();
  assignKey();
  
}

export function adjustWalls(): void {
  for (let i = 0; i <wallSetup[monsterLevel-1].length; i+=2) {
   wallPositionList.push([wallSetup[monsterLevel-1][i],wallSetup[monsterLevel-1][i+1]])
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


