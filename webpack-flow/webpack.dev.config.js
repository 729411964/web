const path = require('path');
const webpack = require('webpack');
const autoPrefixer = require('autoprefixer');
// webpack 配置项
const webpackConfig = {
    context: __dirname,
    entry: {
        one: "./src/scripts/one.js",
        three: "./src/scripts/three.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"), // string
        filename: "scripts/[name].js",
    },
    module: {
        rules: [
            // 'transform-runtime' 插件告诉 babel 要引用 runtime 来代替注入。
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                include: path.resolve(__dirname, "src/scripts"),
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(less|css)$/,
                include: path.resolve(__dirname, "src/css"),
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "postcss-loader",
                    options: {
                        ident: 'postcss',
                        plugins: [
                            autoPrefixer()
                        ]
                    }
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                include: path.resolve(__dirname, "src/image"),
                use: [
                    {
                        loader:"url-loader",
                        options:{
                            limit:8192,
                            name:"image/[name].[hash:8].[ext]" //在打包根目录（output.path）下生成处理后的图片。
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common' // 指定公共 bundle 的名称。
        })
    ]

};
module.exports = webpackConfig;