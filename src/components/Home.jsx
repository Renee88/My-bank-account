import React, { Component } from 'react'
import MonthlyBreakdown from './MonthlyBreakdown'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import LeftDrawer from './LeftDrawer';

class Home extends Component {


    render() {

        return (
            <div id="nav">
                <LeftDrawer breakdown = {this.props.breakdown}/>
            </div>
        );
    }
}

export default Home;