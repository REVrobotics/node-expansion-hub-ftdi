const binding = require("../dist/binding.js");
const assert = require("assert").strict;

assert(binding.enterExpansionHubFirmwareUpdateMode, "The expected function is undefined");

async function testBasic() {
    const serial = "DQ4W4TMO"; // Replace with the serial number of your Expansion Hub
    await binding.enterExpansionHubFirmwareUpdateMode(serial);
}

assert.doesNotReject(testBasic, Error, "testBasic threw an exception")
    .then(() => console.log("Tests passed- everything looks OK!"))
    .catch(error => console.log(`Tests failed: ${error}`));
