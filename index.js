'use strict'

const mongoose = require ('mongoose')

// Customer Schema
const Customer = require('./models/customer')

mongoose.connect('mongodb://localhost:27017/customerDB', { useNewUrlParser: true, useUnifiedTopology: true})

// Add customer
const addCustomer = (customer) => {
    Customer.create(customer)
        .then(() => {
            console.info('New Customer added. ')
            mongoose.connection.close()
        })
        .catch((err) => {
            console.info('An error occured: ', err)
        })
}

// Find customer
const findCustomer = (name) => {
    // Make the input case insensitive
    const search = new RegExp(name, 'i')
    Customer.find({$or: [{firstname: search}, {lastname: search}]})
        .then((customers) => {
            console.info(customers)
            console.info(`${customers.length} matches. `)
            mongoose.connection.close()
        })
        .catch((err) => {
            console.info('An error occured: ', err)
        })
}

// Update a customer
const updateCustomer = (id, customer) => {
    Customer.updateOne({_id: id}, customer)
        .then(() => {
            console.info ('Customer updated. ')
            mongoose.connection.close()
        })
        .catch(err => console.info('An error occured: ', err))
}

// Remove a customer
const removeCustomer = (id) => {
    Customer.deleteOne({_id: id})
        .then(() => {
            console.info ('Customer removed. ')
            mongoose.connection.close()
        })
        .catch(err => console.info('An error occured: ', err))  
}

// List all customers
const listCustomer = () => {
    Customer.find()
        .then(customers => {
            console.info(customers)
            console.info(`${customers.length} customers. `)
            mongoose.connection.close()
        })
        .catch(err => console.info('An error occured: ', err))
}

module.exports = {
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCustomer
}