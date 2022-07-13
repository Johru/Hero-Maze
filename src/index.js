"use strict";
exports.__esModule = true;
exports.renderFloor = void 0;
//import {renderFloor} from './functions'
var destination = [];
var canvas = document.querySelector('.main-canvas');
var ctx = canvas.getContext('2d');
var skeleton = document.getElementById('skeleton');
var heroUp = document.getElementById('hero-up');
var heroDown = document.getElementById('hero-down');
var heroLeft = document.getElementById('hero-left');
var heroRight = document.getElementById('hero-right');
var floor = document.getElementById('floor');
var wall = document.getElementById('wall');
var boss = document.getElementById('boss');
var tileWidth = 65;
var heroStats = {
    x: 0,
    y: 0,
    facing: 'heroDown',
    level: 1,
    maxHP: d6(3) + 20,
    currentHP: 6,
    DP: d6(2),
    SP: d6(1) + 7
};
heroStats.currentHP = heroStats.maxHP;
var Monster = /** @class */ (function () {
    function Monster(x, y, image, hp, DP, SP, alive) {
        if (alive === void 0) { alive = true; }
        this.x = x;
        this.y = y;
        this.image = image;
        this.HP = hp;
        this.DP = DP;
        this.SP = SP;
        this.alive = alive;
    }
    return Monster;
}());
var bossMonster = new Monster(10, 10, 'boss', d6(3), d6(1), d6(1) + 1);
var skeleton1 = new Monster(5, 9, 'skeleton', d6(2), Math.floor(d6(1) / 2), d6(1));
var skeleton2 = new Monster(5, 4, 'skeleton', d6(2), Math.floor(d6(1) / 2), d6(1));
var skeleton3 = new Monster(10, 1, 'skeleton', d6(2), Math.floor(d6(1) / 2), d6(1));
var monsterList = [];
monsterList.push(bossMonster);
monsterList.push(skeleton1);
monsterList.push(skeleton2);
monsterList.push(skeleton3);
var wallPositionList = [
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
function d6(numberOfRolls) {
    return numberOfRolls * (Math.floor(Math.random() * 6) + 1);
}
function updateGameState() {
    clearCanvas();
    renderFloor();
    renderWalls();
    renderHero();
    printstats();
    for (var i = 0; i < monsterList.length; i++) {
        renderBoss(monsterList[i]);
    }
}
function renderBoss(type) {
    ctx.drawImage(eval(type.image), (type.x - 1) * tileWidth, (type.y - 1) * tileWidth, tileWidth, tileWidth);
}
function renderFloor() {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            ctx.drawImage(floor, i * tileWidth, j * tileWidth, tileWidth, tileWidth);
        }
    }
}
exports.renderFloor = renderFloor;
function renderWalls() {
    for (var i = 0; i < wallPositionList.length; i++) {
        renderWallTile(wallPositionList[i][0] - 1, wallPositionList[i][1] - 1);
    }
}
function renderWallTile(xPosition, yPosition) {
    ctx.drawImage(wall, xPosition * tileWidth, yPosition * tileWidth, tileWidth, tileWidth);
}
function printstats() {
    ctx.font = '20px Arial';
    ctx.fillText('Stats:', 660, 25);
    ctx.fillText("Level: ".concat(heroStats.level), 660, 50);
    ctx.fillText("HP:    ".concat(heroStats.currentHP, "/").concat(heroStats.maxHP), 660, 75);
    ctx.fillText("DP:    ".concat(heroStats.DP), 660, 100);
    ctx.fillText("SP:    ".concat(heroStats.SP), 660, 125);
    if (bossMonster.alive) {
        ctx.fillText("Boss is still alive!", 660, 175);
        ctx.fillText("HP:     ".concat(bossMonster.HP), 660, 200);
        ctx.fillText("DP:     ".concat(bossMonster.DP), 660, 225);
        ctx.fillText("SP:     ".concat(bossMonster.SP), 660, 250);
    }
}
function checkIfMoveAllowed() {
    makeDestination();
    checkIfBattle();
    for (var i = 0; i < wallPositionList.length; i++) {
        if (destination[0] == wallPositionList[i][0] &&
            destination[1] == wallPositionList[i][1])
            return false;
    }
    return true;
}
function checkIfBattle() {
    if (destination[0] == bossMonster.x && destination[1] == bossMonster.y) {
        console.log('Fight!');
    }
}
function makeDestination() {
    if (heroStats.facing == 'heroDown')
        return (destination = [heroStats.x + 1, heroStats.y + 2]);
    if (heroStats.facing == 'heroUp')
        return (destination = [heroStats.x + 1, heroStats.y]);
    if (heroStats.facing == 'heroLeft')
        return (destination = [heroStats.x, heroStats.y + 1]);
    if (heroStats.facing == 'heroRight')
        return (destination = [heroStats.x + 2, heroStats.y + 1]);
}
function renderHero() {
    if (heroStats.x < 0) {
        heroStats.x = 0;
    }
    if (heroStats.y < 0) {
        heroStats.y = 0;
    }
    if (heroStats.x > 9) {
        heroStats.x = 9;
    }
    if (heroStats.y > 9) {
        heroStats.y = 9;
    }
    ctx.drawImage(eval(heroStats.facing), heroStats.x * tileWidth, heroStats.y * tileWidth, tileWidth, tileWidth);
}
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
updateGameState();
document.addEventListener('keydown', function (keyHit) {
    switch (keyHit.key) {
        case 'ArrowDown':
            heroStats.facing = 'heroDown';
            if (checkIfMoveAllowed()) {
                heroStats.y++;
            }
            updateGameState();
            break;
        case 'ArrowUp':
            heroStats.facing = 'heroUp';
            if (checkIfMoveAllowed()) {
                heroStats.y--;
            }
            updateGameState();
            break;
        case 'ArrowLeft':
            heroStats.facing = 'heroLeft';
            if (checkIfMoveAllowed()) {
                heroStats.x--;
            }
            updateGameState();
            break;
        case 'ArrowRight':
            heroStats.facing = 'heroRight';
            if (checkIfMoveAllowed()) {
                heroStats.x++;
            }
            updateGameState();
            break;
    }
});
