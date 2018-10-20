import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import logo from './resources/transferwise_small_logo.png'
import { withStyles } from '@material-ui/core/styles';

const styles = {
    logo: {
      marginLeft: 10,
      marginRight: 20,
      marginBottom: 2,
      size: "120%"
    },
    title: {
        marginLeft: "auto", 
        fontFamily: "Ubuntu", 
        marginRight: "35%", 
        fontSize: "1.5rem",
        letterSpacing: "0.05em"
    }
};

function NavBar(props) {
    const { classes } = props;
    return(
        <AppBar style={{viewportWidth: "100%", backgroundColor: "#37517e"}}>
            <Toolbar>
                <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet"/>
                {<img width="13%" height="13%" src={logo} style={styles.logo}/>}
                <div style={styles.title}>Live transfer visualization</div>
            </Toolbar>
        </AppBar>
    )
}
export default withStyles(styles)(NavBar);