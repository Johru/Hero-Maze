"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var monsterLevel = 1;
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
var skeletonSetup = {
    1: [5, 4],
    2: [10, 1],
    3: [5, 8]
};
heroStats.currentHP = heroStats.maxHP;
var Monster = /** @class */ (function () {
    function Monster(order, x, y, image, hp, DP, SP, alive) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (image === void 0) { image = 'boss'; }
        if (hp === void 0) { hp = 0; }
        if (DP === void 0) { DP = 0; }
        if (SP === void 0) { SP = 0; }
        if (alive === void 0) { alive = true; }
        this.orderNumber = order;
        this.x = x;
        this.y = y;
        this.image = image;
        this.HP = hp;
        this.DP = DP;
        this.SP = SP;
        this.alive = alive;
    }
    Monster.prototype.init = function () {
        this.x = 10;
        this.y = 10;
        this.alive = true;
        this.HP = d6(8) + 2 * monsterLevel * d6(1);
        this.DP = Math.floor((monsterLevel / 2) * d6(1));
        this.SP = monsterLevel * d6(1) + 3 * monsterLevel;
    };
    return Monster;
}());
var Skeleton = /** @class */ (function (_super) {
    __extends(Skeleton, _super);
    function Skeleton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Skeleton.prototype.init = function () {
        this.x = skeletonSetup[this.orderNumber][0];
        this.y = skeletonSetup[this.orderNumber][1];
        this.alive = true;
        this.HP = d6(2) * 2 * monsterLevel;
        this.DP = Math.floor((monsterLevel * d6(1)) / 2 + monsterLevel / 2);
        this.SP = monsterLevel * d6(1) + 3 * monsterLevel;
        this.image = 'skeleton';
    };
    return Skeleton;
}(Monster));
var bossMonster = new Monster(0);
var skeleton1 = new Skeleton(1);
var skeleton2 = new Skeleton(2);
var skeleton3 = new Skeleton(3);
var monsterList = [];
monsterList.push(bossMonster);
monsterList.push(skeleton1);
monsterList.push(skeleton2);
monsterList.push(skeleton3);
for (var _i = 0, monsterList_1 = monsterList; _i < monsterList_1.length; _i++) {
    var monster = monsterList_1[_i];
    monster.init();
}
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
    var total = 0;
    for (var i = 0; i < numberOfRolls; i++) {
        total += Math.floor(Math.random() * 6) + 1;
    }
    return total;
}
function updateGameState() {
    clearCanvas();
    renderFloor();
    renderWalls();
    renderHero();
    printstats();
    for (var i = 0; i < monsterList.length; i++) {
        renderMonster(monsterList[i]);
    }
    checkIfHeroDead();
    checkRoundEnd();
}
function checkRoundEnd() {
    if (bossMonster.alive == false) {
        heroStats.x = 0;
        heroStats.y = 0;
        var hpGainRandomizer = Math.random() * 101;
        console.log(hpGainRandomizer);
        if (hpGainRandomizer <= 10) {
            heroStats.currentHP = heroStats.maxHP;
            console.log('Full HP restored!');
        }
        if (40 >= hpGainRandomizer && hpGainRandomizer > 10) {
            heroStats.currentHP = heroStats.currentHP + Math.floor(heroStats.maxHP / 3);
            console.log('A third of HP restored!');
        }
        if (hpGainRandomizer > 40) {
            heroStats.currentHP = heroStats.currentHP + Math.floor(heroStats.maxHP / 10);
            console.log('A tenth of HP restored!');
        }
        monsterLevel++;
        for (var _i = 0, monsterList_2 = monsterList; _i < monsterList_2.length; _i++) {
            var monster = monsterList_2[_i];
            monster.init();
        }
    }
}
function checkIfHeroDead() {
    if (heroStats.currentHP < 1) {
        window.location.reload();
    }
}
function renderMonster(type) {
    if (type.alive) {
        ctx.drawImage(eval(type.image), (type.x - 1) * tileWidth, (type.y - 1) * tileWidth, tileWidth, tileWidth);
    }
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
    ctx.fillText("Hero Level: ".concat(heroStats.level), 660, 50);
    ctx.fillText("HP:         ".concat(heroStats.currentHP, "/").concat(heroStats.maxHP), 660, 75);
    ctx.fillText("DP:         ".concat(heroStats.DP), 660, 100);
    ctx.fillText("SP:         ".concat(heroStats.SP), 660, 125);
    ctx.fillText("Monster Level:".concat(monsterLevel), 660, 175);
    if (bossMonster.alive) {
        ctx.fillText("Boss is still alive!", 660, 200);
    }
    else {
        ctx.fillText("Boss is dead. Congrats.", 660, 200);
    }
    ctx.fillText("HP:       ".concat(bossMonster.HP), 660, 225);
    ctx.fillText("DP:       ".concat(bossMonster.DP), 660, 250);
    ctx.fillText("SP:       ".concat(bossMonster.SP), 660, 275);
    ctx.fillText("You havent found the key yet.", 660, 300);
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
function battle(monster) {
    while (monster.HP > 0) {
        if (heroStats.currentHP < 1) {
            return alert('You died!');
        }
        var heroAttack = heroStats.SP + d6(1);
        var monsterAttack = monster.SP + d6(1);
        if (heroAttack > monster.DP) {
            monster.HP -= heroAttack - monster.DP;
        }
        if (monsterAttack > heroStats.DP) {
            heroStats.currentHP -= monsterAttack - heroStats.DP;
        }
    }
    monster.alive = false;
    var hpBoost = d6(1);
    heroStats.maxHP += hpBoost;
    heroStats.currentHP += hpBoost;
    heroStats.DP += 1;
    heroStats.SP += 1;
    heroStats.level++;
}
function checkIfBattle() {
    for (var _i = 0, monsterList_3 = monsterList; _i < monsterList_3.length; _i++) {
        var monster = monsterList_3[_i];
        if (destination[0] == monster.x &&
            destination[1] == monster.y &&
            monster.alive) {
            battle(monster);
        }
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
