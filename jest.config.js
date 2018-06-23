module.exports = {
  testMatch: [
    '<rootDir>/(tests/**/*.spec.js|tests/**/*.test.js)'
  ],
  globalSetup: './tests/setup.js',
  globalTeardown: './tests/teardown.js',
}
