const addon = require('../build/Release/cbus-native');

console.log("addon:");
console.log(addon);

exports.getFtdiDevices = addon.getFtdiDevices;
