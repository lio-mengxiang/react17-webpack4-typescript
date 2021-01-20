const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const common = require('./webpack.base.config.js');

const ANALYZE = process.env.ANALYZE === 'true';

const plugins = [
  // 清除打包文件夹
  new CleanWebpackPlugin(),

  new webpack.IgnorePlugin(/^\.\/demos$/, /pages$/),

  // 用分析包工具
  ANALYZE
  && new BundleAnalyzerPlugin({
    analyzerPort: 8081,
  }),
  // 性能分析插件，可查看各plugin及loader占用时间
  ANALYZE ? new SpeedMeasurePlugin() : null
];

const mergeContent = {
  plugins: plugins.filter(Boolean),
};

// 判断是否需要加在分析包工具
module.exports = merge(common, mergeContent);
