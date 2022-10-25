"use strict";
exports.__esModule = true;
exports.pushBoundariesToWallList = exports.checkIfAlreadyFloor = exports.adjustWalls = exports.randomizeFloor = exports.setup = exports.emptyMapLists = exports.mapSize = exports.wallPositionList = exports.floorList = void 0;
var monster_1 = require("./monster");
var hero_1 = require("./hero");
exports.floorList = [1, 1];
exports.wallPositionList = [];
exports.mapSize = 20;
var currentX = 1;
var currentY = 1;
var direction = 0;
var canMove = false;
var stopIfInfinite = 0;
var targetX = 1;
var targetY = 1;
var adjacentX = 0;
var adjacentY = 0;
function emptyMapLists() {
    exports.wallPositionList = [];
    exports.floorList = [1, 1];
    currentX = 1;
    currentY = 1;
    targetX = 1;
    targetY = 1;
}
exports.emptyMapLists = emptyMapLists;
function setup() {
    emptyMapLists();
    randomizeFloor();
    adjustWalls();
    pushBoundariesToWallList();
    (0, hero_1.heroInit)();
    (0, monster_1.resetMonsters)();
    (0, monster_1.assignKey)();
}
exports.setup = setup;
function randomizeFloor() {
    while (exports.floorList.length < (exports.mapSize * exports.mapSize * 5) / 4) {
        if (stopIfInfinite > 100000) {
            console.log('infinite loop stopped at 100 000');
            break;
        }
        direction = Math.floor(Math.random() * 4) + 1;
        setTarget(direction);
        if (!checkIfAlreadyFloor(targetX, targetY)) {
            console.log("going back on existing floor, not placing new.");
            currentX = targetX;
            currentY = targetY;
            stopIfInfinite++;
            continue;
        }
        innerloop: for (var i = 1; i < 5; i++) {
            setAdjacent(i);
            if (!checkAdjacent()) {
                canMove = false;
                resetAdjacent();
                targetX = currentX;
                targetY = currentY;
                break innerloop;
            }
            resetAdjacent();
            canMove = true;
        }
        if (canMove) {
            currentX = targetX;
            currentY = targetY;
            if (checkIfAlreadyFloor(currentX, currentY)) {
                exports.floorList.push(currentX);
                exports.floorList.push(currentY);
            }
        }
        stopIfInfinite++;
    }
    console.log("".concat(stopIfInfinite, " attempts were needed to place floor tiles."));
    stopIfInfinite = 0;
}
exports.randomizeFloor = randomizeFloor;
function setAdjacent(input) {
    switch (input) {
        case 1: //down
            return adjacentY++;
        case 2: //up
            return adjacentY--;
        case 3: //left
            return adjacentX++;
        case 4: //right
            return adjacentX--;
    }
}
function resetAdjacent() {
    adjacentX = targetX;
    adjacentY = targetY;
}
function checkAdjacent() {
    if (!(adjacentX == currentX && adjacentY == currentY)) {
        return checkIfAlreadyFloor(adjacentX, adjacentY);
    }
    return true;
}
function adjustWalls() {
    for (var y = 1; y <= exports.mapSize; y++) {
        for (var x = 1; x <= exports.mapSize; x++) {
            targetX = x;
            targetY = y;
            if (checkIfAlreadyFloor(targetX, targetY)) {
                exports.wallPositionList.push([x, y]);
            }
        }
    }
}
exports.adjustWalls = adjustWalls;
function checkIfAlreadyFloor(x, y) {
    for (var j = 0; j < exports.floorList.length; j += 2) {
        if (x == exports.floorList[j] && y == exports.floorList[j + 1])
            return false;
    }
    return true;
}
exports.checkIfAlreadyFloor = checkIfAlreadyFloor;
function setTarget(input) {
    switch (input) {
        case 1: //down
            if (targetY < exports.mapSize) {
                targetY++;
            }
            break;
        case 2: //up
            if (targetY > 1) {
                targetY--;
            }
            break;
        case 3: //left
            if (targetX > 1) {
                targetX--;
            }
            break;
        case 4: //right
            if (targetX < exports.mapSize) {
                targetX++;
            }
            break;
    }
}
function pushBoundariesToWallList() {
    for (var j = 1; j < exports.mapSize + 1; j++) {
        exports.wallPositionList.push([j, exports.mapSize + 1]);
    }
    for (var j = 1; j < exports.mapSize + 1; j++) {
        exports.wallPositionList.push([j, 0]);
    }
    for (var k = 1; k < exports.mapSize + 1; k++) {
        exports.wallPositionList.push([0, k]);
    }
    for (var k = 1; k < exports.mapSize + 1; k++) {
        exports.wallPositionList.push([exports.mapSize + 1, k]);
    }
}
exports.pushBoundariesToWallList = pushBoundariesToWallList;
