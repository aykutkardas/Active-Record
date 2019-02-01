"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var type_check_1 = require("./type-check");
var limit = function (data, limit, start) {
    if (!type_check_1.isArray(data)) {
        return [];
    }
    if (!type_check_1.isNumber(limit)) {
        limit = 10;
    }
    if (!type_check_1.isNumber(start)) {
        start = 0;
    }
    return data.slice(start, limit + start);
};
exports.default = limit;
