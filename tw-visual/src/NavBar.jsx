import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import logo from './resources/Transferwise_logo.png'
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
    logo: {
      marginLeft: -12,
      marginRight: 20,
    }
});

function NavBar(props) {
    const { classes } = props;
    return(
        <AppBar position="static">
            <Toolbar>
                {<img width="20%" height="20%" src={logo} style={{marginLeft: -12, marginRight: 20}}/>}
                <Typography variant="title" color="inherit" align="center">
                    Live transfers visualization
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
export default withStyles(styles)(NavBar);