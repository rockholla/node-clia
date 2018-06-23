#!/usr/bin/env node

import path from 'path'
import dotenv from 'dotenv'
dotenv.config()
if (!process.env.NODE_PATH) {
  process.env.NODE_PATH = path.resolve(__dirname)
}
import module from 'module'
module.Module._initPaths()
import { logger, config, requirements } from 'rockcli'

const yargs = require('yargs')
yargs
  .commandDir('commands')
  .option('debug', {
    alias: 'd',
    default: false,
    describe: 'more verbose, debug output for commands'
  })
  .help('h')
  .alias('help', 'h')
  .demandCommand(1, 'you must include a command')
  .check((argv) => {
    if (argv.debug) {
      logger.info('Enabling debug logging')
      logger.transports.forEach((transport) => {
        transport.level = 'debug'
      })
    }
    logger.info('Making sure system requirements are met...')
    try {
      let packageJson = require('./package.json')
      requirements.check(packageJson.rockcli.requirements, packageJson.engines)
    } catch (error) {
      logger.error(`Requirements check failed:\n${error}`)
      process.exit(1)
    }
    if (argv._ != 'use') {
      const activeConfigName = config.getActiveName(__dirname)
      if (activeConfigName) {
        logger.info(`Using the ${activeConfigName} config`)
        argv.activeConfigName = activeConfigName
      } else {
        logger.warn('Using the default configuration only')
        argv.activeConfigName = 'default'
      }
    }
    logger.debug(`Arguments: ${JSON.stringify(argv)}`)
    return true
  })
  .wrap(yargs.terminalWidth()/2)
  .argv
