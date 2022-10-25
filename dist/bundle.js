/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: canvas, heroStats, monsterLevel, Monster, d6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canvas", function() { return canvas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "heroStats", function() { return heroStats; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "monsterLevel", function() { return monsterLevel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Monster", function() { return Monster; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d6", function() { return d6; });
/* harmony import */ var _map_render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map-render */ "./src/map-render.ts");
/* harmony import */ var _variables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./variables */ "./src/variables.ts");


const canvas = document.querySelector('.main-canvas');
let heroStats = {
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
//import {renderFloor} from './functions'
let destination = [];
heroStats.currentHP = heroStats.maxHP;
let monstersMove = false;
let monsterHasKey = 1;
let monsterLevel = 1;
class Monster {
    constructor(order, x = 0, y = 0, image = 'boss', hp = 0, DP = 0, SP = 0, alive = true) {
        this.orderNumber = order;
        this.x = x;
        this.y = y;
        this.image = image;
        this.HP = hp;
        this.DP = DP;
        this.SP = SP;
        this.alive = alive;
    }
    init() {
        this.x = 10;
        this.y = 10;
        this.alive = true;
        this.HP = d6(8) + 2 * monsterLevel * d6(1);
        this.DP = Math.floor((monsterLevel / 2) * d6(1));
        this.SP = monsterLevel * d6(1) + 3 * monsterLevel;
    }
}
class Skeleton extends Monster {
    init() {
        this.x = _variables__WEBPACK_IMPORTED_MODULE_1__["skeletonSetup"][this.orderNumber - 1][0];
        this.y = _variables__WEBPACK_IMPORTED_MODULE_1__["skeletonSetup"][this.orderNumber - 1][1];
        this.alive = true;
        this.HP = d6(2) * 2 * monsterLevel;
        this.DP = Math.floor((monsterLevel * d6(1)) / 2 + monsterLevel / 2);
        this.SP = monsterLevel * d6(1) + 3 * monsterLevel;
        this.image = 'skeleton';
    }
}
let bossMonster = new Monster(0);
let skeleton1 = new Skeleton(1);
let skeleton2 = new Skeleton(2);
let skeleton3 = new Skeleton(3);
let monsterList = [];
monsterList.push(bossMonster);
monsterList.push(skeleton1);
monsterList.push(skeleton2);
monsterList.push(skeleton3);
for (let monster of monsterList) {
    monster.init();
}
assignKey();
for (let j = 1; j < 11; j++) {
    _variables__WEBPACK_IMPORTED_MODULE_1__["wallPositionList"].push([j, 11]);
}
for (let j = 1; j < 11; j++) {
    _variables__WEBPACK_IMPORTED_MODULE_1__["wallPositionList"].push([j, 0]);
}
for (let k = 1; k < 11; k++) {
    _variables__WEBPACK_IMPORTED_MODULE_1__["wallPositionList"].push([0, k]);
}
for (let k = 1; k < 11; k++) {
    _variables__WEBPACK_IMPORTED_MODULE_1__["wallPositionList"].push([11, k]);
}
function d6(numberOfRolls) {
    let total = 0;
    for (let i = 0; i < numberOfRolls; i++) {
        total += Math.floor(Math.random() * 6) + 1;
    }
    return total;
}
function updateGameState() {
    clearCanvas();
    Object(_map_render__WEBPACK_IMPORTED_MODULE_0__["renderFloor"])();
    renderWalls();
    printstats();
    renderHero();
    renderAllMonsters();
    resetMonsterMoveTimer();
    renderHero();
    checkIfBattleForMonsters();
    checkIfHeroDead();
    checkRoundEnd();
}
function resetMonsterMoveTimer() {
    if (monstersMove) {
        monstersMove = false;
    }
    else {
        monstersMove = true;
    }
}
function renderAllMonsters() {
    for (let i = 0; i < monsterList.length; i++) {
        renderMonster(monsterList[i]);
    }
}
function checkRoundEnd() {
    if (bossMonster.alive == false && heroStats.hasKey) {
        heroStats.x = 0;
        heroStats.y = 0;
        heroStats.hasKey = false;
        let hpGainRandomizer = Math.random() * 100 + 1;
        console.log(hpGainRandomizer);
        if (hpGainRandomizer <= 10) {
            heroStats.currentHP = heroStats.maxHP;
            console.log('Full HP restored!');
        }
        if (40 >= hpGainRandomizer && hpGainRandomizer > 10) {
            heroStats.currentHP =
                heroStats.currentHP + Math.floor(heroStats.maxHP / 3);
            console.log('A third of HP restored!');
        }
        if (hpGainRandomizer > 40) {
            heroStats.currentHP =
                heroStats.currentHP + Math.floor(heroStats.maxHP / 10);
            console.log('A tenth of HP restored!');
        }
        if (heroStats.currentHP > heroStats.maxHP) {
            heroStats.currentHP = heroStats.maxHP;
        }
        monsterLevel++;
        for (let monster of monsterList) {
            monster.init();
        }
        assignKey();
    }
}
function assignKey() {
    monsterHasKey = Math.floor(Math.random() * 3) + 1;
    console.log(monsterHasKey);
}
function checkIfHeroDead() {
    if (heroStats.currentHP < 1) {
        window.location.reload();
    }
}
function monsterDestination(input, specimen) {
    switch (input) {
        case 1: //down
            destination = [specimen.x, specimen.y + 1];
            break;
        case 2: //up
            destination = [specimen.x, specimen.y - 1];
            break;
        case 3: //left
            destination = [specimen.x - 1, specimen.y];
            break;
        case 4: //right
            destination = [specimen.x + 1, specimen.y];
            break;
    }
}
function attemptToMoveMonster(specimen) {
    if (monstersMove) {
        let direction = 0;
        let hasMoved = false;
        let stopIfInfinite = 0;
        while (!hasMoved) {
            if (stopIfInfinite > 100)
                break;
            direction = Math.floor(Math.random() * 4) + 1;
            monsterDestination(direction, specimen);
            if (checkIfMoveAllowed() && checkOtherMonsters(specimen)) {
                specimen.x = destination[0];
                specimen.y = destination[1];
                hasMoved = true;
            }
            stopIfInfinite++;
        }
    }
}
function checkOtherMonsters(specimen) {
    for (let i = 0; i < monsterList.length; i++) {
        if (i == specimen.orderNumber)
            continue;
        if (monsterList[i].x == destination[0] &&
            monsterList[i].y == destination[1]) {
            return false;
        }
    }
    return true;
}
function renderMonster(specimen) {
    if (specimen.alive) {
        attemptToMoveMonster(specimen);
        _variables__WEBPACK_IMPORTED_MODULE_1__["ctx"].drawImage(eval(specimen.image), (specimen.x - 1) * _variables__WEBPACK_IMPORTED_MODULE_1__["tileWidth"], (specimen.y - 1) * _variables__WEBPACK_IMPORTED_MODULE_1__["tileWidth"], _variables__WEBPACK_IMPORTED_MODULE_1__["tileWidth"], _variables__WEBPACK_IMPORTED_MODULE_1__["tileWidth"]);
    }
    else {
        _variables__WEBPACK_IMPORTED_MODULE_1__["ctx"].drawImage(_variables__WEBPACK_IMPORTED_MODULE_1__["blood"], (specimen.x - 1) * _variables__WEBPACK_IMPORTED_MODULE_1__["tileWidth"], (specimen.y - 1) * _variables__WEBPACK_IMPORTED_MODULE_1__["tileWidth"], _variables__WEBPACK_IMPORTED_MODULE_1__["tileWidth"], _variables__WEBPACK_IMPORTED_MODULE_1__["tileWidth"]);
    }
}
/*
export function renderFloor() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      ctx.drawImage(floor, i * tileWidth, j * tileWidth, tileWidth, tileWidth);
    }
  }
}
*/
function renderWalls() {
    for (let i = 0; i < _variables__WEBPACK_IMPORTED_MODULE_1__["wallPositionList"].length - 40; i++) {
        renderWallTile(_variables__WEBPACK_IMPORTED_MODULE_1__["wallPositionList"][i][0] - 1, _variables__WEBPACK_IMPORTED_MODULE_1__["wallPositionList"][i][1] - 1);
    }
}
function renderWallTile(xPosition, yPosition) {
    _variables__WEBPACK_IMPORTED_MODULE_1__["ctx"].drawImage(_variables__WEBPACK_IMPORTED_MODULE_1__["wall"], xPosition * _variables__WEBPACK_IMPORTED_MODULE_1__["tileWidth"], yPosition * _variables__WEBPACK_IMPORTED_MODULE_1__["tileWidth"], _variables__WEBPACK_IMPORTED_MODULE_1__["tileWidth"], _variables__WEBPACK_IMPORTED_MODULE_1__["tileWidth"]);
}
function printstats() {
    _variables__WEBPACK_IMPORTED_MODULE_1__["ctx"].font = '20px Arial';
    _variables__WEBPACK_IMPORTED_MODULE_1__["ctx"].fillText('Stats:', 660, 25);
    if (heroStats.hasKey) {
        _variables__WEBPACK_IMPORTED_MODULE_1__["ctx"].drawImage(_variables__WEBPACK_IMPORTED_MODULE_1__["key"], 860, 25, 125, 52);
    }
    _variables__WEBPACK_IMPORTED_MODULE_1__["ctx"].fillText(`Hero Level: ${heroStats.level}`, 660, 50);
    _variables__WEBPACK_IMPORTED_MODULE_1__["ctx"].fillText(`HP:         ${heroStats.currentHP}/${heroStats.maxHP}`, 660, 75);
    _variables__WEBPACK_IMPORTED_MODULE_1__["ctx"].fillText(`DP:         ${heroStats.DP}`, 660, 100);
    _variables__WEBPACK_IMPORTED_MODULE_1__["ctx"].fillText(`SP:         ${heroStats.SP}`, 660, 125);
    _variables__WEBPACK_IMPORTED_MODULE_1__["ctx"].fillText(`Monster Level:${monsterLevel}`, 660, 175);
    if (bossMonster.alive) {
        _variables__WEBPACK_IMPORTED_MODULE_1__["ctx"].fillText(`Boss is still alive!`, 660, 200);
    }
    else {
        _variables__WEBPACK_IMPORTED_MODULE_1__["ctx"].fillText(`Boss is dead. Congrats.`, 660, 200);
    }
    _variables__WEBPACK_IMPORTED_MODULE_1__["ctx"].fillText(`HP:       ${bossMonster.HP}`, 660, 225);
    _variables__WEBPACK_IMPORTED_MODULE_1__["ctx"].fillText(`DP:       ${bossMonster.DP}`, 660, 250);
    _variables__WEBPACK_IMPORTED_MODULE_1__["ctx"].fillText(`SP:       ${bossMonster.SP}`, 660, 275);
    if (heroStats.hasKey) {
        _variables__WEBPACK_IMPORTED_MODULE_1__["ctx"].fillText(`You have the key to next level!`, 660, 300);
    }
    else {
        _variables__WEBPACK_IMPORTED_MODULE_1__["ctx"].fillText(`You havent found the key yet.`, 660, 300);
    }
    _variables__WEBPACK_IMPORTED_MODULE_1__["ctx"].font = '13px Arial';
    _variables__WEBPACK_IMPORTED_MODULE_1__["ctx"].fillText(`One of the Skeletons has a key. To win a level, you must find the key`, 660, 500);
    _variables__WEBPACK_IMPORTED_MODULE_1__["ctx"].fillText(`and defeat the Boss.`, 660, 515);
    _variables__WEBPACK_IMPORTED_MODULE_1__["ctx"].fillText(`Whenever you win a level, map will reset, you keep your progress `, 660, 530);
    _variables__WEBPACK_IMPORTED_MODULE_1__["ctx"].fillText(`but the level of monsters goes up, so be careful!`, 660, 545);
    _variables__WEBPACK_IMPORTED_MODULE_1__["ctx"].fillText(`When your HP drops to 0, you die and game restarts.`, 660, 560);
    _variables__WEBPACK_IMPORTED_MODULE_1__["ctx"].fillText(`Killing Skeletons increases your hero level, use them to get stronger early on.`, 660, 575);
    _variables__WEBPACK_IMPORTED_MODULE_1__["ctx"].fillText(`Winning a level has a chance to restore your HP.`, 660, 590);
}
function attemptToMoveHero() {
    makeDestination();
    checkIfBattle();
    return checkIfMoveAllowed();
}
function checkIfMoveAllowed() {
    for (let i = 0; i < _variables__WEBPACK_IMPORTED_MODULE_1__["wallPositionList"].length; i++) {
        if (destination[0] == _variables__WEBPACK_IMPORTED_MODULE_1__["wallPositionList"][i][0] &&
            destination[1] == _variables__WEBPACK_IMPORTED_MODULE_1__["wallPositionList"][i][1])
            return false;
    }
    return true;
}
function battle(monster) {
    while (monster.HP > 0) {
        if (heroStats.currentHP < 1) {
            return alert('You died!');
        }
        let heroAttack = heroStats.SP + d6(1);
        let monsterAttack = monster.SP + d6(1);
        if (heroAttack > monster.DP) {
            monster.HP -= heroAttack - monster.DP;
        }
        if (monsterAttack > heroStats.DP) {
            heroStats.currentHP -= monsterAttack - heroStats.DP;
        }
    }
    monster.alive = false;
    let hpBoost = d6(1);
    heroStats.maxHP += hpBoost;
    heroStats.currentHP += hpBoost;
    heroStats.DP += 1;
    heroStats.SP += 1;
    heroStats.level++;
    if (monster.orderNumber == monsterHasKey) {
        heroStats.hasKey = true;
    }
}
function checkIfBattle() {
    for (let monster of monsterList) {
        if (destination[0] == monster.x &&
            destination[1] == monster.y &&
            monster.alive) {
            battle(monster);
        }
    }
}
function checkIfBattleForMonsters() {
    for (let monster of monsterList) {
        if (heroStats.x + 1 == monster.x &&
            heroStats.y + 1 == monster.y &&
            monster.alive) {
            battle(monster);
        }
    }
}
function makeDestination() {
    if (heroStats.facing == 'heroDown')
        return (destination = [heroStats.x + 1, heroStats.y + 2]);
    if (heroStats.facing == 'heroUp')
        return (destination = [heroStats.x + 1, heroStats.y]);
    if (heroStats.facing == 'heroLeft')
        return (destination = [heroStats.x, heroStats.y + 1]);
    if (heroStats.facing == 'heroRight')
        return (destination = [heroStats.x + 2, heroStats.y + 1]);
}
function renderHero() {
    _variables__WEBPACK_IMPORTED_MODULE_1__["ctx"].drawImage(eval(heroStats.facing), heroStats.x * _variables__WEBPACK_IMPORTED_MODULE_1__["tileWidth"], heroStats.y * _variables__WEBPACK_IMPORTED_MODULE_1__["tileWidth"], _variables__WEBPACK_IMPORTED_MODULE_1__["tileWidth"], _variables__WEBPACK_IMPORTED_MODULE_1__["tileWidth"]);
}
function clearCanvas() {
    _variables__WEBPACK_IMPORTED_MODULE_1__["ctx"].clearRect(0, 0, canvas.width, canvas.height);
}
updateGameState();
document.addEventListener('keydown', function (keyHit) {
    switch (keyHit.key) {
        case 'ArrowDown':
            heroStats.facing = 'heroDown';
            if (attemptToMoveHero()) {
                heroStats.y++;
            }
            updateGameState();
            break;
        case 'ArrowUp':
            heroStats.facing = 'heroUp';
            if (attemptToMoveHero()) {
                heroStats.y--;
            }
            updateGameState();
            break;
        case 'ArrowLeft':
            heroStats.facing = 'heroLeft';
            if (attemptToMoveHero()) {
                heroStats.x--;
            }
            updateGameState();
            break;
        case 'ArrowRight':
            heroStats.facing = 'heroRight';
            if (attemptToMoveHero()) {
                heroStats.x++;
            }
            updateGameState();
            break;
    }
});


/***/ }),

