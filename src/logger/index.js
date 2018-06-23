import winston from 'winston'

class Logger {

  constructor (config) {
    this.logger = winston.createLogger({
      levels: config.levels,
      level: config.level,
      format: config.format,
      transports: config.transports,
    })
    winston.addColors(config.colors)
  }

}

export {
  Logger,
}
