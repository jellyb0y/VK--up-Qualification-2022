const path = require('path');
const { merge } = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const common = require('./common');
const tsConfigPath = path.resolve(__dirname, '../tsconfig.json');

const withBundleAnalyzer = Boolean(process.env.BUNDLE_ANALYZE);

module.exports = merge(common, {
  entry: {
    main: path.resolve(__dirname, '../src/entries/server/index.ts'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/static/',
    filename: 'server.js',
    clean: false,
  },
  target: 'node',
  plugins: [
    ...(withBundleAnalyzer ? [
      new BundleAnalyzerPlugin(),
    ] : []),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
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
});
