import {promisify} from "util";
const addon = require('bindings')('addon.node');

const enterExpansionHubFirmwareUpdateMode: (serial: string) => Promise<void> = promisify(addon.enterExpansionHubFirmwareUpdateMode);

exports.enterExpansionHubFirmwareUpdateMode = enterExpansionHubFirmwareUpdateMode;
