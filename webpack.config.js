const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const BabiliPlugin = require("babili-webpack-plugin");

module.exports = {
  entry: {
    index: './index.js',
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js',
    library: 'fu-manchu',
    libraryTarget: 'umd'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        enforce: 'pre',
        loader: 'eslint-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ],
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
  ],
};
