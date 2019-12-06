const mongoose = require('mongoose')

const Schema = mongoose.Schema

const transactionSchma = new Schema({
    amount: Number,
    vendor: String,
    category: String,
    date: Date
})

const Transaction = mongoose.model('Transaction', transactionSchma)

module.exports = Transaction