import { heroStats } from './variables';

//following variables should be part of the class instance of each monster.

// 'This is probably an array with a patrol route calculated as part of map init.';
const patrolPath = [1, 1, 1, 2, 1, 3, 1, 2, 1, 1];

let temporaryPath =
  'This is probably an array with path to return to lastPatrolPosition';
let lastPatrolPosition = 'Index of patrolPath';
let currentPosition = 'Current position of monster';

commandCurrentMonster();

function commandCurrentMonster() {
  chaseIfHeroVisible();
  if (currentPosition == lastPatrolPosition && nextPatrolIsUnblocked())
    moveAlong(patrolPath);
  else findPathTo(lastPatrolPosition);
}

function chaseIfHeroVisible() {
  if (!heroVisible()) return;
  else findPathTo([heroStats.x, heroStats.y]);
}

function findPathTo(target) {
  //use A-star to calculate path
  //store planned route in temporaryPath
  moveAlong(temporaryPath);
}
function moveAlong(path) {
  ///
}

function heroVisible() {
  return true;
  //return false if no LOS
}

function nextPatrolIsUnblocked() {
  return true;
  //return false if blocked
}
