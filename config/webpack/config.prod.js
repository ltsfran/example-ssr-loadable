const merge = require('webpack-merge');
const baseConfig = require('./config.base.js');
const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;

module.exports = merge(baseConfig, {
  target: 'web',
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js'
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all'
    }
  }
});
