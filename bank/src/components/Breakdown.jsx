import React, { Component } from 'react';
import moment from 'moment'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import SelectMonth from './SelectMonth';

class Breakdown extends Component {

    render() {
        let transactions = this.props.transactions
        let groups = Object.keys(this.props.balance)
        return (
            <div id="breakdown-container">
                <SelectMonth />
                <div id="breakdown" >
                    <div className="group title"><div>Group</div> <div>Total</div></div>
                    {this.props.balance.map(g => {
                        return <div className={g.amount > 0 ? "group positive transaction" : "group negative transaction"}>
                            <div className={g._id}>{g._id}</div>
                            <div className="total-per-group">{g.amount}</div>
                            <div id = "modal-container">
                            {transactions.filter(t=> t.category === g._id).map(t=><div className = "modal">{t.date} {t.vendor} {t.category} {t.amount}</div>)}
                            </div>
                        </div>
                    })}
                    {/* <div className = "modal-container">
                    {transactions.map(t => {
                            return <div className="modal">{t.date} {t.vendor} {t.category} {t.amount}</div>
                    })}
                    </div> */}
                </div>
            </div>

        )
    }
}

export default Breakdown;