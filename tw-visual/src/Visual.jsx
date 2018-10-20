import testStream from './TestStream'
import React, { Component } from 'react';

class Visual extends Component {


    constructor(props) {
        super(props);
        this.state = {
            streamGen: testStream(),
            current: null,
            interval: 1000
        }
    }

    getInterval = () => {
        return Math.floor(Math.random()* this.state.interval) + (this.state.interval / 0.5) 
    }

    componentDidMount() {
        setInterval(() => {
            this.setState( {
                current: this.state.streamGen.next().value            
            })
        }, this.getInterval())
    }

    render() {
      return (
        <h1>{this.state.current ? this.state.current.recipient.first_name : ""}</h1>
      );
    }
  }
  
export default Visual;