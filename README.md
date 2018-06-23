# rockcli

Quickly bootstrap a node CLI project, or add more complex CLI support to an existing project

[![Build Status](https://travis-ci.org/rockholla/node-rockcli.svg?branch=master)](https://travis-ci.org/rockholla/node-rockcli)

## Features and Included Tools

`rockcli` is capable of working with both new or existing projects. It allows you to add a CLI tool to the project for running specific encapsulated commands. A few example use cases:

1. You want to develop a CLI tool for deploying and managing custom infrastructure. You could quickly get up-and-running and start adding your custom commands and operations in minutes.
2. You'd like to include a CLI tool in an existing web app project to help automate parts of the project. Say, build the Docker image for your app and push it to an image repo. `rockcli` adds potential for encapsulating complex tasks specific to your project to be run by your CI/CD server via a simple command. Kinda like npm scripts, but with more power and flexibility.

The other tools within:

* [yargs](https://www.npmjs.com/package/yargs) for commands and argument parsing
* Easy config setup and management care of [npm config](https://www.npmjs.com/package/config), with extra features such as switching b/w different configurations quickly and easily
* Customized logging built-in care of [winston](https://www.npmjs.com/package/winston)
* Ability to declaratively enforce external requirements/versions, e.g. if your CLI requires a particular binary and version. Also looks at package.json engines version definitions to enforce. Version checking based on [semver](https://www.npmjs.com/package/semver)
* [inquirer](https://www.npmjs.com/package/inquirer) for prompts and user input

## Getting Started

In your existing node project

```
npm install --save rockcli
./node_modules/.bin/rockcli init
```

This will create the necessary resources in your project