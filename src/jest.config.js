const {defaults} = require('jest-config');
module.exports = {
  // ...
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  testRegex: 'spec\.[jt]sx?$',
  globals: {
    'ts-jest': {
      tsConfig: {
        importHelpers: true
      }
    }
  },
  preset: 'ts-jest'
};