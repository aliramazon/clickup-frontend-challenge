const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = function (env, argv) {
    console.log(__dirname, "====dirname=====");
    return {
        mode: "development",
        output: env,
        entry: "./src/index.js",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "build.[contentHash].js"
        },
        module: {
            rules: [
                {
                    test: /\.s?css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: "css-loader"
                        },
                        { loader: "sass-loader", options: { sourceMap: true } }
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({ filename: "styles.[contentHash].css" }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "src", "index.html")
            }),
            new CleanWebpackPlugin(),
            new webpack.HotModuleReplacementPlugin()
        ],
        devServer: {
            historyApiFallback: true,
            open: true,
            compress: true,
            port: 8000,
            watchFiles: ["src/*.html"]

            // devMiddleware: {
            //     writeToDisk: true
            // }
        }
    };
};
