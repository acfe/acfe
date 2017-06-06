const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, '../build');

const webpackConfig = require('./webpack.config');
const entry = webpackConfig.entryArr;

function getIPAdress () {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: entry,
    output: {
        path: buildPath,
        filename: "[name].js",
    },
    devServer: {
        contentBase: 'src/www',
        hot: true,
        inline: true,
        port: 3006,
        host: getIPAdress() || '127.0.0.1',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/,
                loader: "file-loader",
                query: {name: "[name].[hash].[ext]"}
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', "css-loader", "less-loader"]
            },
        ],
    },
    resolve: {
        alias: {
            'acfe': path.resolve(__dirname, '../acfe')
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};