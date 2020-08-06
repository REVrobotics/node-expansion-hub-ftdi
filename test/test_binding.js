const cbus = require("../dist/binding.js");
const assert = require("assert").strict;

console.log("cbus:");
console.log(cbus);
assert(cbus.getFtdiDevices, "The expected function is undefined");

function testBasic()
{
    const result =  cbus.getFtdiDevices();
    assert.equal(result, [], "Unexpected value returned");
}

assert.doesNotThrow(testBasic, Error, "testBasic threw an expection");

console.log("Tests passed- everything looks OK!");
