import shell from 'shelljs'
import fs from 'fs'
import path from 'path'
import process from 'child_process'
import settings from '../settings'

describe('functional/use', () => {

  it('./clia use should prompt to create a new config if it does not exist, and a new config is created when selecting Y', (done) => {
    let p = process.spawn(`./${settings.cliName}`, ['use', 'doesntexist'], { cwd: settings.directories.install })
    p.on('exit', (code) => {
      expect(code).toEqual(0)
      expect(fs.existsSync(path.resolve(settings.directories.install, 'config', 'doesntexist.js'))).toEqual(true)
      expect(fs.readlinkSync(path.resolve(settings.directories.install, 'config', 'local.js'))).toMatch(/.*doesntexist.*/)
      fs.unlinkSync(path.resolve(settings.directories.install, 'config', 'doesntexist.js'))
      fs.unlinkSync(path.resolve(settings.directories.install, 'config', 'local.js'))
      done()
    })
    p.stdin.write('Y\n')
    p.stdin.end()
  })

  it('./clia use should prompt to create a new config if it does not exist, and not create it if N is selected', (done) => {
    let p = process.spawn(`./${settings.cliName}`, ['use', 'doesntexist'], { cwd: settings.directories.install })
    p.on('exit', (code) => {
      expect(code).toEqual(0)
      expect(fs.existsSync(path.resolve(settings.directories.install, 'config', 'doesntexist.js'))).toEqual(false)
      done()
    })
    p.stdin.write('N\n')
    p.stdin.end()
  })

  it('./clia use default should switch to the default config', () => {
    let result = shell.exec(`./${settings.cliName} use default`, { silent: true, cwd: settings.directories.install })
    expect(result.stdout).toMatch(/.*Now using the default config.*/)
  })

})
