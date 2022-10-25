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
