const path = require('path'); // run by Node.js 

const config = {
  entry: './src/index.js', // entry point, starting from root folder
  output: {
    path: path.resolve(__dirname, 'build'), // see below comment 1
    filename: 'bundle.js' // reference to filename of the newly created output file i.e bundle.js
  }
};

module.exports = config; // CommonJS module, exposing module to be imported where necessary