/***/ "./src/map-render.ts":
/*!***************************!*\
  !*** ./src/map-render.ts ***!
  \***************************/
/*! exports provided: renderFloor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderFloor", function() { return renderFloor; });
/* harmony import */ var _variables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./variables */ "./src/variables.ts");

//let destination: number[] = [];
function renderFloor() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            _variables__WEBPACK_IMPORTED_MODULE_0__["ctx"].drawImage(_variables__WEBPACK_IMPORTED_MODULE_0__["floor"], i * 65, j * 65, 65, 65);
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


/***/ }),

/***/ "./src/variables.ts":
/*!**************************!*\
  !*** ./src/variables.ts ***!
  \**************************/
/*! exports provided: canvas, ctx, skeleton, heroUp, heroDown, heroLeft, heroRight, floor, wall, boss, blood, key, tileWidth, heroStats, skeletonSetup, wallPositionList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canvas", function() { return canvas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ctx", function() { return ctx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "skeleton", function() { return skeleton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "heroUp", function() { return heroUp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "heroDown", function() { return heroDown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "heroLeft", function() { return heroLeft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "heroRight", function() { return heroRight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "floor", function() { return floor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wall", function() { return wall; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "boss", function() { return boss; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "blood", function() { return blood; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "key", function() { return key; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tileWidth", function() { return tileWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "heroStats", function() { return heroStats; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "skeletonSetup", function() { return skeletonSetup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wallPositionList", function() { return wallPositionList; });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/index.ts");

const canvas = document.querySelector('.main-canvas');
const ctx = canvas.getContext('2d');
let skeleton = document.getElementById('skeleton');
let heroUp = document.getElementById('hero-up');
let heroDown = document.getElementById('hero-down');
let heroLeft = document.getElementById('hero-left');
let heroRight = document.getElementById('hero-right');
let floor = document.getElementById('floor');
let wall = document.getElementById('wall');
let boss = document.getElementById('boss');
let blood = document.getElementById('blood');
let key = document.getElementById('key');
let tileWidth = 65;
let heroStats = {
    x: 0,
    y: 0,
    facing: 'heroDown',
    level: 1,
    maxHP: Object(_index__WEBPACK_IMPORTED_MODULE_0__["d6"])(3) + 20,
    currentHP: 6,
    DP: Object(_index__WEBPACK_IMPORTED_MODULE_0__["d6"])(2),
    SP: Object(_index__WEBPACK_IMPORTED_MODULE_0__["d6"])(1) + 7,
    hasKey: false,
};
let skeletonSetup = [
    [8, 6],
    [5, 4],
    [5, 9],
];
let wallPositionList = [
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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9tYXAtcmVuZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy92YXJpYWJsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQTJDO0FBQ2lGO0FBQ3JILE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFzQixDQUFDO0FBQzNFLElBQUksU0FBUyxHQUFHO0lBQ3JCLENBQUMsRUFBRSxDQUFDO0lBQ0osQ0FBQyxFQUFFLENBQUM7SUFDSixNQUFNLEVBQUUsVUFBVTtJQUNsQixLQUFLLEVBQUUsQ0FBQztJQUNSLEtBQUssRUFBRSxFQUFFLENBQUMs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QyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQ1IsQ0FBQztBQUdLLElBQUksZ0JBQWdCLEdBQWU7SUFDeEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ1AsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ1AsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ1AsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQ1AsQ0FBQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCB7IHJlbmRlckZsb29yIH0gZnJvbSAnLi9tYXAtcmVuZGVyJztcclxuaW1wb3J0IHsgc2tlbGV0b25TZXR1cCx3YWxsUG9zaXRpb25MaXN0LGN0eCx0aWxlV2lkdGgsYmxvb2Qsd2FsbCxrZXksaGVyb0Rvd24saGVyb0xlZnQsaGVyb1JpZ2h0LGhlcm9VcH0gZnJvbSAnLi92YXJpYWJsZXMnO1xyXG5leHBvcnQgY29uc3QgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tY2FudmFzJykgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XHJcbmV4cG9ydCBsZXQgaGVyb1N0YXRzID0ge1xyXG4gIHg6IDAsXHJcbiAgeTogMCxcclxuICBmYWNpbmc6ICdoZXJvRG93bicsXHJcbiAgbGV2ZWw6IDEsXHJcbiAgbWF4SFA6IGQ2KDMpICsgMjAsXHJcbiAgY3VycmVudEhQOiA2LFxyXG4gIERQOiBkNigyKSxcclxuICBTUDogZDYoMSkgKyA3LFxyXG4gIGhhc0tleTogZmFsc2UsXHJcbn07XHJcbi8vaW1wb3J0IHtyZW5kZXJGbG9vcn0gZnJvbSAnLi9mdW5jdGlvbnMnXHJcbmxldCBkZXN0aW5hdGlvbjogbnVtYmVyW10gPSBbXTtcclxuaGVyb1N0YXRzLmN1cnJlbnRIUCA9IGhlcm9TdGF0cy5tYXhIUDtcclxubGV0IG1vbnN0ZXJzTW92ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5sZXQgbW9uc3Rlckhhc0tleTogbnVtYmVyID0gMTtcclxuXHJcbmV4cG9ydCBsZXQgbW9uc3RlckxldmVsOiBudW1iZXIgPSAxO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1vbnN0ZXIge1xyXG4gIG9yZGVyTnVtYmVyOiBudW1iZXI7XHJcbiAgeDogbnVtYmVyO1xyXG4gIHk6IG51bWJlcjtcclxuICBpbWFnZTogc3RyaW5nO1xyXG4gIEhQOiBudW1iZXI7XHJcbiAgRFA6IG51bWJlcjtcclxuICBTUDogbnVtYmVyO1xyXG4gIGFsaXZlOiBib29sZWFuO1xyXG4gIGhhc0tleTogYm9vbGVhbjtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIG9yZGVyOiBudW1iZXIsXHJcbiAgICB4OiBudW1iZXIgPSAwLFxyXG4gICAgeTogbnVtYmVyID0gMCxcclxuICAgIGltYWdlOiBzdHJpbmcgPSAnYm9zcycsXHJcbiAgICBocDogbnVtYmVyID0gMCxcclxuICAgIERQOiBudW1iZXIgPSAwLFxyXG4gICAgU1A6IG51bWJlciA9IDAsXHJcbiAgICBhbGl2ZTogYm9vbGVhbiA9IHRydWVcclxuICApIHtcclxuICAgIHRoaXMub3JkZXJOdW1iZXIgPSBvcmRlcjtcclxuICAgIHRoaXMueCA9IHg7XHJcbiAgICB0aGlzLnkgPSB5O1xyXG4gICAgdGhpcy5pbWFnZSA9IGltYWdlO1xyXG4gICAgdGhpcy5IUCA9IGhwO1xyXG4gICAgdGhpcy5EUCA9IERQO1xyXG4gICAgdGhpcy5TUCA9IFNQO1xyXG4gICAgdGhpcy5hbGl2ZSA9IGFsaXZlO1xyXG4gIH1cclxuICBpbml0KCk6dm9pZHtcclxuICAgIHRoaXMueCA9IDEwO1xyXG4gICAgdGhpcy55ID0gMTA7XHJcbiAgICB0aGlzLmFsaXZlID0gdHJ1ZTtcclxuICAgIHRoaXMuSFAgPSBkNig4KSArIDIgKiBtb25zdGVyTGV2ZWwgKiBkNigxKTtcclxuICAgIHRoaXMuRFAgPSBNYXRoLmZsb29yKChtb25zdGVyTGV2ZWwgLyAyKSAqIGQ2KDEpKTtcclxuICAgIHRoaXMuU1AgPSBtb25zdGVyTGV2ZWwgKiBkNigxKSArIDMgKiBtb25zdGVyTGV2ZWw7XHJcbiAgfVxyXG59XHJcbmNsYXNzIFNrZWxldG9uIGV4dGVuZHMgTW9uc3RlciB7XHJcbiAgaW5pdCgpIHtcclxuICAgIHRoaXMueCA9IHNrZWxldG9uU2V0dXBbdGhpcy5vcmRlck51bWJlci0xXVswXTtcclxuICAgIHRoaXMueSA9IHNrZWxldG9uU2V0dXBbdGhpcy5vcmRlck51bWJlci0xXVsxXTtcclxuICAgIHRoaXMuYWxpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5IUCA9IGQ2KDIpICogMiAqIG1vbnN0ZXJMZXZlbDtcclxuICAgIHRoaXMuRFAgPSBNYXRoLmZsb29yKChtb25zdGVyTGV2ZWwgKiBkNigxKSkgLyAyICsgbW9uc3RlckxldmVsIC8gMik7XHJcbiAgICB0aGlzLlNQID0gbW9uc3RlckxldmVsICogZDYoMSkgKyAzICogbW9uc3RlckxldmVsO1xyXG4gICAgdGhpcy5pbWFnZSA9ICdza2VsZXRvbic7XHJcbiAgfVxyXG59XHJcbmxldCBib3NzTW9uc3RlcjogTW9uc3RlciA9IG5ldyBNb25zdGVyKDApO1xyXG5sZXQgc2tlbGV0b24xOiBNb25zdGVyID0gbmV3IFNrZWxldG9uKDEpO1xyXG5sZXQgc2tlbGV0b24yOiBNb25zdGVyID0gbmV3IFNrZWxldG9uKDIpO1xyXG5sZXQgc2tlbGV0b24zOiBNb25zdGVyID0gbmV3IFNrZWxldG9uKDMpO1xyXG5sZXQgbW9uc3Rlckxpc3Q6IE1vbnN0ZXJbXSA9IFtdO1xyXG5tb25zdGVyTGlzdC5wdXNoKGJvc3NNb25zdGVyKTtcclxubW9uc3Rlckxpc3QucHVzaChza2VsZXRvbjEpO1xyXG5tb25zdGVyTGlzdC5wdXNoKHNrZWxldG9uMik7XHJcbm1vbnN0ZXJMaXN0LnB1c2goc2tlbGV0b24zKTtcclxuZm9yIChsZXQgbW9uc3RlciBvZiBtb25zdGVyTGlzdCkge1xyXG4gIG1vbnN0ZXIuaW5pdCgpO1xyXG59XHJcblxyXG5hc3NpZ25LZXkoKTtcclxuXHJcbmZvciAobGV0IGogPSAxOyBqIDwgMTE7IGorKykge1xyXG4gIHdhbGxQb3NpdGlvbkxpc3QucHVzaChbaiwgMTFdKTtcclxufVxyXG5mb3IgKGxldCBqID0gMTsgaiA8IDExOyBqKyspIHtcclxuICB3YWxsUG9zaXRpb25MaXN0LnB1c2goW2osIDBdKTtcclxufVxyXG5mb3IgKGxldCBrID0gMTsgayA8IDExOyBrKyspIHtcclxuICB3YWxsUG9zaXRpb25MaXN0LnB1c2goWzAsIGtdKTtcclxufVxyXG5mb3IgKGxldCBrID0gMTsgayA8IDExOyBrKyspIHtcclxuICB3YWxsUG9zaXRpb25MaXN0LnB1c2goWzExLCBrXSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGQ2KG51bWJlck9mUm9sbHM6IG51bWJlcik6bnVtYmVyIHtcclxuICBsZXQgdG90YWw6IG51bWJlciA9IDA7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1iZXJPZlJvbGxzOyBpKyspIHtcclxuICAgIHRvdGFsICs9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDYpICsgMTtcclxuICB9XHJcbiAgcmV0dXJuIHRvdGFsO1xyXG59XHJcbmZ1bmN0aW9uIHVwZGF0ZUdhbWVTdGF0ZSgpIHtcclxuICBjbGVhckNhbnZhcygpO1xyXG4gIHJlbmRlckZsb29yKCk7XHJcbiAgcmVuZGVyV2FsbHMoKTtcclxuICBwcmludHN0YXRzKCk7XHJcbiAgcmVuZGVySGVybygpO1xyXG4gIHJlbmRlckFsbE1vbnN0ZXJzKCk7XHJcbiAgcmVzZXRNb25zdGVyTW92ZVRpbWVyKCk7XHJcbiAgcmVuZGVySGVybygpO1xyXG4gIGNoZWNrSWZCYXR0bGVGb3JNb25zdGVycygpO1xyXG4gIGNoZWNrSWZIZXJvRGVhZCgpO1xyXG4gIGNoZWNrUm91bmRFbmQoKTtcclxufVxyXG5mdW5jdGlvbiByZXNldE1vbnN0ZXJNb3ZlVGltZXIoKSB7XHJcbiAgaWYgKG1vbnN0ZXJzTW92ZSkge1xyXG4gICAgbW9uc3RlcnNNb3ZlID0gZmFsc2U7XHJcbiAgfSBlbHNlIHtcclxuICAgIG1vbnN0ZXJzTW92ZSA9IHRydWU7XHJcbiAgfVxyXG59XHJcbmZ1bmN0aW9uIHJlbmRlckFsbE1vbnN0ZXJzKCkge1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbW9uc3Rlckxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgIHJlbmRlck1vbnN0ZXIobW9uc3Rlckxpc3RbaV0pO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2hlY2tSb3VuZEVuZCgpIHtcclxuICBpZiAoYm9zc01vbnN0ZXIuYWxpdmUgPT0gZmFsc2UgJiYgaGVyb1N0YXRzLmhhc0tleSkge1xyXG4gICAgaGVyb1N0YXRzLnggPSAwO1xyXG4gICAgaGVyb1N0YXRzLnkgPSAwO1xyXG4gICAgaGVyb1N0YXRzLmhhc0tleSA9IGZhbHNlO1xyXG4gICAgbGV0IGhwR2FpblJhbmRvbWl6ZXIgPSBNYXRoLnJhbmRvbSgpICogMTAwICsgMTtcclxuICAgIGNvbnNvbGUubG9nKGhwR2FpblJhbmRvbWl6ZXIpO1xyXG4gICAgaWYgKGhwR2FpblJhbmRvbWl6ZXIgPD0gMTApIHtcclxuICAgICAgaGVyb1N0YXRzLmN1cnJlbnRIUCA9IGhlcm9TdGF0cy5tYXhIUDtcclxuICAgICAgY29uc29sZS5sb2coJ0Z1bGwgSFAgcmVzdG9yZWQhJyk7XHJcbiAgICB9XHJcbiAgICBpZiAoNDAgPj0gaHBHYWluUmFuZG9taXplciAmJiBocEdhaW5SYW5kb21pemVyID4gMTApIHtcclxuICAgICAgaGVyb1N0YXRzLmN1cnJlbnRIUCA9XHJcbiAgICAgICAgaGVyb1N0YXRzLmN1cnJlbnRIUCArIE1hdGguZmxvb3IoaGVyb1N0YXRzLm1heEhQIC8gMyk7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdBIHRoaXJkIG9mIEhQIHJlc3RvcmVkIScpO1xyXG4gICAgfVxyXG4gICAgaWYgKGhwR2FpblJhbmRvbWl6ZXIgPiA0MCkge1xyXG4gICAgICBoZXJvU3RhdHMuY3VycmVudEhQID1cclxuICAgICAgICBoZXJvU3RhdHMuY3VycmVudEhQICsgTWF0aC5mbG9vcihoZXJvU3RhdHMubWF4SFAgLyAxMCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdBIHRlbnRoIG9mIEhQIHJlc3RvcmVkIScpO1xyXG4gICAgfVxyXG4gICAgaWYgKGhlcm9TdGF0cy5jdXJyZW50SFAgPiBoZXJvU3RhdHMubWF4SFApIHtcclxuICAgICAgaGVyb1N0YXRzLmN1cnJlbnRIUCA9IGhlcm9TdGF0cy5tYXhIUDtcclxuICAgIH1cclxuICAgIG1vbnN0ZXJMZXZlbCsrO1xyXG5cclxuICAgIGZvciAobGV0IG1vbnN0ZXIgb2YgbW9uc3Rlckxpc3QpIHtcclxuICAgICAgbW9uc3Rlci5pbml0KCk7XHJcbiAgICB9XHJcbiAgICBhc3NpZ25LZXkoKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFzc2lnbktleSgpIHtcclxuICBtb25zdGVySGFzS2V5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMykgKyAxO1xyXG4gIGNvbnNvbGUubG9nKG1vbnN0ZXJIYXNLZXkpO1xyXG59XHJcbmZ1bmN0aW9uIGNoZWNrSWZIZXJvRGVhZCgpIHtcclxuICBpZiAoaGVyb1N0YXRzLmN1cnJlbnRIUCA8IDEpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICB9XHJcbn1cclxuZnVuY3Rpb24gbW9uc3RlckRlc3RpbmF0aW9uKGlucHV0OiBudW1iZXIsIHNwZWNpbWVuOiBNb25zdGVyKSB7XHJcbiAgc3dpdGNoIChpbnB1dCkge1xyXG4gICAgY2FzZSAxOiAvL2Rvd25cclxuICAgICAgZGVzdGluYXRpb24gPSBbc3BlY2ltZW4ueCwgc3BlY2ltZW4ueSArIDFdO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMjogLy91cFxyXG4gICAgICBkZXN0aW5hdGlvbiA9IFtzcGVjaW1lbi54LCBzcGVjaW1lbi55IC0gMV07XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAzOiAvL2xlZnRcclxuICAgICAgZGVzdGluYXRpb24gPSBbc3BlY2ltZW4ueCAtIDEsIHNwZWNpbWVuLnldO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgNDogLy9yaWdodFxyXG4gICAgICBkZXN0aW5hdGlvbiA9IFtzcGVjaW1lbi54ICsgMSwgc3BlY2ltZW4ueV07XHJcbiAgICAgIGJyZWFrO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXR0ZW1wdFRvTW92ZU1vbnN0ZXIoc3BlY2ltZW46IE1vbnN0ZXIpIHtcclxuICBpZiAobW9uc3RlcnNNb3ZlKSB7XHJcbiAgICBsZXQgZGlyZWN0aW9uOiBudW1iZXIgPSAwO1xyXG4gICAgbGV0IGhhc01vdmVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBsZXQgc3RvcElmSW5maW5pdGU6IG51bWJlciA9IDA7XHJcbiAgICB3aGlsZSAoIWhhc01vdmVkKSB7XHJcbiAgICAgIGlmIChzdG9wSWZJbmZpbml0ZSA+IDEwMCkgYnJlYWs7XHJcbiAgICAgIGRpcmVjdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDQpICsgMTtcclxuICAgICAgbW9uc3RlckRlc3RpbmF0aW9uKGRpcmVjdGlvbiwgc3BlY2ltZW4pO1xyXG5cclxuICAgICAgaWYgKGNoZWNrSWZNb3ZlQWxsb3dlZCgpICYmIGNoZWNrT3RoZXJNb25zdGVycyhzcGVjaW1lbikpIHtcclxuICAgICAgICBzcGVjaW1lbi54ID0gZGVzdGluYXRpb25bMF07XHJcbiAgICAgICAgc3BlY2ltZW4ueSA9IGRlc3RpbmF0aW9uWzFdO1xyXG4gICAgICAgIGhhc01vdmVkID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBzdG9wSWZJbmZpbml0ZSsrO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2hlY2tPdGhlck1vbnN0ZXJzKHNwZWNpbWVuOiBNb25zdGVyKSB7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb25zdGVyTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKGkgPT0gc3BlY2ltZW4ub3JkZXJOdW1iZXIpIGNvbnRpbnVlO1xyXG4gICAgaWYgKFxyXG4gICAgICBtb25zdGVyTGlzdFtpXS54ID09IGRlc3RpbmF0aW9uWzBdICYmXHJcbiAgICAgIG1vbnN0ZXJMaXN0W2ldLnkgPT0gZGVzdGluYXRpb25bMV1cclxuICAgICkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiB0cnVlO1xyXG59XHJcbmZ1bmN0aW9uIHJlbmRlck1vbnN0ZXIoc3BlY2ltZW46IE1vbnN0ZXIpIHtcclxuICBpZiAoc3BlY2ltZW4uYWxpdmUpIHtcclxuICAgIGF0dGVtcHRUb01vdmVNb25zdGVyKHNwZWNpbWVuKTtcclxuICAgIGN0eC5kcmF3SW1hZ2UoXHJcbiAgICAgIGV2YWwoc3BlY2ltZW4uaW1hZ2UpLFxyXG4gICAgICAoc3BlY2ltZW4ueCAtIDEpICogdGlsZVdpZHRoLFxyXG4gICAgICAoc3BlY2ltZW4ueSAtIDEpICogdGlsZVdpZHRoLFxyXG4gICAgICB0aWxlV2lkdGgsXHJcbiAgICAgIHRpbGVXaWR0aFxyXG4gICAgKTtcclxuICB9IGVsc2Uge1xyXG4gICAgY3R4LmRyYXdJbWFnZShcclxuICAgICAgYmxvb2QsXHJcbiAgICAgIChzcGVjaW1lbi54IC0gMSkgKiB0aWxlV2lkdGgsXHJcbiAgICAgIChzcGVjaW1lbi55IC0gMSkgKiB0aWxlV2lkdGgsXHJcbiAgICAgIHRpbGVXaWR0aCxcclxuICAgICAgdGlsZVdpZHRoXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4vKlxyXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyRmxvb3IoKSB7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcclxuICAgICAgY3R4LmRyYXdJbWFnZShmbG9vciwgaSAqIHRpbGVXaWR0aCwgaiAqIHRpbGVXaWR0aCwgdGlsZVdpZHRoLCB0aWxlV2lkdGgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4qL1xyXG5mdW5jdGlvbiByZW5kZXJXYWxscygpIHtcclxuICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgd2FsbFBvc2l0aW9uTGlzdC5sZW5ndGggLSA0MDsgaSsrKSB7XHJcbiAgICByZW5kZXJXYWxsVGlsZSh3YWxsUG9zaXRpb25MaXN0W2ldWzBdIC0gMSwgd2FsbFBvc2l0aW9uTGlzdFtpXVsxXSAtIDEpO1xyXG4gIH1cclxufVxyXG5mdW5jdGlvbiByZW5kZXJXYWxsVGlsZSh4UG9zaXRpb246IG51bWJlciwgeVBvc2l0aW9uOiBudW1iZXIpIHtcclxuICBjdHguZHJhd0ltYWdlKFxyXG4gICAgd2FsbCxcclxuICAgIHhQb3NpdGlvbiAqIHRpbGVXaWR0aCxcclxuICAgIHlQb3NpdGlvbiAqIHRpbGVXaWR0aCxcclxuICAgIHRpbGVXaWR0aCxcclxuICAgIHRpbGVXaWR0aFxyXG4gICk7XHJcbn1cclxuZnVuY3Rpb24gcHJpbnRzdGF0cygpIHtcclxuICBjdHguZm9udCA9ICcyMHB4IEFyaWFsJztcclxuICBjdHguZmlsbFRleHQoJ1N0YXRzOicsIDY2MCwgMjUpO1xyXG4gIGlmIChoZXJvU3RhdHMuaGFzS2V5KSB7XHJcbiAgICBjdHguZHJhd0ltYWdlKGtleSwgODYwLCAyNSwgMTI1LCA1Mik7XHJcbiAgfVxyXG4gIGN0eC5maWxsVGV4dChgSGVybyBMZXZlbDogJHtoZXJvU3RhdHMubGV2ZWx9YCwgNjYwLCA1MCk7XHJcbiAgY3R4LmZpbGxUZXh0KFxyXG4gICAgYEhQOiAgICAgICAgICR7aGVyb1N0YXRzLmN1cnJlbnRIUH0vJHtoZXJvU3RhdHMubWF4SFB9YCxcclxuICAgIDY2MCxcclxuICAgIDc1XHJcbiAgKTtcclxuICBjdHguZmlsbFRleHQoYERQOiAgICAgICAgICR7aGVyb1N0YXRzLkRQfWAsIDY2MCwgMTAwKTtcclxuICBjdHguZmlsbFRleHQoYFNQOiAgICAgICAgICR7aGVyb1N0YXRzLlNQfWAsIDY2MCwgMTI1KTtcclxuICBjdHguZmlsbFRleHQoYE1vbnN0ZXIgTGV2ZWw6JHttb25zdGVyTGV2ZWx9YCwgNjYwLCAxNzUpO1xyXG4gIGlmIChib3NzTW9uc3Rlci5hbGl2ZSkge1xyXG4gICAgY3R4LmZpbGxUZXh0KGBCb3NzIGlzIHN0aWxsIGFsaXZlIWAsIDY2MCwgMjAwKTtcclxuICB9IGVsc2Uge1xyXG4gICAgY3R4LmZpbGxUZXh0KGBCb3NzIGlzIGRlYWQuIENvbmdyYXRzLmAsIDY2MCwgMjAwKTtcclxuICB9XHJcbiAgY3R4LmZpbGxUZXh0KGBIUDogICAgICAgJHtib3NzTW9uc3Rlci5IUH1gLCA2NjAsIDIyNSk7XHJcbiAgY3R4LmZpbGxUZXh0KGBEUDogICAgICAgJHtib3NzTW9uc3Rlci5EUH1gLCA2NjAsIDI1MCk7XHJcbiAgY3R4LmZpbGxUZXh0KGBTUDogICAgICAgJHtib3NzTW9uc3Rlci5TUH1gLCA2NjAsIDI3NSk7XHJcbiAgaWYgKGhlcm9TdGF0cy5oYXNLZXkpIHtcclxuICAgIGN0eC5maWxsVGV4dChgWW91IGhhdmUgdGhlIGtleSB0byBuZXh0IGxldmVsIWAsIDY2MCwgMzAwKTtcclxuICB9IGVsc2Uge1xyXG4gICAgY3R4LmZpbGxUZXh0KGBZb3UgaGF2ZW50IGZvdW5kIHRoZSBrZXkgeWV0LmAsIDY2MCwgMzAwKTtcclxuICB9XHJcbiAgY3R4LmZvbnQgPSAnMTNweCBBcmlhbCc7XHJcbiAgY3R4LmZpbGxUZXh0KFxyXG4gICAgYE9uZSBvZiB0aGUgU2tlbGV0b25zIGhhcyBhIGtleS4gVG8gd2luIGEgbGV2ZWwsIHlvdSBtdXN0IGZpbmQgdGhlIGtleWAsXHJcbiAgICA2NjAsXHJcbiAgICA1MDBcclxuICApO1xyXG4gIGN0eC5maWxsVGV4dChgYW5kIGRlZmVhdCB0aGUgQm9zcy5gLCA2NjAsIDUxNSk7XHJcbiAgY3R4LmZpbGxUZXh0KFxyXG4gICAgYFdoZW5ldmVyIHlvdSB3aW4gYSBsZXZlbCwgbWFwIHdpbGwgcmVzZXQsIHlvdSBrZWVwIHlvdXIgcHJvZ3Jlc3MgYCxcclxuICAgIDY2MCxcclxuICAgIDUzMFxyXG4gICk7XHJcbiAgY3R4LmZpbGxUZXh0KGBidXQgdGhlIGxldmVsIG9mIG1vbnN0ZXJzIGdvZXMgdXAsIHNvIGJlIGNhcmVmdWwhYCwgNjYwLCA1NDUpO1xyXG4gIGN0eC5maWxsVGV4dChgV2hlbiB5b3VyIEhQIGRyb3BzIHRvIDAsIHlvdSBkaWUgYW5kIGdhbWUgcmVzdGFydHMuYCwgNjYwLCA1NjApO1xyXG4gIGN0eC5maWxsVGV4dChcclxuICAgIGBLaWxsaW5nIFNrZWxldG9ucyBpbmNyZWFzZXMgeW91ciBoZXJvIGxldmVsLCB1c2UgdGhlbSB0byBnZXQgc3Ryb25nZXIgZWFybHkgb24uYCxcclxuICAgIDY2MCxcclxuICAgIDU3NVxyXG4gICk7XHJcbiAgY3R4LmZpbGxUZXh0KGBXaW5uaW5nIGEgbGV2ZWwgaGFzIGEgY2hhbmNlIHRvIHJlc3RvcmUgeW91ciBIUC5gLCA2NjAsIDU5MCk7XHJcbn1cclxuZnVuY3Rpb24gYXR0ZW1wdFRvTW92ZUhlcm8oKSB7XHJcbiAgbWFrZURlc3RpbmF0aW9uKCk7XHJcbiAgY2hlY2tJZkJhdHRsZSgpO1xyXG4gIHJldHVybiBjaGVja0lmTW92ZUFsbG93ZWQoKTtcclxufVxyXG5mdW5jdGlvbiBjaGVja0lmTW92ZUFsbG93ZWQoKSB7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB3YWxsUG9zaXRpb25MaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIGRlc3RpbmF0aW9uWzBdID09IHdhbGxQb3NpdGlvbkxpc3RbaV1bMF0gJiZcclxuICAgICAgZGVzdGluYXRpb25bMV0gPT0gd2FsbFBvc2l0aW9uTGlzdFtpXVsxXVxyXG4gICAgKVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIHJldHVybiB0cnVlO1xyXG59XHJcbmZ1bmN0aW9uIGJhdHRsZShtb25zdGVyOiBNb25zdGVyKSB7XHJcbiAgd2hpbGUgKG1vbnN0ZXIuSFAgPiAwKSB7XHJcbiAgICBpZiAoaGVyb1N0YXRzLmN1cnJlbnRIUCA8IDEpIHtcclxuICAgICAgcmV0dXJuIGFsZXJ0KCdZb3UgZGllZCEnKTtcclxuICAgIH1cclxuICAgIGxldCBoZXJvQXR0YWNrOiBudW1iZXIgPSBoZXJvU3RhdHMuU1AgKyBkNigxKTtcclxuICAgIGxldCBtb25zdGVyQXR0YWNrOiBudW1iZXIgPSBtb25zdGVyLlNQICsgZDYoMSk7XHJcbiAgICBpZiAoaGVyb0F0dGFjayA+IG1vbnN0ZXIuRFApIHtcclxuICAgICAgbW9uc3Rlci5IUCAtPSBoZXJvQXR0YWNrIC0gbW9uc3Rlci5EUDtcclxuICAgIH1cclxuICAgIGlmIChtb25zdGVyQXR0YWNrID4gaGVyb1N0YXRzLkRQKSB7XHJcbiAgICAgIGhlcm9TdGF0cy5jdXJyZW50SFAgLT0gbW9uc3RlckF0dGFjayAtIGhlcm9TdGF0cy5EUDtcclxuICAgIH1cclxuICB9XHJcbiAgbW9uc3Rlci5hbGl2ZSA9IGZhbHNlO1xyXG4gIGxldCBocEJvb3N0OiBudW1iZXIgPSBkNigxKTtcclxuICBoZXJvU3RhdHMubWF4SFAgKz0gaHBCb29zdDtcclxuICBoZXJvU3RhdHMuY3VycmVudEhQICs9IGhwQm9vc3Q7XHJcbiAgaGVyb1N0YXRzLkRQICs9IDE7XHJcbiAgaGVyb1N0YXRzLlNQICs9IDE7XHJcbiAgaGVyb1N0YXRzLmxldmVsKys7XHJcbiAgaWYgKG1vbnN0ZXIub3JkZXJOdW1iZXIgPT0gbW9uc3Rlckhhc0tleSkge1xyXG4gICAgaGVyb1N0YXRzLmhhc0tleSA9IHRydWU7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja0lmQmF0dGxlKCkge1xyXG4gIGZvciAobGV0IG1vbnN0ZXIgb2YgbW9uc3Rlckxpc3QpIHtcclxuICAgIGlmIChcclxuICAgICAgZGVzdGluYXRpb25bMF0gPT0gbW9uc3Rlci54ICYmXHJcbiAgICAgIGRlc3RpbmF0aW9uWzFdID09IG1vbnN0ZXIueSAmJlxyXG4gICAgICBtb25zdGVyLmFsaXZlXHJcbiAgICApIHtcclxuICAgICAgYmF0dGxlKG1vbnN0ZXIpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2hlY2tJZkJhdHRsZUZvck1vbnN0ZXJzKCkge1xyXG4gIGZvciAobGV0IG1vbnN0ZXIgb2YgbW9uc3Rlckxpc3QpIHtcclxuICAgIGlmIChcclxuICAgICAgaGVyb1N0YXRzLnggKyAxID09IG1vbnN0ZXIueCAmJlxyXG4gICAgICBoZXJvU3RhdHMueSArIDEgPT0gbW9uc3Rlci55ICYmXHJcbiAgICAgIG1vbnN0ZXIuYWxpdmVcclxuICAgICkge1xyXG4gICAgICBiYXR0bGUobW9uc3Rlcik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBtYWtlRGVzdGluYXRpb24oKSB7XHJcbiAgaWYgKGhlcm9TdGF0cy5mYWNpbmcgPT0gJ2hlcm9Eb3duJylcclxuICAgIHJldHVybiAoZGVzdGluYXRpb24gPSBbaGVyb1N0YXRzLnggKyAxLCBoZXJvU3RhdHMueSArIDJdKTtcclxuICBpZiAoaGVyb1N0YXRzLmZhY2luZyA9PSAnaGVyb1VwJylcclxuICAgIHJldHVybiAoZGVzdGluYXRpb24gPSBbaGVyb1N0YXRzLnggKyAxLCBoZXJvU3RhdHMueV0pO1xyXG4gIGlmIChoZXJvU3RhdHMuZmFjaW5nID09ICdoZXJvTGVmdCcpXHJcbiAgICByZXR1cm4gKGRlc3RpbmF0aW9uID0gW2hlcm9TdGF0cy54LCBoZXJvU3RhdHMueSArIDFdKTtcclxuICBpZiAoaGVyb1N0YXRzLmZhY2luZyA9PSAnaGVyb1JpZ2h0JylcclxuICAgIHJldHVybiAoZGVzdGluYXRpb24gPSBbaGVyb1N0YXRzLnggKyAyLCBoZXJvU3RhdHMueSArIDFdKTtcclxufVxyXG5mdW5jdGlvbiByZW5kZXJIZXJvKCkge1xyXG4gIGN0eC5kcmF3SW1hZ2UoXHJcbiAgICBldmFsKGhlcm9TdGF0cy5mYWNpbmcpLFxyXG4gICAgaGVyb1N0YXRzLnggKiB0aWxlV2lkdGgsXHJcbiAgICBoZXJvU3RhdHMueSAqIHRpbGVXaWR0aCxcclxuICAgIHRpbGVXaWR0aCxcclxuICAgIHRpbGVXaWR0aFxyXG4gICk7XHJcbn1cclxuZnVuY3Rpb24gY2xlYXJDYW52YXMoKSB7XHJcbiAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG59XHJcblxyXG51cGRhdGVHYW1lU3RhdGUoKTtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbiAoa2V5SGl0KSB7XHJcbiAgc3dpdGNoIChrZXlIaXQua2V5KSB7XHJcbiAgICBjYXNlICdBcnJvd0Rvd24nOlxyXG4gICAgICBoZXJvU3RhdHMuZmFjaW5nID0gJ2hlcm9Eb3duJztcclxuICAgICAgaWYgKGF0dGVtcHRUb01vdmVIZXJvKCkpIHtcclxuICAgICAgICBoZXJvU3RhdHMueSsrO1xyXG4gICAgICB9XHJcbiAgICAgIHVwZGF0ZUdhbWVTdGF0ZSgpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ0Fycm93VXAnOlxyXG4gICAgICBoZXJvU3RhdHMuZmFjaW5nID0gJ2hlcm9VcCc7XHJcbiAgICAgIGlmIChhdHRlbXB0VG9Nb3ZlSGVybygpKSB7XHJcbiAgICAgICAgaGVyb1N0YXRzLnktLTtcclxuICAgICAgfVxyXG4gICAgICB1cGRhdGVHYW1lU3RhdGUoKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdBcnJvd0xlZnQnOlxyXG4gICAgICBoZXJvU3RhdHMuZmFjaW5nID0gJ2hlcm9MZWZ0JztcclxuICAgICAgaWYgKGF0dGVtcHRUb01vdmVIZXJvKCkpIHtcclxuICAgICAgICBoZXJvU3RhdHMueC0tO1xyXG4gICAgICB9XHJcbiAgICAgIHVwZGF0ZUdhbWVTdGF0ZSgpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxyXG4gICAgICBoZXJvU3RhdHMuZmFjaW5nID0gJ2hlcm9SaWdodCc7XHJcbiAgICAgIGlmIChhdHRlbXB0VG9Nb3ZlSGVybygpKSB7XHJcbiAgICAgICAgaGVyb1N0YXRzLngrKztcclxuICAgICAgfVxyXG4gICAgICB1cGRhdGVHYW1lU3RhdGUoKTtcclxuICAgICAgYnJlYWs7XHJcbiAgfVxyXG59KTtcclxuIiwiaW1wb3J0IHsvKndhbGxQb3NpdGlvbkxpc3QsIGhlcm9Eb3duLGhlcm9MZWZ0LGhlcm9SaWdodCxoZXJvVXAsKi9mbG9vcixjdHgsLyp3YWxsLGJvc3MsY2FudmFzLHNrZWxldG9uKi99IGZyb20gJy4vdmFyaWFibGVzJztcclxuLy9sZXQgZGVzdGluYXRpb246IG51bWJlcltdID0gW107XHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJGbG9vcigpOnZvaWQge1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xyXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XHJcbiAgICAgIGN0eC5kcmF3SW1hZ2UoZmxvb3IsIGkgKiA2NSwgaiAqIDY1LCA2NSwgNjUpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLypcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJXYWxscygpIHtcclxuICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgd2FsbFBvc2l0aW9uTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgcmVuZGVyV2FsbFRpbGUod2FsbFBvc2l0aW9uTGlzdFtpXVswXSAtIDEsIHdhbGxQb3NpdGlvbkxpc3RbaV1bMV0gLSAxKTtcclxuICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcldhbGxUaWxlKHhQb3NpdGlvbjogbnVtYmVyLCB5UG9zaXRpb246IG51bWJlcikge1xyXG4gIGN0eC5kcmF3SW1hZ2Uod2FsbCwgeFBvc2l0aW9uICogNjUsIHlQb3NpdGlvbiAqIDY1LCA2NSwgNjUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyTW9uc3RlcigpIHtcclxuICBjdHguZHJhd0ltYWdlKGJvc3MsIDQgKiA2NSwgMyAqIDY1LCA2NSwgNjUpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJTa2VsZXRvbigpIHtcclxuICBjdHguZHJhd0ltYWdlKHNrZWxldG9uLCA0ICogNjUsIDggKiA2NSwgNjUsIDY1KTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tJZk1vdmVBbGxvd2VkKCkge1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgd2FsbFBvc2l0aW9uTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgbWFrZURlc3RpbmF0aW9uKCk7XHJcbiAgICBpZiAoXHJcbiAgICAgIGRlc3RpbmF0aW9uWzBdID09IHdhbGxQb3NpdGlvbkxpc3RbaV1bMF0gJiZcclxuICAgICAgZGVzdGluYXRpb25bMV0gPT0gd2FsbFBvc2l0aW9uTGlzdFtpXVsxXVxyXG4gICAgKVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIHJldHVybiB0cnVlO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBtYWtlRGVzdGluYXRpb24oKSB7XHJcbiAgaWYgKGhlcm9Db29yZGluYXRlcy5mYWNpbmcgPT0gXCJoZXJvRG93blwiKVxyXG4gICAgcmV0dXJuIChkZXN0aW5hdGlvbiA9IFtoZXJvQ29vcmRpbmF0ZXMueCArIDEsIGhlcm9Db29yZGluYXRlcy55ICsgMl0pO1xyXG4gIGlmIChoZXJvQ29vcmRpbmF0ZXMuZmFjaW5nID09IFwiaGVyb1VwXCIpXHJcbiAgICByZXR1cm4gKGRlc3RpbmF0aW9uID0gW2hlcm9Db29yZGluYXRlcy54ICsgMSwgaGVyb0Nvb3JkaW5hdGVzLnldKTtcclxuICBpZiAoaGVyb0Nvb3JkaW5hdGVzLmZhY2luZyA9PSBcImhlcm9MZWZ0XCIpXHJcbiAgICByZXR1cm4gKGRlc3RpbmF0aW9uID0gW2hlcm9Db29yZGluYXRlcy54LCBoZXJvQ29vcmRpbmF0ZXMueSArIDFdKTtcclxuICBpZiAoaGVyb0Nvb3JkaW5hdGVzLmZhY2luZyA9PSBcImhlcm9SaWdodFwiKVxyXG4gICAgcmV0dXJuIChkZXN0aW5hdGlvbiA9IFtoZXJvQ29vcmRpbmF0ZXMueCArIDIsIGhlcm9Db29yZGluYXRlcy55ICsgMV0pO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJIZXJvKCkge1xyXG4gIGlmIChoZXJvQ29vcmRpbmF0ZXMueCA8IDApIHtcclxuICAgIGhlcm9Db29yZGluYXRlcy54ID0gMDtcclxuICB9XHJcbiAgaWYgKGhlcm9Db29yZGluYXRlcy55IDwgMCkge1xyXG4gICAgaGVyb0Nvb3JkaW5hdGVzLnkgPSAwO1xyXG4gIH1cclxuICBpZiAoaGVyb0Nvb3JkaW5hdGVzLnggPiA5KSB7XHJcbiAgICBoZXJvQ29vcmRpbmF0ZXMueCA9IDk7XHJcbiAgfVxyXG4gIGlmIChoZXJvQ29vcmRpbmF0ZXMueSA+IDkpIHtcclxuICAgIGhlcm9Db29yZGluYXRlcy55ID0gOTtcclxuICB9XHJcblxyXG4gIGN0eC5kcmF3SW1hZ2UoXHJcbiAgICBldmFsKGhlcm9Db29yZGluYXRlcy5mYWNpbmcpLFxyXG4gICAgaGVyb0Nvb3JkaW5hdGVzLnggKiA2NSxcclxuICAgIGhlcm9Db29yZGluYXRlcy55ICogNjUsXHJcbiAgICA2NSxcclxuICAgIDY1XHJcbiAgKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJDYW52YXMoKSB7XHJcbiAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG59Ki9cclxuIiwiXHJcbmltcG9ydCB7ZDZ9IGZyb20gJy4vaW5kZXgnXHJcbmV4cG9ydCBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbi1jYW52YXMnKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcclxuZXhwb3J0IGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpIGFzIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuZXhwb3J0IGxldCBza2VsZXRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdza2VsZXRvbicpIGFzIEhUTUxJbWFnZUVsZW1lbnQ7XHJcbmV4cG9ydCBsZXQgaGVyb1VwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlcm8tdXAnKSBhcyBIVE1MSW1hZ2VFbGVtZW50O1xyXG5leHBvcnQgbGV0IGhlcm9Eb3duID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlcm8tZG93bicpIGFzIEhUTUxJbWFnZUVsZW1lbnQ7XHJcbmV4cG9ydCBsZXQgaGVyb0xlZnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVyby1sZWZ0JykgYXMgSFRNTEltYWdlRWxlbWVudDtcclxuZXhwb3J0IGxldCBoZXJvUmlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVyby1yaWdodCcpIGFzIEhUTUxJbWFnZUVsZW1lbnQ7XHJcbmV4cG9ydCBsZXQgZmxvb3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmxvb3InKSBhcyBIVE1MSW1hZ2VFbGVtZW50O1xyXG5leHBvcnQgbGV0IHdhbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2FsbCcpIGFzIEhUTUxJbWFnZUVsZW1lbnQ7XHJcbmV4cG9ydCBsZXQgYm9zcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib3NzJykgYXMgSFRNTEltYWdlRWxlbWVudDtcclxuZXhwb3J0IGxldCBibG9vZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdibG9vZCcpIGFzIEhUTUxJbWFnZUVsZW1lbnQ7XHJcbmV4cG9ydCBsZXQga2V5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2tleScpIGFzIEhUTUxJbWFnZUVsZW1lbnQ7XHJcbmV4cG9ydCBsZXQgdGlsZVdpZHRoOiBudW1iZXIgPSA2NTtcclxuXHJcblxyXG5cclxuZXhwb3J0IGxldCBoZXJvU3RhdHMgPSB7XHJcbiAgeDogMCxcclxuICB5OiAwLFxyXG4gIGZhY2luZzogJ2hlcm9Eb3duJyxcclxuICBsZXZlbDogMSxcclxuICBtYXhIUDogZDYoMykgKyAyMCxcclxuICBjdXJyZW50SFA6IDYsXHJcbiAgRFA6IGQ2KDIpLFxyXG4gIFNQOiBkNigxKSArIDcsXHJcbiAgaGFzS2V5OiBmYWxzZSxcclxufTtcclxuZXhwb3J0IGxldCBza2VsZXRvblNldHVwID0gW1xyXG4gIFs4LCA2XSxcclxuICBbNSwgNF0sXHJcbiAgIFs1LCA5XSxcclxuXTtcclxuXHJcblxyXG5leHBvcnQgbGV0IHdhbGxQb3NpdGlvbkxpc3Q6IG51bWJlcltdW10gPSBbXHJcbiAgWzQsIDFdLFxyXG4gIFs0LCAyXSxcclxuICBbNCwgM10sXHJcbiAgWzMsIDNdLFxyXG4gIFsyLCAzXSxcclxuICBbMSwgNV0sXHJcbiAgWzIsIDVdLFxyXG4gIFszLCA1XSxcclxuICBbNCwgNV0sXHJcbiAgWzIsIDZdLFxyXG4gIFsyLCA3XSxcclxuICBbNCwgNl0sXHJcbiAgWzQsIDddLFxyXG4gIFs2LCAyXSxcclxuICBbNiwgM10sXHJcbiAgWzYsIDRdLFxyXG4gIFs2LCA1XSxcclxuICBbNywgNV0sXHJcbiAgWzgsIDVdLFxyXG4gIFs5LCA1XSxcclxuICBbOCwgMl0sXHJcbiAgWzksIDJdLFxyXG4gIFs4LCAzXSxcclxuICBbOSwgM10sXHJcbiAgWzYsIDddLFxyXG4gIFs2LCA4XSxcclxuICBbNywgN10sXHJcbiAgWzcsIDhdLFxyXG4gIFs0LCAxMF0sXHJcbiAgWzIsIDldLFxyXG4gIFszLCA5XSxcclxuICBbNCwgOV0sXHJcbiAgWzYsIDEwXSxcclxuICBbNywgMTBdLFxyXG4gIFs5LCA3XSxcclxuICBbOSwgOF0sXHJcbiAgWzksIDldLFxyXG5dOyJdLCJzb3VyY2VSb290IjoiIn0=