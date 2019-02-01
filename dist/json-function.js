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
var _1 = require(".");
var type_check_1 = require("./type-check");
var JsonFunction = /** @class */ (function () {
    function JsonFunction() {
        this.data = [];
        this.process = [];
        this.option = {
            orderBy: null,
            where: null,
            limit: null,
            select: null,
            schema: null,
            innerJoin: null
        };
        this.config = {
            resetRecord: true
        };
    }
    JsonFunction.prototype.reset = function () {
        this.option = {
            orderBy: null,
            where: null,
            limit: null,
            select: null,
            schema: null,
            innerJoin: null
        };
        this.data = [];
        this.process = [];
        return this;
    };
    JsonFunction.prototype.processManager = function () {
        var _this = this;
        var option = this.option;
        var orderBy = option.orderBy, where = option.where, limit = option.limit, select = option.select, schema = option.schema, innerJoin = option.innerJoin;
        this.process.forEach(function (process) {
            switch (process) {
                case "orderBy":
                    var fieldName = orderBy[0], order = orderBy[1];
                    _this.data = _1.orderBy(_this.data, fieldName, order);
                    break;
                case "where":
                    _this.data = _1.where(_this.data, where);
                    break;
                case "limit":
                    var itemLimit = limit[0], start = limit[1];
                    _this.data = _1.limit(_this.data, itemLimit, start);
                    break;
                case "select":
                    _this.data = _1.select(_this.data, select);
                    break;
                case "schema":
                    _this.data = _1.schema(_this.data, schema);
                    break;
                case "innerJoin":
                    var otherData = innerJoin[0], dataFieldName = innerJoin[1], otherDataFieldName = innerJoin[2];
                    _this.data = _1.innerJoin(_this.data, otherData, dataFieldName, otherDataFieldName);
                    break;
            }
        });
    };
    JsonFunction.prototype.orderBy = function (fieldName, order) {
        if (order === void 0) { order = "ASC"; }
        this.option.orderBy = [fieldName, order];
        this.process.push("orderBy");
        return this;
    };
    JsonFunction.prototype.where = function (queries) {
        this.option.where = queries;
        this.process.push("where");
        return this;
    };
    JsonFunction.prototype.limit = function (limit, start) {
        if (limit === void 0) { limit = 10; }
        if (start === void 0) { start = 0; }
        this.option.limit = [limit, start];
        this.process.push("limit");
        return this;
    };
    JsonFunction.prototype.schema = function (schema) {
        this.option.schema = schema;
        this.process.push("schema");
        return this;
    };
    JsonFunction.prototype.select = function (fields) {
        this.option.select = fields;
        this.process.push("select");
        return this;
    };
    JsonFunction.prototype.innerJoin = function (otherData, dataFieldName, otherFiledName) {
        this.option.innerJoin = [otherData, dataFieldName, otherFiledName];
        this.process.push("innerJoin");
        return this;
    };
    JsonFunction.prototype.get = function (data, config) {
        if (config === void 0) { config = {}; }
        this.data = data;
        var configs = __assign({}, this.config, config);
        if (config.query) {
            this.setQuery(config.query);
        }
        this.processManager();
        var result = this.data.slice();
        if (configs.resetRecord !== false) {
            this.reset();
        }
        return result;
    };
    JsonFunction.prototype.getQuery = function () {
        var option = __assign({}, this.option);
        this.reset();
        return option;
    };
    JsonFunction.prototype.setQuery = function (query) {
        var _this = this;
        if (!type_check_1.isObject(query)) {
            return this;
        }
        this.option = query;
        Object.keys(query).forEach(function (process) {
            if (query[process]) {
                _this.process.push(process);
            }
        });
        return this;
    };
    return JsonFunction;
}());
exports.default = new JsonFunction();
