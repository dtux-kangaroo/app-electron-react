const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlPlugin = require('script-ext-html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    mode:'production',
    target: 'electron-renderer',
    entry: {
        index: [path.resolve(__dirname, '../src/render/index')]
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "[name].js",
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
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash].css",
            chunkFilename: "css/[id].[hash].css"
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname, '../src/render/index.html'),
            filename: 'index.html',
        }),
        new ScriptExtHtmlPlugin({
            defaultAttribute: 'defer'
        }),
        new CopyWebpackPlugin([
            {
              from: path.resolve(__dirname, '../src/public/icons'),
              to: path.resolve(__dirname, '../dist/icons')
            }
        ]),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development'
        })
    ],
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
    }
}