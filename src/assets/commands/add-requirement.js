import fs from 'fs'
import path from 'path'
import inquirer from 'inquirer'
import { logger } from 'clia'

class CommandDefinition {

  constructor () {
    this.command  = 'add-requirement'
    this.desc     = 'add a project external requirement (e.g. local-machine executable)'
  }

  handler () {
    inquirer.prompt([{
      type: 'list',
      choices: ['executable'],
      name: 'type',
      message: 'What type of requirement?',
    },
    {
      type: 'input',
      name: 'executable',
      message: 'What is the name of the executable?',
    },
    {
      type: 'input',
      name: 'version',
      message: 'And the semantic version requirement? (see https://www.npmjs.com/package/semver for more info on what to enter here)',
    },
    {
      type: 'input',
      name: 'versionCommand',
      message: 'What\'s the local command for returning the version of the executable, e.g `node --version`',
    },
    {
      type: 'input',
      name: 'versionCommandRegex',
      default: '[a-zA-Z\\s]+',
      message: 'In certain cases the output of the version command needs to be parsed to get a format that just includes the version, e.g 1.1.1, is there a regex to apply to the version command output?',
    },
    {
      type: 'input',
      name: 'help',
      default: null,
      message: 'Finally, any helpful info, links, etc. you would like to provide a user who doesn\'t have the executable installed? (optional)',
    }]).then((responses) => {
      let packageJson = require(path.resolve(__dirname, '..', 'package.json'))
      packageJson.clia.requirements[responses.executable] = {
        type: responses.type,
        version: responses.version,
        versionCommand: responses.versionCommand,
        versionCommandRegex: responses.versionCommandRegex,
        help: responses.help,
      }
      fs.writeFileSync(path.resolve(__dirname, '..', 'package.json'), JSON.stringify(packageJson, null, 2))
      logger.info('Requirement added to your package.json, you can update there manually at any time')
    }).catch((error) => {
      logger.error(error)
      process.exit(1)
    })
  }
}

const commandDefinition = new CommandDefinition()
module.exports = {
  command: commandDefinition.command,
  desc: commandDefinition.desc,
  handler: (argv) => {
    commandDefinition.handler(argv)
  },
}
