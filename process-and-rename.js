#!/usr/bin/env node

let { dirname, join } = require('path')
let { promisify } = require('util')
let { bold } = require('chalk')
let fs = require('fs')

let rename = promisify(fs.rename)

let processDir = require('./process-dir')
let cli = require('./cli')

cli(async (args, print) => {
  let tmpdir = join(process.cwd(), args[0])
  await processDir(tmpdir)
  await rename(tmpdir, join(dirname(tmpdir), 'dual-publish-tmp'))
  print('Check npm package content in ' + bold.bold('./dual-publish-tmp/'))
})
