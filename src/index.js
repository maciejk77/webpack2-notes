// index.js is dependant on sum
// sum.js is required before index.js is loaded

// no need to specify .js, relative path in the same folder in this case
// CommonJS require
// const sum = require('./sum');

// ES6 import 
import sum from './sum';
import './image_viewer'; // no import from... beacuse we are no exporting/importing but just running what is in image_viewer file

const total = sum(10,5);
console.log(total);