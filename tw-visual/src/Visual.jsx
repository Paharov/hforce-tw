import {testStream, currencies, countries} from './TestStream'
import React, { Component } from 'react';
import Force from './Force'
import NavBar from './NavBar'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 5,
      paddingBottom: theme.spacing.unit * 5,
    },
});
  

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
        const { classes } = this.props;
        return (
            <React.Fragment>
                <NavBar/>
                <Paper className={classes.root} elevation={1}>
                    <Force {...this.state}/>
                    {/* {"Visual goes here"} */}
                </Paper>
            </React.Fragment>
        );
    }
}

Visual.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Visual);