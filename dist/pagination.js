"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var type_check_1 = require("./type-check");
var utils_1 = require("./utils");
var pagination = function (data, itemsPerPage) {
    if (itemsPerPage === void 0) { itemsPerPage = 10; }
    if (!type_check_1.isArray(data)) {
        return [];
    }
    if (!type_check_1.isNumber(itemsPerPage)) {
        itemsPerPage = 10;
    }
    var size = data.length;
    var totalPage = Math.ceil(size / itemsPerPage);
    var chunkData = utils_1.chunk(data, itemsPerPage);
    return new PaginationObject(chunkData, itemsPerPage, totalPage);
};
var PaginationObject = /** @class */ (function () {
    function PaginationObject(data, itemsPerPage, totalPage) {
        var _this = this;
        this.hasNextPage = function () {
            return _this.data[_this.activePage + 1] ? true : false;
        };
        this.hasPrevPage = function () {
            return _this.data[_this.activePage - 1] ? true : false;
        };
        this.nextPage = function () {
            if (_this.hasNextPage()) {
                _this.activePage = _this.activePage + 1;
                return _this.data[_this.activePage];
            }
            return [];
        };
        this.prevPage = function () {
            if (_this.hasPrevPage()) {
                _this.activePage = _this.activePage - 1;
                return _this.data[_this.activePage];
            }
            return [];
        };
        this.firstPage = function () {
            var newActivePage = 0;
            _this.activePage = newActivePage;
            return _this.data[newActivePage];
        };
        this.lastPage = function () {
            var newActivePage = _this.data.length - 1;
            _this.activePage = newActivePage;
            return _this.data[newActivePage];
        };
        this.getPage = function (page) {
            if (_this.existPage(page)) {
                _this.activePage = page;
                return _this.data[page];
            }
            return [];
        };
        this.existPage = function (page) {
            return _this.data[page - 1] ? true : false;
        };
        this.get = function () {
            return _this.data[_this.activePage];
        };
        this.getActivePage = function () {
            return _this.activePage + 1;
        };
        this.data = data;
        this.itemsPerPage = itemsPerPage;
        this.totalPage = totalPage;
        this.activePage = 0;
    }
    return PaginationObject;
}());
exports.default = pagination;
