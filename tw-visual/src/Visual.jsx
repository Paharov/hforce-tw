import { testStream, currencies, countries } from './TestStream'
import React, { Component } from 'react';
import Force from './Force'
import NavBar from './NavBar'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { SizeMe } from 'react-sizeme'

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 5,
        paddingBottom: theme.spacing.unit * 5,
    },
    force: {
        position: "relative"
    }
});


class Visual extends Component {

    constructor(props) {
        super(props);
        this.state = {
            streamGen: testStream(15),
            currencies: currencies(15),
            countries: countries(),
            current: null,
            interval: 600
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
                <NavBar />
                <div className={classes.force}>
                    <SizeMe>
                        {({ size }) => 
                            <Force {...this.state} width={size.width} height={size.height ? size.height : 300} />}
                    </SizeMe>
                </div>
            </React.Fragment>
        );
    }
}

Visual.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Visual);