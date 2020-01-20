import React from 'react';
import moment from 'moment'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { DatePicker } from 'antd'
import ReactDOM from 'react-dom'
import { useEffect } from 'react';


const { MonthPicker, RangePicker, WeekPicker } = DatePicker


function SelectMonth(props) {

    let months = moment.months()
    
    async function getYear(date, dateString) {
        let newYear = dateString.slice(0, 4)
        let monthIndex = dateString.slice(-2) - 1
        let shortName = months[monthIndex]
        window.location.replace(`/breakdown/${shortName}/${newYear}`)
    }


    return (
        <div id="antd-datepicker-container" style={{ padding: "24px" }}>
            <MonthPicker dropdownClassName = "monthpicker" placeholder="Select month" onChange={getYear} />
        </div>

    );

}

export default SelectMonth;
