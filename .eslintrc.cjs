module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
    'jest': true,
  },
  'extends': 'google',
  'overrides': [
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'ignorePatterns': ['node_modules'],
  'rules': {
    'require-jsdoc': 0,
    'max-len': 0,
  },
};
