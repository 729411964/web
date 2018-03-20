#!/usr/bin/env node
'use strict'
const program = require('commander');
const inquirer = require("inquirer");
const chalk = require('chalk');
program.version(require('../package').version)
    .option('-c, --clone', 'use git clone')
    .usage('<command> [options]');

program
    .command('init')
    .description('Add a new template')
    // .alias('i')
    .action(function () {
        // console.log(program.clone);
        require("../command/command-init")();
    });
program.on('--help', () => {
    // 帮助说明
    // console.log('  Examples:')
    // console.log(chalk.gray('   xxxxx'))

});

program.parse(process.argv);
if(!program.args.length){
    program.help()
}