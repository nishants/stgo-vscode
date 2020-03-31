const HTMLWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = {
  entry: {
    "main": "./ui/index.js",
  },
  output: {
    path: __dirname + '/out/ui',
    filename: "react-app-bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './ui/index.html',
      inlineSource: '.(js|css)$'
    }),
    new HtmlWebpackInlineSourcePlugin()
  ]
}