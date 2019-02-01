"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var type_check_1 = require("./type-check");
var orderBy = function (data, fieldName, order) {
    if (order === void 0) { order = "ASC"; }
    if (!type_check_1.isArray(data)) {
        return [];
    }
    if (!type_check_1.isString(fieldName)) {
        return data;
    }
    if (!type_check_1.isString(order)) {
        order = "ASC";
    }
    order = order.toUpperCase();
    if (!type_check_1.isOneOf(order, ["ASC", "DESC"])) {
        return data;
    }
    if (order === "DESC") {
        return data.sort(function (a, b) {
            return b[fieldName] > a[fieldName] ? 1 : a[fieldName] > b[fieldName] ? -1 : 0;
        });
    }
    if (order === "ASC") {
        return data.sort(function (a, b) {
            return a[fieldName] > b[fieldName] ? 1 : b[fieldName] > a[fieldName] ? -1 : 0;
        });
    }
};
exports.default = orderBy;
