"use strict";
exports.__esModule = true;
exports.pushBoundariesToWallList = exports.setup = void 0;
var variables_1 = require("./variables");
var monster_1 = require("./monster");
var hero_1 = require("./hero");
var random_1 = require("./random");
function setup() {
    (0, random_1.randomizeFloor)();
    (0, random_1.adjustWalls)();
    //console.log(floorList);
    // console.log(wallPositionList);
    pushBoundariesToWallList();
    (0, hero_1.heroInit)();
    (0, monster_1.resetMonsters)();
    (0, monster_1.assignKey)();
}
exports.setup = setup;
function pushBoundariesToWallList() {
    for (var j = 1; j < random_1.mapSize + 1; j++) {
        variables_1.wallPositionList.push([j, random_1.mapSize + 1]);
    }
    for (var j = 1; j < random_1.mapSize + 1; j++) {
        variables_1.wallPositionList.push([j, 0]);
    }
    for (var k = 1; k < random_1.mapSize + 1; k++) {
        variables_1.wallPositionList.push([0, k]);
    }
    for (var k = 1; k < random_1.mapSize + 1; k++) {
        variables_1.wallPositionList.push([random_1.mapSize + 1, k]);
    }
}
exports.pushBoundariesToWallList = pushBoundariesToWallList;
