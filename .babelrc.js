module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        // 防止babel将任何模块类型都转译成CommonJS类型，导致tree-shaking失效问题
        modules: false,
      },
    ],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],

  plugins: [
    "dva-hmr",
    "@babel/plugin-transform-runtime",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    "@babel/plugin-proposal-class-properties",
    ["babel-plugin-import", { libraryName: "antd", style: true }],
  ],
}
