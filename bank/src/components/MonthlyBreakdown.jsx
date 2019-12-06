import React, { Component } from 'react';

class MonthlyBreakdown extends Component {

    firstToUpperCase(word){
        return this.props.firstToUpperCase(word)
    }

    render() {
        let month = this.props.match.params.month
        let transactions = this.props.transactions
        let monthlyBalance = transactions.filter(t => t.date.includes(month))
        let groupedBalance = {}
        monthlyBalance.map(t => groupedBalance[t.category] ? groupedBalance[t.category] += t.amount:groupedBalance[t.category] = t.amount)
        let categories = Object.keys(groupedBalance)
       
        return (
            <div id="monthly-breakdown">
               {categories.length? <div className="month-name">{this.props.match.params.month}</div>:null}
                 <div id = "monthlyBreak-title"className="group title"><div>Group</div> <div>Total</div></div>
                {categories.map(c => {
                    return <div className={groupedBalance[c] > 0 ? "group positive grouped-trans" : "group negative grouped-trans"}>
                        <div className={c}>{this.firstToUpperCase(c)}</div>
                        <div className="total-per-group">{groupedBalance[c]}</div>
                    </div>
                })}
            </div> 
            
        );
    }
}

export default MonthlyBreakdown;