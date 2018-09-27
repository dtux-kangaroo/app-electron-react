const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
module.exports = {
    mode: "production", 
    target: 'electron-renderer',//编译模式3
    entry:path.resolve(__dirname, '../src/render/index.js'),
    
    output: { //文件输出配置
        libraryTarget: 'commonjs2',
        path: path.resolve(__dirname, "../dist"), // 所有输出文件的目标路径
        filename: './js/renderer.prod.js'
    },
    module: { //这些选项决定了如何处理项目中的不同类型的模块。
        rules: [{
                test: /\.jsx?$/,
                exclude: /(node_modules)/, //处理该文件时，排除的目录，建议使用include
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ],
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                     MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [ //插件使用
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash].css",
            chunkFilename: "css/[id].[hash].css"
          }),
        new webpack.DefinePlugin({ //允许创建一个在编译时可以配置的全局常量。
            test: JSON.stringify("test"), //注：给定的值必须包含字符串本身内的实际引号 '"test"'
        }),
        // new webpack.ProvidePlugin({ //自动加载模块，而不必到处 import 或 require 
        //     _: 'lodash',
        // }),
        new HtmlWebPackPlugin({
            template:path.resolve(__dirname, '../src/render/index.html'),
            filename: "./index.html"
          }),
        new webpack.NamedModulesPlugin(),
        new CopyWebpackPlugin([
            {
              from: path.resolve(__dirname, '../src/public/icons'),
              to: path.resolve(__dirname, '../dist/icons')
            }
          ])
    ],
    performance: { //打包性能配置
        hints: false, // 关闭性能提示
    },
    optimization: {
        minimizer:[
            new UglifyJSPlugin({
              parallel: true,
              sourceMap: true,
              cache: true
            }),
            new OptimizeCSSAssetsPlugin({
              cssProcessorOptions: {
                map: {
                  inline: false,
                  annotation: true
                }
              }
            })
          ]
    },
    resolve: { //配置模块如何解析
        extensions: ['.js', '.jsx', '.scss', '.css', '.json'], //自动解析确定的扩展。覆盖原有扩展
        alias: { 
            pages: path.resolve(__dirname, '../src/render/pages/'),
            assets: path.resolve(__dirname, '../src/render/assets/'),
            component: path.resolve(__dirname, '../src/render/components/'),
            tpls: path.resolve(__dirname, '../src/render/tpls/')
        },
        modules: [
            path.resolve(__dirname, "../src"), //告诉 webpack 解析模块时应该搜索的目录。
            path.resolve(__dirname, '../node_modules')
        ]
    },
    externals: { //防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖         
    },
    node: {
        __dirname: false,
        __filename: false
      }
};