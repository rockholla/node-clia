import shell from 'shelljs'
import semver from 'semver'

class Requirements {

  constructor() {
    this.errors               = []
    this.defaultReplaceRegex  = '[a-zA-Z\\s]+'
  }

  check (requirements, engines) {
    if (engines instanceof Object) {
      Object.keys(engines).forEach((engineName) => {
        try {
          this.testSemver(engineName, this.getExecutableVersion(engineName), engines[engineName])
        } catch (error) {
          this.errors.push(error)
        }
      })
    }
    if (requirements instanceof Object) {
      Object.keys(requirements).forEach((name) => {
        let requirement = requirements[name]
        try {
          if (requirement.type === 'executable') {
            this.testSemver(name, this.getExecutableVersion(name, requirement.versionCommand, requirement.versionCommandRegex), requirement.version)
          }
        } catch (error) {
          this.errors.push(error)
        }
      })
    }
    if (this.errors.length > 0) {
      throw this.errors.join('')
    }
  }

  getExecutableVersion (name, command, replaceRegex) {
    command       = command || `${name} --version`
    replaceRegex  = replaceRegex || this.defaultReplaceRegex
    try {
      return shell.exec(command, { silent: true }).replace(new RegExp(replaceRegex, 'g'), '').trim()
    } catch (error) {
      return error
    }
  }

  testSemver (name, version, expected) {
    if (!semver.satisfies(version, expected)) {
      throw `${name} should be version ${expected}, found ${version}`
    }
  }
}

export {
  Requirements,
}
