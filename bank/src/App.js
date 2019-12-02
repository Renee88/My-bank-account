import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Transactions from './components/Transactions';
import Operations from './components/Operations';
import axios from 'axios'

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
        category: ""
      }

    }
  }

  balance = () => {
    let balance = 0
    console.log(this.state)
    this.state.transactions.forEach(t => balance += t.amount)
    return balance
  }

  withdraw = async(amount, vendor, category) => {
    let transaction = { amount: (-amount), vendor: vendor, category: category }
      let transactions = await axios.post('http://localhost:1309/transactions', {data:{transaction}})
      this.setState({ transactions: transactions.data })
    
  }

  deposit = async(amount, vendor, category) => {
    let newTransaction = { amount: amount, vendor: vendor, category: category }
      let transactions = await axios.post('http://localhost:1309/transactions', {transaction: newTransaction})
      this.setState({ transactions: transactions.data })
  }

   updateNewTransection = async(e) => {
    let value = e.target.value
    let name = e.target.name
    let newTransaction = this.state.newTransaction
    newTransaction[name] = value
    this.setState({newTransaction})
  }



   removeTransaction = async(id) =>{
    let transactions = await axios.delete('http://localhost:1309/transactions', {data:{id:id}} )
    this.setState({transactions: transactions.data})
  }
    

  async updateTransections() {
    return axios.get('http://localhost:1309/transactions')
  }


  async componentDidMount() {
    let transactions = await this.updateTransections()
    this.setState({ transactions: transactions.data })
  }


  render() {

    return (this.state.transactions ? 
      <div id="main-container">
        <div id="sum">Total amount: {this.balance()}</div>
        <div id="new-transaction-details">
          <div id="inputs">
            <input type="text" name="amount" placeholder="insert amount" onChange={this.updateNewTransection}></input>
            <input type="text" name="vendor" placeholder="insert vendor" onChange={this.updateNewTransection}></input>
            <input type="text" name="category" placeholder="insert category" onChange={this.updateNewTransection}></input>
          </div>
          <Operations withdraw={this.withdraw} deposit={this.deposit} amount={this.state.newTransaction.amount} vendor={this.state.newTransaction.vendor} category={this.state.newTransaction.category} />
        </div>

        <Transactions transData={this.state.transactions} removeTransaction={this.removeTransaction} />
      </div>
    : null) 
  }
}


export default App;
