import React, { Component } from 'react';
import Transaction from './Transaction'

class Transactions extends Component {

    render() {
        console.log(this.props.transData)
        return (
            this.props.transData.length ? <div id="transactions">
                <div className="transaction title"><div>Date</div><div>Vendor</div> <div>Group</div><div>{'Amount($)'}</div></div>
                {this.props.transData.map(t => <Transaction key={t._id} singleTransData={t} id={t._id} removeTransaction={this.props.removeTransaction} />)}
            </div> : null
        );
    }
}

export default Transactions;