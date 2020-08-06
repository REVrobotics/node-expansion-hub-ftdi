const binding = require("../dist/binding.js");
const assert = require("assert").strict;

assert(binding.enterExpansionHubFirmwareUpdateMode, "The expected function is undefined");

async function testBasic()
{
    await binding.enterExpansionHubFirmwareUpdateMode("DQ16G720");
}

assert.doesNotReject(testBasic, Error, "testBasic threw an exception")
    .then(() => console.log("Tests passed- everything looks OK!"))
    .catch(error => console.log(`Tests failed: ${error}`));
