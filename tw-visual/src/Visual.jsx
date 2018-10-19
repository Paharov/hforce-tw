import testStream from './TestStream'
import React, { Component } from 'react';

class Visual extends Component {
    constructor(props) {
        super(props);
        this.state = {
            streamGen: testStream(),
            current: null
        }
    }


    componentDidMount() {
        setInterval(() => {
            this.setState( {
                current: this.state.streamGen.next().value            
            })
        }, 1000)
    }

    render() {
      return (
        <h1>{this.state.current ? this.state.current.src_currency : "test"}</h1>
      );
    }
  }
  
export default Visual;