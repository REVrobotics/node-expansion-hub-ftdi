import {promisify} from "util";
const addon = require('../build/Release/expansion-hub-fw-update-mode-native');

exports.enterExpansionHubFirmwareUpdateMode = promisify(addon.enterExpansionHubFirmwareUpdateMode);
