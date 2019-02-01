"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SchemaTool = /** @class */ (function () {
    function SchemaTool() {
        this.__schema__ = {};
    }
    SchemaTool.prototype.join = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.__schema__.values = args;
        this.__schema__.job = "join";
        return this;
    };
    SchemaTool.prototype.with = function (seperator) {
        this.__schema__.seperator = seperator;
        return this;
    };
    return SchemaTool;
}());
exports.default = new SchemaTool();
