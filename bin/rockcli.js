#!/usr/bin/env node

const yargs = require('yargs')
const path  = require('path')

yargs
  .usage('Usage: rockcli [command] [options]')
  .commandDir(path.resolve(__dirname, '..', 'lib', 'commands'))
  .help('h')
  .alias('help', 'h')
  .demandCommand(1, 'you must include a command')
  .wrap(yargs.terminalWidth()/2)
  .argv
