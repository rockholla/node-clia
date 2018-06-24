import shell from 'shelljs'
import fs from 'fs'
import path from 'path'
import rcp from 'recursive-copy'
import rimraf from 'rimraf'
import process from 'child_process'

describe('functional/init', () => {

  const projectTemplate = path.resolve(__dirname, '..', '.project-template')
  const project         = path.resolve(__dirname, '..', '.project')
  const cliName         = 'testCli'

  beforeAll(() => {
    return rcp(projectTemplate, project).then(() => {
      shell.exec('npm install --production', { cwd: project, silent: true })
      shell.exec(`./node_modules/.bin/clia init --cli-name=${cliName}`, { cwd: project, silent: true })
    })
  })

  afterAll(() => {
    return new Promise((resolve, reject) => {
      return rimraf(project, (error) => {
        if (error) return reject(error)
        return resolve()
      })
    })
  })

  it('clia init should create config resources', () => {
    expect(fs.existsSync(path.resolve(project, 'config'))).toEqual(true)
    expect(fs.existsSync(path.resolve(project, 'config', 'default.js'))).toEqual(true)
    expect(fs.readFileSync(path.resolve(project, 'config', 'default.js')).toString('utf8')).toEqual('module.exports = {};')
  })

  it('clia init should modify package.json', () => {
    let packageJson = require(path.resolve(project, 'package.json'))
    expect(packageJson).toHaveProperty('clia.requirements')
    expect(packageJson).toHaveProperty('clia.help')
    expect(typeof packageJson.clia.help).toBe('string')
  })

  it('clia init should create commands directory and named cli entrypoint', () => {
    expect(fs.existsSync(path.resolve(project, cliName))).toEqual(true)
    expect(fs.existsSync(path.resolve(project, 'commands'))).toEqual(true)
  })

  it('clia should create use, add-requirement commands', () => {
    expect(fs.existsSync(path.resolve(project, 'commands', 'use.js'))).toEqual(true)
    expect(fs.existsSync(path.resolve(project, 'commands', 'add-requirement.js'))).toEqual(true)
  })

  it('./clia help', () => {
    const output = shell.exec(`./${cliName} help`, { silent: true, cwd: path.resolve(__dirname, '..', '.project') })
    expect(output.stdout).toMatch(/.*Commands:.*/)
  })

  it('./clia help', () => {
    const output = shell.exec(`./${cliName} help`, { silent: true, cwd: path.resolve(__dirname, '..', '.project') })
    expect(output.stdout).toMatch(/.*Commands:.*/)
  })

  it('./clia use should prompt to create a new config if it does not exist, and a new config is created when selecting Y', (done) => {
    let p = process.spawn(`./${cliName}`, ['use', 'doesntexist'], { cwd: path.resolve(__dirname, '..', '.project') })
    p.on('exit', (code) => {
      expect(code).toEqual(0)
      expect(fs.existsSync(path.resolve(__dirname, '..', '.project', 'config', 'doesntexist.js'))).toEqual(true)
      expect(fs.readlinkSync(path.resolve(__dirname, '..', '.project', 'config', 'local.js'))).toMatch(/.*doesntexist.*/)
      fs.unlinkSync(path.resolve(__dirname, '..', '.project', 'config', 'doesntexist.js'))
      fs.unlinkSync(path.resolve(__dirname, '..', '.project', 'config', 'local.js'))
      done()
    })
    p.stdin.write('Y\n')
    p.stdin.end()
  })

  it('./clia use should prompt to create a new config if it does not exist, and not create it if N is selected', (done) => {
    let p = process.spawn(`./${cliName}`, ['use', 'doesntexist'], { cwd: path.resolve(__dirname, '..', '.project') })
    p.on('exit', (code) => {
      expect(code).toEqual(0)
      expect(fs.existsSync(path.resolve(__dirname, '..', '.project', 'config', 'doesntexist.js'))).toEqual(false)
      done()
    })
    p.stdin.write('N\n')
    p.stdin.end()
  })

  it('./clia use default should switch to the default config', () => {
    let result = shell.exec(`./${cliName} use default`, { silent: true, cwd: path.resolve(__dirname, '..', '.project') })
    expect(result.stdout).toMatch(/.*Now using the default config.*/)
  })

  it('./clia add-requirement should kick off the add requirement process', (done) => {
    let p = process.spawn(`./${cliName}`, ['add-requirement'], { cwd: path.resolve(__dirname, '..', '.project') })
    let passed = false
    p.on('exit', (code) => {
      expect(code).toEqual(null)
      expect(passed).toEqual(true)
      done()
    })
    p.stdout.on('data', (data) => {
      if (data.indexOf('requirement?') >= 0) {
        passed = true
        p.kill()
      }
    })
  }, 3000)

  // TODO: test all add-requirement cases

})
