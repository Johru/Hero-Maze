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
