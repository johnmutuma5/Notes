const a_package = require('a_package');
const data = require('./data.json')
const addon = require('addon');

// console.log(typeof data, data.name);
// console.log(addon.hello())

// console.log('req', require, 'module', module)
console.log('require cache', require.cache)

const prom = new Promise((res, rej) => {
    res('hello promise')
});


prom.then((res) => {
    console.log(res);
})
setImmediate(() => console.log('setImmediate'));
setTimeout(()=> console.log('setTimeout'));
process.nextTick((msg)=> {
    console.log(msg)
}, 'Hi there nextTick');
process.nextTick((msg)=> {
    console.log(msg)
}, 'Hi there nextTick2');
console.log('Last shall become first')
