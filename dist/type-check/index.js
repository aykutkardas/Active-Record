"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getType = function (value) { return toString.call(value); };
var isNumber = function (value) {
    return value && typeof value === "number" && !isNaN(value);
};
exports.isNumber = isNumber;
var isArray = function (value) { return value && Array.isArray(value); };
exports.isArray = isArray;
var isArrayOfString = function (value) {
    return value &&
        isArray(value) &&
        !value.map(function (val) { return isString(val); }).includes(false);
};
exports.isArrayOfString = isArrayOfString;
var isArrayOfObject = function (value) {
    return value &&
        isArray(value) &&
        !value.map(function (val) { return isObject(val); }).includes(false);
};
exports.isArrayOfObject = isArrayOfObject;
var isObject = function (value) {
    return value && getType(value) === "[object Object]";
};
exports.isObject = isObject;
var isString = function (value) { return value && typeof value === "string"; };
exports.isString = isString;
var isDefined = function (value) { return value !== undefined; };
exports.isDefined = isDefined;
var isOneOf = function (value, options) {
    return isArray(options) ? options.includes(value) : false;
};
exports.isOneOf = isOneOf;
