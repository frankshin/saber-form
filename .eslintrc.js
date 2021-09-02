module.exports = {
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module"
  },
  extends: [
    'plugin:vue/recommended'
  ],
  rules: {
    "no-multi-spaces": 1,
    "vue/max-attributes-per-line": 'off',
    "vue/singleline-html-element-content-newline": 'off',
  }
}