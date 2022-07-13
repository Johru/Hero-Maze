export const canvas = document.querySelector(".main-canvas") as HTMLCanvasElement;
export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
export let skeleton = document.getElementById("skeleton") as HTMLImageElement;
export let heroUp = document.getElementById("hero-up") as HTMLImageElement;
export let heroDown = document.getElementById("hero-down") as HTMLImageElement;
export let heroLeft = document.getElementById("hero-left") as HTMLImageElement;
export let heroRight = document.getElementById("hero-right") as HTMLImageElement;
export let bossMonster = {x: 0,y: 0,alive:true}
export let skeleton1 = {x: 0,y: 0,alive:true}
export let skeleton2 = {x: 0,y: 0,alive:true}
export let skeleton3 = {x: 0,y: 0,alive:true}
export let floor = document.getElementById("floor") as HTMLImageElement;
export let wall = document.getElementById("wall") as HTMLImageElement;
export let boss = document.getElementById("boss") as HTMLImageElement;

export let heroCoordinates = {
  x: 0,
  y: 0,
  facing:'heroDown'
};

export let wallPositionList: number[][] = [
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