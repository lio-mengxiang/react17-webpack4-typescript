# 无标题

这是一个基于 react、，typescript 的 webpack4 脚手架其中 webpack4，大致拥有的功能如下：<br />

<a name="d1c5bb7c"></a>

### 代码规范方面

- [x] 语法检测配置文件 - .eslintrc.js
- 需要编辑器下载对应插件开启编辑提示，如 vsCode 的 ESLint 插件

- [x] 编码风格的配置文件 - .editorConfig
- .editorconfig 是跨编辑器维护一致编码风格的配置文件，需要下载对应插件，比如 vsCode 的 EditorConfig for VS Code
  <a name="d41d8cd9"></a>

####

- [x] 设置下载包的源地址为淘宝源 - .yarnrc

- [x] 代码项目风格统一配置文件 - .prettierrc
- 如果说 EditorConfig 帮你统一编辑器风格，那 Prettier 就是帮你统一项目风格的。 Prettier 拥有更多配置项（实际上也不多，数了下二十个），且能在发布流程中执行命令自动格式化，能够有效的使项目代码风格趋于统一。需要下载对应插件，比如 vsCode 的 Prettier - Code formatter

- [x] css 规范配置文件 - sylelintrc.js
- 需要在编辑器下载对应插件才会有错误提示，比如 vsCode 的 stylelint 插件

<a name="2b7aa4af"></a>

### webpack 配置性能优化方面

webpack 配置文件在 build 目录下<br />

- [x] 启用了 tree-shaking
- 要求代码模块编写必须用 es6 模块，其次如果确认自己的文件没有副作用，请在 package.josn 中添加属性 sideEffects: false

- [x] 加快二次编译速度
- 有一个神器能大大提高二次编译速度，它为程序中的模块（如 lodash）提供了一个中间缓存，放到本项目 node_modules/.cache/hard-source 下，就是 hard-source-webpack-plugin

- [x] postcss 自动引入 normalize.css + css 兼容性处理
- 使用的插件和用处如下：

  - postcss-flexbugs-fixes ：用于修复一些和 flex 布局相关的 bug。
  - postcss-preset-env ：将最新的 CSS 语法转换为目标环境的浏览器能够理解的 CSS 语法，目的是使开发者不用考虑浏览器兼容问题。我们使用 autoprefixer 来自动添加浏览器头。
  - postcss-normalize ：从 browserslist 中自动导入所需要的 normalize.css 内容。

- [x] 抽离公共代码
- splitchunk 分离了基础库和项目代码

- [x] 打包内容分析和速度分析
- 使用 npm run build:analyze 可以看到打包内容的体积分析图，在命令行里可以看到各个包打包时间
