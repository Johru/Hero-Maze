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
