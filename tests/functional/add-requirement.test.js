import fs from 'fs'
import path from 'path'
import settings from '../settings'

describe('functional/add-requirement', () => {

  afterAll(() => {
    const packageJson = require(path.resolve(settings.directories.install, 'package.json'))
    packageJson.clia.requirements = {}
    fs.writeFileSync(path.resolve(settings.directories.install, 'package.json'), JSON.stringify(packageJson, null, 2))
  })

  it('placeholder', () => {
    expect(true).toEqual(true)
  })

  // TODO: nexpect doesn't seem to be the way to go here, need to figure out a custom process spawn solution to test this appropriately I think
  // it('./clia add-requirement should add a requirement to package.json', (done) => {
  //   nexpect.spawn(`./${settings.cliName}`, ['add-requirement'], { stripColors: true, cwd: settings.directories.install })
  //     .wait(/.*requirement\?.*/)
  //     .sendline('\n')
  //     .wait(/.*name of the executable.*/)
  //     .sendline('myexecutable')
  //     .wait(/.*semantic version.*/)
  //     .sendline('>=10.0.9\n')
  //     .wait(/.*version of the executable.*/)
  //     .sendline('myexecutable --version\n')
  //     .wait(/.*regex to apply.*/)
  //     .sendline('myexecutable|\\n.*\n')
  //     .wait(/.*any helpful info.*/)
  //     .sendline('some-test-help\n')
  //     .wait(/.*Requirement added.*/)
  //     .run((error, stdout, code) => {
  //       // eslint-disable-next-line no-console
  //       console.log(stdout)
  //       expect(error).toBeFalsy()
  //       expect(code).toEqual(0)
  //       const packageJson = require(path.resolve(settings.directories.install, 'package.json'))
  //       expect(typeof packageJson.clia.requirements.executables.length).toBeGreaterThan(0)
  //       expect(packageJson.clia.requirements.executables[0].name).toEqual('executable')
  //       expect(packageJson.clia.requirements.executables[0].version.required).toEqual('>=10.0.9')
  //       expect(packageJson.clia.requirements.executables[0].version.command).toEqual('myexecutable --version')
  //       expect(packageJson.clia.requirements.executables[0].version.replace).toEqual('myexecutable|\\n.*')
  //       expect(packageJson.clia.requirements.executables[0].help).toEqual('some-test-help')
  //       done()
  //     })
  // })

  // it('./clia add-requirement should add a custom regex to package.json when input', () => {
  //   expect.assertions(8)
  //   return new Promise(resolve => {
  //     nexpect.spawn(`./${settings.cliName}`, ['add-requirement'], { stripColors: true, cwd: settings.directories.install })
  //       .wait(/.*requirement\?.*/)
  //       .sendline('\x13')
  //       .wait(/.*name of the executable.*/)
  //       .sendline('myexecutable2')
  //       .wait(/.*semantic version.*/)
  //       .sendline('~12\n')
  //       .wait(/.*version of the executable.*/)
  //       .sendline('myexecutable2 --version\n')
  //       .wait(/.*regex to apply.*/)
  //       .sendline('myexecutable2.*\n')
  //       .wait(/.*any helpful info.*/)
  //       .sendline('some-test-help\n')
  //       .expect(/.*Requirement added.*/)
  //       .run((error, stdout, code) => {
  //         return resolve({
  //           error: error,
  //           stdout: stdout,
  //           code: code,
  //         })
  //       })
  //   }).then((result) => {
  //     expect(result.error).toBeFalsy()
  //     expect(result.code).toEqual(0)
  //     const packageJson = require(path.resolve(settings.directories.install, 'package.json'))
  //     expect(typeof packageJson.clia.requirements.myexecutable2).toBe('object')
  //     expect(packageJson.clia.requirements.myexecutable2.type).toEqual('executable')
  //     expect(packageJson.clia.requirements.myexecutable2.version).toEqual('~12')
  //     expect(packageJson.clia.requirements.myexecutable2.versionCommand).toEqual('myexecutable2 --version')
  //     expect(packageJson.clia.requirements.myexecutable2.versionCommandReplaceRegex).toEqual('myexecutable2.*')
  //     expect(packageJson.clia.requirements.myexecutable2.help).toEqual('some-test-help')
  //   })
  // })

})
