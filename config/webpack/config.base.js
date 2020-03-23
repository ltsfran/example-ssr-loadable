const path = require('path');
const webpack = require('webpack');
const LoadablePlugin = require('@loadable/webpack-plugin');
const { dotenvOverride, createVarsDefinePlugin } = require('./utils');

const rootPath = path.resolve(__dirname, '../../');
const clientPath = path.resolve(__dirname, '../../client');

dotenvOverride();

const publicPath = '/';
const isDevelopment =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

module.exports = {
  devtool: 'source-map',
  mode: isDevelopment ? 'development' : 'production',
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
    new webpack.DefinePlugin(createVarsDefinePlugin()),
    new LoadablePlugin()
  ]
};
