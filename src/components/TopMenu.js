import React, { PureComponent } from 'react'
import './TopMenu.css'

import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} from 'material-ui/Toolbar'
import RaisedButton from 'material-ui/RaisedButton'

import makeKey from '../makeKey'

class TopMenu extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { term, setTerm, openDialog } = this.props;

    return (
      <Toolbar className="TopMenu-toolbar">
        <ToolbarGroup firstChild={true}>
          <img src="/favicon.png" className="TopMenu-logo" />

          <ToolbarTitle text="The Easy Scheduler" />

          <ToolbarSeparator />

          <RaisedButton label="Fall Term" disabled={term === "F"} onClick={() => setTerm("F")} />
          <RaisedButton label="Winter Term" disabled={term === "W"} onClick={() => setTerm("W")} />
        </ToolbarGroup>
        <ToolbarGroup>
          <RaisedButton label="Show Both Terms" primary={true} onClick={openDialog} />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default TopMenu
