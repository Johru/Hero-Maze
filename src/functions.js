"use strict";
exports.__esModule = true;
exports.clearCanvas = exports.renderHero = exports.makeDestination = exports.checkIfMoveAllowed = exports.renderSkeleton = exports.renderMonster = exports.renderFloor = exports.renderWallTile = exports.renderWalls = void 0;
var destination = [];
var variables_1 = require("./variables");
function renderWalls() {
    for (var i = 0; i < variables_1.wallPositionList.length; i++) {
        renderWallTile(variables_1.wallPositionList[i][0] - 1, variables_1.wallPositionList[i][1] - 1);
    }
}
exports.renderWalls = renderWalls;
function renderWallTile(xPosition, yPosition) {
    variables_1.ctx.drawImage(variables_1.wall, xPosition * 65, yPosition * 65, 65, 65);
}
exports.renderWallTile = renderWallTile;
function renderFloor() {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            variables_1.ctx.drawImage(variables_1.floor, i * 65, j * 65, 65, 65);
        }
    }
}
exports.renderFloor = renderFloor;
function renderMonster() {
    variables_1.ctx.drawImage(variables_1.boss, 4 * 65, 3 * 65, 65, 65);
}
exports.renderMonster = renderMonster;
function renderSkeleton() {
    variables_1.ctx.drawImage(variables_1.skeleton, 4 * 65, 8 * 65, 65, 65);
}
exports.renderSkeleton = renderSkeleton;
function checkIfMoveAllowed() {
    for (var i = 0; i < variables_1.wallPositionList.length; i++) {
        makeDestination();
        if (destination[0] == variables_1.wallPositionList[i][0] && destination[1] == variables_1.wallPositionList[i][1])
            return false;
    }
    return true;
}
exports.checkIfMoveAllowed = checkIfMoveAllowed;
function makeDestination() {
    if (variables_1.heroCoordinates.facing == 'heroDown')
        return destination = [variables_1.heroCoordinates.x + 1, variables_1.heroCoordinates.y + 2];
    if (variables_1.heroCoordinates.facing == 'heroUp')
        return destination = [variables_1.heroCoordinates.x + 1, variables_1.heroCoordinates.y];
    if (variables_1.heroCoordinates.facing == 'heroLeft')
        return destination = [variables_1.heroCoordinates.x, variables_1.heroCoordinates.y + 1];
    if (variables_1.heroCoordinates.facing == 'heroRight')
        return destination = [variables_1.heroCoordinates.x + 2, variables_1.heroCoordinates.y + 1];
}
exports.makeDestination = makeDestination;
function renderHero() {
    if (variables_1.heroCoordinates.x < 0) {
        variables_1.heroCoordinates.x = 0;
    }
    if (variables_1.heroCoordinates.y < 0) {
        variables_1.heroCoordinates.y = 0;
    }
    if (variables_1.heroCoordinates.x > 9) {
        variables_1.heroCoordinates.x = 9;
    }
    if (variables_1.heroCoordinates.y > 9) {
        variables_1.heroCoordinates.y = 9;
    }
    variables_1.ctx.drawImage(eval(variables_1.heroCoordinates.facing), variables_1.heroCoordinates.x * 65, variables_1.heroCoordinates.y * 65, 65, 65);
}
exports.renderHero = renderHero;
function clearCanvas() {
    variables_1.ctx.clearRect(0, 0, variables_1.canvas.width, variables_1.canvas.height);
}
exports.clearCanvas = clearCanvas;
