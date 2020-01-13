import React, { Component } from 'react';
import DatePickerDialog from './DatePickerDialog';
import Snackbars from './Snackbars'



function Operations(props) {


    const withdraw = () => {
        props.withdraw(props.newTransaction)
    }

    const deposit = () => {
        props.deposit(props.newTransaction)
    }

    const updateNewTransaction = (e) => {
        props.updateNewTransaction(e)
    }


    return (
        <div id="new-expense">
            <div id="inputs">
                <input type="text" name="amount" placeholder="Insert amount" onChange={updateNewTransaction}></input>
                <input type="text" name="vendor"  placeholder="Insert vendor" onChange={updateNewTransaction}></input>
                <input type="text" name="category" placeholder="Insert category" onChange={updateNewTransaction}></input>
            </div>

            <span id ="date"><DatePickerDialog updateDate={props.updateDate} /></span>

            <Snackbars deposit = {deposit} withdraw ={withdraw} didUpdate = {props.didUpdate} resetUpdated = {props.resetUpdated}/>
        </div>
    );

}

export default Operations;