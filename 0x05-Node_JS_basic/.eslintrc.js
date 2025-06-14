module.exports = {
  env: {
    node: true,
    es6: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'script'
  },
  rules: {
    indent: ['error', 2],
    'no-tabs': 'error',
    'space-before-blocks': ['error', 'always']
  }
};

