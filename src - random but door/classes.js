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
exports.Door = exports.Skeleton = exports.Monster = void 0;
var random_1 = require("./random");
var variables_1 = require("./variables");
var Monster = /** @class */ (function () {
    function Monster(order, x, y, image, hp, DP, SP, alive) {
        if (x === void 0) { x = 1; }
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
    Monster.prototype.pickASpot = function (x, y) {
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
                if (!(0, random_1.checkIfNotFloor)(x - j, y - i)) {
                    this.x = x - j;
                    this.y = y - i;
                    console.log("".concat(this.image).concat(this.orderNumber, " placed at ").concat(this.x, ", ").concat(this.y));
                    return;
                }
                console.log("".concat(this.image).concat(this.orderNumber, " not placed at ").concat(x - j, ", ").concat(y - i));
            }
        }
        console.log("".concat(this.image).concat(this.orderNumber, " incorrectly placed, ").concat(this.x, ", ").concat(this.y));
        return;
    };
    Monster.prototype.init = function () {
        this.pickASpot(10, 10);
        this.alive = true;
        this.HP = 15;
        this.DP = 4;
        this.SP = 6;
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
        this.pickASpot(variables_1.skeletonSetup[this.orderNumber - 1][0], variables_1.skeletonSetup[this.orderNumber - 1][1]);
        this.alive = true;
        this.HP = 10;
        this.DP = 1;
        this.SP = 2;
    };
    return Skeleton;
}(Monster));
exports.Skeleton = Skeleton;
var Door = /** @class */ (function (_super) {
    __extends(Door, _super);
    function Door() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Door.prototype.init = function () {
        this.image = 'door';
        this.pickASpot(random_1.mapSize, random_1.mapSize);
        this.alive = true;
        this.HP = 0;
        this.DP = 0;
        this.SP = 0;
    };
    return Door;
}(Monster));
exports.Door = Door;
