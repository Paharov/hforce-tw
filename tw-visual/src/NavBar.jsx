import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import logo from './resources/Transferwise_logo.png'
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

const styles = {
    logo: {
      marginLeft: -12,
      marginRight: 20,
      marginBottom: 12
    },
    card: {
        size: "20%",
        marginLeft: "90%"
    },
    title: {
        marginLeft: "auto", 
        fontFamily: "Ubuntu", 
        marginRight: "40%", 
        fontSize: "1.5rem",
        letterSpacing: "0.05em"
    }
};

function NavBar(props) {
    const { classes } = props;
    return(
        <AppBar position="static">
            <Toolbar>
                <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet"/>
                {<img width="13%" height="13%" src={logo} style={styles.logo}/>}
                <div style={styles.title}>Live transfer visualization</div>
            </Toolbar>
        </AppBar>
    )
}
export default withStyles(styles)(NavBar);