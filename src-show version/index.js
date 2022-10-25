"use strict";
exports.__esModule = true;
exports.setMonsterSpeed = exports.resetScrolling = exports.interval = exports.scrollingModifierY = exports.scrollingModifierX = void 0;
var random_1 = require("./random");
var utility_1 = require("./utility");
var map_render_1 = require("./map-render");
var hero_1 = require("./hero");
var monster_1 = require("./monster");
var variables_1 = require("./variables");
exports.scrollingModifierX = 0;
exports.scrollingModifierY = 0;
var lastUpdate = Date.now();
var currentTime = Date.now();
var fps = 60;
//setup
window.onload = function () {
    updateGameState();
};
(0, random_1.setup)();
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
    (0, map_render_1.clearCanvas)();
    (0, map_render_1.renderFloor)();
    (0, map_render_1.renderWalls)();
    (0, map_render_1.printstats)();
    (0, monster_1.renderAllMonsters)();
    (0, hero_1.renderHero)();
    (0, monster_1.checkIfBattleForMonsters)();
    (0, hero_1.checkIfHeroDead)();
    checkVictoryConditions();
}
//Reset when Map Level finished.
function checkVictoryConditions() {
    if (!variables_1.bossMonster.alive && variables_1.heroStats.hasKey) {
        (0, random_1.emptyMapLists)();
        (0, random_1.randomizeFloor)();
        (0, random_1.adjustWalls)();
        (0, random_1.pushBoundariesToWallList)();
        (0, hero_1.increaseMapLevel)();
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
    }
}
//manage user input
document.addEventListener('keydown', function (keyHit) {
    if (variables_1.heroStats.currentHP < 1)
        return;
    switch (keyHit.key) {
        case 'ArrowDown':
            variables_1.heroStats.facing = 'heroDown';
            if ((0, hero_1.attemptToMoveHero)()) {
                variables_1.heroStats.y++;
                if (variables_1.heroStats.y > 5 && variables_1.heroStats.y < random_1.mapSize - 4) {
                    exports.scrollingModifierY++;
                    console.log("Y: ".concat(exports.scrollingModifierY));
                }
            }
            break;
        case 'ArrowUp':
            variables_1.heroStats.facing = 'heroUp';
            if ((0, hero_1.attemptToMoveHero)()) {
                variables_1.heroStats.y--;
                if (variables_1.heroStats.y > 4 && variables_1.heroStats.y < random_1.mapSize - 5) {
                    exports.scrollingModifierY--;
                    console.log("Y: ".concat(exports.scrollingModifierY));
                }
            }
            break;
        case 'ArrowLeft':
            variables_1.heroStats.facing = 'heroLeft';
            if ((0, hero_1.attemptToMoveHero)()) {
                variables_1.heroStats.x--;
                if (variables_1.heroStats.x > 4 && variables_1.heroStats.x < random_1.mapSize - 5) {
                    exports.scrollingModifierX--;
                    console.log("X: ".concat(exports.scrollingModifierX));
                }
            }
            break;
        case 'ArrowRight':
            variables_1.heroStats.facing = 'heroRight';
            if ((0, hero_1.attemptToMoveHero)()) {
                variables_1.heroStats.x++;
                if (variables_1.heroStats.x > 5 && variables_1.heroStats.x < random_1.mapSize - 4) {
                    exports.scrollingModifierX++;
                    console.log("X: ".concat(exports.scrollingModifierX));
                }
            }
            break;
    }
});
