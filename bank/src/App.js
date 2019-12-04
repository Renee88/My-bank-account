import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Transactions from './components/Transactions';
import Operations from './components/Operations';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import axios from 'axios'
import Breakdown from './components/Breakdown';
import moment from 'moment'
import MonthlyBreakdown from './components/MonthlyBreakdown'
import Home from './components/Home';


class App extends Component {
  constructor() {
    super()
    this.state = {
      transactions: [],

      newTransaction: {
        amount: "",
        vendor: "",
        category: "",
        date: ""
      },
      balance: [],
      updated: false,
      monthlyBalance: []
    }
  }

  balance = () => {
    let balance = 0
    this.state.transactions.forEach(t => balance += t.amount)
    return balance
  }

  withdraw = async (amount, vendor, category, date) => {
    let transaction = { amount: -parseInt(amount), vendor: vendor, category: category, date: date }
    let transactions = await axios.post('http://localhost:1309/transactions', { transaction })
    debugger
    transactions = transactions.data.map(t => {
      return {
        _id: t._id,
        amount: t.amount,
        vendor: t.vendor,
        category: t.category,
        date: moment(t.date).format("MMM Do YY")
      }
    })
    let updated = this.state.updated
    transactions.length ? updated = true : updated = false
    this.setState({ transactions: transactions, updated: updated })
  }

  deposit = async (amount, vendor, category, date) => {
    let transaction = { amount: parseInt(amount), vendor: vendor, category: category, date: date }
    let transactions = await axios.post('http://localhost:1309/transactions', { transaction })
    transactions = transactions.data.map(t => {
      return {
        _id: t._id,
        amount: t.amount,
        vendor: t.vendor,
        category: t.category,
        date: moment(t.date).format("MMM Do YY")
      }
    })
    let updated = this.state.updated
    transactions.length ? updated = true : updated = false
    this.setState({ transactions: transactions, updated: updated })
  }

  updateNewTransaction = (e) => {
    let value = e.target.value
    let name = e.target.name
    let newTransaction = this.state.newTransaction
    newTransaction[name] = value
    this.setState({ newTransaction })
  }



  removeTransaction = async (id) => {
    let transactions = await axios.delete('http://localhost:1309/transactions', { data: { id: id } })
    transactions = transactions.data.map(t => {
      return {
        _id: t._id,
        amount: t.amount,
        vendor: t.vendor,
        category: t.category,
        date: moment(t.date).format("MMM Do YY")
      }
    })
    this.setState({ transactions: transactions })
  }


  async updateTransactions() {
    return await axios.get('http://localhost:1309/transactions')
  }

  breakdown = async () => {
    let groupedTransactions = await axios.get('http://localhost:1309/breakdown')
    this.setState({ balance: groupedTransactions.data })
  }


  updateDate = (date) => {
    const newTransaction = this.state.newTransaction
    newTransaction['date'] = date
    this.setState({ newTransaction })
  }

  groupByMonth = async(month) =>{
    let transactions = [...this.state.transactions]
    console.log(transactions)
    let monthlyBalance = transactions.filter(t=> t.date.includes(month))
    this.setState({monthlyBalance: monthlyBalance})
  }

  async componentDidMount() {
    let transactions = await this.updateTransactions()
    this.setState({ transactions: transactions.data })
  }

  render() {

    return (this.state.transactions ?
      <Router>

        <div id="main-container">
          <div id="links-container">
            <div id="show-transactions-link" className="link"><Link to='/transactions' >Watch Transactions</Link></div>
            <div id="operations-link" className="link"><Link to='/operations'>Add Expenses</Link></div>
            <div id="breakdown-link" className="link" ><Link to='/breakdown' onClick={this.breakdown}>Expenses Breakdown</Link></div>
          </div>
          <Home />
          <div id="sum">Total: {this.balance()}</div>
          <Route exact path='/transactions' render={() => <Transactions transData={this.state.transactions} removeTransaction={this.removeTransaction} />} />
          <Route exact path='/operations' render={() => <Operations withdraw={this.withdraw} deposit={this.deposit}
            updateNewTransaction={this.updateNewTransaction} updateDate={this.updateDate}
            newTransaction={this.state.newTransaction} didUpdate={this.state.updated} />} />
          <Route exact path='/breakdown' render={(match) => <Breakdown groupByMonth = {this.groupByMonth} balance={this.state.balance} />} />
          <Route exact path = '/breakdown/:month' render = {({match}) =><MonthlyBreakdown monthlyBalance = {this.state.monthlyBalance} groupByMonth = {this.groupByMonth} match = {match} balance={this.state.balance} />} />
        </div>
      </Router>
      : null)
  }
}


export default App;
