"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var type_check_1 = require("./type-check");
var get_obj_deep_prop_1 = require("./utils/get-obj-deep-prop");
var where = function (data, queries, options) {
    if (!type_check_1.isArray(data)) {
        return [];
    }
    var queriesArr;
    if (type_check_1.isObject(queries)) {
        queriesArr = [queries];
    }
    else if (type_check_1.isArrayOfObject(queries)) {
        queriesArr = queries;
    }
    else {
        return data;
    }
    var matchingItems = [];
    var result = [];
    queriesArr.forEach(function (query) {
        Object.keys(query).forEach(function (fieldName) {
            matchingItems = data.filter(function (item, index) {
                var value = item[fieldName];
                if (options && options.deep) {
                    value = get_obj_deep_prop_1.default(item, fieldName);
                }
                return value === query[fieldName];
            });
        });
        result = result.concat(matchingItems);
        matchingItems = [];
    });
    return result;
};
exports.default = where;
