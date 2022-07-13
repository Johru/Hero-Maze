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
var blood = document.getElementById('blood');
var tileWidth = 65;
var monsterLevel = 1;
var monsterHasKey = 1;
var monstersMove = false;
var heroStats = {
    x: 0,
    y: 0,
    facing: 'heroDown',
    level: 1,
    maxHP: d6(3) + 20,
    currentHP: 6,
    DP: d6(2),
    SP: d6(1) + 7,
    hasKey: false
};
var skeletonSetup = {
    1: [8, 6],
    2: [5, 4],
    3: [5, 9]
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
assignKey();
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
for (var j = 1; j < 11; j++) {
    wallPositionList.push([j, 11]);
}
for (var j = 1; j < 11; j++) {
    wallPositionList.push([j, 0]);
}
for (var k = 1; k < 11; k++) {
    wallPositionList.push([0, k]);
}
for (var k = 1; k < 11; k++) {
    wallPositionList.push([11, k]);
}
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
    printstats();
    renderHero();
    renderAllMonsters();
    resetMonsterMoveTimer();
    renderHero();
    checkIfBattleForMonsters();
    checkIfHeroDead();
    checkRoundEnd();
}
function resetMonsterMoveTimer() {
    if (monstersMove) {
        monstersMove = false;
    }
    else {
        monstersMove = true;
    }
}
function renderAllMonsters() {
    for (var i = 0; i < monsterList.length; i++) {
        renderMonster(monsterList[i]);
    }
}
function checkRoundEnd() {
    if (bossMonster.alive == false && heroStats.hasKey) {
        heroStats.x = 0;
        heroStats.y = 0;
        heroStats.hasKey = false;
        var hpGainRandomizer = Math.random() * 100 + 1;
        console.log(hpGainRandomizer);
        if (hpGainRandomizer <= 10) {
            heroStats.currentHP = heroStats.maxHP;
            console.log('Full HP restored!');
        }
        if (40 >= hpGainRandomizer && hpGainRandomizer > 10) {
            heroStats.currentHP =
                heroStats.currentHP + Math.floor(heroStats.maxHP / 3);
            console.log('A third of HP restored!');
        }
        if (hpGainRandomizer > 40) {
            heroStats.currentHP =
                heroStats.currentHP + Math.floor(heroStats.maxHP / 10);
            console.log('A tenth of HP restored!');
        }
        monsterLevel++;
        for (var _i = 0, monsterList_2 = monsterList; _i < monsterList_2.length; _i++) {
            var monster = monsterList_2[_i];
            monster.init();
        }
        assignKey();
    }
}
function assignKey() {
    monsterHasKey = Math.floor(Math.random() * 3) + 1;
    console.log(monsterHasKey);
}
function checkIfHeroDead() {
    if (heroStats.currentHP < 1) {
        window.location.reload();
    }
}
function monsterDestination(input, specimen) {
    switch (input) {
        case 1: //down
            destination = [specimen.x, specimen.y + 1];
            break;
        case 2: //up
            destination = [specimen.x, specimen.y - 1];
            break;
        case 3: //left
            destination = [specimen.x - 1, specimen.y];
            break;
        case 4: //right
            destination = [specimen.x + 1, specimen.y];
            break;
    }
}
function attemptToMoveMonster(specimen) {
    if (monstersMove) {
        var direction = 0;
        var hasMoved = false;
        var stopIfInfinite = 0;
        while (!hasMoved) {
            if (stopIfInfinite > 100)
                break;
            direction = Math.floor(Math.random() * 4) + 1;
            monsterDestination(direction, specimen);
            if (checkIfMoveAllowed() && checkOtherMonsters(specimen)) {
                specimen.x = destination[0];
                specimen.y = destination[1];
                hasMoved = true;
            }
            stopIfInfinite++;
        }
    }
}
function checkOtherMonsters(specimen) {
    for (var i = 0; i < monsterList.length; i++) {
        if (i == specimen.orderNumber)
            continue;
        if (monsterList[i].x == destination[0] && monsterList[i].y == destination[1]) {
            return false;
        }
    }
    return true;
}
function renderMonster(specimen) {
    if (specimen.alive) {
        attemptToMoveMonster(specimen);
        ctx.drawImage(eval(specimen.image), (specimen.x - 1) * tileWidth, (specimen.y - 1) * tileWidth, tileWidth, tileWidth);
    }
    else {
        ctx.drawImage(blood, (specimen.x - 1) * tileWidth, (specimen.y - 1) * tileWidth, tileWidth, tileWidth);
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
    for (var i = 0; i < wallPositionList.length - 40; i++) {
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
    if (heroStats.hasKey) {
        ctx.fillText("You have the key to next level!", 660, 300);
    }
    else {
        ctx.fillText("You havent found the key yet.", 660, 300);
    }
    ctx.font = '13px Arial';
    ctx.fillText("One of the Skeletons has a key. To win a level, you must find the key", 660, 500);
    ctx.fillText("and defeat the Boss.", 660, 515);
    ctx.fillText("Whenever you win a level, map will reset, you keep your progress ", 660, 530);
    ctx.fillText("but the level of monsters goes up, so be careful!", 660, 545);
    ctx.fillText("When your HP drops to 0, you die and game restarts.", 660, 560);
    ctx.fillText("Killing Skeletons increases your hero level, use them to get stronger early on.", 660, 575);
    ctx.fillText("Winning a level has a chance to restore your HP.", 660, 590);
}
function attemptToMoveHero() {
    makeDestination();
    checkIfBattle();
    return checkIfMoveAllowed();
}
function checkIfMoveAllowed() {
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
    if (monster.orderNumber == monsterHasKey) {
        heroStats.hasKey = true;
    }
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
function checkIfBattleForMonsters() {
    for (var _i = 0, monsterList_4 = monsterList; _i < monsterList_4.length; _i++) {
        var monster = monsterList_4[_i];
        if (heroStats.x + 1 == monster.x && heroStats.y + 1 == monster.y && monster.alive) {
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
            if (attemptToMoveHero()) {
                heroStats.y++;
            }
            updateGameState();
            break;
        case 'ArrowUp':
            heroStats.facing = 'heroUp';
            if (attemptToMoveHero()) {
                heroStats.y--;
            }
            updateGameState();
            break;
        case 'ArrowLeft':
            heroStats.facing = 'heroLeft';
            if (attemptToMoveHero()) {
                heroStats.x--;
            }
            updateGameState();
            break;
        case 'ArrowRight':
            heroStats.facing = 'heroRight';
            if (attemptToMoveHero()) {
                heroStats.x++;
            }
            updateGameState();
            break;
    }
});
