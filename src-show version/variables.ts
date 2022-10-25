import { Monster, Skeleton } from './classes';
import { d6 } from './utility';
export const canvas = document.querySelector(
  '.main-canvas'
) as HTMLCanvasElement;
export const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
export let skeleton = document.getElementById('skeleton') as HTMLImageElement;
export let heroUp = document.getElementById('hero-up') as HTMLImageElement;
export let heroDown = document.getElementById('hero-down') as HTMLImageElement;
export let heroLeft = document.getElementById('hero-left') as HTMLImageElement;
export let heroRight = document.getElementById(
  'hero-right'
) as HTMLImageElement;
export let floor = document.getElementById('floor') as HTMLImageElement;
export let wall = document.getElementById('wall') as HTMLImageElement;
export let boss = document.getElementById('boss') as HTMLImageElement;
export let blood = document.getElementById('blood') as HTMLImageElement;
export let key = document.getElementById('key') as HTMLImageElement;
export let die = document.getElementById('die') as HTMLImageElement;
export let potion = document.getElementById('potion') as HTMLImageElement;
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
  hasPotion: true,
};
export let moveEveryXMiliseconds: number = 2000;

export function updateSpeed(speedChange: number): void {
  moveEveryXMiliseconds -= speedChange;
}
export function resetSpeed(newSpeed: number): void {
  moveEveryXMiliseconds = newSpeed;
}
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

export let monsterHasKey: number = 1;
export function updateMonsterHasKey(orderNumberOfMonster: number): number {
  return (monsterHasKey = orderNumberOfMonster);
}
export let monsterLevel: number = 1;
export function updateMonstersLevel(increment: number): number {
  return (monsterLevel += increment);
}
export function resetMonstersLevel(): void {
  monsterLevel = 1;
}
let destination: number[] = [];
export function updateDestination(x: number, y: number): number[] {
  return (destination = [x, y]);
}
export function getDestination(): number[] {
  return destination;
}

export let skeletonSetup = [
  [7, 7],
  [10, 5],
  [5, 10],
];
