const a_package = require('a_package');
const data = require('./data.json')
const addon = require('addon');

console.log(typeof data, data.name);
console.log(addon.hello())

// console.log(module)
