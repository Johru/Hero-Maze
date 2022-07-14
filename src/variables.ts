
import {Monster,Skeleton} from './classes'
import {d6} from './utility'
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
export let heroStats = {
  x: 1,
  y: 1,
  facing: 'heroDown',
  level: 1,
  maxHP: d6(3) + 20,
  currentHP: 6,
  DP: d6(2),
  SP: d6(1) + 7,
  hasKey: false,
};
export let tileWidth: number = 65;
export let bossMonster: Monster = new Monster(0);
export let skeleton1: Monster = new Skeleton(1);
export let skeleton2: Monster = new Skeleton(2);
export let skeleton3: Monster = new Skeleton(3);
export let monsterList: Monster[] = [];
monsterList.push(bossMonster);
monsterList.push(skeleton1);
monsterList.push(skeleton2);
monsterList.push(skeleton3);
heroStats.currentHP = heroStats.maxHP;



export let monstersMove: boolean = false;
export function updateMonstersMove(doTheyQuestionmark:boolean):boolean{
  return monstersMove=doTheyQuestionmark;
  }
export let monsterHasKey: number = 1;
export function updateMonsterHasKey(orderNumberOfMonster:number):number{
  return monsterHasKey=orderNumberOfMonster;
  }
export let monsterLevel: number = 1;
export function updateMonstersLevel(increment:number):number{
  return monsterLevel+=increment;
  }

let destination: number[] = [];
export function updateDestination(x:number,y:number):number[]{
  return destination=[x,y];
  }
export function getDestination():number[]{
  return destination;
  }


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