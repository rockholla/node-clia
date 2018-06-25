module.exports = (() => {
  const path = require('path')
  return {
    cliName: 'testCli',
    directories: {
      template: path.resolve(__dirname, '.project-template'),
      install: path.resolve(__dirname, '.project'),
    },
  }
})()
