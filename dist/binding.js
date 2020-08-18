"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enterExpansionHubFirmwareUpdateMode = void 0;
var util_1 = require("util");
exports.enterExpansionHubFirmwareUpdateMode = function (serial) {
    var addon;
    try {
        addon = require('bindings')('addon.node');
    }
    catch (e) {
        if (e instanceof Error && e.message.includes("module could not be found")) {
            throw new Error("The FTDI driver is not installed correctly");
        }
        else {
            throw e;
        }
    }
    return util_1.promisify(addon.enterExpansionHubFirmwareUpdateMode);
};
