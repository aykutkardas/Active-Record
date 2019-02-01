"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_obj_deep_prop_1 = require("../utils/get-obj-deep-prop");
var isSchemeToolsObject = function (obj) {
    return obj instanceof Object && obj.__schema__;
};
var recursive = function (schema, item, fields) {
    Object.keys(schema).forEach(function (fieldName) {
        var activeField = schema[fieldName];
        if (typeof activeField === "string" && fields.indexOf(fieldName) === -1) {
            schema[fieldName] = get_obj_deep_prop_1.default(item, activeField);
            fields.push(fieldName);
        }
        else if (isSchemeToolsObject(activeField)) {
            var __schema__ = activeField.__schema__;
            var job = __schema__.job, _a = __schema__.seperator, seperator = _a === void 0 ? " " : _a;
            var _b = __schema__.values, values = _b === void 0 ? [] : _b;
            values = values.map(function (value) { return get_obj_deep_prop_1.default(item, value); });
            if (job === "join") {
                schema[fieldName] = values.join(seperator);
            }
        }
        else if (activeField instanceof Object) {
            recursive(activeField, item, fields);
        }
    });
    fields.length = 0;
    return schema;
};
exports.default = recursive;
