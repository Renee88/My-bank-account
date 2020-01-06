import React, { Component } from 'react';
import moment from 'moment';

class MonthlyBreakdown extends Component {

    firstToUpperCase(word) {
        return this.props.firstToUpperCase(word)
    }

    render() {
        let month = this.props.match.params.month
        const months = moment.months()
        const monthNum = months.indexOf(month) + 1 < 10 ? "0" + (months.indexOf(month) + 1) : months.indexOf(month) + 1
        let transactions = this.props.transactions

        let monthlyBalance = transactions.filter(t => t.date.slice(0, 2) == monthNum)
        let groupedBalance = {}
        monthlyBalance.forEach(t => groupedBalance[t.category] ? groupedBalance[t.category] += t.amount : groupedBalance[t.category] = t.amount)
        let categories = Object.keys(groupedBalance)

        return (categories.length ?
            <div id="monthly-breakdown">
                <div className="month-name">{this.props.match.params.month}</div>
                <div id="monthly-breakdown-table">
                    {categories.map(c => {
                        return <div className={groupedBalance[c] > 0 ? "positive grouped-trans" : "negative grouped-trans"}>
                            <div className="group">{this.firstToUpperCase(c)}</div>
                            <div className="total-per-group">{groupedBalance[c]}$</div>
                        </div>
                    })}
                </div>
            </div>

            : <div className="no-transactions">{`No transactions made in ${this.props.match.params.month}`}</div>
        );
    }
}

export default MonthlyBreakdown;