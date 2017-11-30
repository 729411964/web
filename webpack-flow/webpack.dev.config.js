const path = require('path');
// webpack 配置项
const webpackConfig = {
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
            }
        ]
    }
};
module.exports = webpackConfig;