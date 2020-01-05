import React, { Component } from 'react'
import MonthlyBreakdown from './MonthlyBreakdown'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import LeftDrawer from './LeftDrawer';

class Home extends Component {


    render() {

        return (
            <div id="nav">
                <LeftDrawer breakdown = {this.props.breakdown}/>
                    <div id="links-container">
                        <div id="show-transactions-link" className="link"><Link to='/transactions' >Watch Transactions</Link></div>
                        <div id="operations-link" className="link"><Link to='/operations'>Add Expenses</Link></div>
                        <div id="breakdown-link" className="link" ><Link to='/breakdown' onClick={this.props.breakdown}>Expenses Breakdown</Link></div>
                    </div>
            </div>
        );
    }
}

export default Home;