import {
  floor,
  ctx,
  tileWidth,
  wall,
  heroStats,
  monsterLevel,
  bossMonster,
  key,
  canvas,
  potion,
  
} from './variables';
import { gameLog } from './utility';
import { mapSize, wallPositionList } from './random';
import { scrollingModifierX,
  scrollingModifierY } from './index';
export function clearCanvas(): void {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
export function renderFloor(): void {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      ctx.drawImage(floor, (i) * 65, (j) * 65, 65, 65);
    }
  }
}

export function renderWalls(): void {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      for (let k=0;k<wallPositionList.length;k++){
      if (wallPositionList[k][0]==i+scrollingModifierX+1&&wallPositionList[k][1]==j+scrollingModifierY+1){
      renderWallTile(i,j);
      }
    }
    }
  }
}

function renderWallTile(xPosition: number, yPosition: number): void {
  ctx.drawImage(
    wall,
    xPosition * tileWidth,
    yPosition * tileWidth,
    tileWidth,
    tileWidth
  );
}

export function printstats(): void {
  ctx.font = '20px Arial';
  ctx.fillText('Stats:', 660, 25);
  if (heroStats.hasKey) {
    ctx.drawImage(key, 860, 25, 125, 52);
  }
  if (heroStats.hasPotion) {
    ctx.drawImage(potion, 1000, 25, 90, 90);
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
  ctx.fillText(`Game Log:`, 660, 300);
  ctx.font = '15px Arial';
  for (let i = 0; i < 9; i++) {
    if (gameLog[i] === undefined) continue;
    if (gameLog[i] == 'YOU DIED') {
      ctx.font = '16px Arial';
      ctx.fillStyle = 'red';
    } else {
      ctx.font = '15px Arial';
      ctx.fillStyle = 'black';
    }
    ctx.fillText(gameLog[i], 660, 320 + 20 * i);
  }
  ctx.font = '13px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText(`Instructions:`, 660, 530);
  ctx.fillText(
    `One of the Skeletons has a key. To win a level, you must find the key`,
    660,
    545
  );
  ctx.fillText(`and defeat the Boss.`, 660, 560);
  ctx.fillText(
    `Whenever you win a level, map will reset, you keep your progress `,
    660,
    575
  );
  ctx.fillText(`but the level of monsters goes up, so be careful!`, 660, 590);
  ctx.fillText(`When your HP drops to 0, you die and game restarts.`, 660, 605);
  ctx.fillText(
    `Killing Skeletons increases your hero level, use them to get stronger early on.`,
    660,
    620
  );
  ctx.fillText(`Winning a level has a chance to restore your HP.`, 660, 635);
}
