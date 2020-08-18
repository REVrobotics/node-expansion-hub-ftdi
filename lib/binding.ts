import {promisify} from "util";

export const enterExpansionHubFirmwareUpdateMode = (serial: string): Promise<void> => {
    const addon = require('bindings')('addon.node');
    return (promisify(addon.enterExpansionHubFirmwareUpdateMode) as unknown) as Promise<void>;
}
