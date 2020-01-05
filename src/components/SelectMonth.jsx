import React, { Component } from 'react';
import moment from 'moment'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


class SelectMonth extends Component {

    render() {
        let months = moment.months()
        return (
            <div id="drop-down-menu">
                    <div id="placeholder" >Select a month <i className="fas fa-caret-down"></i></div>
                    <div className="months">
                        {months.map(m => <Link to={`/breakdown/${m}`} ><div id ={m} className = "month" >{m}</div></ Link>)}
                    </div>
                </div>
        );
    }
}

export default SelectMonth;