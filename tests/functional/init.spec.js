const shell   = require('shelljs')
const fs      = require('fs')
const path    = require('path')
const rcp     = require('recursive-copy')
const rimraf  = require('rimraf')

describe('functional/init', function () {

  const projectTemplate = path.resolve(__dirname, '..', '.project-template')
  const project         = path.resolve(__dirname, '..', '.project')

  beforeAll(function () {
    return rcp(projectTemplate, project).then(function () {
      shell.exec('npm install --production', { cwd: project })
      shell.exec('./node_modules/.bin/rockcli init --cli-name=testCli', { cwd: project })
    })
  })

  afterAll(function () {
    return new Promise(function (resolve, reject) {
      return rimraf(project, function (error) {
        if (error) return reject(error)
        return resolve()
      })
    })
  })

  it('rockcli init should create config resources', function () {
    expect(fs.existsSync(path.resolve(project, 'config'))).toEqual(true)
    expect(fs.existsSync(path.resolve(project, 'config', 'default.js'))).toEqual(true)
    expect(fs.readFileSync(path.resolve(project, 'config', 'default.js')).toString('utf8')).toEqual('module.exports = {};')
  })

  it('rockcli init should modify package.json', function () {
    let packageJson = require(path.resolve(project, 'package.json'))
    expect(packageJson).toHaveProperty('rockcli.requirements')
    expect(packageJson).toHaveProperty('rockcli.help')
    expect(typeof packageJson.rockcli.help).toBe('string')
  })

  it('rockcli init should create commands directory and named cli entrypoint', function () {
    expect(fs.existsSync(path.resolve(project, 'testCli'))).toEqual(true)
    expect(fs.existsSync(path.resolve(project, 'commands'))).toEqual(true)
  })

})
