import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Transactions from './components/Transactions';
import Operations from './components/Operations';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import axios from 'axios'
import Breakdown from './components/Breakdown';
import DatePickerDialog from './components/DatePickerDialog';


class App extends Component {
  constructor() {
    super()
    this.state = {
      transactions: [
        { amount: 3200, vendor: "Elevation", category: "Salary" },
        { amount: -7, vendor: "Runescape", category: "Entertainment" },
        { amount: -20, vendor: "Subway", category: "Food" },
        { amount: -98, vendor: "La Baguetterie", category: "Food" }
      ],

      newTransaction: {
        amount: "",
        vendor: "",
        category: "",
        date: ""
      },
      balance: []

    }
  }

  balance = () => {
    let balance = 0
    this.state.transactions.forEach(t => balance += t.amount)
    return balance
  }

  withdraw = async (amount, vendor, category) => {
    let transaction = { amount: -parseInt(amount), vendor: vendor, category: category }
    let transactions = await axios.post('http://localhost:1309/transactions', { transaction })
    this.setState({ transactions: transactions.data })

  }

  deposit = async (amount, vendor, category) => {
    let transaction = { amount: parseInt(amount), vendor: vendor, category: category }
    let transactions = await axios.post('http://localhost:1309/transactions', { transaction })
    this.setState({ transactions: transactions.data })
  }

  updateNewTransection = (e) => {
    let value = e.target.value
    let name = e.target.name
    let newTransaction = this.state.newTransaction
    newTransaction[name] = value
    this.setState({ newTransaction })
  }



  removeTransaction = async (id) => {
    let transactions = await axios.delete('http://localhost:1309/transactions', { data: { id: id } })
    this.setState({ transactions: transactions.data })
  }


  async updateTransections() {
    return axios.get('http://localhost:1309/transactions')
  }

  breakdown = async () => {
    let groupedTransactions = await axios.get('http://localhost:1309/breakdown')
    this.setState({ balance: groupedTransactions.data }, function () {
      console.log(this.state.balance)
    })
  }

  async componentDidMount() {
    let transactions = await this.updateTransections()
    this.setState({ transactions: transactions.data })
  }

  updateDate = (date)=>{
    const newTransaction = this.state.newTransaction
    newTransaction['date'] = date
    this.setState({ newTransaction })
  }


  render() {

    return (this.state.transactions ?
      <Router>

        <div id="main-container">
          <div id="links-container">
            <div id="show-transactions" className="link"><Link to='/transactions' >Watch Transactions</Link></div>
            <div id="operations link" className="link"><Link to='/operations'>Add Expenses</Link></div>
            <div id="breakdown link" className="link" ><Link to='/breakdown' onClick={this.breakdown}>Expenses Breakdown</Link></div>
          </div>
          <div id="sum">Total: {this.balance()}</div>
          <Route exact path='/transactions' render={() => <Transactions transData={this.state.transactions} removeTransaction={this.removeTransaction} />} />
          <Route exact path='/operations' render={() => <Operations withdraw={this.withdraw} deposit={this.deposit} 
          updateNewTransaction={this.updateNewTransection} updateDate = {this.updateDate}
            amount={this.state.newTransaction.amount} vendor={this.state.newTransaction.vendor} category={this.state.newTransaction.category} />} />
          <Route exact path='/breakdown' render={() => <Breakdown balance={this.state.balance} />} />
        </div>
      </Router>
      : null)
  }
}


export default App;
