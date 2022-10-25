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
