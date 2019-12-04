import React, { Component } from 'react';
import moment from 'moment'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


class SelectMonth extends Component {

    render() {
        let months = moment.monthsShort()
        return (
            <div id="drop-down-menu">
                    <div id="placeholder" className="link">Select a month</div>
                    <div className="months">
                        {months.map(m => <Link to={`/breakdown/${m}`} ><div id ={m} >{m}</div></ Link>)}
                    </div>
                </div>
        );
    }
}

export default SelectMonth;