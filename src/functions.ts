const canvas = document.querySelector(".main-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
//let destination: number[] = [];
let floor = document.getElementById("floor") as HTMLImageElement;
/*import {wallPositionList, skeleton,heroDown,heroLeft,heroRight,heroUp,bossMonster,skeleton1,skeleton2,skeleton3,floor,wall,boss,heroCoordinates,canvas,ctx} from './variables'*/

export function renderFloor2() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      ctx.drawImage(floor, i * 65, j * 65, 65, 65);
    }
  }

}


/*

export function renderWalls() {
  for (let i: number = 0; i < wallPositionList.length; i++) {
    renderWallTile(wallPositionList[i][0] - 1, wallPositionList[i][1] - 1);
  }
}
export function renderWallTile(xPosition: number, yPosition: number) {
  ctx.drawImage(wall, xPosition * 65, yPosition * 65, 65, 65);
}

export function renderMonster() {
  ctx.drawImage(boss, 4 * 65, 3 * 65, 65, 65);
}
export function renderSkeleton() {
  ctx.drawImage(skeleton, 4 * 65, 8 * 65, 65, 65);
}
export function checkIfMoveAllowed() {
  for (let i = 0; i < wallPositionList.length; i++) {
    makeDestination();
    if (
      destination[0] == wallPositionList[i][0] &&
      destination[1] == wallPositionList[i][1]
    )
      return false;
  }
  return true;
}
export function makeDestination() {
  if (heroCoordinates.facing == "heroDown")
    return (destination = [heroCoordinates.x + 1, heroCoordinates.y + 2]);
  if (heroCoordinates.facing == "heroUp")
    return (destination = [heroCoordinates.x + 1, heroCoordinates.y]);
  if (heroCoordinates.facing == "heroLeft")
    return (destination = [heroCoordinates.x, heroCoordinates.y + 1]);
  if (heroCoordinates.facing == "heroRight")
    return (destination = [heroCoordinates.x + 2, heroCoordinates.y + 1]);
}
export function renderHero() {
  if (heroCoordinates.x < 0) {
    heroCoordinates.x = 0;
  }
  if (heroCoordinates.y < 0) {
    heroCoordinates.y = 0;
  }
  if (heroCoordinates.x > 9) {
    heroCoordinates.x = 9;
  }
  if (heroCoordinates.y > 9) {
    heroCoordinates.y = 9;
  }

  ctx.drawImage(
    eval(heroCoordinates.facing),
    heroCoordinates.x * 65,
    heroCoordinates.y * 65,
    65,
    65
  );
}
export function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}*/
