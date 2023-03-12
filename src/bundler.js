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
exports.RedDoor = exports.GreenDoor = exports.RedChest = exports.GreenChest = exports.Door = exports.Witch = exports.Guard = exports.Skeleton = exports.Monster = exports.Treasure = void 0;
var mapgeneration_1 = require("./mapgeneration");
var setup_1 = require("./setup");
var variables_1 = require("./variables");
var Treasure = /** @class */ (function () {
    function Treasure() {
    }
    return Treasure;
}());
exports.Treasure = Treasure;
var Monster = /** @class */ (function () {
    function Monster(order, x, y, image, hp, DP, SP, alive, hasKey) {
        if (x === void 0) { x = 1; }
        if (y === void 0) { y = 0; }
        if (image === void 0) { image = 'boss'; }
        if (hp === void 0) { hp = 0; }
        if (DP === void 0) { DP = 0; }
        if (SP === void 0) { SP = 0; }
        if (alive === void 0) { alive = true; }
        if (hasKey === void 0) { hasKey = false; }
        this.speed = 1;
        this.path = [];
        this.orderNumber = order;
        this.x = x;
        this.y = y;
        this.image = image;
        this.HP = hp;
        this.DP = DP;
        this.SP = SP;
        this.alive = alive;
        this.hasKey = hasKey;
    }
    Monster.prototype.pickASpot = function (x, y) {
        this.x = x;
        this.y = y;
    };
    Monster.prototype.init = function () {
        this.pickASpot(mapgeneration_1.bossSetup[variables_1.monsterLevel - 1][0], mapgeneration_1.bossSetup[variables_1.monsterLevel - 1][1]);
        this.alive = true;
        this.HP = 15 + 5 * variables_1.monsterLevel;
        this.DP = 3 + variables_1.monsterLevel;
        this.SP = 5 + variables_1.monsterLevel;
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
        this.pickASpot(mapgeneration_1.skeletonSetup[variables_1.monsterLevel - 1][this.orderNumber * 2], mapgeneration_1.skeletonSetup[variables_1.monsterLevel - 1][this.orderNumber * 2 + 1]);
        this.alive = true;
        this.HP = 10;
        this.DP = 1;
        this.SP = 2;
    };
    return Skeleton;
}(Monster));
exports.Skeleton = Skeleton;
var Guard = /** @class */ (function (_super) {
    __extends(Guard, _super);
    function Guard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Guard.prototype.init = function () {
        this.image = 'guard';
        this.pickASpot(mapgeneration_1.guardSetup[variables_1.monsterLevel - 1][this.orderNumber * 2], mapgeneration_1.guardSetup[variables_1.monsterLevel - 1][this.orderNumber * 2 + 1]);
        this.alive = true;
        this.HP = 12 + variables_1.monsterLevel * 2;
        this.DP = 2 + variables_1.monsterLevel;
        this.SP = 4 + variables_1.monsterLevel;
    };
    return Guard;
}(Monster));
exports.Guard = Guard;
var Witch = /** @class */ (function (_super) {
    __extends(Witch, _super);
    function Witch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Witch.prototype.init = function () {
        this.image = 'witch';
        this.pickASpot(mapgeneration_1.witchSetup[variables_1.monsterLevel - 1][this.orderNumber * 2], mapgeneration_1.witchSetup[variables_1.monsterLevel - 1][this.orderNumber * 2 + 1]);
        this.alive = true;
        this.HP = 5;
        this.DP = 0;
        this.SP = 3;
    };
    return Witch;
}(Monster));
exports.Witch = Witch;
var Door = /** @class */ (function (_super) {
    __extends(Door, _super);
    function Door() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 0;
        return _this;
    }
    Door.prototype.init = function () {
        this.image = 'door';
        this.pickASpot(setup_1.mapSize, setup_1.mapSize);
        // this.alive = true;
        this.alive = true;
        this.HP = 0;
        this.DP = 0;
        this.SP = 0;
    };
    return Door;
}(Monster));
exports.Door = Door;
var GreenChest = /** @class */ (function (_super) {
    __extends(GreenChest, _super);
    function GreenChest() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 0;
        _this.gold = 0;
        _this.open = false;
        _this.hasPotion = false;
        _this.hasSword = false;
        return _this;
    }
    GreenChest.prototype.init = function () {
        this.image = 'greenChest';
        this.pickASpot(mapgeneration_1.greenChestSetup[variables_1.monsterLevel - 1][this.orderNumber * 2], mapgeneration_1.greenChestSetup[variables_1.monsterLevel - 1][this.orderNumber * 2 + 1]);
        this.alive = true;
        this.HP = 0;
        this.DP = 0;
        this.SP = 0;
    };
    return GreenChest;
}(Monster));
exports.GreenChest = GreenChest;
var RedChest = /** @class */ (function (_super) {
    __extends(RedChest, _super);
    function RedChest() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 0;
        _this.gold = 0;
        _this.open = false;
        _this.hasPotion = false;
        _this.hasSword = false;
        return _this;
    }
    RedChest.prototype.init = function () {
        this.image = 'redChest';
        this.pickASpot(mapgeneration_1.redChestSetup[variables_1.monsterLevel - 1][this.orderNumber * 2], mapgeneration_1.redChestSetup[variables_1.monsterLevel - 1][this.orderNumber * 2 + 1]);
        this.alive = true;
        this.hasSword = false;
        this.HP = 0;
        this.DP = 0;
        this.SP = 0;
    };
    return RedChest;
}(Monster));
exports.RedChest = RedChest;
var GreenDoor = /** @class */ (function (_super) {
    __extends(GreenDoor, _super);
    function GreenDoor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 0;
        return _this;
    }
    GreenDoor.prototype.init = function () {
        this.image = 'greenDoor';
        this.pickASpot(mapgeneration_1.greenDoorSetup[variables_1.monsterLevel - 1][this.orderNumber * 2], mapgeneration_1.greenDoorSetup[variables_1.monsterLevel - 1][this.orderNumber * 2 + 1]);
        this.alive = true;
        this.HP = 0;
        this.DP = 0;
        this.SP = 0;
    };
    return GreenDoor;
}(Monster));
exports.GreenDoor = GreenDoor;
var RedDoor = /** @class */ (function (_super) {
    __extends(RedDoor, _super);
    function RedDoor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 0;
        return _this;
    }
    RedDoor.prototype.init = function () {
        this.image = 'redDoor';
        this.pickASpot(mapgeneration_1.redDoorSetup[variables_1.monsterLevel - 1][this.orderNumber * 2], mapgeneration_1.redDoorSetup[variables_1.monsterLevel - 1][this.orderNumber * 2 + 1]);
        this.alive = true;
        this.HP = 0;
        this.DP = 0;
        this.SP = 0;
    };
    return RedDoor;
}(Monster));
exports.RedDoor = RedDoor;

},{"./mapgeneration":5,"./setup":7,"./variables":9}],2:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.setHeroLevel = exports.checkIfBattle = exports.makeDestination = exports.checkDoorColor = exports.checkChest = exports.blockIfDoor = exports.attemptToMoveHero = exports.renderHero = exports.increaseMapLevel = exports.heroInit = exports.checkIfHeroDead = void 0;
var variables_1 = require("./variables");
var utility_1 = require("./utility");
var index_1 = require("./index");
var setup_1 = require("./setup");
function checkIfHeroDead() {
    if (variables_1.heroStats.currentHP < 1) {
        var deaths = localStorage.getItem('deaths');
        if (deaths === undefined || deaths === null)
            deaths = '0';
        var deathCount = parseInt(deaths);
        deathCount++;
        localStorage.setItem('deaths', deathCount.toString());
        (0, utility_1.writeGameLog)('YOU DIED');
        (0, utility_1.writeGameLog)("Deaths so far: ".concat(localStorage.getItem('deaths')));
        (0, variables_1.resetMonstersLevel)();
        (0, setup_1.setMapSize)();
        (0, setup_1.setup)();
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
    variables_1.heroStats.hasGreenKey = false;
    variables_1.heroStats.hasRedKey = false;
    variables_1.heroStats.hasSword = false;
    variables_1.heroStats.hasPotion = 0; //not implemented.
    variables_1.heroStats.facing = 'heroDown';
    variables_1.heroStats.level = 1;
    variables_1.heroStats.gold = 0;
    variables_1.heroStats.neededXP = variables_1.heroXpArray[variables_1.heroStats.level];
    variables_1.heroStats.currentXP = 0;
    variables_1.heroStats.maxHP = 20;
    variables_1.heroStats.currentHP = 20;
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
    variables_1.heroStats.hasGreenKey = false;
    variables_1.heroStats.hasRedKey = false;
    (0, variables_1.updateMonstersLevel)(1);
}
exports.increaseMapLevel = increaseMapLevel;
function renderHero() {
    variables_1.ctx.drawImage((0, utility_1.getSpriteByName)(variables_1.heroStats.facing), (variables_1.heroStats.x - 1 - index_1.scrollingModifierX) * variables_1.tileWidth, (variables_1.heroStats.y - 1 - index_1.scrollingModifierY) * variables_1.tileWidth, variables_1.tileWidth, variables_1.tileWidth);
}
exports.renderHero = renderHero;
function attemptToMoveHero() {
    if (index_1.escapedown)
        return;
    makeDestination();
    checkIfBattle();
    if (blockIfDoor())
        return false;
    checkChest();
    return (0, utility_1.checkIfMoveAllowed)();
}
exports.attemptToMoveHero = attemptToMoveHero;
function blockIfDoor() {
    for (var i = 0; i < variables_1.doorList.length; i++) {
        if ((0, variables_1.getDestination)()[0] == variables_1.doorList[i].x &&
            (0, variables_1.getDestination)()[1] == variables_1.doorList[i].y) {
            if (checkDoorColor(variables_1.doorList[i])) {
                return true;
            }
        }
    }
    return false;
}
exports.blockIfDoor = blockIfDoor;
function checkChest() {
    for (var _i = 0, chestList_1 = variables_1.chestList; _i < chestList_1.length; _i++) {
        var chest = chestList_1[_i];
        if ((0, variables_1.getDestination)()[0] == chest.x && (0, variables_1.getDestination)()[1] == chest.y) {
            if (chest.hasKey && chest.image == 'greenChest') {
                variables_1.heroStats.hasGreenKey = true;
                (0, utility_1.writeGameLog)('You obtained the green key.');
            }
            if (chest.hasSword) {
                variables_1.heroStats.hasSword = true;
                chest.hasSword = false;
                variables_1.heroStats.SP += 5;
                (0, utility_1.writeGameLog)('You obtained the legendary Gigachad Sword.');
            }
            if (chest.hasKey && chest.image == 'redChest') {
                variables_1.heroStats.hasRedKey = true;
                (0, utility_1.writeGameLog)('You obtained the red key.');
            }
            if (chest.hasPotion) {
                variables_1.heroStats.hasPotion++;
                (0, utility_1.writeGameLog)('You found a potion.');
                chest.hasPotion = false;
            }
            if (chest.gold > 0) {
                variables_1.heroStats.gold += chest.gold;
                chest.gold = 0;
                (0, utility_1.writeGameLog)('You found 50 gold.');
            }
            if (chest.image == 'greenChest') {
                chest.image = 'greenChestOpen';
            }
            if (chest.image == 'redChest') {
                chest.image = 'redChestOpen';
            }
        }
    }
}
exports.checkChest = checkChest;
function checkDoorColor(door) {
    switch (door.image) {
        case 'door':
            if (variables_1.heroStats.hasKey) {
                return false;
            }
            else {
                (0, utility_1.writeGameLog)("You don't have the Key!");
                return true;
            }
        case 'greenDoor':
            if (variables_1.heroStats.hasGreenKey)
                return false;
            else {
                (0, utility_1.writeGameLog)("You don't have green key!");
                return true;
            }
        case 'redDoor':
            if (variables_1.heroStats.hasRedKey) {
                return false;
            }
            else {
                (0, utility_1.writeGameLog)("You don't have red key!");
                return true;
            }
        default:
    }
    console.log('door type not recognized');
}
exports.checkDoorColor = checkDoorColor;
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
            monster.alive &&
            monster.speed > 0) {
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

},{"./index":3,"./setup":7,"./utility":8,"./variables":9}],3:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.setMonsterSpeed = exports.resetScrolling = exports.interval = exports.escapeanim = exports.escapedown = exports.downdown = exports.updown = exports.rightdown = exports.leftdown = exports.spacedown = exports.pdown = exports.scrollingModifierY = exports.scrollingModifierX = void 0;
// import * as fs from 'fs';
var setup_1 = require("./setup");
var utility_1 = require("./utility");
var map_render_1 = require("./map-render");
var hero_1 = require("./hero");
var monster_1 = require("./monster");
var variables_1 = require("./variables");
var mapgeneration_1 = require("./mapgeneration");
exports.scrollingModifierX = 0;
exports.scrollingModifierY = 0;
exports.pdown = false;
exports.spacedown = false;
exports.leftdown = false;
exports.rightdown = false;
exports.updown = false;
exports.downdown = false;
exports.escapedown = false;
exports.escapeanim = false;
var scoreArray = ['0', '0', '0', '0', '0'];
var finaleDone = false;
var lastUpdate = Date.now();
var currentTime = Date.now();
var fps = 60;
//setup
window.onload = function () {
    updateGameState();
};
(0, setup_1.setup)();
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
    if (variables_1.monsterLevel > 3) {
        finale();
        return;
    }
    if (exports.escapedown)
        return;
    (0, map_render_1.clearCanvas)();
    (0, map_render_1.renderFloor)();
    (0, map_render_1.renderWalls)();
    (0, map_render_1.printstats)();
    (0, monster_1.renderAllMonsters)();
    (0, hero_1.setHeroLevel)();
    (0, hero_1.renderHero)();
    (0, monster_1.checkIfBattleForMonsters)();
    (0, hero_1.checkIfHeroDead)();
    determineScore();
    checkVictoryConditions();
}
//Reset when Map Level finished.
function checkVictoryConditions() {
    if (variables_1.heroStats.x == mapgeneration_1.theDoor.x &&
        variables_1.heroStats.y == mapgeneration_1.theDoor.y &&
        variables_1.heroStats.hasKey) {
        (0, hero_1.increaseMapLevel)();
        if (variables_1.monsterLevel > 3) {
            finale();
            return;
        }
        (0, setup_1.setMapSize)();
        (0, variables_1.emptyMapLists)();
        (0, mapgeneration_1.instantiateSetupArrays)();
        //randomizeFloor();
        (0, setup_1.adjustWalls)();
        (0, setup_1.pushBoundariesToWallList)();
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
        (0, monster_1.assignKey)();
    }
}
function finale() {
    if (finaleDone)
        return;
    exports.escapedown = true;
    setScore();
    variables_1.ctx.drawImage(variables_1.square, 0, 0, 900, 600);
    variables_1.ctx.font = '50px Arial';
    variables_1.ctx.fillText("Thank you for Playing!", 100, 100);
    variables_1.ctx.fillText("Score: ".concat(variables_1.heroStats.highscore), 100, 160);
    variables_1.ctx.drawImage(variables_1.space, 100, 180, 90, 42);
    variables_1.ctx.fillText("to restart.", 200, 215);
    variables_1.ctx.fillText("Previous Highscore:", 200, 260);
    for (var i = 0; i < 5; i++) {
        variables_1.ctx.fillText("".concat(scoreArray[i]), 200, 320 + 60 * i);
    }
    document.addEventListener('keydown', tempSpaceReset);
    console.log('event listener added');
    function tempSpaceReset(notHit) {
        switch (notHit.key) {
            case ' ':
                (0, variables_1.resetMonstersLevel)();
                (0, setup_1.setMapSize)();
                (0, setup_1.setup)();
                (0, variables_1.resetSpeed)(2000);
                clearInterval(exports.interval);
                setMonsterSpeed();
                (0, hero_1.heroInit)();
                resetScrolling();
                exports.escapedown = false;
                document.removeEventListener('keydown', tempSpaceReset);
                console.log('event listener removed');
        }
    }
    finaleDone = true;
}
function determineScore() {
    variables_1.heroStats.highscore =
        variables_1.heroStats.gold +
            variables_1.heroStats.currentHP * 10 +
            variables_1.heroStats.hasPotion * 150 +
            variables_1.heroStats.currentXP * 3 +
            variables_1.heroStats.level * 30;
}
function setScore() {
    determineScore();
    var emptyArray = [0, 0, 0, 0, 0];
    if (localStorage.getItem('score') === null)
        localStorage.setItem('score', emptyArray.toString());
    var jsStorage = localStorage.getItem('score').split(',');
    scoreArray = jsStorage.sort(function (a, b) {
        return b - a;
    });
    console.log('scoreArray:');
    console.log(scoreArray);
    console.log('highscore:');
    console.log(variables_1.heroStats.highscore);
    var lowerNumber = scoreArray.find(function (element) {
        return parseInt(element) < variables_1.heroStats.highscore;
    });
    if (lowerNumber === undefined)
        lowerNumber = 0;
    console.log(lowerNumber);
    var found = scoreArray.indexOf(lowerNumber.toString());
    if (found > -1) {
        scoreArray.splice(found, 0, variables_1.heroStats.highscore.toString());
        scoreArray.pop();
    }
    scoreArray = scoreArray.sort(function (a, b) {
        return b - a;
    });
    localStorage.setItem('score', scoreArray.toString());
    console.log(localStorage);
}
document.addEventListener('keydown', function (keyHit) {
    switch (keyHit.key) {
        case 'Escape':
            if (exports.escapedown == false) {
                exports.escapedown = true;
                exports.escapeanim = true;
                (0, utility_1.writeGameLog)('Game is paused');
                (0, map_render_1.renderPauseScreen)();
            }
            else if (exports.escapedown) {
                exports.escapedown = false;
                exports.escapeanim = true;
                (0, utility_1.writeGameLog)('Game is resumed');
            }
            break;
    }
});
//manage user input
document.addEventListener('keydown', function (keyHit) {
    if (variables_1.heroStats.currentHP < 1)
        return;
    if (exports.escapedown)
        return;
    switch (keyHit.key) {
        case 'ArrowDown':
            variables_1.heroStats.facing = 'heroDown';
            if ((0, hero_1.attemptToMoveHero)()) {
                variables_1.heroStats.y++;
                if (variables_1.heroStats.y > 5 && variables_1.heroStats.y < setup_1.mapSize - 4) {
                    exports.scrollingModifierY++;
                }
            }
            exports.downdown = true;
            break;
        case 'ArrowUp':
            variables_1.heroStats.facing = 'heroUp';
            if ((0, hero_1.attemptToMoveHero)()) {
                variables_1.heroStats.y--;
                if (variables_1.heroStats.y > 4 && variables_1.heroStats.y < setup_1.mapSize - 5) {
                    exports.scrollingModifierY--;
                }
            }
            exports.updown = true;
            break;
        case 'ArrowLeft':
            variables_1.heroStats.facing = 'heroLeft';
            if ((0, hero_1.attemptToMoveHero)()) {
                variables_1.heroStats.x--;
                if (variables_1.heroStats.x > 4 && variables_1.heroStats.x < setup_1.mapSize - 5) {
                    exports.scrollingModifierX--;
                }
            }
            exports.leftdown = true;
            break;
        case 'ArrowRight':
            variables_1.heroStats.facing = 'heroRight';
            if ((0, hero_1.attemptToMoveHero)()) {
                variables_1.heroStats.x++;
                if (variables_1.heroStats.x > 5 && variables_1.heroStats.x < setup_1.mapSize - 4) {
                    exports.scrollingModifierX++;
                }
            }
            exports.rightdown = true;
            break;
        case 'p':
            if (variables_1.heroStats.hasPotion > 0) {
                var originalHP = variables_1.heroStats.currentHP;
                variables_1.heroStats.currentHP += 10;
                if (variables_1.heroStats.currentHP > variables_1.heroStats.maxHP) {
                    variables_1.heroStats.currentHP = variables_1.heroStats.maxHP;
                }
                variables_1.heroStats.hasPotion--;
                (0, utility_1.writeGameLog)("Potion restored ".concat(variables_1.heroStats.currentHP - originalHP, " HP"));
            }
            else {
                (0, utility_1.writeGameLog)('You dont have a potion.');
            }
            exports.pdown = true;
            break;
        case ' ':
            if (variables_1.heroStats.overKill == false) {
                variables_1.heroStats.overKill = true;
            }
            else if (variables_1.heroStats.overKill)
                variables_1.heroStats.overKill = false;
            exports.spacedown = true;
            break;
    }
});
document.addEventListener('keyup', function (keyHit) {
    switch (keyHit.key) {
        case 'p':
            exports.pdown = false;
            break;
        case ' ':
            exports.spacedown = false;
            break;
        case 'ArrowUp':
            exports.updown = false;
            break;
        case 'ArrowDown':
            exports.downdown = false;
            break;
        case 'ArrowRight':
            exports.rightdown = false;
            break;
        case 'ArrowLeft':
            exports.leftdown = false;
            break;
        case 'Escape':
            exports.escapeanim = false;
            break;
    }
});

},{"./hero":2,"./map-render":4,"./mapgeneration":5,"./monster":6,"./setup":7,"./utility":8,"./variables":9}],4:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.printstats = exports.renderPauseScreen = exports.renderWalls = exports.paintLos = exports.renderFloor = exports.clearCanvas = void 0;
var variables_1 = require("./variables");
var utility_1 = require("./utility");
var index_1 = require("./index");
var monster_1 = require("./monster");
function clearCanvas() {
    variables_1.ctx.clearRect(0, 0, variables_1.canvas.width, variables_1.canvas.height);
}
exports.clearCanvas = clearCanvas;
function renderFloor() {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            renderFloorTile(i, j);
        }
    }
}
exports.renderFloor = renderFloor;
// export function paintPath(x: number, y: number) {
//   // let pathToPaint = paintPathToHero(x, y);
//   for (let i = 1; i < pathToPaint.length; i++) {
//     ctx.fillStyle = 'grey';
//     ctx.fillRect(
//       (pathToPaint[i][0] - 1) * tileWidth + 5,
//       (pathToPaint[i][1] - 1) * tileWidth + 5,
//       52,
//       52
//     );
//   }
//   ctx.fillStyle = 'black';
// }
function paintLos(x, y) {
    for (var i = 0; i < monster_1.losArray.length; i++) {
        variables_1.ctx.fillStyle = 'yellow';
        variables_1.ctx.fillRect((monster_1.losArray[i][0] - 1) * variables_1.tileWidth + (variables_1.tileWidth - 25) / 2, (monster_1.losArray[i][1] - 1) * variables_1.tileWidth + (variables_1.tileWidth - 25) / 2, 25, 25);
    }
    variables_1.ctx.fillStyle = 'black';
    variables_1.ctx.strokeStyle = 'green';
    variables_1.ctx.lineWidth = 3;
    if (monster_1.unblocked)
        variables_1.ctx.strokeStyle = 'red';
    variables_1.ctx.beginPath();
    variables_1.ctx.moveTo((variables_1.heroStats.x - 1) * variables_1.tileWidth + variables_1.tileWidth / 2, (variables_1.heroStats.y - 1) * variables_1.tileWidth + variables_1.tileWidth / 2);
    variables_1.ctx.lineTo(x * 65 - variables_1.tileWidth / 2, y * 65 - variables_1.tileWidth / 2);
    variables_1.ctx.stroke();
    variables_1.ctx.lineWidth = 1;
}
exports.paintLos = paintLos;
function renderWalls() {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            for (var k = 0; k < variables_1.wallPositionList.length; k++) {
                if (variables_1.wallPositionList[k][0] == i + index_1.scrollingModifierX + 1 &&
                    variables_1.wallPositionList[k][1] == j + index_1.scrollingModifierY + 1) {
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
    variables_1.ctx.strokeStyle = 'black';
    variables_1.ctx.strokeRect(xPosition * variables_1.tileWidth, yPosition * variables_1.tileWidth, variables_1.tileWidth, variables_1.tileWidth);
}
function renderPauseScreen() {
    variables_1.ctx.drawImage(variables_1.square, 0, 0, 1120, 650);
    variables_1.ctx.font = '20px Arial';
    variables_1.ctx.fillText("Winning the game: ", 70, 50);
    variables_1.ctx.font = '12px Arial';
    variables_1.ctx.fillText("You win by reaching the end of level 3 and escaping through the final door.\n In each level, you need to find and slay the witch (blue robe) who has the yellow key called the Key.\n  ", 75, 80);
    variables_1.ctx.fillText("This will allow you to pass through the door to the next level. Sometimes, doors of other colors will block your path. Explore chests to find matching keys.", 75, 95);
    variables_1.ctx.font = '20px Arial';
    variables_1.ctx.fillText("Scoring:", 75, 125);
    variables_1.ctx.font = '12px Arial';
    variables_1.ctx.fillText("Reaching the final door by any means is enough to win. You will receive a score though. If you are interested in a higher score, you will do better if you conserve your resources.", 75, 150);
    variables_1.ctx.fillText("While it is technically possible to defeat every single monster on each level, your score will be higher if your health is high, you found all gold and you have unused potions left.", 75, 165);
    variables_1.ctx.fillText("Hero level and XP is scored, too, but valued less. Avoiding enemies is therefore recommended. Minimum score is 40 and maximum 2040. Both extremes are highly unlikely.", 75, 180);
    variables_1.ctx.font = '20px Arial';
    variables_1.ctx.fillText("Fighting and Overkill:", 75, 210);
    variables_1.ctx.font = '12px Arial';
    variables_1.ctx.fillText("You can fight a monster by moving into it's square. Combat will be resolved automatically, you can check Game Log for results. Even weak monsters can cause some damage early on. ", 75, 235);
    variables_1.ctx.fillText("When you do more damage than needed to kill a monster, the extra damage will be converted to overkill points. By pressing space, you can activate Overkill mode. ", 75, 250);
    variables_1.ctx.fillText("On first round of next combat, you will deal extra damage equal to your accumulated overkill points, making it easier to kill tough enemies. Your overkill points will be consumed.", 75, 265);
    variables_1.ctx.font = '20px Arial';
    variables_1.ctx.fillText("Controls:", 75, 295);
    variables_1.ctx.font = '12px Arial';
    variables_1.ctx.fillText("Use Arrow Keys to move", 75, 320);
    variables_1.ctx.fillText("Use Space Key to activate or deactivate the Overkill mode.", 75, 335);
    variables_1.ctx.fillText("Use the P Key to drink a potion a restore 10HP.", 75, 350);
    variables_1.ctx.fillText("Use Escape to pause the game and display these instructions. Pressing Escape again will unpause the game.", 75, 365);
    variables_1.ctx.font = '20px Arial';
    variables_1.ctx.fillText("About the game:", 75, 395);
    variables_1.ctx.font = '12px Arial';
    variables_1.ctx.fillText("This is a demo of a planned game based on a school project. All graphics are a placeholder. There will be more levels, more monsters, more treasure and artifacts to be found.", 75, 430);
    variables_1.ctx.fillText("The basic principles will remain the same. I am currently working on monster pathfinding.\n  At the moment, monters move randomly. Eventually, they will be able to chase the player,", 75, 445);
    variables_1.ctx.fillText("until line of sight is broken. Then they will return to their predictable patrol routine. Some will have fixed routines, others will select from multiple possible paths randomly each round.", 75, 460);
    variables_1.ctx.fillText("The game will then turn into a stealth puzzle. It will be hard if not impossible to kill all monsters. The player will have to pick the unavoidable fights and evaluate the danger involved,", 75, 475);
    variables_1.ctx.fillText("lure monsters away from treasure and claim it before they come back, or just run frantically around and through openings, only to get trapped and have to fight their way out.", 75, 490);
    variables_1.ctx.fillText("It is, and always will be, a silly little game requiring no funding. Feedback is, however, welcome. Once finished, I will add a contact form and a mailing list and publish the game on itch.io .", 75, 505);
    variables_1.ctx.fillText("", 75, 520);
}
exports.renderPauseScreen = renderPauseScreen;
function printstats() {
    variables_1.ctx.font = '20px Arial';
    variables_1.ctx.fillText('Stats:', 660, 25);
    variables_1.ctx.drawImage(variables_1.square, 835, 0, 90, 90);
    variables_1.ctx.drawImage(variables_1.square, 835, 90, 90, 90);
    variables_1.ctx.drawImage(variables_1.square, 835, 180, 90, 90);
    variables_1.ctx.drawImage(variables_1.square, 1030, 0, 90, 90);
    variables_1.ctx.drawImage(variables_1.square, 1100, 0, 20, 20);
    variables_1.ctx.drawImage(variables_1.square, 1030, 90, 90, 90);
    variables_1.ctx.drawImage(variables_1.square, 1030, 180, 90, 90);
    variables_1.ctx.drawImage(variables_1.square, 1030, 270, 90, 90);
    variables_1.ctx.drawImage(variables_1.square, 650, 0, 185, 270);
    variables_1.ctx.drawImage(variables_1.square, 650, 400, 480, 250);
    if (variables_1.heroStats.hasKey) {
        variables_1.ctx.drawImage(variables_1.key, 835, 0, 90, 90);
    }
    if (variables_1.heroStats.overKill) {
        variables_1.ctx.drawImage(variables_1.axe, 1030, 270, 90, 90);
    }
    if (variables_1.heroStats.hasGreenKey) {
        variables_1.ctx.drawImage(variables_1.greenKey, 835, 90, 90, 90);
    }
    if (variables_1.heroStats.hasRedKey) {
        variables_1.ctx.drawImage(variables_1.redKey, 835, 180, 90, 90);
    }
    if (variables_1.heroStats.hasPotion > 0) {
        variables_1.ctx.drawImage(variables_1.potion, 1030, 0, 90, 90);
    }
    variables_1.ctx.font = '20px Arial';
    variables_1.ctx.fillText("".concat(variables_1.heroStats.hasPotion), 1105, 17);
    if (index_1.pdown) {
        variables_1.ctx.drawImage(variables_1.pdButton, 935, 24, 90, 42);
    }
    else {
        variables_1.ctx.drawImage(variables_1.pButton, 935, 24, 90, 45);
    }
    if (index_1.spacedown) {
        variables_1.ctx.drawImage(variables_1.space, 935, 280, 90, 42);
    }
    else {
        variables_1.ctx.drawImage(variables_1.spaced, 935, 280, 90, 48);
    }
    if (index_1.rightdown) {
        variables_1.ctx.drawImage(variables_1.right, 920, 345, 42, 42);
    }
    else {
        variables_1.ctx.drawImage(variables_1.rightd, 920, 345, 45, 45);
    }
    if (index_1.leftdown) {
        variables_1.ctx.drawImage(variables_1.left, 820, 345, 42, 42);
    }
    else {
        variables_1.ctx.drawImage(variables_1.leftd, 820, 345, 45, 45);
    }
    if (index_1.downdown) {
        variables_1.ctx.drawImage(variables_1.down, 870, 345, 42, 42);
    }
    else {
        variables_1.ctx.drawImage(variables_1.downd, 870, 345, 45, 45);
    }
    if (index_1.updown) {
        variables_1.ctx.drawImage(variables_1.up, 870, 295, 42, 42);
    }
    else {
        variables_1.ctx.drawImage(variables_1.upd, 870, 295, 45, 45);
    }
    if (index_1.escapeanim) {
        variables_1.ctx.drawImage(variables_1.escape, 670, 290, 100, 88);
    }
    else {
        variables_1.ctx.drawImage(variables_1.escaped, 670, 290, 100, 88);
    }
    // if (escapedown) {
    //   ctx.drawImage(pause, 670, 340, 100, 88);
    // } else {
    //   ctx.drawImage(unpause, 670, 340, 45, 45);
    // }
    if (variables_1.heroStats.hasSword) {
        variables_1.ctx.drawImage(variables_1.sword, 1030, 90, 90, 90);
    }
    if (variables_1.heroStats.hasPotion > 1000) {
        variables_1.ctx.drawImage(variables_1.potion, 1030, 180, 90, 90);
    }
    variables_1.ctx.fillText("Hero Level: ".concat(variables_1.heroStats.level), 660, 50);
    variables_1.ctx.fillText("HP:         ".concat(variables_1.heroStats.currentHP, "/").concat(variables_1.heroStats.maxHP), 660, 75);
    variables_1.ctx.fillText("Defense:  ".concat(variables_1.heroStats.DP), 660, 100);
    variables_1.ctx.fillText("Attack:     ".concat(variables_1.heroStats.SP), 660, 125);
    if (variables_1.heroStats.overKill == true) {
        variables_1.ctx.fillText("Overkill:   Active!", 660, 150);
    }
    else {
        variables_1.ctx.fillText("Overkill:   Off", 660, 150);
    }
    variables_1.ctx.fillText("Score:     ".concat(variables_1.heroStats.highscore), 660, 175);
    variables_1.ctx.fillText("Map Number:".concat(variables_1.monsterLevel), 660, 25);
    variables_1.ctx.fillText("Overkill Points: ".concat(variables_1.heroStats.overKillPoints), 660, 200);
    variables_1.ctx.fillText("XP: ".concat(variables_1.heroStats.currentXP, "/").concat(variables_1.heroStats.neededXP), 660, 225);
    variables_1.ctx.fillText("Gold: ".concat(variables_1.heroStats.gold), 660, 250);
    variables_1.ctx.fillText("Game Log:", 680, 430);
    variables_1.ctx.font = '15px Arial';
    for (var i = 0; i < 10; i++) {
        if (utility_1.gameLog[i] === undefined)
            continue;
        if (utility_1.gameLog[i] == "YOU DIED") {
            variables_1.ctx.font = '16px Arial';
            variables_1.ctx.fillStyle = 'red';
        }
        else {
            variables_1.ctx.font = '15px Arial';
            variables_1.ctx.fillStyle = 'black';
        }
        variables_1.ctx.fillText(utility_1.gameLog[i], 680, 450 + 20 * i);
    }
    variables_1.ctx.fillStyle = 'black';
}
exports.printstats = printstats;

},{"./index":3,"./monster":6,"./utility":8,"./variables":9}],5:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.instantiateSetupArrays = exports.redPotionsTotal = exports.greenPotionsTotal = exports.theDoor = exports.bossMonster = exports.guardSetup = exports.bossSetup = exports.skeletonSetup = exports.redChestSetup = exports.redDoorSetup = exports.greenChestSetup = exports.greenDoorSetup = exports.witchSetup = exports.wallSetup = void 0;
var classes_1 = require("./classes");
var variables_1 = require("./variables");
exports.wallSetup = [
    // [
    //   3, 3, 4, 4, 6, 6, 7, 7, 7, 2, 7, 3, 7, 4, 2, 7, 3, 7, 4, 7, 2, 2, 3, 2, 4,
    //   2, 5, 2,
    // ],
    [
        3, 1, 8, 1, 9, 1, 2, 2, 3, 2, 5, 2, 6, 2, 8, 2, 6, 3, 8, 3, 2, 4, 3, 4, 4,
        4, 6, 4, 2, 5, 4, 5, 6, 5, 8, 5, 9, 5, 10, 5, 2, 6, 4, 6, 8, 6, 6, 7, 1, 8,
        2, 8, 8, 8, 10, 8, 5, 9, 6, 9, 7, 9, 8, 9, 3, 10, 8, 10,
    ],
    [
        2, 1, 6, 1, 8, 1, 6, 2, 2, 3, 3, 3, 6, 3, 7, 3, 8, 3, 9, 3, 10, 3, 12, 3,
        13, 3, 14, 3, 2, 4, 12, 4, 4, 5, 5, 5, 7, 5, 8, 5, 12, 5, 13, 5, 14, 5, 1,
        6, 2, 6, 4, 6, 12, 6, 2, 7, 4, 7, 6, 7, 8, 7, 9, 7, 11, 7, 14, 7, 15, 7, 2,
        8, 6, 8, 9, 8, 11, 8, 2, 9, 3, 9, 4, 9, 6, 9, 9, 9, 11, 9, 12, 9, 13, 9, 14,
        9, 6, 10, 9, 10, 11, 10, 2, 11, 3, 11, 4, 11, 6, 11, 7, 11, 8, 11, 9, 11,
        12, 12, 13, 12, 1, 13, 2, 13, 3, 13, 6, 13, 8, 13, 9, 13, 11, 13, 12, 13, 6,
        14, 9, 14, 12, 14, 14, 14, 15, 14, 3, 15, 6, 15, 12, 15,
    ],
    [
        2, 1, 3, 1, 13, 1, 5, 2, 8, 2, 9, 2, 10, 2, 11, 2, 13, 2, 15, 2, 18, 2, 1,
        3, 3, 3, 5, 3, 8, 3, 15, 3, 18, 3, 3, 4, 5, 4, 6, 4, 7, 4, 8, 4, 10, 4, 11,
        4, 12, 4, 15, 4, 18, 4, 19, 4, 20, 4, 3, 5, 10, 5, 12, 5, 13, 5, 14, 5, 15,
        5, 1, 6, 2, 6, 3, 6, 5, 6, 6, 6, 7, 6, 9, 6, 10, 6, 12, 6, 15, 6, 16, 6, 17,
        6, 18, 6, 5, 7, 12, 7, 15, 7, 18, 7, 2, 8, 3, 8, 4, 8, 5, 8, 7, 8, 8, 8, 9,
        8, 10, 8, 12, 8, 14, 8, 15, 8, 18, 8, 3, 9, 7, 9, 12, 9, 2, 10, 3, 10, 5,
        10, 7, 10, 10, 10, 14, 10, 15, 10, 16, 10, 18, 10, 19, 10, 20, 10, 5, 11, 7,
        11, 10, 11, 12, 11, 14, 11, 18, 11, 2, 12, 3, 12, 7, 12, 8, 12, 9, 12, 10,
        12, 12, 12, 14, 12, 15, 12, 16, 12, 18, 12, 19, 12, 2, 13, 5, 13, 19, 13, 5,
        14, 6, 14, 8, 14, 9, 14, 11, 14,
        12, 14, 13, 14, 14, 14,
        15, 14, 17, 14, 19, 14, 2, 15, 3, 15, 9, 15, 11, 15, 17, 15, 3, 16, 5, 16,
        6, 16, 7, 16, 11, 16, 12, 16, 13, 16, 14, 16, 15, 16, 17, 16, 18, 16, 20,
        16, 3, 17, 5, 17, 9, 17, 3, 18, 5, 18, 7, 18, 8, 18, 9, 18, 11, 18, 13, 18,
        14, 18, 15, 18, 18, 18, 19, 18, 1, 19, 2, 19, 3, 19, 4, 19, 5, 19, 7, 19,
        11, 19, 15, 19, 18, 19, 11, 20, 12, 20, 15, 20, 18, 20,
    ],
];
exports.witchSetup = [
    [7, 10],
    [1, 7],
    [1, 4, 1, 18],
];
exports.greenDoorSetup = [
    [9, 8],
    [14, 15],
    [5, 1, 1, 15],
];
exports.greenChestSetup = [
    [10, 1, 1, 10],
    [7, 1, 1, 15],
    [1, 5, 2, 5, 7, 2, 13, 4, 14, 6, 14, 7, 15, 11, 19, 11, 12, 15, 4, 18],
];
exports.redDoorSetup = [
    [],
    [11, 3, 3, 14],
    [2, 3, 11, 3, 13, 8, 3, 11, 20, 14, 15, 15],
];
exports.redChestSetup = [
    [],
    [7, 10],
    [7, 3, 20, 1, 2, 9, 8, 11, 14, 19, 1, 20],
];
exports.skeletonSetup = [
    [6, 6, 9, 2, 2, 9],
    [3, 4, 11, 4, 14, 4, 10, 12, 4, 14],
    [6, 2, 4, 5, 1, 9, 14, 4, 16, 7, 16, 11, 20, 12, 7, 15],
];
exports.bossSetup = [
    [9, 9],
    [13, 15],
    [19, 20],
];
exports.guardSetup = [
    [],
    [7, 2, 8, 10],
    [
        10, 3, 8, 10, 9, 11, 14, 15, 2, 20, 16, 18, 17, 18, 16, 19, 17, 19, 16, 20,
        17, 20,
    ],
];
exports.bossMonster = new classes_1.Monster(0);
exports.theDoor = new classes_1.Door(99);
exports.greenPotionsTotal = [1, 1, 3];
exports.redPotionsTotal = [0, 0, 1];
function instantiateSetupArrays() {
    for (var i = 0; i < exports.witchSetup[variables_1.monsterLevel - 1].length; i += 2) {
        var witch = new classes_1.Witch(i / 2);
        variables_1.monsterList.push(witch);
        variables_1.witchList.push(witch);
    }
    for (var i = 0; i < exports.redDoorSetup[variables_1.monsterLevel - 1].length; i += 2) {
        var red2Door = new classes_1.RedDoor(i / 2);
        variables_1.monsterList.push(red2Door);
        variables_1.doorList.push(red2Door);
    }
    for (var i = 0; i < exports.skeletonSetup[variables_1.monsterLevel - 1].length; i += 2) {
        var skeleton = new classes_1.Skeleton(i / 2);
        variables_1.monsterList.push(skeleton);
    }
    for (var i = 0; i < exports.guardSetup[variables_1.monsterLevel - 1].length; i += 2) {
        var guard = new classes_1.Guard(i / 2);
        variables_1.monsterList.push(guard);
    }
    for (var i = 0; i < exports.greenChestSetup[variables_1.monsterLevel - 1].length; i += 2) {
        var greenChest = new classes_1.GreenChest(i / 2);
        variables_1.monsterList.push(greenChest);
        variables_1.greenChestList.push(greenChest);
        variables_1.chestList.push(greenChest);
    }
    for (var i = 0; i < exports.redChestSetup[variables_1.monsterLevel - 1].length; i += 2) {
        var red2Chest = new classes_1.RedChest(i / 2);
        variables_1.monsterList.push(red2Chest);
        variables_1.redChestList.push(red2Chest);
        variables_1.chestList.push(red2Chest);
    }
    for (var i = 0; i < exports.greenDoorSetup[variables_1.monsterLevel - 1].length; i += 2) {
        var greenDoor = new classes_1.GreenDoor(i / 2);
        variables_1.monsterList.push(greenDoor);
        variables_1.doorList.push(greenDoor);
    }
    variables_1.monsterList.push(exports.bossMonster);
    variables_1.monsterList.push(exports.theDoor);
    variables_1.doorList.push(exports.theDoor);
}
exports.instantiateSetupArrays = instantiateSetupArrays;

},{"./classes":1,"./variables":9}],6:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.checkIfBattleForMonsters = exports.assignKey = exports.attemptToMoveMonster = exports.isLOSunblocked = exports.findShortestPath = exports.checkLineOfSight = exports.losArray = exports.iterateList = exports.resetMonsters = exports.renderDeadMonster = exports.renderMonster = exports.renderAllMonsters = exports.unblocked = exports.pathToPaint = void 0;
var variables_1 = require("./variables");
var utility_1 = require("./utility");
var index_1 = require("./index");
var mapgeneration_1 = require("./mapgeneration");
exports.pathToPaint = [];
// import cloneDeep from 'lodash.clonedeep';
exports.unblocked = false;
function renderAllMonsters() {
    for (var i = 0; i < variables_1.monsterList.length; i++) {
        renderDeadMonster(variables_1.monsterList[i]);
    }
    for (var i = 0; i < variables_1.monsterList.length; i++) {
        renderMonster(variables_1.monsterList[i]);
    }
}
exports.renderAllMonsters = renderAllMonsters;
function renderMonster(specimen) {
    if (specimen.alive &&
        specimen.x - index_1.scrollingModifierX <= 10 &&
        specimen.y - index_1.scrollingModifierY <= 10) {
        variables_1.ctx.drawImage((0, utility_1.getSpriteByName)(specimen.image), (specimen.x - 1 - index_1.scrollingModifierX) * variables_1.tileWidth, (specimen.y - 1 - index_1.scrollingModifierY) * variables_1.tileWidth, variables_1.tileWidth, variables_1.tileWidth);
    }
}
exports.renderMonster = renderMonster;
function renderDeadMonster(specimen) {
    if (!specimen.alive &&
        specimen.x - index_1.scrollingModifierX <= 10 &&
        specimen.y - index_1.scrollingModifierY <= 10) {
        variables_1.ctx.drawImage(variables_1.blood, (specimen.x - 1 - index_1.scrollingModifierX) * variables_1.tileWidth, (specimen.y - 1 - index_1.scrollingModifierY) * variables_1.tileWidth, variables_1.tileWidth, variables_1.tileWidth);
    }
}
exports.renderDeadMonster = renderDeadMonster;
function resetMonsters() {
    for (var _i = 0, monsterList_1 = variables_1.monsterList; _i < monsterList_1.length; _i++) {
        var monster = monsterList_1[_i];
        monster.init();
    }
    var swordChest;
    var greenChestKey = Math.floor(Math.random() * (variables_1.greenChestList.length - 1));
    var redChestKey = Math.floor(Math.random() * (variables_1.redChestList.length - 1));
    if (variables_1.monsterLevel == 3) {
        swordChest = Math.floor(Math.random() * (variables_1.redChestList.length - 1));
        console.log("gigachad sword in chest ".concat(swordChest));
    }
    var greenChestPotion = mapgeneration_1.greenPotionsTotal[variables_1.monsterLevel - 1];
    var redChestPotion = mapgeneration_1.redPotionsTotal[variables_1.monsterLevel - 1];
    for (var _a = 0, greenChestList_1 = variables_1.greenChestList; _a < greenChestList_1.length; _a++) {
        var chest = greenChestList_1[_a];
        if (chest.orderNumber == greenChestKey) {
            chest.hasKey = true;
        }
        else if (greenChestPotion > 0) {
            chest.hasPotion = true;
            greenChestPotion--;
        }
        else {
            chest.gold = 50;
        }
    }
    for (var _b = 0, redChestList_1 = variables_1.redChestList; _b < redChestList_1.length; _b++) {
        var chest = redChestList_1[_b];
        if (chest.orderNumber == swordChest) {
            chest.hasSword = true;
        }
        if (chest.orderNumber == redChestKey) {
            chest.hasKey = true;
        }
        else if (redChestPotion > 0) {
            chest.hasPotion = true;
            redChestPotion--;
        }
        else {
            chest.gold = 50;
        }
    }
}
exports.resetMonsters = resetMonsters;
function iterateList(input) {
    for (var _i = 0, monsterList_2 = variables_1.monsterList; _i < monsterList_2.length; _i++) {
        var specimen = monsterList_2[_i];
        input(specimen);
    }
}
exports.iterateList = iterateList;
exports.losArray = [];
function checkLineOfSight(monsterX, monsterY) {
    exports.losArray.length = 0;
    var x1 = monsterX;
    var y1 = monsterY;
    var x0 = variables_1.heroStats.x;
    var y0 = variables_1.heroStats.y;
    var sx = x0 < x1 ? 1 : -1;
    var sy = y0 < y1 ? 1 : -1;
    var dx = Math.abs(x1 - x0);
    var dy = Math.abs(y1 - y0);
    var err = (dx > dy ? dx : -dy) / 2;
    var break50 = 0;
    while (true) {
        if (break50 > 50) {
            console.log('infinite loop broken');
            break;
        }
        if (x0 === x1 && y0 === y1) {
            break;
        }
        if (err > -dx) {
            err -= dy;
            x0 += sx;
        }
        if (x0 === x1 && y0 === y1) {
            break;
        }
        if (err > -dx)
            exports.losArray.push([x0, y0]);
        if (err < dy) {
            err += dx;
            y0 += sy;
        }
        if (x0 === x1 && y0 === y1) {
            break;
        }
        exports.losArray.push([x0, y0]);
        break50++;
    }
    exports.unblocked = true;
    for (var i = 0; i < exports.losArray.length; i++) {
        if (!isLOSunblocked(exports.losArray[i][0], exports.losArray[i][1]))
            exports.unblocked = false;
    }
    if (exports.unblocked) {
        // paintPathToHero(monsterX, monsterY);
        return true;
    }
    else
        return false;
}
exports.checkLineOfSight = checkLineOfSight;
function findShortestPath(startX, startY, targetX, targetY) {
    var currentNode = {
        thisNodeX: startX,
        thisNodeY: startY,
        fScore: 999,
        gScore: 0,
        prevNode: []
    };
    var openList = [];
    var closedList = [];
    var exploreList = [];
    openList.push(currentNode);
    var _loop_1 = function () {
        exploreList.length = 0;
        exploreList = [
            [currentNode.thisNodeX, currentNode.thisNodeY - 1],
            [currentNode.thisNodeX + 1, currentNode.thisNodeY],
            [currentNode.thisNodeX, currentNode.thisNodeY + 1],
            [currentNode.thisNodeX - 1, currentNode.thisNodeY],
        ];
        loop2: for (var i = 0; i < 4; i++) {
            if (isWall(exploreList[i][0], exploreList[i][1])) {
                continue loop2;
            }
            if (isOnClosedList(exploreList[i][0], exploreList[i][1])) {
                continue loop2;
            }
            if (isOnOpenList(exploreList[i][0], exploreList[i][1])) {
                continue loop2;
            }
            var fX = exploreList[i][0] - targetX;
            var fY = exploreList[i][1] - targetY;
            var gScore = currentNode.gScore + 1;
            var fScore = Math.sqrt(fX * fX + fY * fY) + gScore;
            var newNode = {
                thisNodeX: exploreList[i][0],
                thisNodeY: exploreList[i][1],
                fScore: fScore,
                gScore: gScore,
                prevNode: [currentNode.thisNodeX, currentNode.thisNodeY]
            };
            openList.push(newNode);
        }
        openList.sort(function (a, b) { return (a.fScore < b.fScore ? -1 : 1); });
        var clone = JSON.parse(JSON.stringify(currentNode));
        closedList.push(clone);
        currentNode = JSON.parse(JSON.stringify(openList[0]));
        openList.shift();
        if (currentNode.thisNodeX == targetX && currentNode.thisNodeY == targetY) {
            var shortestPath = [];
            var current = [currentNode.thisNodeX, currentNode.thisNodeY];
            shortestPath.push(current);
            var previous_1 = closedList.find(function (element) {
                return element.thisNodeX == currentNode.prevNode[0] &&
                    element.thisNodeY == currentNode.prevNode[1];
            });
            for (var i = 0; i < currentNode.gScore; i++) {
                shortestPath.push([previous_1.thisNodeX, previous_1.thisNodeY]);
                var previous2 = closedList.find(function (element) {
                    return element.thisNodeX == previous_1.prevNode[0] &&
                        element.thisNodeY == previous_1.prevNode[1];
                });
                previous_1 = previous2;
            }
            return { value: shortestPath.reverse() };
            return "break-loop1";
        }
    };
    // loop1: for (let j = 0; j < 15; j++) {
    loop1: while (openList.length > 0) {
        var state_1 = _loop_1();
        if (typeof state_1 === "object")
            return state_1.value;
        switch (state_1) {
            case "break-loop1": break loop1;
        }
    }
    function isOnOpenList(x, y) {
        for (var _i = 0, openList_1 = openList; _i < openList_1.length; _i++) {
            var node = openList_1[_i];
            if (node.thisNodeX == x && node.thisNodeY == y)
                return true;
        }
        return false;
    }
    function isOnClosedList(x, y) {
        for (var _i = 0, closedList_1 = closedList; _i < closedList_1.length; _i++) {
            var node = closedList_1[_i];
            if (node.thisNodeX == x && node.thisNodeY == y)
                return true;
        }
        return false;
    }
    function isWall(x, y) {
        for (var i = 0; i < variables_1.wallPositionList.length; i++) {
            if (x == variables_1.wallPositionList[i][0] && y == variables_1.wallPositionList[i][1])
                return true;
        }
        return false;
    }
}
exports.findShortestPath = findShortestPath;
function isLOSunblocked(x, y) {
    for (var i = 0; i < variables_1.wallPositionList.length; i++) {
        if (x == variables_1.wallPositionList[i][0] && y == variables_1.wallPositionList[i][1]) {
            return false;
        }
    }
    return true;
}
exports.isLOSunblocked = isLOSunblocked;
function attemptToMoveMonster(specimen) {
    if (index_1.escapedown)
        return;
    if (specimen.alive && specimen.speed > 0) {
        if (checkLineOfSight(specimen.x, specimen.y) && specimen.image != 'witch') {
            specimen.path.length = 0;
            specimen.path = findShortestPath(specimen.x, specimen.y, variables_1.heroStats.x, variables_1.heroStats.y);
            console.log('new path');
            specimen.path.shift();
            console.log.apply(console, specimen.path);
            (0, variables_1.updateDestination)(specimen.path[0][0], specimen.path[0][1]);
        }
        else if (specimen.path.length > 0) {
            console.log('existing path');
            console.log.apply(console, specimen.path);
            (0, variables_1.updateDestination)(specimen.path[0][0], specimen.path[0][1]);
            specimen.path.shift();
        }
        else {
            var direction = 0;
            var hasMoved = false;
            var stopIfInfinite = 0;
            while (!hasMoved) {
                if (stopIfInfinite > 100)
                    break;
                direction = Math.floor(Math.random() * 4) + 1;
                monsterDestination(direction, specimen);
                if ((0, utility_1.checkIfMoveAllowed)() &&
                    checkOtherMonsters(specimen) &&
                    specimen.image != 'door') {
                    hasMoved = true;
                }
                stopIfInfinite++;
            }
        }
        if ((0, utility_1.checkIfMoveAllowed)() &&
            checkOtherMonsters(specimen) &&
            specimen.image != 'door') {
            specimen.x = (0, variables_1.getDestination)()[0];
            specimen.y = (0, variables_1.getDestination)()[1];
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
            variables_1.monsterList[i].y == (0, variables_1.getDestination)()[1] &&
            variables_1.monsterList[i].alive) {
            return false;
        }
    }
    return true;
}
function assignKey() {
    var witchNumber = Math.floor(Math.random() * (variables_1.witchList.length - 1));
    for (var _i = 0, witchList_1 = variables_1.witchList; _i < witchList_1.length; _i++) {
        var witsch = witchList_1[_i];
        if (witsch.orderNumber == witchNumber) {
            witsch.hasKey = true;
        }
        else {
            witsch.hasKey = false;
        }
    }
}
exports.assignKey = assignKey;
function checkIfBattleForMonsters() {
    for (var _i = 0, monsterList_3 = variables_1.monsterList; _i < monsterList_3.length; _i++) {
        var monster = monsterList_3[_i];
        if (variables_1.heroStats.x == monster.x &&
            variables_1.heroStats.y == monster.y &&
            monster.alive &&
            monster.speed > 0) {
            (0, utility_1.battle)(monster);
        }
    }
}
exports.checkIfBattleForMonsters = checkIfBattleForMonsters;

},{"./index":3,"./mapgeneration":5,"./utility":8,"./variables":9}],7:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.setMapSize = exports.pushBoundariesToWallList = exports.adjustWalls = exports.setup = exports.mapSize = exports.floorList = void 0;
var monster_1 = require("./monster");
var hero_1 = require("./hero");
var variables_1 = require("./variables");
var mapgeneration_1 = require("./mapgeneration");
exports.floorList = [1, 1];
exports.mapSize = 10;
function setup() {
    (0, variables_1.emptyMapLists)();
    (0, mapgeneration_1.instantiateSetupArrays)();
    adjustWalls();
    pushBoundariesToWallList();
    (0, hero_1.heroInit)();
    (0, monster_1.resetMonsters)();
    (0, monster_1.assignKey)();
}
exports.setup = setup;
function adjustWalls() {
    for (var i = 0; i < mapgeneration_1.wallSetup[variables_1.monsterLevel - 1].length; i += 2) {
        variables_1.wallPositionList.push([
            mapgeneration_1.wallSetup[variables_1.monsterLevel - 1][i],
            mapgeneration_1.wallSetup[variables_1.monsterLevel - 1][i + 1],
        ]);
    }
}
exports.adjustWalls = adjustWalls;
function pushBoundariesToWallList() {
    for (var j = 1; j < exports.mapSize + 1; j++) {
        variables_1.wallPositionList.push([j, exports.mapSize + 1]);
    }
    for (var j = 1; j < exports.mapSize + 1; j++) {
        variables_1.wallPositionList.push([j, 0]);
    }
    for (var k = 1; k < exports.mapSize + 1; k++) {
        variables_1.wallPositionList.push([0, k]);
    }
    for (var k = 1; k < exports.mapSize + 1; k++) {
        variables_1.wallPositionList.push([exports.mapSize + 1, k]);
    }
}
exports.pushBoundariesToWallList = pushBoundariesToWallList;
function setMapSize() {
    exports.mapSize = 5 + variables_1.monsterLevel * 5;
}
exports.setMapSize = setMapSize;

},{"./hero":2,"./mapgeneration":5,"./monster":6,"./variables":9}],8:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.writeGameLog = exports.gameLog = exports.battle = exports.checkIfMoveAllowed = exports.getSpriteByName = exports.d3 = exports.d6 = void 0;
var variables_1 = require("./variables");
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
        case 'witch':
            return variables_1.witch;
        case 'guard':
            return variables_1.guard;
        case 'greenChest':
            return variables_1.greenChest;
        case 'greenDoor':
            return variables_1.greenDoor;
        case 'greenChestOpen':
            return variables_1.greenChestOpen;
        case 'redChestOpen':
            return variables_1.redChestOpen;
        case 'greenKey':
            return variables_1.greenKey;
        case 'redKey':
            return variables_1.redKey;
        case 'pButton':
            return variables_1.pButton;
        case 'pdButton':
            return variables_1.pdButton;
        case 'axe':
            return variables_1.axe;
        case 'square':
            return variables_1.square;
        case 'redChest':
            return variables_1.redChest;
        case 'redDoor':
            return variables_1.redDoor;
        case 'up':
            return variables_1.up;
        case 'upd':
            return variables_1.upd;
        case 'down':
            return variables_1.down;
        case 'downd':
            return variables_1.downd;
        case 'left':
            return variables_1.left;
        case 'leftd':
            return variables_1.leftd;
        case 'right':
            return variables_1.right;
        case 'rightd':
            return variables_1.rightd;
        case 'escape':
            return variables_1.escape;
        case 'escaped':
            return variables_1.escaped;
        case 'pause':
            return variables_1.pause;
        case 'nupause':
            return variables_1.unpause;
        case 'sword':
            return variables_1.unpause;
    }
    return variables_1.heroDown;
}
exports.getSpriteByName = getSpriteByName;
function checkIfMoveAllowed() {
    for (var i = 0; i < variables_1.wallPositionList.length; i++) {
        if ((0, variables_1.getDestination)()[0] == variables_1.wallPositionList[i][0] &&
            (0, variables_1.getDestination)()[1] == variables_1.wallPositionList[i][1])
            return false;
    }
    return true;
}
exports.checkIfMoveAllowed = checkIfMoveAllowed;
function battle(monster) {
    if (variables_1.heroStats.currentHP < 1)
        return;
    var startingHP = variables_1.heroStats.currentHP;
    var startingOverkill = variables_1.heroStats.overKillPoints;
    var damageTracker = 0;
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
            damageTracker += heroAttack - monster.DP;
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
    if (monster.hasKey == true) {
        variables_1.heroStats.hasKey = true;
    }
    monster.alive = false;
    if (variables_1.heroStats.currentHP > 0) {
        if (monster.image == 'skeleton')
            xpGain = 1;
        if (monster.image == 'boss')
            xpGain = 3;
        if (monster.image == 'guard')
            xpGain = 2;
        writeGameLog("HP lost ".concat(startingHP - variables_1.heroStats.currentHP, " / Damage given ").concat(damageTracker, " / Overkill points ").concat(variables_1.heroStats.overKillPoints - startingOverkill, " "));
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

},{"./variables":9}],9:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.resetSpeed = exports.updateSpeed = exports.moveEveryXMiliseconds = exports.heroXpArray = exports.monsterLevel = exports.heroStats = exports.sword = exports.unpause = exports.pause = exports.escaped = exports.escape = exports.leftd = exports.left = exports.rightd = exports.right = exports.downd = exports.down = exports.upd = exports.up = exports.spaced = exports.space = exports.square = exports.axe = exports.pdButton = exports.pButton = exports.redKey = exports.greenKey = exports.guard = exports.witch = exports.redChestOpen = exports.redChest = exports.greenChestOpen = exports.greenChest = exports.redDoor = exports.greenDoor = exports.door = exports.potion = exports.die = exports.key = exports.blood = exports.boss = exports.wall = exports.floor = exports.heroRight = exports.heroLeft = exports.heroDown = exports.heroUp = exports.skeleton = exports.ctx = exports.canvas = void 0;
exports.getDestination = exports.updateDestination = exports.resetMonstersLevel = exports.updateMonstersLevel = exports.updateMonsterHasKey = exports.monsterHasKey = exports.emptyMapLists = exports.wallPositionList = exports.chestList = exports.redChestList = exports.greenChestList = exports.doorList = exports.witchList = exports.monsterList = exports.tileWidth = void 0;
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
exports.greenDoor = document.getElementById('greenDoor');
exports.redDoor = document.getElementById('redDoor');
exports.greenChest = document.getElementById('greenChest');
exports.greenChestOpen = document.getElementById('greenChestOpen');
exports.redChest = document.getElementById('redChest');
exports.redChestOpen = document.getElementById('redChestOpen');
exports.witch = document.getElementById('witch');
exports.guard = document.getElementById('guard');
exports.greenKey = document.getElementById('greenKey');
exports.redKey = document.getElementById('redKey');
exports.pButton = document.getElementById('pButton');
exports.pdButton = document.getElementById('pdButton');
exports.axe = document.getElementById('axe');
exports.square = document.getElementById('square');
exports.space = document.getElementById('space');
exports.spaced = document.getElementById('spaced');
exports.up = document.getElementById('up');
exports.upd = document.getElementById('upd');
exports.down = document.getElementById('down');
exports.downd = document.getElementById('downd');
exports.right = document.getElementById('right');
exports.rightd = document.getElementById('rightd');
exports.left = document.getElementById('left');
exports.leftd = document.getElementById('leftd');
exports.escape = document.getElementById('escape');
exports.escaped = document.getElementById('escaped');
exports.pause = document.getElementById('pause');
exports.unpause = document.getElementById('unpause');
exports.sword = document.getElementById('sword');
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
    hasPotion: 0,
    hasGreenKey: false,
    hasRedKey: false,
    hasSword: false,
    overKillPoints: 0,
    overKill: true,
    neededXP: 0,
    currentXP: 0,
    gold: 0,
    highscore: 0
};
exports.monsterLevel = 1;
exports.heroXpArray = [0, 2, 6, 10, 14, 18, 28, 35, 43, 52, 72];
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
exports.monsterList = [];
exports.witchList = [];
exports.doorList = [];
exports.greenChestList = [];
exports.redChestList = [];
exports.chestList = [];
exports.wallPositionList = [];
function emptyMapLists() {
    exports.wallPositionList = [];
    exports.witchList = [];
    exports.doorList = [];
    exports.greenChestList = [];
    exports.redChestList = [];
    exports.chestList = [];
    exports.monsterList = [];
}
exports.emptyMapLists = emptyMapLists;
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

},{"./utility":8}]},{},[3]);
