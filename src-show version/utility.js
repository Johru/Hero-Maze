"use strict";
exports.__esModule = true;
exports.writeGameLog = exports.gameLog = exports.battle = exports.checkIfMoveAllowed = exports.getSpriteByName = exports.d6 = void 0;
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
    var originalHP = variables_1.heroStats.currentHP;
    while (monster.HP > 0 && stopIfInfinite < 10000) {
        var heroAttack = variables_1.heroStats.SP + d6(1);
        var monsterAttack = monster.SP + d6(1);
        if (heroAttack > monster.DP) {
            monster.HP -= heroAttack - monster.DP;
        }
        if (monsterAttack > variables_1.heroStats.DP) {
            variables_1.heroStats.currentHP -= monsterAttack - variables_1.heroStats.DP;
        }
        stopIfInfinite++;
    }
    monster.alive = false;
    var hpLostBattle = originalHP - variables_1.heroStats.currentHP;
    var hpBoost = d6(1);
    variables_1.heroStats.maxHP += hpBoost;
    variables_1.heroStats.currentHP += hpBoost;
    variables_1.heroStats.DP += 1;
    variables_1.heroStats.SP += 2;
    variables_1.heroStats.level++;
    if (monster.orderNumber == variables_1.monsterHasKey) {
        variables_1.heroStats.hasKey = true;
        writeGameLog("You killed a ".concat(monster.image, " and obtained the Key!."));
    }
    else {
        writeGameLog("You killed a ".concat(monster.image, "."));
    }
    writeGameLog("You lost ".concat(hpLostBattle, " HP. Level-up gave you ").concat(hpBoost, " HP"));
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
