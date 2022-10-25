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
exports.RedDoor = exports.GreenDoor = exports.RedChest = exports.GreenChest = exports.Door = exports.Witch = exports.Guard = exports.Skeleton = exports.Monster = exports.Treasure = void 0;
var mapgeneration_1 = require("./mapgeneration");
var setup_1 = require("./setup");
var variables_1 = require("./variables");
var Treasure = /** @class */ (function () {
    function Treasure() {
    }
    return Treasure;
}());
exports.Treasure = Treasure;
var Monster = /** @class */ (function () {
    function Monster(order, x, y, image, hp, DP, SP, alive, hasKey) {
        if (x === void 0) { x = 1; }
        if (y === void 0) { y = 0; }
        if (image === void 0) { image = 'boss'; }
        if (hp === void 0) { hp = 0; }
        if (DP === void 0) { DP = 0; }
        if (SP === void 0) { SP = 0; }
        if (alive === void 0) { alive = true; }
        if (hasKey === void 0) { hasKey = false; }
        this.speed = 1;
        this.orderNumber = order;
        this.x = x;
        this.y = y;
        this.image = image;
        this.HP = hp;
        this.DP = DP;
        this.SP = SP;
        this.alive = alive;
        this.hasKey = hasKey;
    }
    Monster.prototype.pickASpot = function (x, y) {
        this.x = x;
        this.y = y;
    };
    Monster.prototype.init = function () {
        this.pickASpot(mapgeneration_1.bossSetup[variables_1.monsterLevel - 1][0], mapgeneration_1.bossSetup[variables_1.monsterLevel - 1][1]);
        this.alive = true;
        this.HP = 15 + 5 * variables_1.monsterLevel;
        this.DP = 3 + variables_1.monsterLevel;
        this.SP = 5 + variables_1.monsterLevel;
    };
    return Monster;
}());
exports.Monster = Monster;
var Skeleton = /** @class */ (function (_super) {
    __extends(Skeleton, _super);
    function Skeleton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Skeleton.prototype.init = function () {
        this.image = 'skeleton';
        this.pickASpot(mapgeneration_1.skeletonSetup[variables_1.monsterLevel - 1][(this.orderNumber) * 2], mapgeneration_1.skeletonSetup[variables_1.monsterLevel - 1][(this.orderNumber) * 2 + 1]);
        this.alive = true;
        this.HP = 10;
        this.DP = 1;
        this.SP = 2;
    };
    return Skeleton;
}(Monster));
exports.Skeleton = Skeleton;
var Guard = /** @class */ (function (_super) {
    __extends(Guard, _super);
    function Guard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Guard.prototype.init = function () {
        this.image = 'guard';
        this.pickASpot(mapgeneration_1.guardSetup[variables_1.monsterLevel - 1][(this.orderNumber) * 2], mapgeneration_1.guardSetup[variables_1.monsterLevel - 1][(this.orderNumber) * 2 + 1]);
        this.alive = true;
        this.HP = 12 + variables_1.monsterLevel * 2;
        this.DP = 2 + variables_1.monsterLevel;
        this.SP = 4 + variables_1.monsterLevel;
    };
    return Guard;
}(Monster));
exports.Guard = Guard;
var Witch = /** @class */ (function (_super) {
    __extends(Witch, _super);
    function Witch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Witch.prototype.init = function () {
        this.image = 'witch';
        this.pickASpot(mapgeneration_1.witchSetup[variables_1.monsterLevel - 1][(this.orderNumber) * 2], mapgeneration_1.witchSetup[variables_1.monsterLevel - 1][(this.orderNumber) * 2 + 1]);
        this.alive = true;
        this.HP = 5;
        this.DP = 0;
        this.SP = 3;
    };
    return Witch;
}(Monster));
exports.Witch = Witch;
var Door = /** @class */ (function (_super) {
    __extends(Door, _super);
    function Door() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 0;
        return _this;
    }
    Door.prototype.init = function () {
        this.image = 'door';
        this.pickASpot(setup_1.mapSize, setup_1.mapSize);
        this.alive = true;
        this.HP = 0;
        this.DP = 0;
        this.SP = 0;
    };
    return Door;
}(Monster));
exports.Door = Door;
var GreenChest = /** @class */ (function (_super) {
    __extends(GreenChest, _super);
    function GreenChest() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 0;
        _this.gold = 0;
        _this.open = false;
        _this.hasPotion = false;
        _this.hasSword = false;
        return _this;
    }
    GreenChest.prototype.init = function () {
        this.image = 'greenChest';
        this.pickASpot(mapgeneration_1.greenChestSetup[variables_1.monsterLevel - 1][(this.orderNumber) * 2], mapgeneration_1.greenChestSetup[variables_1.monsterLevel - 1][(this.orderNumber) * 2 + 1]);
        this.alive = true;
        this.HP = 0;
        this.DP = 0;
        this.SP = 0;
    };
    return GreenChest;
}(Monster));
exports.GreenChest = GreenChest;
var RedChest = /** @class */ (function (_super) {
    __extends(RedChest, _super);
    function RedChest() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 0;
        _this.gold = 0;
        _this.open = false;
        _this.hasPotion = false;
        _this.hasSword = false;
        return _this;
    }
    RedChest.prototype.init = function () {
        this.image = 'redChest';
        this.pickASpot(mapgeneration_1.redChestSetup[variables_1.monsterLevel - 1][(this.orderNumber) * 2], mapgeneration_1.redChestSetup[variables_1.monsterLevel - 1][(this.orderNumber) * 2 + 1]);
        this.alive = true;
        this.hasSword = false;
        this.HP = 0;
        this.DP = 0;
        this.SP = 0;
    };
    return RedChest;
}(Monster));
exports.RedChest = RedChest;
var GreenDoor = /** @class */ (function (_super) {
    __extends(GreenDoor, _super);
    function GreenDoor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 0;
        return _this;
    }
    GreenDoor.prototype.init = function () {
        this.image = 'greenDoor';
        this.pickASpot(mapgeneration_1.greenDoorSetup[variables_1.monsterLevel - 1][(this.orderNumber) * 2], mapgeneration_1.greenDoorSetup[variables_1.monsterLevel - 1][(this.orderNumber) * 2 + 1]);
        this.alive = true;
        this.HP = 0;
        this.DP = 0;
        this.SP = 0;
    };
    return GreenDoor;
}(Monster));
exports.GreenDoor = GreenDoor;
var RedDoor = /** @class */ (function (_super) {
    __extends(RedDoor, _super);
    function RedDoor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 0;
        return _this;
    }
    RedDoor.prototype.init = function () {
        this.image = 'redDoor';
        this.pickASpot(mapgeneration_1.redDoorSetup[variables_1.monsterLevel - 1][(this.orderNumber) * 2], mapgeneration_1.redDoorSetup[variables_1.monsterLevel - 1][(this.orderNumber) * 2 + 1]);
        this.alive = true;
        this.HP = 0;
        this.DP = 0;
        this.SP = 0;
    };
    return RedDoor;
}(Monster));
exports.RedDoor = RedDoor;
