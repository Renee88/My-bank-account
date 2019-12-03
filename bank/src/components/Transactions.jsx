import React, { Component } from 'react';
import Transaction from './Transaction'

class Transactions extends Component {

    render() {
        console.log(this.props.transData)
        return (
            <div id="transactions">
                <div className = "transaction title"><div>Date</div><div>{'Amount($)'}</div> <div>Vendor</div> <div>Group</div></div>
                {this.props.transData.map(t => <Transaction key = {t._id}  singleTransData={t} id={t._id} removeTransaction={this.props.removeTransaction} />)}
            </div>
        );
    }
}

export default Transactions;