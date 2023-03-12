"use strict";
exports.__esModule = true;
exports.checkIfBattleForMonsters = exports.assignKey = exports.attemptToMoveMonster = exports.isLOSunblocked = exports.findShortestPath = exports.checkLineOfSight = exports.losArray = exports.iterateList = exports.resetMonsters = exports.renderDeadMonster = exports.renderMonster = exports.renderAllMonsters = exports.unblocked = exports.pathToPaint = void 0;
var variables_1 = require("./variables");
var utility_1 = require("./utility");
var index_1 = require("./index");
var mapgeneration_1 = require("./mapgeneration");
exports.pathToPaint = [];
// import cloneDeep from 'lodash.clonedeep';
exports.unblocked = false;
function renderAllMonsters() {
    for (var i = 0; i < variables_1.monsterList.length; i++) {
        renderDeadMonster(variables_1.monsterList[i]);
    }
    for (var i = 0; i < variables_1.monsterList.length; i++) {
        renderMonster(variables_1.monsterList[i]);
    }
}
exports.renderAllMonsters = renderAllMonsters;
function renderMonster(specimen) {
    if (specimen.alive &&
        specimen.x - index_1.scrollingModifierX <= 10 &&
        specimen.y - index_1.scrollingModifierY <= 10) {
        variables_1.ctx.drawImage((0, utility_1.getSpriteByName)(specimen.image), (specimen.x - 1 - index_1.scrollingModifierX) * variables_1.tileWidth, (specimen.y - 1 - index_1.scrollingModifierY) * variables_1.tileWidth, variables_1.tileWidth, variables_1.tileWidth);
    }
}
exports.renderMonster = renderMonster;
function renderDeadMonster(specimen) {
    if (!specimen.alive &&
        specimen.x - index_1.scrollingModifierX <= 10 &&
        specimen.y - index_1.scrollingModifierY <= 10) {
        variables_1.ctx.drawImage(variables_1.blood, (specimen.x - 1 - index_1.scrollingModifierX) * variables_1.tileWidth, (specimen.y - 1 - index_1.scrollingModifierY) * variables_1.tileWidth, variables_1.tileWidth, variables_1.tileWidth);
    }
}
exports.renderDeadMonster = renderDeadMonster;
function resetMonsters() {
    for (var _i = 0, monsterList_1 = variables_1.monsterList; _i < monsterList_1.length; _i++) {
        var monster = monsterList_1[_i];
        monster.init();
    }
    var swordChest;
    var greenChestKey = Math.floor(Math.random() * (variables_1.greenChestList.length - 1));
    var redChestKey = Math.floor(Math.random() * (variables_1.redChestList.length - 1));
    if (variables_1.monsterLevel == 3) {
        swordChest = Math.floor(Math.random() * (variables_1.redChestList.length - 1));
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
exports.losArray = [];
function checkLineOfSight(monsterX, monsterY) {
    exports.losArray.length = 0;
    var x1 = monsterX;
    var y1 = monsterY;
    var x0 = variables_1.heroStats.x;
    var y0 = variables_1.heroStats.y;
    var sx = x0 < x1 ? 1 : -1;
    var sy = y0 < y1 ? 1 : -1;
    var dx = Math.abs(x1 - x0);
    var dy = Math.abs(y1 - y0);
    var err = (dx > dy ? dx : -dy) / 2;
    var break50 = 0;
    while (true) {
        if (break50 > 50) {
            console.log('infinite loop broken');
            break;
        }
        if (x0 === x1 && y0 === y1) {
            break;
        }
        if (err > -dx) {
            err -= dy;
            x0 += sx;
        }
        if (x0 === x1 && y0 === y1) {
            break;
        }
        if (err > -dx)
            exports.losArray.push([x0, y0]);
        if (err < dy) {
            err += dx;
            y0 += sy;
        }
        if (x0 === x1 && y0 === y1) {
            break;
        }
        exports.losArray.push([x0, y0]);
        break50++;
    }
    exports.unblocked = true;
    for (var i = 0; i < exports.losArray.length; i++) {
        if (!isLOSunblocked(exports.losArray[i][0], exports.losArray[i][1]))
            exports.unblocked = false;
    }
    if (exports.unblocked) {
        // paintPathToHero(monsterX, monsterY);
        return true;
    }
    else
        return false;
}
exports.checkLineOfSight = checkLineOfSight;
function findShortestPath(startX, startY, targetX, targetY) {
    var currentNode = {
        thisNodeX: startX,
        thisNodeY: startY,
        fScore: 999,
        gScore: 0,
        prevNode: []
    };
    var openList = [];
    var closedList = [];
    var exploreList = [];
    openList.push(currentNode);
    var _loop_1 = function () {
        exploreList.length = 0;
        exploreList = [
            [currentNode.thisNodeX, currentNode.thisNodeY - 1],
            [currentNode.thisNodeX + 1, currentNode.thisNodeY],
            [currentNode.thisNodeX, currentNode.thisNodeY + 1],
            [currentNode.thisNodeX - 1, currentNode.thisNodeY],
        ];
        loop2: for (var i = 0; i < 4; i++) {
            if (isWall(exploreList[i][0], exploreList[i][1])) {
                continue loop2;
            }
            if (isOnClosedList(exploreList[i][0], exploreList[i][1])) {
                continue loop2;
            }
            if (isOnOpenList(exploreList[i][0], exploreList[i][1])) {
                continue loop2;
            }
            var fX = exploreList[i][0] - targetX;
            var fY = exploreList[i][1] - targetY;
            var gScore = currentNode.gScore + 1;
            var fScore = Math.sqrt(fX * fX + fY * fY) + gScore;
            var newNode = {
                thisNodeX: exploreList[i][0],
                thisNodeY: exploreList[i][1],
                fScore: fScore,
                gScore: gScore,
                prevNode: [currentNode.thisNodeX, currentNode.thisNodeY]
            };
            openList.push(newNode);
        }
        openList.sort(function (a, b) { return (a.fScore < b.fScore ? -1 : 1); });
        var clone = JSON.parse(JSON.stringify(currentNode));
        closedList.push(clone);
        currentNode = JSON.parse(JSON.stringify(openList[0]));
        openList.shift();
        if (currentNode.thisNodeX == targetX && currentNode.thisNodeY == targetY) {
            var shortestPath = [];
            var current = [currentNode.thisNodeX, currentNode.thisNodeY];
            shortestPath.push(current);
            var previous_1 = closedList.find(function (element) {
                return element.thisNodeX == currentNode.prevNode[0] &&
                    element.thisNodeY == currentNode.prevNode[1];
            });
            for (var i = 0; i < currentNode.gScore; i++) {
                shortestPath.push([previous_1.thisNodeX, previous_1.thisNodeY]);
                var previous2 = closedList.find(function (element) {
                    return element.thisNodeX == previous_1.prevNode[0] &&
                        element.thisNodeY == previous_1.prevNode[1];
                });
                previous_1 = previous2;
            }
            return { value: shortestPath.reverse() };
            return "break-loop1";
        }
    };
    // loop1: for (let j = 0; j < 15; j++) {
    loop1: while (openList.length > 0) {
        var state_1 = _loop_1();
        if (typeof state_1 === "object")
            return state_1.value;
        switch (state_1) {
            case "break-loop1": break loop1;
        }
    }
    function isOnOpenList(x, y) {
        for (var _i = 0, openList_1 = openList; _i < openList_1.length; _i++) {
            var node = openList_1[_i];
            if (node.thisNodeX == x && node.thisNodeY == y)
                return true;
        }
        return false;
    }
    function isOnClosedList(x, y) {
        for (var _i = 0, closedList_1 = closedList; _i < closedList_1.length; _i++) {
            var node = closedList_1[_i];
            if (node.thisNodeX == x && node.thisNodeY == y)
                return true;
        }
        return false;
    }
    function isWall(x, y) {
        for (var i = 0; i < variables_1.wallPositionList.length; i++) {
            if (x == variables_1.wallPositionList[i][0] && y == variables_1.wallPositionList[i][1])
                return true;
        }
        return false;
    }
}
exports.findShortestPath = findShortestPath;
function isLOSunblocked(x, y) {
    for (var i = 0; i < variables_1.wallPositionList.length; i++) {
        if (x == variables_1.wallPositionList[i][0] && y == variables_1.wallPositionList[i][1]) {
            return false;
        }
    }
    return true;
}
exports.isLOSunblocked = isLOSunblocked;
function attemptToMoveMonster(specimen) {
    if (index_1.escapedown)
        return;
    if (specimen.alive && specimen.speed > 0) {
        if (checkLineOfSight(specimen.x, specimen.y) && specimen.image != 'witch') {
            specimen.path.length = 0;
            specimen.path = findShortestPath(specimen.x, specimen.y, variables_1.heroStats.x, variables_1.heroStats.y);
            console.log('new path');
            specimen.path.shift();
            console.log.apply(console, specimen.path);
            (0, variables_1.updateDestination)(specimen.path[0][0], specimen.path[0][1]);
        }
        else if (specimen.path.length > 0) {
            console.log('existing path');
            console.log.apply(console, specimen.path);
            (0, variables_1.updateDestination)(specimen.path[0][0], specimen.path[0][1]);
            specimen.path.shift();
        }
        else {
            var direction = 0;
            var hasMoved = false;
            var stopIfInfinite = 0;
            while (!hasMoved) {
                if (stopIfInfinite > 100)
                    break;
                direction = Math.floor(Math.random() * 4) + 1;
                monsterDestination(direction, specimen);
                if ((0, utility_1.checkIfMoveAllowed)() &&
                    checkOtherMonsters(specimen) &&
                    specimen.image != 'door') {
                    hasMoved = true;
                }
                stopIfInfinite++;
            }
        }
        if ((0, utility_1.checkIfMoveAllowed)() &&
            checkOtherMonsters(specimen) &&
            specimen.image != 'door') {
            specimen.x = (0, variables_1.getDestination)()[0];
            specimen.y = (0, variables_1.getDestination)()[1];
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
            variables_1.monsterList[i].y == (0, variables_1.getDestination)()[1] &&
            variables_1.monsterList[i].alive) {
            return false;
        }
    }
    return true;
}
function assignKey() {
    var witchNumber = Math.floor(Math.random() * (variables_1.witchList.length - 1));
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
        if (variables_1.heroStats.x == monster.x &&
            variables_1.heroStats.y == monster.y &&
            monster.alive &&
            monster.speed > 0) {
            (0, utility_1.battle)(monster);
        }
    }
}
exports.checkIfBattleForMonsters = checkIfBattleForMonsters;
