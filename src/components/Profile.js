import React, { PureComponent } from 'react'
import './Profile.css'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'

import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

class TopMenu extends PureComponent {
  render() {
    const { profile, updateProfile, classes, ...other } = this.props;

    return (
      <Dialog
        title="Student Profile"
        fullWidth={true}
        maxWidth="sm"
        {...other}
      >
        <DialogTitle>Student Profile</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset" required>
            <FormLabel component="legend">Year</FormLabel>
            <RadioGroup
              aria-label="year"
              name="year"
              value={profile.year}
              onChange={updateProfile}
            >
              <FormControlLabel value="2L" control={<Radio />} label="2L" />
              <FormControlLabel value="3L" control={<Radio />} label="3L" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
      </Dialog>
    )
  }
}

export default TopMenu
