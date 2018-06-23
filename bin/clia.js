#!/usr/bin/env node
'use strict';

const yargs = require('yargs');
const path  = require('path');

yargs
  .usage('Usage: ./node_modules/.bin/clia [command] [options]')
  .commandDir(path.resolve(__dirname, '..', 'lib', 'commands'))
  .help('h')
  .alias('help', 'h')
  .demandCommand(1, 'you must include a command')
  .wrap(yargs.terminalWidth()/2)
  .argv;
