const HtmlWebpack = require('html-webpack-plugin');
// const path = require('path');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    output: {
        clean: true //limpia todo y vuelve a crear los archivos
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
            }
        ]
    },
    optimization: {},
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
            filename: '[name].css',
            ignoreOrder: false

        }),
        new CopyPlugin({
            patterns: [
              { from: "src/assets/", to: "assets/" },
            ],
          }),

    ]
}