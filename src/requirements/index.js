import shell from 'shelljs'
import semver from 'semver'
import commandExists from 'command-exists'

class Requirements {

  constructor() {
    this.errors         = []
    this.defaultReplace = '[a-zA-Z\\s]+'
  }

  check (requirements, engines) {
    if (!requirements.enabled) {
      return
    }
    if (engines instanceof Object) {
      Object.keys(engines).forEach((engineName) => {
        try {
          let executableVersion = this.getExecutableVersion(engineName)
          this.testSemver(
            engineName,
            executableVersion,
            engines[engineName])
        } catch (error) {
          this.errors.push(error)
        }
      })
    }
    if (requirements.executables instanceof Array) {
      requirements.executables.forEach((requirement) => {
        try {
          let executableVersion = this.getExecutableVersion(
            requirement.name,
            requirement.version.command,
            requirement.version.replace,
            requirement.help
          )
          this.testSemver(
            requirement.name,
            executableVersion,
            requirement.version.required,
            requirement.help
          )
        } catch (error) {
          this.errors.push(error)
        }
      })
    }
    if (this.errors.length > 0) {
      throw this.errors.join('\n')
    } else {
      return true
    }
  }

  getExecutableVersion (name, command, replace, help = '') {
    command     = (command && command != '') ? command : `${name} --version`
    replace     = (replace && replace != '') ? replace : this.defaultReplace
    if (!commandExists.sync(name)) {
      throw `${name} does not exist${help ? help + '\n' : ''}`
    }
    let result  = shell.exec(command, { silent: true })
    if (result.code !== 0) {
      throw `${result.stderr}`
    } else {
      result = result.stdout.trim() !== '' ? result.stdout : result.stderr
      result = result.replace(new RegExp(replace, 'g'), '').trim()
      return result.replace(/(\.|^)0+([0-9]+)/g, '$1$2') // replace leading zeros
    }
  }

  testSemver (name, version, expected, help = '') {
    if (expected === null || expected === '') return
    if (!semver.satisfies(version, expected)) {
      throw `${name} should be version ${expected}, found ${version}\n${help ? help + '\n' : ''}`
    }
  }
}

export {
  Requirements,
}
