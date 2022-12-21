/* eslint-disable */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack')
const ThreadsPlugin = require('threads-plugin')

let mode = 'development';
const target = 'web';
const plugins = [
  new CleanWebpackPlugin(),
  // new ThreadsPlugin(),
  new HtmlWebpackPlugin({
    title: 'Space Power Simulator',
    template: path.resolve(__dirname, '..', './src/index.html'),
  }),
  new webpack.ProvidePlugin({
    // Make a global `process` variable that points to the `process` package,
    // because the `util` package expects there to be a global variable named `process`.
         // Thanks to https://stackoverflow.com/a/65018686/14239942
    process: 'process/browser'
 })
];

if (process.env.NODE_ENV === 'production') {
  mode = 'production';
  // target = 'browserslist';
} else if (process.env.NODE_ENV === 'test') {
  mode = 'test';
} else {
  mode = 'development';
  plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
  mode,

  target,

  entry: {
    index: path.resolve(__dirname, '..', './src/index.js'),
  },

  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name].bundle.js',
    assetModuleFilename: 'assets/[hash][ext][query]',
  },

  optimization: {
    concatenateModules: false,
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|glb)$/i,
        type: 'asset',
      },
    ],
  },
  plugins,
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.join(__dirname, '../src/'),
      'node_modules/',
    ],
  },

  devtool: 'source-map',

  devServer: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:5000',
    },
    static: path.resolve(__dirname, '..', './dist'),
    hot: true,
  },
};
