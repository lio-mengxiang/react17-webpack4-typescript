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
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
      typescript: {
        directory: "./tsconfig.json",
      },
    },
  },
  plugins: ["react", "@typescript-eslint", "react-hooks"],
  rules: {
    "react/prop-types": 0,
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "react-hooks/rules-of-hooks": "error",
    "no-use-before-define": 0,
    "react/jsx-filename-extension": 0,
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
  },
}
