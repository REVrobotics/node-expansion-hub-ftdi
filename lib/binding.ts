import {promisify} from "util";

export const enterExpansionHubFirmwareUpdateMode = (serial: string): Promise<void> => {
    let addon;
    try {
        addon = require('bindings')('addon.node');
    } catch (e) {
        if (e instanceof Error && e.message.includes("module could not be found")) {
            throw new Error("The FTDI driver is not installed correctly");
        } else {
            throw e;
        }
    }
    return (promisify(addon.enterExpansionHubFirmwareUpdateMode) as unknown) as Promise<void>;
}
