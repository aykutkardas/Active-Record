"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var type_check_1 = require("./type-check");
var select = function (data, columns) {
    if (!type_check_1.isArray(data)) {
        return [];
    }
    var columnsArr;
    if (type_check_1.isString(columns)) {
        columnsArr = [columns];
    }
    else if (type_check_1.isArray(columns)) {
        columnsArr = columns;
    }
    else {
        return data;
    }
    data = data.map(function (item) {
        var newItem = {};
        columnsArr.forEach(function (column) {
            if (type_check_1.isDefined(item[column])) {
                newItem[column] = item[column];
            }
        });
        return newItem;
    });
    return data;
};
exports.default = select;
