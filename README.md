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

## Project start

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
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/
      }
    ]
  }
};

module.exports = config; // CommonJS module, exposing module to be imported where necessary

// Comment 1
// reference to a path where output file should be stored - **ABSOLUTE PATH!**, helper from Node.js 
// which resolve the correct // path is generated, __dirname is a constant in Node.js 
// (reference to current working directory), once done save it to folder called build
```

- To use webpack in `package.json` replace `"scripts"` to below (double quotes both sides)
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
  - add `.babelrc` too root folder and run `npm run build` again

```javascript
// .babelrc
{
  "presets": ["babel-preset-env"]
}
```

## Refactor CommonJS to ES6

`index.js`
```javascript
// index.js is dependant on sum
// sum.js is required before index.js is loaded

// no need to specify .js, relative path in the same folder in this case
// CommonJS require
// const sum = require('./sum');

// ES6 import 
import sum from './sum';
const total = sum(10,5);
console.log(total);
```

`sum.js`
```javascript
const sum = (a, b) => a + b;

// CommonJS module exporting/exposing to public access
// module.exports = sum;

// ES6 module exporting
export default sum;
```

Rebuild with `npm run build`

## Handling CSS in Webpack

- CSS npm loaders
  - `css-loader` / teaches Webpack just how to import and parse CSS files
  - `style-loader` / teaches Webpack where to put and how to add CSS to HTML
  - to install all `npm install --save-dev css-loader style-loader`

```javascript
// Updated Webpack.config code

const path = require('path'); // run by Node.js 

const config = {
  entry: './src/index.js', // entry point, starting from root folder
  output: {
    path: path.resolve(__dirname, 'build'), // see below comment 1
    filename: 'bundle.js' // reference to filename of the newly created output file i.e bundle.js
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/, // Regex to find all .js files, Babel to be applied only to .js files
      },
      {
        use: ['style-loader', 'css-loader'], // NOTE: loaders are applied from right to left!!
        test: /\.css$/
      }
    ]
  }
};

module.exports = config; // CommonJS module, exposing module to be imported where necessary

// with current set up CSS is being injected on build into <head> tag, not ideal solution, needs tweaking
```

  - install 'npm install --save-dev extract-text-webpack-plugin@2.0.0-beta.4' // 
    - run Webpack, take any text generated by loader, save it in seperate file in output directory
  - `loader` some amount of preprocessing before files are included into Webpack bundle
  - `plugins` work outside webpack pipeline, but find the way to end up in bundle.js output

```javascript

// With plugin and loader added, index.html does not include CSS styles in <head> tag but CSS bundle styles.css
      {
        // use: ['style-loader', 'css-loader'], // NOTE: loaders are applied from right to left!!
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader' // some amount of preprocessing before files is included into Webpack bundle
        }), // 'use' above is in common use, 'loader' is legacy but used here for ExtractTextPlugin - way it is 
        test: /\.css$/
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css') // ExtractText looks for files transformed by 'css-loader' and are saved to styles.css file output, all css files will be included here
  ]
};
```

## Dealing with images

- `image-webpack-loader` / compress images automatically
- `url-loader` / saves small image up to 10k as raw data in bundle.js, if big size will be save as raw data in build directory
  - Install with `npm install --save-dev image-webpack-loader url-loader`

## Code splitting

- Load only the least amount the code for the given task e.g. login page only JS code handling form

`image_viewer.js` has the defualt export
```javascript
export default () => {  
const image = document.createElement('img');
image.src = small;

document.body.appendChild(image);
};
```


```javascript
const buttons = document.createElement('button');
button.innerText = 'Click me';
button.onclick = () => {
  System.import('./image_viewer').then(module => { // an way to import module into the web page, Promise which when fullfilled then will return default module
    module.default();
  });
};

document.body.appendChild(button);
```

- An extended example of code splitting with code split into bundle and vendor, making sure that code is not repeated

```javascript
var webpack = require('webpack');
var path = require('path');

const VENDOR_LIBS = [
  'react', 'lodash', 'redux', 'react-redux, react-dom', 'faker' // and other npm modules here
];

module.exports = {
  entry: { 
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js' // [name] will be replaced by bundle, vendor
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/          
      }, 
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      },
      plugins: [
        new webpack.optimize.CommonsChunkPlugin({ // plugin looks at total file e.g. bundle, vendor files and make sure that code is not being repeated
          name: 'vendor' // compare vendor and bundle if code repeats pull it out and put it into vendor only
        })
      ]
    ]
  }
};

```

