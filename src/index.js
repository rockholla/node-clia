import { Logger } from './logger'
import { Config } from './config'
import { Requirements } from './requirements'

class Clia {

}

export const clia         = new Clia()
export const config       = new Config()
export const logger       = (new Logger(config.active.logger)).logger
export const requirements = new Requirements()
