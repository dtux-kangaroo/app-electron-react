const path = require('path');
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
module.exports =  {
  mode: 'production',
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
    filename: 'main.prod.js'
  },

  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        parallel: true,
        sourceMap: true,
        cache: true
      })
    ]
  },

  plugins: [],
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  node: {
    __dirname: false,
    __filename: false
  },
};
