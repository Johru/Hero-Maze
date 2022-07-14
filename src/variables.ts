
import {d6} from './index'
export const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
export const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
export let skeleton = document.getElementById('skeleton') as HTMLImageElement;
export let heroUp = document.getElementById('hero-up') as HTMLImageElement;
export let heroDown = document.getElementById('hero-down') as HTMLImageElement;
export let heroLeft = document.getElementById('hero-left') as HTMLImageElement;
export let heroRight = document.getElementById('hero-right') as HTMLImageElement;
export let floor = document.getElementById('floor') as HTMLImageElement;
export let wall = document.getElementById('wall') as HTMLImageElement;
export let boss = document.getElementById('boss') as HTMLImageElement;
export let blood = document.getElementById('blood') as HTMLImageElement;
export let key = document.getElementById('key') as HTMLImageElement;
export let tileWidth: number = 65;



export let heroStats = {
  x: 0,
  y: 0,
  facing: 'heroDown',
  level: 1,
  maxHP: d6(3) + 20,
  currentHP: 6,
  DP: d6(2),
  SP: d6(1) + 7,
  hasKey: false,
};
export let skeletonSetup = [
  [8, 6],
  [5, 4],
   [5, 9],
];


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