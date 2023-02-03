const path = require('path');
const { merge } = require('webpack-merge');
const webpack = require('webpack');

const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isProduction = process.env.MODE === 'production';
const tsConfigPath = path.resolve(__dirname, '../tsconfig.json');
const withBundleAnalyzer = Boolean(process.env.BUNDLE_ANALYZE);

const common = require('./common');
const { getThemesEntries } = require('./utils/getThemesEntries');

module.exports = merge(common, {
  entry: {
    main: path.resolve(__dirname, '../src/entries/client/index.tsx'),
    ...getThemesEntries(),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/static/',
    filename: '[name].js',
    clean: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/assets/html/index.html'),
      filename: path.resolve(__dirname, '../dist/index.html'),
      chunks: [
        'main',
      ],
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, '../src/assets/images/favicon.svg'),
      outputPath: path.resolve(__dirname, '../dist'),
      prefix: '/static/',
      inject: true,
      mode: isProduction ? 'webapp' : 'light',
      favicons: {
        appName: 'Mail.ru - Почта',
        appDescription: 'Почта, письма, рассылки',
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
        exclude: /node_modules|@server\.tsx?/,
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
});
