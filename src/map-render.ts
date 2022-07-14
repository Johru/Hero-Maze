import {floor,ctx,wallPositionList,tileWidth,wall,heroStats,monsterLevel,bossMonster,key,canvas} from './variables';
//let destination: number[] = [];
export function clearCanvas() :void{
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
export function renderFloor():void {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      ctx.drawImage(floor, i * 65, j * 65, 65, 65);
    }
  }
}

export function renderWalls():void {
  for (let i: number = 0; i < wallPositionList.length - 40; i++) {
    renderWallTile(wallPositionList[i][0] - 1, wallPositionList[i][1] - 1);
  }
}

 function renderWallTile(xPosition: number, yPosition: number):void {
  ctx.drawImage(
    wall,
    xPosition * tileWidth,
    yPosition * tileWidth,
    tileWidth,
    tileWidth
  );
}

export function printstats() :void{
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

