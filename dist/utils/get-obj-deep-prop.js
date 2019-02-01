"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getObjDeepProp = function (obj, props, defaultValue) {
    if (!obj)
        return false;
    if (typeof obj !== "object")
        return false;
    if (!props)
        return obj;
    if (typeof props !== "string")
        return false;
    var propsArr = props.split(".");
    var rootObj = obj;
    propsArr.forEach(function (prop) {
        if (!rootObj) {
            rootObj = false;
            return;
        }
        if (typeof rootObj[prop] !== "undefined" ||
            rootObj[prop] !== null ||
            !isNaN(rootObj[prop])) {
            rootObj = rootObj[prop];
            return;
        }
        rootObj = false;
    });
    return rootObj !== false ? rootObj : defaultValue || false;
};
exports.default = getObjDeepProp;
