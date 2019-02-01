"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_tool_1 = require("./schema-tool");
var get_schema_value_1 = require("./schema-tool/get-schema-value");
var schema = function (data, schema) {
    if (data === void 0) { data = []; }
    if (schema === void 0) { schema = {}; }
    var schemaObj = schema;
    if (typeof schemaObj === 'function') {
        schemaObj = schemaObj(schema_tool_1.default);
    }
    var result = [];
    var fields = [];
    data.forEach(function (item) {
        var temp = JSON.parse(JSON.stringify(schemaObj));
        result.push(get_schema_value_1.default(temp, item, fields));
    });
    return result;
};
exports.default = schema;
