const path = require('path');
const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const baseConfig = require('./config.base.js');

const rootPath = path.resolve(__dirname, '../../');

module.exports = merge(baseConfig, {
  target: 'node',
  externals: [
    '@loadable/component',
    nodeExternals({
      moduleFromFile: true
    })
  ],
  entry: path.resolve(rootPath, './server/index.tsx'),
  output: {
    path: path.resolve(rootPath, './dist/server'),
    filename: 'ssr.js',
    globalObject: 'this'
  },
  node: {
    __dirname: false
  }
});
