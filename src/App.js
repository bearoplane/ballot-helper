import React, { Component } from 'react'
import './App.css'

import firebase from './firebase'
import UUID from 'node-uuid'

import classes from './data2'
import createStore from './createStore'

import Dialog from '@material-ui/core/Dialog'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import CourseList from './components/CourseList'
import TimeTables from './components/TimeTables'
import TopMenu from './components/TopMenu'
import Profile from './components/Profile'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

// These must match the values in the data
const Compulsory = 'Compulsory'
const Seminar = 'Seminar'
const Special = 'Special Application'
const Approval = 'Instructor Approval'
const Other = 'Other'

const Ballot = 'Ballot'
const Application = 'Application'
const Instructor = 'Instructor Approval'
const eServices = 'eServices'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dialogOpen: false,
      profileOpen: false,
      store: createStore(classes),
      type: {
        [Compulsory]: true,
        [Seminar]: true,
        [Special]: true,
        [Approval]: true,
        [Other]: true
      },
      selection: {
        [Ballot]: true,
        [Application]: true,
        [Instructor]: true,
        [eServices]: true
      },
      term: 'F',
      profile: null,
      selected: {
        F: [],
        W: []
      }
    }
  }

  getFromStorage() {
    let selectedCourses = localStorage.getItem('BH:CACHED_COURSES')
    let parsedCourses

    if (selectedCourses) {
      parsedCourses = JSON.parse(selectedCourses)

      if (parsedCourses.hasOwnProperty('F')) {
        return parsedCourses
      }
    }

    return {F:[], W:[]}
  }
  getUUID () {
    let uuid = localStorage.getItem('BH:UUID')

    if (uuid) {
      return uuid
    }

    return UUID.v4()
  }
  getProfileFromStorage() {
    let profile = localStorage.getItem('BH:PROFILE')

    if (profile) {
      return JSON.parse(profile)
    }

    return {year:'2L'}
  }
  saveToStorage(key, selected) {
    localStorage.setItem(`BH:${key}`, JSON.stringify(selected))

    if (key === 'CACHED_COURSES') {
      try {
        firebase.database().ref(this.state.uuid).set(selected)
      } catch(e) {

      }
    }
  }

  componentWillMount() {
    this.setState({
      uuid: this.getUUID(),
      selected: this.getFromStorage(),
      profile: this.getProfileFromStorage()
    })
  }
  componentDidMount() {
    if (!this.state.profile) {
      this.setState({
        profileOpen: true
      })
    }
    localStorage.setItem('BH:UUID', this.state.uuid)
  }
  componentWillUnmount() {
    this.saveToStorage('CACHED_COURSES', this.state.selected)
    this.saveToStorage('PROFILE', this.state.profile)
  }

  _updateProfile = (profile) => {
    this.setState({
      profile
    })
    this.saveToStorage('PROFILE', profile)
  }
  _setSelected = (selected) => {
    const newSelected = {
      ...this.state.selected,
      [this.state.term]: selected
    }
    this.setState({
      selected: newSelected
    })
    this.saveToStorage('CACHED_COURSES', newSelected)
  }
  _updateFilters = (filter, prop, val) => {
    this.setState({
      [filter]: {
        ...this.state[filter],
        [prop]: !this.state[filter][prop]
      }
    })
  }

  _openDialog = () => {
    this.setState({
      dialogOpen: true
    })
  }
  _closeDialog = () => {
    this.setState({
      dialogOpen: false
    })
  }
  _openProfile = () => {
    this.setState({
      profileOpen: true
    })
  }
  _closeProfile = () => {
    this.setState({
      profileOpen: false
    })
  }

  _setTerm = (term) => {
    this.setState({
      term
    })
  }

  render() {
    const { selected, store, term, profile, profileOpen } = this.state

    const courses = Object.values(store.data).filter(course => {
      return true
    })

    const unschedCoursesFall = selected['F'].reduce((ret, key) => {
      let course = store.get(key)
      if (course.texam === 'N/A' && course.tclass === 'N/A') {
        ret.push(course.title)
      }
      return ret
    }, [])
    const unschedCoursesWinter = selected['W'].reduce((ret, key) => {
      let course = store.get(key)
      if (course.texam === 'N/A' && course.tclass === 'N/A') {
        ret.push(course.title)
      }
      return ret
    }, [])

    return (
      <div className="App">
        <TopMenu openProfile={this._openProfile} selectedCourses={selected} term={term} setTerm={this._setTerm} openDialog={this._openDialog} />
        <div className="App__wrap">
          <div className="App__left App__side">
            <CourseList year={profile.year} selectedCourses={selected[term]} courses={courses} setSelected={this._setSelected} term={term} />
          </div>
          <div className="App__right App__side">
            <TimeTables term={term} courses={selected[term].map(key => store.get(key))} />
          </div>
        </div>

        <Profile
          open={profileOpen}
          onClose={this._closeProfile}
          profile={profile}
          updateProfile={(e, val) => this._updateProfile({ year: val })}
        />

        <Dialog
          onClose={this._closeDialog}

          fullScreen
          open={this.state.dialogOpen}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this._closeDialog} aria-label="Close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div className="Dialog__wrap">
            <div className="Dialog__left">
              <TimeTables term="F" courses={selected["F"].map(key => store.get(key))} sparse />
              { unschedCoursesFall.length > 0 ?
                <div>
                  <h3 className="Dialog__heading">Other courses</h3>
                  <List>
                    <ListItem>
                      { unschedCoursesFall.map(title => <ListItemText primary={title} />) }
                    </ListItem>
                  </List>
                </div> : null }
            </div>
            <div className="Dialog__right">
              <TimeTables term="W" courses={selected["W"].map(key => store.get(key))} sparse />
              { unschedCoursesWinter.length > 0 ?
                <div>
                  <h3 className="Dialog__heading">Other courses</h3>
                  <List>
                    <ListItem>
                      { unschedCoursesWinter.map(title => <ListItemText primary={title} />) }
                    </ListItem>
                  </List>
                </div> : null }
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}

export default App
