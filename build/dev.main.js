const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
module.exports =  {
  mode: 'none',
  target: 'electron-main',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  },
  entry: './src/main',
  output: {
    path: path.resolve(__dirname, "../dist"),
    libraryTarget: 'commonjs2',
    filename: 'main.dev.js'
  },
  plugins: [
    new webpack.EnvironmentPlugin({
        NODE_ENV: 'development'
      })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  node: {
    __dirname: false,
    __filename: false
  },
};
