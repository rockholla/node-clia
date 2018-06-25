import shell from 'shelljs'
import settings from '../settings'

describe('functional/help', () => {

  it('./clia help', () => {
    const output = shell.exec(`./${settings.cliName} help`, { silent: true, cwd: settings.directories.install })
    expect(output.stdout).toMatch(/.*Commands:.*/)
  })

})
