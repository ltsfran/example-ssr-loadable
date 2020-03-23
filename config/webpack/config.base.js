const path = require('path');
const webpack = require('webpack');
const { dotenvOverride, createVarsDefinePlugin } = require('./utils');
const rootPath = path.resolve(__dirname, '../../');
const clientPath = path.resolve(__dirname, '../../client');

dotenvOverride();

const publicPath = '/';

module.exports = {
  devtool: 'source-map',
  entry: {
    app: path.resolve(clientPath, './src/index.tsx')
  },
  output: {
    path: path.resolve(rootPath, './dist/client'),
    publicPath
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@app': clientPath
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'awesome-typescript-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(createVarsDefinePlugin())
  ]
};
