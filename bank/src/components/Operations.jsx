import React, { Component } from 'react';
import DatePickerDialog from './DatePickerDialog';

class Operations extends Component {

    withdraw = () => {
        this.props.withdraw(this.props.amount, this.props.vendor, this.props.category)
    }

    deposit = () => {
        this.props.deposit(this.props.amount, this.props.vendor, this.props.category)
    }

    updateNewTransection = (e) =>{
        this.props.updateNewTransaction(e)
    }

    render() {
        return (
            <div id="new-expense">
                <div id="inputs">
                    <input type="text" name="amount" placeholder="Insert amount" onChange={this.updateNewTransection}></input>
                    <input type="text" name="vendor" placeholder="Insert vendor" onChange={this.updateNewTransection}></input>
                    <input type="text" name="category" placeholder="Insert category" onChange={this.updateNewTransection}></input>
                </div>
                <div id="buttons">
                    <button id="withdraw" onClick={this.withdraw}>Withdraw</button>
                    <button id="deposit" onClick={this.deposit}>Deposit</button>
                </div>
                <div id ="date"><DatePickerDialog updateDate = {this.props.updateDate}/></div>
            </div>
        );
    }
}

export default Operations;