"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var type_check_1 = require("./type-check");
var get_obj_deep_prop_1 = require("./utils/get-obj-deep-prop");
var _1 = require("./");
var innerJoin = function (data, otherData, dataFieldName, otherDataFieldName) {
    if (!type_check_1.isArrayOfObject(data)) {
        return [];
    }
    if (!type_check_1.isArrayOfObject(otherData)) {
        return data;
    }
    if (!type_check_1.isString(dataFieldName) || !type_check_1.isString(otherDataFieldName)) {
        return data;
    }
    data = data.map(function (item) {
        var _a;
        var otherDataItem = _1.where(otherData, (_a = {}, _a[otherDataFieldName] = get_obj_deep_prop_1.default(item, dataFieldName), _a), { deep: true })[0];
        if (type_check_1.isObject(otherDataItem)) {
            return __assign({}, item, otherDataItem);
        }
        return item;
    });
    return data;
};
exports.default = innerJoin;
