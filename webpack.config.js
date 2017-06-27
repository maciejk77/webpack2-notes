const path = require('path'); // run by Node.js 
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: './src/index.js', // entry point, starting from root folder
  output: {
    path: path.resolve(__dirname, 'build'), // see below comment 1
    filename: 'bundle.js', // reference to filename of the newly created output file i.e bundle.js
    publicPath: 'build/' // publicPath does its magic ;)
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/, // Regex to find all .js files, Babel to be applied only to .js files
      },
      {
        // use: ['style-loader', 'css-loader'], // NOTE: loaders are applied from right to left!!
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader' // some amount of preprocessing before files is included into Webpack bundle
        }), // 'use' above is in common use, 'loader' is legacy but used here for ExtractTextPlugin - way it is 
        test: /\.css$/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/, // Regex to pick up all major image formats
        use: [
          {
            loader: 'url-loader',
            options: { loader: 40000 } // files up to 40kB include in bundle.js, otherwise in build directory
          },
          'image-webpack-loader'
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css') // ExtractText looks for files transformed by 'css-loader' and are saved to styles.css file output, all css files will be included here
  ]
};

module.exports = config; // CommonJS module, exposing module to be imported where necessary