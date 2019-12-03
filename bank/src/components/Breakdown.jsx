import React, { Component } from 'react';

class Breakdown extends Component {
    render() {
        return (
            <div id = "breakdown" >
                <div className = "group title"><div>Total</div> <div>Group</div></div>
                {this.props.balance.map(g => {
                    return <div className={g.amount > 0 ? "group positive": "group negative"}>
                        <div className={g._id}>{g._id}</div>
                        <div className="total-per-group">{g.amount}</div>
                    </div>
                })}
            </div>
        )
    }
}

export default Breakdown;