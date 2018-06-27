import React, { PureComponent } from 'react'
import './TopMenu.css'

import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} from 'material-ui/Toolbar'
import RaisedButton from 'material-ui/RaisedButton'

class TopMenu extends PureComponent {
  render() {
    const { term, setTerm, openDialog, openProfile } = this.props;

    return (
      <Toolbar className="TopMenu-toolbar">
        <ToolbarGroup firstChild={true}>
          <img src="/favicon.png" alt="Logo" className="TopMenu-logo" />

          <ToolbarTitle text="The Easy Scheduler" />

          <ToolbarSeparator />

          <RaisedButton label="Fall Term" disabled={term === "F"} onClick={() => setTerm("F")} />
          <RaisedButton label="Winter Term" disabled={term === "W"} onClick={() => setTerm("W")} />
        </ToolbarGroup>
        <ToolbarGroup>
          <RaisedButton label="Show Both Terms" primary={true} onClick={openDialog} />
          <RaisedButton label="Profile" primary={true} onClick={openProfile} />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default TopMenu
