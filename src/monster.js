"use strict";
exports.__esModule = true;
exports.checkIfBattleForMonsters = exports.assignKey = exports.attemptToMoveMonster = exports.iterateList = exports.resetMonsters = exports.renderMonster = exports.renderAllMonsters = void 0;
var variables_1 = require("./variables");
var utility_1 = require("./utility");
var index_1 = require("./index");
var mapgeneration_1 = require("./mapgeneration");
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
    var swordChest;
    var greenChestKey = (Math.floor(Math.random() * (variables_1.greenChestList.length - 1)));
    var redChestKey = (Math.floor(Math.random() * (variables_1.redChestList.length - 1)));
    if (variables_1.monsterLevel == 3) {
        swordChest = (Math.floor(Math.random() * (variables_1.redChestList.length - 1)));
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
function attemptToMoveMonster(specimen) {
    if (index_1.escapedown)
        return;
    if (specimen.alive && specimen.speed > 0) {
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
    var witchNumber = (Math.floor(Math.random() * (variables_1.witchList.length - 1)));
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
        if (variables_1.heroStats.x == monster.x && variables_1.heroStats.y == monster.y && monster.alive && monster.speed > 0) {
            (0, utility_1.battle)(monster);
        }
    }
}
exports.checkIfBattleForMonsters = checkIfBattleForMonsters;
