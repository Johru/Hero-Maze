"use strict";
exports.__esModule = true;
exports.instantiateSetupArrays = exports.redPotionsTotal = exports.greenPotionsTotal = exports.theDoor = exports.bossMonster = exports.guardSetup = exports.bossSetup = exports.skeletonSetup = exports.redChestSetup = exports.redDoorSetup = exports.greenChestSetup = exports.greenDoorSetup = exports.witchSetup = exports.wallSetup = void 0;
var classes_1 = require("./classes");
var variables_1 = require("./variables");
exports.wallSetup = [
    // [
    //   3, 3, 4, 4, 6, 6, 7, 7, 7, 2, 7, 3, 7, 4, 2, 7, 3, 7, 4, 7, 2, 2, 3, 2, 4,
    //   2, 5, 2,
    // ],
    [
        3, 1, 8, 1, 9, 1, 2, 2, 3, 2, 5, 2, 6, 2, 8, 2, 6, 3, 8, 3, 2, 4, 3, 4, 4,
        4, 6, 4, 2, 5, 4, 5, 6, 5, 8, 5, 9, 5, 10, 5, 2, 6, 4, 6, 8, 6, 6, 7, 1, 8,
        2, 8, 8, 8, 10, 8, 5, 9, 6, 9, 7, 9, 8, 9, 3, 10, 8, 10,
    ],
    [
        2, 1, 6, 1, 8, 1, 6, 2, 2, 3, 3, 3, 6, 3, 7, 3, 8, 3, 9, 3, 10, 3, 12, 3,
        13, 3, 14, 3, 2, 4, 12, 4, 4, 5, 5, 5, 7, 5, 8, 5, 12, 5, 13, 5, 14, 5, 1,
        6, 2, 6, 4, 6, 12, 6, 2, 7, 4, 7, 6, 7, 8, 7, 9, 7, 11, 7, 14, 7, 15, 7, 2,
        8, 6, 8, 9, 8, 11, 8, 2, 9, 3, 9, 4, 9, 6, 9, 9, 9, 11, 9, 12, 9, 13, 9, 14,
        9, 6, 10, 9, 10, 11, 10, 2, 11, 3, 11, 4, 11, 6, 11, 7, 11, 8, 11, 9, 11,
        12, 12, 13, 12, 1, 13, 2, 13, 3, 13, 6, 13, 8, 13, 9, 13, 11, 13, 12, 13, 6,
        14, 9, 14, 12, 14, 14, 14, 15, 14, 3, 15, 6, 15, 12, 15,
    ],
    [
        2, 1, 3, 1, 13, 1, 5, 2, 8, 2, 9, 2, 10, 2, 11, 2, 13, 2, 15, 2, 18, 2, 1,
        3, 3, 3, 5, 3, 8, 3, 15, 3, 18, 3, 3, 4, 5, 4, 6, 4, 7, 4, 8, 4, 10, 4, 11,
        4, 12, 4, 15, 4, 18, 4, 19, 4, 20, 4, 3, 5, 10, 5, 12, 5, 13, 5, 14, 5, 15,
        5, 1, 6, 2, 6, 3, 6, 5, 6, 6, 6, 7, 6, 9, 6, 10, 6, 12, 6, 15, 6, 16, 6, 17,
        6, 18, 6, 5, 7, 12, 7, 15, 7, 18, 7, 2, 8, 3, 8, 4, 8, 5, 8, 7, 8, 8, 8, 9,
        8, 10, 8, 12, 8, 14, 8, 15, 8, 18, 8, 3, 9, 7, 9, 12, 9, 2, 10, 3, 10, 5,
        10, 7, 10, 10, 10, 14, 10, 15, 10, 16, 10, 18, 10, 19, 10, 20, 10, 5, 11, 7,
        11, 10, 11, 12, 11, 14, 11, 18, 11, 2, 12, 3, 12, 7, 12, 8, 12, 9, 12, 10,
        12, 12, 12, 14, 12, 15, 12, 16, 12, 18, 12, 19, 12, 2, 13, 5, 13, 19, 13, 5,
        14, 6, 14, 8, 14, 9, 14, 11, 14,
        12, 14, 13, 14, 14, 14,
        15, 14, 17, 14, 19, 14, 2, 15, 3, 15, 9, 15, 11, 15, 17, 15, 3, 16, 5, 16,
        6, 16, 7, 16, 11, 16, 12, 16, 13, 16, 14, 16, 15, 16, 17, 16, 18, 16, 20,
        16, 3, 17, 5, 17, 9, 17, 3, 18, 5, 18, 7, 18, 8, 18, 9, 18, 11, 18, 13, 18,
        14, 18, 15, 18, 18, 18, 19, 18, 1, 19, 2, 19, 3, 19, 4, 19, 5, 19, 7, 19,
        11, 19, 15, 19, 18, 19, 11, 20, 12, 20, 15, 20, 18, 20,
    ],
];
exports.witchSetup = [
    [7, 10],
    [1, 7],
    [1, 4, 1, 18],
];
exports.greenDoorSetup = [
    [9, 8],
    [14, 15],
    [5, 1, 1, 15],
];
exports.greenChestSetup = [
    [10, 1, 1, 10],
    [7, 1, 1, 15],
    [1, 5, 2, 5, 7, 2, 13, 4, 14, 6, 14, 7, 15, 11, 19, 11, 12, 15, 4, 18],
];
exports.redDoorSetup = [
    [],
    [11, 3, 3, 14],
    [2, 3, 11, 3, 13, 8, 3, 11, 20, 14, 15, 15],
];
exports.redChestSetup = [
    [],
    [7, 10],
    [7, 3, 20, 1, 2, 9, 8, 11, 14, 19, 1, 20],
];
exports.skeletonSetup = [
    [6, 6, 9, 2, 2, 9],
    [3, 4, 11, 4, 14, 4, 10, 12, 4, 14],
    [6, 2, 4, 5, 1, 9, 14, 4, 16, 7, 16, 11, 20, 12, 7, 15],
];
exports.bossSetup = [
    [9, 9],
    [13, 15],
    [19, 20],
];
exports.guardSetup = [
    [],
    [7, 2, 8, 10],
    [
        10, 3, 8, 10, 9, 11, 14, 15, 2, 20, 16, 18, 17, 18, 16, 19, 17, 19, 16, 20,
        17, 20,
    ],
];
exports.bossMonster = new classes_1.Monster(0);
exports.theDoor = new classes_1.Door(99);
exports.greenPotionsTotal = [1, 1, 3];
exports.redPotionsTotal = [0, 0, 1];
function instantiateSetupArrays() {
    for (var i = 0; i < exports.witchSetup[variables_1.monsterLevel - 1].length; i += 2) {
        var witch = new classes_1.Witch(i / 2);
        variables_1.monsterList.push(witch);
        variables_1.witchList.push(witch);
    }
    for (var i = 0; i < exports.redDoorSetup[variables_1.monsterLevel - 1].length; i += 2) {
        var red2Door = new classes_1.RedDoor(i / 2);
        variables_1.monsterList.push(red2Door);
        variables_1.doorList.push(red2Door);
    }
    for (var i = 0; i < exports.skeletonSetup[variables_1.monsterLevel - 1].length; i += 2) {
        var skeleton = new classes_1.Skeleton(i / 2);
        variables_1.monsterList.push(skeleton);
    }
    for (var i = 0; i < exports.guardSetup[variables_1.monsterLevel - 1].length; i += 2) {
        var guard = new classes_1.Guard(i / 2);
        variables_1.monsterList.push(guard);
    }
    for (var i = 0; i < exports.greenChestSetup[variables_1.monsterLevel - 1].length; i += 2) {
        var greenChest = new classes_1.GreenChest(i / 2);
        variables_1.monsterList.push(greenChest);
        variables_1.greenChestList.push(greenChest);
        variables_1.chestList.push(greenChest);
    }
    for (var i = 0; i < exports.redChestSetup[variables_1.monsterLevel - 1].length; i += 2) {
        var red2Chest = new classes_1.RedChest(i / 2);
        variables_1.monsterList.push(red2Chest);
        variables_1.redChestList.push(red2Chest);
        variables_1.chestList.push(red2Chest);
    }
    for (var i = 0; i < exports.greenDoorSetup[variables_1.monsterLevel - 1].length; i += 2) {
        var greenDoor = new classes_1.GreenDoor(i / 2);
        variables_1.monsterList.push(greenDoor);
        variables_1.doorList.push(greenDoor);
    }
    variables_1.monsterList.push(exports.bossMonster);
    variables_1.monsterList.push(exports.theDoor);
    variables_1.doorList.push(exports.theDoor);
}
exports.instantiateSetupArrays = instantiateSetupArrays;
