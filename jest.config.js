/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],
  setupFilesAfterEnv: ['./src/tests/setup.ts'],
  
};