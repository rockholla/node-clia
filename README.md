# @rockholla/clia

Add a CLI assistant tool to your node project, or quickly bootstrap a node-based CLI project

| Branch    | Status                                                                                                                                               |
| --------  | ---------------------------------------------------------------------------------------------------------------------------------------------------  |
| `develop` | [![Build Status](https://travis-ci.org/rockholla/nodejs-clia.svg?branch=develop)](https://travis-ci.org/rockholla/nodejs-clia)                       |
| `master`  | [![Build Status](https://travis-ci.org/rockholla/nodejs-clia.svg?branch=master)](https://travis-ci.org/rockholla/nodejs-clia)                        |

## Features and Included Tools

`clia` is capable of working with both new or existing projects. It allows you to add a CLI tool to the project for running specific encapsulated commands. A few example use cases:

1. You want to develop a CLI tool for deploying and managing custom infrastructure. You could quickly get up-and-running and start adding your custom commands and operations in minutes.
2. You'd like to include a CLI tool in an existing web app project to help automate parts of the project. Say, build the Docker image for your app and push it to an image repo. `clia` adds potential for encapsulating complex tasks specific to your project to be run by your CI/CD server via a simple command. Kinda like npm scripts, but with more power and flexibility.

The other tools within:

* [yargs](https://www.npmjs.com/package/yargs) for commands and argument parsing
* Easy config setup and management care of [npm config](https://www.npmjs.com/package/config), with extra features such as switching b/w different configurations quickly and easily
* Customized logging built-in care of [winston](https://www.npmjs.com/package/winston)
* Ability to declaratively enforce external requirements/versions, e.g. if your CLI requires a particular executable and version. Also looks at package.json engines version definitions to enforce. Version checking based on [semver](https://www.npmjs.com/package/semver)
* [inquirer](https://www.npmjs.com/package/inquirer) for prompts and user input

## Getting Started

In your existing node project

```
npm install --save @rockholla/clia
./node_modules/.bin/clia init
```

This will create the necessary resources in your project

Then `./clia help` or `./[your chosen cli entrypoint name] help` for more info. Start adding commands to the `commands` directory. Reference the clia-installed commands in that directory after running init for building your own. It's based off of [yargs](https://www.npmjs.com/package/yargs) command file modules.

## Working with included utilities

You can easily make use of the included `clia` tools while building your commands or other parts relevant to your CLI. For example, if you wanted to access both the built-in config and logger, you could do something like:

```
import { config, logger } from '@rockholla/clia'

logger.info(`Current log level configured as ${config.active.logger.level}`)
```

## Adding enforced requirements to your project

`clia` gives you the ability to strictly enforce certain requirements prior to running any command, say if your CLI makes use of the `grep` executable, then you can ensure that anyone running the tool actually has it installed.

To add requirements, you can either use the built-in command, `./clia add-requirement`, or add one manually to the `clia.requirements` property in your package.json. It should be in the form:

```
"clia": {
  "help": "...",
  "requirements": {
    "enabled": true,
    "executables": [{
      "name": "grep",
      "version": {
        "required": "~2",
        "command": "grep --version",
        "replace": "[a-zA-Z\\s\\(\\)\\-]+"
      },
      "help": "See more about grep at https://www.gnu.org/software/grep/"
    }]
  }
}
```

### package.json `clia.requirements`

* `enabled`: enable or disable requirements checks before running all commands
* `executables`: so far only executable requirements are supported, others may be added later
    * `name`: the name of the required executable, e.g. `grep`, `cat`, etc
    * `version`:
        * `required`: the [semantic version](https://www.npmjs.com/package/semver) required
        * `command`: the command to execute to get the installed version (default = `[name] --version`)
        * `replace`: the command to get the version often won't return just the version number, so use this field to add a regular expression for characters to replace from the version command output (default = `[a-zA-Z\s]+`)
    * `help`: some helpful text to display when the required version isn't installed if you like

Last, requirements checking also enforces any package.json engines defintions by default, so you can also enforce which node version(s) can and can't run your CLI commands. If you wish to turn off requirements checking entirely, simply update `clia.requirements.enabled` to be `false` in your package.json.
