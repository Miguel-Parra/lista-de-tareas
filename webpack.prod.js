const HtmlWebpack = require('html-webpack-plugin');
// const path = require('path');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizer = require("css-minimizer-webpack-plugin");
const Terser = require("terser-webpack-plugin");

module.exports = {
    mode: 'production',
    output: {
        clean: true, //limpia todo y vuelve a crear los archivos
        filename: 'main.[fullhash].js'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false
                }
            }, {
                test: /\.css$/,
                exclude: /styles.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtract.loader, 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader'
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }

        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Terser()
        ]
    },
    // devServer: {
    //     static: {
    //       directory: path.join(__dirname, 'dist'),
    //     },
    //     compress: true,
    //     port: 10000,
    //   },
    plugins: [
        new HtmlWebpack({
            title: 'Mi Webpack App',
            // filename: 'index.html'
            template: './src/index.html'
        }),
        new MiniCssExtract({
            filename: '[name].[fullhash].css',
            ignoreOrder: false

        }),
        new CopyPlugin({
            patterns: [
                { from: "src/assets/", to: "assets/" },
            ],
        }),

    ]
}