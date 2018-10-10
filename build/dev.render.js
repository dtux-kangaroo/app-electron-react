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
    context:path.resolve(__dirname, '../src'),
    entry: {
        index: ['./render/index']
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                exclude: /(node_modules)/,
                use: {
                loader: 'babel-loader'
                }
            },
            {
                test: /\.(less|css)$/,
                use: [
                  "style-loader",
                  "css-loader",
                  "less-loader"
                ],
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                  "style-loader", //上面的简写方式
                  "css-loader",
                  "sass-loader"
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?[tv]=[\d.]+)*$/,
                use: ['file-loader?limit=8192&name=imgs/[hash:8].[name].[ext]']
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
            template: './render/index.html',
            filename: 'index.html',
        }),
        new ScriptExtHtmlPlugin({
            defaultAttribute: 'defer'
        }),
        new CopyWebpackPlugin([
            {from: './public',to:"./"},
            {from: './render/assets/libs',to:"./libs"},
            {from: './render/assets/imgs',to:"./imgs"}
        ]),
        new webpack.DefinePlugin({ISPROD: JSON.stringify(false)}),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
        })
    ],
    resolve: { //配置模块如何解析
        extensions: ['.js', '.jsx', '.scss', '.css', '.json'], //自动解析确定的扩展。覆盖原有扩展
        alias: { 
            pages: path.resolve(__dirname, '../src/render/pages/'),
            assets: path.resolve(__dirname, '../src/render/assets/'),
            components: path.resolve(__dirname, '../src/render/components/'),
            public: path.resolve(__dirname, '../src/public/'),
            utils: path.resolve(__dirname, '../src/render/utils/'),
            constants: path.resolve(__dirname, '../src/render/constants/'),
            layout: path.resolve(__dirname, '../src/render/layout/')
        },
        modules: [
            path.resolve(__dirname, "../src"), //告诉 webpack 解析模块时应该搜索的目录。
            path.resolve(__dirname, '../node_modules')
        ]
    }
}