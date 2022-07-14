import {wallPositionList,monsterList} from './variables'
import {assignKey} from './monster'

export function setup ():void{
pushBoundariesToWallList();
assignKey();
for (let monster of monsterList) {
  monster.init();
}
}

export function pushBoundariesToWallList():void{
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
  }

  

  