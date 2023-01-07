const path = require('path');
const { merge } = require('webpack-merge');
const webpack = require('webpack');

const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');

const isProduction = process.env.MODE === 'production';
const tsConfigPath = path.resolve(__dirname, '../tsconfig.json');
const withBundleAnalyzer = Boolean(process.env.BUNDLE_ANALYZE);

const common = require('./common');

module.exports = merge(common, {
  entry: {
    main: path.resolve(__dirname, '../src/entries/client/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/static/',
    filename: 'index.js',
    clean: false,
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/assets/html/index.html'),
      filename: path.resolve(__dirname, '../dist/index.html'),
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, '../src/assets/images/favicon.svg'),
      outputPath: path.resolve(__dirname, '../dist'),
      prefix: '/static/',
      inject: true,
      mode: isProduction ? 'webapp' : 'light',
      favicons: {
        appName: 'Jeembo Finance',
        appDescription: 'Crypto arbitrage platform',
        background: '#fff',
        theme_color: '#5095f0',
        icons: {
          appleStartup: false,
        }
      }
    }),
    ...(withBundleAnalyzer ? [
      new BundleAnalyzerPlugin(),
    ] : []),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /@server\.tsx?/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: tsConfigPath,
          },
        },
      },
      {
        include: /@server\.tsx?/,
        use: ['null-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          },
        ]
      },
    ],
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
});
