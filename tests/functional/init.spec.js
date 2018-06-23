const shell   = require('shelljs')
const fs      = require('fs')
const path    = require('path')
const rcp     = require('recursive-copy')
const rimraf  = require('rimraf')

describe('functional/init', function () {

  const projectTemplate = path.resolve(__dirname, '..', '.project-template')
  const project         = path.resolve(__dirname, '..', '.project')
  const cliName         = 'testCli'

  beforeAll(function () {
    return rcp(projectTemplate, project).then(function () {
      shell.exec('npm install --production', { cwd: project })
      shell.exec(`./node_modules/.bin/clia init --cli-name=${cliName}`, { cwd: project })
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

  it('clia init should create config resources', function () {
    expect(fs.existsSync(path.resolve(project, 'config'))).toEqual(true)
    expect(fs.existsSync(path.resolve(project, 'config', 'default.js'))).toEqual(true)
    expect(fs.readFileSync(path.resolve(project, 'config', 'default.js')).toString('utf8')).toEqual('module.exports = {};')
  })

  it('clia init should modify package.json', function () {
    let packageJson = require(path.resolve(project, 'package.json'))
    expect(packageJson).toHaveProperty('clia.requirements')
    expect(packageJson).toHaveProperty('clia.help')
    expect(typeof packageJson.clia.help).toBe('string')
  })

  it('clia init should create commands directory and named cli entrypoint', function () {
    expect(fs.existsSync(path.resolve(project, cliName))).toEqual(true)
    expect(fs.existsSync(path.resolve(project, 'commands'))).toEqual(true)
  })

  it('clia should create use, add-requirement commands', function () {
    expect(fs.existsSync(path.resolve(project, 'commands', 'use.js'))).toEqual(true)
    expect(fs.existsSync(path.resolve(project, 'commands', 'add-requirement.js'))).toEqual(true)
  })

})
