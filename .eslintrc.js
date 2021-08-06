module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    babelOptions: {
      configFile: './babel.config.js',
    },
  },
  env: {
    'browser': true,
    'node': true,
    'es6': true,
    'jest/globals': true,
  },
  plugins: ['jest'],
  extends: ['eslint:recommended', 'google'],
  rules: {
    // 'semi': 'off',
    'max-len': ['error', { 'code': 120 }],
    'object-curly-spacing': ['error', 'always'],
    'arrow-parens': ['error', 'as-needed'],
    'require-jsdoc': 'off',
    'no-trailing-spaces': ['error', { 'skipBlankLines': true }],
    'no-debugger': 'off',
    'no-invalid-this': 'off',
    'comma-dangle': 'off'
  },
};
