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
