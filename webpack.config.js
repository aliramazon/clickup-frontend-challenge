const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = function (env, argv) {
    const isProd = argv.mode === "production";
    return {
        mode: argv.mode,
        entry: "./src/index.js",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "build.[contenthash].js",
            assetModuleFilename: "images/[contenthash].[ext]"
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
                },
                {
                    test: /\.html$/i,
                    loader: "html-loader"
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: `${
                    isProd ? "styles.[contenthash].css" : "styles.css"
                }`
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "src", "index.html"),
                inject: "body"
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
        }
    };
};
