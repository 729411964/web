const path = require('path');
const webpack = require('webpack');
// webpack 配置项
const webpackConfig = {
    context:__dirname,
    entry:{
        one:"./src/scripts/one.js",
        three:"./src/scripts/three.js"
    },
    output:{
        path: path.resolve(__dirname, "dist/scripts"), // string
        filename: "[name].js",
    },
    module:{
        rules: [
            // 'transform-runtime' 插件告诉 babel 要引用 runtime 来代替注入。
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                include:path.resolve(__dirname, "src/scripts"),
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.less$/,
                include:path.resolve(__dirname, "src/css"),
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            }
        ]
    },
    devServer: {
         contentBase: './dist'
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common' // 指定公共 bundle 的名称。
        })
    ]

};
module.exports = webpackConfig;