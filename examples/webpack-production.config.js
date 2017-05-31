const webpack = require('webpack');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
// git version
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin();
const WriteVersionPlugin = require('webpack-write-version-plugin');
// manifest
const ManifestPlugin = require('webpack-manifest-plugin');
const path = require('path');
const buildPath = path.resolve(__dirname, './build');
const Clean = require('clean-webpack-plugin');

const webpackConfig = require('./webpack.config');
const entry = webpackConfig.entryArr;

const config = {
    entry: entry,
    // devtool: 'source-map',
    output: {
        path: buildPath,
        publicPath: "/",
        filename: "[name].js",
	    //sourceMapFilename: "[name].js.map",
    },
    plugins: [
        new Clean(['build']),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
	        // sourceMap: true,
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        //
        new TransferWebpackPlugin([
            {from: 'www'},
        ], path.resolve(__dirname, 'src')),
        // manifest
        new ManifestPlugin({
            fileName: 'manifest.json'
        }),
        // git version
        new WriteVersionPlugin({
            version: gitRevisionPlugin.commithash(),
        }),
    ],
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
            'acfe': path.resolve(__dirname, '../src')
        }
    },
};

module.exports = config;
