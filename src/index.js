// index.js is dependant on sum
// sum.js is required before index.js is loaded

// no need to specify .js, relative path in the same folder in this case
const sum = require('./sum');

const total = sum(10,5);
console.log(total);