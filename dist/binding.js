"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enterExpansionHubFirmwareUpdateMode = void 0;
var util_1 = require("util");
var addon = require('bindings')('addon.node');
exports.enterExpansionHubFirmwareUpdateMode = (0, util_1.promisify)(addon.enterExpansionHubFirmwareUpdateMode);
// exports.enterExpansionHubFirmwareUpdateMode = enterExpansionHubFirmwareUpdateMode;
