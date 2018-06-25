import fs from 'fs'
import path from 'path'
import inquirer from 'inquirer'
import { logger } from '@rockholla/clia'

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
      name: 'name',
      message: 'What is the name of the executable?',
    },
    {
      type: 'input',
      name: 'versionRequired',
      message: 'And the semantic version requirement? (see https://www.npmjs.com/package/semver for more info on what to enter here)',
    },
    {
      type: 'input',
      name: 'versionCommand',
      message: 'What is the local command for returning the version of the executable, e.g `node --version` (default = [name] --version)',
    },
    {
      type: 'input',
      name: 'versionCommandReplace',
      default: '[a-zA-Z\\s]+',
      message: 'you may need to replace parts of the version command ouput to get the version number itself, e.g 1.1.1. Is there a regex replace you need to use to get just the version number?',
    },
    {
      type: 'input',
      name: 'help',
      default: null,
      message: 'Finally, any helpful info, links, etc. you would like to provide a user who doesn\'t have the executable installed? (optional)',
    }]).then((responses) => {
      let packageJson = require(path.resolve(__dirname, '..', 'package.json'))
      packageJson.clia.requirements.executables.push({
        name: responses.name,
        version: {
          required: responses.versionRequired,
          command: (responses.versionCommand && responses.versionCommand != '') ? responses.versionCommand : `${responses.name} --version`,
          replace: responses.versionCommandReplace,
        },
        help: responses.help,
      })
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
