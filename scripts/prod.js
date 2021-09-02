#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const execa = require('execa')
const semver = require('semver')
const inquirer = require('inquirer')
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'))

const options = {
  type: 'list',
  name: 'version',
  message: '请选择版本号:',
  choices: [
    {
      name: `v${semver.inc(pkg.version, 'patch')}: 小bug`,
      value: semver.inc(pkg.version, 'patch'),
    },
    {
      name: `v${semver.inc(pkg.version, 'minor')}: 新版本`,
      value: semver.inc(pkg.version, 'minor'),
    },
  ],
}

inquirer
  .prompt(options)
  .then((answers) => {
    const v = answers.version
    async function task() {
      await execa('npm', ['version', `${v}`, '--no-git-tag-version'], { stdio: 'inherit' })
      // 提交代码
      await execa('git', ['add', '-A'], { stdio: 'inherit' })
      await execa(
        'git',
        ['commit', '-m', `build version: v${v}`],
        { stdio: 'inherit' },
      )
      await execa('git', ['tag', '-a', `v${v}`, '-m', `build version: ${v}`])
      await execa('git', ['push', 'origin', 'main'], { stdio: 'inherit' })
      await execa('npm', ['publish'], { stdio: 'inherit' })
    }
    task()
  })
