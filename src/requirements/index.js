import shell from 'shelljs'
import semver from 'semver'

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
          this.testSemver(
            engineName,
            this.getExecutableVersion(engineName),
            engines[engineName])
        } catch (error) {
          this.errors.push(error)
        }
      })
    }
    if (requirements.executables instanceof Array) {
      requirements.executables.forEach((requirement) => {
        try {
          this.testSemver(
            requirement.name,
            this.getExecutableVersion(requirement.name, requirement.version.command, requirement.version.replace),
            requirement.version.required,
            requirement.help
          )
        } catch (error) {
          this.errors.push(error)
        }
      })
    }
    if (this.errors.length > 0) {
      throw this.errors.join('')
    }
  }

  getExecutableVersion (name, command, replace) {
    command   = (command && command != '') ? command : `${name} --version`
    replace   = (replace && replace != '') ? replace : this.defaultReplace
    try {
      return shell.exec(command, { silent: true }).replace(new RegExp(replace, 'g'), '').trim()
    } catch (error) {
      return error
    }
  }

  testSemver (name, version, expected, help = '') {
    if (expected === null || expected === '') return
    if (!semver.satisfies(version, expected)) {
      throw `${name} should be version ${expected}, found ${version}\n${help}`
    }
  }
}

export {
  Requirements,
}
