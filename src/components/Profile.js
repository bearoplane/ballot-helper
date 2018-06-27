import React, { PureComponent } from 'react'
import './Profile.css'

import Dialog from 'material-ui/Dialog'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'

class TopMenu extends PureComponent {
  render() {
    const { profile, updateProfile, ...other } = this.props;

    return (
      <Dialog
        title="Student Profile"
        {...other}
      >
        <RadioButtonGroup defaultSelected={profile.year} onChange={updateProfile} name="year">
          <RadioButton value="2L" label="2L" />
          <RadioButton value="3L" label="3L" />
        </RadioButtonGroup>
      </Dialog>
    )
  }
}

export default TopMenu
