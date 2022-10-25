(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Door = exports.Skeleton = exports.Monster = void 0;
var random_1 = require("./random");
var variables_1 = require("./variables");
var Monster = /** @class */ (function () {
    function Monster(order, x, y, image, hp, DP, SP, alive) {
        if (x === void 0) { x = 1; }
        if (y === void 0) { y = 0; }
        if (image === void 0) { image = 'boss'; }
        if (hp === void 0) { hp = 0; }
        if (DP === void 0) { DP = 0; }
        if (SP === void 0) { SP = 0; }
        if (alive === void 0) { alive = true; }
        this.orderNumber = order;
        this.x = x;
        this.y = y;
        this.image = image;
        this.HP = hp;
        this.DP = DP;
        this.SP = SP;
        this.alive = alive;
    }
    Monster.prototype.pickASpot = function (x, y) {
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
                if (!(0, random_1.checkIfNotFloor)(x - j, y - i)) {
                    this.x = x - j;
                    this.y = y - i;
                    console.log("".concat(this.image).concat(this.orderNumber, " placed at ").concat(this.x, ", ").concat(this.y));
                    return;
                }
                console.log("".concat(this.image).concat(this.orderNumber, " not placed at ").concat(x - j, ", ").concat(y - i));
            }
        }
        console.log("".concat(this.image).concat(this.orderNumber, " incorrectly placed, ").concat(this.x, ", ").concat(this.y));
        return;
    };
    Monster.prototype.init = function () {
        this.pickASpot(10, 10);
        this.alive = true;
        this.HP = 15;
        this.DP = 4;
        this.SP = 6;
    };
    return Monster;
}());
exports.Monster = Monster;
var Skeleton = /** @class */ (function (_super) {
    __extends(Skeleton, _super);
    function Skeleton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Skeleton.prototype.init = function () {
        this.image = 'skeleton';
        this.pickASpot(variables_1.skeletonSetup[this.orderNumber - 1][0], variables_1.skeletonSetup[this.orderNumber - 1][1]);
        this.alive = true;
        this.HP = 10;
        this.DP = 1;
        this.SP = 2;
    };
    return Skeleton;
}(Monster));
exports.Skeleton = Skeleton;
var Door = /** @class */ (function (_super) {
    __extends(Door, _super);
    function Door() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Door.prototype.init = function () {
        this.image = 'door';
        this.pickASpot(random_1.mapSize, random_1.mapSize);
        this.alive = true;
        this.HP = 0;
        this.DP = 0;
        this.SP = 0;
    };
    return Door;
}(Monster));
exports.Door = Door;

},{"./random":6,"./variables":8}],2:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.setHeroLevel = exports.checkIfBattle = exports.makeDestination = exports.blockIfDoor = exports.attemptToMoveHero = exports.renderHero = exports.increaseMapLevel = exports.heroInit = exports.checkIfHeroDead = void 0;
var variables_1 = require("./variables");
var utility_1 = require("./utility");
var index_1 = require("./index");
var random_1 = require("./random");
function checkIfHeroDead() {
    if (variables_1.heroStats.currentHP < 1) {
        (0, utility_1.writeGameLog)('YOU DIED');
        (0, variables_1.resetMonstersLevel)();
        (0, random_1.setMapSize)();
        (0, random_1.setup)();
        (0, variables_1.resetSpeed)(2000);
        clearInterval(index_1.interval);
        (0, index_1.setMonsterSpeed)();
        heroInit();
        (0, index_1.resetScrolling)();
    }
}
exports.checkIfHeroDead = checkIfHeroDead;
function heroInit() {
    variables_1.heroStats.x = 1;
    variables_1.heroStats.y = 1;
    variables_1.heroStats.hasKey = false;
    variables_1.heroStats.hasPotion = false; //not implemented.
    variables_1.heroStats.facing = 'heroDown';
    variables_1.heroStats.level = 1;
    variables_1.heroStats.neededXP = variables_1.heroXpArray[variables_1.heroStats.level];
    variables_1.heroStats.currentXP = 0;
    variables_1.heroStats.maxHP = 15;
    variables_1.heroStats.currentHP = 15;
    variables_1.heroStats.DP = 3;
    variables_1.heroStats.SP = 5;
    variables_1.heroStats.currentHP = variables_1.heroStats.maxHP;
    variables_1.heroStats.overKillPoints = 0;
    variables_1.heroStats.overKill = false;
}
exports.heroInit = heroInit;
function increaseMapLevel() {
    variables_1.heroStats.x = 1;
    variables_1.heroStats.y = 1;
    variables_1.heroStats.hasKey = false;
    (0, variables_1.updateMonstersLevel)(1);
    if (variables_1.monsterLevel > 1)
        variables_1.monsterList.push(variables_1.skeleton4);
    if (variables_1.monsterLevel > 1)
        variables_1.monsterList.push(variables_1.skeleton5);
}
exports.increaseMapLevel = increaseMapLevel;
function renderHero() {
    variables_1.ctx.drawImage((0, utility_1.getSpriteByName)(variables_1.heroStats.facing), (variables_1.heroStats.x - 1 - index_1.scrollingModifierX) * variables_1.tileWidth, (variables_1.heroStats.y - 1 - index_1.scrollingModifierY) * variables_1.tileWidth, variables_1.tileWidth, variables_1.tileWidth);
}
exports.renderHero = renderHero;
function attemptToMoveHero() {
    makeDestination();
    checkIfBattle();
    if (blockIfDoor())
        return false;
    return (0, utility_1.checkIfMoveAllowed)();
}
exports.attemptToMoveHero = attemptToMoveHero;
function blockIfDoor() {
    if (!variables_1.bossMonster.alive && variables_1.heroStats.hasKey)
        return false;
    if ((0, variables_1.getDestination)()[0] == variables_1.theDoor.x && (0, variables_1.getDestination)()[1] == variables_1.theDoor.y)
        return true;
}
exports.blockIfDoor = blockIfDoor;
function makeDestination() {
    if (variables_1.heroStats.facing == 'heroDown')
        return (0, variables_1.updateDestination)(variables_1.heroStats.x, variables_1.heroStats.y + 1);
    if (variables_1.heroStats.facing == 'heroUp')
        return (0, variables_1.updateDestination)(variables_1.heroStats.x, variables_1.heroStats.y - 1);
    if (variables_1.heroStats.facing == 'heroLeft')
        return (0, variables_1.updateDestination)(variables_1.heroStats.x - 1, variables_1.heroStats.y);
    if (variables_1.heroStats.facing == 'heroRight')
        return (0, variables_1.updateDestination)(variables_1.heroStats.x + 1, variables_1.heroStats.y);
}
exports.makeDestination = makeDestination;
function checkIfBattle() {
    for (var _i = 0, monsterList_1 = variables_1.monsterList; _i < monsterList_1.length; _i++) {
        var monster = monsterList_1[_i];
        if ((0, variables_1.getDestination)()[0] == monster.x &&
            (0, variables_1.getDestination)()[1] == monster.y &&
            monster.alive && monster.image != 'door') {
            (0, utility_1.battle)(monster);
        }
    }
}
exports.checkIfBattle = checkIfBattle;
function setHeroLevel() {
    if (variables_1.heroStats.currentXP >= variables_1.heroStats.neededXP) {
        variables_1.heroStats.level++;
        (0, utility_1.writeGameLog)('You leveled up.');
        variables_1.heroStats.currentXP -= variables_1.heroStats.neededXP;
        variables_1.heroStats.neededXP = variables_1.heroXpArray[variables_1.heroStats.level];
        var hpBoost = (0, utility_1.d6)(1);
        variables_1.heroStats.maxHP += hpBoost;
        variables_1.heroStats.currentHP += hpBoost;
        variables_1.heroStats.DP += 1;
        variables_1.heroStats.SP += 2;
    }
}
exports.setHeroLevel = setHeroLevel;

},{"./index":3,"./random":6,"./utility":7,"./variables":8}],3:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.setMonsterSpeed = exports.resetScrolling = exports.interval = exports.scrollingModifierY = exports.scrollingModifierX = void 0;
var random_1 = require("./random");
var utility_1 = require("./utility");
var map_render_1 = require("./map-render");
var hero_1 = require("./hero");
var monster_1 = require("./monster");
var variables_1 = require("./variables");
exports.scrollingModifierX = 0;
exports.scrollingModifierY = 0;
var lastUpdate = Date.now();
var currentTime = Date.now();
var fps = 60;
//setup
window.onload = function () {
    updateGameState();
};
(0, random_1.setup)();
animate();
exports.interval = setInterval(tickController, variables_1.moveEveryXMiliseconds);
//Game loop handling
function tickController() {
    if (variables_1.heroStats.currentHP < 1)
        return;
    for (var _i = 0, monsterList_1 = variables_1.monsterList; _i < monsterList_1.length; _i++) {
        var specimen = monsterList_1[_i];
        (0, monster_1.attemptToMoveMonster)(specimen);
    }
}
function resetScrolling() {
    exports.scrollingModifierX = 0;
    exports.scrollingModifierY = 0;
}
exports.resetScrolling = resetScrolling;
function setMonsterSpeed() {
    exports.interval = setInterval(tickController, variables_1.moveEveryXMiliseconds);
}
exports.setMonsterSpeed = setMonsterSpeed;
function animate() {
    currentTime = Date.now();
    var elapsedTime = currentTime - lastUpdate;
    if (elapsedTime >= 1000 / fps) {
        updateGameState();
        lastUpdate = currentTime;
    }
    requestAnimationFrame(animate);
}
function updateGameState() {
    (0, map_render_1.clearCanvas)();
    (0, map_render_1.renderFloor)();
    (0, map_render_1.renderWalls)();
    //drawDoor();
    (0, map_render_1.printstats)();
    (0, monster_1.renderAllMonsters)();
    (0, hero_1.setHeroLevel)();
    (0, hero_1.renderHero)();
    (0, monster_1.checkIfBattleForMonsters)();
    (0, hero_1.checkIfHeroDead)();
    checkVictoryConditions();
}
//Reset when Map Level finished.
function checkVictoryConditions() {
    if (variables_1.heroStats.x == variables_1.theDoor.x && variables_1.heroStats.y == variables_1.theDoor.y) {
        (0, hero_1.increaseMapLevel)();
        (0, random_1.setMapSize)();
        (0, random_1.emptyMapLists)();
        (0, random_1.randomizeFloor)();
        (0, random_1.adjustWalls)();
        (0, random_1.pushBoundariesToWallList)();
        (0, monster_1.resetMonsters)();
        if (variables_1.moveEveryXMiliseconds > 500) {
            (0, variables_1.updateSpeed)(500);
            (0, utility_1.writeGameLog)("Monster Level Increases. Monsters now move faster!");
        }
        else {
            (0, utility_1.writeGameLog)("Monster Level increases. Maximum speed reached.");
        }
        clearInterval(exports.interval);
        setMonsterSpeed();
        resetScrolling();
    }
}
//manage user input
document.addEventListener('keydown', function (keyHit) {
    if (variables_1.heroStats.currentHP < 1)
        return;
    switch (keyHit.key) {
        case 'ArrowDown':
            variables_1.heroStats.facing = 'heroDown';
            if ((0, hero_1.attemptToMoveHero)()) {
                variables_1.heroStats.y++;
                if (variables_1.heroStats.y > 5 && variables_1.heroStats.y < random_1.mapSize - 4) {
                    exports.scrollingModifierY++;
                    console.log("Y: ".concat(exports.scrollingModifierY));
                }
            }
            break;
        case 'ArrowUp':
            variables_1.heroStats.facing = 'heroUp';
            if ((0, hero_1.attemptToMoveHero)()) {
                variables_1.heroStats.y--;
                if (variables_1.heroStats.y > 4 && variables_1.heroStats.y < random_1.mapSize - 5) {
                    exports.scrollingModifierY--;
                    console.log("Y: ".concat(exports.scrollingModifierY));
                }
            }
            break;
        case 'ArrowLeft':
            variables_1.heroStats.facing = 'heroLeft';
            if ((0, hero_1.attemptToMoveHero)()) {
                variables_1.heroStats.x--;
                if (variables_1.heroStats.x > 4 && variables_1.heroStats.x < random_1.mapSize - 5) {
                    exports.scrollingModifierX--;
                    console.log("X: ".concat(exports.scrollingModifierX));
                }
            }
            break;
        case 'ArrowRight':
            variables_1.heroStats.facing = 'heroRight';
            if ((0, hero_1.attemptToMoveHero)()) {
                variables_1.heroStats.x++;
                if (variables_1.heroStats.x > 5 && variables_1.heroStats.x < random_1.mapSize - 4) {
                    exports.scrollingModifierX++;
                    console.log("X: ".concat(exports.scrollingModifierX));
                }
            }
            break;
        case ' ':
            if (variables_1.heroStats.overKill == false) {
                variables_1.heroStats.overKill = true;
            }
            else if (variables_1.heroStats.overKill == true) {
                variables_1.heroStats.overKill = false;
            }
            break;
    }
});

},{"./hero":2,"./map-render":4,"./monster":5,"./random":6,"./utility":7,"./variables":8}],4:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.printstats = exports.renderWalls = exports.renderFloor = exports.clearCanvas = void 0;
var variables_1 = require("./variables");
var utility_1 = require("./utility");
var random_1 = require("./random");
var index_1 = require("./index");
function clearCanvas() {
    variables_1.ctx.clearRect(0, 0, variables_1.canvas.width, variables_1.canvas.height);
}
exports.clearCanvas = clearCanvas;
function renderFloor() {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            for (var k = 0; k < random_1.floorList.length; k += 2) {
                if (random_1.floorList[k] == i + index_1.scrollingModifierX + 1 && random_1.floorList[k + 1] == j + index_1.scrollingModifierY + 1) {
                    renderFloorTile(i, j);
                }
            }
        }
    }
}
exports.renderFloor = renderFloor;
function renderWalls() {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            for (var k = 0; k < random_1.wallPositionList.length; k++) {
                if (random_1.wallPositionList[k][0] == i + index_1.scrollingModifierX + 1 && random_1.wallPositionList[k][1] == j + index_1.scrollingModifierY + 1) {
                    renderWallTile(i, j);
                }
            }
        }
    }
}
exports.renderWalls = renderWalls;
function renderWallTile(xPosition, yPosition) {
    variables_1.ctx.drawImage(variables_1.wall, xPosition * variables_1.tileWidth, yPosition * variables_1.tileWidth, variables_1.tileWidth, variables_1.tileWidth);
}
function renderFloorTile(xPosition, yPosition) {
    variables_1.ctx.drawImage(variables_1.floor, xPosition * variables_1.tileWidth, yPosition * variables_1.tileWidth, variables_1.tileWidth, variables_1.tileWidth);
}
function printstats() {
    variables_1.ctx.font = '20px Arial';
    variables_1.ctx.fillText('Stats:', 660, 25);
    if (variables_1.heroStats.hasKey) {
        variables_1.ctx.drawImage(variables_1.key, 860, 25, 125, 52);
    }
    if (variables_1.heroStats.hasPotion) {
        variables_1.ctx.drawImage(variables_1.potion, 1000, 25, 90, 90);
    }
    variables_1.ctx.fillText("Hero Level: ".concat(variables_1.heroStats.level), 660, 50);
    variables_1.ctx.fillText("HP:         ".concat(variables_1.heroStats.currentHP, "/").concat(variables_1.heroStats.maxHP), 660, 75);
    variables_1.ctx.fillText("DP:         ".concat(variables_1.heroStats.DP), 660, 100);
    variables_1.ctx.fillText("SP:         ".concat(variables_1.heroStats.SP), 660, 125);
    if (variables_1.heroStats.overKill == true) {
        variables_1.ctx.fillText("Overkill:   Active!", 660, 150);
    }
    else {
        variables_1.ctx.fillText("Overkill:   Off", 660, 150);
    }
    variables_1.ctx.fillText("Monster Level:".concat(variables_1.monsterLevel), 660, 175);
    variables_1.ctx.fillText("Overkill Points: ".concat(variables_1.heroStats.overKillPoints), 660, 200);
    variables_1.ctx.fillText("XP: ".concat(variables_1.heroStats.currentXP, "/").concat(variables_1.heroStats.neededXP), 660, 225);
    /* if (bossMonster.alive) {
       ctx.fillText(`Boss is still alive!`, 660, 200);
     } else {
       ctx.fillText(`Boss is dead. Congrats.`, 660, 200);
     }
     ctx.fillText(`HP:       ${bossMonster.HP}`, 660, 225);
     ctx.fillText(`DP:       ${bossMonster.DP}`, 660, 250);
     ctx.fillText(`SP:       ${bossMonster.SP}`, 660, 275);*/
    variables_1.ctx.fillText("Game Log:", 660, 300);
    variables_1.ctx.font = '15px Arial';
    for (var i = 0; i < 9; i++) {
        if (utility_1.gameLog[i] === undefined)
            continue;
        if (utility_1.gameLog[i] == 'YOU DIED') {
            variables_1.ctx.font = '16px Arial';
            variables_1.ctx.fillStyle = 'red';
        }
        else {
            variables_1.ctx.font = '15px Arial';
            variables_1.ctx.fillStyle = 'black';
        }
        variables_1.ctx.fillText(utility_1.gameLog[i], 660, 320 + 20 * i);
    }
    variables_1.ctx.font = '13px Arial';
    variables_1.ctx.fillStyle = 'black';
    variables_1.ctx.fillText("Instructions:", 660, 530);
    variables_1.ctx.fillText("One of the Skeletons has a key. To win a level, you must find the key", 660, 545);
    variables_1.ctx.fillText("and defeat the Boss.", 660, 560);
    variables_1.ctx.fillText("Whenever you win a level, map will reset, you keep your progress ", 660, 575);
    variables_1.ctx.fillText("but the level of monsters goes up, so be careful!", 660, 590);
    variables_1.ctx.fillText("When your HP drops to 0, you die and game restarts.", 660, 605);
    variables_1.ctx.fillText("Killing Skeletons increases your hero level, use them to get stronger early on.", 660, 620);
    variables_1.ctx.fillText("Winning a level has a chance to restore your HP.", 660, 635);
}
exports.printstats = printstats;
/*
export function drawDoor ():void{
  ctx.drawImage(
    door,
    (doorCoordinates[0]-1) * tileWidth,
    (doorCoordinates[1]-1) * tileWidth,
    tileWidth,
    tileWidth
  );
}*/

},{"./index":3,"./random":6,"./utility":7,"./variables":8}],5:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.checkIfBattleForMonsters = exports.assignKey = exports.attemptToMoveMonster = exports.iterateList = exports.resetMonsters = exports.renderMonster = exports.renderAllMonsters = void 0;
var variables_1 = require("./variables");
var utility_1 = require("./utility");
var index_1 = require("./index");
function renderAllMonsters() {
    for (var i = 0; i < variables_1.monsterList.length; i++) {
        renderMonster(variables_1.monsterList[i]);
    }
}
exports.renderAllMonsters = renderAllMonsters;
function renderMonster(specimen) {
    if (specimen.alive && specimen.x - index_1.scrollingModifierX <= 10 && specimen.y - index_1.scrollingModifierY <= 10) {
        variables_1.ctx.drawImage((0, utility_1.getSpriteByName)(specimen.image), (specimen.x - 1 - index_1.scrollingModifierX) * variables_1.tileWidth, (specimen.y - 1 - index_1.scrollingModifierY) * variables_1.tileWidth, variables_1.tileWidth, variables_1.tileWidth);
    }
    else if (specimen.x - index_1.scrollingModifierX <= 10 && specimen.y - index_1.scrollingModifierY <= 10) {
        variables_1.ctx.drawImage(variables_1.blood, (specimen.x - 1 - index_1.scrollingModifierX) * variables_1.tileWidth, (specimen.y - 1 - index_1.scrollingModifierY) * variables_1.tileWidth, variables_1.tileWidth, variables_1.tileWidth);
    }
}
exports.renderMonster = renderMonster;
function resetMonsters() {
    for (var _i = 0, monsterList_1 = variables_1.monsterList; _i < monsterList_1.length; _i++) {
        var monster = monsterList_1[_i];
        monster.init();
    }
    assignKey();
}
exports.resetMonsters = resetMonsters;
function iterateList(input) {
    for (var _i = 0, monsterList_2 = variables_1.monsterList; _i < monsterList_2.length; _i++) {
        var specimen = monsterList_2[_i];
        input(specimen);
    }
}
exports.iterateList = iterateList;
function attemptToMoveMonster(specimen) {
    if (specimen.alive) {
        var direction = 0;
        var hasMoved = false;
        var stopIfInfinite = 0;
        while (!hasMoved) {
            if (stopIfInfinite > 100)
                break;
            direction = Math.floor(Math.random() * 4) + 1;
            monsterDestination(direction, specimen);
            if ((0, utility_1.checkIfMoveAllowed)() && checkOtherMonsters(specimen) && specimen.image != 'door') {
                specimen.x = (0, variables_1.getDestination)()[0];
                specimen.y = (0, variables_1.getDestination)()[1];
                hasMoved = true;
            }
            stopIfInfinite++;
            //}
        }
    }
}
exports.attemptToMoveMonster = attemptToMoveMonster;
function monsterDestination(input, specimen) {
    switch (input) {
        case 1: //down
            (0, variables_1.updateDestination)(specimen.x, specimen.y + 1);
            break;
        case 2: //up
            (0, variables_1.updateDestination)(specimen.x, specimen.y - 1);
            break;
        case 3: //left
            (0, variables_1.updateDestination)(specimen.x - 1, specimen.y);
            break;
        case 4: //right
            (0, variables_1.updateDestination)(specimen.x + 1, specimen.y);
            break;
    }
}
function checkOtherMonsters(specimen) {
    for (var i = 0; i < variables_1.monsterList.length; i++) {
        if (i == specimen.orderNumber)
            continue;
        if (variables_1.monsterList[i].x == (0, variables_1.getDestination)()[0] &&
            variables_1.monsterList[i].y == (0, variables_1.getDestination)()[1]) {
            return false;
        }
    }
    return true;
}
function assignKey() {
    (0, variables_1.updateMonsterHasKey)(Math.floor(Math.random() * 3) + 1);
}
exports.assignKey = assignKey;
function checkIfBattleForMonsters() {
    for (var _i = 0, monsterList_3 = variables_1.monsterList; _i < monsterList_3.length; _i++) {
        var monster = monsterList_3[_i];
        if (variables_1.heroStats.x == monster.x && variables_1.heroStats.y == monster.y && monster.alive && monster.image != 'door') {
            (0, utility_1.battle)(monster);
        }
    }
}
exports.checkIfBattleForMonsters = checkIfBattleForMonsters;

},{"./index":3,"./utility":7,"./variables":8}],6:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.setMapSize = exports.pushBoundariesToWallList = exports.checkIfNotFloor = exports.adjustWalls = exports.randomizeFloor = exports.setup = exports.emptyMapLists = exports.mapSize = exports.wallPositionList = exports.floorList = void 0;
var monster_1 = require("./monster");
var hero_1 = require("./hero");
var variables_1 = require("./variables");
exports.floorList = [1, 1];
exports.wallPositionList = [];
exports.mapSize = 10;
var currentX = 1;
var currentY = 1;
var direction = 0;
var canMove = false;
var stopIfInfinite = 0;
var targetX = 1;
var targetY = 1;
var adjacentX = 0;
var adjacentY = 0;
function emptyMapLists() {
    exports.wallPositionList = [];
    exports.floorList = [1, 1];
    currentX = 1;
    currentY = 1;
    targetX = 1;
    targetY = 1;
}
exports.emptyMapLists = emptyMapLists;
function setup() {
    emptyMapLists();
    randomizeFloor();
    adjustWalls();
    pushBoundariesToWallList();
    (0, hero_1.heroInit)();
    (0, monster_1.resetMonsters)();
    (0, monster_1.assignKey)();
}
exports.setup = setup;
function randomizeFloor() {
    var retraceChecker = 0;
    while (exports.floorList.length < (exports.mapSize * exports.mapSize * 5) / 4) {
        if (stopIfInfinite > 100000) {
            console.log('infinite loop stopped at 100 000');
            break;
        }
        direction = Math.floor(Math.random() * 4) + 1;
        setTarget(direction);
        if (!checkIfNotFloor(targetX, targetY)) {
            retraceChecker++;
            currentX = targetX;
            currentY = targetY;
            stopIfInfinite++;
            continue;
        }
        innerloop: for (var i = 1; i < 5; i++) {
            setAdjacent(i);
            if (!checkAdjacent()) {
                canMove = false;
                resetAdjacent();
                targetX = currentX;
                targetY = currentY;
                break innerloop;
            }
            resetAdjacent();
            canMove = true;
        }
        if (canMove) {
            currentX = targetX;
            currentY = targetY;
            if (checkIfNotFloor(currentX, currentY)) {
                exports.floorList.push(currentX);
                exports.floorList.push(currentY);
            }
        }
        stopIfInfinite++;
    }
    console.log("".concat(retraceChecker, " times going back on existing floor, not placing new."));
    console.log("".concat(stopIfInfinite - retraceChecker, " attempts to place a new tile."));
    console.log("".concat(stopIfInfinite, " moves in total were needed to place floor tiles."));
    stopIfInfinite = 0;
}
exports.randomizeFloor = randomizeFloor;
function setAdjacent(input) {
    switch (input) {
        case 1: //down
            return adjacentY++;
        case 2: //up
            return adjacentY--;
        case 3: //left
            return adjacentX++;
        case 4: //right
            return adjacentX--;
    }
}
function resetAdjacent() {
    adjacentX = targetX;
    adjacentY = targetY;
}
function checkAdjacent() {
    if (!(adjacentX == currentX && adjacentY == currentY)) {
        return checkIfNotFloor(adjacentX, adjacentY);
    }
    return true;
}
function adjustWalls() {
    for (var y = 1; y <= exports.mapSize; y++) {
        for (var x = 1; x <= exports.mapSize; x++) {
            targetX = x;
            targetY = y;
            if (checkIfNotFloor(targetX, targetY)) {
                exports.wallPositionList.push([x, y]);
            }
        }
    }
}
exports.adjustWalls = adjustWalls;
function checkIfNotFloor(x, y) {
    for (var j = 0; j < exports.floorList.length; j += 2) {
        if (x == exports.floorList[j] && y == exports.floorList[j + 1])
            return false;
    }
    return true;
}
exports.checkIfNotFloor = checkIfNotFloor;
function setTarget(input) {
    switch (input) {
        case 1: //down
            if (targetY < exports.mapSize) {
                targetY++;
            }
            break;
        case 2: //up
            if (targetY > 1) {
                targetY--;
            }
            break;
        case 3: //left
            if (targetX > 1) {
                targetX--;
            }
            break;
        case 4: //right
            if (targetX < exports.mapSize) {
                targetX++;
            }
            break;
    }
}
function pushBoundariesToWallList() {
    for (var j = 1; j < exports.mapSize + 1; j++) {
        exports.wallPositionList.push([j, exports.mapSize + 1]);
    }
    for (var j = 1; j < exports.mapSize + 1; j++) {
        exports.wallPositionList.push([j, 0]);
    }
    for (var k = 1; k < exports.mapSize + 1; k++) {
        exports.wallPositionList.push([0, k]);
    }
    for (var k = 1; k < exports.mapSize + 1; k++) {
        exports.wallPositionList.push([exports.mapSize + 1, k]);
    }
}
exports.pushBoundariesToWallList = pushBoundariesToWallList;
function setMapSize() {
    exports.mapSize = 5 + variables_1.monsterLevel * 5;
}
exports.setMapSize = setMapSize;

},{"./hero":2,"./monster":5,"./variables":8}],7:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.writeGameLog = exports.gameLog = exports.battle = exports.checkIfMoveAllowed = exports.getSpriteByName = exports.d3 = exports.d6 = void 0;
var variables_1 = require("./variables");
var random_1 = require("./random");
function d6(numberOfRolls) {
    var total = 0;
    for (var i = 0; i < numberOfRolls; i++) {
        total += Math.floor(Math.random() * 6) + 1;
    }
    return total;
}
exports.d6 = d6;
function d3(numberOfRolls) {
    var total = 0;
    for (var i = 0; i < numberOfRolls; i++) {
        total += Math.floor(Math.random() * 3) + 1;
    }
    return total;
}
exports.d3 = d3;
function getSpriteByName(name) {
    switch (name) {
        case 'heroDown':
            return variables_1.heroDown;
        case 'heroUp':
            return variables_1.heroUp;
        case 'heroLeft':
            return variables_1.heroLeft;
        case 'heroRight':
            return variables_1.heroRight;
        case 'skeleton':
            return variables_1.skeleton;
        case 'boss':
            return variables_1.boss;
        case 'door':
            return variables_1.door;
    }
    return variables_1.heroDown;
}
exports.getSpriteByName = getSpriteByName;
function checkIfMoveAllowed() {
    for (var i = 0; i < random_1.wallPositionList.length; i++) {
        if ((0, variables_1.getDestination)()[0] == random_1.wallPositionList[i][0] &&
            (0, variables_1.getDestination)()[1] == random_1.wallPositionList[i][1])
            return false;
    }
    return true;
}
exports.checkIfMoveAllowed = checkIfMoveAllowed;
function battle(monster) {
    if (variables_1.heroStats.currentHP < 1)
        return;
    var stopIfInfinite = 0;
    var overKillUsed = false;
    var xpGain = 0;
    while (monster.HP > 0 && stopIfInfinite < 10000) {
        var heroAttack = variables_1.heroStats.SP + d3(1);
        if (variables_1.heroStats.overKill == true) {
            heroAttack += variables_1.heroStats.overKillPoints;
            variables_1.heroStats.overKill = false;
            overKillUsed = true;
        }
        var monsterAttack = monster.SP + d3(1);
        if (heroAttack > monster.DP) {
            monster.HP -= heroAttack - monster.DP;
        }
        if (monsterAttack > variables_1.heroStats.DP) {
            variables_1.heroStats.currentHP -= monsterAttack - variables_1.heroStats.DP;
        }
        if (monster.HP < 0)
            variables_1.heroStats.overKillPoints += -1 * monster.HP;
        if (overKillUsed)
            variables_1.heroStats.overKillPoints = 0;
        stopIfInfinite++;
    }
    monster.alive = false;
    if (variables_1.heroStats.currentHP > 0) {
        if (monster.image == 'skeleton')
            xpGain = 1;
        if (monster.image == 'boss')
            xpGain = 3;
        if (monster.orderNumber == variables_1.monsterHasKey) {
            variables_1.heroStats.hasKey = true;
            writeGameLog("You killed a ".concat(monster.image, " and obtained the Key!."));
        }
        else {
            writeGameLog("You killed a ".concat(monster.image, "."));
        }
    }
    variables_1.heroStats.currentXP += xpGain;
    stopIfInfinite = 0;
}
exports.battle = battle;
exports.gameLog = [];
function writeGameLog(newLline) {
    exports.gameLog.slice(9, 1);
    for (var i = 9; i > 0; i--) {
        exports.gameLog.splice(i, 1, exports.gameLog[i - 1]);
    }
    exports.gameLog[0] = newLline;
}
exports.writeGameLog = writeGameLog;

},{"./random":6,"./variables":8}],8:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.skeletonSetup = exports.getDestination = exports.updateDestination = exports.resetMonstersLevel = exports.updateMonstersLevel = exports.updateMonsterHasKey = exports.monsterHasKey = exports.monsterList = exports.theDoor = exports.skeleton5 = exports.skeleton4 = exports.skeleton3 = exports.skeleton2 = exports.skeleton1 = exports.bossMonster = exports.tileWidth = exports.resetSpeed = exports.updateSpeed = exports.moveEveryXMiliseconds = exports.heroXpArray = exports.monsterLevel = exports.heroStats = exports.door = exports.potion = exports.die = exports.key = exports.blood = exports.boss = exports.wall = exports.floor = exports.heroRight = exports.heroLeft = exports.heroDown = exports.heroUp = exports.skeleton = exports.ctx = exports.canvas = void 0;
var classes_1 = require("./classes");
var utility_1 = require("./utility");
exports.canvas = document.querySelector('.main-canvas');
exports.ctx = exports.canvas.getContext('2d');
exports.skeleton = document.getElementById('skeleton');
exports.heroUp = document.getElementById('hero-up');
exports.heroDown = document.getElementById('hero-down');
exports.heroLeft = document.getElementById('hero-left');
exports.heroRight = document.getElementById('hero-right');
exports.floor = document.getElementById('floor');
exports.wall = document.getElementById('wall');
exports.boss = document.getElementById('boss');
exports.blood = document.getElementById('blood');
exports.key = document.getElementById('key');
exports.die = document.getElementById('die');
exports.potion = document.getElementById('potion');
exports.door = document.getElementById('door');
exports.heroStats = {
    x: 1,
    y: 1,
    facing: 'heroDown',
    level: 1,
    maxHP: (0, utility_1.d6)(3) + 20,
    currentHP: 6,
    DP: (0, utility_1.d6)(2),
    SP: (0, utility_1.d6)(1) + 7,
    hasKey: false,
    hasPotion: true,
    overKillPoints: 0,
    overKill: true,
    neededXP: 0,
    currentXP: 0
};
exports.monsterLevel = 1;
exports.heroXpArray = [0, 2, 6, 10, 14, 22, 28, 35, 43, 52, 72];
exports.moveEveryXMiliseconds = 2000;
function updateSpeed(speedChange) {
    exports.moveEveryXMiliseconds -= speedChange;
}
exports.updateSpeed = updateSpeed;
function resetSpeed(newSpeed) {
    exports.moveEveryXMiliseconds = newSpeed;
}
exports.resetSpeed = resetSpeed;
exports.tileWidth = 65;
exports.bossMonster = new classes_1.Monster(0);
exports.skeleton1 = new classes_1.Skeleton(1);
exports.skeleton2 = new classes_1.Skeleton(2);
exports.skeleton3 = new classes_1.Skeleton(3);
exports.skeleton4 = new classes_1.Skeleton(4);
exports.skeleton5 = new classes_1.Skeleton(5);
exports.theDoor = new classes_1.Door(89);
exports.monsterList = [];
exports.monsterList.push(exports.bossMonster);
exports.monsterList.push(exports.skeleton1);
exports.monsterList.push(exports.skeleton2);
exports.monsterList.push(exports.skeleton3);
exports.monsterList.push(exports.theDoor);
//monsterList.push(skeleton4);
//monsterList.push(skeleton5);
exports.monsterHasKey = 1;
function updateMonsterHasKey(orderNumberOfMonster) {
    return (exports.monsterHasKey = orderNumberOfMonster);
}
exports.updateMonsterHasKey = updateMonsterHasKey;
function updateMonstersLevel(increment) {
    return (exports.monsterLevel += increment);
}
exports.updateMonstersLevel = updateMonstersLevel;
function resetMonstersLevel() {
    exports.monsterLevel = 1;
}
exports.resetMonstersLevel = resetMonstersLevel;
var destination = [];
function updateDestination(x, y) {
    return (destination = [x, y]);
}
exports.updateDestination = updateDestination;
function getDestination() {
    return destination;
}
exports.getDestination = getDestination;
exports.skeletonSetup = [
    [7, 7],
    [10, 5],
    [5, 10],
    [15, 10],
    [5, 15],
];

},{"./classes":1,"./utility":7}]},{},[3]);
