import { Logger } from './logger'
import { Config } from './config'
import { Requirements } from './requirements'

class RockCli {

  constructor () {
    this.config       = new Config()
    this.logger       = (new Logger(this.config.active.logger)).logger
    this.requirements = new Requirements()
  }

}

const rockCli       = new RockCli()
const logger        = rockCli.logger
const config        = rockCli.config
const requirements  = rockCli.requirements
export {
  logger,
  config,
  requirements,
}
