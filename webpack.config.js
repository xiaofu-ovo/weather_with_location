// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = 'style-loader';
const cssHandler = 'css-loader';

const config = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].bundle.js',
    chunkFilename: '[name].[hash].chunk.js',
    publicPath: '/',
  },
  devServer: {
    // open: true,
    host: 'localhost',
    historyApiFallback: true,
    hot: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'weather_with_location',
      template: './template/index.html',
    }),
    new HotModuleReplacementPlugin({}),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, cssHandler],
      },
      {
        test: /\.less$/i,
        use: [stylesHandler, cssHandler, 'less-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }
  return config;
};
