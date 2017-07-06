import React, { PureComponent } from 'react'
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';

import makeKey from '../makeKey'

class TopMenu extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      typeOpen: false,
      selectionOpen: false
    }
  }

  handleOpenType = (event) => {
    event.preventDefault()

    this.setState({
      typeOpen: true,
      typeAnchor: event.currentTarget
    })
  }
  handleCloseType = () => {
    this.setState({
      typeOpen: false
    })
  }
  handleOpenSelection = (event) => {
    event.preventDefault()

    this.setState({
      selectionOpen: true,
      selectionAnchor: event.currentTarget
    })
  }
  handleCloseSelection = () => {
    this.setState({
      selectionOpen: false
    })
  }

  render() {
    const { type, selection } = this.state;
    const { filters } = this.props;

    const choose = (filter, prop, val) => () => {
      this.props.updateFilters(filter, prop, val)
    }

    const typeMenuItems = Object.keys(filters.type).map((filter, key) => (
      <MenuItem
        key={key}
        primaryText={filter}
        insetChildren={true}
        checked={filters.type[filter]}
        onClick={choose('type', filter)}
      />
    ))

    const selectionMenuItems = Object.keys(filters.selection).map((filter, key) => (
      <MenuItem
        key={key}
        primaryText={filter}
        insetChildren={true}
        checked={filters.selection[filter]}
        onClick={choose('selection', filter)}
      />
    ))

    return (
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          <RaisedButton
            onTouchTap={this.handleOpenType}
            label="Course Types"
          />
          <RaisedButton
            onTouchTap={this.handleOpenSelection}
            label="Selection Methods"
          />
        </ToolbarGroup>

        <Popover
          open={this.state.typeOpen}
          anchorEl={this.state.typeAnchor}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleCloseType}
        >
          <Menu>
            { typeMenuItems }
          </Menu>
        </Popover>
        <Popover
          open={this.state.selectionOpen}
          anchorEl={this.state.selectionAnchor}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleCloseSelection}
        >
          <Menu>
            { selectionMenuItems }
          </Menu>
        </Popover>
      </Toolbar>
    )
  }
}

export default TopMenu
