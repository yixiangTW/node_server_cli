#!/usr/bin/env node

const { program } = require('commander')
const pkg = require('./package.json')
const nodeServer = require('./index')

program.version(pkg.version)

program
  .option('-d, --directory [directory]', 'Set directory')
  .option('-p, --port [port]', 'Port to use')
  .option('-c, --cache [cache]', 'Set cache time');

program.parse(process.argv)

const options = program.opts()
nodeServer.startServer(options.directory, options.port, options.cache)
console.log(options)
