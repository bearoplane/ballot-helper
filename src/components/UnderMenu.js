import React, { PureComponent } from 'react'

import { withStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Switch from '@material-ui/core/Switch'

import red from '@material-ui/core/colors/red'

const styles = theme => ({
  switchWrap: {
    display: 'inline-block'
  },
  switchLabel: {
    color: red[800],
    display: 'inline-block',
    marginLeft: 10,
    marginRight: 10
  },
  switchLabelOff: {
    display: 'inline-block',
    marginLeft: 10,
    marginRight: 10
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
  wrap: {
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 15,
    paddingRight: 15,
    borderLeft: '1px solid black',
    borderRight: '1px solid black'
  }
})

class TopMenu extends PureComponent {
  render() {
    const { classes, term, setTerm, openDialog, selectedCourses } = this.props;

    let numFall = Object.keys(selectedCourses['F']).length
    let numWinter = Object.keys(selectedCourses['W']).length

    return (
      <div className={classes.wrap}>
        <Typography className={term === 'F' ? classes.switchLabel : classes.switchLabelOff}>Fall ({numFall} / 5)</Typography>
        <div className={classes.switchWrap}>
          <Switch
            checked={term === 'W'}
            onChange={(e, c) => setTerm(!c ? 'F' : 'W')}
            value="term"
            classes={{
              switchBase: classes.colorSwitchBase,
              checked: classes.colorChecked,
              bar: classes.colorBar,
            }}
          />
        </div>
        <Typography className={term === 'W' ? classes.switchLabel : classes.switchLabelOff}>Winter ({numWinter} / 5)</Typography>
        <Button variant="contained" size="small" onClick={openDialog}>Show Both Terms</Button>
      </div>
    )
  }
}

export default withStyles(styles)(TopMenu)
