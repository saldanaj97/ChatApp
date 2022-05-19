import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      resFromServer: null
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/')
      .then(response => response.text())
      .then(res => console.log(res))
      .catch(error => console.log(error))
  }

  render() {
    return (this.resFromServer)
  }

}

export default App;
