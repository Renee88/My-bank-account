import React, { Component } from 'react';
import DatePickerDialog from './DatePickerDialog';
import Snackbars from './Snackbars'
import { useState } from 'react';
import { useReducer } from 'react';
import { set } from 'mongoose';
import axios from 'axios'
import { useEffect } from 'react';



function Operations(props) {

    let [state, setState] = useReducer(
        (state, newState) => ({ ...state, ...newState }), {
        amount: "",
        vendor: "",
        category: "",
        date: "",
        updated: false,
        maxWithdrawal: ""
    }
    )


    const handleInput = function (e) {
        let name = e.target.name
        let value = e.target.value
        setState({ [name]: value })
    }


    const isUpdated = async function (newTransaction, newBalance) {
        let transactions
        let updated
        try {
            if (newTransaction.amount && newTransaction.vendor && newTransaction.category) {
                try {
                    if (newBalance > -500) {
                        try {

                            transactions = await axios.post('http://localhost:1309/transactions', { newTransaction })
                            transactions = transactions.data
                            updated = true
                            props.loadTransactions(transactions)
                            setState({ updated })

                        } catch (error) {

                            if (error.request || error.response) {
                                updated = '404'
                                setState({ updated })
                            }
                        }
                    } else {
                        throw new Error('You Passed the allowed limit for withdrawal')
                    }
                } catch (err) {
                    updated = '418'
                    // let maxWithdrawal = props.balance + 500
                    setState({ updated })
                }
            }
            else if (!newTransaction.amount || !newTransaction.vendor || !newTransaction.category) {
                throw new Error('Please fill in the required fields')
            }
        } catch (err) {
            updated = '400'
            setState({ updated })
        }
    }

    const resetInput = function () {
        setState({
            amount: "",
            vendor: "",
            category: "",
            date:"",
            updated: false
        })
    }


    const withdraw = function () {
        state.amount = state.amount !== "" ? -parseInt(state.amount) : undefined
        state.vendor = state.vendor !== "" ? state.vendor : undefined
        state.category = state.category !== "" ? state.category : undefined
        let maxWithdrawal = props.balance + 500
        setState({maxWithdrawal})
        let newBalance = props.balance + state.amount
        isUpdated(state, newBalance)
    }

    const deposit = function () {
        state.amount = state.amount !== "" ? parseInt(state.amount) : undefined
        state.vendor = state.vendor !== "" ? state.vendor : undefined
        state.category = state.category !== "" ? state.category : undefined
        let maxWithdrawal = props.balance + 500
        setState({maxWithdrawal})
        let newBalance = props.balance + state.amount
        isUpdated(state, newBalance)
    }

    const updateDate = function (date) {
        setState({ date })
    }


    console.log(state.maxWithdrawal)


    return (
        <div id="new-expense">
            <div id="inputs">
                <input type="text" name="amount" placeholder="Insert amount" onChange={handleInput}></input>
                <input type="text" name="vendor" placeholder="Insert vendor" onChange={handleInput}></input>
                <input type="text" name="category" placeholder="Insert category" onChange={handleInput}></input>
            </div>

            <span id="date"><DatePickerDialog updateDate={updateDate} /></span>

            <Snackbars deposit={deposit} withdraw={withdraw} didUpdate={state.updated} resetInput={resetInput} maxWithdrawal = {state.maxWithdrawal}/>
        </div>
    );

}

export default Operations;