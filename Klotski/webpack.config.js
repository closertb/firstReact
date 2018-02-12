const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const ExtractTextPlugin = reqire('extract-text-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    entry:  './src/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        host:'0.0.0.0',
        inline: true,
        port: 8089,
        contentBase: './dist'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }

            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            },{
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader']
/*                ,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader", // 编译后用什么loader来提取css文件
                    use: "css-loader" // 指需要什么样的loader去编译文件,这里由于源文件是.css所以选择css-loader
                })*/
            }

        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
   //     new ExtractTextPlugin("style.css"),
        new HtmlWebpackPlugin({template: './index.html'})
    ],
};