import fs from 'fs'
import path from 'path'
import inquirer from 'inquirer'
import { logger } from '@rockholla/clia'

class CommandDefinition {

  constructor () {
    this.command  = 'use [name]'
    this.desc     = 'switch to a different configuration in /config'
  }

  symlink (argv) {
    fs.symlinkSync(
      path.join(__dirname, '..', 'config', argv.name + '.js'),
      path.join(__dirname, '..', 'config', 'local.js')
    )
    logger.info(`Now using ${argv.name} configuration`)
  }

  handler (argv) {
    if (!argv.name) {
      logger.error('Please enter a name for the new configuration')
      process.exit(1)
    }
    if (argv.name === 'default') {
      this.deleteExisting()
      logger.info('Now using the default config')
      return
    }

    if (fs.existsSync(path.join(__dirname, '..', 'config', argv.name + '.js'))) {
      this.deleteExisting()
      this.symlink(argv)
    } else {
      logger.warn(`Unable to find /config/${argv.name}`)
      inquirer.prompt({
        type: 'confirm',
        name: 'create',
        message: 'Would you like to create it?'
      }).then((response) => {
        if (response.create) {
          fs.writeFileSync(path.resolve(__dirname, '..', 'config', `${argv.name}.js`), 'module.exports = {};')
          this.symlink(argv)
        }
      })
    }
  }

  deleteExisting () {
    try {
      fs.unlinkSync(path.join(__dirname, '..', 'config', 'local.js'))
    } catch (error) {
      // bypass silently
    }
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
