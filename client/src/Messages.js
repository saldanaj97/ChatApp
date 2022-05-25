import React, { Component } from 'react';
import './App.css';

class Messages extends Component {
    constructor(props) {
        super(props)
        this.resFromServer = ''
        this.getResponse = this.getResponse.bind(this)
    }

    componentDidMount() {
        fetch('http://localhost:3000/')
            .then(response => response.text())
            .then(res => this.resFromServer = res)
            .catch(error => console.log(error))
    }

    getResponse() {
        console.log(this.resFromServer)
        return this.resFromServer
    }

    render() {
        return (
            <div>
                <ul id="messages"></ul>
                <form id="form" action="">
                    <input id="input" /><button>Send</button>
                </form>
            </div>
        )
    }

}

export default Messages;