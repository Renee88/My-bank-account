import React, { Component } from 'react';

class Transaction extends Component {
    removeTransaction = () =>{
        this.props.removeTransaction(this.props.id)
    }

    firstToUpperCase = (word) =>{
        return this.props.firstToUpperCase(word)
    }

    render() {
        let transaction = this.props.singleTransData
        let vendor = transaction.vendor
        let category = transaction.category

        console.log(transaction)
        return (
             <div className={transaction.amount >= 0 ? "transaction deposit": "transaction withdraw"} > 
                <div className = "date data">{transaction.date}</div>
                <div className = "vendor data">{transaction.vendor}</div>
                <div className = "category data">{this.firstToUpperCase(transaction.category)}</div>
                <div className = "amount data">{transaction.amount}</div>
                <div className = "delete data" onClick = {this.removeTransaction}>Delete</div>
            </div>
        );
    }
}

export default Transaction;