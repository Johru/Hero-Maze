"use strict";
exports.__esModule = true;
exports.wallPositionList = exports.heroCoordinates = exports.boss = exports.wall = exports.floor = exports.skeleton3 = exports.skeleton2 = exports.skeleton1 = exports.bossMonster = exports.heroRight = exports.heroLeft = exports.heroDown = exports.heroUp = exports.skeleton = exports.ctx = exports.canvas = void 0;
exports.canvas = document.querySelector(".main-canvas");
exports.ctx = exports.canvas.getContext("2d");
exports.skeleton = document.getElementById("skeleton");
exports.heroUp = document.getElementById("hero-up");
exports.heroDown = document.getElementById("hero-down");
exports.heroLeft = document.getElementById("hero-left");
exports.heroRight = document.getElementById("hero-right");
exports.bossMonster = { x: 0, y: 0, alive: true };
exports.skeleton1 = { x: 0, y: 0, alive: true };
exports.skeleton2 = { x: 0, y: 0, alive: true };
exports.skeleton3 = { x: 0, y: 0, alive: true };
exports.floor = document.getElementById("floor");
exports.wall = document.getElementById("wall");
exports.boss = document.getElementById("boss");
exports.heroCoordinates = {
    x: 0,
    y: 0,
    facing: 'heroDown'
};
exports.wallPositionList = [
    [4, 1],
    [4, 2],
    [4, 3],
    [3, 3],
    [2, 3],
    [1, 5],
    [2, 5],
    [3, 5],
    [4, 5],
    [2, 6],
    [2, 7],
    [4, 6],
    [4, 7],
    [6, 2],
    [6, 3],
    [6, 4],
    [6, 5],
    [7, 5],
    [8, 5],
    [9, 5],
    [8, 2],
    [9, 2],
    [8, 3],
    [9, 3],
    [6, 7],
    [6, 8],
    [7, 7],
    [7, 8],
    [4, 10],
    [2, 9],
    [3, 9],
    [4, 9],
    [6, 10],
    [7, 10],
    [9, 7],
    [9, 8],
    [9, 9],
];
