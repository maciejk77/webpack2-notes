# Webpack 2 notes

- In single page app (SPA) the reliance on JS code to assemble a full webpage
- No calls to server on i.e. click, this is handled on client side i.e. React page rerenders on click and return HTML
- Server Side Rendering v Single Page App, latter has a lot more code to run in browser (JS)

## Problems with lots of JS code
- a few large files are difficult to navigate, understanding code base - JS modules as antidote to that e.g. many small JS files (clearer where code is in the project i.e. header.js, footer.js vs one main.js)
- many seperate files (modules) - problem is order of execution, reliance of one module on another (load order)
- multiple HTTP call is generally a bad idea from perfomance standpoint - the more calls the slower load of the page

## Webpack comes to rescue
- merging the collection of multiple JS files and merge them into one larger file, all executed in correct order i.e. bundle.js
- single or much less HTTP calls as a result - good for site performance

## Project plan

- Make a new NPM project in terminal

`mkdir js_modules`
`cd js_modules`
`npm init` // to generate package.json

## Module systems & Common syntax
- CommonJS // require, module.exports
- AMD Asynch Module Definition // require, define 
- ES2015 // import, export

## Installing Webpack
- `npm install --save-dev webpack@2.2.0-rc.0` // specific version of Webpack @2.2...
- create Webpack config file `webpack.config.js` in root folder
- **entry point** is the file which sits on top which is not required, we import to by any other above e.g. index.js
- index.js will be first executed (specified as entry point)

## Webpack.config.js

```javascript

const path = require('path'); // run by Node.js 

const config = {
  entry: './src/index.js', // entry point, starting from root folder
  output: {
    path: path.resolve(__dirname, 'build'), // see below comment 1
    filename: 'bundle.js' // reference to filename of the newly created output file i.e bundle.js
  }
};

module.exports = config; // CommonJS module, exposing module to be imported where necessary

// Comment 1
// reference to a path where output file should be stored - **ABSOLUTE PATH!**, helper from Node.js 
// which resolve the correct // path is generated, __dirname is a constant in Node.js 
// (reference to current working directory), once done save it to folder called build
```

- To use webpack in `package.json` replace `"scripts"` to below (double quotes both side)
- To start in command line `npm run build` - to run locally installed webpack (in mode_modules)

```javascript
"scripts": {
  "build": "webpack"
},
```

## Introduciton to loaders
- Babel (turns ES2016 to native JS - transpiling)
  - `babel-loader` / teaches babel how to work with Webpack
  - `babel-core` / knows how to take in code, parse it and generate some output files
  - `babel-preset-env` / ruleset for telling babel exactly what pieces of ES2015/6/7 syntax to look for and how to turn to ES5 code
  - to install all `npm install --save-dev babel-loader babel-core babel-preset-env`


