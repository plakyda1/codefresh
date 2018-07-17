'use strict';

// Modules
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var ENV = process.env.npm_lifecycle_event;
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {
  var config = {};
  config.entry = {
    app: './src/app/app.js'
  };

  config.output = {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: isProd ? '[name].[hash].js' : '[name].bundle.js',
    chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
  };

  if (isProd) {
    config.devtool = 'source-map';
  } else {
    config.devtool = 'eval-source-map';
  }
  config.module = {
    rules: [{
      test: /\.js$/,
      use: [
          {loader: 'ng-annotate-loader', options: {es6: true}},
          {loader: 'babel-loader', options: { presets: ['es2015']}},
      ],
      exclude: /node_modules/
    }, {
      test: /\.(s*)css$/,
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: [
          {loader: 'css-loader', query: {sourceMap: true}},
          {loader: 'postcss-loader'},
          {loader: 'sass-loader'}
        ],
      })
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
      loader: 'file-loader'
    }, {
      test: /\.html$/,
      loader: 'raw-loader'
    }]
  };
  config.plugins = [
    new webpack.LoaderOptionsPlugin({
      test: /\.scss$/i,
      options: {
        postcss: {
          plugins: [autoprefixer]
        }
      }
    })
  ];
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: './src/public/index.html',
        inject: 'body'
      }),
      new ExtractTextPlugin({filename: 'css/[name].css', disable: !isProd, allChunks: true})
    )
  if (isProd) {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({ mangle: false }),
      new CopyWebpackPlugin([{
        from: __dirname + '/src/public'
      }])
    )
  }
  config.devServer = {
    contentBase: './src/public',
    stats: 'minimal',
    host: '0.0.0.0'
  };

  return config;
}();
