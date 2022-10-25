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
} from './variables';
import { getSpriteByName, checkIfMoveAllowed, battle } from './utility';
import { Monster } from './classes';
import { escapedown, scrollingModifierX, scrollingModifierY, spacedown } from './index';
import { greenPotionsTotal, redPotionsTotal } from './mapgeneration';

export function renderAllMonsters(): void {
  for (let i = 0; i < monsterList.length; i++) {
    renderMonster(monsterList[i]);
  }
}
export function renderMonster(specimen: Monster): void {
  if (specimen.alive&&specimen.x-scrollingModifierX<=10&&specimen.y-scrollingModifierY<=10) {
    ctx.drawImage(
      getSpriteByName(specimen.image),
      (specimen.x - 1-scrollingModifierX) * tileWidth,
      (specimen.y - 1-scrollingModifierY) * tileWidth,
      tileWidth,
      tileWidth
    );
  } else if(specimen.x-scrollingModifierX<=10&&specimen.y-scrollingModifierY<=10) {
    ctx.drawImage(
      blood,
      (specimen.x - 1-scrollingModifierX) * tileWidth,
      (specimen.y - 1-scrollingModifierY) * tileWidth,
      tileWidth,
      tileWidth
    );
 }
}

export function resetMonsters() {
  for (let monster of monsterList) {
    monster.init();
  }
let swordChest:number;
  let greenChestKey:number=(Math.floor(Math.random() * (greenChestList.length-1)));
  let redChestKey:number=(Math.floor(Math.random() * (redChestList.length-1)));
  if (monsterLevel==3) {swordChest=(Math.floor(Math.random() * (redChestList.length-1)))
  console.log(`gigachad sword in chest ${swordChest}`)}
  let greenChestPotion:number=greenPotionsTotal[monsterLevel-1];
  let redChestPotion:number=redPotionsTotal[monsterLevel-1];
  for (let chest of greenChestList){
    if (chest.orderNumber==greenChestKey) {chest.hasKey=true;}
    else if (greenChestPotion>0){chest.hasPotion=true; greenChestPotion--}
    else {chest.gold=50}
   }
   for (let chest of redChestList){
    if (chest.orderNumber==swordChest) {chest.hasSword=true;}
    if (chest.orderNumber==redChestKey) {chest.hasKey=true;}
    else if (redChestPotion>0){chest.hasPotion=true; redChestPotion--}
    else {chest.gold=50}
   }
}

export function iterateList(input: any): void {
  for (let specimen of monsterList) {
    input(specimen);
  }
}
export function attemptToMoveMonster(specimen: Monster): void {
  if (escapedown)return;
  if (specimen.alive&&specimen.speed>0) {
    let direction: number = 0;
    let hasMoved: boolean = false;
    let stopIfInfinite: number = 0;
    while (!hasMoved) {
      if (stopIfInfinite > 100) break;
      direction = Math.floor(Math.random() * 4) + 1;
      monsterDestination(direction, specimen);

      if (checkIfMoveAllowed() && checkOtherMonsters(specimen)&&specimen.image!='door') {
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
  let witchNumber:number=(Math.floor(Math.random() * (witchList.length-1)));
  for (let witsch of witchList){
    if (witsch.orderNumber==witchNumber) {witsch.hasKey=true;}
    
    else {witsch.hasKey=false}
      }
}

export function checkIfBattleForMonsters(): void {
  for (let monster of monsterList) {
    if (heroStats.x == monster.x && heroStats.y == monster.y && monster.alive&&monster.speed>0) {
      battle(monster);
    }
  }
}
