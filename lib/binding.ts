export const enterExpansionHubFirmwareUpdateMode = async (serial: string): Promise<void> => {
    let addon: any;
    try {
        addon = require('bindings')('addon.node');
        return new Promise((resolve, reject) => {
            addon.enterExpansionHubFirmwareUpdateMode(serial, (err: Error|undefined) => {{
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            }});
        });
    } catch (e) {
        if (e instanceof Error && e.message.includes("module could not be found")) {
            throw new Error("The FTDI driver is not installed correctly");
        } else {
            throw e;
        }
    }
}
