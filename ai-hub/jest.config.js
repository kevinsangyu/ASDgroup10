/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  "transform": {
    "^.+\\.(ts|tsx|js|jsx)$": 'ts-jest'
  },
  "globals": {
    "ts-jest": {
      "tsconfig": "./tsconfig.test.json"
    }
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};