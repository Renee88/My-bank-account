import React, { Component } from 'react';
import moment from 'moment'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import SelectMonth from './SelectMonth';

class Breakdown extends Component {

    firstToUpperCase(word) {
        return this.props.firstToUpperCase(word)
    }

    render() {
        let transactions = this.props.transactions
        return (
            <div id="breakdown-container">
                <SelectMonth />
                {transactions.length ? <div id="breakdown" >
                    <div className="group title"><div>Group</div> <div>Total</div></div>
                    {this.props.balance.map(g => {
                        return <div className={g.amount > 0 ? "group positive transaction" : "group negative transaction"}>
                            <div className={g._id}>{this.firstToUpperCase(g._id)}</div>
                            <div className="total-per-group">{g.amount}</div>
                            <div className="modal-container">
                                {transactions.filter(t => t.category === g._id).map(t => {
                                    return <div className="modal">
                                        <span>{t.date}</span>
                                        <span>{t.vendor}</span>
                                        <span>{this.firstToUpperCase(t.category)}</span>
                                        <span>{t.amount}</span></div>
                                })}
                            </div>
                        </div>
                    })}
                </div> : null}
            </div>

        )
    }
}

export default Breakdown;