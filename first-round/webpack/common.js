const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

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
      fs: false,
      path: require.resolve('path-browserify'),
    },
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          keep_classnames: false,
          mangle: true,
          compress: false,
          keep_fnames: false,
          output: {
            comments: false,
          }
        }
      })
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ["es2015", { "modules": false }] // IMPORTANT
              ]
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'index.css',
    }),
  ],
};