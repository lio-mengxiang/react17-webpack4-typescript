const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin") // 生成html的插件
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin") // 压缩css插件
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin") // 提升构建速度
const TerserPlugin = require("terser-webpack-plugin") // 压缩代码
// const CopyWebpackPlugin = require('copy-webpack-plugin'); // 复制文件
const ProgressBarPlugin = require("progress-bar-webpack-plugin") // 让控制台显示打包进度
// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const webpack = require("webpack")
const {
  NODE_ENV,
  INDEX_PATH,
  BUILD_PATH,
  IS_PRODUCTION,
  IS_DEVELOPMENT,
  SRC_PATH,
  isEnvProduction,
  LESS_REGEXP,
  IMG_REGEXP,
  NODE_MODULES_REGEXP,
  getResolveAppPath,
  getStyleLoaders,
  IOCAL_IDENTNAME,
} = require("./config")

module.exports = {
  mode: NODE_ENV,

  entry: {
    app: INDEX_PATH,
  },

  output: {
    path: getResolveAppPath(BUILD_PATH),
    // 开发模式下,不进行多余操作
    filename: IS_PRODUCTION ? "[name].[chunkhash:8].js" : IS_DEVELOPMENT && "[name].js",
    chunkFilename: IS_PRODUCTION ? "[name].[chunkhash:8].chunk.js" : IS_DEVELOPMENT && "[name].chunk.js",
  },

  // 让控制台不显示全部构建信息，有错误时才显示
  stats: "errors-only",

  resolve: {
    alias: {
      "@": getResolveAppPath(SRC_PATH),
    },
    extensions: [".tsx", ".ts", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: getResolveAppPath(SRC_PATH),
        use: [
          "thread-loader",
          {
            loader: "babel-loader",
            options: {
              // 缓存 loader 的执行结果
              cacheDirectory: true,
              // 去除未引入的lodash模块
              // plugins: ['lodash'],
            },
          },
        ],
      },
      {
        test: LESS_REGEXP,
        exclude: NODE_MODULES_REGEXP,
        use: getStyleLoaders(
          {
            modules: IOCAL_IDENTNAME,
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
          // {
          //   loader: 'style-resources-loader',
          //   options: {
          //     // 依赖动态生成的customVars.less
          //     patterns: [`${paths.appSrc}/constants/*.less`],
          //   },
          // },
        ),
      },
      // {
      //   test: LESS_REGEXP,
      //   include: NODE_MODULES_REGEXP,
      //   use: getStyleLoaders(
      //     {
      //       importLoaders: 2,
      //     },
      //     {
      //       loader: 'less-loader',
      //       options: {
      //         lessOptions: {
      //           javascriptEnabled: true,
      //           modifyVars: {
      //             'primary-color': '#1590FF',
      //           },
      //         },
      //       },
      //     },
      //   ),
      // },
      {
        test: IMG_REGEXP,
        exclude: NODE_MODULES_REGEXP,
        use: [
          {
            loader: "url-loader",
            options: {
              outputPath: "images", // 指定图片路径
              name: "[name].[contenthash:8].[ext]",
              limit: 1024,
            },
          },
        ],
      },
    ],
  },

  optimization: {
    minimize: isEnvProduction,
    runtimeChunk: true,
    minimizer: [
      // 压缩js文件
      new TerserPlugin({
        // 开启该插件的缓存，默认缓存到node_modules/.cache中
        cache: true,
        // 开启“多线程”，提高压缩效率
        parallel: true,
        exclude: NODE_MODULES_REGEXP,
      }),

      // 压缩css插件
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ["default", { minifyFontValues: { removeQuotes: false } }],
        },
      }),
    ],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        reactBase: {
          name: "reactBase",
          chunks: "all",
          test: /[\\/]node_modules[\\/](react|react-dom|@hot-loader|react-router|react-redux|react-router-dom)[\\/]/,
        },
        "async-commons": {
          // 异步加载公共包、组件等
          name: "async-commons",
          chunks: "async",
          test: /[\\/]node_modules[\\/]/,
          minChunks: 2,
          priority: 1,
        },
        default: {
          name: "default",
          priority: -20,
        },
      },
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: getResolveAppPath(SRC_PATH, "./index.html"),
      // colorLessPath: isEnvProduction ? '/workwechat/' : '/',
    }),

    // 开启dll，优化打包速度
    new HardSourceWebpackPlugin(),
    new HardSourceWebpackPlugin.ExcludeModulePlugin([
      {
        test: /.*\.DS_Store/,
      },
    ]),

    // 让控制台显示打包进度
    new ProgressBarPlugin(),
    // 拷贝public里面文件的icon
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: paths.appPublic,
    //       to: paths.appBuild,
    //     },
    //   ],
    // }),
    // 去除未引入的模块，需要和babel-plugin-lodash插件配合使用: https://www.cnblogs.com/fancyLee/p/10932050.html
    // new LodashModuleReplacementPlugin(),

    // 去掉moment的语言包
    new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(zh-cn)$/),

    // new webpack.DefinePlugin({
    //   PROJECT_ENV: JSON.stringify(PROJECT_ENV),
    // }),
  ],
}
