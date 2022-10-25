"use strict";
exports.__esModule = true;
exports.setMonsterSpeed = exports.resetScrolling = exports.interval = exports.escapeanim = exports.escapedown = exports.downdown = exports.updown = exports.rightdown = exports.leftdown = exports.spacedown = exports.pdown = exports.scrollingModifierY = exports.scrollingModifierX = void 0;
var setup_1 = require("./setup");
var utility_1 = require("./utility");
var map_render_1 = require("./map-render");
var hero_1 = require("./hero");
var monster_1 = require("./monster");
var variables_1 = require("./variables");
var mapgeneration_1 = require("./mapgeneration");
exports.scrollingModifierX = 0;
exports.scrollingModifierY = 0;
exports.pdown = false;
exports.spacedown = false;
exports.leftdown = false;
exports.rightdown = false;
exports.updown = false;
exports.downdown = false;
exports.escapedown = false;
exports.escapeanim = false;
var scoreArray = ['0', '0', '0', '0', '0'];
var finaleDone = false;
var lastUpdate = Date.now();
var currentTime = Date.now();
var fps = 60;
//setup
window.onload = function () {
    updateGameState();
};
(0, setup_1.setup)();
animate();
exports.interval = setInterval(tickController, variables_1.moveEveryXMiliseconds);
//Game loop handling
function tickController() {
    if (variables_1.heroStats.currentHP < 1)
        return;
    for (var _i = 0, monsterList_1 = variables_1.monsterList; _i < monsterList_1.length; _i++) {
        var specimen = monsterList_1[_i];
        (0, monster_1.attemptToMoveMonster)(specimen);
    }
}
function resetScrolling() {
    exports.scrollingModifierX = 0;
    exports.scrollingModifierY = 0;
}
exports.resetScrolling = resetScrolling;
function setMonsterSpeed() {
    exports.interval = setInterval(tickController, variables_1.moveEveryXMiliseconds);
}
exports.setMonsterSpeed = setMonsterSpeed;
function animate() {
    currentTime = Date.now();
    var elapsedTime = currentTime - lastUpdate;
    if (elapsedTime >= 1000 / fps) {
        updateGameState();
        lastUpdate = currentTime;
    }
    requestAnimationFrame(animate);
}
function updateGameState() {
    if (variables_1.monsterLevel > 3) {
        finale();
        return;
    }
    if (exports.escapedown)
        return;
    (0, map_render_1.clearCanvas)();
    (0, map_render_1.renderFloor)();
    (0, map_render_1.renderWalls)();
    (0, map_render_1.printstats)();
    (0, monster_1.renderAllMonsters)();
    (0, hero_1.setHeroLevel)();
    (0, hero_1.renderHero)();
    (0, monster_1.checkIfBattleForMonsters)();
    (0, hero_1.checkIfHeroDead)();
    determineScore();
    checkVictoryConditions();
}
//Reset when Map Level finished.
function checkVictoryConditions() {
    if (variables_1.heroStats.x == mapgeneration_1.theDoor.x &&
        variables_1.heroStats.y == mapgeneration_1.theDoor.y &&
        variables_1.heroStats.hasKey) {
        (0, hero_1.increaseMapLevel)();
        if (variables_1.monsterLevel > 3) {
            finale();
            return;
        }
        (0, setup_1.setMapSize)();
        (0, variables_1.emptyMapLists)();
        (0, mapgeneration_1.instantiateSetupArrays)();
        //randomizeFloor();
        (0, setup_1.adjustWalls)();
        (0, setup_1.pushBoundariesToWallList)();
        (0, monster_1.resetMonsters)();
        if (variables_1.moveEveryXMiliseconds > 500) {
            (0, variables_1.updateSpeed)(500);
            (0, utility_1.writeGameLog)("Monster Level Increases. Monsters now move faster!");
        }
        else {
            (0, utility_1.writeGameLog)("Monster Level increases. Maximum speed reached.");
        }
        clearInterval(exports.interval);
        setMonsterSpeed();
        resetScrolling();
        (0, monster_1.assignKey)();
    }
}
function finale() {
    if (finaleDone)
        return;
    exports.escapedown = true;
    setScore();
    variables_1.ctx.drawImage(variables_1.square, 0, 0, 900, 600);
    variables_1.ctx.font = '50px Arial';
    variables_1.ctx.fillText("Thank you for Playing!", 100, 100);
    variables_1.ctx.fillText("Score: ".concat(variables_1.heroStats.highscore), 100, 160);
    variables_1.ctx.drawImage(variables_1.space, 100, 180, 90, 42);
    variables_1.ctx.fillText("to restart.", 200, 215);
    variables_1.ctx.fillText("Previous Highscore:", 200, 260);
    for (var i = 0; i < 5; i++) {
        variables_1.ctx.fillText("".concat(scoreArray[i]), 200, 320 + 60 * i);
    }
    document.addEventListener('keydown', tempSpaceReset);
    console.log('event listener added');
    function tempSpaceReset(notHit) {
        switch (notHit.key) {
            case ' ':
                (0, variables_1.resetMonstersLevel)();
                (0, setup_1.setMapSize)();
                (0, setup_1.setup)();
                (0, variables_1.resetSpeed)(2000);
                clearInterval(exports.interval);
                setMonsterSpeed();
                (0, hero_1.heroInit)();
                resetScrolling();
                exports.escapedown = false;
                document.removeEventListener('keydown', tempSpaceReset);
                console.log('event listener removed');
        }
    }
    finaleDone = true;
}
function determineScore() {
    variables_1.heroStats.highscore =
        variables_1.heroStats.gold +
            variables_1.heroStats.currentHP * 10 +
            variables_1.heroStats.hasPotion * 150 +
            variables_1.heroStats.currentXP * 3 +
            variables_1.heroStats.level * 30;
}
function setScore() {
    determineScore();
    var emptyArray = [0, 0, 0, 0, 0];
    if (localStorage.getItem('score') === null)
        localStorage.setItem('score', emptyArray.toString());
    var jsStorage = localStorage.getItem('score').split(',');
    scoreArray = jsStorage.sort(function (a, b) {
        return b - a;
    });
    console.log('scoreArray:');
    console.log(scoreArray);
    console.log('highscore:');
    console.log(variables_1.heroStats.highscore);
    var lowerNumber = scoreArray.find(function (element) {
        return parseInt(element) < variables_1.heroStats.highscore;
    });
    if (lowerNumber === undefined)
        lowerNumber = 0;
    console.log(lowerNumber);
    var found = scoreArray.indexOf(lowerNumber.toString());
    if (found > -1) {
        scoreArray.splice(found, 0, variables_1.heroStats.highscore.toString());
        scoreArray.pop();
    }
    scoreArray = scoreArray.sort(function (a, b) {
        return b - a;
    });
    localStorage.setItem('score', scoreArray.toString());
    console.log(localStorage);
}
document.addEventListener('keydown', function (keyHit) {
    switch (keyHit.key) {
        case 'Escape':
            if (exports.escapedown == false) {
                exports.escapedown = true;
                exports.escapeanim = true;
                (0, utility_1.writeGameLog)('Game is paused');
                (0, map_render_1.renderPauseScreen)();
            }
            else if (exports.escapedown) {
                exports.escapedown = false;
                exports.escapeanim = true;
                (0, utility_1.writeGameLog)('Game is resumed');
            }
            break;
    }
});
//manage user input
document.addEventListener('keydown', function (keyHit) {
    if (variables_1.heroStats.currentHP < 1)
        return;
    if (exports.escapedown)
        return;
    switch (keyHit.key) {
        case 'ArrowDown':
            variables_1.heroStats.facing = 'heroDown';
            if ((0, hero_1.attemptToMoveHero)()) {
                variables_1.heroStats.y++;
                if (variables_1.heroStats.y > 5 && variables_1.heroStats.y < setup_1.mapSize - 4) {
                    exports.scrollingModifierY++;
                }
            }
            exports.downdown = true;
            break;
        case 'ArrowUp':
            variables_1.heroStats.facing = 'heroUp';
            if ((0, hero_1.attemptToMoveHero)()) {
                variables_1.heroStats.y--;
                if (variables_1.heroStats.y > 4 && variables_1.heroStats.y < setup_1.mapSize - 5) {
                    exports.scrollingModifierY--;
                }
            }
            exports.updown = true;
            break;
        case 'ArrowLeft':
            variables_1.heroStats.facing = 'heroLeft';
            if ((0, hero_1.attemptToMoveHero)()) {
                variables_1.heroStats.x--;
                if (variables_1.heroStats.x > 4 && variables_1.heroStats.x < setup_1.mapSize - 5) {
                    exports.scrollingModifierX--;
                }
            }
            exports.leftdown = true;
            break;
        case 'ArrowRight':
            variables_1.heroStats.facing = 'heroRight';
            if ((0, hero_1.attemptToMoveHero)()) {
                variables_1.heroStats.x++;
                if (variables_1.heroStats.x > 5 && variables_1.heroStats.x < setup_1.mapSize - 4) {
                    exports.scrollingModifierX++;
                }
            }
            exports.rightdown = true;
            break;
        case 'p':
            if (variables_1.heroStats.hasPotion > 0) {
                var originalHP = variables_1.heroStats.currentHP;
                variables_1.heroStats.currentHP += 10;
                if (variables_1.heroStats.currentHP > variables_1.heroStats.maxHP) {
                    variables_1.heroStats.currentHP = variables_1.heroStats.maxHP;
                }
                variables_1.heroStats.hasPotion--;
                (0, utility_1.writeGameLog)("Potion restored ".concat(variables_1.heroStats.currentHP - originalHP, " HP"));
            }
            else {
                (0, utility_1.writeGameLog)('You dont have a potion.');
            }
            exports.pdown = true;
            break;
        case ' ':
            if (variables_1.heroStats.overKill == false) {
                variables_1.heroStats.overKill = true;
            }
            else if (variables_1.heroStats.overKill)
                variables_1.heroStats.overKill = false;
            exports.spacedown = true;
            break;
    }
});
document.addEventListener('keyup', function (keyHit) {
    switch (keyHit.key) {
        case 'p':
            exports.pdown = false;
            break;
        case ' ':
            exports.spacedown = false;
            break;
        case 'ArrowUp':
            exports.updown = false;
            break;
        case 'ArrowDown':
            exports.downdown = false;
            break;
        case 'ArrowRight':
            exports.rightdown = false;
            break;
        case 'ArrowLeft':
            exports.leftdown = false;
            break;
        case 'Escape':
            exports.escapeanim = false;
            break;
    }
});
