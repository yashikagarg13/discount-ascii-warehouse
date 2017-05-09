const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Path = require("path");
const Webpack = require("webpack");

const config = (env) => {
  const ifProd = (rule) => env.prod ? rule : undefined;
  const removeEmpty = (array) => array.filter(item => !!item);

  return {
    context: Path.join(__dirname, "/src"),
    entry: {
      app: "./app.js",
      vendors: ["react", "react-dom", "prop-types", "axios"],
    },
    output: {
      path: Path.join(__dirname, "/static"),
      filename: "js/[name].js",
    },
    resolve: {
      extensions: ['.js']
    },
    module: {
      rules: removeEmpty([
        ifProd({
          test: /\.jsx?$/,
          use: [{
            loader: "eslint-loader"
          }],
          exclude: /node_modules/,
          enforce: "pre",
        }), {
          test: /\.jsx?$/,
          use: [{
            loader: "babel-loader",
          }],
          exclude: /node_modules/,
        }, {
          test: /\.(css(\?.*)?)$/,
          use: ExtractTextPlugin.extract({
           fallback: "style-loader",
           use: "css-loader",
          }),
        }]
      )
    },
    plugins: [
      new CleanWebpackPlugin(['static/js'], {
        root: Path.join(__dirname, "/"),
        verbose: true,
        dry: false
      }),
      new ExtractTextPlugin({
        filename: "style.css",
        disable: false,
        allChunks: true,
      }),
      new Webpack.optimize.CommonsChunkPlugin({
        name: "vendors",
        filename: "js/vendors.js",
      }),
    ]
  };
}

module.exports = config;