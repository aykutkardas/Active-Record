"use strict";
// Origin: https://github.com/lodash/lodash/blob/master/chunk.js
Object.defineProperty(exports, "__esModule", { value: true });
var chunk = function (array, size) {
    size = Math.max(size, 0);
    var length = array == null ? 0 : array.length;
    if (!length || size < 1) {
        return [];
    }
    var index = 0;
    var resIndex = 0;
    var result = new Array(Math.ceil(length / size));
    for (index; index < length; index += size) {
        result[resIndex++] = array.slice(index, index + size);
    }
    return result;
};
exports.default = chunk;
