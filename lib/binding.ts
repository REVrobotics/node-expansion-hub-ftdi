import {promisify} from "util";
import * as path from "path";
const addon = require('node-gyp-build')(path.join(__dirname, '..'));

export const enterExpansionHubFirmwareUpdateMode: (serial: string) => Promise<void> = promisify(addon.enterExpansionHubFirmwareUpdateMode);

// exports.enterExpansionHubFirmwareUpdateMode = enterExpansionHubFirmwareUpdateMode;
