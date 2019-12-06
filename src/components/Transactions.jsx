import React, { Component } from 'react';
import Transaction from './Transaction'

class Transactions extends Component {

    render() {
        console.log(this.props.transData)
        return (
            this.props.transData.length ? <div id="transactions">
                <div className="transaction title"><div>Date</div><div>Vendor</div> <div>Group</div><div>{'Amount($)'}</div></div>
                {this.props.transData.map(t => <Transaction key={t._id} singleTransData={t} id={t._id} firstToUpperCase = {this.props.firstToUpperCase} removeTransaction={this.props.removeTransaction} />)}
            </div> : <p className = "nothing-to-display">No transactions to display</p>
        );
    }
}

export default Transactions;