// 写入config的标准 1、常量多处使用 2、变量 3、方法
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // css转化为链接引入

class Config {
  constructor() {
    this.PORT = '2001';
    this.HOST = '127.0.0.1';
    this.API_URL = `http://${this.HOST}:${this.PORT}`;
    this.PRIMARY_COLOR = '#4C84FF';
    this.IOCAL_IDENTNAME = '[path][name]__[local]--[hash:base64:5]';
    this.HTML_PATH = './src/index.html';
    this.INDEX_PATH = './src/index.tsx';
    this.BUILD_PATH = './dist';
    this.NODE_MODULES_PATH = './node_modules';
    this.SRC_PATH = './src';
    this.LESS_REGEXP = /\.less$/;
    this.IMG_REGEXP = /\.(png|svg|jpg|gif|mp3)$/;
    this.NODE_MODULES_REGEXP = /node_modules/;
    this.NODE_ENV = process.env.NODE_ENV;
    this.IS_DEVELOPMENT = this.NODE_ENV === 'development';
    this.IS_PRODUCTION = this.NODE_ENV === 'production';
  }
  getResolveAppPath = (pathStr, ...otherPath) => {
    return path.resolve(process.cwd(), pathStr, ...otherPath);
  }
  getStyleLoaders = (cssOptions, ...preProcessors) => {
    const ret = [];
    if (this.IS_DEVELOPMENT) {
      ret.push('style-loader');
    }
    if (this.IS_PRODUCTION) {
      ret.push({
        loader: MiniCssExtractPlugin.loader,
      })
    }
    ret.push(
      {
        loader: 'css-loader',
        options: cssOptions,
      },
      'postcss-loader',
      ...preProcessors
    );
    return ret;
  }
};

module.exports = new Config();
