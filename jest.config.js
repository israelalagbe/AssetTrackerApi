
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  "modulePathIgnorePatterns": [
    "<rootDir>/node_modules",
    "<rootDir>/dist"
  ],
  testTimeout: 7000
};