import React, { PureComponent } from 'react'

import { withStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'

import UnderMenu from './UnderMenu'

import AccountCircle from '@material-ui/icons/AccountCircle'

import red from '@material-ui/core/colors/red'

const styles = theme => ({
  logo: {
    height: 48,
    marginTop: 4,
    marginBottom: 4
  },
  profileButton: {
    float: 'right'
  },
  switchLabel: {
    color: red[800]
  },
  colorSwitchBase: {
    color: red[800],
    '& + $colorBar': {
      backgroundColor: red[300],
    },
    '&$colorChecked': {
      color: red[800],
      '& + $colorBar': {
        backgroundColor: red[300],
      },
    },
  },
  colorBar: {},
  colorChecked: {},
  flexGrow: {
    flexGrow: 1
  }
})

class TopMenu extends PureComponent {
  render() {
    const { classes, openProfile, term, setTerm, openDialog, selectedCourses } = this.props

    return (
      <div className={classes.flexGrow}>
        <AppBar position="static" color="default">
          <Toolbar>
            <img className={classes.logo} src="/favicon.png" alt="Logo" />
            <Typography>The Easy Scheduler!</Typography>
            <UnderMenu selectedCourses={selectedCourses} term={term} setTerm={setTerm} openDialog={openDialog} />
            <Button variant="contained" onClick={openProfile}>Profile / Settings</Button>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

/*



<IconButton
  className={classes.profileButton}
  aria-owns={'menu-appbar'}
  aria-haspopup="true"
  onClick={openProfile}
  color="inherit"
>
  <AccountCircle />
</IconButton>
*/

export default withStyles(styles)(TopMenu)
