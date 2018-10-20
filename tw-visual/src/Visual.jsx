import {testStream, currencies, countries} from './TestStream'
import React, { Component } from 'react';
import Force from './Force'
class Visual extends Component {

    constructor(props) {
        super(props);
        this.state = {
            streamGen: testStream(),
            currencies: currencies(),
            countries: countries(),
            current: null,
            interval: 1000
        }
    }

    getInterval = () => {
        return Math.floor(Math.random() * this.state.interval) + (this.state.interval / 0.5)
    }


    componentDidMount() {
        setInterval(() => {
            this.setState({
                current: this.state.streamGen.next().value
            })
        }, this.getInterval())
    }

    render() {
        return (
            <React.Fragment>
                <h1>{this.state.current ? this.state.current.recipient.first_name : ""}</h1>
                <Force {...this.state} width={500} height={500}/>
            </React.Fragment>
        );
    }
}

export default Visual;