"use strict";
exports.__esModule = true;
exports.printstats = exports.renderWalls = exports.renderFloor = exports.clearCanvas = void 0;
var variables_1 = require("./variables");
var utility_1 = require("./utility");
var random_1 = require("./random");
var index_1 = require("./index");
function clearCanvas() {
    variables_1.ctx.clearRect(0, 0, variables_1.canvas.width, variables_1.canvas.height);
}
exports.clearCanvas = clearCanvas;
function renderFloor() {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            for (var k = 0; k < random_1.floorList.length; k += 2) {
                if (random_1.floorList[k] == i + index_1.scrollingModifierX + 1 && random_1.floorList[k + 1] == j + index_1.scrollingModifierY + 1) {
                    renderFloorTile(i, j);
                }
            }
        }
    }
}
exports.renderFloor = renderFloor;
function renderWalls() {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            for (var k = 0; k < random_1.wallPositionList.length; k++) {
                if (random_1.wallPositionList[k][0] == i + index_1.scrollingModifierX + 1 && random_1.wallPositionList[k][1] == j + index_1.scrollingModifierY + 1) {
                    renderWallTile(i, j);
                }
            }
        }
    }
}
exports.renderWalls = renderWalls;
function renderWallTile(xPosition, yPosition) {
    variables_1.ctx.drawImage(variables_1.wall, xPosition * variables_1.tileWidth, yPosition * variables_1.tileWidth, variables_1.tileWidth, variables_1.tileWidth);
}
function renderFloorTile(xPosition, yPosition) {
    variables_1.ctx.drawImage(variables_1.floor, xPosition * variables_1.tileWidth, yPosition * variables_1.tileWidth, variables_1.tileWidth, variables_1.tileWidth);
}
function printstats() {
    variables_1.ctx.font = '20px Arial';
    variables_1.ctx.fillText('Stats:', 660, 25);
    if (variables_1.heroStats.hasKey) {
        variables_1.ctx.drawImage(variables_1.key, 860, 25, 125, 52);
    }
    if (variables_1.heroStats.hasPotion) {
        variables_1.ctx.drawImage(variables_1.potion, 1000, 25, 90, 90);
    }
    variables_1.ctx.fillText("Hero Level: ".concat(variables_1.heroStats.level), 660, 50);
    variables_1.ctx.fillText("HP:         ".concat(variables_1.heroStats.currentHP, "/").concat(variables_1.heroStats.maxHP), 660, 75);
    variables_1.ctx.fillText("DP:         ".concat(variables_1.heroStats.DP), 660, 100);
    variables_1.ctx.fillText("SP:         ".concat(variables_1.heroStats.SP), 660, 125);
    if (variables_1.heroStats.overKill == true) {
        variables_1.ctx.fillText("Overkill:   Active!", 660, 150);
    }
    else {
        variables_1.ctx.fillText("Overkill:   Off", 660, 150);
    }
    variables_1.ctx.fillText("Monster Level:".concat(variables_1.monsterLevel), 660, 175);
    variables_1.ctx.fillText("Overkill Points: ".concat(variables_1.heroStats.overKillPoints), 660, 200);
    variables_1.ctx.fillText("XP: ".concat(variables_1.heroStats.currentXP, "/").concat(variables_1.heroStats.neededXP), 660, 225);
    /* if (bossMonster.alive) {
       ctx.fillText(`Boss is still alive!`, 660, 200);
     } else {
       ctx.fillText(`Boss is dead. Congrats.`, 660, 200);
     }
     ctx.fillText(`HP:       ${bossMonster.HP}`, 660, 225);
     ctx.fillText(`DP:       ${bossMonster.DP}`, 660, 250);
     ctx.fillText(`SP:       ${bossMonster.SP}`, 660, 275);*/
    variables_1.ctx.fillText("Game Log:", 660, 300);
    variables_1.ctx.font = '15px Arial';
    for (var i = 0; i < 9; i++) {
        if (utility_1.gameLog[i] === undefined)
            continue;
        if (utility_1.gameLog[i] == 'YOU DIED') {
            variables_1.ctx.font = '16px Arial';
            variables_1.ctx.fillStyle = 'red';
        }
        else {
            variables_1.ctx.font = '15px Arial';
            variables_1.ctx.fillStyle = 'black';
        }
        variables_1.ctx.fillText(utility_1.gameLog[i], 660, 320 + 20 * i);
    }
    variables_1.ctx.font = '13px Arial';
    variables_1.ctx.fillStyle = 'black';
    variables_1.ctx.fillText("Instructions:", 660, 530);
    variables_1.ctx.fillText("One of the Skeletons has a key. To win a level, you must find the key", 660, 545);
    variables_1.ctx.fillText("and defeat the Boss.", 660, 560);
    variables_1.ctx.fillText("Whenever you win a level, map will reset, you keep your progress ", 660, 575);
    variables_1.ctx.fillText("but the level of monsters goes up, so be careful!", 660, 590);
    variables_1.ctx.fillText("When your HP drops to 0, you die and game restarts.", 660, 605);
    variables_1.ctx.fillText("Killing Skeletons increases your hero level, use them to get stronger early on.", 660, 620);
    variables_1.ctx.fillText("Winning a level has a chance to restore your HP.", 660, 635);
}
exports.printstats = printstats;
/*
export function drawDoor ():void{
  ctx.drawImage(
    door,
    (doorCoordinates[0]-1) * tileWidth,
    (doorCoordinates[1]-1) * tileWidth,
    tileWidth,
    tileWidth
  );
}*/
