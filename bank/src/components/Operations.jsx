import React, { Component } from 'react';
import DatePickerDialog from './DatePickerDialog';
import Snackbars from './Snackbars';

class Operations extends Component {
    
    withdraw = () => {
        let newTransaction = this.props.newTransaction
        this.props.withdraw(newTransaction.amount, newTransaction.vendor, newTransaction.category, newTransaction.date)
    }

    deposit = () => {
        let newTransaction = this.props.newTransaction
        this.props.deposit(newTransaction.amount, newTransaction.vendor, newTransaction.category,newTransaction.date)
    }

    updateNewTransaction = (e) => {
        this.props.updateNewTransaction(e)
    }

    render() {
        return (
            <div id="new-expense">
                <div id="inputs">
                    <input type="text" name="amount" placeholder="Insert amount" onChange={this.updateNewTransaction}></input>
                    <input type="text" name="vendor" placeholder="Insert vendor" onChange={this.updateNewTransaction}></input>
                    <input type="text" name="category" placeholder="Insert category" onChange={this.updateNewTransaction}></input>
                </div>
                    <Snackbars withdraw = {this.withdraw} deposit = {this.deposit} didUpdate = {this.props.didUpdate}/>
                    <div id="date"><DatePickerDialog updateDate={this.props.updateDate} /></div>
                </div>
                );
            }
        }
        
export default Operations;