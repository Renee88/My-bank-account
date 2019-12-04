import React, { Component } from 'react';

class MonthlyBreakdown extends Component {

    groupByMonth = () =>{
        let month = this.props.match.params.month
        this.props.groupByMonth(month)
    }

    render() {
        let monthlyBalance = this.props.monthlyBalance
        return (
            <div id = "monthly-breakdown">
                <div className = "month-name">{this.props.match.params.month}</div>
                <div className = "group title"><div>Group</div> <div>Total</div></div>
                {monthlyBalance.map(t => {
                    return <div className={t.amount > 0 ? "group positive": "group negative"}>
                        <div className={t._id}>{t._id}</div>
                        <div className="total-per-group">{t.amount}</div>
                    </div>
                })}
            </div>
        );
    }
}

export default MonthlyBreakdown;