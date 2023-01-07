const path = require('path');
const { merge } = require('webpack-merge');

const common = require('./common');
const tsConfigPath = path.resolve(__dirname, '../tsconfig.json');

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
  module: {
    rules: [
      {
        test: /\.tsx?$/,
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
