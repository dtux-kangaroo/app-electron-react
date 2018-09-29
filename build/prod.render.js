const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ScriptExtHtmlPlugin = require('script-ext-html-webpack-plugin');

module.exports = {
    mode: "production", 
    target: 'electron-renderer',//编译模式3
    entry:'./render/index.js',
    context:path.resolve(__dirname, '../src'),
    output: { //文件输出配置
        libraryTarget: 'commonjs2',
        path: path.resolve(__dirname, "../dist"), // 所有输出文件的目标路径
        filename: './js/render.prod.js'
    },
    module: { //这些选项决定了如何处理项目中的不同类型的模块。
        rules: [{
                test: /\.js|jsx$/,
                exclude: /(node_modules)/, //处理该文件时，排除的目录，建议使用include
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(less|css)$/,
                use: [
                  MiniCssExtractPlugin.loader,
                  "css-loader",
                  "less-loader"
                ],
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                     MiniCssExtractPlugin.loader,
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
    plugins: [ //插件使用
        new MiniCssExtractPlugin({
            filename: "./css/[name].[hash].css",
            chunkFilename: "./css/[id].[hash].css"
          }),
        new webpack.DefinePlugin({ //允许创建一个在编译时可以配置的全局常量。
            ISPROD: JSON.stringify(true), //注：给定的值必须包含字符串本身内的实际引号 '"test"'
        }),
        new HtmlWebPackPlugin({
            template:'./render/index.html',
            filename: "./index.html"
          }),
        new ScriptExtHtmlPlugin({
            defaultAttribute: 'defer'
        }),
        new webpack.NamedModulesPlugin(),
        new CopyWebpackPlugin([
            {from: './public',to:"./"},
            {from: './render/assets/libs',to:"./libs"},
            {from: './render/assets/imgs',to:"./imgs"}
        ]),
    ],
    performance: { //打包性能配置
        hints: false, // 关闭性能提示
    },
    optimization: {
        minimizer: [
          new UglifyJsPlugin({
            parallel: true,
            sourceMap: true,
            cache: true
          })
        ]
    },
    resolve: { //配置模块如何解析
        extensions: ['.js', '.jsx', '.scss', '.css', '.json'], //自动解析确定的扩展。覆盖原有扩展
        alias: { 
            pages: path.resolve(__dirname, '../src/render/pages/'),
            assets: path.resolve(__dirname, '../src/render/assets/'),
            components: path.resolve(__dirname, '../src/render/components/'),
            tpls: path.resolve(__dirname, '../src/render/tpls/'),
            utils: path.resolve(__dirname, '../src/render/utils/'),
            constants: path.resolve(__dirname, '../src/render/constants/'),
            layout: path.resolve(__dirname, '../src/render/layout/')
        },
        modules: [
            path.resolve(__dirname, "../src"), //告诉 webpack 解析模块时应该搜索的目录。
            path.resolve(__dirname, '../node_modules')
        ]
    },
    node: {
        __dirname: false,
        __filename: false
      }
};