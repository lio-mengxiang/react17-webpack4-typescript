const OpenBrowserPlugin = require('open-browser-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.base.config.js');
const { HOST, PORT, API_URL } = require('./config');

module.exports = merge(common, {
  devServer: {
    contentBase: paths.appBuild,
    // 启用 webpack 的模块热替换特性
    hot: true,
    // 域名配置，用本机ip
    host: HOST,
    // 端口号
    port: PORT,
    historyApiFallback: true,
    // 配置是否启用 gzip 压缩
    // compress: true,
    // 编译出错的时候，在浏览器页面上显示错误和警告
    overlay: true,
    disableHostCheck: true,
    // https://www.jianshu.com/p/eb889ab7f057
    // proxy: {
    //   '/h5/workbench': {
    //     // 这个是你要替换的位置
    //     target: 'http://192.168.60.56:19207',
    //     changeOrigin: true,
    //   },
    // },
  },
  // output: {
  //   publicPath: '/',
  //   ...LOCAL_CONFIG.output,
  // },

  devtool: 'cheap-module-source-map',

  plugins: [
    new OpenBrowserPlugin({ url: API_URL }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: paths.appPublic,
    //       to: paths.appBuild,
    //     },
    //   ],
    // }),
  ],
});
