module.exports = {
  env: {
    browser: true,
    // "es2021": true
  },
  extends: ["airbnb", "prettier", "plugin:react/recommended", "prettier/react"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "react-hooks"],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "no-use-before-define": 0,
    "react/jsx-filename-extension": 0,
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
  },
}
