import React, { Component } from 'react';
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
      length: 0,
      updated: false,
      monthlyBalance: []
    }
  }

  balance = () => {
    let balance = 0
    this.state.transactions.forEach(t => balance += t.amount)
    return balance
  }

  setUpdated(transactions){
    let updated 
    let length = this.state.length
    return transactions.length != length ? updated = true : updated = false
  }

  retrieveTransactionsFromDB(transactions){
    return transactions.data.map(t => {
      return {
        _id: t._id,
        amount: t.amount,
        vendor: t.vendor,
        category: t.category,
        date: moment(t.date).format("MMM Do YY")
      }
    })
  }

  
  withdraw = async (amount, vendor, category, date) => {
    let transaction = { amount: -parseInt(amount), vendor: vendor, category: category.toLowerCase(), date: date }
    let transactions = await axios.post('http://localhost:1309/transactions', { transaction })
    transactions = this.retrieveTransactionsFromDB(transactions)
    
    let updated = this.setUpdated(transactions)
    
    updated ? 
    this.setState({ transactions: transactions, updated: updated,length: this.state.length++ })
    : this.setState({ updated: updated })
  }


  deposit = async (amount, vendor, category, date) => {
    let transaction = { amount: parseInt(amount), vendor: vendor, category: category.toLowerCase(), date: date }
    let transactions = await axios.post('http://localhost:1309/transactions', { transaction })
    transactions = this.retrieveTransactionsFromDB(transactions)
    
    let updated = this.setUpdated(transactions)
    
    updated ? 
    this.setState({ transactions: transactions, updated, length: this.state.length++ })
    : this.setState({ updated})
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

  firstToUpperCase = (word) => {
    return word ? word[0].toUpperCase() + word.slice(1).toLowerCase() : null
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


  async componentDidMount() {
    let transactions = await this.updateTransactions()
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

  render() {

    return (this.state.transactions ?
      <Router>
        <div id="main-container">

          <Route path='/' render={() => <Home transactions={this.state.transactions} groupByMonth={this.groupByMonth} breakdown={this.breakdown} />} />
          <div id="sum">Total: {this.balance()}$</div>

          <Route exact path='/transactions' render={() => <Transactions transData={this.state.transactions} removeTransaction={this.removeTransaction} firstToUpperCase = {this.firstToUpperCase} />} />
          <Route exact path='/operations' render={() => <Operations withdraw={this.withdraw} deposit={this.deposit} balance = {this.balance()}
            updateNewTransaction={this.updateNewTransaction} updateDate={this.updateDate}
            newTransaction={this.state.newTransaction} didUpdate={this.state.updated} />} />
          <Route path='/breakdown' render={() => <Breakdown  firstToUpperCase = {this.firstToUpperCase} transactions={this.state.transactions} balance={this.state.balance} />} />
          <Route exact path='/breakdown/:month' render={({ match }) => <MonthlyBreakdown  firstToUpperCase = {this.firstToUpperCase} transactions={this.state.transactions} match={match} />} />
        </div>
      </Router>
      : null)
  }
}


export default App;
