import winston from 'winston'

export default {
  logger: {
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
    level: 'info',
    colors: {
      error: 'red',
      warn: 'yellow',
      info: 'green',
      verbose: 'cyan',
      debug: 'blue',
      silly: 'purple',
    },
    levels: {
      error: 0,
      warn: 1,
      info: 2,
      verbose: 3,
      debug: 4,
      silly: 5
    },
  },
}
