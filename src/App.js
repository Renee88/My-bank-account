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
import Landing from './components/Landing';
import SelectMonth from './components/SelectMonth';



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
      monthlyBalance: [],
      year: new Date().getFullYear()
    }
  }

  balance = (transactions) => {
    let balance = 0
    transactions.forEach(t => balance += t.amount)
    return balance
  }


  retrieveTransactionsFromDB(transactions) {
    return transactions.data.map(t => {
      return {
        _id: t._id,
        amount: t.amount,
        vendor: t.vendor,
        category: t.category,
        date: moment(t.date).format("L")
      }
    })
  }

  clearForm = (newTransaction) => {
    for (let input of document.getElementsByTagName("INPUT")) {
      input.value = ""
      newTransaction[input.name] = input.value
    }
  }


  isUpdated = async (newTransaction, newBalance) => {
    let transactions
    let updated
    try {
      if (newTransaction.amount && newTransaction.vendor && newTransaction.category) {
        try {
          if (newBalance > -500) {
            try {
              transactions = await axios.post('http://localhost:1309/transactions', { newTransaction })
              transactions = transactions.data
              this.clearForm(newTransaction)
              updated = true
              this.setState({ transactions, newTransaction, updated })
            } catch (error) {
              if(error.request || error.response){
                debugger
                updated = '404'
                this.setState({ updated })
              }
            }
          } else {
            throw new Error('You Passed the allowed limit for withdrawal')
          }
        } catch (err) {
          updated = '418'
          this.setState({ updated })
        }
      } 
      else if (!newTransaction.amount || !newTransaction.vendor || !newTransaction.category) {
        throw new Error('Please fill in the required fields')
      }
    } catch (err) {
      updated = '400'
      this.setState({ updated })
    }
  }


  withdraw = async (newTransaction) => {
    newTransaction.amount = newTransaction.amount !== "" ? -parseInt(newTransaction.amount) : undefined
    newTransaction.vendor = newTransaction.vendor !== "" ? newTransaction.vendor : undefined
    newTransaction.category = newTransaction.category !== "" ? newTransaction.category : undefined
    let newBalance = this.balance(this.state.transactions) + newTransaction.amount
    await this.isUpdated(newTransaction, newBalance)
  }

  deposit = async (newTransaction) => {
    newTransaction.amount = newTransaction.amount !== "" ? parseInt(newTransaction.amount) : undefined
    newTransaction.vendor = newTransaction.vendor !== "" ? newTransaction.vendor : undefined
    newTransaction.category = newTransaction.category !== "" ? newTransaction.category : undefined
    let newBalance = this.balance(this.state.transactions) + newTransaction.amount
    await this.isUpdated(newTransaction, newBalance)
  }

  updateNewTransaction = (e) => {
    let value = e.target.value
    let name = e.target.name
    let newTransaction = this.state.newTransaction
    newTransaction[name] = value
    this.setState({ newTransaction })
  }

  resetUpdated = () =>{
    this.setState({updated: false})
  }

  removeTransaction = async (id) => {
    let transactions = await axios.delete('http://localhost:1309/transactions', { data: { id: id } })
    transactions = transactions.data.map(t => {
      return {
        _id: t._id,
        amount: t.amount,
        vendor: t.vendor,
        category: t.category,
        date: moment(t.date).format('L')
      }
    })
    this.setState({ transactions })
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

  changeYear = (chosenYear) => {
    let year = chosenYear
    this.setState({year})
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
        date: moment(t.date).format("L")
      }
    })
    this.setState({ transactions })
  }

  render() {

    return (this.state.transactions ?
      <Router>
        <Route exact path = '/' render ={()=> <Landing />} />
        <Route path='/' render={() => <Home breakdown={this.breakdown} />} />
        <div id="main-container">
          <div id="sum"><div>Balance</div><div id="num">{this.balance(this.state.transactions)}$</div></div>

          <Route exact path='/transactions' render={() => <Transactions transData={this.state.transactions} removeTransaction={this.removeTransaction} firstToUpperCase={this.firstToUpperCase} />} />
          <Route exact path='/operations' render={() => <Operations withdraw={this.withdraw} deposit={this.deposit}
            updateNewTransaction={this.updateNewTransaction} updateDate={this.updateDate}
            newTransaction={this.state.newTransaction} didUpdate={this.state.updated} resetUpdated = {this.resetUpdated}/>} />
          <Route path='/breakdown' render={() => <SelectMonth />} />
          <Route exact path='/breakdown/:month/:year' render={({ match }) => <MonthlyBreakdown firstToUpperCase={this.firstToUpperCase} transactions={this.state.transactions} match={match} />} />
        </div>
      </Router>
      : null)
  }
}


export default App;