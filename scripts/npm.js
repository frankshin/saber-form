#!/usr/bin/env node

const execa = require('execa')

async function release() {
  // publish to npm
  await execa('npm', ['run', 'build'], { stdio: 'inherit' })
  await execa('npm', ['publish'], { stdio: 'inherit' })
}
release()