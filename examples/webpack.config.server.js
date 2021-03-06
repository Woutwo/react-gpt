/* eslint-disable */
var fs = require("fs");
var path = require("path");
var webpack = require("webpack");

var appDir = __dirname + "/apps";

module.exports = {
    devtool: "inline-source-map",

    entry: fs.readdirSync(appDir).reduce(function (entries, dir) {
        if (fs.statSync(path.join(appDir, dir)).isDirectory()) {
            entries[dir] = ["core-js/fn/promise", path.join(appDir, dir, "main.js")];
        }

        return entries;
    }, {}),

    output: {
        path: __dirname + "/__build__",
        filename: "[name].js",
        chunkFilename: "[id].chunk.js",
        publicPath: "/__build__/"
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin("shared.js"),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "production")
        })
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel",
                exclude: /node_modules/,
                include: __dirname,
                query: {
                    presets: ["es2015-without-strict", "stage-0", "react"],
                    plugins: ["transform-decorators-legacy"]
                }
            }
        ]
    },

    resolve: {
        alias: {
            "react-gpt": process.cwd() + "/lib"
        }
    }
};
