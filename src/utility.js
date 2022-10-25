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
