import React, { PureComponent } from 'react'
import './TopMenu.css'

import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} from 'material-ui/Toolbar'
import RaisedButton from 'material-ui/RaisedButton'

import MenuItem from 'material-ui/MenuItem'
import DropDownMenu from 'material-ui/DropDownMenu'

import makeKey from '../makeKey'

class TopMenu extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { term, setTerm } = this.props;

    return (
      <Toolbar className="TopMenu-toolbar">
        <ToolbarGroup firstChild={true}>
          <img src="/favicon.png" className="TopMenu-logo" />

          <ToolbarTitle text="The Easy Scheduler" />

          <ToolbarSeparator />

          <DropDownMenu value={term} onChange={(e,i,v) => setTerm(v)}>
            <MenuItem value={'F'} primaryText="Fall Term" />
            <MenuItem value={'W'} primaryText="Winter Term" />
          </DropDownMenu>
        </ToolbarGroup>
        <ToolbarGroup>
          <RaisedButton label="Show Both Terms" primary={true} />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default TopMenu
