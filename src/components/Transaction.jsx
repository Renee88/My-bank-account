import React, { Component } from 'react';
import moment from 'moment';

class Transaction extends Component {
    removeTransaction = () =>{
        this.props.removeTransaction(this.props.id)
    }

    firstToUpperCase = (word) =>{
        return this.props.firstToUpperCase(word)
    }

    render() {
        let transaction = this.props.singleTransData
        transaction.date = moment(transaction.date).format('L')
        return (
             <tr className={transaction.amount >= 0 ? "transaction deposit": "transaction withdraw"} > 
                <td className = "date data">{transaction.date}</td>
                <td className = "vendor data">{transaction.vendor}</td>
                <td className = "category data">{this.firstToUpperCase(transaction.category)}</td>
                <td className = "amount data">{transaction.amount}</td>
                <td className = "delete data" onClick = {this.removeTransaction}><i className="fas fa-trash-alt"></i></td>
            </tr>
        );
    }
}

export default Transaction;