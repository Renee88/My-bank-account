import React, { Component } from 'react';
import Transaction from './Transaction'

class Transactions extends Component {

    render() {
        console.log(this.props.transData)
        return (
            this.props.transData.length ? <div id="transactions">
                <table>
                <tr className="transaction title"><th className = "title-col">Date</th><th className ="title-col">Vendor</th> <th className = "title-col">Group</th> <th className = "title-col">{'Amount($)'}</th></tr>
                {this.props.transData.map(t => <Transaction key={t._id} singleTransData={t} id={t._id} firstToUpperCase = {this.props.firstToUpperCase} removeTransaction={this.props.removeTransaction} />)}
                </table>
            </div> : <p className = "nothing-to-display">No transactions to display</p>
        );
    }
}

export default Transactions;