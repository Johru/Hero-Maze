"use strict";
exports.__esModule = true;
exports.checkIfBattle = exports.makeDestination = exports.attemptToMoveHero = exports.renderHero = exports.increaseMapLevel = exports.heroInit = exports.checkIfHeroDead = void 0;
var variables_1 = require("./variables");
var utility_1 = require("./utility");
var index_1 = require("./index");
var random_1 = require("./random");
function checkIfHeroDead() {
    if (variables_1.heroStats.currentHP < 1) {
        (0, utility_1.writeGameLog)('YOU DIED');
        (0, variables_1.resetMonstersLevel)();
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
    variables_1.heroStats.maxHP = (0, utility_1.d6)(3) + 20;
    variables_1.heroStats.currentHP = 6;
    variables_1.heroStats.DP = (0, utility_1.d6)(2);
    variables_1.heroStats.SP = (0, utility_1.d6)(1) + 7;
    variables_1.heroStats.currentHP = variables_1.heroStats.maxHP;
}
exports.heroInit = heroInit;
function increaseMapLevel() {
    var hpGainRandomizer = Math.random() * 100 + 1;
    var originalHP = variables_1.heroStats.currentHP;
    if (hpGainRandomizer <= 10) {
        variables_1.heroStats.currentHP = variables_1.heroStats.maxHP;
    }
    if (40 >= hpGainRandomizer && hpGainRandomizer > 10) {
        variables_1.heroStats.currentHP = variables_1.heroStats.currentHP + Math.floor(variables_1.heroStats.maxHP / 3);
    }
    if (hpGainRandomizer > 40) {
        variables_1.heroStats.currentHP =
            variables_1.heroStats.currentHP + Math.floor(variables_1.heroStats.maxHP / 10);
    }
    if (variables_1.heroStats.currentHP > variables_1.heroStats.maxHP) {
        variables_1.heroStats.currentHP = variables_1.heroStats.maxHP;
    }
    (0, utility_1.writeGameLog)("Your HP increased by ".concat(variables_1.heroStats.currentHP - originalHP));
    variables_1.heroStats.x = 1;
    variables_1.heroStats.y = 1;
    variables_1.heroStats.hasKey = false;
    (0, variables_1.updateMonstersLevel)(1);
}
exports.increaseMapLevel = increaseMapLevel;
function renderHero() {
    variables_1.ctx.drawImage((0, utility_1.getSpriteByName)(variables_1.heroStats.facing), (variables_1.heroStats.x - 1 - index_1.scrollingModifierX) * variables_1.tileWidth, (variables_1.heroStats.y - 1 - index_1.scrollingModifierY) * variables_1.tileWidth, variables_1.tileWidth, variables_1.tileWidth);
}
exports.renderHero = renderHero;
function attemptToMoveHero() {
    makeDestination();
    checkIfBattle();
    return (0, utility_1.checkIfMoveAllowed)();
}
exports.attemptToMoveHero = attemptToMoveHero;
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
            monster.alive) {
            (0, utility_1.battle)(monster);
        }
    }
}
exports.checkIfBattle = checkIfBattle;
