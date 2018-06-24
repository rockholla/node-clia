module.exports = {
  testMatch: [
    '<rootDir>/(tests/**/*.test.js)'
  ],
  globalSetup: './tests/setup.js',
  globalTeardown: './tests/teardown.js',
}
