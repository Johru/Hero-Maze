"use strict";
exports.__esModule = true;
exports.printstats = exports.renderPauseScreen = exports.renderWalls = exports.paintLos = exports.paintPath = exports.renderFloor = exports.clearCanvas = void 0;
var variables_1 = require("./variables");
var utility_1 = require("./utility");
var index_1 = require("./index");
var monster_1 = require("./monster");
function clearCanvas() {
    variables_1.ctx.clearRect(0, 0, variables_1.canvas.width, variables_1.canvas.height);
}
exports.clearCanvas = clearCanvas;
function renderFloor() {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            renderFloorTile(i, j);
        }
    }
}
exports.renderFloor = renderFloor;
function paintPath() {
    for (var i = 1; i < monster_1.pathToPaint.length; i++) {
        variables_1.ctx.fillStyle = 'grey';
        variables_1.ctx.fillRect((monster_1.pathToPaint[i][0] - 1) * variables_1.tileWidth + 5, (monster_1.pathToPaint[i][1] - 1) * variables_1.tileWidth + 5, 52, 52);
    }
    variables_1.ctx.fillStyle = 'black';
}
exports.paintPath = paintPath;
function paintLos() {
    for (var i = 0; i < monster_1.losArray.length; i++) {
        variables_1.ctx.fillStyle = 'yellow';
        variables_1.ctx.fillRect((monster_1.losArray[i][0] - 1) * variables_1.tileWidth + (variables_1.tileWidth - 25) / 2, (monster_1.losArray[i][1] - 1) * variables_1.tileWidth + (variables_1.tileWidth - 25) / 2, 25, 25);
    }
    variables_1.ctx.fillStyle = 'black';
    variables_1.ctx.strokeStyle = 'green';
    variables_1.ctx.lineWidth = 3;
    if (monster_1.unblocked)
        variables_1.ctx.strokeStyle = 'red';
    variables_1.ctx.beginPath();
    variables_1.ctx.moveTo((variables_1.heroStats.x - 1) * variables_1.tileWidth + variables_1.tileWidth / 2, (variables_1.heroStats.y - 1) * variables_1.tileWidth + variables_1.tileWidth / 2);
    variables_1.ctx.lineTo(5 * 65 - variables_1.tileWidth / 2, 5 * 65 - variables_1.tileWidth / 2);
    variables_1.ctx.stroke();
    variables_1.ctx.lineWidth = 1;
}
exports.paintLos = paintLos;
function renderWalls() {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            for (var k = 0; k < variables_1.wallPositionList.length; k++) {
                if (variables_1.wallPositionList[k][0] == i + index_1.scrollingModifierX + 1 &&
                    variables_1.wallPositionList[k][1] == j + index_1.scrollingModifierY + 1) {
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
    variables_1.ctx.strokeStyle = 'black';
    variables_1.ctx.strokeRect(xPosition * variables_1.tileWidth, yPosition * variables_1.tileWidth, variables_1.tileWidth, variables_1.tileWidth);
}
function renderPauseScreen() {
    variables_1.ctx.drawImage(variables_1.square, 0, 0, 1120, 650);
    variables_1.ctx.font = '20px Arial';
    variables_1.ctx.fillText("Winning the game: ", 70, 50);
    variables_1.ctx.font = '12px Arial';
    variables_1.ctx.fillText("You win by reaching the end of level 3 and escaping through the final door.\n In each level, you need to find and slay the witch (blue robe) who has the yellow key called the Key.\n  ", 75, 80);
    variables_1.ctx.fillText("This will allow you to pass through the door to the next level. Sometimes, doors of other colors will block your path. Explore chests to find matching keys.", 75, 95);
    variables_1.ctx.font = '20px Arial';
    variables_1.ctx.fillText("Scoring:", 75, 125);
    variables_1.ctx.font = '12px Arial';
    variables_1.ctx.fillText("Reaching the final door by any means is enough to win. You will receive a score though. If you are interested in a higher score, you will do better if you conserve your resources.", 75, 150);
    variables_1.ctx.fillText("While it is technically possible to defeat every single monster on each level, your score will be higher if your health is high, you found all gold and you have unused potions left.", 75, 165);
    variables_1.ctx.fillText("Hero level and XP is scored, too, but valued less. Avoiding enemies is therefore recommended. Minimum score is 40 and maximum 2040. Both extremes are highly unlikely.", 75, 180);
    variables_1.ctx.font = '20px Arial';
    variables_1.ctx.fillText("Fighting and Overkill:", 75, 210);
    variables_1.ctx.font = '12px Arial';
    variables_1.ctx.fillText("You can fight a monster by moving into it's square. Combat will be resolved automatically, you can check Game Log for results. Even weak monsters can cause some damage early on. ", 75, 235);
    variables_1.ctx.fillText("When you do more damage than needed to kill a monster, the extra damage will be converted to overkill points. By pressing space, you can activate Overkill mode. ", 75, 250);
    variables_1.ctx.fillText("On first round of next combat, you will deal extra damage equal to your accumulated overkill points, making it easier to kill tough enemies. Your overkill points will be consumed.", 75, 265);
    variables_1.ctx.font = '20px Arial';
    variables_1.ctx.fillText("Controls:", 75, 295);
    variables_1.ctx.font = '12px Arial';
    variables_1.ctx.fillText("Use Arrow Keys to move", 75, 320);
    variables_1.ctx.fillText("Use Space Key to activate or deactivate the Overkill mode.", 75, 335);
    variables_1.ctx.fillText("Use the P Key to drink a potion a restore 10HP.", 75, 350);
    variables_1.ctx.fillText("Use Escape to pause the game and display these instructions. Pressing Escape again will unpause the game.", 75, 365);
    variables_1.ctx.font = '20px Arial';
    variables_1.ctx.fillText("About the game:", 75, 395);
    variables_1.ctx.font = '12px Arial';
    variables_1.ctx.fillText("This is a demo of a planned game based on a school project. All graphics are a placeholder. There will be more levels, more monsters, more treasure and artifacts to be found.", 75, 430);
    variables_1.ctx.fillText("The basic principles will remain the same. I am currently working on monster pathfinding.\n  At the moment, monters move randomly. Eventually, they will be able to chase the player,", 75, 445);
    variables_1.ctx.fillText("until line of sight is broken. Then they will return to their predictable patrol routine. Some will have fixed routines, others will select from multiple possible paths randomly each round.", 75, 460);
    variables_1.ctx.fillText("The game will then turn into a stealth puzzle. It will be hard if not impossible to kill all monsters. The player will have to pick the unavoidable fights and evaluate the danger involved,", 75, 475);
    variables_1.ctx.fillText("lure monsters away from treasure and claim it before they come back, or just run frantically around and through openings, only to get trapped and have to fight their way out.", 75, 490);
    variables_1.ctx.fillText("It is, and always will be, a silly little game requiring no funding. Feedback is, however, welcome. Once finished, I will add a contact form and a mailing list and publish the game on itch.io .", 75, 505);
    variables_1.ctx.fillText("", 75, 520);
}
exports.renderPauseScreen = renderPauseScreen;
function printstats() {
    variables_1.ctx.font = '20px Arial';
    variables_1.ctx.fillText('Stats:', 660, 25);
    variables_1.ctx.drawImage(variables_1.square, 835, 0, 90, 90);
    variables_1.ctx.drawImage(variables_1.square, 835, 90, 90, 90);
    variables_1.ctx.drawImage(variables_1.square, 835, 180, 90, 90);
    variables_1.ctx.drawImage(variables_1.square, 1030, 0, 90, 90);
    variables_1.ctx.drawImage(variables_1.square, 1100, 0, 20, 20);
    variables_1.ctx.drawImage(variables_1.square, 1030, 90, 90, 90);
    variables_1.ctx.drawImage(variables_1.square, 1030, 180, 90, 90);
    variables_1.ctx.drawImage(variables_1.square, 1030, 270, 90, 90);
    variables_1.ctx.drawImage(variables_1.square, 650, 0, 185, 270);
    variables_1.ctx.drawImage(variables_1.square, 650, 400, 480, 250);
    if (variables_1.heroStats.hasKey) {
        variables_1.ctx.drawImage(variables_1.key, 835, 0, 90, 90);
    }
    if (variables_1.heroStats.overKill) {
        variables_1.ctx.drawImage(variables_1.axe, 1030, 270, 90, 90);
    }
    if (variables_1.heroStats.hasGreenKey) {
        variables_1.ctx.drawImage(variables_1.greenKey, 835, 90, 90, 90);
    }
    if (variables_1.heroStats.hasRedKey) {
        variables_1.ctx.drawImage(variables_1.redKey, 835, 180, 90, 90);
    }
    if (variables_1.heroStats.hasPotion > 0) {
        variables_1.ctx.drawImage(variables_1.potion, 1030, 0, 90, 90);
    }
    variables_1.ctx.font = '20px Arial';
    variables_1.ctx.fillText("".concat(variables_1.heroStats.hasPotion), 1105, 17);
    if (index_1.pdown) {
        variables_1.ctx.drawImage(variables_1.pdButton, 935, 24, 90, 42);
    }
    else {
        variables_1.ctx.drawImage(variables_1.pButton, 935, 24, 90, 45);
    }
    if (index_1.spacedown) {
        variables_1.ctx.drawImage(variables_1.space, 935, 280, 90, 42);
    }
    else {
        variables_1.ctx.drawImage(variables_1.spaced, 935, 280, 90, 48);
    }
    if (index_1.rightdown) {
        variables_1.ctx.drawImage(variables_1.right, 920, 345, 42, 42);
    }
    else {
        variables_1.ctx.drawImage(variables_1.rightd, 920, 345, 45, 45);
    }
    if (index_1.leftdown) {
        variables_1.ctx.drawImage(variables_1.left, 820, 345, 42, 42);
    }
    else {
        variables_1.ctx.drawImage(variables_1.leftd, 820, 345, 45, 45);
    }
    if (index_1.downdown) {
        variables_1.ctx.drawImage(variables_1.down, 870, 345, 42, 42);
    }
    else {
        variables_1.ctx.drawImage(variables_1.downd, 870, 345, 45, 45);
    }
    if (index_1.updown) {
        variables_1.ctx.drawImage(variables_1.up, 870, 295, 42, 42);
    }
    else {
        variables_1.ctx.drawImage(variables_1.upd, 870, 295, 45, 45);
    }
    if (index_1.escapeanim) {
        variables_1.ctx.drawImage(variables_1.escape, 670, 290, 100, 88);
    }
    else {
        variables_1.ctx.drawImage(variables_1.escaped, 670, 290, 100, 88);
    }
    // if (escapedown) {
    //   ctx.drawImage(pause, 670, 340, 100, 88);
    // } else {
    //   ctx.drawImage(unpause, 670, 340, 45, 45);
    // }
    if (variables_1.heroStats.hasSword) {
        variables_1.ctx.drawImage(variables_1.sword, 1030, 90, 90, 90);
    }
    if (variables_1.heroStats.hasPotion > 1000) {
        variables_1.ctx.drawImage(variables_1.potion, 1030, 180, 90, 90);
    }
    variables_1.ctx.fillText("Hero Level: ".concat(variables_1.heroStats.level), 660, 50);
    variables_1.ctx.fillText("HP:         ".concat(variables_1.heroStats.currentHP, "/").concat(variables_1.heroStats.maxHP), 660, 75);
    variables_1.ctx.fillText("Defense:  ".concat(variables_1.heroStats.DP), 660, 100);
    variables_1.ctx.fillText("Attack:     ".concat(variables_1.heroStats.SP), 660, 125);
    if (variables_1.heroStats.overKill == true) {
        variables_1.ctx.fillText("Overkill:   Active!", 660, 150);
    }
    else {
        variables_1.ctx.fillText("Overkill:   Off", 660, 150);
    }
    variables_1.ctx.fillText("Score:     ".concat(variables_1.heroStats.highscore), 660, 175);
    variables_1.ctx.fillText("Map Number:".concat(variables_1.monsterLevel), 660, 25);
    variables_1.ctx.fillText("Overkill Points: ".concat(variables_1.heroStats.overKillPoints), 660, 200);
    variables_1.ctx.fillText("XP: ".concat(variables_1.heroStats.currentXP, "/").concat(variables_1.heroStats.neededXP), 660, 225);
    variables_1.ctx.fillText("Gold: ".concat(variables_1.heroStats.gold), 660, 250);
    variables_1.ctx.fillText("Game Log:", 680, 430);
    variables_1.ctx.font = '15px Arial';
    for (var i = 0; i < 10; i++) {
        if (utility_1.gameLog[i] === undefined)
            continue;
        if (utility_1.gameLog[i] == "YOU DIED") {
            variables_1.ctx.font = '16px Arial';
            variables_1.ctx.fillStyle = 'red';
        }
        else {
            variables_1.ctx.font = '15px Arial';
            variables_1.ctx.fillStyle = 'black';
        }
        variables_1.ctx.fillText(utility_1.gameLog[i], 680, 450 + 20 * i);
    }
    variables_1.ctx.fillStyle = 'black';
}
exports.printstats = printstats;
