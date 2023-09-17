/* eslint-disable */

module.exports = {
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      // 다른 설정...
      tsconfig: 'tsconfig.json',
      // ECMAScript Modules를 사용하도록 설정
      useESM: true,
    },
  },
  moduleNameMapper: {
    '^@utils/calcDutchPay$': '<rootDir>/path/to/calcDutchPay.ts',
  },
};
