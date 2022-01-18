const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      path: path.resolve(__dirname, '..', './.env.development'),
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, '..', './dist'),
    hot: true,
    historyApiFallback: true,
  },
  devtool: 'eval-source-map',
};
