import React, { Component } from 'react';
import moment from 'moment';

class Transaction extends Component {
    removeTransaction = () => {
        this.props.removeTransaction(this.props.id)
    }

    firstToUpperCase = (word) => {
        return this.props.firstToUpperCase(word)
    }

    render() {
        let transaction = this.props.singleTransData
        transaction.date = moment(transaction.date).format('L')
        return (
            <div className={transaction.amount >= 0 ? "transaction deposit" : "transaction withdraw"} >
                <div className="left">
                    <div className="amount">{transaction.amount}$</div>
                </div>
                <div className="middle">
                    <div className="vendor data">{transaction.vendor}</div>
                    <div className="category data">{this.firstToUpperCase(transaction.category)}</div>
                </div>
                <div className="right">
                    <div className="date data">{transaction.date}</div>
                    <div className="delete data" onClick={this.removeTransaction}><i className="fas fa-trash-alt"></i></div>
                </div>
            </div>
        );
    }
}

export default Transaction;