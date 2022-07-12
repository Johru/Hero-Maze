


 const canvas = document.querySelector(".main-canvas") as HTMLCanvasElement;
 const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
let skeleton = document.getElementById("skeleton") as HTMLImageElement;
let heroUp = document.getElementById("hero-up") as HTMLImageElement;
let heroDown = document.getElementById("hero-down") as HTMLImageElement;
let heroLeft = document.getElementById("hero-left") as HTMLImageElement;
let heroRight = document.getElementById("hero-right") as HTMLImageElement;
let bossMonster = {x: 0,y: 0,alive:true}
let skeleton1 = {x: 0,y: 0,alive:true}
let skeleton2 = {x: 0,y: 0,alive:true}
let skeleton3 = {x: 0,y: 0,alive:true}
let floor = document.getElementById("floor") as HTMLImageElement;
let wall = document.getElementById("wall") as HTMLImageElement;
let boss = document.getElementById("boss") as HTMLImageElement;

let heroCoordinates = {
  x: 0,
  y: 0,
  facing:'heroDown'
};

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

let destination:number[]=[];


function renderWalls() {
  for (let i: number = 0; i < wallPositionList.length; i++) {
    renderWallTile(wallPositionList[i][0] - 1, wallPositionList[i][1] - 1);
  }
}
function renderWallTile(xPosition: number, yPosition: number) {
  ctx.drawImage(wall, xPosition * 65, yPosition * 65, 65, 65);
}

function renderFloor() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      ctx.drawImage(floor, i * 65, j * 65, 65, 65);
    }
  }
}
function renderMonster(){
  ctx.drawImage(boss, 4 * 65, 3 * 65, 65, 65)
}
function renderSkeleton(){
  ctx.drawImage(skeleton, 4 * 65, 8 * 65, 65, 65)
}
function checkIfMoveAllowed(){
  for(let i=0; i<wallPositionList.length;i++){
    makeDestination();
    if (destination[0] == wallPositionList[i][0] && destination[1] == wallPositionList[i][1]  ) return false
  }
  return true
}
function makeDestination(){
  if (heroCoordinates.facing == 'heroDown') return destination=[heroCoordinates.x+1,heroCoordinates.y+2];
if (heroCoordinates.facing == 'heroUp') return destination= [heroCoordinates.x+1,heroCoordinates.y];
if (heroCoordinates.facing == 'heroLeft') return destination=[heroCoordinates.x,heroCoordinates.y+1];
if (heroCoordinates.facing == 'heroRight') return destination=[heroCoordinates.x+2,heroCoordinates.y+1];
}
function renderHero(){
  if (heroCoordinates.x<0){heroCoordinates.x=0}
  if (heroCoordinates.y<0){heroCoordinates.y=0}
  if (heroCoordinates.x>9){heroCoordinates.x=9}
  if (heroCoordinates.y>9){heroCoordinates.y=9}

  ctx.drawImage(eval(heroCoordinates.facing), heroCoordinates.x*65, heroCoordinates.y*65, 65, 65);
}
function clearCanvas(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
/*
let bossMonster : Monster = new Monster ('boss',5,4);
let skeleton1 : Monster = new Monster ('skeleton',10,4);
let skeleton2 : Monster = new Monster ('skeleton',10,8);
let skeleton3 : Monster = new Monster ('skeleton',5,7);
*/
function updateGameState(){
  clearCanvas();
  renderFloor();
  renderWalls();
  renderHero();
  renderMonster();
  renderSkeleton();
  

}
updateGameState();

document.addEventListener("keydown", function (keyHit) {
  switch (keyHit.key) {
    case "ArrowDown":
      heroCoordinates.facing = 'heroDown';
      if (checkIfMoveAllowed()){
        
        heroCoordinates.y++};
        updateGameState();
      break;
      case "ArrowUp":
        heroCoordinates.facing = 'heroUp';
        if (checkIfMoveAllowed()){heroCoordinates.y--};
        updateGameState();
        break;
        case "ArrowLeft":
      heroCoordinates.facing = 'heroLeft';
      if (checkIfMoveAllowed()){heroCoordinates.x--};
      updateGameState();
      break;
      case "ArrowRight":
      heroCoordinates.facing = 'heroRight';
      if (checkIfMoveAllowed()){heroCoordinates.x++};
      updateGameState();
      break;
  }
});











