import React, { Component } from 'react';
import moment from 'moment'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import SelectMonth from './SelectMonth';

class Breakdown extends Component {

    firstToUpperCase(word) {
        return this.props.firstToUpperCase(word)
    }

    componentDidMount(){
        this.props.breakdown()
    }

    render() {
        let transactions = this.props.transactions
        return (
            <div id="breakdown-container">
                <SelectMonth />
                {transactions.length ?
                    <div id="breakdown" >
                        
                            {this.props.balance.map(g => {
                                return (
                                    <div className={g.amount > 0 ? "group positive transaction" : "group negative transaction"}>
                                        <div className={g._id}>{this.firstToUpperCase(g._id)}</div>
                                        <div className="total-per-group">{g.amount}$</div>
                                    </div>
                                )
                            })}
                        
                        <div className="modal-container">
                            {this.props.balance.map(g => {
                                return(
                                transactions.filter(t => t.category === g._id).map(t => {
                                    return <table className="modal">
                                        <tr>
                                            <th>Date</th>
                                            <th>Vendor</th>
                                            <th>Category</th>
                                            <th>{'Amount($)'}</th>
                                        </tr>
                                        <tr>
                                            <td>{t.date}</td>
                                            <td>{t.vendor}</td>
                                            <td>{this.firstToUpperCase(t.category)}</td>
                                            <td>{t.amount}</td>
                                        </tr>
                                    </table>
                                })
                            )})}
                            }
            
                                    </div>
                    </div> : <p className="nothing-to-display">No transactions to display</p>}
            </div>

        )
    }
}

export default Breakdown;