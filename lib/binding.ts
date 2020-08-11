import {promisify} from "util";
const addon = require('bindings')('addon.node');

export const enterExpansionHubFirmwareUpdateMode: (serial: string) => Promise<void> = promisify(addon.enterExpansionHubFirmwareUpdateMode);

// exports.enterExpansionHubFirmwareUpdateMode = enterExpansionHubFirmwareUpdateMode;
