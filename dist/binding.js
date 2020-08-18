"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enterExpansionHubFirmwareUpdateMode = void 0;
var util_1 = require("util");
exports.enterExpansionHubFirmwareUpdateMode = function (serial) {
    var addon = require('bindings')('addon.node');
    return util_1.promisify(addon.enterExpansionHubFirmwareUpdateMode);
};
