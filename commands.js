#!/usr/bin/env node
'use strict'

const program = require('commander')
const { prompt } = require('inquirer')

const {addCustomer, findCustomer, updateCustomer, removeCustomer, listCustomer} = require('./index')

const questions = [
    {
        type: 'input',
        name: 'firstname',
        message: 'Customer first name '
    },
    {
        type: 'input',
        name: 'lastname',
        message: 'Customer last name '
    },
    {
        type: 'input',
        name: 'phone',
        message: 'Customer phone number '
    },
    {
        type: 'input',
        name: 'email',
        message: 'Customer email '
    },
]

program
    .version('1.0.0')
    .description('Client Management System.')

program
    .command('add')
    .alias ('a')
    .description('Add a customer')
    .action(() => {
        prompt(questions)
            .then(answers => addCustomer(answers))
            .catch(err => console.info('Error occured: ', err))
    })

program
    .command('find <name>')
    .alias('f')
    .description('Find a customer')
    .action((name) => {
        findCustomer(name)
    })

program
    .command('update <id>')
    .alias('u')
    .description('Update a customer')
    .action((id) => {
        prompt(questions)
            .then(answers => updateCustomer(id, answers))
            .catch(err => console.info('Error occured: ', err))
    })

program
    .command('remove <id>')
    .alias('r')
    .description('Remove a customer')
    .action(id => removeCustomer(id))

program
    .command('list')
    .alias('l')
    .description('List all customer')
    .action(() => listCustomer())

program.parse(process.argv);