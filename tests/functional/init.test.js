import fs from 'fs'
import path from 'path'
import settings from '../settings'

describe('functional/init', () => {

  it('clia init should create config resources', () => {
    expect(fs.existsSync(path.resolve(settings.directories.install, 'config'))).toEqual(true)
    expect(fs.existsSync(path.resolve(settings.directories.install, 'config', 'default.js'))).toEqual(true)
    expect(fs.readFileSync(path.resolve(settings.directories.install, 'config', 'default.js')).toString('utf8')).toEqual('module.exports = {};')
  })

  it('clia init should modify package.json', () => {
    let packageJson = require(path.resolve(settings.directories.install, 'package.json'))
    expect(packageJson).toHaveProperty('clia.requirements')
    expect(packageJson).toHaveProperty('clia.help')
    expect(typeof packageJson.clia.help).toBe('string')
  })

  it('clia init should create commands directory and named cli entrypoint', () => {
    expect(fs.existsSync(path.resolve(settings.directories.install, settings.cliName))).toEqual(true)
    expect(fs.existsSync(path.resolve(settings.directories.install, 'commands'))).toEqual(true)
  })

  it('clia should create use, add-requirement commands', () => {
    expect(fs.existsSync(path.resolve(settings.directories.install, 'commands', 'use.js'))).toEqual(true)
    expect(fs.existsSync(path.resolve(settings.directories.install, 'commands', 'add-requirement.js'))).toEqual(true)
  })

})
