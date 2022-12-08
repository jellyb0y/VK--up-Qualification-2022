const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const basePath = path.resolve(__dirname, './');
const tsConfigPath = path.resolve(__dirname, '../tsconfig.json');
const isProduction = process.env.MODE === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  devtool: !isProduction && 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: tsConfigPath,
      }),
    ],
    fallback: {
      path: require.resolve('path-browserify'),
    },
  },
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: false,
    })],
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: tsConfigPath,
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.isProduction': isProduction,
      'process.env.basePath': String(basePath),
    }),
    new MiniCssExtractPlugin({
      filename: 'index.css',
    }),
  ],
};