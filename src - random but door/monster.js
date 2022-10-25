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
