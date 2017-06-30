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
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    // use DefinePlugin to make NODE_ENV i.e. equlas production string available on the window scope (beowser window)
    new webpack.DefinePlugin({
      // this makes sure that if returned string is production the error checking will be disabled and perfrormance improves further
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};

module.exports = config; // CommonJS module, exposing module to be imported where necessary