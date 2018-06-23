import path from 'path'
import fs from 'fs'
import defaultConfig from './default'

process.env.NODE_CONFIG_STRICT_MODE = 0
process.env.SUPPRESS_NO_CONFIG_WARNING = 'y'
const config = require('config')

class Config {

  constructor () {
    this.active = config.util.extendDeep(defaultConfig, config)
  }

  getActiveName (projectRoot) {
    const configPath = path.resolve(projectRoot, 'config', 'local.js')
    if (fs.existsSync(configPath)) {
      let fileNameParts = fs.realpathSync(configPath).split(path.sep).pop().split('.')
      fileNameParts.pop()
      return fileNameParts.join('.')
    } else {
      return null
    }
  }

}

export {
  Config,
  defaultConfig as defaultConfig,
}
