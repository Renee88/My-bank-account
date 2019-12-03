const express = require('express')
const router = express.Router()
const Transaction = require('../model/Transection')

router.post('/transactions', function(req,res){
    console.log(req.body.transaction)
    const transaction = new Transaction(req.body.transaction)
    transaction.save(function(){
        Transaction.find({},function(err,transactions){
            res.send(transactions)
        })
    })
})

router.get('/transactions', function(req,res){
    Transaction.find({}, function(err,transactions){
        res.send(transactions)
    })
})

router.delete('/transactions', function(req,res){
    let id = req.body.id
    Transaction.findOneAndDelete({_id: id}, function(){
        Transaction.find({},function(err,transactions){
            res.send(transactions)
        })
    })
})

router.get('/breakdown', function(req,res){
    Transaction.aggregate([
        { $group: { _id: "$category" , amount: { $sum: "$amount" }}}
    ], function(err,transactions){
        res.send(transactions)
    })
})


module.exports = router