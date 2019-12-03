import React, { Component } from 'react';

class Transaction extends Component {
    removeTransaction = () =>{
        this.props.removeTransaction(this.props.id)
    }

    render() {
        let transaction = this.props.singleTransData
        return (
             <div className={transaction.amount > 0 ? "transaction deposit": "transaction withdraw"} > 
                <div className = "amount data">{transaction.amount}</div>
                <div className = "vendor data">{transaction.vendor}</div>
                <div className = "category data">{transaction.category}</div>
                <div className = "delete data" onClick = {this.removeTransaction}>Delete</div>
            </div>
        );
    }
}

export default Transaction;