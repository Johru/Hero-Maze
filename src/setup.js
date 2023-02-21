"use strict";
exports.__esModule = true;
exports.setMapSize = exports.pushBoundariesToWallList = exports.adjustWalls = exports.setup = exports.mapSize = exports.floorList = void 0;
var monster_1 = require("./monster");
var hero_1 = require("./hero");
var variables_1 = require("./variables");
var mapgeneration_1 = require("./mapgeneration");
exports.floorList = [1, 1];
exports.mapSize = 10;
function setup() {
    (0, variables_1.emptyMapLists)();
    (0, mapgeneration_1.instantiateSetupArrays)();
    adjustWalls();
    pushBoundariesToWallList();
    (0, hero_1.heroInit)();
    (0, monster_1.resetMonsters)();
    (0, monster_1.assignKey)();
}
exports.setup = setup;
function adjustWalls() {
    for (var i = 0; i < mapgeneration_1.wallSetup[variables_1.monsterLevel - 1].length; i += 2) {
        variables_1.wallPositionList.push([
            mapgeneration_1.wallSetup[variables_1.monsterLevel - 1][i],
            mapgeneration_1.wallSetup[variables_1.monsterLevel - 1][i + 1],
        ]);
    }
}
exports.adjustWalls = adjustWalls;
function pushBoundariesToWallList() {
    for (var j = 1; j < exports.mapSize + 1; j++) {
        variables_1.wallPositionList.push([j, exports.mapSize + 1]);
    }
    for (var j = 1; j < exports.mapSize + 1; j++) {
        variables_1.wallPositionList.push([j, 0]);
    }
    for (var k = 1; k < exports.mapSize + 1; k++) {
        variables_1.wallPositionList.push([0, k]);
    }
    for (var k = 1; k < exports.mapSize + 1; k++) {
        variables_1.wallPositionList.push([exports.mapSize + 1, k]);
    }
}
exports.pushBoundariesToWallList = pushBoundariesToWallList;
function setMapSize() {
    exports.mapSize = 5 + variables_1.monsterLevel * 5;
}
exports.setMapSize = setMapSize;
